import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {NgForOf} from '@angular/common';
import {HeaderComponent, NavigationItemComponent, RubberOutlet} from "@launchpad/frontend/ui";
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";
import {GlueService} from "@launchpad/frontend/glue";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzInputModule} from "ng-zorro-antd/input";
import {map, Subject, takeUntil, tap} from "rxjs";
import {Glue42} from "@glue42/desktop";
@Component({
  standalone: true,
  imports: [
    RubberOutlet,
    HeaderComponent,
    NzInputModule,
    NzButtonModule,
    NavigationItemComponent,
    RouterLink,
    RouterLinkActive,
    NgForOf,
    NzIconModule
  ],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  private readonly live$ = new Subject<void>();
  public tabs: Glue42.Layouts.Layout[] = [];
  public currentTab?: Glue42.Layouts.Layout;
  constructor(
    public readonly route: ActivatedRoute,
    private readonly glue: GlueService,
    private changeDetection: ChangeDetectorRef,
  ) {}
  ngOnInit() {
    this.glue.tabs.tabs$
      .pipe(
        takeUntil(this.live$),
        map((tabs) => tabs.filter(tab => tab.type === 'Global')),
        tap((tabs) => {
          this.tabs = tabs;
          this.changeDetection.detectChanges();
        })
      ).subscribe()
    this.glue.tabs.currentTab$
      .pipe(
        takeUntil(this.live$),
        tap((tab) => {
          this.currentTab = tab;
          this.changeDetection.detectChanges();
        })
      ).subscribe()
  }
  ngOnDestroy() {
    this.live$.next();
    this.live$.complete()
  }

  async start(tab: Glue42.Layouts.Layout) {
    if (this.currentTab?.name) {
      await this.glue.tabs.api.hibernate(this.currentTab.name)
    }
    await this.glue.tabs.api.restore(tab)
  }
}
