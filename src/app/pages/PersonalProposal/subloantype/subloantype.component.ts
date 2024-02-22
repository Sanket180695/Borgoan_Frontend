import { Component, OnInit, Input } from '@angular/core';
import { Subloantypes } from 'src/app/Models/subloantypes';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-subloantype',
  templateUrl: './subloantype.component.html',
  styleUrls: ['./subloantype.component.css']
})
export class SubloantypeComponent implements OnInit {

  @Input() drawerClose: Function;
  @Input() data: Subloantypes;
  isSpinning = false
  logtext: string = "";



  constructor(private api: ApiService, private message: NzNotificationService) {
  }

  ngOnInit() {

  }



  close(): void {
    this.drawerClose();

    this.logtext = 'CLOSED - BankLoanType form';
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
    if (this.data.types[0]['checked'] == true && this.data.types[1]['checked'] == false)
      this.data.TYPE = 'I'
    else if (this.data.types[0]['checked'] == false && this.data.types[1]['checked'] == true)
      this.data.TYPE = 'O'
    else if (this.data.types[1]['checked'] == true && this.data.types[1]['checked'] == true)
      this.data.TYPE = 'B'
    if (this.data.ID) {



      this.api.updateBankLoanType(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

            this.logtext = 'Update & Close - BankLoanType form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - BankLoanType ]";
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

            this.logtext = 'Update & Close - BankLoanType form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - BankLoanType ]";
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

      this.api.createBankLoanType(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('common.message.success.addinfo2'), "")

            if (!addNew) {
              this.drawerClose();

              this.logtext = 'Save & Close - BankLoanType form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - BankLoanType ]";
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
              this.data = new Subloantypes();
              this.logtext = 'Save & New - BankLoanType form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - BankLoanType ]";
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
            this.logtext = 'Save & Close - BankLoanType form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - BankLoanType ]";
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