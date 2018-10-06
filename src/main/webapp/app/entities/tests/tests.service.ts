import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITests } from 'app/shared/model/tests.model';
import {TestResponseModel} from "app/shared/model/TestResponseModel";

type EntityResponseType = HttpResponse<ITests>;
type EntityArrayResponseType = HttpResponse<ITests[]>;

@Injectable({ providedIn: 'root' })
export class TestsService {
    private resourceUrl = SERVER_API_URL + 'api/tests';

    constructor(private http: HttpClient) {}

    create(tests: ITests): Observable<EntityResponseType> {
        return this.http.post<ITests>(this.resourceUrl, tests, { observe: 'response' });
    }

    update(tests: ITests): Observable<EntityResponseType> {
        return this.http.put<ITests>(this.resourceUrl, tests, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITests>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITests[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    returnAll(): Observable<EntityArrayResponseType> {
        return this.http.get<ITests[]>(`${this.resourceUrl}`, { observe: 'response' });
    }

}
