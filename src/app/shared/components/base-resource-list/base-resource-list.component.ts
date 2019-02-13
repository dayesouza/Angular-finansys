import { OnInit } from '@angular/core';
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  resources: T[] = [];
  constructor(protected resourceService: BaseResourceService<T> ) { }

  ngOnInit() {
    this.resourceService.getAll().subscribe(
      resources => this.resources = resources,
      error => alert('Error getting resources list.')
    );
  }

  deleteResource(resource) {
    const mustDelete = confirm('Do you really want to delete this item?');
    if (mustDelete) {
      this.resourceService.delete(resource.id).subscribe(
        () => this.resources = this.resources.filter(element => element !== resource),
        () => 'Error on delete function!'
      );
    }

  }

}
