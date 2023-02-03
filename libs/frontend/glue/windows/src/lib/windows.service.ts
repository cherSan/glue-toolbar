import {Injectable} from "@angular/core";
import {Glue42Store} from "@glue42/ng";
import {Glue42} from "@glue42/desktop";
import {BehaviorSubject, map, Observable, of, switchMap, tap} from "rxjs";
import {Interops, Streams} from "@launchpad/frontend/glue/interops";
import {INTEROP_NAME_OPEN} from "./window-open.interop";
import {INTEROP_NAME_CLOSE} from "./window-close.interop";
import {STREAM_NAME} from "./windows.stream";
interface WindowsInterface {
  windows$: Observable<Glue42.Windows.GDWindow[]>;
}
@Injectable({
  providedIn: "root"
})
export class Windows implements WindowsInterface {
  private glue!: Glue42.Glue;
  public api!: Glue42.Windows.API;
  public readonly windows$: BehaviorSubject<Glue42.Windows.GDWindow[]> = new BehaviorSubject<Glue42.Windows.GDWindow[]>([]);
  constructor(
    private readonly glueStore: Glue42Store,
    private readonly streams: Streams,
    private readonly interops: Interops
  ) {}
  initialize(): Observable<any> {
    return this.glueStore.ready()
      .pipe(
        map(() => this.glueStore.getGlue() as Glue42.Glue),
        tap((glue) => this.glue = glue),
        switchMap(() => this.glue.windows.ready()),
        tap(() => this.api = this.glue.windows),
        switchMap(() => this.initStream())
      )
  }
  private initStream() {
    return of(this.glue.windows.list()).pipe(
      tap(windows => this.windows$.next(windows)),
      switchMap(() => this.streams.get(STREAM_NAME)),
      map(() => this.glue.windows.list()),
      tap(windows => this.windows$.next(windows))
    )
  }
  public window$(name: string): Observable<Glue42.Windows.GDWindow | undefined> {
    return this.windows$.pipe(
      map(() => this.glue.windows.find(name))
    )
  }
  public getWindowByName(name: string) {
    return this.glue.windows.find(name);
  }
  public getWindowById(id: string) {
    return this.glue.windows.list().find(w => w.id == id);
  }
  closeWindow(name: string, withChild = true) {
    return this.interops.get<void>(INTEROP_NAME_CLOSE)({name, withChild});
  }
  openWindow(name: string, url: string, options: Glue42.Windows.WindowCreateOptions) {
    return this.interops.get<string>(INTEROP_NAME_OPEN)({name, url, options});
  }
}
