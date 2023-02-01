import {Directive, Input, OnDestroy, OnInit} from '@angular/core';
import {AreaParams, VisibleAreasService} from "./visible-areas.service";
import {OverlayContainer} from "@angular/cdk/overlay";

@Directive({
  standalone: true,
  selector: '[pSdkObserver]',
})
export class SdkObserverDirective implements OnInit, OnDestroy {
  @Input() pSdkObserver!: string;
  private readonly ids: string[] = [];
  private readonly mutationObserver = new MutationObserver((mutation) => {
    if (mutation[0]) {
      const els = (mutation[0].target as HTMLElement)!.getElementsByClassName(this.pSdkObserver);
      this.visibleAreas.removeMultiplyParams(this.ids);
      if (els?.length) {
        const areas: [string, AreaParams][]= [];
        for (let i = 0; i < els.length; i++) {
          const date = Date.now();
          this.ids.push(`${date}`);
          const rect = els[i].getBoundingClientRect()
          areas.push([`${date}`, {
            top: parseInt(`${rect.top}`),
            left: parseInt(`${rect.left}`),
            width: parseInt(`${rect.width}`),
            height: parseInt(`${rect.height}`)
          }])
        }
        this.visibleAreas.setMultiplyParams(areas);
      }
    }
  });
  constructor(
    private readonly overlayRef: OverlayContainer,
    private readonly visibleAreas: VisibleAreasService
  ) {}
  ngOnInit() {
    this.mutationObserver.observe(this.overlayRef.getContainerElement(), { childList: true });
  }
  ngOnDestroy() {
    this.mutationObserver.disconnect();
    this.visibleAreas.removeMultiplyParams(this.ids);
  }
}
