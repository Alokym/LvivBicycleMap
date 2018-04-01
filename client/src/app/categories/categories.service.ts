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
            const pin = this._getPinInfo(info.category.id);
            return {
              lat: geo[1],
              lng: geo[0],
              label: pin.label,
              title: info.description,
              icon: pin.icon
            };
          }));
        });
    } else {
      this.mapService.drawPoints([]);
    }
  }

  private _getTitle(value) {
    value = value.indexOf('|') !== -1 ? value.split(' | ')[1] || value : value;
    value = value.indexOf('-') !== -1 ? value.split(' - ')[1] || value : value;
    return value;
  }
  // case sharing = "5abfa2fcf6c9d8220a99a9f9"
  // case repair = "5abfa2fcf6c9d8220a99a9fa"
  // case rental = "5abfa2fcf6c9d8220a99a9f8" // and store
  // case parking = "5abfa2fcf6c9d8220a99a9fe"
  // case path = "5abfa2fcf6c9d8220a99a9fd"
  // case stops = "5abfa2fcf6c9d8220a99a9fb"
  // case interests = "5abfa2fcf6c9d8220a99a9fc"

  private _getPinInfo(id) {
    return ({
      '5abfa2fcf6c9d8220a99a9fe': {
        icon: {url: './assets/icons/map-pin-parking.svg', size: 40}, label: 'P'
      },
      '5abfa2fcf6c9d8220a99a9f8': {
        icon: {url: './assets/icons/map-pin-rental.svg', size: 40}, label: 'R'
      },
      '5abfa2fcf6c9d8220a99a9fb': {
        icon: {url: './assets/icons/map-pin-stop.svg', size: 40}, label: 'S'
      },
      '5abfa2fcf6c9d8220a99a9fa': {
        icon: {url: './assets/icons/map-pin-repair.svg', size: 40}, label: 'S'
      },
      '5abfa2fcf6c9d8220a99a9f9': {
        icon: {url: './assets/icons/map-pin-share.svg', size: 40}, label: 'B'
      },
      '5abfa2fcf6c9d8220a99a9fc': {
        icon: {url: './assets/icons/map-pin-info.svg', size: 40}, label: 'I'
      },
    })[id] || {url: './assets/icons/map-pin.svg', size: 30};
  }
}
