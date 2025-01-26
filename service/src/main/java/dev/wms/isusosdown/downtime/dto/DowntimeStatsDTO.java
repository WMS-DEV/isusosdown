package dev.wms.isusosdown.downtime.dto;

import dev.wms.isusosdown.utils.provider.PropertiesProvider;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Data
@Builder
public class DowntimeStatsDTO {
    private String serviceUrl;
    private long recordedDowntimes;
    private BigDecimal totalDowntimesDuration;

    public BigDecimal getTotalUptimeMillis() {
        return PropertiesProvider.getRecordingStartDateMillis().subtract(totalDowntimesDuration);
    }

    public BigDecimal getAverageDowntimeLength() {
        return totalDowntimesDuration.divide(BigDecimal.valueOf(recordedDowntimes), 5, RoundingMode.HALF_UP);
    }

    public BigDecimal getAverageUptimeLength() {
        return getTotalUptimeMillis().divide(BigDecimal.valueOf(recordedDowntimes), 5, RoundingMode.HALF_UP);
    }

}

