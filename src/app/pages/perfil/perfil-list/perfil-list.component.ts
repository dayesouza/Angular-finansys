import { AuthService } from "./../../../security/service/auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-perfil-list",
  templateUrl: "./perfil-list.component.html",
  styleUrls: ["./perfil-list.component.scss"],
})
export class PerfilListComponent implements OnInit {
  user: firebase.User;
  constructor(public auth: AuthService) {}

  ngOnInit() {
    this.user = this.auth.returnUser();
  }
}
