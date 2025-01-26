package dev.wms.isusosdown.downtime.dto;

import lombok.Builder;

import java.time.LocalDate;

@Builder
public record DowntimeChartDataDTO(LocalDate dateOfDowntimes, int numberOfDowntimes, Long totalDowntimeLengthMillis) {
}
