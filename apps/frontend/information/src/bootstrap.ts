import { bootstrap } from '@launchpad/frontend/core';
import { appRoutes } from './app/app.routes';
import { RootComponent } from "./app/remote-entry/root/root.component";

bootstrap(appRoutes, {
  component: RootComponent
});
