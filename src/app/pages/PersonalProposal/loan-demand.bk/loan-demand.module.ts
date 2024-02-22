import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanDemandRoutingModule } from './loan-demand-routing.module';
import { LoanDemandComponent } from './loan-demand.component';
// import { DemoNgZorroAntdModule } from '../demongzorroantdmodule/demongzorroantdmodule.module';
// import { IconsProviderModule } from '../icons-provider.module';
import { NzLayoutModule, NzMenuModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [LoanDemandComponent],
  imports: [
    CommonModule,
    LoanDemandRoutingModule,
    // DemoNgZorroAntdModule,
    // IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class LoanDemandModule { }
