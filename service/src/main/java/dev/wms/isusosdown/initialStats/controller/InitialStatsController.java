package dev.wms.isusosdown.initialStats.controller;

import dev.wms.isusosdown.initialStats.dto.InitialStatsDTO;
import dev.wms.isusosdown.initialStats.service.InitialStatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.constraints.Min;

@RestController
@RequestMapping("/api/isusosdown/initial-stats")
@RequiredArgsConstructor
@Validated
public class InitialStatsController {

    private final InitialStatsService initialStatsService;

    @GetMapping("/{groupId}")
    public ResponseEntity<InitialStatsDTO> getInitialStats(
            @RequestParam(required = false, defaultValue = "30000")
            @Min(value = 0, message = "Minimal duration has to be greater than or equal to 0") Long minDuration,
            @RequestParam(required = false, defaultValue = "5") int numberOfServices,
            @RequestParam(required = false, defaultValue = "true") boolean realData,
            @PathVariable Long groupId) {
        return ResponseEntity.ok(initialStatsService.getInitialStats(numberOfServices, realData, groupId, minDuration));
    }
}
