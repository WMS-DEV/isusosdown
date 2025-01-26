package dev.wms.isusosdown.notifications;

public interface NotificationService {

    <T> void notify(String destination, T info);

}
