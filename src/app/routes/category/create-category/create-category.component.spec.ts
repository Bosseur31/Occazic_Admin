import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCreateCategoryComponent } from './create-category.component';

describe('CategoryEditCategoryComponent', () => {
  let component: CategoryCreateCategoryComponent;
  let fixture: ComponentFixture<CategoryCreateCategoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryCreateCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryCreateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
