package dev.wms.isusosdown.utils.advice;

import dev.wms.isusosdown.utils.config.ApiException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GeneralAdvice {

    @ExceptionHandler(Throwable.class)
    public ResponseEntity<ApiException> handleGeneralException(Throwable t) {
        log.error("Unhandled exception occurred: {}", t.getMessage(), t);
        return new ApiException(t).toResponseEntity();
    }

}
