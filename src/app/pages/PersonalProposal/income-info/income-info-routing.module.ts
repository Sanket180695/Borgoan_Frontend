import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncomeInfoComponent } from './income-info.component';

const routes: Routes = [{ path: '', component: IncomeInfoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomeInfoRoutingModule { }
