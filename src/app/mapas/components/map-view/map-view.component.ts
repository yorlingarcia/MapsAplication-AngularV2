import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Map, Marker, Popup } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css',
})
export class MapViewComponent implements AfterViewInit {
  @ViewChild('mapDiv')
  mapDivElement!: ElementRef;

  constructor(
    private placesService: PlacesService,
    private mapService: MapService
  ) {}

  ngAfterViewInit() {
    if (!this.placesService.useLocation)
      throw new Error(`No hay placesService.useLocation`);
    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placesService.useLocation, // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

    const popup = new Popup().setHTML(`
        <h6>Aqui estoy</h6>
        <span>Estoy en este lugar del mundo</span>
      `);

    new Marker({ color: 'red' })
      .setLngLat(this.placesService.useLocation)
      .setPopup(popup)
      .addTo(map);

    this.mapService.setMap(map);
  }
}
