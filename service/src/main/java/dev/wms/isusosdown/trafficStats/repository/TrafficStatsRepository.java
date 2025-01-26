package dev.wms.isusosdown.trafficStats.repository;

import dev.wms.isusosdown.trafficStats.entity.TrafficStats;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface TrafficStatsRepository extends PagingAndSortingRepository<TrafficStats, Long> {
    Optional<TrafficStats> findFirstByServiceOrderByQueryDateDesc(String service);
}
