import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  canActivate,
} from "@angular/fire/auth-guard";

const redirectUnauthorizedToLanding = () => redirectUnauthorizedTo(["login"]);

const routes: Routes = [
  {
    path: "entries",
    loadChildren: () =>
      import("./pages/entries/entries.module").then((m) => m.EntriesModule),
    ...canActivate(redirectUnauthorizedToLanding),
  },
  {
    path: "perfil",
    loadChildren: () =>
      import("./pages/perfil/perfil.module").then((m) => m.PerfilModule),
    ...canActivate(redirectUnauthorizedToLanding),
  },
  {
    path: "categories",
    loadChildren: () =>
      import("./pages/categories/categories.module").then(
        (m) => m.CategoriesModule
      ),
  },
  {
    path: "reports",
    loadChildren: () =>
      import("./pages/reports/reports.module").then((m) => m.ReportsModule),
  },
  {
    path: "cards",
    loadChildren: () =>
      import("./pages/cards/cards.module").then((m) => m.CardsModule),
  },
  {
    path: "events",
    loadChildren: () =>
      import("./pages/events/events.module").then((m) => m.EventsModule),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./security/security.module").then((m) => m.SecurityModule),
  },
  { path: "", redirectTo: "reports", pathMatch: "full" },
  { path: "**", redirectTo: "reports", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
