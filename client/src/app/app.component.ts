import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from './services/places.service';
import { MapService } from './components/map/map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    private service: PlacesService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private mapService: MapService
  ) {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {
    // this.service.getTest().subscribe();

    // example of drawing
    this.mapService.drawPoints([
      {lat: 49.8392533, lng: 24.0228793, info: 'Some description'}
    ]);
  }
}
