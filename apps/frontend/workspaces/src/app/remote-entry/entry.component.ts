import { Component } from '@angular/core';
import {HeaderComponent} from "@launchpad/frontend/ui";
@Component({
  standalone: true,
  template: `
    <ui-header
      [title]="'Applications'"
      [avatar]="{icon: 'cluster'}"
      [back]="['..']">
    </ui-header>`,
  imports: [
    HeaderComponent
  ]
})
export class RemoteEntryComponent {}
