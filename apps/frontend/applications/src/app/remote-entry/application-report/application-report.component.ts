import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HeaderComponent, NavigationItemComponent, RubberOutlet} from "@launchpad/frontend/ui";
import {NzButtonModule} from "ng-zorro-antd/button";
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";
import {NzIconModule} from "ng-zorro-antd/icon";
import {GlueService} from "@launchpad/frontend/glue";
import {Subject, takeUntil, tap} from "rxjs";
import {Glue42} from "@glue42/desktop";
import {NgForOf} from "@angular/common";
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
    NgForOf
  ],
  templateUrl: './application-report.component.html',
  styleUrls: ['./application-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationReportComponent implements OnInit {
  public application?: Glue42.AppManager.Application;
  private readonly live$ = new Subject<void>()
  constructor(
    public readonly route: ActivatedRoute,
    private readonly glue: GlueService,
    private ref: ChangeDetectorRef
  ) {
  }
  ngOnInit() {
    this.route.parent!.params.pipe(
      takeUntil(this.live$),
      tap(({applicationName}) => {
        this.application = applicationName ?
          this.glue.applications.api.application(applicationName) :
          undefined;
        this.ref.detectChanges();
      })
    ).subscribe()
  }
  ngOnDestroy() {
    this.live$.next();
    this.live$.complete();
  }
}
