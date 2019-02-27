import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injector } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

export abstract class BaseResourceService <T extends BaseResourceModel> {

  protected http: HttpClient;
  protected db: AngularFirestore;
  apiPath = '';
  collection: AngularFirestoreCollection;

  constructor(protected baseName: string,
    protected injector: Injector,
    protected jsonDataToResourceFN: (jsonData) => T) {
    this.http = injector.get(HttpClient);
    this.db = injector.get(AngularFirestore);

    this.collection = this.db.collection(this.baseName);
  }

  getAll(): Observable<T[]> {
    return this.collection.valueChanges().pipe(
      map(this.jsonDataToResources.bind(this)),
      catchError(this.handleError)
    );
  }

  getById(id: Number): Observable<T> {
    const url = this.apiPath + '/' + id;
    return this.db.collection(this.baseName, ref => ref.where('id', '==', id)).valueChanges().pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
    );
  }

  create(resource: T): Observable<T> {
    return this.http.post(this.apiPath, resource).pipe(
      map(this.jsonDataToResource.bind(this)), // Resolve data to json
      catchError(this.handleError) // Manipulate error
    );
  }

  update(resource: T): Observable<T> {
    const url = this.apiPath + '/' + resource.id;
    return this.http.put(url, resource).pipe(// manipulate the return
      map(() => resource), // Return the same resource
      catchError(this.handleError) // Manipulate error
    );
  }

  delete(id: Number): Observable<any> {
    const url = this.apiPath + '/' + id;
    return this.http.delete(url).pipe(
      map(() => null),
      catchError(this.handleError)
    );
  }

  // Protected
  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    console.log(jsonData);
    jsonData.forEach(element => resources.push(this.jsonDataToResourceFN(element)));
    return resources;
  }

  protected jsonDataToResource(jsonData: any): T {
    return this.jsonDataToResourceFN(jsonData);
  }

  protected handleError(error: any): Observable<any> {
    console.log('ERROR:', error);
    return throwError(error);
  }

}
