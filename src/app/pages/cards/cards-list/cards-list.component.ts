import { Card } from './../shared/cards.model';
import { CardsService } from './../shared/cards.service';
import { Component, OnInit } from '@angular/core';

import { BaseResourceListComponent } from '../../../shared/components/base-resource-list/base-resource-list.component';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent extends BaseResourceListComponent<Card> {

  constructor(protected cardsService: CardsService ) {
    super(cardsService);
   }

}
