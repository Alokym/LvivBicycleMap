import { Injectable, EventEmitter } from '@angular/core';
import {MapPoint} from './map-point';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import {MapRoute} from "./map.route.interface";

@Injectable()
export class MapService {
  public points = [];
  public selectedPoint: MapPoint;
  public suggestions: EventEmitter<any> = new EventEmitter();
  public details: EventEmitter<any> = new EventEmitter();
  public route: MapRoute = new MapRoute();
  public map;
  public onDraw = new EventEmitter();

  private directionsService;
  private directionsDisplay;

  constructor(private mapsAPILoader: MapsAPILoader) {
    this.details.subscribe((point) => {
      this.selectedPoint = point;
    });

    // this.mapsAPILoader.load().then(() => {
    //   this.directionsService = new google.maps.DirectionsService();
    //   this.directionsDisplay = new google.maps.DirectionsRenderer({
    //     draggable: true
    //   });
    //
    //   this.directionsDisplay.addListener('directions_changed', () => {
    //       this.route.distance = this.computeTotalDistance(this.directionsDisplay.getDirections());
    //   });
    // });
  }

  drawPoints(points) {
    this.points = points;
    this.onDraw.next(points);
  }

  drawRoute(source, destination) {
    // clear previous route
    this.clearRoute();

    this.mapsAPILoader.load().then(() => {
        const request = {
          origin: new google.maps.LatLng(source.lat, source.lng),
          destination: new google.maps.LatLng(destination.lat, destination.lng),
          travelMode: google.maps.TravelMode.WALKING,
          unitSystem: google.maps.UnitSystem.IMPERIAL
        };

        this.directionsService = new google.maps.DirectionsService();
        this.directionsDisplay = new google.maps.DirectionsRenderer({
            draggable: true
        });

        this.directionsDisplay.addListener('directions_changed', () => {
            this.route.distance = this.computeTotalDistance(this.directionsDisplay.getDirections());
        });

        this.directionsDisplay.setMap(this.map);

        this.directionsService.route(request, (result, status) => {
          if (status == google.maps.DirectionsStatus.OK) {
            this.directionsDisplay.setDirections(result);
            this.route.distance = this.computeTotalDistance(result);
          }
        });
    });
  }

  clearRoute() {
    if (this.directionsDisplay) this.directionsDisplay.setMap(null);
    this.route.distance = null;
  }

  computeTotalDistance(result) {
    const myroute = result.routes[0];
    let total = 0;
    for (let i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
    return total / 1000;
  }
}
