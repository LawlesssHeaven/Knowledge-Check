/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KnowledgeCheckTestModule } from '../../../test.module';
import { TestsDetailComponent } from 'app/entities/tests/tests-detail.component';
import { Tests } from 'app/shared/model/tests.model';

describe('Component Tests', () => {
    describe('Tests Management Detail Component', () => {
        let comp: TestsDetailComponent;
        let fixture: ComponentFixture<TestsDetailComponent>;
        const route = ({ data: of({ tests: new Tests(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [KnowledgeCheckTestModule],
                declarations: [TestsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TestsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TestsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.tests).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
