/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { KnowledgeCheckTestModule } from '../../../test.module';
import { TestsDeleteDialogComponent } from 'app/entities/tests/tests-delete-dialog.component';
import { TestsService } from 'app/entities/tests/tests.service';

describe('Component Tests', () => {
    describe('Tests Management Delete Component', () => {
        let comp: TestsDeleteDialogComponent;
        let fixture: ComponentFixture<TestsDeleteDialogComponent>;
        let service: TestsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [KnowledgeCheckTestModule],
                declarations: [TestsDeleteDialogComponent]
            })
                .overrideTemplate(TestsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TestsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
