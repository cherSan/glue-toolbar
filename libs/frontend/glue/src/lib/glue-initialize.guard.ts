import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { GlueService } from './glue.service';

@Injectable({
  providedIn: 'root',
})
export class GlueInitializeGuard implements CanActivate {
  constructor(
    private glueService: GlueService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  canActivate(): Promise<boolean> {
    if (!!this.glueService.glue) return Promise.resolve(true);
    return this.router
      .navigate(['', { outlets: { process: 'initialize' } }], {
        relativeTo: this.activatedRoute.root,
      })
      .then(() => false);
  }
}
