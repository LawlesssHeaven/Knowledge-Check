import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITests } from 'app/shared/model/tests.model';
import { TestsService } from './tests.service';
import { TestResponseModel } from 'app/shared/model/TestResponseModel';

@Component({
    selector: 'jhi-studentTests-totalDialog',
    templateUrl: './studentTests-totalDialog.component.html'
})
export class StudentTestsTotalDialogs {
    tests: ITests;

    constructor(private testsService: TestsService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.testsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'testsListModifications',
                content: 'Deleted an tests'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tests-total-popup',
    template: ''
})
export class StudentTestsTotalDialogPopupComponents implements OnInit {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tests }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(StudentTestsTotalDialogs as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.tests = tests;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }
}
