import {EventsComponent} from './events/events.component';
import {NewsFeedComponent} from './news-feed/news-feed.component';
import {AboutComponent} from './about/about.component';
import {FeedbackComponent} from './feedback/feedback.component';
import {CategoriesComponent} from './categories/categories.component';
import {CustomRouteComponent} from './custom-route/custom-route.component';
import {Routes} from '@angular/router';

export const RouteDefinitions: Routes = [
  { path: '', component: CategoriesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'events', component: EventsComponent },
  { path: 'news-feed', component: NewsFeedComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'custom-route', component: CustomRouteComponent}
];
