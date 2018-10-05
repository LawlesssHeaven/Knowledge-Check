import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITests } from 'app/shared/model/tests.model';
import {TestRequestModel} from "app/shared/model/testRequest.model";

@Component({
    selector: 'jhi-studentTests-view',
    templateUrl: './studentTests-view.component.html'
})
export class TestsViewDetailComponent implements OnInit {
    tests: ITests;
    options: any = [];
    option: any = [];


    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tests }) => {
            this.tests = tests;
        });
    }

    previousState() {
        window.history.back();
    }



    onSubmit() {
        var request  = new TestRequestModel(this.tests.id , this.options);
        console.log("TESTING SUBMIT BUTTON");
        console.log(this.options);
        console.log(this.option);

    }




}
