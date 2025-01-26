package dev.wms.isusosdown.notifications;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WebsocketNotificationService implements NotificationService {

    private final SimpMessagingTemplate simpMessagingTemplate;

    @Override
    public <T> void notify(String destination, T info) {
        simpMessagingTemplate.convertAndSend(destination, info);
    }

}
