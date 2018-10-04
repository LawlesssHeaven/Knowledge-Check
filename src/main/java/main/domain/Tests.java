package main.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Tests.
 */
@Entity
@Table(name = "tests")
//@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Tests implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "test_title")
    private String testTitle;

    @OneToMany(mappedBy = "tests",fetch = FetchType.EAGER , orphanRemoval = true)
//    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Questions> questions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTestTitle() {
        return testTitle;
    }

    public Tests testTitle(String testTitle) {
        this.testTitle = testTitle;
        return this;
    }

    public void setTestTitle(String testTitle) {
        this.testTitle = testTitle;
    }

    public Set<Questions> getQuestions() {
        return questions;
    }

    public Tests questions(Set<Questions> questions) {
        this.questions = questions;
        return this;
    }

    public Tests addQuestions(Questions questions) {
        this.questions.add(questions);
        questions.setTests(this);
        return this;
    }

    public Tests removeQuestions(Questions questions) {
        this.questions.remove(questions);
        questions.setTests(null);
        return this;
    }

    public void setQuestions(Set<Questions> questions) {
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
        Tests tests = (Tests) o;
        if (tests.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tests.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Tests{" +
            "id=" + getId() +
            ", testTitle='" + getTestTitle() + "'" +
            "}";
    }
}
