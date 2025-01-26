package dev.wms.isusosdown.initialStats.service;

import dev.wms.isusosdown.downtime.dto.DowntimeDTO;
import dev.wms.isusosdown.downtime.repository.DowntimeRepository;
import dev.wms.isusosdown.downtime.service.DowntimeStatusService;
import dev.wms.isusosdown.initialStats.dto.InitialDownServiceStatsDTO;
import dev.wms.isusosdown.initialStats.dto.InitialServiceStatsDTO;
import dev.wms.isusosdown.initialStats.dto.InitialStatsDTO;
import dev.wms.isusosdown.meme.JsosFrontpageMemeRepository;
import dev.wms.isusosdown.utils.DateUtils;
import dev.wms.isusosdown.utils.provider.PropertiesProvider;
import dev.wms.isusosdown.utils.structures.ServicesDataProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class InitialStatsService {

    private final DowntimeRepository downtimeRepository;
    private final DowntimeStatusService downtimeProvider;
    private final JsosFrontpageMemeRepository jsosFrontpageMemeRepository;
    private final ServicesDataProvider servicesDataProviderImpl;
    private final Random random = new Random();
    private final int DOWNTIME_CHART_LIMIT = 50;

    public InitialStatsDTO getInitialStats(int numberOfServices, boolean realData, Long groupId, Long minDuration) {
        return realData ? getRealInitialStats(groupId, minDuration) : getMockedInitialStats(numberOfServices);
    }

    public InitialStatsDTO getMockedInitialStats(int numberOfServices) {
        log.info("Getting mock initial stats");
        String meme = getRandomMemeContent();
        InitialStatsDTO initialStatsDTO = new InitialStatsDTO(meme);

        int limit = numberOfServices;
        for (String service : servicesDataProviderImpl.getServicesNames()) {
            boolean flag = random.nextBoolean();
            if (flag) {
                var initialServiceStatsDTO = InitialServiceStatsDTO.builder()
                        .title(service)
                        .uptime(BigDecimal.valueOf(random.nextInt(100) + 1))
//                        .downtimes(getMockedDowntimeDto())
                        .build();
                initialStatsDTO.addToRunningServices(initialServiceStatsDTO);
            } else {
                var initialDownServiceStatsDTO = InitialDownServiceStatsDTO.builder()
                        .title(service)
                        .uptime(BigDecimal.valueOf(random.nextInt(100) + 1))
//                        .downtimes(getMockedDowntimeDto())
                        .downSince(DateUtils.getMillisFromDate(LocalDateTime.now().minusHours(2)))
                        .build();
                initialStatsDTO.addToDownServices(initialDownServiceStatsDTO);
            }
            limit--;
            if (limit == 0) break;
        }
        log.info("Returning mock initial stats");
        log.trace("Return mock initial stats for: {}", initialStatsDTO.toString());
        return initialStatsDTO;
    }

    public InitialStatsDTO getRealInitialStats(Long groupId, Long minDuration) {


        log.info("Getting real initial stats for group with id: {}", groupId);
        String meme = getRandomMemeContent();
        InitialStatsDTO initialStatsDTO = new InitialStatsDTO(meme);
        servicesDataProviderImpl.getServicesForGroup(groupId).forEach(serviceData -> createServiceStatsDTOAndDisposeIt(serviceData.getName(),
                serviceData.getUrl(), initialStatsDTO, minDuration));
        log.info("Returning initial stats");
        return initialStatsDTO;
    }

    public void createServiceStatsDTOAndDisposeIt(String serviceName, String url, InitialStatsDTO initialStatsDTO, Long minDuration) {
        Long lastDowntimeMillis = Optional.ofNullable(downtimeRepository.getLastDowntimeEndDateForService(url))
                .map(DateUtils::getMillisFromDate)
                .orElse(null);

        InitialServiceStatsDTO serviceStatsDTO = InitialServiceStatsDTO.builder()
                .title(serviceName)
                .uptime(getUptimePercentage(url))
                .downtimes(downtimeRepository.getDowntimesWithDateAndDurationAbove(
                        url, DOWNTIME_CHART_LIMIT, getLocalDateDayAgo(), minDuration))
                .lastDowntimeEndDate(lastDowntimeMillis)
                .build();

        downtimeProvider.getServiceDowntimeStartDate(serviceName)
                .map(downtimeSince -> new InitialDownServiceStatsDTO(serviceStatsDTO, DateUtils.getMillisFromDate(downtimeSince)))
                .ifPresentOrElse(initialStatsDTO::addToDownServices,
                        () -> initialStatsDTO.addToRunningServices(serviceStatsDTO));
    }

    private LocalDateTime getLocalDateDayAgo() {
        return LocalDateTime.now().minusDays(1);
    }

    public BigDecimal getUptimePercentage(String url) {
        BigDecimal runningFor =
                BigDecimal.valueOf(System.currentTimeMillis()).subtract(PropertiesProvider.getRecordingStartDateMillis());

        Optional<Long> sumOfDowntimesOpt = Optional.ofNullable(downtimeRepository.getSumOfDowntimes(url));
        BigDecimal sumOfDowntimes = BigDecimal.valueOf(sumOfDowntimesOpt.orElse(0L));

        return runningFor.subtract(sumOfDowntimes).divide(runningFor, 2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(100));
    }

    private String getRandomMemeContent() {
        return jsosFrontpageMemeRepository.getRandomMeme().content();
    }
}
