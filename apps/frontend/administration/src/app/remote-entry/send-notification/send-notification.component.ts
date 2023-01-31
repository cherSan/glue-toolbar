import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent, NavigationItemComponent, NotificationService, RubberOutlet} from "@launchpad/frontend/ui";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzInputModule} from "ng-zorro-antd/input";
import {Subject, takeUntil, tap} from "rxjs";
import {GlueService} from "@launchpad/frontend/glue";
import {Glue42} from "@glue42/desktop";

@Component({
  standalone: true,
  imports: [CommonModule, RubberOutlet, HeaderComponent, NzButtonModule, NzIconModule, NzInputModule, NavigationItemComponent],
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendNotificationComponent {
  private readonly live$ = new Subject<void>();
  public applications: Glue42.AppManager.Application[] = [];
  constructor(
    private readonly glue: GlueService,
    private changeDetection: ChangeDetectorRef,
    private notification: NotificationService
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

  send(message: string) {
    this.notification.addNotification({
      type: "info",
      title: 'Information',
      message
    })
  }

  sendApp(message: string, application: Glue42.AppManager.Application) {
    this.notification.addNotification({
      type: "application",
      title: 'Application',
      message,
      data: {
        application
      }
    })
  }
}
