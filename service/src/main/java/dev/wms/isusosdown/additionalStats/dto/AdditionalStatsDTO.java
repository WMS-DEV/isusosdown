package dev.wms.isusosdown.additionalStats.dto;

import dev.wms.isusosdown.downtime.dto.DowntimeChartDataDTO;
import dev.wms.isusosdown.trafficStats.dto.TrafficStatsDTO;
import lombok.Builder;

import java.math.BigDecimal;
import java.util.List;

@Builder
public record AdditionalStatsDTO(String serviceName,
                                 String serviceUrl,
                                 boolean isActive,
                                 long recordedDowntimes,
                                 BigDecimal totalDowntimeMillis,
                                 BigDecimal totalUptimeMillis,
                                 BigDecimal averageDowntimeLengthMillis,
                                 BigDecimal averageUptimeLengthMillis,
                                 BigDecimal recordingStatsSinceMillis,
                                 List<DowntimeChartDataDTO> chart,
                                 TrafficStatsDTO trafficStats,
                                 BigDecimal allTimeDowntimeScore) {
}
