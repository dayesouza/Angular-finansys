import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injector } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

export abstract class BaseResourceService <T extends BaseResourceModel> {

  protected http: HttpClient;
  protected firestore: AngularFirestore;
  apiPath = '';
  collection: AngularFirestoreCollection;

  constructor(protected baseName: string,
    protected injector: Injector,
    protected jsonDataToResourceFN: (jsonData) => T) {
    this.http = injector.get(HttpClient);
    this.firestore = injector.get(AngularFirestore);
  }

  private returnCollection(_query_?): AngularFirestoreCollection<T> {
    return this.firestore.collection(this.baseName, _query_);
  }

  getAll(): Observable<T[]> {
    return this.returnCollection().valueChanges().pipe(
      map(this.jsonDataToResources.bind(this)),
      catchError(this.handleError)
    );
  }

  getById(id: string): Observable<T> {
    return this.firestore.collection(this.baseName).doc(id).valueChanges().pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
    );
  }

  persistDocument(_document_) {
    let _id: any;
    if (_document_.id) {
      _id = _document_.id;
    } else {
      _id = this.firestore.createId();
      _document_.id = _id;
    }

    return this.firestore.collection(this.baseName).doc(_id).set(Object.assign({}, _document_));
  }

  update(resource: T): Observable<T> {
    const url = this.apiPath + '/' + resource.id;
    return this.http.put(url, resource).pipe(// manipulate the return
      map(() => resource), // Return the same resource
      catchError(this.handleError) // Manipulate error
    );
  }

  delete(id: string): Promise<any> {
    return this.firestore.collection(this.baseName).doc(id).delete();
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
