import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { CustomRouteService } from '../../custom-route/custom-route.service';

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

  public categories = [
    {name: 'Cat 1', enabled: false},
    {name: 'Cat 2', enabled: false},
    {name: 'Cat 3', enabled: false},
    {name: 'Cat 4', enabled: false},
  ];

  public points = [];

  constructor(
    private customRouteService: CustomRouteService
  ) { }

  ngOnInit() {
    this.points = this.customRouteService.points;
  }

  addPoint() {
    this.customRouteService.addPoint({});
  }

  search() {
    console.log(this.points);
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
