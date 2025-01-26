package dev.wms.isusosdown.trackedService.dto;

import dev.wms.isusosdown.trackedService.entity.TrackedService;
import lombok.*;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrackedServiceDTO {

    private Long id;
    @NotBlank
    private String name;
    @NotBlank
    private String url;
    private boolean isActive;
    @NotNull
    private Long groupId;

    public static TrackedServiceDTO of(TrackedService trackedService) {
        return TrackedServiceDTO.builder()
                .id(trackedService.getId())
                .name(trackedService.getName())
                .url(trackedService.getUrl())
                .isActive(trackedService.isActive())
                .groupId(trackedService.getGroupId())
                .build();
    }

}
