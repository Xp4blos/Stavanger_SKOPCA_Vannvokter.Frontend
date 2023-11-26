import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export class Coordinates {
    latitude  :number
    longitude :number

    constructor(lat:number, lon:number) {
        this.latitude = lat
        this.longitude = lon
    }
}

export type Places = Place[]

export interface Place {
  place_id: string
  licence: string
  osm_type: string
  osm_id: string
  boundingbox: string[]
  lat: string
  lon: string
  display_name: string
  class: string
  type: string
  importance: number
  icon?: string
}


@Injectable({providedIn: 'root'})
export class AddressService {
    constructor(private httpClient: HttpClient) { }
    
    public getPlaces(address:string)
    {
        const key = 'pk.9549554b13be9182694a0bd3f28ae71b'

        const url = 'https://us1.locationiq.com/v1/search'

        const urlParams = new HttpParams()
        .set('key', key)
        .set('q', address)
        .set('format', 'json')

        const options = {params: urlParams}

        return this.httpClient.get<Places>(url, options);
    }

    public getCoordinate(Places:Places):Coordinates
    {
        return new Coordinates(parseFloat(Places[0].lat), parseFloat(Places[0].lon));
    }
}