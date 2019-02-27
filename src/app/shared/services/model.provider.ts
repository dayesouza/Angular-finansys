import { from } from 'rxjs';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import {Injectable, Injector} from '@angular/core';

import {map} from 'rxjs/operators';


@Injectable()
export class ModelProvider {

  public firestore: AngularFirestore;

  constructor(
    protected injector: Injector
    ) {
    // this.carregarUser();
  }

  protected carregarUser() {
    // this.userProvider.user.subscribe(user => {
    //   this.user = user;
    // });
  }

  /*
  * For more details see the documentation: https://github.com/angular/angularfire2/blob/master/docs/firestore/querying-collections.md
  *
  * Simple example:
  * var _query = ref => ref.where('post_categories', 'array-contains', 244);
  *
  */
  public factoryCollection(_collection_name_, _query_?): AngularFirestoreCollection<any> {
    return this.firestore.collection(_collection_name_, _query_);
  }

  public factoryObservables(_collection_name_, _query_?): Observable<any[]> {

    // this.loadingProvider.present();

    return this.factoryCollection(_collection_name_, _query_).snapshotChanges().pipe(map(actions => {

      // this.loadingProvider.dismiss();

      return actions.map(action => {
        const data = action.payload.doc.data() as any;
        const id = action.payload.doc.id;
        return {id, ...data};
      });
    }));

  }

  protected factoryDocument(_document_name_, _id_): Observable<any> {

    return from(this.firestore.doc(_document_name_ + '/' + _id_).ref.get().then(function (_doc_) {
      if (_doc_.exists) {
        return _doc_.data();
      } else {
        return undefined;
      }
    }));

  }

  public factoryObject(_collection_name_, _id_): any {

    return this.firestore.collection(_collection_name_).valueChanges().subscribe(fields => {

      console.log(fields);

    });

  }

  protected persistDocument(_document_name_, _document_) {

    let _id: any;

    if (_document_.id) {
      _id = _document_.id;
    } else {
      _id = this.firestore.createId();
    }

    console.log(_id);
    return this.firestore.doc(_document_name_ + '/' + _id).set(_document_);
  }

  protected deleteDocument(_document_name_, _id_) {
    return this.firestore.doc(_document_name_ + '/' + _id_).delete();
  }


}
