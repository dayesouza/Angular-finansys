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
  serverErrorMessages: string[] = [];
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

}
