package dev.wms.isusosdown.trackedService.dto;

import dev.wms.isusosdown.trackedService.entity.Group;
import lombok.*;

import jakarta.validation.constraints.NotBlank;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GroupDTO {
    private Long groupId;
    @NotBlank
    private String name;

    public static GroupDTO of(Group group) {
        return GroupDTO.builder()
                .groupId(group.getId())
                .name(group.getName())
                .build();
    }
}
