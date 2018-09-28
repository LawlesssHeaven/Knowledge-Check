/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KnowledgeCheckTestModule } from '../../../test.module';
import { AnswersComponent } from 'app/entities/answers/answers.component';
import { AnswersService } from 'app/entities/answers/answers.service';
import { Answers } from 'app/shared/model/answers.model';

describe('Component Tests', () => {
    describe('Answers Management Component', () => {
        let comp: AnswersComponent;
        let fixture: ComponentFixture<AnswersComponent>;
        let service: AnswersService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [KnowledgeCheckTestModule],
                declarations: [AnswersComponent],
                providers: []
            })
                .overrideTemplate(AnswersComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AnswersComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnswersService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Answers(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.answers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
