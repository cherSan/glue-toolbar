import {Injectable} from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
import {Glue42Store} from "@glue42/ng";
import {Glue42} from "@glue42/desktop";

type AreaParams = {
  left: number;
  top: number;
  width: number;
  height: number;
};

@Injectable({
  providedIn: 'root'
})
export class VisibleAreasService {
  private readonly visibleAreas$: BehaviorSubject<AreaParams[]> = new BehaviorSubject<AreaParams[]>([]);
  private readonly areas: Map<string, AreaParams> = new Map<string, AreaParams>();
  private readonly resize$ = this.glueStore.ready()
    .pipe(
      switchMap(() => this.visibleAreas$),
      switchMap(areas => {
        const glue = (this.glueStore.getGlue() as Glue42.Glue);
        return glue.agm
          .invoke('T42.Wnd.Execute', {
            command: 'updateVisibleAreas',
            windowId: glue.windows.my().id,
            options: {
              areas
            },
          })
      })
    )
  constructor(
    private glueStore: Glue42Store,
  ) {
    this.resize$.subscribe();
  }
  setParams(key: string, areaParams: AreaParams) {
    this.areas.set(key, areaParams);
    this.visibleAreas$.next([...this.areas.values()]);
  }
  removeParams(key: string) {
    this.areas.delete(key);
    this.visibleAreas$.next([...this.areas.values()]);
  }
}
