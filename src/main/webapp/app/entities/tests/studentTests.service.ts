import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAnswers } from 'app/shared/model/answers.model';
import {TestRequestModel} from "app/shared/model/testRequest.model";
import {TestResponseModel} from "app/shared/model/TestResponseModel";

type TestResponseType = HttpResponse<TestResponseModel>;

@Injectable({ providedIn: 'root' })
export class StudentTestsService {
    private resourceUrl = SERVER_API_URL + 'api/rate';

    constructor(private http: HttpClient) {}

    create(rate: TestRequestModel): Observable <any> {
        return this.http.post<TestResponseModel>(this.resourceUrl, rate, { observe: 'response' });
    }

}
