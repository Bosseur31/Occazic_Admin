import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySubCategoryComponent } from './sub-category.component';

describe('CategorySubCategoryComponent', () => {
  let component: CategorySubCategoryComponent;
  let fixture: ComponentFixture<CategorySubCategoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorySubCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
