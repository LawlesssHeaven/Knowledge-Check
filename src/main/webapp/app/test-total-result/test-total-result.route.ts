import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { TestTotalResultComponent } from './';

export const TEST_TOTAL_RESULT_ROUTE: Route = {
    path: 'test-total-result',
    component: TestTotalResultComponent,
    data: {
        authorities: [],
        pageTitle: 'test-total-result.title'
    },
    canActivate: [UserRouteAccessService]
};
