import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-student-tests',
  templateUrl: './student-tests.component.html',
  styleUrls: [
    'student-tests.scss'
  ]
})
export class StudentTestsComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'StudentTestsComponent message';
  }

  ngOnInit() {
  }

}
