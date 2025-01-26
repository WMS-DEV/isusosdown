package dev.wms.isusosdown.utils;

import java.time.*;

public class DateUtils {

    public static Long getMillisFromDate(LocalDate date) {
        return date.toEpochDay();
    }

    public static Long getMillisFromDate(LocalDateTime dateTime) {
        return ZonedDateTime.of(dateTime, ZoneId.of( "Europe/Warsaw")).toInstant().toEpochMilli();
    }

    public static LocalDate getLocalDateFromMillis(Long millis) {
        return LocalDate.ofEpochDay(millis);
    }

    public static LocalDateTime getLocalDateTimeFromMillis(Long millis) {
        return LocalDateTime.ofInstant(Instant.ofEpochMilli(millis), ZoneId.of( "Europe/Warsaw"));
    }

}
