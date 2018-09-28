import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KnowledgeCheckSharedModule } from 'app/shared';
import {
    QuestionsComponent,
    QuestionsDetailComponent,
    QuestionsUpdateComponent,
    QuestionsDeletePopupComponent,
    QuestionsDeleteDialogComponent,
    questionsRoute,
    questionsPopupRoute
} from './';

const ENTITY_STATES = [...questionsRoute, ...questionsPopupRoute];

@NgModule({
    imports: [KnowledgeCheckSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QuestionsComponent,
        QuestionsDetailComponent,
        QuestionsUpdateComponent,
        QuestionsDeleteDialogComponent,
        QuestionsDeletePopupComponent
    ],
    entryComponents: [QuestionsComponent, QuestionsUpdateComponent, QuestionsDeleteDialogComponent, QuestionsDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KnowledgeCheckQuestionsModule {}
