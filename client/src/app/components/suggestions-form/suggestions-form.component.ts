import { Component, OnInit } from '@angular/core';
import {PointsService} from "../../services/points.service";

@Component({
  selector: 'app-suggestions-form',
  templateUrl: './suggestions-form.component.html',
  styleUrls: ['./suggestions-form.component.scss']
})
export class SuggestionsFormComponent implements OnInit {

  public id: number;

  constructor() {
    //PointsService.postSuggestion
  }

  ngOnInit() {
  }

}
