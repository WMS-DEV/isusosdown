package dev.wms.isusosdown;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EnableAsync(proxyTargetClass = true)
public class IsusosdownApplication {

    public static void main(String[] args) {
        SpringApplication.run(IsusosdownApplication.class, args);
    }

}
