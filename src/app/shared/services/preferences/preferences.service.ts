import { Injectable, Injector } from "@angular/core";
import { LocalStorageService } from "../../../core/services/local-storage.service";

@Injectable()
export class PreferencesService extends LocalStorageService {
  constructor(protected injector: Injector) {
    super(injector, "preferences");
  }
}
