import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { MapSettings } from './map.settings';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  mobileQuery: MediaQueryList;
  isSnazzyInfoWindowOpened: boolean = false;
  snazzyInfoCoordinates = {
    lat: 49.8414619,
    lng: 24.0271152,
  };
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

  private _mobileQueryListener: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
  ) {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.setLocation();
  }

  setLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.marker.lat = position.coords.latitude;
        this.marker.lng = position.coords.longitude;
      });
    }
  }

  showSuggestionPopup($event) {
    console.log($event.coords);
    this.snazzyInfoCoordinates = $event.coords;
    this.isSnazzyInfoWindowOpened = true;
  }
}
