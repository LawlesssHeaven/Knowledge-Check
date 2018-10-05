package main.web.rest;

import com.codahale.metrics.annotation.Timed;
import main.domain.Answers;
import main.domain.Tests;
import main.repository.TestsRepository;
import main.service.TestRequest;
import main.service.TestResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URISyntaxException;
import java.util.concurrent.atomic.AtomicReference;

@RestController
@RequestMapping("/api")
public class GradeController {
    @Autowired
    TestsRepository testsRepository;

    @PostMapping("/answers")
    @Timed
    public TestResponse createAnswers(@RequestBody TestRequest testRequest) throws URISyntaxException {
        AtomicReference<Integer> correctAnswers = new AtomicReference<>(0);
        AtomicReference<Integer> wrongAnswers = new AtomicReference<>(0);

        Tests t = testsRepository.getOne(testRequest.getTestId());
        t.getQuestions().forEach(questions -> {
            Integer qId = Math.toIntExact(questions.getId());

            if (testRequest.getAnswersID().containsKey(qId)) {
                Integer aId = Integer.valueOf(testRequest.getAnswersID().get(qId));
                questions.getAnswers().forEach(answers -> {
                    if (answers.isCorrect()) {

                        Integer correctAnsw = Math.toIntExact(answers.getId());
                        if (correctAnsw.equals(aId)) {
                            correctAnswers.getAndSet(correctAnswers.get() + 1);

                        } else {
                            wrongAnswers.getAndSet(wrongAnswers.get() + 1);
                        }

                    }
                });

            }
            // Can add else block to increase incorrect answer count

        });


        return new TestResponse(testRequest.getTestId() ,wrongAnswers.get(),correctAnswers.get());

    }


}
