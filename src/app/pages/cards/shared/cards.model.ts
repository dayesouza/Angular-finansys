import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Card extends BaseResourceModel {
  constructor(
    public id?: string,
    public name?: string,
    public description?: string,
    public dueDay?: Number,
    public limit?: string,
    public finalNumber?: Number,
  ) {
    super();
  }

  static fromJson(jsonData: any): Card {
    return Object.assign(new Card(), jsonData);
  }
}
