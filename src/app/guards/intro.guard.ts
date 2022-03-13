import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanLoad {
  constructor(private router: Router, private storage: Storage) { }
 
  async canLoad(): Promise<boolean> {
      const hasIC = await this.storage.get('ic');
      console.log("db ada ic " + hasIC)
      
      if (hasIC && (hasIC !== 'null')) {
        return true;
      } else {
        this.router.navigateByUrl('/tab3', { replaceUrl:true });
        return false;
      }
  }
}
