import { Component, OnInit, Input } from '@angular/core';
import { Incomeyear } from 'src/app/Models/PersonalProposal/incomeyear';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-incomeyear',
  templateUrl: './incomeyear.component.html',
  styleUrls: ['./incomeyear.component.css']
})
export class IncomeyearComponent implements OnInit {

  @Input() drawerClose: Function;
  @Input() data: Incomeyear;
  isSpinning = false
  logtext: string = "";



  constructor(private api: ApiService, private message: NzNotificationService) {
  }

  ngOnInit() {

  }



  close(): void {
    this.drawerClose();

    this.logtext = 'CLOSED - Incomeyear form';
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



    if (this.data.START_YEAR != "" && this.data.START_YEAR != undefined && this.data.END_YEAR != "" && this.data.END_YEAR != undefined && this.data.TEXTUAL_YEAR != "" && this.data.TEXTUAL_YEAR != undefined) {
      this.isSpinning = true;
      if (this.data.ID) {

        this.api.updateIncomeyear(this.data)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('incomeyear.success1.message'), "");

              this.logtext = 'Update & Close - Incomeyear form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - Incomeyear ]";
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

              this.logtext = 'Update & Close - Incomeyear form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - Incomeyear ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                  }
                });

              this.message.error(this.api.translate.instant('incomeyear.Error1.message'), "");
              this.isSpinning = false;
            }
          });
      }
      else {

        this.api.createIncomeyear(this.data)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('incomeyear.success2.message'), "");

              if (!addNew) {
                this.drawerClose();

                this.logtext = 'Save & Close - Incomeyear form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - Incomeyear ]";
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
                this.data = new Incomeyear();
                this.logtext = 'Save & New - Incomeyear form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - Incomeyear ]";
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
              this.message.error(this.api.translate.instant('incomeyear.Error2.message'), "");
              this.isSpinning = false;
              this.logtext = 'Save & Close - Incomeyear form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - Incomeyear ]";
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
      this.message.error(this.api.translate.instant('incomeyear.Error3.message'), "");
    }

  }


}
