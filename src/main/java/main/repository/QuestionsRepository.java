package main.repository;

import main.domain.Questions;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Questions entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuestionsRepository extends JpaRepository<Questions, Long> {

}
