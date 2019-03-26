import { map } from 'rxjs/operators';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor(protected localStorage: LocalStorage) {
  }

  persistData(itemName: string, item: any) {
    this.localStorage.setItem(itemName, item).subscribe(() => {});
  }

  deleteData(itemName: string) {
    this.localStorage.removeItem(itemName).subscribe(() => {});
  }

  getData(itemName: string) {
    return this.localStorage.getItem(itemName).pipe(
      map(res => {
        return res;
      })
    )
    
    
    // ((data) => {
    //   return data;
    // });
  }

  wipeData() {
    this.localStorage.clear().subscribe(() => {});
  }

}