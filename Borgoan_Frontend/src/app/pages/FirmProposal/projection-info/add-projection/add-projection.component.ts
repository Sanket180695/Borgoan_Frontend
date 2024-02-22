import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { CostInfo } from 'src/app/Models/FirmProposal/projection-info';
import { ApiService } from 'src/app/Service/api.service';
@Component({
  selector: 'app-add-projection',
  templateUrl: './add-projection.component.html',
  styleUrls: ['./add-projection.component.css']
})
export class AddProjectionComponent implements OnInit {
  @Input() drawerClose: Function;
  @Input() data: CostInfo;
  isSpinning = false
  logtext: string = "";
  @Input() CURRENT_STAGE_ID: number;
  @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  @Input() LOAN_KEY: Number;
  constructor(private api: ApiService, private message: NzNotificationService) {
  }

  ngOnInit() {

  }
  close(): void {
    this.drawerClose();

    this.logtext = 'CLOSED - CostInfo form';
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
    if (this.data.COST_OF_PROJECT != undefined && this.data.COST_RUPEES != undefined && this.data.COST_RUPEES > 0) {
      if (this.data.COST_OF_PROJECT.trim() == '') {
        this.message.error(this.api.translate.instant('add-projection.message1'), "");
      } else {
        this.isSpinning = true;
        if (this.data.ID) {
          this.api.updateCostInformation(this.data)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                this.message.success(this.api.translate.instant('add-projection.message2'), "");
                var LOG_ACTION = 'User saved Projection Info  tab information'
                var DESCRIPTION = sessionStorage.getItem('userName') + 'has saved the Projection Info  for the proposal ' + this.LOAN_KEY 
                var LOG_TYPE = 'I'
                this.api.proposalLogInformation(this.extraApplicantInformation.PROPOSAL_ID, this.extraApplicantInformation.CURRENT_STAGE_ID, 0, LOG_ACTION, Number(sessionStorage.getItem("userId")), DESCRIPTION, LOG_TYPE)
                  .subscribe(successCode => {
                    if (successCode['code'] == "200") {
                    }
                  });
                this.logtext = 'Update & Close - CostInfo form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - CostInfo ]";
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
                  this.drawerClose();
                this.isSpinning = false;
              }
              else {

                this.logtext = 'Update & Close - CostInfo form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - CostInfo ]";
                this.api.addLog('A', this.logtext, this.api.emailId)
                  .subscribe(successCode => {
                    if (successCode['code'] == "200") {
                      //console.log(successCode);
                    }
                    else {
                      //console.log(successCode);
                    }
                  });

                this.message.error(this.api.translate.instant('add-projection.message3'), "");
                this.isSpinning = false;
              }
            });
        }
        else {
          this.api.createCostInformation(this.data)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                this.message.success(this.api.translate.instant('add-projection.message4'), "");

                if (!addNew) {
                  this.drawerClose();
                  var LOG_ACTION = 'User saved Projection Info  tab information'
                  var DESCRIPTION = sessionStorage.getItem('userName') + 'has saved the Projection Info  for the proposal ' + this.LOAN_KEY 
                  var LOG_TYPE = 'I'
                  this.api.proposalLogInformation(this.extraApplicantInformation.PROPOSAL_ID, this.extraApplicantInformation.CURRENT_STAGE_ID, 0, LOG_ACTION, Number(sessionStorage.getItem("userId")), DESCRIPTION, LOG_TYPE)
                    .subscribe(successCode => {
                      if (successCode['code'] == "200") {
                      }
                    });
                  this.logtext = 'Save & Close - CostInfo form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - CostInfo ]";
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
                  this.data = new CostInfo();
                  this.setValues();
                  this.logtext = 'Save & New - CostInfo form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - CostInfo ]";
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
                this.message.error(this.api.translate.instant('add-projection.message5'), "");
                this.isSpinning = false;
                this.logtext = 'Save & Close - CostInfo form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - CostInfo ]";
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
    } else {
      if (this.data.COST_OF_PROJECT == undefined && this.data.COST_RUPEES != undefined) {
        this.message.error(this.api.translate.instant('add-projection.message6'), "");
      } else if (this.data.COST_OF_PROJECT != undefined && this.data.COST_RUPEES == undefined) {
        this.message.error(this.api.translate.instant('add-projection.message7'), "");
      } else
        this.message.error(this.api.translate.instant('add-projection.message8'), "");
    }
  }


  setValues() {
    this.data.COST_OF_PROJECT = '';
    this.data.COST_RUPEES = 0;
  }
}