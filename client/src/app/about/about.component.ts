import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  message = {
    from: 'yo',
    subject: 'test',
    content: 'content'
  };
  constructor() { }

  ngOnInit() {
  }

}
