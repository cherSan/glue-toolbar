import {Injectable, TemplateRef} from '@angular/core';
import {Subject} from "rxjs";

export type Notification = {
  type: 'warning' | 'danger' | 'info' | 'blank' | 'success' | 'error';
  title: string;
  template: TemplateRef<void>;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notification = new Subject<Notification>();
  public readonly notifications$ = this.notification.asObservable();
  public addNotification(notification: Notification) {
    this.notification.next(notification)
  }
}
