import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { KnowledgeCheckTestsModule } from './tests/tests.module';
import { KnowledgeCheckQuestionsModule } from './questions/questions.module';
import { KnowledgeCheckAnswersModule } from './answers/answers.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        KnowledgeCheckTestsModule,
        KnowledgeCheckQuestionsModule,
        KnowledgeCheckAnswersModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KnowledgeCheckEntityModule {}
