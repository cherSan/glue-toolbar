import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  standalone: true,
  imports: [CommonModule, NzDescriptionsModule, NzTabsModule, NzTypographyModule, NzButtonModule, NzIconModule, RouterLink, RouterLinkActive],
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationComponent {
  constructor(public readonly route: ActivatedRoute) {}
}
