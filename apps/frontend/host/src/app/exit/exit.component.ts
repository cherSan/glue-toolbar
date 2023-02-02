import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GlueService} from "@launchpad/frontend/glue";
import {HeaderComponent, RubberOutlet} from "@launchpad/frontend/ui";
import {first} from "rxjs";

@Component({
  standalone: true,
  imports: [CommonModule, RubberOutlet, HeaderComponent],
  templateUrl: './exit.component.html',
  styleUrls: ['./exit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExitComponent {
  constructor(private glue: GlueService) {
  }
  exit() {
    this.glue.interops.exit()
      .pipe(first())
      .subscribe();
  }
}
