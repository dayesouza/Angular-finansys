import { Injectable, Injector } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Injectable()
export class PreferencesService {

  storage;
  constructor(private localStorage: LocalStorageService) {}

}
