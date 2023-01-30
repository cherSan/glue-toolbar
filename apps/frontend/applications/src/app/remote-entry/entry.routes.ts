import { Route } from '@angular/router';
import {ApplicationsComponent} from "./applications/applications.component";
import {CreateApplicationComponent} from "./create-application/create-application.component";
import {ApplicationDetailsComponent} from "./application-details/application-details.component";
import {ApplicationReportComponent} from "./application-report/application-report.component";

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: ApplicationsComponent,
    children: [
      {
        path: ':applicationName',
        component: ApplicationDetailsComponent,
        children: [
          {
            path: 'report',
            component: ApplicationReportComponent,
            data: {
              width: 240
            }
          }
        ]
      }
    ]
  },
  { path: 'create-application', outlet: "process", component: CreateApplicationComponent },
];
