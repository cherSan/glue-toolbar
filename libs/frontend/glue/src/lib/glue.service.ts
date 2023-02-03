import {Injectable} from "@angular/core";
import {Glue42} from "@glue42/desktop";
import {Glue42Store} from "@glue42/ng";
import {catchError, first, firstValueFrom, forkJoin, from, Observable, of, switchMap, tap} from "rxjs";
import {Interops, Streams} from "@launchpad/frontend/glue/interops";
import {Windows} from "@launchpad/frontend/glue/windows";
import {Applications} from "@launchpad/frontend/glue/applications";
import {GlueLayouts} from "./glue-layouts";
@Injectable({
  providedIn: "root"
})
export class GlueService {
  private glueValue!: Glue42.Glue;
  get glue(): Glue42.Glue { return this.glueValue }
  private myWindowValue!: Glue42.Windows.GDWindow;
  get myWindow(): Glue42.Windows.GDWindow { return this.myWindowValue }
  private tabsValue!: GlueLayouts;
  get tabs(): GlueLayouts { return this.tabsValue }
  public user?: string;
  public region?: string;
  public env?: string;
  constructor(
    private readonly window: Window,
    private readonly glueStore: Glue42Store,
    public readonly streams: Streams,
    public readonly interops: Interops,
    public readonly windows: Windows,
    public readonly applications: Applications
  ) {
  }
  initialize(): Observable<Glue42.Windows.GDWindow> {
    if (!this.glue) {
      return this.glueStore.ready().pipe(
        first(),
        catchError(() => {
          return of({error: null});
        }),
        switchMap((ready) => {
          if (ready.error) throw new Error('Error Glue Initialization: ' + ready.error?.toString());
          this.glueValue = this.glueStore.getGlue() as Glue42.Glue;
          const services = [];
          if (this.glue.appManager?.ready) services.push(this.glue.appManager.ready());
          if (this.glue.windows?.ready) services.push(this.glue.windows.ready());
          if (this.glue.layouts?.ready) services.push(this.glue.layouts.ready());
          return services.length ? forkJoin(services) : of(true);
        }),
        switchMap(() => {
          return Promise.all([
            firstValueFrom(this.streams.initialize()),
            firstValueFrom(this.interops.initialize())
          ])
        }),
        tap(() => {
          this.windows.initialize().subscribe();
          this.applications.initialize().subscribe();
        }),
        tap(() => {
          this.user = window.glue42gd?.env.windowsUserName;
          this.env = window.glue42gd?.env.env;
          this.region = window.glue42gd?.env.region;
          if (!this.glue.userConfig?.gateway?.webPlatform) {
            this.tabsValue = new GlueLayouts(this.glue);
          }
        }),
        switchMap(() => {
          this.myWindowValue = this.glue.windows.my();
          if (!this.glue.userConfig?.gateway?.webPlatform) {
            return from(this.myWindowValue.show())
          }
          return of(this.myWindowValue);
        })
      )
    }
    return of(this.myWindowValue)
  }
  exit() {
    firstValueFrom(this.tabsValue.currentLayout$)
      .then(
        (lo) => {
          if (lo) return this.tabsValue.api.hibernate(lo?.name);
          return Promise.resolve();
        }
      )
      .then(() => this.myWindow.close())
  }
}
