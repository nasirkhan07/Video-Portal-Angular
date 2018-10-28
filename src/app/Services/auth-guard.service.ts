import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Cookie } from "ng2-cookies/ng2-cookies";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  /**
   * CanActivate guard for videos and video screen--to make the site available to authenticated users only
   * 
   * @param {ActivatedRouteSnapshot} next 
   * @param {RouterStateSnapshot} state 
   * @returns 
   * @memberof AuthGuardService
   */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Authenticate the application with all the apps
    const canActivate = !!Cookie.get('sessionId');
    if (!canActivate) {
      this.router.navigate(['/login']);
    }
    return canActivate;

  }
}