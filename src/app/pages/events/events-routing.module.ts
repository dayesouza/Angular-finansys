import { EventsFormComponent } from './events-form/events-form.component';
import { EventsListComponent } from './events-list/events-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: EventsListComponent },
  { path: 'new', component: EventsFormComponent },
  { path: 'edit/:id', component: EventsFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
