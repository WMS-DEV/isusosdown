package dev.wms.isusosdown.initialStats.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.List;

@Data
@SuperBuilder
@AllArgsConstructor
public class InitialServiceStatsDTO {
    private String title;
    private BigDecimal uptime;
    private List<InitialStatsDowntimeDTO> downtimes;
    private Long lastDowntimeEndDate;
}
