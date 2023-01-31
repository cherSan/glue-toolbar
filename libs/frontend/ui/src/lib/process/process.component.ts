import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzLayoutModule} from "ng-zorro-antd/layout";

@Component({
  selector: 'ui-process',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzIconModule, RouterLink, RouterLinkActive, NzPageHeaderModule, NzLayoutModule],
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessComponent {
  @Input() title!: string;
  constructor(public readonly route: ActivatedRoute) {
  }
}
