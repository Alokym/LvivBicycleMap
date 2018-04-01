import { Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { AboutComponent } from './about/about.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CategoriesComponent } from './categories/categories.component';
import { CustomRouteComponent } from './custom-route/custom-route.component';
import { ManageSuggestionsComponent } from './manage-suggestion/manage-suggestion.component';

export const RouteDefinitions: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'events', component: EventsComponent },
  { path: 'news-feed', component: NewsFeedComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'custom-route', component: CustomRouteComponent },
  { path: 'manage-suggestions', component: ManageSuggestionsComponent },
  { path: '', redirectTo: 'categories', pathMatch: 'full'},
];
