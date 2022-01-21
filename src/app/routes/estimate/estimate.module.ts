import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { EstimateRoutingModule } from './estimate-routing.module';
import { EstimateSimpleEstimateComponent } from './simple-estimate/simple-estimate.component';

const COMPONENTS: any[] = [EstimateSimpleEstimateComponent];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [
    SharedModule,
    EstimateRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ]
})
export class EstimateModule { }
