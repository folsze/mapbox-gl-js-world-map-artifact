import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent],
})
export class HomePage {

  map!: mapboxgl.Map;
  features: any[] = [];

  constructor() {}

  ngOnInit() {
    fetch('/assets/Countries.geo.json')
      .then(response => response.json())
      .then(data => {
        this.features = data.features;
        this.initializeMap(data);
      });
  }

  initializeMap(geojsonData: any) {
    this.map = new mapboxgl.Map({
      attributionControl: false,
      accessToken: 'pk.eyJ1IjoiZmVsaXhvbHN6ZXdza2kiLCJhIjoiY2xyNTZrOTJvMWcxeTJrbnZsM2RuOGk5aiJ9.TENtwqeAtqAqSNzFmg0i4w',
      container: 'map',
      style: {
        version: 8,
        glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
        sources: {
          'countries': {
            type: 'geojson',
            data: geojsonData,
            promoteId: 'admin',
          }
        },
        layers: [
          {
            id: 'background',
            type: 'background',
            paint: {
              'background-color': '#c6ecff'
            }
          },
          {
            id: 'country-fills',
            type: 'fill',
            source: 'countries',
            paint: {
              'fill-color': '#2e34da',
              'fill-opacity': 1
            }
          },
          {
            id: 'country-borders',
            type: 'line',
            source: 'countries',
            paint: {
              'line-color': '#000',
              'line-width': 0.5,
            }
          }
        ]
      },
      center: [-84.077922, 10.0651],
      zoom: 7
    });

  }

}
