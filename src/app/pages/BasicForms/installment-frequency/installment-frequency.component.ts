import { Component, OnInit, Input } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { CookieService } from 'ngx-cookie-service';
import { InstallmentFrequency } from 'src/app/Models/PersonalProposal/installment-frequency';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-installment-frequency',
  templateUrl: './installment-frequency.component.html',
  styleUrls: ['./installment-frequency.component.css']
})
export class InstallmentFrequencyComponent implements OnInit {

  @Input() drawerClose: Function;
  @Input() data: InstallmentFrequency;

  isSpinning = false
  logtext: string = "";

  constructor(private api: ApiService, private cookie: CookieService, private message: NzNotificationService) {
  }

  ngOnInit() {

  }



  close(): void {
    this.drawerClose();

    this.logtext = 'CLOSED - InstallmentFrequency form';
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
    if (this.data.NAME != undefined || this.data.NAME_KN != undefined || this.data.NAME_EN != undefined
      || this.data.DESCRIPTION != undefined || this.data.DESCRIPTION_KN != undefined || this.data.DESCRIPTION_EN != undefined) {
      if (this.data.NAME.trim() !== '' || this.data.NAME_KN.trim() !== '' || this.data.NAME_EN.trim() !== '') {
        if (this.data.DESCRIPTION.trim() !== '' || this.data.DESCRIPTION_KN.trim() !== '' || this.data.DESCRIPTION_EN.trim() !== '') {
          this.isSpinning = true;
          if (this.data.ID) {
            this.api.updateInstallmentFrequency(this.data)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  this.message.success(this.api.translate.instant('installment-frequency.success1.message'), "");
                  this.logtext = 'Update & Close - InstallmentFrequency form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - InstallmentFrequency ]";
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

                  this.logtext = 'Update & Close - InstallmentFrequency form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - InstallmentFrequency ]";
                  this.api.addLog('A', this.logtext, this.api.emailId)
                    .subscribe(successCode => {
                      if (successCode['code'] == "200") {
                        //console.log(successCode);
                      }
                      else {
                        //console.log(successCode);
                      }
                    });
                  this.message.error(this.api.translate.instant('installment-frequency.Error1.message'), "");
                  this.isSpinning = false;
                }
              });
          }
          else {
            this.api.createInstallmentFrequency(this.data)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  this.message.success(this.api.translate.instant('installment-frequency.success2.message'), "");
                  if (!addNew) {
                    this.drawerClose();
                    this.logtext = 'Save & Close - InstallmentFrequency form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - InstallmentFrequency ]";
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
                    this.data = new InstallmentFrequency();
                    this.setValues()
                    this.logtext = 'Save & New - InstallmentFrequency form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - InstallmentFrequency ]";
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
                  this.message.error(this.api.translate.instant('installment-frequency.Error2.message'), "");
                  this.isSpinning = false;
                  this.logtext = 'Save & Close - InstallmentFrequency form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - InstallmentFrequency ]";
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
        else {
          this.message.error(this.api.translate.instant('installment-frequency.Error3.message'), "");
        }
      } else {
        this.message.error(this.api.translate.instant('installment-frequency.Error4.message'), "");
      }
    }
    else {
      this.message.error(this.api.translate.instant('installment-frequency.Error5.message'), "");
    }
  }

  setValues() {
    this.data.NAME_EN = "";
    this.data.NAME_KN = "";
    this.data.NAME = "";
    this.data.DESCRIPTION = "";
    this.data.DESCRIPTION_EN = "";
    this.data.DESCRIPTION_KN = "";
    this.data.IS_ACTIVE = true;
  }

}

