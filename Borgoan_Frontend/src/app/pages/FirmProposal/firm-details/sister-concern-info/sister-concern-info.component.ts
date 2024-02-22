import { Component, OnInit, Input } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { SisterConcern } from 'src/app/Models/FirmProposal/sister-concern';
import { ApiService } from 'src/app/Service/api.service';
@Component({
  selector: 'app-sister-concern-info',
  templateUrl: './sister-concern-info.component.html',
  styleUrls: ['./sister-concern-info.component.css']
})
export class SisterConcernInfoComponent implements OnInit {
  @Input() drawerClose2: Function;
  @Input() data2: SisterConcern;
  isSpinning = false
  logtext: string = "";
  @Input() CURRENT_STAGE_ID: number;  
  @Input() extraApplicantInformation: Extraapplicantinfo;
  constitutionData = [{ 'ID': '1', 'NAME':  this.api.translate.instant('business_info.constitutionData1') }, { 'ID': '2', 'NAME':  this.api.translate.instant('business_info.constitutionData2') }, { 'ID': '3', 'NAME':  this.api.translate.instant('business_info.constitutionData3') }, { 'ID': '4', 'NAME':  this.api.translate.instant('business_info.constitutionData4') }, { 'ID': '5', 'NAME':  this.api.translate.instant('business_info.constitutionData5') }, { 'ID': '6', 'NAME':  this.api.translate.instant('business_info.constitutionData6') },{ 'ID': '7', 'NAME': this.api.translate.instant('business_info.constitutionData8')}];
  constructor(
    private api: ApiService,
    private message: NzNotificationService
  ) { }


  ngOnInit(): void {
  }
  close(): void {
    this.drawerClose2();

    this.logtext = 'CLOSED - SisterConcernInfromation form';
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
    if (this.data2.NAME_OF_FIRM != undefined && this.data2.NATURE_OF_BUSINESS != undefined && this.data2.CONSTITUTION != undefined ) {
      if (this.data2.NAME_OF_FIRM.trim() != '' && this.data2.NATURE_OF_BUSINESS.trim() != '' ) {
      
        this.isSpinning = true;
        if (this.data2.ID) {
          this.api.updateSisterOrAssociateConcern(this.data2)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

                this.logtext = 'Update & Close - SisterConcernInfromation form - SUCCESS ' + JSON.stringify(this.data2) + " KEYWORD [U - SisterConcernInfromation ]";
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

                this.logtext = 'Update & Close - SisterConcernInfromation form - ERROR - ' + JSON.stringify(this.data2) + " KEYWORD [U - SisterConcernInfromation ]";
                this.api.addLog('A', this.logtext, this.api.emailId)
                  .subscribe(successCode => {
                    if (successCode['code'] == "200") {
                      //console.log(successCode);
                    }
                    else {
                      //console.log(successCode);
                    }
                  });

                this.message.error(this.api.translate.instant('common.message.error.updatefailed'), "");
                this.isSpinning = false;
              }
            });
        }
        else {

          this.api.createSisterOrAssociateConcern(this.data2)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                this.message.success(this.api.translate.instant('common.message.error.success'), "");

                if (!addNew) {
                  this.drawerClose2();

                  this.logtext = 'Save & Close - SisterConcernInfromation form - SUCCESS - ' + JSON.stringify(this.data2) + " KEYWORD [C - SisterConcernInfromation ]";
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
                  this.data2 = new SisterConcern();
                  this.logtext = 'Save & New - SisterConcernInfromation form - SUCCESS - ' + JSON.stringify(this.data2) + " KEYWORD [C - SisterConcernInfromation ]";
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
                this.logtext = 'Save & Close - SisterConcernInfromation form - ERROR - ' + JSON.stringify(this.data2) + " KEYWORD [C - SisterConcernInfromation ]";
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
      } else {
        this.message.error(this.api.translate.instant('employee_info.message2'), "");
      }
    } else {
      this.message.error(this.api.translate.instant('common.message.error.compinfo2'), "");
    }
  }
}
