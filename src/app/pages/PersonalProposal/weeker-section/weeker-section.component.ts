import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
;
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { WeekerSection } from 'src/app/Models/PersonalProposal/weeker-section';
import { ApiService } from 'src/app/Service/api.service';


@Component({
  selector: 'app-weeker-section',
  templateUrl: './weeker-section.component.html',
  styleUrls: ['./weeker-section.component.css']
})
export class WeekerSectionComponent implements OnInit {
  @Input() drawerClose: Function;
  @Input() data: WeekerSection;
  isSpinning = false
  logtext: string = "";


  constructor(private api: ApiService, private message: NzNotificationService) {
  }

  ngOnInit() {

  }



  close(): void {
    this.drawerClose();

    this.logtext = 'CLOSED - WeekerSection form';
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
    var isOk = true;

    if (this.data.CODE == undefined || this.data.CODE.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('industri_marking.message1'), "");
    }

    if (this.data.NAME == undefined || this.data.NAME.trim() == '' ||
      this.data.NAME_KN == undefined || this.data.NAME_KN.trim() == '' ||
      this.data.NAME_EN == undefined || this.data.NAME_EN.trim() == ''
    ) {
      isOk = false;
      this.message.error(this.api.translate.instant('industri_marking.message2'), "");
    }

    if (isOk) {
      this.isSpinning = true;

      if (this.data.ID) {
        this.api.updateWeekerSectionCode(this.data)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

              this.logtext = 'Update & Close - WeekerSection form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - WeekerSection ]";
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

              this.logtext = 'Update & Close - WeekerSection form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - WeekerSection ]";
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

        this.api.createWeekerSectionCode(this.data)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('common.message.success.addinfo2'), "")

              if (!addNew) {
                this.drawerClose();

                this.logtext = 'Save & Close - WeekerSection form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - WeekerSection ]";
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
                this.data = new WeekerSection();
                this.logtext = 'Save & New - WeekerSection form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - WeekerSection ]";
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
              this.logtext = 'Save & Close - WeekerSection form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - WeekerSection ]";
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
  }


}