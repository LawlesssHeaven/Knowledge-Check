import { NgModule } from '@angular/core';

import { KnowledgeCheckSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [KnowledgeCheckSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [KnowledgeCheckSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class KnowledgeCheckSharedCommonModule {}
