import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { GoldItem } from 'src/app/Models/BasicForms/gold-item';

@Component({
  selector: 'app-gold-item',
  templateUrl: './gold-item.component.html',
  styleUrls: ['./gold-item.component.css']
})
export class GoldItemComponent implements OnInit {
  @Input() drawerClose: Function;
  @Input() data: GoldItem;
  isSpinning = false
  logtext: string = "";



  constructor(private api: ApiService, private message: NzNotificationService) {
  }

  ngOnInit() {

  }



  close(): void {
    this.drawerClose();

    this.logtext = 'CLOSED - GoldItem form';
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



    if (this.data.NAME_MR != "" && this.data.NAME_MR != undefined &&
      this.data.NAME_KN != "" && this.data.NAME_KN != undefined &&
      this.data.NAME_EN != "" && this.data.NAME_EN != undefined &&
      this.data.PER_GRAM_RATE != undefined && this.data.PER_GRAM_RATE != 0) {
      this.isSpinning = true;
      if (this.data.ID) {

        this.api.updateGoldItem(this.data)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('GoldItem.success1.message'), "");

              this.logtext = 'Update & Close - GoldItem form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - GoldItem ]";
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

              this.logtext = 'Update & Close - GoldItem form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - GoldItem ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                  }
                });

              this.message.error(this.api.translate.instant('GoldItem.Error1.message'), "");
              this.isSpinning = false;
            }
          });
      }
      else {

        this.api.createGoldItem(this.data)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('GoldItem.success2.message'), "");

              if (!addNew) {
                this.drawerClose();

                this.logtext = 'Save & Close - GoldItem form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - GoldItem ]";
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
                this.data = new GoldItem();
                this.logtext = 'Save & New - GoldItem form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - GoldItem ]";
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
              this.message.error(this.api.translate.instant('GoldItem.Error2.message'), "");
              this.isSpinning = false;
              this.logtext = 'Save & Close - GoldItem form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - GoldItem ]";
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
      this.message.error(this.api.translate.instant('GoldItem.Error3.message'), "");
    }

  }


}
