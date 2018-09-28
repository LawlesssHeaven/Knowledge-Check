import { IQuestions } from 'app/shared/model//questions.model';

export interface IAnswers {
    id?: number;
    testAnswer?: string;
    correct?: boolean;
    questions?: IQuestions;
}

export class Answers implements IAnswers {
    constructor(public id?: number, public testAnswer?: string, public correct?: boolean, public questions?: IQuestions) {
        this.correct = this.correct || false;
    }
}
