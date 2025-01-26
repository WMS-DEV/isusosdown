package dev.wms.isusosdown.meme;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface JsosFrontpageMemeRepository extends PagingAndSortingRepository<JsosFrontpageMeme, Long> {

    @Query("SELECT * " +
            "FROM usos_frontpage_meme " +
            "ORDER BY RAND() " +
            "LIMIT 1")
    JsosFrontpageMeme getRandomMeme();

}
