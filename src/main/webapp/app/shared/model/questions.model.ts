import { ITests } from 'app/shared/model//tests.model';
import { IAnswers } from 'app/shared/model//answers.model';

export interface IQuestions {
    id?: number;
    testQuestions?: string;
    tests?: ITests;
    answers?: IAnswers[];
}

export class Questions implements IQuestions {
    constructor(public id?: number, public testQuestions?: string, public tests?: ITests, public answers?: IAnswers[]) {}
}
