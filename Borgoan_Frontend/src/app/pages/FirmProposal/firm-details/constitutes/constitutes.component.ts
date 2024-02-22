import { Component, OnInit, Input } from '@angular/core';
import { Constitutes } from 'src/app/Models/FirmProposal/constitutes';
import { DatePipe } from '@angular/common';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';

@Component({
  selector: 'app-constitutes',
  templateUrl: './constitutes.component.html',
  styleUrls: ['./constitutes.component.css']
})
export class ConstitutesComponent implements OnInit {
  @Input() drawerCloseConstitues: Function;
  @Input() data: Constitutes;
  @Input() CURRENT_STAGE_ID: number;  
  @Input() extraApplicantInformation: Extraapplicantinfo;
  isSpinning = false;
  logtext: string = "";
  age: string;
  datePipe = new DatePipe("en-US");
  constructor( private api: ApiService,
    private message: NzNotificationService) { }

  ngOnInit(): void {
  }

  close(): void {
    this.drawerCloseConstitues();

    this.logtext = 'CLOSED - Constitutes form';
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

  focusss(event: KeyboardEvent){
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.DATE = undefined;
    }
  }

  save(addNew: boolean)
  {
    var isok=true
    if(this.data.NAME==undefined || this.data.NAME=="")
    {
      isok=false
      this.message.error(this.api.translate.instant('constitutes.message1'), "");

    }

    if(this.data.DATE==undefined)
    {
      isok=false
      this.message.error(this.api.translate.instant('constitutes.message2'), "");

    }

    if(isok)
    {
      this.isSpinning = true;
      this.data.DATE = this.datePipe.transform(this.data.DATE, 'yyyy-MM-dd');

      if (this.data.ID) {
        this.api.updateConstitutes(this.data)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

              this.logtext = 'Update & Close - Constitute form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - Constitute ]";
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
                this.drawerCloseConstitues();
              this.isSpinning = false;
            }
            else {

              this.logtext = 'Update & Close - Constitute form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - Constitute ]";
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

        this.api.createConstitutes(this.data)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('common.message.error.success'), "");

              if (!addNew) {
                this.drawerCloseConstitues();

                this.logtext = 'Save & Close - Constitute form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - Constitute ]";
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
                this.data = new Constitutes();
                this.logtext = 'Save & New - Constitute form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - Constitute ]";
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
              this.logtext = 'Save & Close - Constitute form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - Constitute ]";
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
