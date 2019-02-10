import { Category } from '../../categories/shared/category.model';

export class Entry {
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
  ) { }

  static types = {
    expense: 'Expense',
    revenue: 'Revenue'
  };

  get paidText(): string {
    return this.paid ? 'Paid' : 'Pending';
  }
}
