import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit, AfterViewInit {
  private pointValue;

  @Input()
  get point() {
    return this.pointValue;
  }

  @Output() pointChange = new EventEmitter();
  set point(val) {
    this.pointValue = val;
    this.pointChange.emit(this.pointValue);
  }

  @Input() public placeholder: string;
  @ViewChild('search') searchElement;

  constructor(
    private mapsApiLoader: MapsAPILoader
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.mapsApiLoader.load().then(() => {
      const autocompleteFrom = new google.maps.places.Autocomplete(this.searchElement.nativeElement, {
        types: ['address']
      });
      autocompleteFrom.addListener('place_changed', () => {
        const place = autocompleteFrom.getPlace();
        const location = place.geometry.location;
        this.point = {name: place.formatted_address, location: {lng: location.lng(), lat: location.lat()} };
      });
    });
  }

  onKeyPress(data) {
    // if (data && data.target) {
    //     this.point = { name: data.target.value }
    // }
  }

}
