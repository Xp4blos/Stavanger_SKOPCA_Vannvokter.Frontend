import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface Root {
    properties: Properties
  }
  
  export interface Properties {
    timeseries: Series[]
  }
  
  export interface Series {
    time: string
    data: Data
  }
  
  export interface Data {
    instant: Instant
  }
  
  export interface Instant {
    details: Details
  }
  
  export interface Details {
    air_pressure_at_sea_level: number
    air_temperature: number
    cloud_area_fraction: number
    relative_humidity: number
    wind_from_direction: number
    wind_speed: number
  }

@Injectable({providedIn: 'root'})
export class WeatherService {
    constructor(private httpClient: HttpClient) { }
    
    getWeatherForecast() {
        const url = 'https://api.met.no/weatherapi/locationforecast/2.0/compact'

        const urlParams = new HttpParams()
        .set('lat',58.974796)
        .set('lon',5.631312)

        const options = {params: urlParams}

        return this.httpClient.get(url, options);
    }
}