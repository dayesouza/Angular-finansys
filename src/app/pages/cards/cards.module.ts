import { CardsFormComponent } from './cards-form/cards-form.component';
import { CardsListComponent } from './cards-list/cards-list.component';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { CardsRoutingModule } from './cards-routing.module';

@NgModule({
  declarations: [
    CardsListComponent,
    CardsFormComponent
  ],
  imports: [
    CardsRoutingModule,
    SharedModule,
  ]
})
export class CardsModule { }
