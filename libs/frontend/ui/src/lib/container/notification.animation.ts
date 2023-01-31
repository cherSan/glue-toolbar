import {animate, state, style, transition, trigger} from "@angular/animations";

export const notificationAnimation = trigger('notifications', [
  state('true', style({ width: '400px' })),
  state('false', style({ width: '0' })),
  transition('0 => 1', [
    style({ width: '0' }),
    animate('100ms', style({ width: '400px' })),
  ]),
  transition('1 => 0', [
    style({ width: '400px' }),
    animate('100ms', style({ width: '0px' })),
  ]),
]);
