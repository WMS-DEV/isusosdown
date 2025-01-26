package dev.wms.isusosdown.trackedService.dto;

import lombok.Builder;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Builder
public record ServiceDTO(@NotBlank String name, @NotBlank String url, @NotNull Long groupId) {
}
