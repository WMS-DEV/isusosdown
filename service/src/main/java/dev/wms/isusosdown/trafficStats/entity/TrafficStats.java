package dev.wms.isusosdown.trafficStats.entity;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Data
@Builder
public class TrafficStats {
    @Id
    private Long id;
    private String service;
    private int totalVisitsThisMonth;
    private double bounceRatePercentage;
    private double pagesPerVisit;
    private Long averageVisitDurationMillis;
    private LocalDateTime queryDate;
}
