import {Glue42} from "@glue42/desktop";
export type DefaultNotificationType = 'warning' | 'info' | 'success' | 'error';
export interface DefaultNotification {
  type: DefaultNotificationType;
  title: string;
  message: string;
}
export interface LayoutNotification {
  type: 'layout';
  title: string;
  message: string;
  data: {
    layouts: Glue42.Layouts.Layout[]
  }
}
export interface ApplicationNotification {
  type: 'application';
  title: string;
  message: string;
  data: {
    application: Glue42.AppManager.Application
  }
}
export type Notification = DefaultNotification | LayoutNotification | ApplicationNotification
