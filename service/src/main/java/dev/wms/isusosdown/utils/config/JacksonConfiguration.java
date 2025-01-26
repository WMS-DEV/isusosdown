package dev.wms.isusosdown.utils.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.joda.JodaModule;
import com.fasterxml.jackson.datatype.jsr310.JSR310Module;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JacksonConfiguration {

    //byla potrzebna rejestracja JodaModule do nowszej wersji springa, tutaj zbedne, narazie zostawilem
    //byla potrzeba zarejestrowac JSR310Module, bo przesylamy LocalDate w addidtionalu
    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JodaModule());
        objectMapper.registerModule(new JSR310Module());
        return objectMapper;
    }
}