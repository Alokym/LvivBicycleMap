import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { PointsService } from '../services/points.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-notification-center',
    templateUrl: './notification-center.component.html',
})
export class NotificationCenterComponent implements OnInit {
    suggestions: Observable<any>;
    anySuggestions: Observable<boolean>;

    constructor(
        private service: PointsService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.service.loadSuggestions();
        this.suggestions = this.service.suggestions;
        this.anySuggestions = this.service.suggestions.map(x => x.length > 0);
    }

    manageSuggestion(suggestion) {
        this.router.navigate([ 'manage-suggestions', { suggestion: JSON.stringify(suggestion) } ], { skipLocationChange: true });
    }
}
