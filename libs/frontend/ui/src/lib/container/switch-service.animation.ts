import {animate, group, query, style, transition, trigger} from "@angular/animations";

export const switchServiceAnimation = trigger('switchService', [
  transition(':increment', [
    group([
      query(
        ':leave',
        [
          style({ opacity: 1 }),
          animate(200, style({ opacity:0 })),
        ], { optional: true }
      ),
      query(
        ':enter',
        [
          style({
            zIndex: 1,
            position: 'absolute',
            top: '-100%',
            left: 0,
            width: '100%',
            height: '100%',
            background: '#222'
          }),
          animate(200, style({ top: '0' })),
        ], { optional: true }
      ),
    ]),
  ]),
  transition(':decrement', [
    group([
      query(
        ':leave',
        [
          style({ opacity: 1 }),
          animate(200, style({ opacity:0 })),
        ], { optional: true }
      ),
      query(
        ':enter',
        [
          style({
            zIndex: 1,
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            height: '100%',
            background: '#222'
          }),
          animate(200, style({ top: '0' })),
        ], { optional: true }
      ),
    ]),
  ]),
]);
