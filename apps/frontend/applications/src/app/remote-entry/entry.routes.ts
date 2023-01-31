import { Route } from '@angular/router';
import {ApplicationsComponent} from "./applications/applications.component";
import {ApplicationCreateComponent} from "./application-create/application-create.component";
import {ApplicationDetailsComponent} from "./application-details/application-details.component";
import {ApplicationReportComponent} from "./application-report/application-report.component";
import {ApplicationsFilterComponent} from "./applications-filter/applications-filter.component";

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: ApplicationsComponent,
    children: [
      {
        path: 'details/:applicationName',
        component: ApplicationDetailsComponent,
        children: [
          {
            path: 'report',
            component: ApplicationReportComponent,
            data: {
              width: 240
            }
          }
        ],
        data: {
          width: 400
        }
      },
      {
        path: 'filter',
        component: ApplicationsFilterComponent,
        data: {
          width: 200
        }
      }
    ]
  }
];

export const createApplicationRoute: Route[] = [
  {
    path: '',
    component: ApplicationCreateComponent
  }
];
