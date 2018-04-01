import { Component, OnInit } from '@angular/core';
import {MapService} from "../components/map/map.service";

@Component({
  selector: 'app-custom-route',
  templateUrl: './custom-route.component.html',
  styleUrls: ['./custom-route.component.scss']
})
export class CustomRouteComponent implements OnInit {
  constructor(private mapService: MapService) { }

  ngOnInit() {

  }
}
