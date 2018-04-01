import { Component, OnInit } from '@angular/core';
import {PointsService} from "../../services/points.service";
import {MapPointSuggestion} from './map-point-suggestion';
import {MapService} from "../map/map.service";

@Component({
  selector: 'app-suggestions-form',
  templateUrl: './suggestions-form.component.html',
  styleUrls: ['./suggestions-form.component.scss']
})
export class SuggestionsFormComponent implements OnInit {

  public categories: Array<any> = [];
  public suggestion: MapPointSuggestion = {title: '', category: '', description: ''};


  constructor(
    public pointsService: PointsService,
    private mapService: MapService,
  ) {}

  ngOnInit() {
    this.pointsService.categories.subscribe((categories) => {
      this.categories = categories;
    });
  }

  onSubmit() {
    if (!this.suggestion.title || !this.suggestion.category || !this.suggestion.description) {
      return;
    }

    this.pointsService.postSuggestion({
      feature: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            this.mapService.suggestedPoint.coords.lng,
            this.mapService.suggestedPoint.coords.lat
          ]
        },
        properties: {
          name: this.suggestion.title,
          description: this.suggestion.description,
          category: {
            name: this.categories.filter((cat) => cat._id === this.suggestion.category)[0].name,
            id: this.suggestion.category
          }
        }
      }
    });

    this.mapService.suggestions.emit(null);
  }
}
