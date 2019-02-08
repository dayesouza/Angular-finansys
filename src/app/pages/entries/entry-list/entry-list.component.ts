import { Component, OnInit } from '@angular/core';

import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent implements OnInit {

  entries: Entry[] = [];
  constructor(private entryService: EntryService ) { }

  ngOnInit() {
    this.entryService.getAll().subscribe(
      // sort by date desc
      entries => this.entries = entries.sort((a: Entry, b: Entry) => {
        return +new Date(b.date) - +new Date(a.date);
      }),
      error => alert('Error getting entries list.')
    );
  }

  deleteEntry(entry) {
    const mustDelete = confirm('Do you really want to delete entry ' + entry.name + '?');
    if (mustDelete) {
      this.entryService.delete(entry.id).subscribe(
        () => this.entries = this.entries.filter(element => element !== entry),
        () => 'Error on delete function!'
      );
    }

  }

}
