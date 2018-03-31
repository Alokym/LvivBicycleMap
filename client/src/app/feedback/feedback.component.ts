import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';

import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  providers: [ FeedbackService ]
})
export class FeedbackComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  fullName = new FormControl('', [Validators.required]);
  comment = new FormControl('', [Validators.required]);
  form = new FormGroup({
    fullName: this.fullName,
    email: this.email,
    comment: this.comment
  });
  feedbackService: FeedbackService;

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  getCommentErrorMessage() {
    return this.comment.hasError('required') ? 'You must enter a value' :
        '';
  }
  getFullNameErrorMessage() {
    return this.fullName.hasError('required') ? 'You must enter a value' :
        '';
  }

  onSubmit() {

    if (this.form.valid) {
      this.feedbackService.postComment({
        fullName: this.fullName.value,
        email: this.email.value,
        comment: this.comment.value
      })
      .subscribe(console.log);
    } else {
      console.error('invalid form');
    }
  }
  constructor(feedbackService: FeedbackService) {
    this.feedbackService = feedbackService;
  }

  ngOnInit() {
  }

}
