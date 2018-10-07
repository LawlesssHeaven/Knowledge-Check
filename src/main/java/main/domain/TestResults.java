package main.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Answers.
 */
@Entity
@Table(name = "TEST_RESULT")
//@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class
TestResults implements Serializable {
    public TestResults(Integer correctAnswer, Integer wrongAnswer, long tests, long user) {
        this.correctAnswer = correctAnswer;
        this.wrongAnswer = wrongAnswer;
        this.tests = tests;
        this.user = user;
    }

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    @Column(name = "CORRECT_ANSW")
    private Integer correctAnswer;

    @Column(name = "WRONG_ANSW")
    private Integer wrongAnswer;

    @Column(name = "TESTS_ID")
    private long tests;

    @Column(name = "USER_ID")
    private long user;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(Integer correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public Integer getWrongAnswer() {
        return wrongAnswer;
    }

    public void setWrongAnswer(Integer wrongAnswer) {
        this.wrongAnswer = wrongAnswer;
    }

    public long getTests() {
        return tests;
    }

    public void setTests(long tests) {
        this.tests = tests;
    }

    public long getUser() {
        return user;
    }

    public void setUser(long user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TestResults that = (TestResults) o;
        return Objects.equals(id, that.id) &&
            Objects.equals(correctAnswer, that.correctAnswer) &&
            Objects.equals(wrongAnswer, that.wrongAnswer) &&
            Objects.equals(tests, that.tests) &&
            Objects.equals(user, that.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, correctAnswer, wrongAnswer, tests, user);
    }

    @Override
    public String toString() {
        return "TestResults{" +
            "id=" + id +
            ", correctAnswer=" + correctAnswer +
            ", wrongAnswer=" + wrongAnswer +
            ", tests=" + tests +
            ", user=" + user +
            '}';
    }
}
