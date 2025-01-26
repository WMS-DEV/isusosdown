package dev.wms.isusosdown.additionalStats.service;

import dev.wms.isusosdown.downtime.repository.DowntimeRepository;
import dev.wms.isusosdown.trafficStats.repository.TrafficStatsRepository;
import dev.wms.isusosdown.additionalStats.dto.DowntimeStatsRankingDTO;
import dev.wms.isusosdown.additionalStats.dto.HeadToHeadDTO;
import dev.wms.isusosdown.additionalStats.dto.AdditionalStatsDTO;
import dev.wms.isusosdown.downtime.dto.DowntimeStatsDTO;
import dev.wms.isusosdown.trafficStats.dto.TrafficStatsDTO;
import dev.wms.isusosdown.downtime.service.DowntimeScoreService;
import dev.wms.isusosdown.downtime.service.DowntimeStatusService;
import dev.wms.isusosdown.utils.exceptions.ServiceNotSupportedException;
import dev.wms.isusosdown.utils.provider.PropertiesProvider;
import dev.wms.isusosdown.utils.structures.ServicesDataProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.MessageFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdditionalStatsService {

    private final ServicesDataProvider servicesDataProviderImpl;
    private final DowntimeStatusService downtimeStatusService;
    private final DowntimeRepository downtimeRepository;
    private final DowntimeScoreService downtimeScoreService;
    private final TrafficStatsRepository trafficStatsRepository;

    public AdditionalStatsDTO getAdditionalStats(String serviceName){
        log.info("Getting additional stats for service: {}", serviceName);
        String url = Optional.ofNullable(servicesDataProviderImpl.getUrlByServiceName(serviceName))
                .orElseThrow(() -> new ServiceNotSupportedException(String.format("Service named: %s is not supported", serviceName)));
        DowntimeStatsDTO downtimeStatsDTO = downtimeRepository.getDowntimeStatsDTO(url);
        long maximalNumberOfDowntimesRecordedForService = downtimeRepository.getMaximalNumberOfDowntimesRecordedForSingleService();

        log.info("Returning additional stats for service: {}", serviceName);
        return AdditionalStatsDTO.builder()
                .serviceName(serviceName)
                .serviceUrl(url)
                .isActive(downtimeStatusService.getServiceDowntimeStartDate(serviceName).isEmpty())
                .recordedDowntimes(downtimeStatsDTO.getRecordedDowntimes())
                .totalDowntimeMillis(downtimeStatsDTO.getTotalDowntimesDuration())
                .totalUptimeMillis(downtimeStatsDTO.getTotalUptimeMillis())
                .averageDowntimeLengthMillis(downtimeStatsDTO.getAverageDowntimeLength())
                .averageUptimeLengthMillis(downtimeStatsDTO.getAverageUptimeLength())
                .recordingStatsSinceMillis(PropertiesProvider.getRecordingStartDateMillis())
                .chart(downtimeRepository.getDowntimeChart(url, LocalDate.now().minusDays(60)))
                .trafficStats(getTrafficStats(serviceName))
                .allTimeDowntimeScore(getDowntimeScore(downtimeStatsDTO, maximalNumberOfDowntimesRecordedForService))
                .build();
    }

    public List<DowntimeStatsRankingDTO> composeDowntimeRanking(Optional<LocalDate> startDate, Optional<LocalDate> endDate,
                                                                Boolean descendingOrder, Optional<Long> optionalGroupId) {
        List<DowntimeStatsDTO> downtimeStatsDTOs = getDowntimeStats(startDate, endDate, optionalGroupId);
        log.info("Got {} downtimes from DB", downtimeStatsDTOs.size());
        List<DowntimeStatsRankingDTO> downtimeStatsRankingDTOS = new ArrayList<>();
        if(downtimeStatsDTOs.isEmpty()) {
            return downtimeStatsRankingDTOS;
        }

        downtimeStatsRankingDTOS = createDowntimesRanking(downtimeStatsDTOs);
        sortRankingList(downtimeStatsRankingDTOS, descendingOrder);

        return downtimeStatsRankingDTOS;
    }

    private List<DowntimeStatsDTO> getDowntimeStats(Optional<LocalDate> startDate, Optional<LocalDate> endDate,
                                                    Optional<Long> groupId) {
        log.info("Gettig downtimes from DB");
        LocalDate parsedEndDate = endDate.orElseGet(LocalDate::now);
        return startDate
                .map(parsedStartDate -> groupId.isPresent()
                        ? downtimeRepository.getDowntimeStatsBetweenDatesGroupedByUrlOrderByRecordedDowntimesFromGroup(
                                parsedStartDate, parsedEndDate, groupId.get())
                        : downtimeRepository.getDowntimeStatsBetweenDatesGroupedByUrlOrderByRecordedDowntimes(
                parsedStartDate, parsedEndDate))
                .orElse(groupId.isPresent()
                        ? downtimeRepository.getDowntimeStatsBeforeDateGroupedByUrlOrderByRecordedDowntimesFromGroup(
                                parsedEndDate, groupId.get())
                        : downtimeRepository.getDowntimeStatsBeforeDateGroupedByUrlOrderByRecordedDowntimes(parsedEndDate));
    }

    private TrafficStatsDTO getTrafficStats(String serviceName) {
        return trafficStatsRepository.findFirstByServiceOrderByQueryDateDesc(serviceName)
                .map(TrafficStatsDTO::of)
                .orElse(null);
    }

    private List<DowntimeStatsRankingDTO> createDowntimesRanking(List<DowntimeStatsDTO> downtimeStatsDTOs) {
        List<DowntimeStatsRankingDTO> downtimeStatsRankingDTOS = new ArrayList<>();
        long maxNumberOfRecordedDowntimes = downtimeStatsDTOs.get(0).getRecordedDowntimes();
        downtimeStatsDTOs.forEach(downtimeStatsDTO ->
                downtimeStatsRankingDTOS.add(convertToDowntimeRankDTO(downtimeStatsDTO, maxNumberOfRecordedDowntimes)));
        log.info("Downtimes ranking list created");
        return downtimeStatsRankingDTOS;
    }

    private void sortRankingList(List<DowntimeStatsRankingDTO> downtimeStatsRankingDTOS, Boolean descendingOrder) {
        log.info("Sorting downtime ranking list");
        downtimeStatsRankingDTOS.sort(descendingOrder ? getRandDowntimeComparator().reversed() : getRandDowntimeComparator());
    }

    private Comparator<DowntimeStatsRankingDTO> getRandDowntimeComparator() {
        return Comparator.comparing(DowntimeStatsRankingDTO::downtimeScore)
                .thenComparing(DowntimeStatsRankingDTO::totalDowntimesDuration);
    }
  
    private DowntimeStatsRankingDTO convertToDowntimeRankDTO(DowntimeStatsDTO downtimeStatsDTO, long maxNumberOfRecordedDowntimes) {

        return DowntimeStatsRankingDTO.builder()
                .serviceName(servicesDataProviderImpl.getServiceNameByUrl(downtimeStatsDTO.getServiceUrl()))
                .serviceUrl(downtimeStatsDTO.getServiceUrl())
                .recordedDowntimes(downtimeStatsDTO.getRecordedDowntimes())
                .totalDowntimesDuration(downtimeStatsDTO.getTotalDowntimesDuration())
                .averageDowntimeDuration(downtimeStatsDTO.getAverageDowntimeLength())
                .downtimeScore(getDowntimeScore(downtimeStatsDTO, maxNumberOfRecordedDowntimes))
                .build();

    }

    private BigDecimal getDowntimeScore(DowntimeStatsDTO downtimeStatsDTO, long maxNumberOfRecordedDowntimes) {
        return downtimeScoreService.calculateDowntimeScore(downtimeStatsDTO, maxNumberOfRecordedDowntimes);
    }

    public HeadToHeadDTO getHeadToHead(List<String> serviceNames) {
        log.trace("Creating head to head stats for services: {}", serviceNames);
        return HeadToHeadDTO.builder()
                .servicesStats(serviceNames.stream().map(this::getAdditionalStats).toList())
                .build();
    }
}
