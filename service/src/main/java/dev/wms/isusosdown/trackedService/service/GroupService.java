package dev.wms.isusosdown.trackedService.service;

import dev.wms.isusosdown.trackedService.dto.GroupDTO;
import dev.wms.isusosdown.trackedService.dto.TrackedServiceDTO;
import dev.wms.isusosdown.trackedService.entity.Group;
import dev.wms.isusosdown.trackedService.repository.GroupRepository;
import dev.wms.isusosdown.trackedService.repository.TrackedServicesRepository;
import dev.wms.isusosdown.utils.ServicesDataManager;
import dev.wms.isusosdown.utils.exceptions.GroupNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.List;
import java.util.Objects;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
@Slf4j
public class GroupService {

    private final GroupRepository groupRepository;
    private final TrackedServicesRepository trackedServicesRepository;
    private final ServicesDataManager servicesDataManager;

    private Group getGroupById(Long groupId) {
        return groupRepository.findById(groupId).orElseThrow(() -> new GroupNotFoundException(
                MessageFormat.format("Group with id: {0} not found", groupId)));
    }

    public GroupDTO getGroup(Long groupId) {
        log.info("Getting group with id: {}", groupId);
        return GroupDTO.of(getGroupById(groupId));
    }

    public List<GroupDTO> getGroups() {
        log.info("Getting groups");
        return StreamSupport.stream(groupRepository.findAll().spliterator(), false)
                .map(GroupDTO::of)
                .toList();
    }

    public List<TrackedServiceDTO> getAllServicesForGroup(Long groupId) {
        log.info("Getting all services for group: {}", groupId);
        return trackedServicesRepository.findTrackedServicesByGroupId(groupId)
                .stream()
                .map(TrackedServiceDTO::of)
                .toList();
    }

    public GroupDTO addNewGroup(GroupDTO group) {
        Group newGroup = new Group(group.getName());
        log.info("Adding new group with name: {}", group.getName());
        Group savedGroup = groupRepository.save(newGroup);
        return GroupDTO.of(savedGroup);
    }

    private void checkIfGroupExists(Long groupId) {
        groupRepository.findById(groupId).orElseThrow(() -> new GroupNotFoundException(
                MessageFormat.format("Group with id: {0} nor found", groupId)));
    }

    public GroupDTO updateGroup(Long groupId, GroupDTO group) {
        Group groupFromDB = getGroupById(groupId);
        updateGroupFields(groupFromDB, group);
        log.info("Group with id: {} updating", groupId);
        return GroupDTO.of(groupRepository.save(groupFromDB));
    }

    private void updateGroupFields(Group groupToUpdate, GroupDTO group) {
        if(Objects.nonNull(group.getName())) {
            groupToUpdate.setName(group.getName());
        }
    }

    private void addServiceToGroup(Long groupId, Long serviceId) {
        trackedServicesRepository.updateServiceGroupId(serviceId, groupId);
    }

    public List<TrackedServiceDTO> addServicesToGroup(Long groupId, List<Long> servicesIds) {
        checkIfGroupExists(groupId);
        servicesIds.forEach(serviceId -> addServiceToGroup(groupId, serviceId));
        log.info("Services with ids: {} added to group with id: {}", servicesIds, groupId);
        servicesDataManager.updateServicesData();
        return trackedServicesRepository.findAllById(servicesIds).stream().map(TrackedServiceDTO::of).toList();
    }

}
