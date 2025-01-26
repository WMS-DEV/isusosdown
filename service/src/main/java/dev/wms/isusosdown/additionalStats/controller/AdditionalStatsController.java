package dev.wms.isusosdown.additionalStats.controller;

import dev.wms.isusosdown.additionalStats.service.AdditionalStatsService;
import dev.wms.isusosdown.additionalStats.dto.DowntimeStatsRankingDTO;
import dev.wms.isusosdown.additionalStats.dto.HeadToHeadDTO;
import dev.wms.isusosdown.additionalStats.dto.AdditionalStatsDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/isusosdown/additional-stats")
@RequiredArgsConstructor
public class AdditionalStatsController {

    private final AdditionalStatsService additionalStatsService;

    @GetMapping("/{serviceName}")
    public ResponseEntity<AdditionalStatsDTO> getAdditionalStats(@PathVariable String serviceName) {
        return ResponseEntity.ok(additionalStatsService.getAdditionalStats(serviceName));
    }

    @GetMapping("/h2h")
    public ResponseEntity<HeadToHeadDTO> getHeadToHead(@RequestParam List<String> services) {
        return ResponseEntity.ok(additionalStatsService.getHeadToHead(services));
    }

    // TODO need to handle date wrong format
    @GetMapping("/ranking")
    public ResponseEntity<List<DowntimeStatsRankingDTO>> getDowntimeRanking(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Optional<LocalDate> startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Optional<LocalDate> endDate,
            @RequestParam(defaultValue = "True") Boolean descendingOrder,
            @RequestParam Optional<Long> groupId) {
        return ResponseEntity.ok(additionalStatsService.composeDowntimeRanking(startDate, endDate,
                descendingOrder, groupId));
    }
}
