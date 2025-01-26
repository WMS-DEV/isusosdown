package dev.wms.isusosdown.trackedService.entity;

import lombok.*;
import org.springframework.data.annotation.Id;


@Data
@Builder
@EqualsAndHashCode(of = "id")
public class TrackedService {

    @Id
    private Long id;
    @NonNull
    private String name;
    @NonNull
    private String url;
    private boolean isActive;
    private Long groupId;

}
