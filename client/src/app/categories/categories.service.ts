import { Injectable } from '@angular/core';
import { PointsService } from '../services/points.service';
import { MapService } from '../components/map/map.service';

@Injectable()
export class CategoriesService {

  constructor(
    private pointsService: PointsService,
    private mapService: MapService
  ) { }

  drawCategoris(categories) {
    if (categories.length) {
      this.pointsService.getPoints(categories.map((category) => category._id), {})
        .subscribe(points => {
          this.mapService.drawPoints(points.map((point) => {
            const geo = point.feature.geometry.coordinates;
            const info = point.feature.properties;
            return {
              lat: geo[1],
              lng: geo[0],
              label: this._getTitle(info.name),
              title: info.description,
              icon: this._getIcon(info.category.id)
            };
          }));
        });
    } else {
      this.mapService.drawPoints([]);
    }
  }

  private _getTitle(value) {
    return value.split(' | ')[0].split(' - ')[0];
  }

  private _getIcon(id) {
    return ({
      '5abfa2fcf6c9d8220a99a9fb': './assets/icons/park.svg',
      '5abfa2fcf6c9d8220a99a9fe': './assets/icons/parking.svg'
    })[id];
  }
}