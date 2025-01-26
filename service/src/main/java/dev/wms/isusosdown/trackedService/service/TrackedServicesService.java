package dev.wms.isusosdown.trackedService.service;


import dev.wms.isusosdown.trackedService.dto.ServiceDTO;
import dev.wms.isusosdown.trackedService.dto.TrackedServiceDTO;
import dev.wms.isusosdown.trackedService.entity.TrackedService;
import dev.wms.isusosdown.trackedService.repository.GroupRepository;
import dev.wms.isusosdown.trackedService.repository.TrackedServicesRepository;
import dev.wms.isusosdown.utils.ServicesDataManager;
import dev.wms.isusosdown.utils.exceptions.GroupNotFoundException;
import dev.wms.isusosdown.utils.exceptions.ServiceAlreadyTrackedException;
import dev.wms.isusosdown.utils.exceptions.ServiceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class TrackedServicesService {

    private final TrackedServicesRepository trackedServicesRepository;
    private final GroupRepository groupRepository;
    private final ServicesDataManager servicesDataManager;

    public List<TrackedServiceDTO> getAllServices() {
        return trackedServicesRepository.findAll().stream()
                .map(TrackedServiceDTO::of)
                .toList();
    }

    private void checkIfTrackedServiceAlreadyExists(ServiceDTO serviceDTO) {
        if (trackedServicesRepository.existsByNameOrUrl(serviceDTO.name(), serviceDTO.url())) {
            throw new ServiceAlreadyTrackedException(MessageFormat.format("Service with name: {0} or url: {1} " +
                    " is already tracked", serviceDTO.name(), serviceDTO.url()));
        }
    }

    private TrackedServiceDTO persistTrackedService(TrackedService trackedService) {
        trackedServicesRepository.save(trackedService);
        servicesDataManager.updateServicesData();
        return TrackedServiceDTO.of(trackedService);
    }

    public TrackedServiceDTO addNewTrackedService(ServiceDTO serviceDTO) {
        checkIfTrackedServiceAlreadyExists(serviceDTO);
        checkIfGroupExists(serviceDTO.groupId());

        TrackedService newService = TrackedService.builder()
                .name(serviceDTO.name())
                .url(serviceDTO.url())
                .isActive(true)
                .groupId(serviceDTO.groupId())
                .build();
        log.info("Saving new service with name: {}", newService.getName());
        return persistTrackedService(newService);
    }

    public TrackedServiceDTO updateTrackedService(int serviceId, TrackedServiceDTO trackedService) {
        TrackedService currentTrackedService = getTrackedServiceById((long) serviceId);
        log.info("Updating service with name: {}", currentTrackedService.getName());
        updateTrackedServiceFields(currentTrackedService, trackedService);
        return persistTrackedService(currentTrackedService);
    }

    private void checkIfGroupExists(Long groupId) {
        groupRepository.findById(groupId).orElseThrow(() -> new GroupNotFoundException(
                MessageFormat.format("Group with id: {0} nor found", groupId)));
    }

    private TrackedService getTrackedServiceById(Long serviceId) {
        return trackedServicesRepository.findById(serviceId).orElseThrow(() ->
                new ServiceNotFoundException("Service with this name does not exist"));
    }

    private void updateTrackedServiceFields(TrackedService trackedService, TrackedServiceDTO newTrackedService) {
        if(Objects.nonNull(newTrackedService.getName())) {
            trackedService.setName(newTrackedService.getName());
        }
        if(Objects.nonNull(newTrackedService.getUrl())) {
            trackedService.setUrl(newTrackedService.getUrl());
        }
        if(Objects.nonNull(newTrackedService.getGroupId())) {
            trackedService.setGroupId(newTrackedService.getGroupId());
        }
    }

    public TrackedServiceDTO updateServiceActiveStatus(Long serviceId, boolean isActive) {
        TrackedService trackedService = getTrackedServiceById(serviceId);
        trackedService.setActive(isActive);
        log.info("Active status change to: {} for service: {}", isActive, trackedService.getName());
        return persistTrackedService(trackedService);
    }
}
