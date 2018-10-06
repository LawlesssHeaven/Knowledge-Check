package main.service;

import java.util.Map;

public class TestRequest {

    long testId;
    // Integer == QuestionID String == answerID
    Map<Integer, String> answersID;
    public TestRequest() {

    }
    public TestRequest(long testId, Map<Integer, String> answersID) {
        this.testId = testId;
        this.answersID = answersID;
    }


    public long getTestId() {
        return testId;
    }

    public void setTestId(long testId) {
        this.testId = testId;
    }

    public Map<Integer, String> getAnswersID() {
        return answersID;
    }

    public void setAnswersID(Map<Integer, String> answersID) {
        this.answersID = answersID;
    }

    @Override
    public String toString() {
        return "TestRequest{" +
            "testId=" + testId +
            ", answersID=" + answersID +
            '}';
    }
}
