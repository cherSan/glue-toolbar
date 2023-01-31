import {animate, state, style, transition, trigger} from "@angular/animations";

export const activeAnimation = trigger('active', [
  state('true', style({ width: 'fit-content', 'min-width': '340px' })),
  state('false', style({ width: '50px' })),
  state('void', style({ width: '0' })),
  transition('1 => void', [
    style({ width: '340px', 'min-width': 'unset' }),
    animate(100, style({ width: 0 })),
  ]),
  transition('0 => void', [
    style({ width: '50px', 'min-width': 'unset' }),
    animate(100, style({ width: 0 })),
  ]),
  transition('0 => 1', [
    style({ width: '50px', 'min-width': 'unset' }),
    animate('100ms', style({ width: '340px' })),
  ]),
  transition('1 => 0', [
    style({ width: '340px', 'min-width': 'unset' }),
    animate('100ms 1s', style({ width: '50px' })),
  ]),
])
