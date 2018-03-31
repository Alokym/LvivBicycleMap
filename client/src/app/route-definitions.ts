import {EventsComponent} from "./events/events.component";
import {NewsFeedComponent} from "./news-feed/news-feed.component";
import {AboutComponent} from "./about/about.component";
import {FeedbackComponent} from "./feedback/feedback.component";
import {Routes} from "@angular/router";
import {MapComponent} from "./map/map.component";

export const RouteDefinitions: Routes = [
  { path: '', component: MapComponent },
  { path: 'about', component: AboutComponent },
  { path: 'events', component: EventsComponent },
  { path: 'news-feed', component: NewsFeedComponent },
  { path: 'feedback', component: FeedbackComponent },

];
