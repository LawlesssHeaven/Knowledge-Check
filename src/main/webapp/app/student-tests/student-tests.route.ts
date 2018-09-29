import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { StudentTestsComponent } from './';

export const STUDENT_TESTS_ROUTE: Route = {
  path: 'student-tests',
  component: StudentTestsComponent,
  data: {
    authorities: [],
    pageTitle: 'student-tests.title'
  },
  canActivate: [UserRouteAccessService]
};
