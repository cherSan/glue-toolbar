import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GlueService} from "@launchpad/frontend/glue";

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exit.component.html',
  styleUrls: ['./exit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExitComponent {
  constructor(private glue: GlueService) {
  }
  exit() {
    this.glue.interops.exit().subscribe(v => console.log(v), e => console.error(e));
  }
}
