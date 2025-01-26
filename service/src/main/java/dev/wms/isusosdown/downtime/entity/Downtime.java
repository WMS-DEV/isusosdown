package dev.wms.isusosdown.downtime.entity;

import dev.wms.isusosdown.csv.core.appendable.CSVAppendable;
import dev.wms.isusosdown.downtime.dto.EndDowntimeInfoDTO;
import dev.wms.isusosdown.utils.DateUtils;
import lombok.Builder;
import lombok.ToString;
import lombok.Value;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Value
@Builder
@ToString
public class Downtime implements CSVAppendable {

    @Id
    Long id;
    String url;
    LocalDateTime startDate;
    LocalDateTime endDate;
    Long durationMillis;
    Long trackedServiceId;

    public static Downtime of(EndDowntimeInfoDTO endDowntimeInfoDto, String url, Long trackedServiceId){
        return Downtime.builder()
                .url(url)
                .startDate(DateUtils.getLocalDateTimeFromMillis(endDowntimeInfoDto.getDownSince()))
                .endDate(DateUtils.getLocalDateTimeFromMillis(endDowntimeInfoDto.getDownTill()))
                .durationMillis(endDowntimeInfoDto.getDowntimeLength())
                .trackedServiceId(trackedServiceId)
                .build();
    }

    @Override
    public String toCSV() {
        return String.format("%s,%s,%s,%d", url, startDate.toString(), endDate.toString(), durationMillis);
    }

}
