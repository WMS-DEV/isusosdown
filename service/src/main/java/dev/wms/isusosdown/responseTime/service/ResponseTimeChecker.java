package dev.wms.isusosdown.responseTime.service;

import dev.wms.isusosdown.responseTime.entity.ServiceResponseTime;
import dev.wms.isusosdown.responseTime.repository.ServiceResponseTimeRepository;
import dev.wms.isusosdown.trackedService.entity.TrackedService;
import dev.wms.isusosdown.trackedService.repository.TrackedServicesRepository;
import dev.wms.isusosdown.utils.structures.ServicesDataProvider;
import lombok.extern.slf4j.Slf4j;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Slf4j
public class ResponseTimeChecker {

    private final Map<TrackedService, Integer> serviceResponseTimeCheckingThresholdMap;
    private final TrackedServicesRepository trackedServicesRepository;
    private final int defaultResponseTimeCheckingThreshold;
    private final ServiceResponseTimeRepository serviceResponseTimeRepository;

    public ResponseTimeChecker(ServicesDataProvider servicesDataProvider,
                               TrackedServicesRepository trackedServicesRepository,
                               ServiceResponseTimeRepository serviceResponseTimeRepository,
                               @Value("#{T(java.lang.Integer)" +
                                                        ".parseInt('${isusosdown.service-response-time-checking-threshold}')}")
                                                int defaultResponseTimeCheckLimit) {
        this.trackedServicesRepository = trackedServicesRepository;
        this.defaultResponseTimeCheckingThreshold = defaultResponseTimeCheckLimit;
        serviceResponseTimeCheckingThresholdMap = new ConcurrentHashMap<>();
        servicesDataProvider.getActiveServices().forEach(service ->
                serviceResponseTimeCheckingThresholdMap.put(service, defaultResponseTimeCheckLimit));
        this.serviceResponseTimeRepository = serviceResponseTimeRepository;
        log.info("Created IsUsosDownServiceResponseTimeChecker with default response time check limit: {}",
                defaultResponseTimeCheckingThreshold);
    }

    public synchronized void updateServices() {
        log.info("Updating services data in ResponseTimeChecker");
        serviceResponseTimeCheckingThresholdMap.clear();
        trackedServicesRepository.findAll().forEach(trackedService -> {
            if(trackedService.isActive()) {
                serviceResponseTimeCheckingThresholdMap.put(trackedService, defaultResponseTimeCheckingThreshold);
            }
        });
        log.info("Services in ResponseTimeChecker after update: {}", serviceResponseTimeCheckingThresholdMap.keySet());
    }

    public synchronized void checkIfServiceEligibleForResponseTimePersistence(TrackedService trackedService, Response response) {
        int responseTimeCheckingThreshold = serviceResponseTimeCheckingThresholdMap.get(trackedService) - 1;
        if(responseTimeCheckingThreshold == 0) {
            persistServiceResponseTime(trackedService.getUrl(), response);
            responseTimeCheckingThreshold = defaultResponseTimeCheckingThreshold;
        }
        serviceResponseTimeCheckingThresholdMap.replace(trackedService, responseTimeCheckingThreshold);
    }

    private void persistServiceResponseTime(String serviceUrl, Response response) {
        ServiceResponseTime serviceResponseTime = ServiceResponseTime.builder()
                .serviceUrl(serviceUrl)
                .responseTime(response.receivedResponseAtMillis() - response.sentRequestAtMillis())
                .responseDate(new Date(response.receivedResponseAtMillis()))
                .build();
        serviceResponseTimeRepository.save(serviceResponseTime);
    }

}
