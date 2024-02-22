import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanDemandComponent } from './loan-demand.component';

const routes: Routes = [{ path: '', component: LoanDemandComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanDemandRoutingModule { }
