import { Route } from '@angular/router';
import { loadRemoteModule } from '@nrwl/angular/mf';
import {ToolbarComponent} from "./toolbar/toolbar.component";
export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'toolbar',
    pathMatch: 'full'
  },
  {
    path: 'toolbar',
    component: ToolbarComponent,
    data: {
      weight: 1
    }
  },
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
    path: 'settings',
    loadComponent: () => import('./settings/settings.component').then(c => c.SettingsComponent),
    data: {
      weight: 0
    }
  },
  {
    path: 'administration',
    loadChildren: () =>
      loadRemoteModule('frontend-administration', './Routes').then(
        (m) => m.remoteRoutes
      ),
    data: {
      weight: 0
    }
  },
  {
    path: 'exit',
    loadComponent: () => import('./exit/exit.component').then(c => c.ExitComponent),
    data: {
      weight: 0
    }
  },
  {
    path: 'information',
    outlet: 'process',
    loadChildren: () =>
      loadRemoteModule('frontend-information', './Routes').then(
        (m) => m.remoteRoutes
      ),
  },
  {
    path: 'application-create',
    outlet: 'process',
    loadChildren: () =>
      loadRemoteModule('frontend-applications', './Routes').then(
        (m) => m.createApplicationRoute
      ),
  },
  {
    path: 'list',
    outlet: 'notifications',
    loadChildren: () =>
      loadRemoteModule('frontend-notifications', './Routes').then(
        (m) => m.remoteRoutes
      )
  }
];
