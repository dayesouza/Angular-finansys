import { Component } from '@angular/core';

import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';
import { BaseResourceListComponent } from '../../../shared/components/base-resource-list/base-resource-list.component';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent extends BaseResourceListComponent<Entry> {

  entries: Entry[] = [];
  constructor(private entryService: EntryService ) {
    super(entryService);
   }

  // ngOnInit() {// How to sort on base resource
  //   this.entryService.getAll().subscribe(
  //     // sort by date desc
  //     entries => this.entries = entries.sort((a: Entry, b: Entry) => {
  //       return +new Date(b.date) - +new Date(a.date);
  //     }),
  //     error => alert('Error getting entries list.')
  //   );
  // }

}
