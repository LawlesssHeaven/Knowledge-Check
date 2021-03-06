package main.web.rest;

import com.codahale.metrics.annotation.Timed;
import main.domain.Answers;
import main.domain.TestResults;
import main.domain.Tests;
import main.domain.User;
import main.repository.TestResultsRepository;
import main.repository.TestsRepository;
import main.service.TestRequest;
import main.service.TestResponse;
import main.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URISyntaxException;
import java.util.concurrent.atomic.AtomicReference;

@RestController
@RequestMapping("/api")
@Transactional
public class GradeController {
    //@Autowired
    TestsRepository testsRepository;
    TestResultsRepository testResultsRepository;
    UserService userService;

    Logger logger = LoggerFactory.getLogger(GradeController.class);

    public GradeController(TestsRepository repository, TestResultsRepository testResultsRepository ,UserService userService){
        this.testResultsRepository = testResultsRepository;
        this.testsRepository = repository;
        this.userService = userService;
    }

    @PostMapping("/rate")
    @Timed
    public TestResponse rateTest(@RequestBody TestRequest testRequest) throws URISyntaxException {
        logger.info("Test request" + testRequest.toString());

        AtomicReference<Integer> correctAnswers = new AtomicReference<>(0);
        AtomicReference<Integer> wrongAnswers = new AtomicReference<>(0);

        Tests t = testsRepository.getOne(testRequest.getTestId());
        logger.info("From database" + t);


        t.getQuestions().forEach(questions -> {
            Integer qId = Math.toIntExact(questions.getId());
            if (testRequest.getAnswersID().containsKey(qId)) {
                Integer aId = Integer.valueOf(testRequest.getAnswersID().get(qId));
                logger.info("aID is " + aId);

                questions.getAnswers().forEach(answers -> {
                    logger.info("Is answer correct" + answers.isCorrect());

                    if (answers.isCorrect()) {

                        Integer correctAnsw = Math.toIntExact(answers.getId());
                        if (correctAnsw.equals(aId)) {
                            correctAnswers.getAndSet(correctAnswers.get() + 1);
                            logger.info("Correct Answers" + correctAnsw);


                        } else {
                            wrongAnswers.getAndSet(wrongAnswers.get() + 1);
                            logger.info("Wrong Answers" + wrongAnswers);
                        }

                    }
                });

            }

        });
        Tests tests = new Tests();
        tests.setId(testRequest.getTestId());
        User user = new User();
        user.setId(userService.getUserWithAuthorities().get().getId());
        TestResults testResults = new TestResults(correctAnswers.get(), wrongAnswers.get(),testRequest.getTestId(),userService.getUserWithAuthorities().get().getId());

        testResultsRepository.save(testResults);


        return new TestResponse(testRequest.getTestId(), wrongAnswers.get(), correctAnswers.get());

    }


}
