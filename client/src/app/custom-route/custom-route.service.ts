import { Injectable } from '@angular/core';

@Injectable()
export class CustomRouteService {

  public points = [
    {value: ''},
    {value: ''}
  ];

  constructor() { }

  addPoint(point) {
    this.points.push(point);
  }

  removePoint(point) {
    this.points.slice(this.points.indexOf(point), 1);
  }
}
