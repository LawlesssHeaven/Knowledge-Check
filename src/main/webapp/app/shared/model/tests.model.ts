import { IQuestions } from 'app/shared/model//questions.model';

export interface ITests {
    id?: number;
    testTitle?: string;
    questions?: IQuestions[];
}

export class Tests implements ITests {
    constructor(public id?: number, public testTitle?: string, public questions?: IQuestions[]) {}
}
