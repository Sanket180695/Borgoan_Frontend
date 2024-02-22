import { Component, OnInit, Input } from '@angular/core';
import { Proposalstage } from 'src/app/Models/BasicForms/proposalstage';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';

@Component({
  selector: 'app-proposalstage',
  templateUrl: './proposalstage.component.html',
  styleUrls: ['./proposalstage.component.css']
})
export class ProposalstageComponent implements OnInit {

  @Input() drawerClose: Function;
  @Input() data: Proposalstage;
  isSpinning = false
  logtext: string = "";
  proposalStages: Proposalstage[]
  userActivityLogData: Useractivitylog = new Useractivitylog();
  childLoading: boolean

  constructor(private api: ApiService, private message: NzNotificationService) {
  }

  ngOnInit() {
    this.loadAllProposalStage()
  }

  loadAllProposalStage() {
    this.childLoading = true;
    this.api.getAllProposalStages(0, 0, '', '', "").subscribe(roles => {
      this.proposalStages = roles['data'];
      this.childLoading = false;
    }, err => {
      //console.log(err);
      this.childLoading = false;
    });
  }

  close(): void {
    this.drawerClose();

    this.logtext = 'CLOSED - ProposalStage form';
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
    this.userActivityLogData.ACTIVITY_DETAILS = "ProposalStage - Close Clicked"
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



    this.data.CHILDS = this.data.CHILD_INFO.toString()
    //console.log(this.data)
    this.isSpinning = true;

    if (this.data.ID) {


      this.api.updateProposalStage(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('proposalstage.success1.message'), "");

            this.logtext = 'Update & Close - ProposalStage form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - ProposalStage ]";
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
            this.userActivityLogData.ACTIVITY_DETAILS = "ProposalStage -  Update & Close Successfully" + JSON.stringify(this.data)
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

            this.logtext = 'Update & Close - ProposalStage form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - ProposalStage ]";
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
            this.userActivityLogData.ACTIVITY_DETAILS = "ProposalStage - Update & Close Failed" + JSON.stringify(this.data)
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
            this.message.error(this.api.translate.instant('proposalstage.Error1.message'), "");
            this.isSpinning = false;
          }
        });
    }
    else {

      this.api.createProposalStage(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('proposalstage.success2.message'), "");

            if (!addNew) {
              this.drawerClose();

              this.logtext = 'Save & Close - ProposalStage form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - ProposalStage ]";
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
              this.userActivityLogData.ACTIVITY_DETAILS = "ProposalStage - Save & Close Failed" + JSON.stringify(this.data)
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
              this.data = new Proposalstage();
              this.logtext = 'Save & New - ProposalStage form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - ProposalStage ]";
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
              this.userActivityLogData.ACTIVITY_DETAILS = "ProposalStage - Save & New Successfully" + JSON.stringify(this.data)
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
            this.message.error(this.api.translate.instant('proposalstage.Error2.message'), "");
            this.isSpinning = false;
            this.logtext = 'Save & Close - ProposalStage form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - ProposalStage ]";
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
            this.userActivityLogData.ACTIVITY_DETAILS = "ProposalStage - Save & New Failed" + JSON.stringify(this.data)
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