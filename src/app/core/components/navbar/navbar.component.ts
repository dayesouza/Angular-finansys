import { PreferencesService } from './../../../shared/services/preferences/preferences.service';
import { Events } from './../../../pages/events/shared/events.model';
import { EventsService } from './../../../pages/events/shared/events.service';
import { Component, OnInit } from '@angular/core';
import { Preferences } from 'src/app/shared/services/preferences/preferences.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  events: Array<Events>;
  preferences: Preferences;
  constructor(private eventsService: EventsService, private preferencesService: PreferencesService) { }

  ngOnInit() {
    this.eventsService.getAll().subscribe(
      (events) => {
        this.events = events;
        this.getPreferences();
      }
    );
  }

  getPreferences() {
    this.preferencesService.getData().subscribe(
      (data) => {
        if (data) {
          this.preferences = data;
        }
      }
    );
  }

  changeEvent(event) {
    const pref = new Preferences();
    pref.id = '5';
    pref.idUser = '5';
    pref.event = event;
    this.preferencesService.persistData(pref);
    this.getPreferences();
  }

}
