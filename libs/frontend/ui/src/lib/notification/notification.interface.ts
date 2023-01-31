import {Glue42} from "@glue42/desktop";
export type DefaultNotificationType = 'warning' | 'info' | 'success' | 'error';
export interface NotificationData {
  '@applications': Glue42.AppManager.Application[]
}
export interface Notification {
  type: DefaultNotificationType;
  title: string;
  message: string;
  data: NotificationData
}
