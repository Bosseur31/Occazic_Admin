import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryViewCategoryComponent } from './view-category/view-category.component';
import { CategoryCreateCategoryComponent } from './create-category/create-category.component';
import { CategorySubCategoryComponent } from './sub-category/sub-category.component';

const routes: Routes = [{ path: 'view-category', component: CategoryViewCategoryComponent },
{ path: 'create-category', component: CategoryCreateCategoryComponent },
{ path: 'sub-category', component: CategorySubCategoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
