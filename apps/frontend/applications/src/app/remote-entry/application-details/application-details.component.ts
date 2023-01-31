import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HeaderComponent, NavigationItemComponent, RubberOutlet} from "@launchpad/frontend/ui";
import {NzButtonModule} from "ng-zorro-antd/button";
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";
import {NzIconModule} from "ng-zorro-antd/icon";
import {GlueService} from "@launchpad/frontend/glue";
import {map, Subject, switchMap, takeUntil, tap} from "rxjs";
import {Glue42} from "@glue42/desktop";
import {AsyncPipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
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
    NzDescriptionsModule,
    NzCardModule,
    NgStyle,
    NzAvatarModule,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationDetailsComponent implements OnInit {
  public application?: Glue42.AppManager.Application;
  private readonly live$ = new Subject<void>();
  public readonly gridStyle = {
    width: '25%',
    textAlign: 'center'
  };
  constructor(
    public readonly route: ActivatedRoute,
    private readonly glue: GlueService,
    private changeDetection: ChangeDetectorRef
  ) {
  }
  ngOnInit() {
    this.route.params.pipe(
      takeUntil(this.live$),
      switchMap(({applicationName}) => this.glue.applications.applications$.pipe(
        map((applications) => applications.find(app => app.name === applicationName))
      )),
      tap((application) => {
        this.application = application;
        this.changeDetection.detectChanges();
      })
    ).subscribe()
  }
  ngOnDestroy() {
    this.live$.next();
    this.live$.complete();
  }
}
