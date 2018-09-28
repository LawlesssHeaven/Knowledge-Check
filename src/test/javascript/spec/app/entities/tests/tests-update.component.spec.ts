/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { KnowledgeCheckTestModule } from '../../../test.module';
import { TestsUpdateComponent } from 'app/entities/tests/tests-update.component';
import { TestsService } from 'app/entities/tests/tests.service';
import { Tests } from 'app/shared/model/tests.model';

describe('Component Tests', () => {
    describe('Tests Management Update Component', () => {
        let comp: TestsUpdateComponent;
        let fixture: ComponentFixture<TestsUpdateComponent>;
        let service: TestsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [KnowledgeCheckTestModule],
                declarations: [TestsUpdateComponent]
            })
                .overrideTemplate(TestsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TestsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Tests(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tests = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Tests();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tests = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
