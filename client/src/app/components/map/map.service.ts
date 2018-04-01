import { Injectable, EventEmitter } from '@angular/core';
import {MapPoint, SelectedPoint} from './map-point';

@Injectable()
export class MapService {
  public points = [];
  public selectedPoint: MapPoint;
  public suggestedPoint: SelectedPoint;
  public suggestions: EventEmitter<any> = new EventEmitter();
  public details: EventEmitter<any> = new EventEmitter();

  public onDraw = new EventEmitter();
  public onDrawPath = new EventEmitter();

  constructor() {
    this.details.subscribe((point) => {
      this.selectedPoint = point;
    });

    this.suggestions.subscribe((point) => {
        this.suggestedPoint = point ? point.coords: null
    });
  }

  drawPoints(points) {
    this.points = points;
    this.onDraw.next(points);
  }

  drawPaths(points) {
    this.onDrawPath.emit(points);
  }
}
