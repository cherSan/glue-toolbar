import { Route } from '@angular/router';
export const appRoutes: Route[] = [
  {
    path: '',
    outlet: 'process',
    loadChildren: () =>
      import('./remote-entry/entry.routes').then((m) => m.remoteRoutes),
  },
];
