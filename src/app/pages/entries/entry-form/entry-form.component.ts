import { EntryService } from './../shared/entry.service';
import { Entry } from './../shared/entry.model';
import { Component, Injector, OnInit} from '@angular/core';
import { Validators } from '@angular/forms';

import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';
import { BaseResourceFormComponent } from '../../../shared/components/base-resource-form/base-resource-form.component';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent extends BaseResourceFormComponent<Entry> implements OnInit {

  categories: Array<Category>;

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: '.'
  };

  constructor(
    protected entryService: EntryService,
    protected categoryService: CategoryService,
    protected injector: Injector
    ) {
      super(injector, new Entry(), entryService, Entry.fromJson);
  }

  ngOnInit() {
    this.loadCategories();
    super.ngOnInit();
  }

  get typeOptions(): Array<any> {
    return Object.entries(Entry.types).map(
      ([value, text]) => {
        return {
          text: text,
          value: value
        };
      }
    );
  }

  submit() {
    this.submittingForm = true;
    this.entryService.create(this.resourceForm.value);
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: ['expense', [Validators.required]],
      amount: [null, [Validators.required]],
      date: [new Date(), [Validators.required]],
      paid: [true, [Validators.required]],
      categoryId: [null, [Validators.required]]
    });
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
          this.resource.date = new Date(this.resource.date['seconds']  * 1000);
          this.resourceForm.patchValue(this.resource); // Binds loaded category data to resource form
        },
        (error) => alert('An error ocurred. Please try again later')
      );
    }
  }

  protected loadCategories() {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories
    );
  }

  protected creationPageTitle(): string {
    return 'New entry';
  }
  protected editionPageTitle(): string {
    const entryName = this.resource.name || '';
    return 'Editing entry ' + entryName;
  }

}
