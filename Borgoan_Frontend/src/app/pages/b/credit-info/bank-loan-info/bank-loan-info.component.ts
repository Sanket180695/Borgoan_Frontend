import { Component, OnInit, Input } from '@angular/core';
import { BankLoan } from '../Models/bank-loan';
import { NzNotificationService } from 'ng-zorro-antd';
import { ApiService } from 'src/app/Service/api.service';
import { Branchmaster } from 'src/app/Models/BasicForms/branchmaster';
import { DatePipe } from '@angular/common';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { conformToMask } from 'angular2-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'
@Component({
  selector: 'app-bank-loan-info',
  templateUrl: './bank-loan-info.component.html',
  styleUrls: ['./bank-loan-info.component.css']
})
export class BankLoanInfoComponent implements OnInit {
  browserLang = '';
  @Input() drawerClose1: Function;
  @Input() data1: BankLoan;
  @Input() loans: any;
  isSpinning = false
  logtext: string = "";
  userId = sessionStorage.getItem('userId');
  branchData: any;
  pipe = new DatePipe('en-US');
  @Input() CURRENT_STAGE_ID: number;
  @Input() extraApplicantInformation: Extraapplicantinfo;
  converted : any;
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
 autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')
  constructor(
    private api: ApiService,
    private message: NzNotificationService,
    private datePipe:DatePipe
  ) {
  }

  ngOnInit() {
    this.browserLang = localStorage.getItem('locale');
    this.api.getAllBranches(0, 0, 'ID', "asc", "")
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          this.branchData = successCode['data'];
        }
      });
  }
  focusss(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data1.DUE_DATE = undefined;
    }
  }
  focusss2(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data1.SANCTION_DATE = undefined;
    }
  }
  close(): void {
    this.drawerClose1();

    this.logtext = 'CLOSED - BankLoan form';
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          //console.log(successCode);
        }
        else {
          //console.log(successCode);
        }
      });

  }

  save(addNew: boolean): void {
    var isOk = true;
    this.data1.BANK_OR_INSTITUTE_NAME = " "
    this.data1.BRANCH_NAME = " "
    this.data1.ACCOUNT_NUMBER = ' '

    if (this.data1.LOAN_TYPE_ID == undefined) {
      this.data1.LOAN_TYPE_ID = 0
    }
    if (this.data1.LOAN_TYPE == undefined) {
      this.data1.LOAN_TYPE = ''
    }

    if (this.data1.SANCTIONED_AMOUNT == undefined) {
      this.data1.SANCTIONED_AMOUNT = 0
    }


    if (isOk) {
      this.data1.SECURITY_OFFERED == ' '
      this.isSpinning = true;

      if (this.data1.LOAN_OUTSTANDING == undefined)
        this.data1.LOAN_OUTSTANDING = 0;
      if (this.data1.YEAR == undefined)
        this.data1.YEAR = 0;
      if (this.data1.LOAN_OVERDUE_AMOUNT == undefined)
        this.data1.LOAN_OVERDUE_AMOUNT = 0;

      if (this.data1.INSTALLMENT_AMOUNT == undefined)
        this.data1.INSTALLMENT_AMOUNT = 0;

      if (this.data1.REMARK == undefined)
        this.data1.REMARK = " ";

        if (this.data1.DUE_DATE[0] >= 0 && this.data1.DUE_DATE[0] 
          <= 9 && this.data1.DUE_DATE[1] >= 0 
          && this.data1.DUE_DATE[1] <= 9 && 
          this.data1.DUE_DATE[3] >= 0 && this.data1.DUE_DATE[3] <= 9 && 
          this.data1.DUE_DATE[4] >= 0 && this.data1.DUE_DATE[4] <= 9 && 
          this.data1.DUE_DATE[9] >= 0 && this.data1.DUE_DATE[9] <= 9 && 
          this.data1.DUE_DATE[8] >= 0 && this.data1.DUE_DATE[8] <= 9 && 
          this.data1.DUE_DATE[7] >= 0 && this.data1.DUE_DATE[7] <= 9 && 
          this.data1.DUE_DATE[6] >= 0 && this.data1.DUE_DATE[6] <= 9) {

          var conformedPhoneNumber = conformToMask(
            this.data1.DUE_DATE,
            this.mask,
            { guide: false }
          )
          const str = conformedPhoneNumber.conformedValue.split('/');

          const year = Number(str[2]);
          const month = Number(str[1]) - 1;
          const dates = Number(str[0]);

          this.converted = new Date(year, month, dates)


          if (this.converted <= new Date()) {
            this.data1.DUE_DATE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
          } 
      }
      else {
        isOk = false;
        this.message.error('Invalid Due Date','')
      }
     

        if (this.data1.REPAYMENT_DATE[0] >= 0 && this.data1.REPAYMENT_DATE[0] 
          <= 9 && this.data1.REPAYMENT_DATE[1] >= 0 
          && this.data1.REPAYMENT_DATE[1] <= 9 && 
          this.data1.REPAYMENT_DATE[3] >= 0 && this.data1.REPAYMENT_DATE[3] <= 9 && 
          this.data1.REPAYMENT_DATE[4] >= 0 && this.data1.REPAYMENT_DATE[4] <= 9 && 
          this.data1.REPAYMENT_DATE[9] >= 0 && this.data1.REPAYMENT_DATE[9] <= 9 && 
          this.data1.REPAYMENT_DATE[8] >= 0 && this.data1.REPAYMENT_DATE[8] <= 9 && 
          this.data1.REPAYMENT_DATE[7] >= 0 && this.data1.REPAYMENT_DATE[7] <= 9 && 
          this.data1.REPAYMENT_DATE[6] >= 0 && this.data1.REPAYMENT_DATE[6] <= 9) {

          var conformedPhoneNumber = conformToMask(
            this.data1.REPAYMENT_DATE,
            this.mask,
            { guide: false }
          )
          const str = conformedPhoneNumber.conformedValue.split('/');

          const year = Number(str[2]);
          const month = Number(str[1]) - 1;
          const dates = Number(str[0]);

          this.converted = new Date(year, month, dates)


          if (this.converted <= new Date()) {
            this.data1.REPAYMENT_DATE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
          } 
      }
      else {
        isOk = false;
        this.message.error('Invalid Repayment Date','')
      }
     
     

  
      if (this.data1.ID) {

        this.api.updateLoanTakenInformation(this.data1)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

              this.logtext = 'Update & Close - BankLoan form - SUCCESS ' + JSON.stringify(this.data1) + " KEYWORD [U - BankLoan ]";
              this.api.addLog('A', this.logtext, this.userId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                  }
                });

              if (!addNew)
                this.drawerClose1();
              this.isSpinning = false;
            }
            else {

              this.logtext = 'Update & Close - BankLoan form - ERROR - ' + JSON.stringify(this.data1) + " KEYWORD [U - BankLoan ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                  }
                });
              this.message.error(this.api.translate.instant('common.message.error.failed'), "");
              this.isSpinning = false;
            }
          });
      }
      else {
        this.api.createLoanTakenInformation(this.data1)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('common.message.success.addinfo2'), "");

              if (!addNew) {
                this.drawerClose1();

                this.logtext = 'Save & Close - BankLoan form - SUCCESS - ' + JSON.stringify(this.data1) + " KEYWORD [C - BankLoan ]";
                this.api.addLog('A', this.logtext, this.api.emailId)
                  .subscribe(successCode => {
                    if (successCode['code'] == "200") {
                      //console.log(successCode);
                    }
                    else {
                      //console.log(successCode);
                    }
                  });
              }
              else {
                this.data1 = new BankLoan();
                this.setValues()
                this.logtext = 'Save & New - BankLoan form - SUCCESS - ' + JSON.stringify(this.data1) + " KEYWORD [C - BankLoan ]";
                this.api.addLog('A', this.logtext, this.api.emailId)
                  .subscribe(successCode => {
                    if (successCode['code'] == "200") {
                      //console.log(successCode);
                    }
                    else {
                      //console.log(successCode);
                    }
                  });
              }
              this.isSpinning = false;
            }
            else {
              this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
              this.isSpinning = false;
              this.logtext = 'Save & Close - BankLoan form - ERROR - ' + JSON.stringify(this.data1) + " KEYWORD [C - BankLoan ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                  }
                });
            }
          });
      }
    }

  }

  setValues() {
    this.data1.BRANCH_NAME = "";
    this.data1.INSTALLMENT_AMOUNT = 0;
    this.data1.SANCTIONED_AMOUNT = 0;
    this.data1.BANK_OR_INSTITUTE_NAME = "";
    this.data1.DUE_DATE = null;
    this.data1.REMARK = null;
    this.data1.SANCTIONED_AMOUNT = null;
    this.data1.SECURITY_OFFERED = "";
  }

}
