package dev.wms.isusosdown.downtime.repository;

import dev.wms.isusosdown.downtime.dto.DowntimeDTO;
import dev.wms.isusosdown.downtime.dto.DowntimeChartDataDTO;
import dev.wms.isusosdown.downtime.dto.DowntimeStatsDTO;
import dev.wms.isusosdown.downtime.entity.Downtime;
import dev.wms.isusosdown.initialStats.dto.InitialStatsDowntimeDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface DowntimeRepository extends CrudRepository<Downtime, Long> {

    @Query("SELECT COUNT(*) AS downtimes " +
            "FROM downtime " +
            "GROUP BY downtime.tracked_service_id " +
            "ORDER BY downtimes DESC " +
            "LIMIT 1")
    long getMaximalNumberOfDowntimesRecordedForSingleService();

    @Query("SELECT start_date AS down_since, end_date AS down_till " +
            "FROM downtime " +
            "INNER JOIN tracked_service ON downtime.tracked_service_id = tracked_service.id " +
            "WHERE tracked_service.url = :url " +
            "LIMIT :limit")
    List<DowntimeDTO> getDowntimes(String url, int limit);

    @Query("SELECT (UNIX_TIMESTAMP(start_date)*1000) AS down_since, (UNIX_TIMESTAMP(end_date)*1000) AS down_till " +
            "FROM downtime " +
            "INNER JOIN tracked_service ON downtime.tracked_service_id = tracked_service.id " +
            "WHERE tracked_service.url = :url AND downtime.start_date > :minDateTime AND (duration_millis > :duration) " +
            "LIMIT :limit")
    List<InitialStatsDowntimeDTO> getDowntimesWithDateAndDurationAbove(String url, int limit, LocalDateTime minDateTime, Long duration);

    @Query("SELECT end_date " +
            "FROM downtime " +
            "INNER JOIN tracked_service ON downtime.tracked_service_id = tracked_service.id " +
            "WHERE tracked_service.url = :url " +
            "ORDER BY end_date DESC " +
            "LIMIT 1")
    LocalDateTime getLastDowntimeEndDateForService(String url);

    @Query("SELECT SUM(duration_millis) " +
            "FROM downtime " +
            "INNER JOIN tracked_service ON downtime.tracked_service_id = tracked_service.id " +
            "WHERE tracked_service.url = :url")
    Long getSumOfDowntimes(String url);

    @Query("SELECT DATE(start_date) AS date_of_downtimes, COUNT(*) AS number_of_downtimes, " +
            "SUM(duration_millis) AS total_downtime_length_millis " +
            "FROM downtime " +
            "INNER JOIN tracked_service ON downtime.tracked_service_id = tracked_service.id " +
            "WHERE tracked_service.url = :url AND start_date > :minDate " +
            "GROUP BY date_of_downtimes")
    List<DowntimeChartDataDTO> getDowntimeChart(String url, LocalDate minDate);

    @Query("SELECT COUNT(*) AS recorded_downtimes, SUM(duration_millis) AS total_Downtimes_Duration " +
            "FROM downtime " +
            "INNER JOIN tracked_service ON downtime.tracked_service_id = tracked_service.id " +
            "WHERE tracked_service.url = :url")
    DowntimeStatsDTO getDowntimeStatsDTO(String url);

    @Query("SELECT tracked_service.url AS service_url, COUNT(*) AS recorded_downtimes, SUM(duration_millis) AS total_downtimes_duration " +
            "FROM downtime " +
            "INNER JOIN tracked_service ON downtime.tracked_service_id = tracked_service.id " +
            "WHERE end_date < :endDate " +
            "GROUP BY tracked_service.url " +
            "ORDER BY recorded_downtimes DESC ")
    List<DowntimeStatsDTO> getDowntimeStatsBeforeDateGroupedByUrlOrderByRecordedDowntimes(LocalDate endDate);

    @Query("SELECT tracked_service.url AS service_url, COUNT(*) AS recorded_downtimes, SUM(duration_millis) AS total_downtimes_duration " +
            "FROM downtime " +
            "INNER JOIN tracked_service ON downtime.tracked_service_id = tracked_service.id " +
            "WHERE end_date < :endDate AND group_id = :groupId " +
            "GROUP BY tracked_service.url " +
            "ORDER BY recorded_downtimes DESC ")
    List<DowntimeStatsDTO> getDowntimeStatsBeforeDateGroupedByUrlOrderByRecordedDowntimesFromGroup(LocalDate endDate,
                                                                                                   Long groupId);

    @Query("SELECT tracked_service.url AS service_url, COUNT(*) AS recorded_downtimes, SUM(duration_millis) AS total_downtimes_duration " +
            "FROM downtime " +
            "INNER JOIN tracked_service ON downtime.tracked_service_id = tracked_service.id " +
            "WHERE start_date > :startDate AND end_date < :endDate " +
            "GROUP BY tracked_service.url " +
            "ORDER BY recorded_downtimes DESC ")
    List<DowntimeStatsDTO> getDowntimeStatsBetweenDatesGroupedByUrlOrderByRecordedDowntimes(LocalDate startDate,
                                                                                            LocalDate endDate);

    @Query("SELECT tracked_service.url AS service_url, COUNT(*) AS recorded_downtimes, SUM(duration_millis) AS total_downtimes_duration " +
            "FROM downtime " +
            "INNER JOIN tracked_service ON downtime.tracked_service_id = tracked_service.id " +
            "WHERE start_date > :startDate AND end_date < :endDate AND group_id = :groupId " +
            "GROUP BY tracked_service.url " +
            "ORDER BY recorded_downtimes DESC ")
    List<DowntimeStatsDTO> getDowntimeStatsBetweenDatesGroupedByUrlOrderByRecordedDowntimesFromGroup(LocalDate startDate,
                                                                                            LocalDate endDate,
                                                                                            Long groupId);

    List<Downtime> findAllByOrderByStartDateDesc(Pageable pageable);
}