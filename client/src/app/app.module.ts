import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AgmCoreModule } from '@agm/core';

import { AppMaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { AppService } from './app.service';


import { AboutComponent } from './about/about.component';
import { MapComponent } from './map/map.component';
import { EventsComponent } from './events/events.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { FeedbackComponent } from './feedback/feedback.component';

const appRoutes: Routes = [
  { path: '', component: MapComponent },
  { path: 'about', component: AboutComponent },
  { path: 'events', component: EventsComponent },
  { path: 'news-feed', component: NewsFeedComponent },
  { path: 'feedback', component: FeedbackComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    MapComponent,
    EventsComponent,
    NewsFeedComponent,
    FeedbackComponent,
  ],
  entryComponents:[
    MapComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBYGHYrVY3V7EVbHd4VZcDqMp6Tm5XfZPw'
    }),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
