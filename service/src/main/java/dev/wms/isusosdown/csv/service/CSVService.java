package dev.wms.isusosdown.csv.service;


import dev.wms.isusosdown.downtime.repository.DowntimeRepository;
import dev.wms.isusosdown.downtime.entity.Downtime;
import dev.wms.isusosdown.csv.core.builder.CSVBuilder;
import dev.wms.isusosdown.csv.core.builder.StringBuilderCSVBuilder;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Getter
public class CSVService {

    private final int downtimeCap;
    private final CSVBuilder csvBuilder;
    private final DowntimeRepository downtimeRepository;
    private String downtimesCSV;

    public CSVService(@Value("${isusosdown.csv-file-headers}") String headers,
                      @Value("${isusosdown.csv-file-size-cap}") int downtimeCap, DowntimeRepository downtimeRepository) {
        this.downtimeCap = downtimeCap;
        this.downtimeRepository = downtimeRepository;
        this.csvBuilder = new StringBuilderCSVBuilder(headers);
    }

    @Scheduled(fixedDelayString = "${isusosdown.csv-refresh-delay}")
    private void buildCSV() {
        downtimesCSV = null;
        downtimesCSV = csvBuilder.buildCSV(getCappedDowntimes());
    }

    private List<Downtime> getCappedDowntimes() {
        return downtimeRepository.findAllByOrderByStartDateDesc(Pageable.ofSize(downtimeCap));
    }
}
