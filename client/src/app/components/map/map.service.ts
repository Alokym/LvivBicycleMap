import { Injectable } from '@angular/core';

@Injectable()
export class MapService {
  public points = [];

  constructor() { }

  drawPoints(points) {
    this.points = points;
  }
}
