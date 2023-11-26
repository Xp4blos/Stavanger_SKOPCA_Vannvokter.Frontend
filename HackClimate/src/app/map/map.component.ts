import { Component, AfterViewInit } from '@angular/core';
import { AddressService, Coordinates } from '../services/AddressService';
import L, { Map, Marker, MarkerOptions, latLng } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  private map!:Map
  
  constructor(private addressService:AddressService) { }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 58.974796, 5.631312 ],
      zoom: 14
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  ngAfterViewInit(): void {
    this.initMap();

    const address = 'Øygardsveien 35, 4047 Hafrsfjord, Norway'

    this.addressService.getPlaces(address).subscribe(response=>{
      console.log(response);
      const coordinates = this.addressService.getCoordinate(response)

      var marker = L.marker([coordinates.latitude, coordinates.longitude])

      marker.bindPopup(address).openPopup()

      marker.addTo(this.map);
    })
  }
}