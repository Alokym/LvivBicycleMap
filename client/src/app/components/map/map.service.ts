import { Injectable, EventEmitter } from '@angular/core';
import {MapPoint} from './map-point';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';

@Injectable()
export class MapService {
  public points = [];
  public selectedPoint: MapPoint;
  public suggestions: EventEmitter<any> = new EventEmitter();
  public details: EventEmitter<any> = new EventEmitter();

  public onDraw = new EventEmitter();
    public map = null;
    directionsService = null;
    directionsDisplay = null;

  constructor(private mapsAPILoader: MapsAPILoader) {
    this.details.subscribe((point) => {
      this.selectedPoint = point;
    });
  }

  drawPoints(points) {
    this.points = points;
    this.onDraw.next(points);
  }

  drawRoute(source, destination) {
      this.mapsAPILoader.load().then(() => {
          let directionsService = new google.maps.DirectionsService();
          const directionsDisplay = new google.maps.DirectionsRenderer({
              draggable: true,
              map: this.map
          });

          directionsDisplay.addListener('directions_changed', () => {
              this.computeTotalDistance(directionsDisplay.getDirections());
          });

          const request = {
              origin: new google.maps.LatLng(source.lat, source.lng),
              destination: new google.maps.LatLng(destination.lat, destination.lng),
              travelMode: google.maps.TravelMode.WALKING,
              unitSystem: google.maps.UnitSystem.IMPERIAL
          };

          directionsService.route(request, (result, status) => {
              if (status == google.maps.DirectionsStatus.OK) {
                  directionsDisplay.setDirections(result);
                  this.computeTotalDistance(result);
              }
          });
      });
  }

    computeTotalDistance(result) {
        const myroute = result.routes[0];
        let total = 0;
        for (let i = 0; i < myroute.legs.length; i++) {
            total += myroute.legs[i].distance.value;
        }
        total = total / 1000;
        document.getElementById('total').innerHTML = total + ' km';
    }
}
