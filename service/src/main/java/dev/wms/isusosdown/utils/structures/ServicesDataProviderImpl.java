package dev.wms.isusosdown.utils.structures;

import dev.wms.isusosdown.trackedService.entity.TrackedService;
import dev.wms.isusosdown.trackedService.repository.TrackedServicesRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@Slf4j
public class ServicesDataProviderImpl implements ServicesDataProvider {

    private List<TrackedService> servicesData;
    private final TrackedServicesRepository trackedServicesRepository;

    public ServicesDataProviderImpl(TrackedServicesRepository trackedServicesRepository) {
        this.trackedServicesRepository = trackedServicesRepository;
        updateServices();
        log.info("Tracked services = " + trackedServicesRepository.findAll().toString());
    }

    public void updateServices() {
        servicesData = trackedServicesRepository.findAll();
        log.info("Updating tracked services with {}", servicesData.toString());
    }

    @Override
    public String getServiceNameByUrl(String url) {
        return servicesData.stream().filter(trackedService ->
                trackedService.getUrl().equals(url)).findFirst().get().getName();
    }

    @Override
    public String getUrlByServiceName(String name) {
        return servicesData.stream().filter(trackedService ->
                trackedService.getName().equals(name)).findFirst().get().getUrl();
    }

    @Override
    public int getNumberOfServices() {
        return servicesData.size();
    }

    @Override
    public List<TrackedService> getServices() {
        return servicesData;
    }

    @Override
    public List<TrackedService> getActiveServices() {
        return servicesData.stream().filter(TrackedService::isActive).toList();
    }

    @Override
    public Set<String> getServicesNames() {
        return servicesData.stream()
                .map(TrackedService::getName)
                .collect(Collectors.toSet());
    }

    @Override
    public Set<String> getServicesUrls() {
        return servicesData.stream()
                .map(TrackedService::getUrl)
                .collect(Collectors.toSet());
    }

    @Override
    public List<TrackedService> getServicesForGroup(Long groupId) {
        return servicesData.stream()
                .filter(trackedService -> trackedService.getGroupId().equals(groupId))
                .toList();
    }

    @Override
    public Set<String> getServiceNamesForGroup(Long groupId) {
        return servicesData.stream()
                .filter(trackedService -> trackedService.getGroupId().equals(groupId))
                .map(TrackedService::getName)
                .collect(Collectors.toSet());
    }

    @Override
    public Collection<String> getServicesUrlsForGroup(Long groupId) {
        return servicesData.stream()
                .filter(trackedService -> trackedService.getGroupId().equals(groupId))
                .map(TrackedService::getUrl)
                .collect(Collectors.toSet());
    }

}
