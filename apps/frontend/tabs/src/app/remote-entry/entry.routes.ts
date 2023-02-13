import { Route } from '@angular/router';
import {TabsComponent} from "./tabs/tabs.component";
import {TabDetailsComponent} from "./tab-details/tab-details.component";

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: TabsComponent,
    children: [
      {
        path: 'details/:tabName',
        component: TabDetailsComponent,
      }
    ]
  },
];
