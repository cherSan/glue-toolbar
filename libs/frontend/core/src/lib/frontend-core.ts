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
  ContainerComponent,
  NotificationService,
  RubberOutletService,
} from '@launchpad/frontend/ui';
import {
  getGlueProviders,
  GlueService,
  VisibleAreasService,
} from '@launchpad/frontend/glue';
import {Interops, Streams} from "@launchpad/frontend/glue/interops";
import {Applications, applicationsStream} from "@launchpad/frontend/glue/applications";
import {Windows, windowCloseInterop, windowOpenInterop, windowsStream} from "@launchpad/frontend/glue/windows";
import {currentLayoutStream, layoutsStream} from "@launchpad/frontend/glue/tabs";
import { applicationEnvironmentInitialize } from './application-environment-initialize';
import {BootstrapOptions} from "./types";

export function bootstrap(
  appRoutes: Routes,
  options: BootstrapOptions = {}
): Promise<ApplicationRef> {
  return bootstrapApplication(options.component || ContainerComponent, {
    providers: [
      ...(options.providers || []),
      windowsStream,
      applicationsStream,
      layoutsStream,
      currentLayoutStream,
      windowCloseInterop,
      windowOpenInterop,
      provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
      provideAnimations(),
      provideHttpClient(),
      getGlueProviders(),
      GlueService,
      Streams,
      Interops,
      Windows,
      Applications,
      VisibleAreasService,
      RubberOutletService,
      NotificationService,
      {
        provide: ENVIRONMENT_INITIALIZER,
        useFactory: applicationEnvironmentInitialize,
        multi: true,
        deps: [GlueService, Streams, Interops, Windows],
      },
      {
        provide: Window,
        useValue: window,
        multi: false
      }
    ],
  });
}
