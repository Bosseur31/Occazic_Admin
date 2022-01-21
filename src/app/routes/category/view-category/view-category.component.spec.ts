import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryViewCategoryComponent } from './view-category.component';

describe('CategoryViewCategoryComponent', () => {
  let component: CategoryViewCategoryComponent;
  let fixture: ComponentFixture<CategoryViewCategoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryViewCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryViewCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
