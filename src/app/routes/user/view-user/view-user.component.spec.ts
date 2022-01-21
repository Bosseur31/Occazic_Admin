import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewUserComponent } from './view-user.component';

describe('UserViewUserComponent', () => {
  let component: UserViewUserComponent;
  let fixture: ComponentFixture<UserViewUserComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserViewUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
