import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from "@angular/core";
import { scheduler } from "dhtmlx-scheduler";
import { EventService } from "../services/event.service";
import { Weather, Series, WeatherService } from "../services/WeatherService";
import { formatDate } from "@angular/common";
import { Subscription } from "rxjs";
import { Route, Router } from "@angular/router";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("scheduler_here", {static: true}) schedulerContainer!: ElementRef;

  precipitations!:number[]
  temperatures!:number[]
  MyDateTemp = new Date()
  MyDatePrec = new Date()
  currentDate : string = formatDate( this.MyDateTemp,'dd-MM-yyy','en' )
  currentDatePrec : string = formatDate( this.MyDatePrec,'dd-MM-yyy','en' )
 
  constructor(private eventService: EventService, private router: Router ,private weatherService: WeatherService){}
    weatherSubscription !: Subscription
    ngOnInit() {
     
      console.log(this.currentDate);
      scheduler.config.date_format = "%Y-%m-%d %H:%i";
      scheduler.init(this.schedulerContainer.nativeElement, new Date(2023, 11, 26),'month');
      
   
      //load events
      this.eventService.get()
          .then((data) => {
               scheduler.parse(data);
          });
    }
    ngOnDestroy(): void {
      this.weatherSubscription.unsubscribe
    }
    ngAfterViewInit(): void {
         //Loads Weather in calendar for next 10 days
         this.GetWeatherForecast()
        
    }
    
    GetWeatherForecast()
    {
      this.weatherSubscription =this.weatherService.getWeatherForecast().subscribe(response=>{
        console.log(response);
        this.precipitations = this.weatherService.getPrecipitation(response.properties.timeseries)
        this.temperatures = this.weatherService.getTemperature(response.properties.timeseries)
        console.log('temp ', this.temperatures);
        
        this.temperatures.forEach((temp) =>{
          scheduler.addEvent({
            start_date: formatDate(new Date( this.MyDateTemp.setDate(this.MyDateTemp.getDate())),'dd-MM-yyy','en'),
            end_date:  formatDate(new Date( this.MyDateTemp.setDate(this.MyDateTemp.getDate()+1)),'dd-MM-yyy','en'),
            text:   "Temperature "+temp+" °C",

        }); 
        })

        this.precipitations.forEach((prec) =>{
          scheduler.addEvent({
            start_date: formatDate(new Date( this.MyDatePrec.setDate(this.MyDatePrec.getDate())),'dd-MM-yyy','en'),
            end_date:  formatDate(new Date( this.MyDatePrec.setDate(this.MyDatePrec.getDate()+1)),'dd-MM-yyy','en'),
            text:   "Precipitations "+prec+" mm",

        }); 
        })
      })
      
    }
}
