import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { scheduler } from "dhtmlx-scheduler";
import { EventService } from "../services/event.service";
import { Weather, Series, WeatherService } from "../services/WeatherService";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @ViewChild("scheduler_here", {static: true}) schedulerContainer!: ElementRef;

  precipitations!:number[]
  temperatures!:number[]

  constructor(private eventService: EventService, private weatherService: WeatherService){}

    ngOnInit() {
      scheduler.config.date_format = "%Y-%m-%d %H:%i";
      scheduler.init(this.schedulerContainer.nativeElement, new Date(2023, 4, 15));
      this.eventService.get()
          .then((data) => {
               scheduler.parse(data);
          });
    }

    GetWeatherForecast()
    {
      this.weatherService.getWeatherForecast().subscribe(response=>{
        console.log(response);
        this.precipitations = this.weatherService.getPrecipitation(response.properties.timeseries)
        this.temperatures = this.weatherService.getTemperature(response.properties.timeseries)
      })
      
    }
}
