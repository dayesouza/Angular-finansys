import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';



export abstract class BaseResourceService <T extends BaseResourceModel> {

  protected http: HttpClient;

  constructor(protected apiPath: string) {
  }

  getAll(): Observable<T[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToResources)
    );
  }

  getById(id: Number): Observable<T> {
    const url = this.apiPath + '/' + id;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToResource)
    );
  }

  create(resource: T): Observable<T> {
    return this.http.post(this.apiPath, resource).pipe(
      catchError(this.handleError), // Manipulate error
      map(this.jsonDataToResource) // Resolve data to json
    );
  }

  update(resource: T): Observable<T> {
    const url = this.apiPath + '/' + resource.id;
    return this.http.put(url, resource).pipe(// manipulate the return
      catchError(this.handleError), // Manipulate error
      map(() => resource) // Return the same resource
    );
  }

  delete(id: Number): Observable<any> {
    const url = this.apiPath + '/' + id;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  // Protected
    protected jsonDataToResources(jsonData: any[]): T[] {
       const resources: T[] = [];
      jsonData.forEach(element => resources.push(element as T));
      return resources;
    }

    protected jsonDataToResource(jsonData: any): T {
      return jsonData as T;
    }

    protected handleError(error: any): Observable<any> {
      console.log('ERROR:', error);
      return throwError(error);
    }

}
