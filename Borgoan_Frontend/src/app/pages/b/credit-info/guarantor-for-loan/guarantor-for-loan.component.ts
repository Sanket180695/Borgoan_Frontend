import { Component, OnInit, Input } from '@angular/core';
import { GuarantorForLoans } from '../Models/guarantor-for-loans';
import { NzNotificationService } from 'ng-zorro-antd';
import { ApiService } from 'src/app/Service/api.service';
import { Branchmaster } from 'src/app/Models/BasicForms/branchmaster';
import { Loantypes } from 'src/app/Models/BasicForms/loantypes';
import { DatePipe } from '@angular/common';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { conformToMask } from 'angular2-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'
@Component({
  selector: 'app-guarantor-for-loan',
  templateUrl: './guarantor-for-loan.component.html',
  styleUrls: ['./guarantor-for-loan.component.css']
})
export class GuarantorForLoansInfoComponent implements OnInit {
  browserLang = '';
  @Input() drawerClose2: Function;
  @Input() data2: GuarantorForLoans;
  @Input() loans2: any;
  @Input() CURRENT_STAGE_ID: number;
  @Input() extraApplicantInformation: Extraapplicantinfo;
  isSpinning = false
  logtext: string = "";
  userId = sessionStorage.getItem('userId');
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
      this.data2.DUE_DATE = undefined;
    }
  }

  close(): void {
    this.drawerClose2();

    this.logtext = 'CLOSED - GuarantorInfo form';
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
    this.data2.BANK_OR_INSTITUTE_NAME = " "
    this.data2.BRANCH_NAME = " "
    this.data2.ACCOUNT_NUMBER = " "

    this.data2.BRANCH_NAME = " "


    if (this.data2.LOAN_OUTSTANDING == undefined) {
      this.data2.LOAN_OUTSTANDING = 0
    }
    if (this.data2.SANCTIONED_AMOUNT == undefined) {
      this.data2.SANCTIONED_AMOUNT = 0
    }
    if (this.data2.LOAN_TYPE_ID == undefined) {
      this.data2.LOAN_TYPE_ID = 0
    }


    if (this.data2.BORROWER_NAME == undefined || this.data2.BORROWER_NAME.trim() == '') {
      this.data2.BORROWER_NAME = ""
    }

    if (isOk) {
      this.data2.LOAN_OVERDUE_AMOUNT = 0;



      this.data2.INSTALLMENT_AMOUNT = 0;

      if (this.data2.REMARK == undefined)
        this.data2.REMARK = " ";
        if (this.data2.DUE_DATE[0] >= 0 && this.data2.DUE_DATE[0] 
          <= 9 && this.data2.DUE_DATE[1] >= 0 
          && this.data2.DUE_DATE[1] <= 9 && 
          this.data2.DUE_DATE[3] >= 0 && this.data2.DUE_DATE[3] <= 9 && 
          this.data2.DUE_DATE[4] >= 0 && this.data2.DUE_DATE[4] <= 9 && 
          this.data2.DUE_DATE[9] >= 0 && this.data2.DUE_DATE[9] <= 9 && 
          this.data2.DUE_DATE[8] >= 0 && this.data2.DUE_DATE[8] <= 9 && 
          this.data2.DUE_DATE[7] >= 0 && this.data2.DUE_DATE[7] <= 9 && 
          this.data2.DUE_DATE[6] >= 0 && this.data2.DUE_DATE[6] <= 9) {

          var conformedPhoneNumber = conformToMask(
            this.data2.DUE_DATE,
            this.mask,
            { guide: false }
          )
          const str = conformedPhoneNumber.conformedValue.split('/');

          const year = Number(str[2]);
          const month = Number(str[1]) - 1;
          const dates = Number(str[0]);

          this.converted = new Date(year, month, dates)


          if (this.converted <= new Date()) {
            this.data2.DUE_DATE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
          } 
      }
      else {
        isOk = false;
        this.message.error('Invalid Due Date','')
      }
     

      this.isSpinning = true;
      if (this.data2.ID) {

        this.api.updateGuarantorForLoans(this.data2)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

              this.logtext = 'Update & Close - GuarantorInfo form - SUCCESS ' + JSON.stringify(this.data2) + " KEYWORD [U - GuarantorInfo ]";
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
                this.drawerClose2();
              this.isSpinning = false;
            }
            else {

              this.logtext = 'Update & Close - GuarantorInfo form - ERROR - ' + JSON.stringify(this.data2) + " KEYWORD [U - GuarantorInfo ]";
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
        this.api.createGuarantorForLoans(this.data2)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('common.message.success.addinfo2'), "");

              if (!addNew) {
                this.drawerClose2();

                this.logtext = 'Save & Close - GuarantorInfo form - SUCCESS - ' + JSON.stringify(this.data2) + " KEYWORD [C - GuarantorInfo ]";
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
                this.data2 = new GuarantorForLoans();
                this.setValues()
                this.logtext = 'Save & New - GuarantorInfo form - SUCCESS - ' + JSON.stringify(this.data2) + " KEYWORD [C - GuarantorInfo ]";
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
              this.logtext = 'Save & Close - GuarantorInfo form - ERROR - ' + JSON.stringify(this.data2) + " KEYWORD [C - GuarantorInfo ]";
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
    this.data2.BRANCH_NAME = '';
    this.data2.LOAN_OUTSTANDING = 0;
    this.data2.LOAN_OVERDUE_AMOUNT = 0;
    this.data2.BANK_OR_INSTITUTE_NAME = '';
    this.data2.BORROWER_NAME = '';
    this.data2.SANCTIONED_AMOUNT = 0;
    this.data2.LOAN_TYPE_ID = 0;
  }

}
