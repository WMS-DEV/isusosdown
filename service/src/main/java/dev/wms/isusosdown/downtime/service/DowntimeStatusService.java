package dev.wms.isusosdown.downtime.service;

import dev.wms.isusosdown.trackedService.entity.TrackedService;
import dev.wms.isusosdown.trackedService.repository.TrackedServicesRepository;
import dev.wms.isusosdown.utils.structures.ServicesDataProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Component
@Slf4j
public class DowntimeStatusService {

    //z biMapy tutaj dac dane zamiast @Value
    private Map<TrackedService, LocalDateTime> downServices;
    private List<TrackedService> upServices;
    private final TrackedServicesRepository trackedServicesRepository;

    public DowntimeStatusService(ServicesDataProvider servicesDataProvider, TrackedServicesRepository trackedServicesRepository) {
        this.trackedServicesRepository = trackedServicesRepository;
        upServices = Collections.synchronizedList(new ArrayList<>(servicesDataProvider.getActiveServices().stream().toList()));
        log.trace("Created upServices list with services: {}", upServices);
        downServices = new ConcurrentHashMap<>();
    }

    public synchronized Optional<LocalDateTime> getServiceDowntimeStartDate(TrackedService trackedService) {
        return Optional.ofNullable(downServices.get(trackedService));
    }

    public synchronized Optional<LocalDateTime> getServiceDowntimeStartDate(String serviceName) {
        Optional<TrackedService> foundTrackedService = downServices.keySet().stream()
                .filter(trackedService -> trackedService.getName().equals(serviceName))
                .findFirst();
        return foundTrackedService.map(downServices::get);
    }

    public synchronized List<TrackedService> getDownServices() {
        return downServices.keySet().stream().toList();
    }

    public synchronized List<TrackedService> getUpServices() {
        return upServices;
    }

    public synchronized void registerDownService(TrackedService trackedService, LocalDateTime downSince) {
        log.info("Registering down service: {}", trackedService.getName());
        logActualRegisteredServices();

        upServices.remove(trackedService);
        downServices.put(trackedService, downSince);

        log.info("{} registered as down service", trackedService.getName());
        logActualRegisteredServices();
    }

    public synchronized void clearDownService(TrackedService trackedService) {
        log.info("Registering up service: {}", trackedService.getName());
        logActualRegisteredServices();

        downServices.remove(trackedService);
        upServices.add(trackedService);

        log.info("{} registered as up service", trackedService.getName());
        logActualRegisteredServices();
    }

    private void logActualRegisteredServices() {
        log.info("There are {} down services: {}", downServices.keySet().size(),
                downServices.keySet().stream().map(TrackedService::getUrl).toList()
        );
        log.info("There are {} up services: {}", upServices.size(),
                upServices.stream().map(TrackedService::getUrl).toList()
        );
    }

    public synchronized void updateServices() {
        log.info("Updating services in DowntimeStatusService");
        Map<TrackedService, LocalDateTime> updatedDownServices = new ConcurrentHashMap<>();
        List<TrackedService> updatedUpServices = new ArrayList<>();

        updateServicesLists(updatedDownServices, updatedUpServices);

        upServices = Collections.synchronizedList(updatedUpServices);
        downServices = updatedDownServices;
        log.info("Services in DowntimeStatusService updated, actual up services are: {} \n" +
                "actual down services are: {}", upServices, downServices.keySet());
    }

    private void updateServicesLists(Map<TrackedService, LocalDateTime> updatedDownServices,
                                     List<TrackedService> updatedUpServices) {
        trackedServicesRepository.findAll().forEach(trackedService -> {
            if (trackedService.isActive()) {
                if (downServices.containsKey(trackedService)) {
                    updatedDownServices.put(trackedService, downServices.get(trackedService));
                } else {
                    updatedUpServices.add(trackedService);
                }
            }
        });
    }

}
