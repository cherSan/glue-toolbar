import { ChangeDetectorRef, Component} from '@angular/core';
import {NzNotificationModule, NzNotificationService} from "ng-zorro-antd/notification";
import {SizeObserverDirective} from "@launchpad/frontend/glue";
import {NgClass, NgForOf, NgSwitch, NgSwitchCase, NgTemplateOutlet} from "@angular/common";
import {Notification, NotificationService} from "./notification.service";
import {NzIconModule} from "ng-zorro-antd/icon";
import {tap} from "rxjs";

@Component({
  selector: 'ui-notification',
  standalone: true,
  imports: [NzNotificationModule, SizeObserverDirective, NgTemplateOutlet, NgClass, NgSwitch, NgSwitchCase, NzIconModule, NgForOf],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  private readonly notificationMap: Map<number, Notification> = new Map();
  public notifications: Notification[] = [];
  constructor(
    private readonly notification: NzNotificationService,
    private readonly notificationService: NotificationService,
    private changeDetection: ChangeDetectorRef
  ) {
    notificationService.notifications$
      .pipe(
        tap((notification) => {
          this.showNotification(notification);
          this.changeDetection.detectChanges();
        })
      )
      .subscribe()
  }
  showNotification(notification: Notification) {
    const index = Date.now();
    this.notificationMap.set(index, notification);
    this.notifications = [...this.notificationMap.values()];
    setTimeout(() => {
      this.notificationMap.delete(index);
      this.notifications = [...this.notificationMap.values()];
      this.changeDetection.detectChanges();
    }, 10000);
  }
}
