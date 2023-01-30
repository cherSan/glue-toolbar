import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RubberOutletService {
  private outlets = new Map<number, boolean>()
  private rubberStatus$ = new BehaviorSubject<boolean>(false);
  public rubberState$ = this.rubberStatus$.asObservable();
  register(route:number) {
    this.outlets.set(route, false);
  }
  unregister(route:number) {
    this.outlets.delete(route);
  }
  activate(route:number) {
    this.outlets.set(route, true);
    this.rubberStatus$.next([...this.outlets.values()].some(v => v));
  }
  deactivate(route:number) {
    this.outlets.set(route, false);
    this.rubberStatus$.next([...this.outlets.values()].some(v => v));
  }
}
