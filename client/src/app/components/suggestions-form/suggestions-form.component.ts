import { Component, OnInit } from '@angular/core';
import {PointsService} from "../../services/points.service";
import {MapPointSuggestion} from './map-point-suggestion';

@Component({
  selector: 'app-suggestions-form',
  templateUrl: './suggestions-form.component.html',
  styleUrls: ['./suggestions-form.component.scss']
})
export class SuggestionsFormComponent implements OnInit {

  public categories: Array<string> = ['asdasd', 'rwerwer'];
  public suggestion: MapPointSuggestion = {title: '', category: '', description: ''};

  constructor() {

  }

  ngOnInit() {

  }

  onSubmit() {
    if (!this.suggestion.title || !this.suggestion.category || !this.suggestion.description) {
      return;
    }


  }
}
