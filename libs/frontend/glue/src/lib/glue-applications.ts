import {Glue42} from "@glue42/desktop";
import {BehaviorSubject, combineLatest, map} from "rxjs";

export class GlueApplications {
  public readonly api: Glue42.AppManager.API = this.glue.appManager;
  private readonly applicationsSubject$ = new BehaviorSubject<Glue42.AppManager.Application[]>([]);
  private readonly favoriteList$ = new BehaviorSubject<string[]>([]);
  private readonly favorite = new Set<string>();
  public readonly applications$ = this.applicationsSubject$.asObservable();
  public readonly favorites$ = combineLatest([this.applications$, this.favoriteList$]).pipe(
    map(([apps, favorite]) => apps.filter((app) => favorite.includes(app.name)))
  )
  constructor(
    private glue: Glue42.Glue
  ) {
    this.api.onAppChanged(() => {
      this.updateApplications();
    });
    this.api.onAppAdded(() => {
      this.updateApplications();
    });
    this.api.onAppRemoved(() => {
      this.updateApplications();
    });
    this.api.onInstanceStarted(() => {
      this.updateApplications();
    });
    this.api.onInstanceStopped(() => {
      this.updateApplications();
    });
    this.api.onInstanceStartFailed(() => {
      this.updateApplications();
    });
    setInterval(() => {
      this.updateApplications();
    }, 120000)
    this.initFavorite();
  }
  private updateApplications(): void {
    this.applicationsSubject$.next(this.api.applications())
  }
  private initFavorite() {
    const apps = window.localStorage.getItem('applications_favorite');
    if (apps) {
      try {
        [...JSON.parse(apps)].forEach((app) => this.favorite.add(app));
        this.favoriteList$.next([... this.favorite]);
      } catch (e) {
        window.localStorage.setItem('applications_favorite', JSON.stringify([]));
      }
    }
    this.updateApplications();
  }
  public favorite$(applicationName: string) {
    return this.favoriteList$.pipe(map((appsName) => appsName.includes(applicationName)));
  }
  public addToFavorite(applicationName: string) {
    this.favorite.add(applicationName);
    this.favoriteList$.next([...this.favorite]);
    window.localStorage.setItem('applications_favorite', JSON.stringify([...this.favoriteList$.getValue().values()]));
    this.updateApplications();
  }
  public removeFromFavorite(applicationName: string) {
    this.favorite.delete(applicationName);
    this.favoriteList$.next([...this.favorite]);
    window.localStorage.setItem('applications_favorite', JSON.stringify([...this.favorite.values()]));
    this.updateApplications();
  }
}
