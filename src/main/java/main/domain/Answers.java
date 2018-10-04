package main.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Answers.
 */
@Entity
@Table(name = "answers")
//@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Answers implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "test_answer")
    private String testAnswer;

    @Column(name = "correct")
    private Boolean correct;

    @ManyToOne
    @JsonIgnoreProperties("answers")
    private Questions questions;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTestAnswer() {
        return testAnswer;
    }

    public Answers testAnswer(String testAnswer) {
        this.testAnswer = testAnswer;
        return this;
    }

    public void setTestAnswer(String testAnswer) {
        this.testAnswer = testAnswer;
    }

    public Boolean isCorrect() {
        return correct;
    }

    public Answers correct(Boolean correct) {
        this.correct = correct;
        return this;
    }

    public void setCorrect(Boolean correct) {
        this.correct = correct;
    }

    public Questions getQuestions() {
        return questions;
    }

    public Answers questions(Questions questions) {
        this.questions = questions;
        return this;
    }

    public void setQuestions(Questions questions) {
        this.questions = questions;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Answers answers = (Answers) o;
        if (answers.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), answers.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Answers{" +
            "id=" + getId() +
            ", testAnswer='" + getTestAnswer() + "'" +
            ", correct='" + isCorrect() + "'" +
            "}";
    }
}
