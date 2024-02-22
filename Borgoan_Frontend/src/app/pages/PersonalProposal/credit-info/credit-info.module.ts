import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditInfoRoutingModule } from './credit-info-routing.module';
import { CreditInfoComponent } from './credit-info.component';
// import { DemoNgZorroAntdModule } from '../demongzorroantdmodule/demongzorroantdmodule.module';
// import { IconsProviderModule } from '../icons-provider.module';
import { NzLayoutModule, NzMenuModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BankLoanInfoComponent } from './bank-loan-info/bank-loan-info.component';
// import { GuarantorForLoansInfoComponent } from './guarantor-for-loan/guarantor-for-loan.component';
import { EarlierLoanInfoComponent } from './earlier-loan-info/earlier-loan-info.component';
import { DepositeInBankComponent } from './deposite-in-bank/deposite-in-bank.component';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    CreditInfoRoutingModule,
    // DemoNgZorroAntdModule,
    // IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class CreditInfoModule { }
