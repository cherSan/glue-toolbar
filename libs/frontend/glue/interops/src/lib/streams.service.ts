import {Inject, Injectable} from "@angular/core";
import {Glue42} from "@glue42/desktop";
import {Glue42Store} from "@glue42/ng";
import {map, Observable, switchMap, tap, throwError} from "rxjs";
import {StreamFactory, STREAM_INJECTION} from "./streams.factory";
@Injectable({ providedIn: 'root' })
export class Streams {
  private glue!: Glue42.Glue;
  private streams: {[key:string]: Observable<unknown>} = {}
  public api!: Glue42.Interop.API
  constructor(
    private readonly glueStore: Glue42Store,
    @Inject(STREAM_INJECTION) private readonly streamsPromises: Promise<StreamFactory<unknown>>[]
  ) {
  }
  initialize(): Observable<any> {
    return this.glueStore.ready()
      .pipe(
        map(() => this.glueStore.getGlue() as Glue42.Glue),
        tap((glue) => this.glue = glue),
        tap(() => this.api = this.glue.interop),
        switchMap(() => this.initStream()),
      )
  }
  private initStream(): Promise<void> {
    return Promise.all(this.streamsPromises).then((streams) => {
      streams.forEach(stream => this.streams[stream.name] = stream.observer);
    });
  }
  public get<T>(name: string): Observable<T> {
    return this.streams[name] ? this.streams[name] as Observable<T> : throwError(() => 'Undefined stream');
  }
}
