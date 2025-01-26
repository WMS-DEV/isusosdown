package dev.wms.isusosdown.trafficStats.dto;


import dev.wms.isusosdown.trafficStats.entity.TrafficStats;

public record TrafficStatsDTO(int totalVisitsThisMonth,
                              double bounceRatePercentage,
                              double pagesPerVisit,
                              Long averageVisitDurationMillis) {

    public static TrafficStatsDTO of(TrafficStats trafficStats) {
        return new TrafficStatsDTO(trafficStats.getTotalVisitsThisMonth(), trafficStats.getBounceRatePercentage(),
                trafficStats.getPagesPerVisit(), trafficStats.getAverageVisitDurationMillis());
    }

}
