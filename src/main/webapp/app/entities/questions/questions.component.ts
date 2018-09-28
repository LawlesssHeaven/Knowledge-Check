import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IQuestions } from 'app/shared/model/questions.model';
import { Principal } from 'app/core';
import { QuestionsService } from './questions.service';

@Component({
    selector: 'jhi-questions',
    templateUrl: './questions.component.html'
})
export class QuestionsComponent implements OnInit, OnDestroy {
    questions: IQuestions[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private questionsService: QuestionsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.questionsService.query().subscribe(
            (res: HttpResponse<IQuestions[]>) => {
                this.questions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInQuestions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IQuestions) {
        return item.id;
    }

    registerChangeInQuestions() {
        this.eventSubscriber = this.eventManager.subscribe('questionsListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
