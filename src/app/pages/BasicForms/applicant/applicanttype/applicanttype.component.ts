import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { CookieService } from 'ngx-cookie-service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Applicanttype } from 'src/app/Models/BasicForms/applicanttype';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';

@Component({
  selector: 'app-applicanttype',
  templateUrl: './applicanttype.component.html',
  styleUrls: ['./applicanttype.component.css']
})
export class ApplicanttypeComponent implements OnInit {

  @Input() drawerClose: Function;
  @Input() data: Applicanttype;
  isSpinning = false
  logtext: string = "";
  userActivityLogData: Useractivitylog = new Useractivitylog();


  constructor(private api: ApiService, private message: NzNotificationService) {
  }

  ngOnInit() {

  }



  close(): void {
    this.drawerClose();

    this.logtext = 'CLOSED - ApplicantType form';
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
    this.userActivityLogData.ACTIVITY_DETAILS = "Applicant Type - Close Clicked"
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
      this.api.updateApplicantType(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('applicanttype.success1.message'), "");

            this.logtext = 'Update & Close - ApplicantType form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - ApplicantType ]";
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
            this.userActivityLogData.ACTIVITY_DETAILS = "Applicant Type - Update & Close Successfully" + JSON.stringify(this.data)
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

            this.logtext = 'Update & Close - ApplicantType form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - ApplicantType ]";
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
            this.userActivityLogData.ACTIVITY_DETAILS = "Applicant Type - Update & Close Failed" + JSON.stringify(this.data)
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

            this.message.error(this.api.translate.instant('applicanttype.Error1.message'), "");
            this.isSpinning = false;
          }
        });
    }
    else {

      this.api.createApplicantType(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.error(this.api.translate.instant('applicanttype.success2.message'), "");

            if (!addNew) {
              this.drawerClose();

              this.logtext = 'Save & Close - ApplicantType form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - ApplicantType ]";
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
              this.userActivityLogData.ACTIVITY_DETAILS = "Applicant Type - Save & Close Successfully" + JSON.stringify(this.data)
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
              this.data = new Applicanttype();
              this.logtext = 'Save & New - ApplicantType form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - ApplicantType ]";
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
              this.userActivityLogData.ACTIVITY_DETAILS = "Applicant Type - Save & New Successfully" + JSON.stringify(this.data)
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
            this.message.error(this.api.translate.instant('applicanttype.Error2.message'), ""); 
            this.isSpinning = false;
            this.logtext = 'Save & Close - ApplicantType form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - ApplicantType ]";
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
            this.userActivityLogData.ACTIVITY_DETAILS = "Applicant Type - Save & Close Failed" + JSON.stringify(this.data)
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