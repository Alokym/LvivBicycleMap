import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  lat = 49.8414619;
  lng = 24.0271152;

  constructor() { }

  ngOnInit() {
  }

}
