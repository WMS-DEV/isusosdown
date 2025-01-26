package dev.wms.isusosdown.initialStats.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@Data
public class InitialDownServiceStatsDTO extends InitialServiceStatsDTO {

    private Long downSince;

    public InitialDownServiceStatsDTO(InitialServiceStatsDTO initialServiceStatsDTO, Long downSince){
        super(initialServiceStatsDTO.getTitle(),
                initialServiceStatsDTO.getUptime(),
                initialServiceStatsDTO.getDowntimes(),
                initialServiceStatsDTO.getLastDowntimeEndDate());
        this.downSince = downSince;
    }
}
