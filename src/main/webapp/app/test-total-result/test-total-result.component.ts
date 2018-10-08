import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserAnswerResultsModel} from "app/shared/model/userAnswerResults.model";
import {TestTotalResultService} from "app/test-total-result/test-total-result.service";
import {TestsService} from "app/entities/tests";
import {TestRequestModel} from "app/shared/model/testRequest.model";

@Component({
    selector: 'jhi-test-total-result',
    templateUrl: './test-total-result.component.html',
    styleUrls: ['test-total-result.scss']
})
export class TestTotalResultComponent implements OnInit, AfterViewInit {
    message: string;
    userData : UserAnswerResultsModel;

    constructor( private resultService: TestTotalResultService) {
        this.message = 'TestTotalResultComponent message';
    }

    ngOnInit() {}


    ngAfterViewInit(): void {

        console.log("This is real shit IN BIG WORLD");
        this.resultService.returnAllResults().subscribe(
            (res) => {
                // map Your response with model class
                // do Stuff Here or create method ITests[]
                console.log(res.body);
                this.userData = res.body;

            },
            (err) => {
                console.log("SHIT HAPPENS");
            }
        );

        // var testRes:ITests[];
        // this.testsService.returnAll();
        // for (let entry of testRes) {
        //     console.log(entry.testTitle); // 1, "string", false
        //
        //
        //
        // }

        // console.log(("THis is real shit")+this.testsService.returnAll());
    }

}
