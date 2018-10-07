import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-test-total-result',
    templateUrl: './test-total-result.component.html',
    styleUrls: ['test-total-result.scss']
})
export class TestTotalResultComponent implements OnInit {
    message: string;

    constructor() {
        this.message = 'TestTotalResultComponent message';
    }

    ngOnInit() {}
}
