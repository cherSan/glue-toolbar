import {Directive, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {VisibleAreasService} from "./visible-areas.service";

@Directive({
  standalone: true,
  selector: '[pSizeObserver]',
})
export class SizeObserverDirective implements OnInit, OnDestroy {
  private readonly id: string = `visible-area_${Date.now()}`;
  private readonly resizeObserver = new ResizeObserver((entries) => {
    if (entries[0]) {
      const rect = this.el.nativeElement.getBoundingClientRect()
      this.visibleAreas.setParams(this.id, {
        top: parseInt(`${rect.top}`),
        left: parseInt(`${rect.left}`),
        width: parseInt(`${rect.width}`),
        height: parseInt(`${rect.height}`)
      })
    }
  });
  constructor(
    private readonly el: ElementRef,
    private readonly visibleAreas: VisibleAreasService
  ) {}
  ngOnInit() {
    this.resizeObserver.observe(this.el.nativeElement);
    const rect = this.el.nativeElement.getBoundingClientRect()
    this.visibleAreas.setParams(this.id, {
      top: parseInt(`${rect.top}`),
      left: parseInt(`${rect.left}`),
      width: parseInt(`${rect.width}`),
      height: parseInt(`${rect.height}`)
    })
  }
  ngOnDestroy() {
    this.resizeObserver.unobserve(this.el.nativeElement);
    this.resizeObserver.disconnect();
    this.visibleAreas.removeParams(this.id);
  }
}
