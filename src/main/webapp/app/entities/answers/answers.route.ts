import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Answers } from 'app/shared/model/answers.model';
import { AnswersService } from './answers.service';
import { AnswersComponent } from './answers.component';
import { AnswersDetailComponent } from './answers-detail.component';
import { AnswersUpdateComponent } from './answers-update.component';
import { AnswersDeletePopupComponent } from './answers-delete-dialog.component';
import { IAnswers } from 'app/shared/model/answers.model';

@Injectable({ providedIn: 'root' })
export class AnswersResolve implements Resolve<IAnswers> {
    constructor(private service: AnswersService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((answers: HttpResponse<Answers>) => answers.body));
        }
        return of(new Answers());
    }
}

export const answersRoute: Routes = [
    {
        path: 'answers',
        component: AnswersComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Answers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'answers/:id/view',
        component: AnswersDetailComponent,
        resolve: {
            answers: AnswersResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Answers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'answers/new',
        component: AnswersUpdateComponent,
        resolve: {
            answers: AnswersResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Answers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'answers/:id/edit',
        component: AnswersUpdateComponent,
        resolve: {
            answers: AnswersResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Answers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const answersPopupRoute: Routes = [
    {
        path: 'answers/:id/delete',
        component: AnswersDeletePopupComponent,
        resolve: {
            answers: AnswersResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Answers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
