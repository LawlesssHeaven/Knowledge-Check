import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITests } from 'app/shared/model/tests.model';
import { TestsService } from './tests.service';

@Component({
    selector: 'jhi-tests-update',
    templateUrl: './tests-update.component.html'
})
export class TestsUpdateComponent implements OnInit {
    private _tests: ITests;
    isSaving: boolean;

    constructor(private testsService: TestsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tests }) => {
            this.tests = tests;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.tests.id !== undefined) {
            this.subscribeToSaveResponse(this.testsService.update(this.tests));
        } else {
            this.subscribeToSaveResponse(this.testsService.create(this.tests));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITests>>) {
        result.subscribe((res: HttpResponse<ITests>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get tests() {
        return this._tests;
    }

    set tests(tests: ITests) {
        this._tests = tests;
    }
}
