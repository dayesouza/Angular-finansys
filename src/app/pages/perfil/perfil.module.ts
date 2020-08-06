import { PerfilRoutingModule } from "./perfil-routing.module";
import { NgModule } from "@angular/core";
import { PerfilListComponent } from "./perfil-list/perfil-list.component";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [PerfilListComponent],
  imports: [PerfilRoutingModule, SharedModule],
})
export class PerfilModule {}
