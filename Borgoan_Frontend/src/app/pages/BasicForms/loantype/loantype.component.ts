import { Component, OnInit, Input } from '@angular/core';
import { Loantypes } from 'src/app/Models/BasicForms/loantypes';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';

@Component({
  selector: 'app-loantype',
  templateUrl: './loantype.component.html',
  styleUrls: ['./loantype.component.css']
})
export class LoantypeComponent implements OnInit {

  @Input() drawerClose: Function;
  @Input() data: Loantypes;
  isSpinning = false
  logtext: string = "";

  userActivityLogData: Useractivitylog = new Useractivitylog();


  constructor(private api: ApiService, private message: NzNotificationService) {
  }

  ngOnInit() {

  }



  close(): void {
    this.drawerClose();

    this.logtext = 'CLOSED - LoanTypes form';
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          //console.log(successCode);
        }
        else {
          //console.log(successCode);
        }
      });

    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "LoanType - Close Clicked"
    this.userActivityLogData.ACTIVITY_TIME = new Date()
    this.api.createUserActivityLog(this.userActivityLogData)
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

    this.isSpinning = true;

    if (this.data.ID) {



      this.api.updateLoanTypes(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('loantype.success1.message'), "");

            this.logtext = 'Update & Close - LoanTypes form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - LoanTypes ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });

            this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
            this.userActivityLogData.ACTIVITY_DETAILS = "LoanType -  Update & Close Successfully" + JSON.stringify(this.data)
            this.userActivityLogData.ACTIVITY_TIME = new Date()
            this.api.createUserActivityLog(this.userActivityLogData)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });

            if (!addNew)
              this.drawerClose();
            this.isSpinning = false;
          }
          else {

            this.logtext = 'Update & Close - LoanTypes form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - LoanTypes ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });
            this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
            this.userActivityLogData.ACTIVITY_DETAILS = "LoanType - Update & Close Failed" + JSON.stringify(this.data)
            this.userActivityLogData.ACTIVITY_TIME = new Date()
            this.api.createUserActivityLog(this.userActivityLogData)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });
            this.message.error(this.api.translate.instant('loantype.Error1.message'), "");
            this.isSpinning = false;
          }
        });
    }
    else {

      this.api.createLoanTypes(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('loantype.success2.message'), "");

            if (!addNew) {
              this.drawerClose();

              this.logtext = 'Save & Close - LoanTypes form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - LoanTypes ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                  }
                });

              this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
              this.userActivityLogData.ACTIVITY_DETAILS = "LoanType - Save & Close Failed" + JSON.stringify(this.data)
              this.userActivityLogData.ACTIVITY_TIME = new Date()
              this.api.createUserActivityLog(this.userActivityLogData)
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
              this.data = new Loantypes();
              this.logtext = 'Save & New - LoanTypes form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - LoanTypes ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                  }
                });

              this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
              this.userActivityLogData.ACTIVITY_DETAILS = "LoanType - Save & New Successfully" + JSON.stringify(this.data)
              this.userActivityLogData.ACTIVITY_TIME = new Date()
              this.api.createUserActivityLog(this.userActivityLogData)
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
            this.message.error(this.api.translate.instant('loantype.Error2.message'), "");
            this.isSpinning = false;
            this.logtext = 'Save & Close - LoanTypes form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - LoanTypes ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });

            this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
            this.userActivityLogData.ACTIVITY_DETAILS = "LoanTypes - Save & Close Failed" + JSON.stringify(this.data)
            this.userActivityLogData.ACTIVITY_TIME = new Date()
            this.api.createUserActivityLog(this.userActivityLogData)
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