import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimateSimpleEstimateComponent } from './simple-estimate.component';

describe('EstimateSimpleEstimateComponent', () => {
  let component: EstimateSimpleEstimateComponent;
  let fixture: ComponentFixture<EstimateSimpleEstimateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EstimateSimpleEstimateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimateSimpleEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
