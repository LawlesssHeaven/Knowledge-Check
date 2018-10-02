import {AfterViewInit, Component, OnInit} from '@angular/core';
import  {TestsService} from "app/entities/tests";
import {ITests} from "app/shared/model/tests.model";

@Component({
  selector: 'jhi-student-tests',
  templateUrl: './student-tests.component.html',
  styleUrls: [
    'student-tests.scss'
  ]
})
export class StudentTestsComponent implements OnInit, AfterViewInit  {

  message: string;
  testData : ITests[];

  constructor(private testsService: TestsService) {
    this.message = 'StudentTestsComponent message';
  }

  ngOnInit() {

  }

    ngAfterViewInit(): void {

        console.log("This is real shit");
        this.testsService.returnAll().subscribe(
            (res) => {
                // map Your response with model class
                // do Stuff Here or create method ITests[]
                console.log(res.body);
                this.testData = res.body;

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
