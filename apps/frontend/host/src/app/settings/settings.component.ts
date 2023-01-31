import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent, RubberOutlet } from '@launchpad/frontend/ui';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { GlueService } from '@launchpad/frontend/glue';

@Component({
  standalone: true,
  imports: [
    RubberOutlet,
    HeaderComponent,
    NzButtonModule,
    NzIconModule,
    RouterLink,
    RouterLinkActive,
    NzFormModule,
    NzSwitchModule,
    ReactiveFormsModule,
    NzDescriptionsModule
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  public readonly groupWindows = new FormControl(true);
  public readonly bloombergBridge = new FormControl(true);
  public readonly showGuide = new FormControl(true);
  public readonly form = new FormGroup({
    bloombergBridge: this.bloombergBridge,
    groupWindows: this.groupWindows,
    showGuide: this.showGuide
  });
  public user?: string;
  public region?: string;
  public env?: string;
  public version?: string;
  constructor(
    private glueService: GlueService,
    public readonly route: ActivatedRoute
  ) {
    this.user = glueService.user;
    this.region = glueService.region;
    this.env = glueService.env;
    this.version = glueService.glue.version;
  }
  submitForm() {

  }
}
