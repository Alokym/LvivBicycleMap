import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class PointsService {
  public suggestions;
  public categories;

  constructor(
    private http: HttpClient
  ) { }

  loadData() {
    this.categories = this.http.get('/api/categories');
  }

  getPoints(categories, position): Observable<any> {
    const categoriesCsv = categories.join(',');
    return this.http.get(`/api/points`, {
      params: {
        categories: categoriesCsv,
        position,
      }
    });
  }

  loadSuggestions() {
    this.suggestions = this.http.get<Array<any>>('/api/points/suggestions?status=pending').map(x => x.map(y => ({
      id: y._id,
      name: y.feature.properties.name,
      description: y.feature.properties.description,
      category: y.feature.properties.category.name,
      lng: y.feature.geometry.coordinates[ 0 ],
      lat: y.feature.geometry.coordinates[ 1 ],
    })));
  }

  postSuggestion(place) {
    console.log(place);
    return this.http.post('/api/points/suggestions', place).subscribe();
  }

  approveSuggestion({ id }) {
    this.http.put(`/api/points/suggestions/${id}/approval`, {}).subscribe();
    this.loadSuggestions();
  }

  rejectSuggestion({ id }) {
    return this.http.put(`/api/points/suggestions/${id}/rejection`, {}).subscribe();
    this.loadSuggestions();
  }

  reportError({ coords, description, suggestedCoords }) {
    return this.http.post(`/api/points/errors/`, { coords, description, suggestedCoords });
  }

  getReportedErrors() {
    return this.http.get(`/api/points/errors/`);
  }
}
