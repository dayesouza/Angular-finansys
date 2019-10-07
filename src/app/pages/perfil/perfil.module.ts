import { PerfilRoutingModule } from './perfil-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { PerfilListComponent } from './perfil-list/perfil-list.component';

@NgModule({
  declarations: [PerfilListComponent],
  imports: [
    PerfilRoutingModule,
    SharedModule
  ]
})
export class PerfilModule { }
