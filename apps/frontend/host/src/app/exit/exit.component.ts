import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent, RubberOutlet} from "@launchpad/frontend/ui";
@Component({
  standalone: true,
  imports: [CommonModule, RubberOutlet, HeaderComponent],
  templateUrl: './exit.component.html',
  styleUrls: ['./exit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExitComponent {
  exit() {
  }
}
