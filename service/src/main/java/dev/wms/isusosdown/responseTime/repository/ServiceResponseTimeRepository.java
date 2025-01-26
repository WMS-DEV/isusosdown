package dev.wms.isusosdown.responseTime.repository;

import dev.wms.isusosdown.responseTime.entity.ServiceResponseTime;
import org.springframework.data.repository.CrudRepository;

public interface ServiceResponseTimeRepository extends CrudRepository<ServiceResponseTime, Long> {
}
