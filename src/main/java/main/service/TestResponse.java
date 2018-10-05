package main.service;

public class TestResponse {
    long testId;
    int wrongCount;
    int correctCount;

    public TestResponse(long testId, int wrongCount, int correctCount) {
        this.testId = testId;
        this.wrongCount = wrongCount;
        this.correctCount = correctCount;
    }

    public long getTestId() {
        return testId;
    }

    public void setTestId(long testId) {
        this.testId = testId;
    }

    public int getWrongCount() {
        return wrongCount;
    }

    public void setWrongCount(int wrongCount) {
        this.wrongCount = wrongCount;
    }

    public int getCorrectCount() {
        return correctCount;
    }

    public void setCorrectCount(int correctCount) {
        this.correctCount = correctCount;
    }
}
