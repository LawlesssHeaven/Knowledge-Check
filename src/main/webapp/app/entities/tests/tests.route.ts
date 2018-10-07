import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tests } from 'app/shared/model/tests.model';
import { TestsService } from './tests.service';
import { TestsComponent } from './tests.component';
import { TestsDetailComponent } from './tests-detail.component';
import { TestsUpdateComponent } from './tests-update.component';
import { TestsDeletePopupComponent } from './tests-delete-dialog.component';
import { ITests } from 'app/shared/model/tests.model';
import { TestsViewDetailComponent } from 'app/entities/tests/studentTests-view.component';
import { StudentTestsTotalDialogPopupComponents } from './studentTests-totalDialog.component';

@Injectable({ providedIn: 'root' })
export class TestsResolve implements Resolve<ITests> {
    constructor(private service: TestsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((tests: HttpResponse<Tests>) => tests.body));
        }
        return of(new Tests());
    }
}

export const testsRoute: Routes = [
    {
        path: 'tests',
        component: TestsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tests'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tests/:id/view',
        component: TestsDetailComponent,
        resolve: {
            tests: TestsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tests'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tests/new',
        component: TestsUpdateComponent,
        resolve: {
            tests: TestsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tests'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tests/:id/edit',
        component: TestsUpdateComponent,
        resolve: {
            tests: TestsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tests'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tests/:id/testView',
        component: TestsViewDetailComponent,
        resolve: {
            tests: TestsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tests'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const testsPopupRoute: Routes = [
    {
        path: 'tests/:id/delete',
        component: TestsDeletePopupComponent,
        resolve: {
            tests: TestsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tests'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
export const testsTotalPopupRoute: Routes = [
    {
        path: 'tests/:id/total',
        component: StudentTestsTotalDialogPopupComponents,
        resolve: {
            tests: TestsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tests'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
