import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  animate,
  group,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SizeObserverDirective } from '@launchpad/frontend/glue';
import { RubberOutletService } from '../rubber-outlet/rubber-outlet.service';
@Component({
  standalone: true,
  selector: 'root',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  imports: [SizeObserverDirective, RouterModule, NzIconModule, NzButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('active', [
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
    ]),
    trigger('switchService', [
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
    ]),
  ],
})
export class ContainerComponent implements OnInit, OnDestroy {
  private readonly live$ = new Subject<void>();
  public isMainContainerCollapsed = false;
  public isMainContainerMouseOver = false;
  public isProcessActive = false;
  public rubberActivate: boolean = false;
  public weight = 0;
  constructor(
    private rubber: RubberOutletService,
    public readonly router: ActivatedRoute
  ) {}
  ngOnInit() {
    this.rubber.rubberState$
      .pipe(
        takeUntil(this.live$),
        tap((state) => {
          this.rubberActivate = state;
        })
      )
      .subscribe();
  }
  ngOnDestroy() {
    this.live$.next();
    this.live$.complete();
  }
  activate($event: RouterOutlet) {
    if ($event.isActivated) {
      this.weight = $event.activatedRoute.snapshot.data['weight'] || 0;
    }
  }
}
