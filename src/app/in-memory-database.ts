import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from './pages/categories/shared/category.model';
import { Entry } from './pages/entries/shared/entry.model';

export class InMemoryDatabase implements InMemoryDbService {
  createDb() {
    const categories: Category[] = [
      {id: 1, name: 'Leisure', description: 'Movies, parks, beach...'},
      {id: 2, name: 'Health', description: 'Medicines, hospital...'},
      {id: 3, name: 'Books', description: 'Books, e-books'},
      {id: 4, name: 'Salary', description: 'Paycheck'},
      {id: 5, name: 'Savings', description: 'Savings'},
      {id: 6, name: 'Games', description: 'Video games, board games, mobile games...'},
    ];

    const entries: Entry[] = [
      new Entry(1, 'Crash Bandicoot', 'Sale on Steam', 'expense', '98.00', '12/12/2018', true,  categories[6].id )
    ];

    return { categories, entries };
  }
}
