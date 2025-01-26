package dev.wms.isusosdown.csv.controller;

import dev.wms.isusosdown.csv.service.CSVService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/isusosdown/csv-data")
@RequiredArgsConstructor
public class CSVController {

    @Value("${isusosdown.csv-file-name}")
    private String DOWNTIME_CSV_FILE_NAME;
    private final CSVService csvService;

    @GetMapping(produces = "text/csv")
    public ResponseEntity<String> getDowntimeDataCSV() {
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, "text/csv")
                .header(HttpHeaders.CONTENT_DISPOSITION, String.format("attachment; filename=\"%s\"", DOWNTIME_CSV_FILE_NAME))
                .body(csvService.getDowntimesCSV());
    }
}
