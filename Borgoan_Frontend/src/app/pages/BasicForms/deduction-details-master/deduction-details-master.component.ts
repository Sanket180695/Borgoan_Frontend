import { Component, OnInit, Input } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { CookieService } from 'ngx-cookie-service';
import { DeductionDetailsMaster } from 'src/app/Models/PersonalProposal/deduction-details-master';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-deduction-details-master',
  templateUrl: './deduction-details-master.component.html',
  styleUrls: ['./deduction-details-master.component.css']
})
export class DeductionDetailsMasterComponent implements OnInit {

  @Input() drawerClose: Function;
  @Input() data: DeductionDetailsMaster;

  isSpinning = false
  logtext: string = "";

  constructor(private api: ApiService, private cookie: CookieService, private message: NzNotificationService) {
  }

  ngOnInit() {

  }

  close(): void {
    this.drawerClose();

    this.logtext = 'CLOSED - DeductionDetailsMaster form';
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
    if (this.data.NAME != undefined) {
      if (this.data.NAME.trim() !== '') {
        this.isSpinning = true;
        if (this.data.ID) {

          this.api.updateDeductionDetailsMaster(this.data)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                this.message.success(this.api.translate.instant('deduction-details-master.success1.message'), "");

                this.logtext = 'Update & Close - DeductionDetailsMaster form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - DeductionDetailsMaster ]";
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

                this.logtext = 'Update & Close - DeductionDetailsMaster form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - DeductionDetailsMaster ]";
                this.api.addLog('A', this.logtext, this.api.emailId)
                  .subscribe(successCode => {
                    if (successCode['code'] == "200") {
                      //console.log(successCode);
                    }
                    else {
                      //console.log(successCode);
                    }
                  });
                this.message.error(this.api.translate.instant('deduction-details-master.Error1.message'), "");
                this.isSpinning = false;
              }
            });
        }
        else {
          this.api.updateDeductionDetailsMaster(this.data)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                this.message.success(this.api.translate.instant('deduction-details-master.success2.message'), "");

                if (!addNew) {
                  this.drawerClose();
                  this.setValues();
                  this.logtext = 'Save & Close - DeductionDetailsMaster form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - DeductionDetailsMaster ]";
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
                  this.data = new DeductionDetailsMaster();
                  this.setValues();
                  this.logtext = 'Save & New - DeductionDetailsMaster form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - DeductionDetailsMaster ]";
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
                this.message.error(this.api.translate.instant('deduction-details-master.Error2.message'), "");
                this.isSpinning = false;
                this.logtext = 'Save & Close - DeductionDetailsMaster form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - DeductionDetailsMaster ]";
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
        this.message.error(this.api.translate.instant('deduction-details-master.Error3.message'), "");
      }
    }
    else {
      this.message.error(this.api.translate.instant('deduction-details-master.Error4.message'), "");
    }
  }

  setValues() {
    this.data.NAME = "";
    this.data.IS_ACTIVE = true;
  }

}
