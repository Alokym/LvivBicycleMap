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

    this.pointsService.getCategories().subscribe((res: any) => {
      this.categories = res.map(item => ({_id: item._id, name: item.name.split('|')[0]}));
    });
  }

  selectCategory(cat) {
    cat.enabled = cat.enabled !== true;

    const categories = this.categories.filter(category => category.enabled);

    this.categoriesService.drawCategoris(categories);
  }

  addPoint() {
    this.customRouteService.addPoint({});
  }

  buildRoute() {
    this.mapService.drawRoute({
      lat: 49.7996413,
      lng: 24.0158005
    }, {
      lat: 49.7956371,
      lng: 24.0612462
    });
  }

  slide(name) {
    this.activeSide = name;
    this.menuState = 'right';
  }

  slideBack() {
    this.activeSide = '';
    this.menuState = 'left';
  }
}
