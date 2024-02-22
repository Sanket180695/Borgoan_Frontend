import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { MeansInfo } from 'src/app/Models/FirmProposal/projection-info';
import { ApiService } from 'src/app/Service/api.service';


@Component({
  selector: 'app-add-means',
  templateUrl: './add-means.component.html',
  styleUrls: ['./add-means.component.css']
})
export class AddMeansComponent implements OnInit {
  @Input() drawerClose2: Function;
  @Input() data2: MeansInfo;
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
    this.drawerClose2();

    this.logtext = 'CLOSED - ProjectionInfo form';
    this.api.addLog('A',this.logtext,this.api.emailId)
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
    if (this.data2.MEANS_OF_FINANCE != undefined && this.data2.MEANS_RUPEES != undefined && this.data2.MEANS_RUPEES > 0) {
      if (this.data2.MEANS_OF_FINANCE.trim() == '' ) {
        this.message.error(this.api.translate.instant('projection-info.message1'), "");
      } else {
      this.isSpinning = true;
      if (this.data2.ID) {
        this.api.updateMeansInformation(this.data2)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('projection-info.message2'), "");
              var LOG_ACTION = 'User saved Projection Info  tab information'
              var DESCRIPTION = sessionStorage.getItem('userName') + 'has saved the Projection Info  for the proposal ' + this.LOAN_KEY 
              var LOG_TYPE = 'I'
              this.api.proposalLogInformation(this.extraApplicantInformation.PROPOSAL_ID, this.extraApplicantInformation.CURRENT_STAGE_ID, 0, LOG_ACTION, Number(sessionStorage.getItem("userId")), DESCRIPTION, LOG_TYPE)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                  }
                });
              this.logtext = 'Update & Close - ProjectionInfo form - SUCCESS '+ JSON.stringify(this.data2)+" KEYWORD [U - ProjectionInfo ]";
              this.api.addLog('A',this.logtext,this.api.emailId)
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

              this.logtext = 'Update & Close - ProjectionInfo form - ERROR - '+ JSON.stringify(this.data2)+" KEYWORD [U - ProjectionInfo ]";
              this.api.addLog('A',this.logtext,this.api.emailId)
                      .subscribe(successCode => {
                        if (successCode['code'] == "200") {
                         //console.log(successCode);
                        }
                        else {
                //console.log(successCode);
                        }
                      });

              this.message.error(this.api.translate.instant('projection-info.message3'), "");
              this.isSpinning = false;
            }
          });
      }
      else {
        this.api.createMeansInformation(this.data2)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('projection-info.message4'), "");
              var LOG_ACTION = 'User saved Projection Info  tab information'
              var DESCRIPTION = sessionStorage.getItem('userName') + 'has saved the Projection Info  for the proposal ' + this.LOAN_KEY 
              var LOG_TYPE = 'I'
              this.api.proposalLogInformation(this.extraApplicantInformation.PROPOSAL_ID, this.extraApplicantInformation.CURRENT_STAGE_ID, 0, LOG_ACTION, Number(sessionStorage.getItem("userId")), DESCRIPTION, LOG_TYPE)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                  }
                });
              if (!addNew) {
                this.drawerClose2();

                this.logtext = 'Save & Close - ProjectionInfo form - SUCCESS - '+ JSON.stringify(this.data2)+" KEYWORD [C - ProjectionInfo ]";
                this.api.addLog('A',this.logtext,this.api.emailId)
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
                this.data2 = new MeansInfo();
                this.setValues();
                this.logtext = 'Save & New - ProjectionInfo form - SUCCESS - '+ JSON.stringify(this.data2)+" KEYWORD [C - ProjectionInfo ]";
                this.api.addLog('A',this.logtext,this.api.emailId)
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
              this.message.error(this.api.translate.instant('projection-info.message5'), "");
              this.isSpinning = false;
              this.logtext = 'Save & Close - ProjectionInfo form - ERROR - ' + JSON.stringify(this.data2) + " KEYWORD [C - ProjectionInfo ]";
              this.api.addLog('A',this.logtext,this.api.emailId)
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
      if (this.data2.MEANS_OF_FINANCE == undefined && this.data2.MEANS_RUPEES != undefined) {
        this.message.error(this.api.translate.instant('projection-info.message6'), "");
      } else if (this.data2.MEANS_OF_FINANCE != undefined && this.data2.MEANS_RUPEES == undefined) {
        this.message.error(this.api.translate.instant('projection-info.message7'), "");
      } else
        this.message.error(this.api.translate.instant('projection-info.message8'), "");
    }
  }


  setValues() {
    this.data2.MEANS_RUPEES = 0;
    this.data2.MEANS_OF_FINANCE = '';
  }
}