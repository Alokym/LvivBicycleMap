import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FeedbackService {
  constructor(
    private http: HttpClient
  ) { }

  getComments() {
    return this.http.get('/api/comments');
  }

  postComment(comment) {
    return this.http.post('/api/comments', comment);
  }

  archiveComment({ id }) {
    return this.http.put(`/api/comments/${id}`, { archived: true });
  }
}
