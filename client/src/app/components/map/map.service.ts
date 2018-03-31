import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class MapService {
  public points = [];

  public onDraw = new EventEmitter();

  constructor() { }

  drawPoints(points) {
    this.points = points;
    this.onDraw.next(points);
  }
}
