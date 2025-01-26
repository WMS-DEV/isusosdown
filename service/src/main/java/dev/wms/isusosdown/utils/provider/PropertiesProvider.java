package dev.wms.isusosdown.utils.provider;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class PropertiesProvider {

    @Getter
    private static String documentationReferenceUrl;
    @Getter
    private static BigDecimal recordingStartDateMillis;

    public PropertiesProvider(
            @Value("${isusosdown.downtime-recording-start-date-millis}") String recordingStartDateMillis,
            @Value("${api.documentation.reference}") String documentationReference) {
        PropertiesProvider.recordingStartDateMillis = BigDecimal.valueOf(Long.parseLong(recordingStartDateMillis));
        documentationReferenceUrl = documentationReference;
    }

}
