/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomRouteService } from './custom-route.service';

describe('Service: CustomRoute', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomRouteService]
    });
  });

  it('should ...', inject([CustomRouteService], (service: CustomRouteService) => {
    expect(service).toBeTruthy();
  }));
});