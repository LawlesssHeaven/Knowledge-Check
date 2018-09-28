package main.web.rest;

import main.KnowledgeCheckApp;

import main.domain.Answers;
import main.repository.AnswersRepository;
import main.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static main.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AnswersResource REST controller.
 *
 * @see AnswersResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = KnowledgeCheckApp.class)
public class AnswersResourceIntTest {

    private static final String DEFAULT_TEST_ANSWER = "AAAAAAAAAA";
    private static final String UPDATED_TEST_ANSWER = "BBBBBBBBBB";

    private static final Boolean DEFAULT_CORRECT = false;
    private static final Boolean UPDATED_CORRECT = true;

    @Autowired
    private AnswersRepository answersRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAnswersMockMvc;

    private Answers answers;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AnswersResource answersResource = new AnswersResource(answersRepository);
        this.restAnswersMockMvc = MockMvcBuilders.standaloneSetup(answersResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Answers createEntity(EntityManager em) {
        Answers answers = new Answers()
            .testAnswer(DEFAULT_TEST_ANSWER)
            .correct(DEFAULT_CORRECT);
        return answers;
    }

    @Before
    public void initTest() {
        answers = createEntity(em);
    }

    @Test
    @Transactional
    public void createAnswers() throws Exception {
        int databaseSizeBeforeCreate = answersRepository.findAll().size();

        // Create the Answers
        restAnswersMockMvc.perform(post("/api/answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(answers)))
            .andExpect(status().isCreated());

        // Validate the Answers in the database
        List<Answers> answersList = answersRepository.findAll();
        assertThat(answersList).hasSize(databaseSizeBeforeCreate + 1);
        Answers testAnswers = answersList.get(answersList.size() - 1);
        assertThat(testAnswers.getTestAnswer()).isEqualTo(DEFAULT_TEST_ANSWER);
        assertThat(testAnswers.isCorrect()).isEqualTo(DEFAULT_CORRECT);
    }

    @Test
    @Transactional
    public void createAnswersWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = answersRepository.findAll().size();

        // Create the Answers with an existing ID
        answers.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAnswersMockMvc.perform(post("/api/answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(answers)))
            .andExpect(status().isBadRequest());

        // Validate the Answers in the database
        List<Answers> answersList = answersRepository.findAll();
        assertThat(answersList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAnswers() throws Exception {
        // Initialize the database
        answersRepository.saveAndFlush(answers);

        // Get all the answersList
        restAnswersMockMvc.perform(get("/api/answers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(answers.getId().intValue())))
            .andExpect(jsonPath("$.[*].testAnswer").value(hasItem(DEFAULT_TEST_ANSWER.toString())))
            .andExpect(jsonPath("$.[*].correct").value(hasItem(DEFAULT_CORRECT.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getAnswers() throws Exception {
        // Initialize the database
        answersRepository.saveAndFlush(answers);

        // Get the answers
        restAnswersMockMvc.perform(get("/api/answers/{id}", answers.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(answers.getId().intValue()))
            .andExpect(jsonPath("$.testAnswer").value(DEFAULT_TEST_ANSWER.toString()))
            .andExpect(jsonPath("$.correct").value(DEFAULT_CORRECT.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAnswers() throws Exception {
        // Get the answers
        restAnswersMockMvc.perform(get("/api/answers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAnswers() throws Exception {
        // Initialize the database
        answersRepository.saveAndFlush(answers);

        int databaseSizeBeforeUpdate = answersRepository.findAll().size();

        // Update the answers
        Answers updatedAnswers = answersRepository.findById(answers.getId()).get();
        // Disconnect from session so that the updates on updatedAnswers are not directly saved in db
        em.detach(updatedAnswers);
        updatedAnswers
            .testAnswer(UPDATED_TEST_ANSWER)
            .correct(UPDATED_CORRECT);

        restAnswersMockMvc.perform(put("/api/answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAnswers)))
            .andExpect(status().isOk());

        // Validate the Answers in the database
        List<Answers> answersList = answersRepository.findAll();
        assertThat(answersList).hasSize(databaseSizeBeforeUpdate);
        Answers testAnswers = answersList.get(answersList.size() - 1);
        assertThat(testAnswers.getTestAnswer()).isEqualTo(UPDATED_TEST_ANSWER);
        assertThat(testAnswers.isCorrect()).isEqualTo(UPDATED_CORRECT);
    }

    @Test
    @Transactional
    public void updateNonExistingAnswers() throws Exception {
        int databaseSizeBeforeUpdate = answersRepository.findAll().size();

        // Create the Answers

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAnswersMockMvc.perform(put("/api/answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(answers)))
            .andExpect(status().isBadRequest());

        // Validate the Answers in the database
        List<Answers> answersList = answersRepository.findAll();
        assertThat(answersList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAnswers() throws Exception {
        // Initialize the database
        answersRepository.saveAndFlush(answers);

        int databaseSizeBeforeDelete = answersRepository.findAll().size();

        // Get the answers
        restAnswersMockMvc.perform(delete("/api/answers/{id}", answers.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Answers> answersList = answersRepository.findAll();
        assertThat(answersList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Answers.class);
        Answers answers1 = new Answers();
        answers1.setId(1L);
        Answers answers2 = new Answers();
        answers2.setId(answers1.getId());
        assertThat(answers1).isEqualTo(answers2);
        answers2.setId(2L);
        assertThat(answers1).isNotEqualTo(answers2);
        answers1.setId(null);
        assertThat(answers1).isNotEqualTo(answers2);
    }
}
