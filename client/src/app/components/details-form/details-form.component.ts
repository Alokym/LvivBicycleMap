import { Component, OnInit } from '@angular/core';
import {MapService} from '../map/map.service';

@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.scss']
})
export class DetailsFormComponent implements OnInit {
  info = '';

  constructor(
    private mapService: MapService,
  ) {}

  ngOnInit() {
    console.log(this.mapService.selectedPoint);
    this.info = this.mapService.selectedPoint.info;
  }
}
