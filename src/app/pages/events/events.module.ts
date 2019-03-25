import { EventsRoutingModule } from './events-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { EventsListComponent } from './events-list/events-list.component';
import { EventsFormComponent } from './events-form/events-form.component';

@NgModule({
  declarations: [
    EventsListComponent,
    EventsFormComponent
  ],
  imports: [
    EventsRoutingModule,
    SharedModule
  ]
})
export class EventsModule { }
