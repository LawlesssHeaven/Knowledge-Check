import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITests } from 'app/shared/model/tests.model';
import { StudentTestsService } from 'app/entities/tests/studentTests.service';
import { TestResponseModel } from 'app/shared/model/TestResponseModel';

@Injectable({ providedIn: 'root' })
export class TestsResultService {
    private resourceUrl = SERVER_API_URL + 'api/test-total-result';
    constructor(private http: HttpClient) {}
}
