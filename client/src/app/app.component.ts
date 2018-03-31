import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  lat = 51.678418;
  lng = 7.809007;

  constructor(
    private service: AppService
  ) {}

  ngOnInit() {
    this.service.getTest().subscribe();
  }
}
