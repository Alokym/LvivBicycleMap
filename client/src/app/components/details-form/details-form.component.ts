import { Component, OnInit } from '@angular/core';
import {MapService} from '../map/map.service';

@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.scss']
})
export class DetailsFormComponent implements OnInit {
  name = '';
  description = '';

  constructor(
    private mapService: MapService,
  ) {}

  ngOnInit() {
    this.mapService.details.subscribe(this.updateDetails.bind(this));
    this.updateDetails();
  }

  updateDetails() {
    const details = JSON.parse(this.mapService.selectedPoint.details || '');
    this.name = details.name;
    this.description = details.desc;
  }
}
