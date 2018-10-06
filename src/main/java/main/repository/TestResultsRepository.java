package main.repository;

import main.domain.Answers;
import main.domain.TestResults;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Answers entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestResultsRepository extends JpaRepository<TestResults, Long> {

}
