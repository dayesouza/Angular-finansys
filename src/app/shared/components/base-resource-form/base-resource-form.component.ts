import { OnInit, AfterContentChecked, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import toastr from 'toastr';
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  currentAction: string;
  resourceForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: Boolean = false;


  protected route: ActivatedRoute;
  private router: Router;
  protected formBuilder: FormBuilder;

  constructor(
    protected injector: Injector,
    public resource: T, // passing new Category for example
    protected resourceService: BaseResourceService<T>,
    protected jsonDataToResourceFn: (jsonData) => T
  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
  }

  ngOnInit() {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  // Invoked after everything is loaded
  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;
    this.persistResource();
  }

  // Protected methods
  protected setCurrentAction() {
    if (this.route.snapshot.url[0].path === 'new') {// First segment of url
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  protected loadResource() {
    if (this.currentAction === 'edit') {
      // return the edited resource
      this.route.paramMap.pipe(// The + transforms into a number
        switchMap(params => this.resourceService.getById(params.get('id')))
      )
      .subscribe(
        (resource) => {
          this.resource = resource;
          this.resourceForm.patchValue(this.resource); // Binds loaded category data to resource form
        },
        (error) => alert('An error ocurred. Please try again later')
      );
    }
  }


  protected setPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitle = this.creationPageTitle();
    } else {
      this.pageTitle = this.editionPageTitle();
    }
  }

  protected creationPageTitle(): string {
    return 'New';
  }

  protected editionPageTitle(): string {
    return 'Edit';
  }

  protected persistResource() {
    // Creating a new resource and assigning the form values
    let new_resource;
    let error;
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    console.log("ue");
    this.resourceService.persistDocument(resource).then(
      () => new_resource = this.actionsFormSuccess(new_resource),
      () => error = this.actionsForError(error)
    );
  }

  // protected updateResource() {
  //   const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

  //   this.resourceService.update(resource)
  //   .subscribe(
  //     new_resource => this.actionsFormSuccess(new_resource),
  //     error => this.actionsForError(error)
  //   );
  // }

  protected actionsFormSuccess(resource: T) {
    toastr.success('Success!');

    const baseComponentPath: string = this.route.snapshot.parent.url[0].path;

    // (skipLocationChange) Do not add to navegation history
    // this.router.navigateByUrl(baseComponentPath, {skipLocationChange: true}).then(
    //  () => this.router.navigate([baseComponentPath, resource.id, 'edit'])
    // );
    this.router.navigate([baseComponentPath]);
  }

  protected actionsForError(error) {
    toastr.error('Oh sorry! An error ocurred.');
    this.submittingForm = false;

    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body);
    } else {
      this.serverErrorMessages = ['Server error. Please try again later.'];
    }

  }

  protected abstract buildResourceForm(): void;

}
