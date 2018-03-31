import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PlacesService {
  constructor(
    private http: HttpClient
  ) { }

  getCategories() {
    return this.http.get('/api/categories');
  }

  getPlaces(categories, position): Observable<any> {
    const categoriesCsv = categories.join(',');
    return this.http.get(`/api/points`, {
      params: {
        categories: categoriesCsv,
        position
      }
    });
  }

  getSuggestions() {
    return this.http.get('/api/places/suggestions');
  }

  postSuggestion(place) {
    return this.http.post('/api/places/suggestions', place);
  }

  approveSuggestion({ id }) {
    return this.http.put(`/api/places/suggestions/${id}/approval`, {});
  }

  rejectSuggestion({ id }) {
    return this.http.put(`/api/places/suggestions/${id}/rejection`, {});
  }

  reportError({ coords, description, suggestedCoords }) {
    return this.http.post(`/api/places/errors/`, { coords, description, suggestedCoords });
  }

  getReportedErrors() {
    return this.http.get(`/api/places/errors/`);
  }
}
