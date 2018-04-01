import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { MapService } from '../components/map/map.service';
import { PointsService } from '../services/points.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-manage-suggestion',
    templateUrl: './manage-suggestion.component.html',
})
export class ManageSuggestionsComponent implements OnInit {
    suggestion: Observable<any>;

    constructor(
        private pointsService: PointsService,
        private mapService: MapService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.suggestion = this.route.params.map(x => {
            return JSON.parse(x.suggestion);
        });

        this.suggestion.subscribe(sugg => {
            this.mapService.drawPoints([ sugg.point ]);
        });
    }
}
