import {Injectable} from "@angular/core";
import {Glue42Store} from "@glue42/ng";
import {Glue42} from "@glue42/desktop";
import {BehaviorSubject, map, Observable, of, switchMap, tap} from "rxjs";
import {Streams} from "@launchpad/frontend/glue/interops";
import {STREAM_NAME} from "./applications.stream";
interface ApplicationsInterface {
  applications$: Observable<Glue42.AppManager.Application[]>;
}
@Injectable({
  providedIn: "root"
})
export class Applications implements ApplicationsInterface {
  private glue!: Glue42.Glue;
  public api!: Glue42.AppManager.API
  public readonly applications$: BehaviorSubject<Glue42.AppManager.Application[]> = new BehaviorSubject<Glue42.AppManager.Application[]>([]);
  constructor(
    private readonly glueStore: Glue42Store,
    private readonly streams: Streams,
  ) {}
  initialize(): Observable<any> {
    return this.glueStore.ready()
      .pipe(
        map(() => this.glueStore.getGlue() as Glue42.Glue),
        tap((glue) => this.glue = glue),
        switchMap(() => this.glue.appManager.ready()),
        tap(() => this.api = this.glue.appManager),
        switchMap(() => this.initStream())
      )
  }
  private initStream() {
    return of(this.glue.appManager.applications()).pipe(
      tap(applications => this.applications$.next(applications)),
      switchMap(() => this.streams.get<Glue42.AppManager.Application[]>(STREAM_NAME)),
      tap(applications => this.applications$.next(applications as Glue42.AppManager.Application[]))
    )
  }
}
