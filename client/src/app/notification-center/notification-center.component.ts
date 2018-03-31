import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { PointsService } from '../services/points.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-notification-center',
    templateUrl: './notification-center.component.html',
})
export class NotificationCenterComponent implements OnInit {
    suggestions: Observable<any>;

    constructor(
        private service: PointsService
    ) { }

    ngOnInit() {
        this.suggestions = this.service.getSuggestions();
    }
}
