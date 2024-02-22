import { Component, OnInit, Input } from '@angular/core';
import { EarlierLoanInfo } from '../Models/earlier-loan-info';
import { NzNotificationService } from 'ng-zorro-antd';
import { ApiService } from 'src/app/Service/api.service';
import { Branchmaster } from 'src/app/Models/BasicForms/branchmaster';
import { DatePipe } from '@angular/common';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { conformToMask } from 'angular2-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'

@Component({
  selector: 'app-earlier-loan-info',
  templateUrl: './earlier-loan-info.component.html',
  styleUrls: ['./earlier-loan-info.component.css']
})
export class EarlierLoanInfoComponent implements OnInit {
  @Input() drawerClose3: Function;
  @Input() data3: EarlierLoanInfo;
  @Input() loans: any;
  browserLang = '';
  isSpinning = false
  @Input() CURRENT_STAGE_ID: number;
  @Input() extraApplicantInformation: Extraapplicantinfo;
  logtext: string = "";
  userId = sessionStorage.getItem('userId');
  loanData: any;
  branchData: any;
  pipe = new DatePipe('en-US');
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
    this.loanData = [];
    this.api.getAllBranches(0, 0, 'ID', "asc", "")
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          this.branchData = successCode['data'];
        }
      });
  }

  close(): void {
    this.drawerClose3();

    this.logtext = 'CLOSED - EarlyLoanInfo form';
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
  disabledDate = (current) => {
    return new Date(new Date().getTime() - 24 * 60 * 60 * 1000) < current;
  }

  disabledDate2 = (current) => {
    return new Date(this.data3.LOAN_TAKEN_DATE) > current;
  }

  save(addNew: boolean): void {

    // if ( ) {
    //   if ( ) {
    //     if ( ) {
    this.isSpinning = true;

    if (this.data3.LOAN_TAKEN_DATE[0] >= 0 && this.data3.LOAN_TAKEN_DATE[0] 
      <= 9 && this.data3.LOAN_TAKEN_DATE[1] >= 0 
      && this.data3.LOAN_TAKEN_DATE[1] <= 9 && 
      this.data3.LOAN_TAKEN_DATE[3] >= 0 && this.data3.LOAN_TAKEN_DATE[3] <= 9 && 
      this.data3.LOAN_TAKEN_DATE[4] >= 0 && this.data3.LOAN_TAKEN_DATE[4] <= 9 && 
      this.data3.LOAN_TAKEN_DATE[9] >= 0 && this.data3.LOAN_TAKEN_DATE[9] <= 9 && 
      this.data3.LOAN_TAKEN_DATE[8] >= 0 && this.data3.LOAN_TAKEN_DATE[8] <= 9 && 
      this.data3.LOAN_TAKEN_DATE[7] >= 0 && this.data3.LOAN_TAKEN_DATE[7] <= 9 && 
      this.data3.LOAN_TAKEN_DATE[6] >= 0 && this.data3.LOAN_TAKEN_DATE[6] <= 9) {

      var conformedPhoneNumber = conformToMask(
        this.data3.LOAN_TAKEN_DATE,
        this.mask,
        { guide: false }
      )
      const str = conformedPhoneNumber.conformedValue.split('/');

      const year = Number(str[2]);
      const month = Number(str[1]) - 1;
      const dates = Number(str[0]);

      this.converted = new Date(year, month, dates)


      if (this.converted <= new Date()) {
        this.data3.LOAN_TAKEN_DATE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
      } 
  }
  else {
  
    this.message.error('Invalid loan taken Date','')
  }
    if (this.data3.LOAN_AMOUNT == undefined)
      this.data3.LOAN_AMOUNT = 0

    if (this.data3.PURPOSE_OF_LOAN == undefined)
      this.data3.PURPOSE_OF_LOAN = "0"

    // if (this.data3.LOAN_OUTSTANDING == undefined)
    //   this.data3.LOAN_OUTSTANDING = 0;

    if (this.data3.YEAR == undefined)
      this.data3.YEAR = 0;

    this.data3.BRANCH_NAME = ' '
    this.data3.BANK_NAME = " "

    this.data3.ACCOUNT_CLOSE_DATE = null;

    if (this.data3.DUEDATE[0] >= 0 && this.data3.DUEDATE[0] 
      <= 9 && this.data3.DUEDATE[1] >= 0 
      && this.data3.DUEDATE[1] <= 9 && 
      this.data3.DUEDATE[3] >= 0 && this.data3.DUEDATE[3] <= 9 && 
      this.data3.DUEDATE[4] >= 0 && this.data3.DUEDATE[4] <= 9 && 
      this.data3.DUEDATE[9] >= 0 && this.data3.DUEDATE[9] <= 9 && 
      this.data3.DUEDATE[8] >= 0 && this.data3.DUEDATE[8] <= 9 && 
      this.data3.DUEDATE[7] >= 0 && this.data3.DUEDATE[7] <= 9 && 
      this.data3.DUEDATE[6] >= 0 && this.data3.DUEDATE[6] <= 9) {

      var conformedPhoneNumber = conformToMask(
        this.data3.DUEDATE,
        this.mask,
        { guide: false }
      )
      const str = conformedPhoneNumber.conformedValue.split('/');

      const year = Number(str[2]);
      const month = Number(str[1]) - 1;
      const dates = Number(str[0]);

      this.converted = new Date(year, month, dates)


      if (this.converted <= new Date()) {
        this.data3.DUEDATE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
      } 
  }
  else {
   
    this.message.error('Invalid Due Date','')
  }
 

  if (this.data3.REPAYMENT_DATE[0] >= 0 && this.data3.REPAYMENT_DATE[0] 
    <= 9 && this.data3.REPAYMENT_DATE[1] >= 0 
    && this.data3.REPAYMENT_DATE[1] <= 9 && 
    this.data3.REPAYMENT_DATE[3] >= 0 && this.data3.REPAYMENT_DATE[3] <= 9 && 
    this.data3.REPAYMENT_DATE[4] >= 0 && this.data3.REPAYMENT_DATE[4] <= 9 && 
    this.data3.REPAYMENT_DATE[9] >= 0 && this.data3.REPAYMENT_DATE[9] <= 9 && 
    this.data3.REPAYMENT_DATE[8] >= 0 && this.data3.REPAYMENT_DATE[8] <= 9 && 
    this.data3.REPAYMENT_DATE[7] >= 0 && this.data3.REPAYMENT_DATE[7] <= 9 && 
    this.data3.REPAYMENT_DATE[6] >= 0 && this.data3.REPAYMENT_DATE[6] <= 9) {

    var conformedPhoneNumber = conformToMask(
      this.data3.REPAYMENT_DATE,
      this.mask,
      { guide: false }
    )
    const str = conformedPhoneNumber.conformedValue.split('/');

    const year = Number(str[2]);
    const month = Number(str[1]) - 1;
    const dates = Number(str[0]);

    this.converted = new Date(year, month, dates)


    if (this.converted <= new Date()) {
      this.data3.REPAYMENT_DATE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
    } 
}
else {
  
  this.message.error('Invalid Repayment Date','')
}

    if (this.data3.REMARK == undefined)
      this.data3.REMARK = ''

    if (this.data3.ID) {

      this.api.updateEarlierLoanHistory(this.data3)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

            this.logtext = 'Update & Close - EarlyLoanInfo form - SUCCESS ' + JSON.stringify(this.data3) + " KEYWORD [U - EarlyLoanInfo ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });

            if (!addNew)
              this.drawerClose3();
            this.isSpinning = false;
          }
          else {

            this.logtext = 'Update & Close - EarlyLoanInfo form - ERROR - ' + JSON.stringify(this.data3) + " KEYWORD [U - EarlyLoanInfo ]";
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
      this.api.createEarlierLoanHistory(this.data3)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('common.message.success.addinfo2'), "");

            if (!addNew) {
              this.drawerClose3();

              this.logtext = 'Save & Close - EarlyLoanInfo form - SUCCESS - ' + JSON.stringify(this.data3) + " KEYWORD [C - EarlyLoanInfo ]";
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
              this.data3 = new EarlierLoanInfo();
              this.setValues()
              this.logtext = 'Save & New - EarlyLoanInfo form - SUCCESS - ' + JSON.stringify(this.data3) + " KEYWORD [C - EarlyLoanInfo ]";
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
            this.logtext = 'Save & Close - EarlyLoanInfo form - ERROR - ' + JSON.stringify(this.data3) + " KEYWORD [C - EarlyLoanInfo ]";
            this.api.addLog('A', this.logtext, this.userId)
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
    //     }
    //     else {
    //       this.message.error(this.api.translate.instant('gcreditinfo.earlier_loan_message1'), "");
    //     }
    //   } else {
    //     this.message.error(this.api.translate.instant('common.message.error.wronginfo'), "");
    //   }
    // }
    // else {
    //   this.message.error(this.api.translate.instant('common.message.error.emptyinfo'), "");
    // }
  }

  setValues() {
    this.data3.BRANCH_NAME = "";
    this.data3.LOAN_AMOUNT = 0;
    this.data3.PURPOSE_OF_LOAN = "";
    this.data3.BANK_NAME = "";
    this.data3.ACCOUNT_CLOSE_DATE = 0;
    this.data3.LOAN_TAKEN_DATE = 0;
  }

}
