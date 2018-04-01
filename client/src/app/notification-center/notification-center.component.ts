import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { PointsService } from '../services/points.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-notification-center',
    templateUrl: './notification-center.component.html',
    styleUrls: ['./notification-center.component.scss']
})
export class NotificationCenterComponent implements OnInit {
    suggestions = [];

    constructor(
        private service: PointsService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.service.loadSuggestions().subscribe(res => {
            this.suggestions = res;
        });
    }

    manageSuggestion(suggestion) {
        this.router.navigate([ 'manage-suggestions', { suggestion: JSON.stringify(suggestion) } ], { skipLocationChange: true });
    }
}
