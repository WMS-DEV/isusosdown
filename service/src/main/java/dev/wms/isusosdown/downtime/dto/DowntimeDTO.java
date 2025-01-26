package dev.wms.isusosdown.downtime.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import dev.wms.isusosdown.utils.config.MillisecondsSerializer;

import java.time.LocalDateTime;

public record DowntimeDTO(@JsonSerialize(using = MillisecondsSerializer.class) LocalDateTime downSince,
                          @JsonSerialize(using = MillisecondsSerializer.class) LocalDateTime downTill) {

    public static DowntimeDTO of(LocalDateTime downSince, LocalDateTime downTill) {
        return new DowntimeDTO(downSince, downTill);
    }

}
