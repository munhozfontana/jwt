import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
   if ( localStorage.getItem('token') && localStorage.getItem('name') && localStorage.getItem('lastName') ) {
    return true;
   }

   this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
   return false;
  }
}
