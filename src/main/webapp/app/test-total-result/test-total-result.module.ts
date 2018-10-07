import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KnowledgeCheckSharedModule } from '../shared';

import { TEST_TOTAL_RESULT_ROUTE, TestTotalResultComponent } from './';

@NgModule({
    imports: [KnowledgeCheckSharedModule, RouterModule.forRoot([TEST_TOTAL_RESULT_ROUTE], { useHash: true })],
    declarations: [TestTotalResultComponent],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KnowledgeCheckAppTestTotalResultModule {}
