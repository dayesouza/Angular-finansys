import { CardsService } from './../shared/cards.service';
import { Card } from './../shared/cards.model';
import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseResourceFormComponent } from '../../../shared/components/base-resource-form/base-resource-form.component';

@Component({
  selector: 'app-cards-form',
  templateUrl: './cards-form.component.html',
  styleUrls: ['./cards-form.component.scss']
})
export class CardsFormComponent extends BaseResourceFormComponent<Card> {

  constructor(
    protected cardsService: CardsService,
    protected injector: Injector
  ) {
     super(injector, new Card(), cardsService, Card.fromJson);
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      dueDay: [null],
      brand: [null],
      limit: [null],
      finalNumber: [null],
    });
  }

  protected creationPageTitle(): string {
    return 'New card';
  }
  protected editionPageTitle(): string {
    const categoryName = this.resource.name || '';
    return 'Editing card ' + categoryName;
  }

}
