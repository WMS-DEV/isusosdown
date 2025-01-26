package dev.wms.isusosdown.additionalStats.dto;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record DowntimeStatsRankingDTO(String serviceName, String serviceUrl, long recordedDowntimes,
                                      BigDecimal totalDowntimesDuration, BigDecimal averageDowntimeDuration,
                                      BigDecimal downtimeScore) {

}
