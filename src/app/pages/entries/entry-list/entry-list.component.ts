import { Component, OnInit } from '@angular/core';

import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent implements OnInit {

  categories: Entry[] = [];
  constructor(private entryService: EntryService ) { }

  ngOnInit() {
    this.entryService.getAll().subscribe(
      categories => this.categories = categories,
      error => alert('Error getting categories list.')
    );
  }

  deleteEntry(entry) {
    const mustDelete = confirm('Do you really want to delete entry ' + entry.name + '?');
    if (mustDelete) {
      this.entryService.delete(entry.id).subscribe(
        () => this.categories = this.categories.filter(element => element !== entry),
        () => 'Error on delete function!'
      );
    }

  }

}
