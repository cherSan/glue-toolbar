import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {tap} from "rxjs";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzEmptyModule} from "ng-zorro-antd/empty";
import {HeaderComponent, Notification, NotificationService} from "@launchpad/frontend/ui";
import {ActivatedRoute} from "@angular/router";
import {NotificationComponent} from "../notification/notification.component";
@Component({
  standalone: true,
  imports: [CommonModule, NzIconModule, NzEmptyModule, HeaderComponent, NotificationComponent],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsComponent {
  private readonly notificationMap: Map<number, Notification> = new Map();
  public notifications: Notification[] = [];
  constructor(
    public readonly route: ActivatedRoute,
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
  }
}
