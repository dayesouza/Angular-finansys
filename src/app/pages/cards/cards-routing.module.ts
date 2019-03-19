import { CardsFormComponent } from './cards-form/cards-form.component';
import { CardsListComponent } from './cards-list/cards-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: CardsListComponent},
  {path: 'new', component: CardsFormComponent},
  {path: 'edit/:id', component: CardsFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardsRoutingModule { }
