import { map } from 'rxjs/operators';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Injectable, Injector } from '@angular/core';

@Injectable()
export abstract class LocalStorageService {

  private localStorage: LocalStorage;
  private itemName: string;

  constructor(protected injector: Injector, _itemName: string) {
    this.localStorage = this.injector.get(LocalStorage);
    this.itemName = _itemName;
  }

  persistData(item: any) {
    this.localStorage.setItem(this.itemName, item).subscribe(() => {});
  }

  deleteData() {
    this.localStorage.removeItem(this.itemName).subscribe(() => {});
  }

  getData() {
    return this.localStorage.getItem(this.itemName);
  }

  wipeData() {
    this.localStorage.clear().subscribe(() => {});
  }

}