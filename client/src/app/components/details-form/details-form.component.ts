import { Component, OnInit } from '@angular/core';
import {MapService} from '../map/map.service';

@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.scss']
})
export class DetailsFormComponent implements OnInit {
  title = '';
  label = '';

  constructor(
    private mapService: MapService,
  ) {}

  ngOnInit() {
    this.mapService.details.subscribe(this.updateDetails.bind(this));
    this.updateDetails();
  }

  updateDetails() {
    this.title = this.mapService.selectedPoint.title;
    this.label = this.mapService.selectedPoint.label;
  }
}
