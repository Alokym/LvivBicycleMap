import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  mobileQuery: MediaQueryList;

  constructor(
    private media: MediaMatcher,
  ) {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
  }

  ngOnInit() {
  }

}
