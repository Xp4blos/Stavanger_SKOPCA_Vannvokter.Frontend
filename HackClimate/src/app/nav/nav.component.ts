import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { WeatherService } from '../services/WeatherService';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  user!:User
  userFullName!:string
  userAdress!:string
  temp!:Number[] 
  constructor(private userService: UserService, private weatherService: WeatherService){}

  ngOnInit(): void {
      this.user = this.userService.loggedUser
      this.userAdress = this.userService.getUserAdress()
      this.userFullName = this.userService.getUserFullName()

      this.weatherService.getWeatherForecast().subscribe(response =>{
        this.temp = this.weatherService.getTemperature(response.properties.timeseries)
        console.log(this.temp[0]);
        
      })


  }

}
