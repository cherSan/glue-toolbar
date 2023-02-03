import {Inject, Injectable} from "@angular/core";
import {Glue42} from "@glue42/desktop";
import {Glue42Store} from "@glue42/ng";
import {map, Observable, switchMap, tap, throwError} from "rxjs";
import {InteropFactory, INTEROP_INJECTION} from "./interops.factory";

@Injectable({ providedIn: 'root' })
export class Interops {
  private glue!: Glue42.Glue;
  private interops: {[key:string]: (arg: object) => Observable<unknown>} = {}
  public api!: Glue42.Interop.API
  constructor(
    private readonly glueStore: Glue42Store,
    @Inject(INTEROP_INJECTION) private readonly interopPromises: Promise<InteropFactory<unknown>>[]
  ) {
  }
  initialize(): Observable<any> {
    return this.glueStore.ready()
      .pipe(
        map(() => this.glueStore.getGlue() as Glue42.Glue),
        tap((glue) => this.glue = glue),
        tap(() => this.api = this.glue.interop),
        switchMap(() => this.initInterops()),
      )
  }
  private initInterops() {
    return Promise.all(this.interopPromises).then((interops) => {
      interops.forEach(interop => this.interops[interop.name] = interop.invoker);
    });
  }
  public get<T>(name: string): (arg: object) => Observable<T> {
    return this.interops[name] ? this.interops[name] as (arg: object) => Observable<T>: () => throwError(() => 'Undefined interop');
  }
}
