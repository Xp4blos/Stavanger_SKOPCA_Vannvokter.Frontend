import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface Weather {
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
    next_6_hours?: Next6Hours
  }

  export interface Next6Hours {
    details: Details
  }
  
  export interface Details {
    air_temperature_max: number
    air_temperature_min: number
    precipitation_amount: number
    precipitation_amount_max: number
    precipitation_amount_min: number
    probability_of_precipitation: number
  }
  
  export interface Instant {
    details: Details
  }
  
  export interface Details {
    air_pressure_at_sea_level: number
    air_temperature: number
    air_temperature_percentile_10: number
    air_temperature_percentile_90: number
    cloud_area_fraction: number
    cloud_area_fraction_high: number
    cloud_area_fraction_low: number
    cloud_area_fraction_medium: number
    dew_point_temperature: number
    fog_area_fraction?: number
    relative_humidity: number
    ultraviolet_index_clear_sky?: number
    wind_from_direction: number
    wind_speed: number
    wind_speed_of_gust?: number
    wind_speed_percentile_10: number
    wind_speed_percentile_90: number
  }

@Injectable({providedIn: 'root'})
export class WeatherService {
    constructor(private httpClient: HttpClient) { }
    
    public getWeatherForecast() {
        const url = 'https://api.met.no/weatherapi/locationforecast/2.0/complete'

        const urlParams = new HttpParams()
        .set('lat',58.974796)
        .set('lon',5.631312)

        const options = {params: urlParams}

        return this.httpClient.get<Weather>(url, options);
    }

    public getPrecipitation( series: Series[] ):number[] {
      let precipitation:number[] = []

      series.forEach(element => {
        if(element.time.slice(11,13) === '00'
        || element.time.slice(11,13) === '06'
        || element.time.slice(11,13) === '12'
        || element.time.slice(11,13) === '18')
        {
          const precipitation_amount = element.data.next_6_hours?.details.precipitation_amount
  
          if( precipitation_amount === undefined)
            precipitation.push(0);
          else
            precipitation.push(precipitation_amount);
        }
      });

      let DailyPrecipitation:number[] = []

    
      while(precipitation.length >= 4)
      {
       
        let sum:number = 0;

        for (let i = 0; i < 4; i++) {
          const prec = precipitation.pop()
          if (typeof prec == 'number')
            sum += prec
        }

        DailyPrecipitation.push(sum)
      }

      console.log(DailyPrecipitation)
      return DailyPrecipitation
    }

    public getTemperature( series: Series[] ):number[] {

      let temperatures:number[] = []

      series.forEach(element => {
        if(element.time.slice(11,13) === '12')
        {
          const temperature = element.data.instant.details.air_temperature
          
          if( temperature === undefined)
          temperatures.push(0);
          else
            temperatures.push(temperature);
        }
      });
      
      return temperatures
    }
}