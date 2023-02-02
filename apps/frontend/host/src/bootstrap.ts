import { bootstrap } from '@launchpad/frontend/core';
import {InteropExit} from "@launchpad/frontend/glue";
import { appRoutes } from './app/app.routes';

bootstrap(appRoutes, {
  interops: [ InteropExit ]
});
