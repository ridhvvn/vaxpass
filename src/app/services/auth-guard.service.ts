import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private storage: Storage) {
   }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log(route);
    let localIC = {
      wujud: true,
    };
    if (!localIC.wujud) {
      this.router.navigate(['tab3']);
      return false;
    }
    return true;
  }
}
