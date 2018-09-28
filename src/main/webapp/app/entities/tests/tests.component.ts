import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITests } from 'app/shared/model/tests.model';
import { Principal } from 'app/core';
import { TestsService } from './tests.service';

@Component({
    selector: 'jhi-tests',
    templateUrl: './tests.component.html'
})
export class TestsComponent implements OnInit, OnDestroy {
    tests: ITests[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private testsService: TestsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.testsService.query().subscribe(
            (res: HttpResponse<ITests[]>) => {
                this.tests = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTests();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITests) {
        return item.id;
    }

    registerChangeInTests() {
        this.eventSubscriber = this.eventManager.subscribe('testsListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
