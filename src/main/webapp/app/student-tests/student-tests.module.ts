import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KnowledgeCheckSharedModule } from '../shared';

import { STUDENT_TESTS_ROUTE, StudentTestsComponent } from './';

@NgModule({
    imports: [
      KnowledgeCheckSharedModule,
      RouterModule.forRoot([ STUDENT_TESTS_ROUTE ], { useHash: true })
    ],
    declarations: [
      StudentTestsComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KnowledgeCheckAppStudentTestsModule {}
