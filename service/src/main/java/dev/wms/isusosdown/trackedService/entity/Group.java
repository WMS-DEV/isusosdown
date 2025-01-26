package dev.wms.isusosdown.trackedService.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class Group {

    @Id
    private Long id;
    private String name;

    public Group(String name) {
        this.name = name;
    }

}
