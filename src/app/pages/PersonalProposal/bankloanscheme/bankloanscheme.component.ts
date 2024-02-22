import { Component, OnInit, Input } from '@angular/core';
import { Bankloanscheme } from 'src/app/Models/PersonalProposal/bankloanscheme';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-bankloanscheme',
  templateUrl: './bankloanscheme.component.html',
  styleUrls: ['./bankloanscheme.component.css']
})
export class BankloanschemeComponent implements OnInit {
  @Input() drawerClose: Function;
  @Input() data: Bankloanscheme;
  isSpinning = false
  logtext: string = "";



  constructor(private api: ApiService, private message: NzNotificationService) {
  }

  ngOnInit() {

  }



  close(): void {
    this.drawerClose();

    this.logtext = 'CLOSED - LoanScheme form';
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

    this.isSpinning = true;
    // if (this.data.types[0]['checked'] == true && this.data.types[1]['checked'] == false)
    //   this.data.TYPE = 'I'
    // else if (this.data.types[0]['checked'] == false && this.data.types[1]['checked'] == true)
    //   this.data.TYPE = 'O'
    // else if (this.data.types[1]['checked'] == true && this.data.types[1]['checked'] == true)
    //   this.data.TYPE = 'B'
    this.data.TYPE = ""
    //console.log(this.data)

    if (this.data.ID) {


      this.api.updateLoanScheme(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

            this.logtext = 'Update & Close - LoanScheme form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - LoanScheme ]";
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

            this.logtext = 'Update & Close - LoanScheme form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - LoanScheme ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });

              this.message.error(this.api.translate.instant('common.message.error.failed'), "");
            this.isSpinning = false;
          }
        });
    }
    else {

      this.api.createLoanScheme(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('common.message.success.addinfo2'), "");

            if (!addNew) {
              this.drawerClose();

              this.logtext = 'Save & Close - LoanScheme form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - LoanScheme ]";
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
              this.data = new Bankloanscheme();
              this.logtext = 'Save & New - LoanScheme form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - LoanScheme ]";
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
            this.logtext = 'Save & Close - LoanScheme form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - LoanScheme ]";
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