package main.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Questions.
 */
@Entity
@Table(name = "questions")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Questions implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "test_questions")
    private String testQuestions;

    @ManyToOne
    @JsonIgnoreProperties("questions")
    private Tests tests;

    @OneToMany(mappedBy = "questions" , fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Answers> answers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTestQuestions() {
        return testQuestions;
    }

    public Questions testQuestions(String testQuestions) {
        this.testQuestions = testQuestions;
        return this;
    }

    public void setTestQuestions(String testQuestions) {
        this.testQuestions = testQuestions;
    }

    public Tests getTests() {
        return tests;
    }

    public Questions tests(Tests tests) {
        this.tests = tests;
        return this;
    }

    public void setTests(Tests tests) {
        this.tests = tests;
    }

    public Set<Answers> getAnswers() {
        return answers;
    }

    public Questions answers(Set<Answers> answers) {
        this.answers = answers;
        return this;
    }

    public Questions addAnswers(Answers answers) {
        this.answers.add(answers);
        answers.setQuestions(this);
        return this;
    }

    public Questions removeAnswers(Answers answers) {
        this.answers.remove(answers);
        answers.setQuestions(null);
        return this;
    }

    public void setAnswers(Set<Answers> answers) {
        this.answers = answers;
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
        Questions questions = (Questions) o;
        if (questions.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), questions.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Questions{" +
            "id=" + getId() +
            ", testQuestions='" + getTestQuestions() + "'" +
            "}";
    }
}
