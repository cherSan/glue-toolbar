import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";
import {HeaderComponent, NavigationItemComponent, RubberOutlet} from "@launchpad/frontend/ui";

@Component({
  standalone: true,
  imports: [CommonModule, RubberOutlet, HeaderComponent, NavigationItemComponent, RouterLinkActive, RouterLink],
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdministrationComponent {
  constructor(
    public readonly route: ActivatedRoute,
  ) {}
}
