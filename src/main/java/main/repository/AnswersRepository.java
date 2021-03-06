package main.repository;

import main.domain.Answers;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Answers entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AnswersRepository extends JpaRepository<Answers, Long> {

}
