import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class MapService {
  public points = [];
  public selectedPoint = {};
  public suggestions: EventEmitter<any> = new EventEmitter();
  public details: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.details.subscribe((point) => {
      this.selectedPoint = point;
    });
  }

  drawPoints(points) {
    this.points = points;
  }
}
