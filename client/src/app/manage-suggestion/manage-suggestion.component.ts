import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { MapService } from '../components/map/map.service';
import { PointsService } from '../services/points.service';
import { ActivatedRoute } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
    selector: 'app-manage-suggestion',
    templateUrl: './manage-suggestion.component.html',
    styleUrls: ['./manage-suggestion.component.scss']
})
export class ManageSuggestionsComponent implements OnInit {
    suggestion: Observable<any>;
    mobileQuery: MediaQueryList;
    sugg;
    state = 'pending';

    constructor(
        private pointsService: PointsService,
        private mapService: MapService,
        private route: ActivatedRoute,
        private media: MediaMatcher
    ) {
        this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    }

    ngOnInit() {
        this.suggestion = this.route.params.map(x => {
            return JSON.parse(x.suggestion);
        });

        this.suggestion.subscribe(sugg => {
            this.sugg = sugg;
            this.mapService.drawPoints([ sugg.point ]);
        });
    }

    approve() {
        this.pointsService.approveSuggestion(this.sugg);
        this.state = 'approved';
    }

    reject() {
        this.pointsService.rejectSuggestion(this.sugg);
        this.state = 'rejected';
    }
}
