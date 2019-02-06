import { CategoryService } from './../shared/category.service';
import { Category } from './../shared/category.model';
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import toastr from 'toastr';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  categoryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: Boolean = false;
  category: Category = new Category();

  constructor(private categoryService: CategoryService,
    private route: ActivatedRoute, private router: Router,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  // Invoked after everything is loaded
  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction === 'new') {
      this.createCategory();
    } else { // editing
      this.updateCategory();
    }
  }

  // Private methods
  private setCurrentAction() {
    if (this.route.snapshot.url[0].path === 'new') {// First segment of url
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  private buildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }

  private loadCategory() {
    if (this.currentAction === 'edit') {
      // return the edited category
      this.route.paramMap.pipe(// The + transforms into a number
        switchMap(params => this.categoryService.getById(+params.get('id')))
      ).subscribe(
        (category) => {
          this.category = category;
          this.categoryForm.patchValue(this.category); // Binds loaded category data to category form
        },
        (error) => alert('An error ocurred. Please try again later')
      );
    }
  }


  private setPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitle = 'Add new category';
    } else {
      const categoryName = this.category.name || '';
      this.pageTitle = 'Editing category: ' + categoryName;
    }
  }

  private createCategory() {
    // Creating a new category and assigning the form values
    const category: Category = Object.assign(new Category(), this.categoryForm.value);
    this.categoryService.create(category)
    .subscribe(
      new_category => this.actionsFormSuccess(new_category),
      error => this.actionsForError(error)
    );
  }

  private updateCategory() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);

    this.categoryService.update(category).subscribe(
      new_category => this.actionsFormSuccess(new_category),
      error => this.actionsForError(error)
    );
  }

  private actionsFormSuccess(category: Category) {
    toastr.success('Success!');

    // this.router.navigateByUrl('categories');
    // (skipLocationChange) Do not add to navegation history
    this.router.navigateByUrl('categories', {skipLocationChange: true}).then(
     () => this.router.navigate(['categories', category.id, 'edit'])
    );
  }

  private actionsForError(error) {
    toastr.error('Oh sorry! An error ocurred.');

    this.submittingForm = false;

    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body);
    } else {
      this.serverErrorMessages = ['Server error. Please try again later.'];
    }

  }

}
