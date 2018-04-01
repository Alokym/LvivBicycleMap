import { Injectable, EventEmitter } from '@angular/core';
import {MapPoint} from './map-point';

@Injectable()
export class MapService {
  public points = [];
  public selectedPoint: MapPoint;
  public suggestedPoint: MapPoint;
  public suggestions: EventEmitter<any> = new EventEmitter();
  public details: EventEmitter<any> = new EventEmitter();

  public onDraw = new EventEmitter();

  constructor() {
    this.details.subscribe((point) => {
      this.selectedPoint = point;
    });

    this.suggestions.subscribe((point) => {
      this.suggestedPoint = point;
    })
  }

  drawPoints(points) {
    this.points = points;
    this.onDraw.next(points);
  }
}
