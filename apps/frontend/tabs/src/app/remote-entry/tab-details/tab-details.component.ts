import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {HeaderComponent, NavigationItemComponent, RubberOutlet} from "@launchpad/frontend/ui";
import {NzIconModule} from "ng-zorro-antd/icon";
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";
import {NzButtonModule} from "ng-zorro-antd/button";
import {Glue42} from "@glue42/desktop";
import {map, Subject, switchMap, takeUntil, tap} from "rxjs";
import {GlueService} from "@launchpad/frontend/glue";
import {NzCardModule} from "ng-zorro-antd/card";
import {NgForOf, NgStyle} from "@angular/common";
import {NzAvatarModule} from "ng-zorro-antd/avatar";

@Component({
  standalone: true,
  imports: [
    RubberOutlet,
    HeaderComponent,
    NzIconModule,
    RouterLink,
    RouterLinkActive,
    NzButtonModule,
    NavigationItemComponent,
    NzCardModule,
    NgForOf,
    NgStyle,
    NzAvatarModule,
  ],
  templateUrl: './tab-details.component.html',
  styleUrls: ['./tab-details.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabDetailsComponent {
  public tab?: Glue42.Layouts.Layout;
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
      switchMap(({tabName}) => this.glue.tabs.tabs$.pipe(
        map((tabs) => tabs.find(tab => tab.name === tabName))
      )),
      tap((tab) => {
        console.log(tab)
        this.tab = tab;
        this.changeDetection.detectChanges();
      })
    ).subscribe()
  }
  ngOnDestroy() {
    this.live$.next();
    this.live$.complete();
  }
}
