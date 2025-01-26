package dev.wms.isusosdown.trackedService.controller;

import dev.wms.isusosdown.trackedService.dto.GroupDTO;
import dev.wms.isusosdown.trackedService.dto.TrackedServiceDTO;
import dev.wms.isusosdown.trackedService.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/isusosdown/groups")
public class GroupController {

    private final GroupService groupService;

    @PostMapping
    public ResponseEntity<GroupDTO> addGroup(@RequestBody GroupDTO group) {
        return ResponseEntity.ok(groupService.addNewGroup(group));
    }

    @PutMapping("/{groupId}")
    public ResponseEntity<GroupDTO> updateGroup(@PathVariable Long groupId, @RequestBody GroupDTO group) {
        return ResponseEntity.ok(groupService.updateGroup(groupId, group));
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<GroupDTO> getGroup(@PathVariable Long groupId) {
        return ResponseEntity.ok(groupService.getGroup(groupId));
    }

    @GetMapping
    public ResponseEntity<List<GroupDTO>> getGroups() {
        return ResponseEntity.ok(groupService.getGroups());
    }

    @GetMapping("/{groupId}/services")
    public ResponseEntity<List<TrackedServiceDTO>> getAllServicesForGroup(@PathVariable Long groupId) {
        return ResponseEntity.ok(groupService.getAllServicesForGroup(groupId));
    }

    @PostMapping("/{groupId}/add-services/")
    public ResponseEntity<List<TrackedServiceDTO>> addServicesToGroup(@PathVariable Long groupId, @RequestParam List<Long> servicesIds) {
        return ResponseEntity.ok(groupService.addServicesToGroup(groupId, servicesIds));
    }

}
