import { PointsService } from './../../services/points.service';
import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { CustomRouteService } from '../../custom-route/custom-route.service';
import { MapService } from '../map/map.service';
import { CategoriesService } from '../../categories/categories.service';
import { MapRoute } from '../map/map.route.interface';

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss'],
  animations: [
    trigger('menuState', [
      state('left', style({
        left: '0'
      })),
      state('right', style({
        left: '-100%'
      })),
      transition('left => right', animate('300ms ease-in')),
      transition('right => left', animate('300ms ease-out'))
    ])
  ]
})
export class NavListComponent implements OnInit {
  public menuState = 'left';
  public activeSide = '';
  public route: MapRoute;
  public categories = [];

  public points = [];

  constructor(
    private customRouteService: CustomRouteService,
    private categoriesService: CategoriesService,
    private pointsService: PointsService,
    private mapService: MapService
  ) { }

  ngOnInit() {
    this.points = this.customRouteService.points;
    this.pointsService.loadData();
    this.route = this.mapService.route;

    this.pointsService.categories.subscribe((res: any) => {
      this.categories = res.map(item => {
        const icon = this._getCatIcon(item._id);
        return {
          _id: item._id,
          name: item.name.split('|')[0],
          beName: icon.beName,
          icon: icon.name
        };
      });
    });
  }

  selectCategory(cat) {
    cat.enabled = cat.enabled !== true;

    const categories = this.categories.filter(category => category.enabled);

    this.categoriesService.drawCategories(categories);
  }

  addPoint() {
    this.customRouteService.addPoint({ value: {} });
  }

  search() {
    const allFilled = () => this.points.every(point => !!point.value.location);
    this.mapService.clearRoute();

    if (allFilled()) {
      console.log('render route');
      this.mapService.drawRoute(this.points[0].value.location, this.points[1].value.location);
    } else {
      console.log('start geocoder');
      const geocoder = new google.maps.Geocoder;
      const modified = this.points.filter(point => point.value && point.value.name && !point.value.location);
      console.log(modified);

      const geocodePromise = (point) => {
        return new Promise((resolve, reject) => {
          geocoder.geocode({ address: point.value.name }, function (results, status) {
            if (results && results.length) {
              resolve({ point, result: results[0] });
            } else {
              reject(status);
            }
          });
        });
      };
      Promise.all(modified.map(point => geocodePromise(point)))
        .then((data) => data.forEach(result =>
          Object.assign(result.point,
            {
              value: {
                name: result.result.formatted_address,
                location: {
                  lat: result.result.geometry.location.lat(),
                  lng: result.result.geometry.location.lng()
                }
              }
            })))
        .then(() => {
          if (allFilled()) {
            this.mapService.drawRoute(this.points[0].value.location, this.points[1].value.location);
          } else {
            console.error('please enter values');
          }
        })
        .catch(e => console.error(e));
    }
  }

  slide(name) {
    this.activeSide = name;
    this.menuState = 'right';
  }

  slideBack() {
    this.activeSide = '';
    this.menuState = 'left';
  }

  private _getCatIcon(id) {
    // case sharing = "5abfa2fcf6c9d8220a99a9f9"
    // case repair = "5abfa2fcf6c9d8220a99a9fa"
    // case rental = "5abfa2fcf6c9d8220a99a9f8" // and store
    // case parking = "5abfa2fcf6c9d8220a99a9fe"
    // case path = "5abfa2fcf6c9d8220a99a9fd"
    // case stops = "5abfa2fcf6c9d8220a99a9fb"
    // case interests = "5abfa2fcf6c9d8220a99a9fc"
    return ({
      '5abfa2fcf6c9d8220a99a9f9': { name: 'directions_bike', beName: 'sharing' },
      '5abfa2fcf6c9d8220a99a9fa': { name: 'build', beName: 'repair' },
      '5abfa2fcf6c9d8220a99a9f8': { name: 'store_mall_directory', beName: 'rental' },
      '5abfa2fcf6c9d8220a99a9fe': { name: 'local_parking', beName: 'parking' },
      '5abfa2fcf6c9d8220a99a9fd': { name: 'swap_calls', beName: 'path' },
      '5abfa2fcf6c9d8220a99a9fb': { name: 'mood', beName: 'stops' },
      '5abfa2fcf6c9d8220a99a9fc': { name: 'linked_camera', beName: 'interests' },
    })[id];
  }
}
