import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzIconModule, RouterLink, RouterLinkActive],
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateApplicationComponent {
  constructor(public readonly route: ActivatedRoute) {}
}
