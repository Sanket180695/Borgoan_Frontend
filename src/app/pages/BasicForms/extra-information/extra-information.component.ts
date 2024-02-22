import { Component, OnInit, Input } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/Service/api.service';
import { ExtraInformation } from 'src/app/Models/PersonalProposal/extra-information';

@Component({
  selector: 'app-extra-information',
  templateUrl: './extra-information.component.html',
  styleUrls: ['./extra-information.component.css']
})
export class ExtraInformationComponent implements OnInit {

  @Input() drawerClose: Function;
  @Input() data: ExtraInformation;

  isSpinning = false
  logtext: string = "";
  userId = sessionStorage.getItem('userId');

  constructor(private api: ApiService, private cookie: CookieService, private message: NzNotificationService) {
  }

  ngOnInit() {

  }



  close(): void {
    this.drawerClose();

    this.logtext = 'CLOSED - ExtraInformation form';
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
    //console.log(this.data);
    if (this.data.NAME_EN != undefined) {
      if (this.data.NAME_EN.trim() !== '') {
        this.isSpinning = true;
        this.data.TYPE = this.data.EXTRA_TYPE.toString()

        if (this.data.ID) {

          this.api.updateeExtraInformation(this.data)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                this.message.success(this.api.translate.instant('extra-information.success1.message'), "");

                this.logtext = 'Update & Close - ExtraInformation form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - ExtraInformation ]";
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

                this.logtext = 'Update & Close - ExtraInformation form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - ExtraInformation ]";
                this.api.addLog('A', this.logtext, this.api.emailId)
                  .subscribe(successCode => {
                    if (successCode['code'] == "200") {
                      //console.log(successCode);
                    }
                    else {
                      //console.log(successCode);
                    }
                  });

                this.message.error(this.api.translate.instant('extra-information.Error1.message'), "");
                this.isSpinning = false;
              }
            });
        }
        else {
          this.api.createExtraInformation(this.data)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                this.message.success(this.api.translate.instant('extra-information.success2.message'), "");

                if (!addNew) {
                  this.drawerClose();

                  this.logtext = 'Save & Close - ExtraInformation form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - ExtraInformation ]";
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
                  this.data = new ExtraInformation();
                  this.setValues()
                  this.logtext = 'Save & New - ExtraInformation form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - ExtraInformation ]";
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
                this.message.error(this.api.translate.instant('extra-information.Error2.message'), "");
                this.isSpinning = false;
                this.logtext = 'Save & Close - ExtraInformation form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - ExtraInformation ]";
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
        this.message.error(this.api.translate.instant('extra-information.Error3.message'), "");
      }
    }
    else {
      this.message.error(this.api.translate.instant('extra-information.Error4.message'), "");
    }
  }

  setValues() {
    this.data.NAME_EN = "";
    this.data.STATUS = true;
  }

}
