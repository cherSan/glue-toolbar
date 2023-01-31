import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Notification} from './notification.interface';
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
