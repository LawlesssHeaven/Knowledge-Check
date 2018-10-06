import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITests } from 'app/shared/model/tests.model';
import {TestRequestModel} from "app/shared/model/testRequest.model";
import {Observable} from "rxjs";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {IAnswers} from "app/shared/model/answers.model";
import {StudentTestsService} from "app/entities/tests/studentTests.service";

@Component({
    selector: 'jhi-studentTests-view',
    templateUrl: './studentTests-view.component.html'
})
export class TestsViewDetailComponent implements OnInit {
    tests: ITests;
    options: any = [];
    option: any = [];


    constructor(private activatedRoute: ActivatedRoute , private studentTestsService: StudentTestsService) {}

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
        
        console.log("Var REQUEST" + request)
        console.log("TESTING SUBMIT BUTTON");
        console.log("Var REQUEST ID" + request.id)

        console.log("Var REQUEST OPTIONS" + request.options)

        console.log(this.options);
        console.log("Cleaning array "+ this.cleanArray(this.options));

        this.subscribeToSaveResponse(this.studentTestsService.create(request));


    }

    cleanArray(actual) {
        var newArray = new Array();
        for (var i = 0; i < actual.length; i++) {
            if (actual[i]) {
                newArray.push(actual[i]);
            }
        }
        return newArray;
    }



    private subscribeToSaveResponse(result: Observable<HttpResponse<any>>) {
        result.subscribe((res: HttpResponse<any>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onSaveError(res));
    }

    private onSaveSuccess(res) {
        console.log("On save Success" + res);

    }
    private onSaveError(res) {
        console.log("On save ERRRORRRR" + res);
    }

}
