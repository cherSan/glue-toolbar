import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent, NavigationItemComponent, RubberOutlet } from '@launchpad/frontend/ui';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import {GlueService} from "@launchpad/frontend/glue";
import {first, map, Subject, takeUntil, tap} from "rxjs";
import {Glue42} from "@glue42/desktop";
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
  private live$ = new Subject<void>();
  public informationWindow?: Glue42.Windows.GDWindow;
  constructor(
    public readonly route: ActivatedRoute,
    private readonly glueService: GlueService,
    private readonly changeDetect: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.glueService.streams.windows.stream$
      .pipe(
        takeUntil(this.live$),
        map(data => data.find(w => w.name === 'information-window')),
        map((wnd) => {
          if (wnd?.name) {
            return this.glueService.glue.windows.find(wnd?.name)
          } else {
            return undefined;
          }
        }),
        tap((window) => {
          this.informationWindow = window;
          this.changeDetect.detectChanges();
        })
      )
      .subscribe()
  }
  ngOnDestroy() {
    this.live$.next();
    this.live$.complete();
  }
  feedback() {
    this.glueService.glue.feedback({ message: 'Feedback from settings' });
  }
  information() {
    this.glueService.interops.information()
      .pipe(first())
      .subscribe();
  }
}
