import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit {
  newsItems = [
    {author: {}},
    {},
    {},
    {author: {}}
  ];

  constructor() { }

  ngOnInit() {
  }

}
