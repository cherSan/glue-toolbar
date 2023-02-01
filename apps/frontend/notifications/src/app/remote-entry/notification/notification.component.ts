import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Notification} from "@launchpad/frontend/ui";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzTypographyModule} from "ng-zorro-antd/typography";
@Component({
  selector: 'ntf-notification',
  standalone: true,
  imports: [CommonModule, NzIconModule, NzButtonModule, NzDividerModule, NzTypographyModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  @ViewChild('applicationTpl', { static: true }) applicationTpl!: ElementRef;
  public notificationValue!: Notification;
  public notificationMessage: any[] = [];
  @Input()
  set notification(notification: Notification) {
    this.notificationValue = {
      ...notification,
    }
    const value = notification.message.split(/(@application:"[^"]+")/g);
    this.notificationMessage = value.map(str => {
      if (str.startsWith('@application:')) {
        const application = str.replace(/@application:"([^"]+)"/, '$1');
        const [
          applicationName,
          applicationTitle,
          applicationOwner
        ] = application.split(':');
        const myApplication = notification.data['@applications'].find(app => app.name === applicationName);
        if (myApplication) {
          return {
            type: 'application',
            data: myApplication
          }
        } else {
          return {
            type: 'no-application',
            data: {
              title: applicationTitle,
              owner: applicationOwner
            }
          }
        }
      }
      return {
        type: 'text',
        data: str
      }
    })
  }
}

