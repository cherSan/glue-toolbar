import { Route } from '@angular/router';
import { loadRemoteModule } from '@nrwl/angular/mf';
import {ToolbarComponent} from "./toolbar/toolbar.component";

export const appRoutes: Route[] = [
  {
    path: 'applications',
    loadChildren: () =>
      loadRemoteModule('frontend-applications', './Routes').then(
        (m) => m.remoteRoutes
      ),
    data: {
      weight: 0
    }
  },
  {
    path: 'workspaces',
    loadChildren: () =>
      loadRemoteModule('frontend-workspaces', './Routes').then(
        (m) => m.remoteRoutes
      ),
    data: {
      weight: 0
    }
  },
  {
    path: '',
    component: ToolbarComponent,
    data: {
      weight: 1
    },
    children: [
      {
        path: 'settings',
        loadComponent: () => import('./settings/settings.component').then(c => c.SettingsComponent),
        data: {
          width: 300
        }
      },
      {
        path: 'exit',
        loadComponent: () => import('./exit/exit.component').then(c => c.ExitComponent),
        data: {
          width: 340
        }
      }
    ]
  },
  {
    path: 'information',
    outlet: 'process',
    loadChildren: () =>
      loadRemoteModule('frontend-information', './Routes').then(
        (m) => m.remoteRoutes
      ),
  }
];
