import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  Routes,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import {ApplicationRef, ENVIRONMENT_INITIALIZER} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import {
  ContainerComponent, NotificationService,
  RubberOutletService,
} from '@launchpad/frontend/ui';
import {
  getGlueProviders,
  GlueService,
  VisibleAreasService,
} from '@launchpad/frontend/glue';
import { applicationEnvironmentInitialize } from './application-environment-initialize';
export function bootstrap(appRoutes: Routes): Promise<ApplicationRef> {
  return bootstrapApplication(ContainerComponent, {
    providers: [
      provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
      provideAnimations(),
      provideHttpClient(),
      getGlueProviders(),
      GlueService,
      VisibleAreasService,
      RubberOutletService,
      NotificationService,
      {
        provide: ENVIRONMENT_INITIALIZER,
        useFactory: applicationEnvironmentInitialize,
        multi: true,
        deps: [GlueService],
      },
      {
        provide: Window,
        useValue: window,
        multi: true,
      }
    ],
  });
}
