package dev.wms.isusosdown.additionalStats.dto;

import lombok.Builder;

import java.util.List;

@Builder
public record HeadToHeadDTO(List<AdditionalStatsDTO> servicesStats) {
}
