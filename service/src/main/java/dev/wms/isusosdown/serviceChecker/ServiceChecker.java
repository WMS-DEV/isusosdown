package dev.wms.isusosdown.serviceChecker;

import dev.wms.isusosdown.downtime.dto.DowntimeInfoDTO;
import dev.wms.isusosdown.downtime.dto.EndDowntimeInfoDTO;
import dev.wms.isusosdown.downtime.entity.Downtime;
import dev.wms.isusosdown.downtime.repository.DowntimeRepository;
import dev.wms.isusosdown.downtime.service.DowntimeStatusService;
import dev.wms.isusosdown.notifications.NotificationService;
import dev.wms.isusosdown.responseTime.service.ResponseTimeChecker;
import dev.wms.isusosdown.trackedService.entity.TrackedService;
import dev.wms.isusosdown.trackedService.repository.TrackedServicesRepository;
import dev.wms.isusosdown.utils.DateUtils;
import dev.wms.isusosdown.utils.exceptions.ServiceNotSupportedException;
import dev.wms.isusosdown.utils.http.HttpUtils;
import dev.wms.isusosdown.utils.structures.ServicesDataProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.net.SocketTimeoutException;
import java.text.MessageFormat;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ServiceChecker {

    private final NotificationService websocketNotificationService;
    private final DowntimeRepository downtimeRepository;
    private final TrackedServicesRepository trackedServicesRepository;
    private final DowntimeStatusService downtimeStatusService;
    private final ServicesDataProvider servicesDataProviderImpl;
    private final ResponseTimeChecker serviceResponseTimeChecker;
    private ExecutorService executor;
    @Value("${isusosdown.websocket.channel}")
    private String websocketChannel;
    @Value("${isusosdown.minimal-downtime-duration}")
    private Long minimalDowntimeDuration;

    Map<String, LocalDateTime> mockDownServices = new HashMap<>();
    @Value("${isusosdown.websocket.channel-mock}")
    private String mockWebsocketChannel;

    @PostConstruct
    public void init() {
        executor = Executors.newFixedThreadPool(10);
    }

    @Scheduled(fixedDelay = 5000, initialDelay = 8000)
    protected void checkDownServicesStatus() {
        downtimeStatusService.getDownServices()
                .parallelStream()
                .forEach(service -> CompletableFuture.supplyAsync(() -> checkDownService(service), executor));
    }

    @Scheduled(fixedDelay = 20000)
    protected void checkUpServicesStatus() {
        downtimeStatusService.getUpServices()
                .parallelStream()
                .forEach(service -> CompletableFuture.supplyAsync(() -> checkUpService(service), executor));
    }

    private boolean checkUpService(TrackedService trackedService) {
        isServiceDown(trackedService).ifPresent(isDown -> {
            if (isDown) {
                LocalDateTime startTime = LocalDateTime.now();
                DowntimeInfoDTO startDowntimeInfoDTO = DowntimeInfoDTO.of(trackedService.getName(),
                        DateUtils.getMillisFromDate(startTime));

                downtimeStatusService.registerDownService(trackedService, startTime);
                websocketNotificationService.notify(websocketChannel, startDowntimeInfoDTO);
            }
        });
        return true;
    }

    private boolean checkDownService(TrackedService trackedService) {
        isServiceDown(trackedService).ifPresent(isDown -> {
            if (!isDown) {
                LocalDateTime endTime = LocalDateTime.now();
                EndDowntimeInfoDTO endDowntimeInfoDTO = EndDowntimeInfoDTO.builder()
                        .service(trackedService.getName())
                        .downSince(DateUtils.getMillisFromDate(downtimeStatusService.getServiceDowntimeStartDate(trackedService).get()))
                        .downTill(DateUtils.getMillisFromDate(endTime))
                        .build();

                websocketNotificationService.notify(websocketChannel, endDowntimeInfoDTO);

                downtimeStatusService.clearDownService(trackedService);
                persistDowntime(endDowntimeInfoDTO, trackedService.getUrl());

            }
        });
        return true;
    }

    private Long getTrackedServiceIdByUrl(String url) {
        return trackedServicesRepository.findTrackedServiceIdByUrl(url).orElseThrow(() ->
                new ServiceNotSupportedException(MessageFormat.format("Service with url: {0} not found", url)));
    }

    private void persistDowntime(EndDowntimeInfoDTO endDowntimeInfoDTO, String serviceUrl) {
        log.trace("Downtime duration was: {}", endDowntimeInfoDTO.getDowntimeLength());
        if (endDowntimeInfoDTO.getDowntimeLength() > minimalDowntimeDuration) {
            Downtime downtime = Downtime.of(endDowntimeInfoDTO, serviceUrl, getTrackedServiceIdByUrl(serviceUrl));
            downtimeRepository.save(downtime);
            log.info("Downtime: {} persisted to DB", downtime);
        }
    }

    private Optional<Boolean> isServiceDown(TrackedService trackedService) {
        try (Response response = HttpUtils.makeRequestWithTimeout(trackedService.getUrl(), Duration.of(3, ChronoUnit.SECONDS))) {
            serviceResponseTimeChecker.checkIfServiceEligibleForResponseTimePersistence(trackedService, response);
            return Optional.of(!response.isSuccessful());
        } catch (SocketTimeoutException ex) {
            return Optional.of(Boolean.TRUE);
        } catch (IOException ex) {
            log.warn("messgage: " + ex.getMessage() + " || cause: " + ex.getCause());
            return Optional.empty();
        }

    }

    @Scheduled(fixedDelay = 30000)
    void fakeService() {

        String serviceName = generateRandomService();

        if (mockDownServices.containsKey(serviceName)) {
            EndDowntimeInfoDTO endDowntimeInfoDTO = EndDowntimeInfoDTO.builder()
                    .service(serviceName)
                    .downSince(DateUtils.getMillisFromDate(mockDownServices.get(serviceName)))
                    .downTill(DateUtils.getMillisFromDate(LocalDateTime.now()))
                    .build();
            mockDownServices.remove(serviceName);
            websocketNotificationService.notify(mockWebsocketChannel, endDowntimeInfoDTO);
        } else {
            LocalDateTime startDateTime = LocalDateTime.now();
            DowntimeInfoDTO downtimeInfoDTO = DowntimeInfoDTO.of(serviceName, DateUtils.getMillisFromDate(startDateTime));
            mockDownServices.put(serviceName, startDateTime);
            websocketNotificationService.notify(mockWebsocketChannel, downtimeInfoDTO);
        }

    }

    private String generateRandomService() {

        Random random = new Random();
        String serviceName = "jsos";
        int x = random.nextInt(9);
        switch (x) {
            case 1 -> serviceName = "eportal";
            case 2 -> serviceName = "jsos";
            case 3 -> serviceName = "edukacja";
            case 4 -> serviceName = "pwr";
            case 5 -> serviceName = "parking";
            case 6 -> serviceName = "prowadzacy";
            case 7 -> serviceName = "usos";
            case 8 -> serviceName = "library";
        }
        return serviceName;

    }

}
