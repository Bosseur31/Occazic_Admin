import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryViewCategoryComponent } from './view-category/view-category.component';
import { CategoryCreateCategoryComponent } from './create-category/create-category.component';
import {MaterialFileInputModule} from "ngx-material-file-input";

const COMPONENTS: any[] = [CategoryViewCategoryComponent, CategoryCreateCategoryComponent];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [
    SharedModule,
    CategoryRoutingModule,
    MaterialFileInputModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ]
})
export class CategoryModule { }
