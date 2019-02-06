import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, flatMap } from 'rxjs/operators';
import { Entry } from './entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath = 'api/entries';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Entry[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntries)
    );
  }

  getById(id: number): Observable<Entry> {
    const url = this.apiPath + '/' + id;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    );
  }

  create(entry: Entry): Observable<Entry> {
    return this.http.post(this.apiPath, entry).pipe(
      catchError(this.handleError), // Manipulate error
      map(this.jsonDataToEntry) // Resolve data to json
    );
  }

  update(entry: Entry): Observable<Entry> {
    const url = this.apiPath + '/' + entry.id;
    return this.http.put(url, entry).pipe(// manipulate the return
      catchError(this.handleError), // Manipulate error
      map(() => entry) // Return the same entry
    );
  }

  delete(id: Number): Observable<any> {
    const url = this.apiPath + '/' + id;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  // PRIVATE METHODS

  private jsonDataToEntries(jsonData: any[]): Entry[] {
      const entries: Entry[] = [];
      jsonData.forEach(element => entries.push(element as Entry));
      return entries;
  }

  private jsonDataToEntry(jsonData: any): Entry {
    return jsonData as Entry;
  }

  private handleError(error: any): Observable<any> {
    console.log('ERROR:', error);
    return throwError(error);
  }
}
