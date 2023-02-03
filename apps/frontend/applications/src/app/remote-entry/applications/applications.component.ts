import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderComponent, NavigationItemComponent, RubberOutlet} from "@launchpad/frontend/ui";
import {NzButtonModule} from "ng-zorro-antd/button";
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";
import {NzIconModule} from "ng-zorro-antd/icon";
import {GlueService} from "@launchpad/frontend/glue";
import {Subject, takeUntil, tap} from "rxjs";
import {Glue42} from "@glue42/desktop";
import {NgForOf} from "@angular/common";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {FormsModule} from "@angular/forms";
import {NzSegmentedModule, NzSegmentedOptions} from "ng-zorro-antd/segmented";
@Component({
  standalone: true,
  imports: [
    RubberOutlet,
    HeaderComponent,
    NzButtonModule,
    RouterLink,
    NzIconModule,
    RouterLinkActive,
    NavigationItemComponent,
    NgForOf,
    NzInputModule,
    NzSelectModule,
    FormsModule,
    NzSegmentedModule
  ],
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsComponent implements OnInit, OnDestroy {
  private readonly live$ = new Subject<void>();
  public applications: Glue42.AppManager.Application[] = [];
  public readonly loading = new Set();
  public readonly options: NzSegmentedOptions = [
    {
      label: 'All',
      value: 'all'
    },
    {
      label: 'Favorite',
      value: 'favorite',
    },
  ]
  constructor(
    public readonly route: ActivatedRoute,
    private readonly glue: GlueService,
    private changeDetection: ChangeDetectorRef,
  ) {}
  ngOnInit() {
    this.glue.applications.applications$
      .pipe(
        takeUntil(this.live$),
        tap((applications) => {
          this.applications = applications as Glue42.AppManager.Application[];
          this.changeDetection.detectChanges();
        })
      ).subscribe()
  }
  ngOnDestroy() {
    this.live$.next();
    this.live$.complete()
  }
  start(application: Glue42.AppManager.Application) {
    this.loading.add(application.name);
    const timePromise = new Promise(res => setTimeout(res, 5000));
    return Promise.race([application.start(), timePromise])
      .finally(() => {
        this.loading.delete(application.name);
        this.changeDetection.detectChanges();
      })
  }
}
