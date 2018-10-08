import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';

import {UserAnswerResultsModel} from "app/shared/model/userAnswerResults.model";
type EntityArrayResponseType = HttpResponse<UserAnswerResultsModel>;

@Injectable({ providedIn: 'root' })
export class TestTotalResultService {
    private resourceUrl = SERVER_API_URL + 'api/rate';
    constructor(private http: HttpClient) {}

    returnAllResults(): Observable<EntityArrayResponseType> {
        return this.http.get<UserAnswerResultsModel>(`${this.resourceUrl}`, { observe: 'response' });
    }
}
