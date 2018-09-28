import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITests } from 'app/shared/model/tests.model';

@Component({
    selector: 'jhi-tests-detail',
    templateUrl: './tests-detail.component.html'
})
export class TestsDetailComponent implements OnInit {
    tests: ITests;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tests }) => {
            this.tests = tests;
        });
    }

    previousState() {
        window.history.back();
    }
}
