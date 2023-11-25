import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { scheduler } from "dhtmlx-scheduler";
import { EventService } from "../services/event.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @ViewChild("scheduler_here", {static: true}) schedulerContainer!: ElementRef;

  constructor(private eventService: EventService){}

    ngOnInit() {
      scheduler.config.date_format = "%Y-%m-%d %H:%i";
      scheduler.init(this.schedulerContainer.nativeElement, new Date(2023, 4, 15));
      this.eventService.get()
          .then((data) => {
               scheduler.parse(data);
          });
    }
}
