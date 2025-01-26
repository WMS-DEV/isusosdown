package dev.wms.isusosdown.trackedService.repository;

import dev.wms.isusosdown.trackedService.entity.TrackedService;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TrackedServicesRepository extends CrudRepository<TrackedService, Long> {

    @Query("SELECT id " +
            "FROM tracked_service " +
            "WHERE tracked_service.url = :url")
    Optional<Long> findTrackedServiceIdByUrl(String url);

    boolean existsByNameOrUrl(String name, String url);

    List<TrackedService> findTrackedServicesByGroupId(Long groupId);

    @Modifying
    @Query("UPDATE tracked_service " +
            "SET group_id = :groupId " +
            "WHERE id = :idService")
    void updateServiceGroupId(Long idService, Long groupId);

    @Override
    List<TrackedService> findAllById(@NotNull Iterable<Long> ids);

    @Override
    List<TrackedService> findAll();
}
