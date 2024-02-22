import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncomeInfoRoutingModule } from './income-info-routing.module';
// import { IncomeInfoComponent } from './income-info.component';

import { NzLayoutModule, NzMenuModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { HouserentinfoComponent } from '../houserentinfo/houserentinfo.component';


@NgModule({
  declarations: [
    
    // IncomeInfoComponent
    
  ],
  imports: [
    CommonModule,
    IncomeInfoRoutingModule,
    
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class IncomeInfoModule { }
