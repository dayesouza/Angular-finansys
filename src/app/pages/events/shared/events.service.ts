import { Injectable, Injector } from "@angular/core";
import { Events } from "./events.model";
import { BaseResourceService } from "../../../shared/services/base-resource.service";

@Injectable({
  providedIn: "root",
})
export class EventsService extends BaseResourceService<Events> {
  constructor(protected injector: Injector) {
    super("events", injector, Events.fromJson);
  }

  eventChosen() {
    return "";
  }
}
