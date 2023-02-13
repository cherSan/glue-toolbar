import {Injectable} from "@angular/core";
import {Glue42Store} from "@glue42/ng";
import {Glue42} from "@glue42/desktop";
import {
  BehaviorSubject,
  forkJoin,
  from,
  map,
  Observable,
  of,
  switchMap,
  tap
} from "rxjs";
import {Streams} from "@launchpad/frontend/glue/interops";
import {CORE_LAYOUTS} from "./tabs.stream";
import {CORE_CURRENT_LAYOUT} from "./current-tab.stream";
interface TabsInterface {
  tabs$: Observable<Glue42.Layouts.Layout[]>;
  currentTab$: Observable<Glue42.Layouts.Layout | undefined>;
}
@Injectable({
  providedIn: "root"
})
export class Tabs implements TabsInterface {
  private glue!: Glue42.Glue;
  public api!: Glue42.Layouts.API
  public readonly tabs$: BehaviorSubject<Glue42.Layouts.Layout[]> = new BehaviorSubject<Glue42.Layouts.Layout[]>([]);
  public readonly currentTab$: BehaviorSubject<Glue42.Layouts.Layout | undefined> = new BehaviorSubject<Glue42.Layouts.Layout | undefined>(undefined);
  constructor(
    private readonly glueStore: Glue42Store,
    private readonly streams: Streams,
  ) {}
  initialize(): Observable<any> {
    return this.glueStore.ready()
      .pipe(
        map(() => this.glueStore.getGlue() as Glue42.Glue),
        tap((glue) => this.glue = glue),
        switchMap(() => this.glue.layouts.ready()),
        tap(() => this.api = this.glue.layouts),
        switchMap(() => this.initStream())
      )
  }
  private initStream() {
    const current = from(this.glue.layouts.getCurrentLayout()).pipe(
      tap(tab => this.currentTab$.next(tab)),
      switchMap(() => this.streams.get<Glue42.Layouts.Layout>(CORE_CURRENT_LAYOUT)),
      tap(tab => this.currentTab$.next(tab))
    )
    const tabs = of(this.glue.layouts.list()).pipe(
      tap(tabs => this.tabs$.next(tabs)),
      switchMap(() => this.streams.get<Glue42.Layouts.Layout[]>(CORE_LAYOUTS)),
      tap(tabs => this.tabs$.next(tabs))
    )

    return forkJoin([
      current,
      tabs
    ])
  }
}
