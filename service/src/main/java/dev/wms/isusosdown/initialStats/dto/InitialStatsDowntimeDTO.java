package dev.wms.isusosdown.initialStats.dto;

public record InitialStatsDowntimeDTO(Long downSince, Long downTill) {
    public static InitialStatsDowntimeDTO of(Long downSince, Long downTill) {
        return new InitialStatsDowntimeDTO(downSince, downTill);
    }

}
