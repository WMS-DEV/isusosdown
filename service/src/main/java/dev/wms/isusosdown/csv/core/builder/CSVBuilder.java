package dev.wms.isusosdown.csv.core.builder;

import dev.wms.isusosdown.csv.core.appendable.CSVAppendable;

import java.util.List;

/*
    Builds CSV String from list of entities that implement CSVAppendable interface,
    result may be stored in memory or file.
 */
public interface CSVBuilder {
    String buildCSV(List<? extends CSVAppendable> CSVAppendables);
}
