import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent, RubberOutlet} from "@launchpad/frontend/ui";

@Component({
  standalone: true,
  imports: [CommonModule, RubberOutlet, HeaderComponent],
  templateUrl: './applications-filter.component.html',
  styleUrls: ['./applications-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsFilterComponent {}
