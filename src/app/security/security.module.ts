import { LoginComponent } from './component/login/login.component';
import { SecurityRoutingModule } from './security-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [ SharedModule, SecurityRoutingModule ],
  exports: [],
  providers: [],
})
export class SecurityModule {}
