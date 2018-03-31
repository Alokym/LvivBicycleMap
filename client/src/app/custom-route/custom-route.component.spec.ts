import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRouteComponent } from './custom-route.component';

describe('CustomRouteComponent', () => {
  let component: CustomRouteComponent;
  let fixture: ComponentFixture<CustomRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
