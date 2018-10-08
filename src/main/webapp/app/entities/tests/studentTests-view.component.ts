import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITests } from 'app/shared/model/tests.model';
import { TestRequestModel } from 'app/shared/model/testRequest.model';
import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IAnswers } from 'app/shared/model/answers.model';
import { StudentTestsService } from 'app/entities/tests/studentTests.service';
import { TestResponseModel } from 'app/shared/model/TestResponseModel';

@Component({
    selector: 'jhi-studentTests-view',
    templateUrl: './studentTests-view.component.html'
})
export class TestsViewDetailComponent implements OnInit {
    tests: ITests;
    showSmth: boolean = false;
    allGood: boolean = false;
    copyAnswer: {};
    options: any = [];
    option: any = [];
    constructor(private activatedRoute: ActivatedRoute, private studentTestsService: StudentTestsService) {}
    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tests }) => {
            this.tests = tests;
        });
    }
    ngDoCheck() {
        let optionsLength = this.options.length - 1;
        let questionLength = this.tests.questions.length;
        this.allGood = optionsLength == questionLength;
    }

    previousState() {
        window.history.back();
    }
    onSubmit() {
        var request = new TestRequestModel(this.tests.id, this.cleanArray(this.options));

        console.log('Clean array options ' + request.answersID);

        this.subscribeToSaveResponse(this.studentTestsService.create(request));
    }

    cleanArray(actual) {
        var newArray: { [key: string]: string } = {};

        for (let key in actual) {
            let value = actual[key] + '';

            newArray[key] = value; // String key is fine
        }
        console.log('Our new Array' + newArray);
        return newArray;
    }
    public subscribeToSaveResponse(result: Observable<HttpResponse<any>>) {
        result.subscribe((res: HttpResponse<any>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onSaveError(res));
    }
    public onSaveSuccess(res: HttpResponse<any>) {
        var myObject: TestResponseModel;

        myObject = <TestResponseModel>res.body; // using <>
        this.copyAnswer = myObject;
        this.showSmth = true;
        console.log('How many Wrong count' + myObject.wrongCount);
        console.log('How many  Correct count' + myObject.correctCount);

        console.log('On save Success' + res);
    }
    private onSaveError(res) {
        console.log('On save ERRRORRRR' + res);
    }
}
