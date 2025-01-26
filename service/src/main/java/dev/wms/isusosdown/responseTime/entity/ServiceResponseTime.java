package dev.wms.isusosdown.responseTime.entity;

import lombok.Builder;
import org.springframework.data.annotation.Id;

import java.util.Date;

@Builder
public record ServiceResponseTime(@Id Long id, String serviceUrl, Long responseTime, Date responseDate) {
}
