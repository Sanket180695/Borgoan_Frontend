import { Component, OnInit, Input } from '@angular/core';
import { DepositeInBank } from '../Models/deposite-in-bank'
import { NzNotificationService } from 'ng-zorro-antd';
import { ApiService } from 'src/app/Service/api.service';
import { Branchmaster } from 'src/app/Models/BasicForms/branchmaster';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';

@Component({
  selector: 'app-deposite-in-bank',
  templateUrl: './deposite-in-bank.component.html',
  styleUrls: ['./deposite-in-bank.component.css']
})
export class DepositeInBankComponent implements OnInit {
  browserLang = '';
  @Input() drawerClose4: Function;
  @Input() data4: DepositeInBank;
  @Input() CURRENT_STAGE_ID: number;  
  @Input() extraApplicantInformation: Extraapplicantinfo;
  isSpinning = false
  logtext: string = "";
  userId = sessionStorage.getItem('userId');
  depositeTypeData: any;
  branchData: any;
  constructor(
    private api: ApiService,
    private message: NzNotificationService,
  ) {
  }

  ngOnInit() {
    this.browserLang = localStorage.getItem('locale');
    this.depositeTypeData = [
      { 'ID': 1, 'NAME': 'SAVING BANK ACCOUNT', 'M_NAME': 'बचत बँक खाते','K_NAME': 'बचत बँक खाते' },
      { 'ID': 2, 'NAME': 'CURRENT DEPOSITE ACCOUNT', 'M_NAME': 'चालू ठेव खाते','K_NAME': 'बचत बँक खाते' },
      { 'ID': 3, 'NAME': 'FIXED DEPOSITE ACCOUNT', 'M_NAME': 'मुदत ठेव खाते','K_NAME': 'बचत बँक खाते' },
      { 'ID': 4, 'NAME': 'RECURRING DEPOSITE ACCOUNT', 'M_NAME': 'आवर्ती ठेव खाते','K_NAME': 'बचत बँक खाते' }
    ];
    this.api.getAllBranches(0, 0, 'ID', "asc", "")
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          this.branchData = successCode['data'];
        }
      });
  }

  close(): void {
    this.drawerClose4();

    this.logtext = 'CLOSED - DepositInBank form';
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
    if (this.data4.BRANCH_NAME != undefined && this.data4.BANK_NAME != undefined
      && this.data4.DEPOSITE_AMOUNT != undefined && this.data4.DEPOSITE_TYPE != undefined) {
      if (this.data4.DEPOSITE_AMOUNT > 0) {
        this.isSpinning = true;
        if (this.data4.ID) {

          this.api.updateDepositsInBank(this.data4)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

                this.logtext = 'Update & Close - DepositInBank form - SUCCESS ' + JSON.stringify(this.data4) + " KEYWORD [U - DepositInBank ]";
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
                  this.drawerClose4();
                this.isSpinning = false;
              }
              else {

                this.logtext = 'Update & Close - DepositInBank form - ERROR - ' + JSON.stringify(this.data4) + " KEYWORD [U - DepositInBank ]";
                this.api.addLog('A', this.logtext, this.userId)
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
          this.api.createDepositsInBank(this.data4)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                this.message.success(this.api.translate.instant('common.message.success.addinfo2'), "");

                if (!addNew) {
                  this.drawerClose4();

                  this.logtext = 'Save & Close - DepositInBank form - SUCCESS - ' + JSON.stringify(this.data4) + " KEYWORD [C - DepositInBank ]";
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
                else {
                  this.data4 = new DepositeInBank();
                  this.setValues()
                  this.logtext = 'Save & New - DepositInBank form - SUCCESS - ' + JSON.stringify(this.data4) + " KEYWORD [C - DepositInBank ]";
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
                this.isSpinning = false;
              }
              else {
                this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
                this.isSpinning = false;
                this.logtext = 'Save & Close - DepositInBank form - ERROR - ' + JSON.stringify(this.data4) + " KEYWORD [C - DepositInBank ]";
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
      } else {
        this.message.error(this.api.translate.instant('gcreditinfo.deposite_message4'), "");
      }
    }
    else {
      this.message.error(this.api.translate.instant('common.message.error.emptyinfo'), "");
    }
  }

  setValues() {
    this.data4.BRANCH_NAME = "";
    this.data4.DEPOSITE_AMOUNT = 0;
    this.data4.IS_LOAN_TAKEN = false;
    this.data4.BANK_NAME = "";
    this.data4.DEPOSITE_TYPE = "";
  }

}



