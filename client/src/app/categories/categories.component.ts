import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MapService} from '../components/map/map.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  mobileQuery: MediaQueryList;
  isSuggestionSidebarShown: boolean;
  isDetailsSidebarShown: boolean;

  constructor(
    private media: MediaMatcher,
    private mapService: MapService,
  ) {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
  }

  ngOnInit() {
    this.mapService.suggestions.subscribe(this.showSuggestionSidebar.bind(this));
    this.mapService.details.subscribe(this.showDetailsSidebar.bind(this));
  }

  //TODO: implement hiding if sidebar
  showSuggestionSidebar(suggestion) {
    if (suggestion) {
      this.isSuggestionSidebarShown = true;
      this.isDetailsSidebarShown = false;
    } else {
      this.hideSidebar();
    }
  }

  showDetailsSidebar() {
    this.isSuggestionSidebarShown = false;
    this.isDetailsSidebarShown = true;
  }

  hideSidebar() {
    this.isSuggestionSidebarShown = false;
    this.isDetailsSidebarShown = false;
  }
}
