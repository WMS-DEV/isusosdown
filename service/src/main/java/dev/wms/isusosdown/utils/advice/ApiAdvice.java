package dev.wms.isusosdown.utils.advice;

import dev.wms.isusosdown.utils.config.ApiException;
import dev.wms.isusosdown.utils.exceptions.GroupNotFoundException;
import dev.wms.isusosdown.utils.exceptions.ServiceAlreadyTrackedException;
import dev.wms.isusosdown.utils.exceptions.ServiceNotFoundException;
import dev.wms.isusosdown.utils.exceptions.ServiceNotSupportedException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class ApiAdvice {

    @ExceptionHandler(ServiceNotSupportedException.class)
    public ResponseEntity<ApiException> serviceNotSupportedExceptionHandler(ServiceNotSupportedException ex) {
        log.warn(ex.getMessage());
        return new ApiException(ex, HttpStatus.BAD_REQUEST.value()).toResponseEntity();
    }

    @ExceptionHandler(ServiceNotFoundException.class)
    public ResponseEntity<ApiException> serviceNotFoundExceptionHandler(ServiceNotFoundException ex) {
        log.warn(ex.getMessage());
        return new ApiException(ex, HttpStatus.NOT_FOUND.value()).toResponseEntity();
    }

    @ExceptionHandler(GroupNotFoundException.class)
    public ResponseEntity<ApiException> serviceNotFoundExceptionHandler(GroupNotFoundException ex) {
        log.warn(ex.getMessage());
        return new ApiException(ex, HttpStatus.NOT_FOUND.value()).toResponseEntity();
    }

    @ExceptionHandler(ServiceAlreadyTrackedException.class)
    public ResponseEntity<ApiException> serviceAlreadyTrackedExceptionHandler(ServiceAlreadyTrackedException ex) {
        log.warn(ex.getMessage());
        return new ApiException(ex, HttpStatus.BAD_REQUEST.value()).toResponseEntity();
    }

}
