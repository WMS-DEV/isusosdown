package dev.wms.isusosdown.utils.exceptions;

public class ServiceAlreadyTrackedException extends RuntimeException {

    public ServiceAlreadyTrackedException(String message) {
        super(message);
    }
}
