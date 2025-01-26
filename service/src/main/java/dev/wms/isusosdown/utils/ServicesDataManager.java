package dev.wms.isusosdown.utils;

import dev.wms.isusosdown.downtime.service.DowntimeStatusService;
import dev.wms.isusosdown.responseTime.service.ResponseTimeChecker;
import dev.wms.isusosdown.utils.structures.ServicesDataProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ServicesDataManager {

    private final DowntimeStatusService downtimeStatusService;
    private final ResponseTimeChecker responseTimeChecker;
    private final ServicesDataProvider servicesDataProvider;

    public void updateServicesData() {
        responseTimeChecker.updateServices();
        downtimeStatusService.updateServices();
        servicesDataProvider.updateServices();
    }

}
