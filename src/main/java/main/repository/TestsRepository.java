package main.repository;

import main.domain.Tests;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Tests entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestsRepository extends JpaRepository<Tests, Long> {

}
