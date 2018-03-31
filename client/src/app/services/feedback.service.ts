import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Feedback } from './feedback';

@Injectable()
export class FeedbackService {
  constructor(
    private http: HttpClient
  ) { }

  getComments() {
    return this.http.get('/api/comments');
  }

  postComment(comment: Feedback) {
    return this.http.post('/api/comments', comment);
  }

  archiveComment({ id }) {
    return this.http.put(`/api/comments/${id}`, { archived: true });
  }
}
