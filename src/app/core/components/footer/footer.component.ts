import { EventsService } from './../../../pages/events/shared/events.service';
import { Component, OnInit } from '@angular/core';
import { Events } from 'src/app/pages/events/shared/events.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  events: Array<Events>;
  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.eventsService.getAll().subscribe(
      (events) => this.events = events
    );
  }

}
