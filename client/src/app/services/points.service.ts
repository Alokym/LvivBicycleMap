import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PointsService {
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

  getSuggestions() {
    return this.http.get('/api/points/suggestions');
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
