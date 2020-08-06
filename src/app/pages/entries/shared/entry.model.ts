import { Card } from "./../../cards/shared/cards.model";
import { Category } from "../../categories/shared/category.model";
import { BaseResourceModel } from "../../../shared/models/base-resource.model";

export class Entry extends BaseResourceModel {
  constructor(
    public id?: string,
    public name?: String,
    public description?: string,
    public type?: string,
    public amount?: string,
    public date?: Date,
    public paid?: boolean,
    public categoryId?: string,
    public category?: Category,
    public cardId?: string,
    public card?: Card
  ) {
    super();
  }

  static types = {
    expense: "Expense",
    revenue: "Revenue",
  };

  static fromJson(jsonData: any): Entry {
    return Object.assign(new Entry(), jsonData);
  }

  get paidText(): string {
    return this.paid ? "Paid" : "Pending";
  }
}
