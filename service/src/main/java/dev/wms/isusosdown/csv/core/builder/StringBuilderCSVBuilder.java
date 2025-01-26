package dev.wms.isusosdown.csv.core.builder;


import dev.wms.isusosdown.csv.core.appendable.CSVAppendable;

import java.util.List;

/*
    A StringBuilder implementation of CSVBuilder which stores CSV String in memory, as a class variable.
 */
public class StringBuilderCSVBuilder implements CSVBuilder {

    private final String headers;
    private final StringBuilder builder;

    public StringBuilderCSVBuilder(String headers) {
        this.headers = headers;
        this.builder = new StringBuilder();
    }

    public String buildCSV(List<? extends CSVAppendable> CSVAppendables) {
        initializeBuilderWithHeaders();
        for(CSVAppendable appendable: CSVAppendables) {
            builder.append(appendable.toCSV()).append("\n");
        }

        String result = builder.toString();
        builder.delete(0, builder.length());

        return result;
    }

    private void initializeBuilderWithHeaders() {
        builder.append(headers).append("\n");
    }
}
