package dev.wms.isusosdown.utils.structures;

import dev.wms.isusosdown.trackedService.entity.TrackedService;

import java.util.Collection;
import java.util.List;
import java.util.Set;

public interface ServicesDataProvider {

    void updateServices();

    String getServiceNameByUrl(String value);

    String getUrlByServiceName(String key);

    int getNumberOfServices();

    List<TrackedService> getServices();

    List<TrackedService> getActiveServices();

    Set<String> getServicesNames();

    Collection<String> getServicesUrls();

    List<TrackedService> getServicesForGroup(Long groupId);

    Set<String> getServiceNamesForGroup(Long groupId);

    Collection<String> getServicesUrlsForGroup(Long groupId);

}
