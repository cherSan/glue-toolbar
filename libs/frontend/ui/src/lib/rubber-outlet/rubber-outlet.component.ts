import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { animate, group, query, state, style, transition, trigger } from "@angular/animations";
import { RubberOutletService } from './rubber-outlet.service';
import { JsonPipe } from '@angular/common';
import { Subject, takeUntil, tap } from 'rxjs';

type State = {
  value: string | undefined,
  params: {
    width: number,
    prevWidth: number
  }
}
@Component({
  selector: 'rubber-outlet',
  standalone: true,
  templateUrl: './rubber-outlet.component.html',
  styleUrls: ['./rubber-outlet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, JsonPipe],
  animations: [
    trigger('rubber', [
      state('void', style({width: 0})),
      state('*', style({ width: 'max-content' }), { params: {width: 0}}),
      transition(
        'void => *',
        [
          group([
            style({width: 0 }),
            animate(100, style({ width: '{{width}}px' })),
            query(":enter", [
              style({opacity: 0}),
              animate(100, style({opacity: 1})),
            ], { optional: true })
          ]),
        ],
        { params: {width: 0} }
      ),
      transition(
        '* => void',
        group([
          style({width: '{{width}}px'}),
          animate(100, style({width: 0})),
          query(":leave", [
            style({opacity: 1}),
            animate(100, style({opacity: 0}))
          ], { optional: true })
        ]),
        { params: {width: 0} }
      ),
      transition(
        '* <=> *',
        group([
          style({width: '{{prevWidth}}px'}),
          animate(200, style({width: '{{width}}px'}))
        ]),
        { params: {width: 0, prevWidth: 60} }
      ),
    ])
  ]
})
export class RubberOutlet implements OnInit, OnDestroy {
  private id: number = Date.now();
  private live$ = new Subject<void>();
  public state: State = {
    value: 'void',
    params: {
      prevWidth: 0,
      width: 0
    }
  };
  @HostBinding('style.grid-template-columns')
  public width: string = `fit-content(0) fit-content(0)`;
  constructor(
    private activatedRoute: ActivatedRoute,
    private rubber: RubberOutletService,
    private change: ChangeDetectorRef
  ) {
    this.width = `${this.activatedRoute.snapshot.data['width'] || 340}px fit-content(0)`;
  }
  ngOnInit() {
    this.rubber.register(this.id);
    this.activatedRoute.data
      .pipe(
        takeUntil(this.live$),
        tap((data) => {
          this.width = `${data['width'] || 340}px fit-content(0)`;
          this.change.detectChanges();
        })
      )
      .subscribe()
  }
  ngOnDestroy() {
    this.rubber.unregister(this.id);
    this.live$.next();
    this.live$.complete();
  }
  activate($event: RouterOutlet) {
    if ($event.isActivated) {
      this.rubber.activate(this.id);
      this.state = {
        value: $event.activatedRoute.component?.name || 'void',
        params: {
          prevWidth: this.state.params.width,
          width: $event.activatedRoute.snapshot.data['width'] || 340
        }
      }
      this.change.detectChanges();
    }
  }
  deactivate() {
    this.rubber.deactivate(this.id);
    this.state = {
      ...this.state,
      value: 'void'
    }
    this.change.detectChanges();
  }
}
