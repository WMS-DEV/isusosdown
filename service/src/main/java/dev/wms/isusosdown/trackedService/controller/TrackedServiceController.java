package dev.wms.isusosdown.trackedService.controller;

import dev.wms.isusosdown.trackedService.dto.TrackedServiceDTO;
import dev.wms.isusosdown.trackedService.service.TrackedServicesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/isusosdown/tracked-service")
@RequiredArgsConstructor
public class TrackedServiceController {

    private final TrackedServicesService trackedServicesService;

    @GetMapping
    public ResponseEntity<List<TrackedServiceDTO>> getAllServices() {
        return ResponseEntity.ok(trackedServicesService.getAllServices());
    }

//    @PostMapping
//    public ResponseEntity<TrackedServiceDTO> addService(@RequestBody ServiceDTO service) {
//        return ResponseEntity.ok(trackedServicesService.addNewTrackedService(service));
//    }
//
//    @PutMapping("/{serviceId}")
//    public ResponseEntity<TrackedServiceDTO> updateServiceById
//            (@PathVariable int serviceId, @RequestBody TrackedServiceDTO trackedService) {
//        return ResponseEntity.ok(trackedServicesService.updateTrackedService(serviceId, trackedService));
//    }
//
//    @PostMapping("/update-status/{serviceId}")
//    public ResponseEntity<TrackedServiceDTO> updateServiceActiveStatus(@PathVariable Long serviceId,
//                                                                       @RequestParam boolean isActive) {
//        return ResponseEntity.ok(trackedServicesService.updateServiceActiveStatus(serviceId, isActive));
//    }

}
