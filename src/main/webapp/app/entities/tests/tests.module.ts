import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KnowledgeCheckSharedModule } from 'app/shared';
import {
    TestsComponent,
    TestsDetailComponent,
    TestsViewDetailComponent,
    TestsUpdateComponent,
    TestsDeletePopupComponent,
    TestsDeleteDialogComponent,
    testsRoute,
    testsPopupRoute,
    testsTotalPopupRoute,
    StudentTestsTotalDialogPopupComponents,
    StudentTestsTotalDialogs
} from './';

const ENTITY_STATES = [...testsRoute, ...testsPopupRoute, ...testsTotalPopupRoute];

@NgModule({
    imports: [KnowledgeCheckSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TestsComponent,
        TestsDetailComponent,
        TestsViewDetailComponent,
        TestsUpdateComponent,
        TestsDeleteDialogComponent,
        TestsDeletePopupComponent,
        StudentTestsTotalDialogPopupComponents,
        StudentTestsTotalDialogs
    ],
    entryComponents: [
        TestsComponent,
        TestsUpdateComponent,
        TestsDeleteDialogComponent,
        TestsDeletePopupComponent,
        StudentTestsTotalDialogPopupComponents,
        StudentTestsTotalDialogs
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KnowledgeCheckTestsModule {}
