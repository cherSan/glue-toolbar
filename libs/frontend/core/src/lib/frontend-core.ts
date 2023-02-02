import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  Routes,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import {ApplicationRef, ENVIRONMENT_INITIALIZER, Type} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import {
  ContainerComponent, NotificationService,
  RubberOutletService,
} from '@launchpad/frontend/ui';
import {
  APPLICATION_INTEROPS,
  ApplicationInterop,
  getGlueProviders,
  GlueService,
  VisibleAreasService,
} from '@launchpad/frontend/glue';
import { applicationEnvironmentInitialize } from './application-environment-initialize';
type BootstrapOptions = {
  interops?: ApplicationInterop[],
  component?: Type<unknown>,
}
export function bootstrap(
  appRoutes: Routes,
  options: BootstrapOptions = {}
): Promise<ApplicationRef> {
  return bootstrapApplication(options.component || ContainerComponent, {
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
        deps: [GlueService, APPLICATION_INTEROPS],
      },
      {
        provide: APPLICATION_INTEROPS,
        useValue: options.interops || [],
        multi: false,
        deps: [],
      },
      {
        provide: Window,
        useValue: window,
        multi: true,
      }
    ],
  });
}
