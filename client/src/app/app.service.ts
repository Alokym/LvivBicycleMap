import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppService {

  constructor(
    private http: HttpClient
  ) { }

  getTest(): Observable<any> {
    return this.http.get('./api').pipe();
  }
}
