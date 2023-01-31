import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent, NavigationItemComponent, RubberOutlet } from '@launchpad/frontend/ui';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import {GlueService} from "@launchpad/frontend/glue";
@Component({
  standalone: true,
  imports: [
    HeaderComponent,
    NzButtonModule,
    NzIconModule,
    RouterLink,
    RouterLinkActive,
    RubberOutlet,
    NavigationItemComponent,
    NzCardModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  constructor(
    public readonly route: ActivatedRoute,
    private readonly glueService: GlueService
  ) {}
  feedback() {
    this.glueService.glue.feedback({ message: 'Feedback from settings' });
  }
}
