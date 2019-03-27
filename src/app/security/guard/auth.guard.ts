import { AuthService } from './../service/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {
    console.log('access denied??!!!');

  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      console.log('access denied??');

      return this.auth.user.pipe(
           take(1),
           map(user => !!user),
           tap(loggedIn => {
             if (!loggedIn) {
               console.log('access denied!!!')
               this.router.navigate(['/login']);
             }
         })
    )
  }
}