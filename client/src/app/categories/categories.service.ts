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
              label: info.description,
              title: info.name
            };
          }));
        });
    } else {
      this.mapService.drawPoints([]);
    }
  }
}