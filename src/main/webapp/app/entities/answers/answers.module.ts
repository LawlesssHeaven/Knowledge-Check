import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KnowledgeCheckSharedModule } from 'app/shared';
import {
    AnswersComponent,
    AnswersDetailComponent,
    AnswersUpdateComponent,
    AnswersDeletePopupComponent,
    AnswersDeleteDialogComponent,
    answersRoute,
    answersPopupRoute
} from './';

const ENTITY_STATES = [...answersRoute, ...answersPopupRoute];

@NgModule({
    imports: [KnowledgeCheckSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AnswersComponent,
        AnswersDetailComponent,
        AnswersUpdateComponent,
        AnswersDeleteDialogComponent,
        AnswersDeletePopupComponent
    ],
    entryComponents: [AnswersComponent, AnswersUpdateComponent, AnswersDeleteDialogComponent, AnswersDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KnowledgeCheckAnswersModule {}
