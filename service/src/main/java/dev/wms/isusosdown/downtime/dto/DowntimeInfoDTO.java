package dev.wms.isusosdown.downtime.dto;

import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class DowntimeInfoDTO {

    protected String service;
    protected Long downSince;

    public static DowntimeInfoDTO of(String service, Long downSince) {
        return DowntimeInfoDTO.builder()
                .service(service)
                .downSince(downSince)
                .build();
    }

}
