import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Feedback } from '../feedback/feedback';

@Injectable()
export class FeedbackService {
  constructor(
    private http: HttpClient
  ) { }

  getComments() {
    return this.http.get('/api/feedback');
  }

  postComment(feedback: Feedback) {
    return this.http.post('/api/feedback', feedback);
  }

  archiveComment({ id }) {
    return this.http.put(`/api/feedback/${id}`, { archived: true });
  }
}
