import { BaseResourceModel } from "../../../shared/models/base-resource.model";

export class Events extends BaseResourceModel {
  constructor(
    public id?: string,
    public name?: String,
    public description?: string,
    public date?: Date
  ) {
    super();
  }

  static fromJson(jsonData: any): Events {
    return Object.assign(new Events(), jsonData);
  }
}
