import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  fullName = new FormControl('', [Validators.required]);
  comment = new FormControl('', [Validators.required]);

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

  constructor() { }

  ngOnInit() {
  }

}
