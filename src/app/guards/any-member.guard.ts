import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AnyMemberGuard implements CanActivate, CanLoad {

  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.tokenStorageService.loggedIn()) {
        if(this.tokenStorageService.getUser()?.roles.includes('REGULAR_MEMBER') || this.tokenStorageService.getUser().roles.includes('CORE_MEMBER')) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      } else {
        this.router.navigate(['/']);
        return false;
      }
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.tokenStorageService.getUser().roles.includes('REGULAR_MEMBER') || this.tokenStorageService.getUser().roles.includes('CORE_MEMBER')) {
        return true;
      } else {
        return false;
      }
  }
}
