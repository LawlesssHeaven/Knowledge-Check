import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KnowledgeCheckSharedModule } from 'app/shared';
import {
    TestsComponent,
    TestsDetailComponent,
    TestsUpdateComponent,
    TestsDeletePopupComponent,
    TestsDeleteDialogComponent,
    testsRoute,
    testsPopupRoute
} from './';

const ENTITY_STATES = [...testsRoute, ...testsPopupRoute];

@NgModule({
    imports: [KnowledgeCheckSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [TestsComponent, TestsDetailComponent, TestsUpdateComponent, TestsDeleteDialogComponent, TestsDeletePopupComponent],
    entryComponents: [TestsComponent, TestsUpdateComponent, TestsDeleteDialogComponent, TestsDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KnowledgeCheckTestsModule {}
