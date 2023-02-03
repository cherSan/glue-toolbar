import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent, NavigationItemComponent, RubberOutlet } from '@launchpad/frontend/ui';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import {GlueService} from "@launchpad/frontend/glue";
import {Subject, takeUntil, tap} from "rxjs";
import {Glue42} from "@glue42/desktop";
import {Windows} from "@launchpad/frontend/glue/windows";
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
    private readonly windows: Windows,
    private readonly glueService: GlueService,
    private readonly change: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.windows.window$('information').pipe(
      takeUntil(this.live$),
      tap(w => {
        this.informationWindow = w;
        this.change.detectChanges();
      })
    ).subscribe()
  }
  ngOnDestroy() {
    this.live$.next();
    this.live$.complete();
  }
  feedback() {
    this.glueService.glue.feedback({ message: 'Feedback from settings' });
  }
  process = false;
  information() {
    this.process = true;
    if (this.windows.getWindowByName('information')) {
      this.windows.closeWindow('information')
        .pipe(tap(() => {
          this.process = false;
          this.change.detectChanges();
        }))
        .subscribe();
    } else {
      this.windows.openWindow('information', 'http://localhost:4210', {
        width: 100,
        height: 100,
        onTop: false
      })
        .pipe(tap(() => {
          this.process = false;
          this.change.detectChanges();
        }))
        .subscribe();
    }
  }
}
