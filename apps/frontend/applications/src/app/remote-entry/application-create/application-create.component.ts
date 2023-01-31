import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";
import {ProcessComponent} from "@launchpad/frontend/ui";
import {NzStepsModule} from "ng-zorro-antd/steps";
import {NzLayoutModule} from "ng-zorro-antd/layout";

@Component({
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzIconModule, RouterLink, RouterLinkActive, ProcessComponent, NzStepsModule, NzLayoutModule],
  templateUrl: './application-create.component.html',
  styleUrls: ['./application-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationCreateComponent {
  constructor(public readonly route: ActivatedRoute) {}
}
