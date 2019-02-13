import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Category } from '../../categories/shared/category.model';

export class Entry extends BaseResourceModel {
  constructor (
    public id?: Number,
    public name?: String,
    public description?: string,
    public type?: string,
    public amount?: string,
    public date?: Date,
    public paid?: boolean,
    public categoryId?: Number,
    public category?: Category
  ) {
    super();
  }

  static types = {
    expense: 'Expense',
    revenue: 'Revenue'
  };

  static fromJson(jsonData: any): Entry {
    return Object.assign(new Entry(), jsonData);
  }

  get paidText(): string {
    return this.paid ? 'Paid' : 'Pending';
  }
}
