import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from './pages/categories/shared/category.model';

export class InMemoryDatabase implements InMemoryDbService {
  createDb() {
    const categories: Category[] = [
      {id: 1, name: 'Leisure', description: 'Movies, parks, beach...'},
      {id: 2, name: 'Health', description: 'Movies, parks, beach...'},
      {id: 3, name: 'Books', description: 'Books, e-books'},
      {id: 4, name: 'Salary', description: 'Company salary'}
    ];

    return { categories };
  }
}
