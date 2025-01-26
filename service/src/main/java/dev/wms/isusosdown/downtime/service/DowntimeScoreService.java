package dev.wms.isusosdown.downtime.service;

import dev.wms.isusosdown.downtime.dto.DowntimeStatsDTO;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class DowntimeScoreService {
    public BigDecimal calculateDowntimeScore(DowntimeStatsDTO downtimeStatsDTO, long maxNumberOfRecordedDowntimes) {
        return downtimeStatsDTO.getAverageDowntimeLength()
                .divide(downtimeStatsDTO.getTotalDowntimesDuration(), 2, RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(2))
                .add(BigDecimal.valueOf(downtimeStatsDTO.getRecordedDowntimes())
                        .divide(BigDecimal.valueOf(maxNumberOfRecordedDowntimes), 2, RoundingMode.HALF_UP));
    }

}
