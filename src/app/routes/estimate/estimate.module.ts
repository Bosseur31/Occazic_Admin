import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { EstimateRoutingModule } from './estimate-routing.module';
import { EstimateSimpleEstimateComponent } from './simple-estimate/simple-estimate.component';
import {DialogSeeDataComponent} from "./simple-estimate/dialog-data-estimate.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatTableDataSource} from '@angular/material/table';

const COMPONENTS: any[] = [EstimateSimpleEstimateComponent];
const COMPONENTS_DYNAMIC: any[] = [DialogSeeDataComponent];

@NgModule({
  imports: [
    SharedModule,
    EstimateRoutingModule,
    MatPaginatorModule,
    MatSortModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ]
})
export class EstimateModule { }
