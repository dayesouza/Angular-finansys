import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { PreferencesService } from './../shared/services/preferences/preferences.service';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { InMemoryDatabase } from '../in-memory-database';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { FooterComponent } from './components/footer/footer.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    AngularFireDatabaseModule,
    NgbModule
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase),
  ],
  exports: [// shared modules
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NavbarComponent,
    FooterComponent,
    NgbModule
  ],
  providers: [
    AngularFireDatabase,
    AngularFirestore,
    PreferencesService,
    LocalStorageService
  ]
})
export class CoreModule { }
