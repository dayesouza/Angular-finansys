import { EventsRoutingModule } from "./events-routing.module";
import { NgModule } from "@angular/core";
import { EventsListComponent } from "./events-list/events-list.component";
import { EventsFormComponent } from "./events-form/events-form.component";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [EventsListComponent, EventsFormComponent],
  imports: [EventsRoutingModule, SharedModule],
})
export class EventsModule {}
