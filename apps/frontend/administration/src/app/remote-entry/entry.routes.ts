import { Route } from '@angular/router';
import {AdministrationComponent} from "./administration/administration.component";
import {SendNotificationComponent} from "./send-notification/send-notification.component";

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: AdministrationComponent,
    children: [
      {
        path: 'notification',
        component: SendNotificationComponent
      }
    ]
  },
];
