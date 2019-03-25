import { CardsService } from './../../cards/shared/cards.service';
import { flatMap, catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Injectable, Injector } from '@angular/core';
import { Entry } from './entry.model';
import { CategoryService } from '../../categories/shared/category.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  constructor(protected injector: Injector, private categoryService: CategoryService, private cardService: CardsService) {
    super('entries', injector, Entry.fromJson);
  }

  create(entry: Entry) {
    return this.setCategoryAndSendToServer(entry, super.persistDocument.bind(this));
  }

  // update(entry: Entry): Observable<Entry> {
  //   return this.setCategoryAndSendToServer(entry, super.persistDocument.bind(this));
  // }

  getByMonthAndYear(month: number, year: number): Observable<Entry[]> {
    return this.getAll().pipe(// Send to server already with year and month
      map(entries => this.filterByMonthAndYear(entries, month, year))
    );
  }

  private filterByMonthAndYear(entries: Entry[], month: number, year: number) {
    return entries.filter(entry => {
      const entryDate = moment(entry.date);

      const monthMatches = entryDate.month() + 1 == month;
      const yearMatches = entryDate.year() == year;
      if (monthMatches && yearMatches) {
        return entry;
      }
    });
  }

  private setCategoryAndSendToServer(entry: Entry, sendFn: any) {
    return this.categoryService.getById(entry.categoryId).subscribe(
      (category) => {
        entry.category = Object.assign({}, category);
        entry.categoryId = '';
        return this.cardService.getById(entry.cardId).subscribe(
          (card) => {
            entry.card = Object.assign({}, card);
            entry.cardId = '';
            return sendFn(entry);
          });
      }),
      catchError(this.handleError);
  }
}
