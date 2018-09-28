import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAnswers } from 'app/shared/model/answers.model';
import { Principal } from 'app/core';
import { AnswersService } from './answers.service';

@Component({
    selector: 'jhi-answers',
    templateUrl: './answers.component.html'
})
export class AnswersComponent implements OnInit, OnDestroy {
    answers: IAnswers[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private answersService: AnswersService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.answersService.query().subscribe(
            (res: HttpResponse<IAnswers[]>) => {
                this.answers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAnswers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAnswers) {
        return item.id;
    }

    registerChangeInAnswers() {
        this.eventSubscriber = this.eventManager.subscribe('answersListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
