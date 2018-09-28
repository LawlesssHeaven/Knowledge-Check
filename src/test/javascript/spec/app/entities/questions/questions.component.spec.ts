/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KnowledgeCheckTestModule } from '../../../test.module';
import { QuestionsComponent } from 'app/entities/questions/questions.component';
import { QuestionsService } from 'app/entities/questions/questions.service';
import { Questions } from 'app/shared/model/questions.model';

describe('Component Tests', () => {
    describe('Questions Management Component', () => {
        let comp: QuestionsComponent;
        let fixture: ComponentFixture<QuestionsComponent>;
        let service: QuestionsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [KnowledgeCheckTestModule],
                declarations: [QuestionsComponent],
                providers: []
            })
                .overrideTemplate(QuestionsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(QuestionsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuestionsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Questions(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.questions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
