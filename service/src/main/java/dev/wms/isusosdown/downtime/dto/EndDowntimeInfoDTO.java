package dev.wms.isusosdown.downtime.dto;

import lombok.EqualsAndHashCode;
import lombok.Value;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Value
@SuperBuilder
public class EndDowntimeInfoDTO extends DowntimeInfoDTO {

    Long downTill;

    public static EndDowntimeInfoDTO of(DowntimeInfoDTO startDowntimeInfoDto, Long downTill){
        return EndDowntimeInfoDTO.builder()
                .service(startDowntimeInfoDto.service)
                .downSince(startDowntimeInfoDto.downSince)
                .downTill(downTill)
                .build();
    }

    public Long getDowntimeLength() {
        return downTill - downSince;
    }

}
