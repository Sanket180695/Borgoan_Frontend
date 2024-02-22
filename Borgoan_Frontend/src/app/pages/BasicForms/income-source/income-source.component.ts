import { Component, OnInit, Input } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { CookieService } from 'ngx-cookie-service';
import { IncomeSource } from 'src/app/Models/PersonalProposal/income-source';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-income-source',
  templateUrl: './income-source.component.html',
  styleUrls: ['./income-source.component.css']
})
export class IncomeSourceComponent implements OnInit {

  @Input() drawerClose: Function;
  @Input() data: IncomeSource;

  isSpinning = false
  logtext: string = "";
  userId = sessionStorage.getItem('userId');

  constructor(private api: ApiService, private cookie: CookieService, private message: NzNotificationService) {
  }

  ngOnInit() {

  }



  close(): void {
    this.drawerClose();

    this.logtext = 'CLOSED - IncomeSource form';
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
    if (this.data.NAME != undefined || this.data.DESCRIPTION != undefined) {
      if (this.data.NAME.trim() !== '') {
        if (this.data.DESCRIPTION.trim() != '') {
          this.isSpinning = true;
          if (this.data.ID) {
            this.api.updateIncomeSource(this.data)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  this.message.success(this.api.translate.instant('income-source.success1.message'), "");
                  this.logtext = 'Update & Close - IncomeSource form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - IncomeSource ]";
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
                  this.logtext = 'Update & Close - IncomeSource form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - IncomeSource ]";
                  this.api.addLog('A', this.logtext, this.api.emailId)
                    .subscribe(successCode => {
                      if (successCode['code'] == "200") {
                        //console.log(successCode);
                      }
                      else {
                        //console.log(successCode);
                      }
                    });

                  this.message.error(this.api.translate.instant('income-source.Error1.message'), "");
                  this.isSpinning = false;
                }
              });
          }
          else {
            this.api.createIncomeSource(this.data)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  this.message.success(this.api.translate.instant('income-source.success2.message'), "");
                  if (!addNew) {
                    this.drawerClose();
                    this.logtext = 'Save & Close - IncomeSource form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - IncomeSource ]";
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
                    this.data = new IncomeSource();
                    this.setValues()
                    this.logtext = 'Save & New - IncomeSource form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - IncomeSource ]";
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
                  this.message.error(this.api.translate.instant('income-source.Error2.message'), "");
                  this.isSpinning = false;
                  this.logtext = 'Save & Close - IncomeSource form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - IncomeSource ]";
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
          this.message.error(this.api.translate.instant('income-source.Error3.message'), "");
        }
      } else {
        this.message.error(this.api.translate.instant('income-source.Error4.message'), "");
      }
    }
    else {
      this.message.error(this.api.translate.instant('income-source.Error5.message'), "");
    }
  }

  setValues() {
    this.data.NAME = "";
    this.data.DESCRIPTION = this.api.translate.instant('common.No_Description');
    this.data.IS_ACTIVE = true;
  }

}

