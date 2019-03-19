import { Injectable, Injector } from '@angular/core';
import { Card } from './cards.model';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class CardsService extends BaseResourceService<Card> {

  constructor(protected injector: Injector) {
    super('cards', injector, Card.fromJson);
  }
}
