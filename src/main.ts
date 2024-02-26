import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken =
  'pk.eyJ1IjoieW9ybGluOTYiLCJhIjoiY2xoNWdzeTZiMWpycDNjbzF5eGIyNnZqaCJ9.9ZDRHEcNHabmbiCL7adZxw';

if (!navigator.geolocation) {
  alert(`Navegador no soporta la Geolocation`);
  throw new Error(`Navegador no soporta la Geolocation`);
}
