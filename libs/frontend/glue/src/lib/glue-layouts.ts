import {Glue42} from "@glue42/desktop";
import {BehaviorSubject} from "rxjs";

export class GlueLayouts {
  public readonly api: Glue42.Layouts.API = this.glue.layouts;
  private readonly layoutsSubject$ = new BehaviorSubject<Glue42.Layouts.LayoutSummary[]>([]);
  public readonly layouts$ = this.layoutsSubject$.asObservable();
  private readonly currentLayoutSubject$ = new BehaviorSubject<Glue42.Layouts.LayoutSummary | undefined>(undefined);
  public readonly currentLayout$ = this.currentLayoutSubject$.asObservable();
  constructor(
    private glue: Glue42.Glue
  ) {
    this.updateLayouts();
    this.updateCurrent();
    this.api.onAdded(() => {
      this.updateLayouts();
    })
    this.api.onRemoved(() => {
      this.updateLayouts();
    })
    this.api.onRenamed(() => {
      this.updateLayouts();
    });
    this.api.onRestored(() => {
      this.updateCurrent();
    });
  }
  private updateLayouts(): void {
    this.api.getAll('Global')
      .then((layouts) => this.layoutsSubject$.next(layouts))
  }
  private updateCurrent(): void {
    this.api.getCurrentLayout()
      .then((layout) => this.currentLayoutSubject$.next(layout))
  }
  public select(layout: Glue42.Layouts.LayoutSummary): Promise<void> {
    return this.selectByName(layout.name);
  }
  private async selectByName(layoutName: string) {
    const current = this.currentLayoutSubject$.getValue()?.name;
    if (current) {
      await this.api.hibernate(current)
    }
    return this.api.resume(layoutName, {}, {cleanUp: true})
      .then(() => {
        this.updateCurrent();
      });
  }
  public async remove(layout: Glue42.Layouts.LayoutSummary): Promise<void> {
    return  this.api.get(layout.name, 'Global')
      .then(() => {
        this.api.remove('Global', layout.name)
          .then(() => {
            this.updateCurrent();
            this.updateLayouts();
          })
      })
      .catch(() => {
        throw new Error(`There no tab with name ${layout.name}`)
      })
  }
  public async rename(layout: Glue42.Layouts.LayoutSummary, newName: string): Promise<void> {
    const lo = await this.api.get(layout.name, 'Global');
    const lo2 = await this.api.get(newName, 'Global');
    return Promise.all([lo, lo2])
      .then(([lo, lo2]) => {
        if (!lo) {
          throw new Error(`Undefined tab with name ${layout.name}`)
        }
        if (!lo2) {
          throw new Error(`Tab with name ${newName} already exist`)
        }
        this.api.rename(lo, newName)
          .then(() => {
            this.updateCurrent();
            this.updateLayouts();
          })
      })
  }
  public async create(name: string): Promise<void> {
   return await this.api.get(name, 'Global')
     .catch(() => {
       this.api.save({
         name,
         type: 'Global',
         metadata: {
           createdAt: Date.now(),
           order: this.layoutsSubject$.getValue().length
         }
       }).then(() => {
         this.updateCurrent();
         this.updateLayouts();
       }).then(() => {
         this.selectByName(name)
       })
     })
     .then((lo) => {
       if (lo) {
        throw new Error('Tab already exist')
       }
     })
  }
  public reorder(layouts: Glue42.Layouts.LayoutSummary[]) {
    const promises: Promise<unknown>[] = [];
    layouts.forEach((layout, index) => {
      const pr = this.api.get(layout.name, 'Global').then((lo) => {
        if (lo) {
          lo.metadata = {
            order: index
          }
          return this.api.updateMetadata(lo)
        }
        return Promise.resolve();
      })
      promises.push(pr);
    });
    return Promise.all(promises);
  }
}
