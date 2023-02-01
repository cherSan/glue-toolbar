import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HeaderComponent,
  NavigationItemComponent,
  NotificationData,
  NotificationService,
  RubberOutlet
} from "@launchpad/frontend/ui";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzInputModule} from "ng-zorro-antd/input";
import {Subject, takeUntil, tap} from "rxjs";
import {GlueService, SdkObserverDirective, SizeObserverDirective} from "@launchpad/frontend/glue";
import {Glue42} from "@glue42/desktop";
import {NzMentionComponent, NzMentionModule} from "ng-zorro-antd/mention";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
@Component({
  standalone: true,
  imports: [CommonModule, RubberOutlet, HeaderComponent, NzButtonModule, NzIconModule, NzInputModule, NavigationItemComponent, NzMentionModule, NzAvatarModule, SizeObserverDirective, SdkObserverDirective],
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SendNotificationComponent {
  @ViewChild(NzMentionComponent, { static: true }) mention?: NzMentionComponent;
  private readonly live$ = new Subject<void>();
  public applications: Glue42.AppManager.Application[] = [];
  constructor(
    private readonly glue: GlueService,
    private changeDetection: ChangeDetectorRef,
    private notification: NotificationService,
  ) {
  }
  ngOnInit() {
    this.glue.applications.applications$
      .pipe(
        takeUntil(this.live$),
        tap((applications) => {
          this.applications = applications || [];
          this.changeDetection.detectChanges();
        })
      ).subscribe()
  }
  ngOnDestroy() {
    this.live$.next();
    this.live$.complete()
  }
  valueWith = (data: Glue42.AppManager.Application): string => `application:"${data.name}:${data.title}:a.chernushevich@mlp.com"`;
  data: NotificationData = {
    ["@applications"]: [],
  };
  send(message: string) {
    this.notification.addNotification({
      type: "info",
      title: 'Information',
      message,
      data: this.data
    })
  }
  onSelect($event: Glue42.AppManager.Application) {
    this.data["@applications"].push($event);
  }
}
