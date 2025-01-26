package dev.wms.isusosdown.utils.config;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import dev.wms.isusosdown.utils.provider.PropertiesProvider;
import lombok.EqualsAndHashCode;
import lombok.Value;
import org.springframework.http.ResponseEntity;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * This class is used for formatting exceptions that are thrown by our API. It will be automatically reported
 * on creation to listening exception handling systems
 */
@EqualsAndHashCode(callSuper = true)
@Value
@JsonIgnoreProperties({"stackTrace", "cause", "localizedMessage", "suppressed", "message"})
public class ApiException extends RuntimeException {
    private static final DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    String timestamp;
    String errorMessage;
    String documentation;
    String supportCode;
    @JsonIgnore
    int responseCode;

    public ApiException(String message, Throwable t){
        this(message, 500, t);
    }

    public ApiException(Throwable t) {
        this(t.getMessage(), 500, t);
    }

    public ApiException(String message) {
        this.timestamp = getTimeStamp();
        this.errorMessage = message;
        this.responseCode = 500;
        this.documentation = getDocumentationReference();
        this.supportCode = report(this);
    }

    public ApiException(Throwable t, int responseCode) {
        this(t.getMessage(), responseCode, t);
    }

    public ApiException(String errorMessage, int responseCode, Throwable t) {
        this.timestamp = getTimeStamp();
        this.errorMessage = errorMessage;
        this.responseCode = responseCode;
        this.documentation = getDocumentationReference();
        this.supportCode = report(t);
    }

    private String report(Throwable t){
        return ExceptionReporter.report(t);
    }

    @NotNull
    private String getTimeStamp() {
        return LocalDateTime.now().format(dateFormat);
    }

    public ResponseEntity<ApiException> toResponseEntity(){
        return ResponseEntity.status(responseCode).body(this);
    }

    private String getDocumentationReference() {
        return PropertiesProvider.getDocumentationReferenceUrl();
    }
}
