import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateUserComponent } from './create-user.component';

describe('UserCreateUserComponent', () => {
  let component: UserCreateUserComponent;
  let fixture: ComponentFixture<UserCreateUserComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCreateUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
