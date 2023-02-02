import {Injectable} from "@angular/core";
import {Glue42} from "@glue42/desktop";
import {Glue42Store} from "@glue42/ng";
import {catchError, first, firstValueFrom, forkJoin, from, Observable, of, switchMap, tap} from "rxjs";
import {GlueLayouts} from "./glue-layouts";
import {GlueApplications} from "./glue-applications";
import {GlueInterops} from "./glue-interops";
import {GlueStreams} from "./glue.streams";

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
  private applicationsValue!: GlueApplications
  get applications(): GlueApplications { return this.applicationsValue }
  private interopsValue!: GlueInterops;
  get interops(): GlueInterops { return this.interopsValue };
  private streamsValue!: GlueStreams;
  get streams(): GlueStreams { return this.streamsValue };
  public user?: string;
  public region?: string;
  public env?: string;
  constructor(
    private window: Window,
    private glueStore: Glue42Store,
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
        tap(() => {
          this.user = window.glue42gd?.env.windowsUserName;
          this.env = window.glue42gd?.env.env;
          this.region = window.glue42gd?.env.region;
          if (!this.glue.userConfig?.gateway?.webPlatform) {
            this.tabsValue = new GlueLayouts(this.glue);
            this.applicationsValue = new GlueApplications(this.glue);
            this.interopsValue = new GlueInterops(this.glue);
            this.streamsValue = new GlueStreams(this.glue);
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
