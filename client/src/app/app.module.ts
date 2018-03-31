import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { RouteDefinitions } from './route-definitions';

import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

import { AppMaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { PointsService } from './services/points.service';

import { MapComponent } from './components/map/map.component';
import { NavListComponent } from './components/nav-list/nav-list.component';

import { AboutComponent } from './about/about.component';
import { NotificationCenterComponent } from './notification-center/notification-center.component';
import { EventsComponent } from './events/events.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { MapService } from './components/map/map.service';
import { CategoriesComponent } from './categories/categories.component';
import { CustomRouteComponent } from './custom-route/custom-route.component';
import { CustomRouteService } from './custom-route/custom-route.service';

@NgModule({
  declarations: [
    MapComponent,
    NavListComponent,

    AppComponent,
    AboutComponent,
    EventsComponent,
    NewsFeedComponent,
    FeedbackComponent,
    NotificationCenterComponent,
    CategoriesComponent,
    CustomRouteComponent
  ],
  entryComponents: [

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBYGHYrVY3V7EVbHd4VZcDqMp6Tm5XfZPw'
    }),
    AgmSnazzyInfoWindowModule,
    RouterModule.forRoot(
      RouteDefinitions,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    MapService,
    PointsService,
    CustomRouteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
