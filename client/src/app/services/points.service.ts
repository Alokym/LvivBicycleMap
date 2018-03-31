import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class PointsService {
  public suggestions;

  constructor(
    private http: HttpClient
  ) { }

  getCategories() {
    return this.http.get('/api/categories');
  }

  getPoints(categories, position): Observable<any> {
    const categoriesCsv = categories.join(',');
    return this.http.get(`/api/points`, {
      params: {
        categories: categoriesCsv,
        position
      }
    });
  }

  loadSuggestions() {
    // return this.http.get('/api/points/suggestions');
    this.suggestions = of([
      {
        category: 'parking',
        description: 'volodymyra velykogo str',
      }
    ]);
  }

  postSuggestion(place) {
    return this.http.post('/api/points/suggestions', place);
  }

  approveSuggestion({ id }) {
    return this.http.put(`/api/points/suggestions/${id}/approval`, {});
  }

  rejectSuggestion({ id }) {
    return this.http.put(`/api/points/suggestions/${id}/rejection`, {});
  }

  reportError({ coords, description, suggestedCoords }) {
    return this.http.post(`/api/points/errors/`, { coords, description, suggestedCoords });
  }

  getReportedErrors() {
    return this.http.get(`/api/points/errors/`);
  }
}
