import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Injectable, Injector } from '@angular/core';
import { Events } from './events.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService extends BaseResourceService<Events> {

  constructor(protected injector: Injector) {
    super('events', injector, Events.fromJson);
  }
}
