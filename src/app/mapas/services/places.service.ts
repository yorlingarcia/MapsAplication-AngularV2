import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  public useLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.useLocation;
  }

  constructor(private http: HttpClient) {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.useLocation = [coords.longitude, coords.latitude];
          resolve(this.useLocation);
        },
        (err) => {
          alert(`No se pudo obtener la geolocalizacion`);
          console.log({ err });
          reject();
        }
      );
    });
  }

  getPlacesByQuery(query: string = '') {
    //tod: evaluar cuando el query es un string vacio/nulo
    this.isLoadingPlaces = true;
    this.http
      .get<PlacesResponse>(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?limit=1&language=es&access_token=pk.eyJ1IjoieW9ybGluOTYiLCJhIjoiY2xoNWdzeTZiMWpycDNjbzF5eGIyNnZqaCJ9.9ZDRHEcNHabmbiCL7adZxw`
      )
      .subscribe((resp) => {
        this.isLoadingPlaces = false;
        this.places = resp.features;
      });
  }
}
