/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KnowledgeCheckTestModule } from '../../../test.module';
import { TestsComponent } from 'app/entities/tests/tests.component';
import { TestsService } from 'app/entities/tests/tests.service';
import { Tests } from 'app/shared/model/tests.model';

describe('Component Tests', () => {
    describe('Tests Management Component', () => {
        let comp: TestsComponent;
        let fixture: ComponentFixture<TestsComponent>;
        let service: TestsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [KnowledgeCheckTestModule],
                declarations: [TestsComponent],
                providers: []
            })
                .overrideTemplate(TestsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TestsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Tests(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.tests[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
