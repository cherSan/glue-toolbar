import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SizeObserverDirective } from '@launchpad/frontend/glue';
import { RubberOutletService } from '../rubber-outlet/rubber-outlet.service';
import {activeAnimation} from "./active.animation";
import {switchServiceAnimation} from "./switch-service.animation";
import {notificationAnimation} from "./notification.animation";
@Component({
  standalone: true,
  selector: 'root',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  imports: [SizeObserverDirective, RouterModule, NzIconModule, NzButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    activeAnimation,
    switchServiceAnimation,
    notificationAnimation
  ],
})
export class ContainerComponent implements OnInit, OnDestroy {
  private readonly live$ = new Subject<void>();
  public isMainContainerCollapsed = false;
  public isMainContainerMouseOver = false;
  public isProcessActive = false;
  public isIsNotificationsActive = false;
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
