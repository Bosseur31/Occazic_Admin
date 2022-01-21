import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstimateSimpleEstimateComponent } from './simple-estimate/simple-estimate.component';

const routes: Routes = [{ path: 'simple-estimate', component: EstimateSimpleEstimateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstimateRoutingModule { }
