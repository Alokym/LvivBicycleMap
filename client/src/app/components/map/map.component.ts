import { MapService } from './map.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { mapStyles } from './map.styles';

import { MapSettings } from './map.settings';
import {MapPoint} from './map-point';
import {MapRoute} from "./map.route.interface";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  mobileQuery: MediaQueryList;
  defaults = {
    lat: 49.8414619,
    lng: 24.0271152,
    zoom: 16
  };
  marker = {
    lat: 49.8414619,
    lng: 24.0271152
  };

  mapOptions = {
    styles: new MapSettings()
  };

  points = [];

  private _mobileQueryListener: () => void;
  private route: MapRoute;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private service: MapService
    //private suggestedPoint: MapPoint,
  ) {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.setLocation();
    this.service.onDraw.subscribe(res => {
      this.points = res;
    });
    this.route = this.service.route;
  }

  setLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.marker.lat = position.coords.latitude;
        this.marker.lng = position.coords.longitude;
      });
    }
  }

  onMapReady(map) {
      this.service.map = map;
  }

  onMapClick($event) {
    this.service.suggestions.emit($event);
    //this.suggestedPoint = $event.coords;
  }

  onMarkerClick(point) {
    console.log(point);
    this.service.details.emit(point);
  }
}
