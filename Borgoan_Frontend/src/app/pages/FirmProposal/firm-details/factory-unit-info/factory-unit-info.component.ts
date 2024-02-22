import { Component, OnInit, Input } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { FactoryUnit } from 'src/app/Models/FirmProposal/factory-unit';
import { ApiService } from 'src/app/Service/api.service';
@Component({
  selector: 'app-factory-unit-info',
  templateUrl: './factory-unit-info.component.html',
  styleUrls: ['./factory-unit-info.component.css']
})
export class FactoryUnitInfoComponent implements OnInit {
  @Input() drawerClose4: Function;
  @Input() data4: FactoryUnit;
  @Input() dataList 
  @Input() type :string;
  @Input() CURRENT_STAGE_ID: number;  
  @Input() extraApplicantInformation: Extraapplicantinfo;
  isSpinning = false;
  logtext: string = "";
  i=1
  factoryData = [{ 'ID': 'स्वतःच्या मालकीची', 'NAME': this.api.translate.instant('business_info.factoryData1') }, { 'ID': 'भाड्याने लिजवर घेतलेली', 'NAME': this.api.translate.instant('business_info.factoryData2') }, { 'ID': 'हायर पर्चेस', 'NAME': this.api.translate.instant('business_info.factoryData3') }];
  constructor(
    private api: ApiService,
    private message: NzNotificationService
  ) { }

  ngOnInit(): void {
  } 
  close(): void {
    this.drawerClose4();

    this.logtext = 'CLOSED - FactoryUnitInfromation form';
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
    if (this.data4.TYPE_OF_FACTORY != undefined && this.data4.EXISTING_CONSTRUCTION_AREA != undefined
      && this.data4.EXISTING_LAND_AREA != undefined) {
      if (this.data4.EXISTING_LAND_AREA.toString().trim() != '' && this.data4.EXISTING_CONSTRUCTION_AREA.toString().trim() != '') {
        this.isSpinning = true;

        if (this.data4.IS_AVAILABILITY_OF_ELECTRICITY == undefined)
          this.data4.IS_AVAILABILITY_OF_ELECTRICITY = false;

        if (this.data4.IS_AVAILABILITY_OF_TRANSPORT == undefined)
          this.data4.IS_AVAILABILITY_OF_TRANSPORT = false;

        if (this.data4.IS_AVAILABILITY_OF_WATER == undefined)
          this.data4.IS_AVAILABILITY_OF_WATER = false;

        if (this.data4.IS_AVAILABILITY_OF_WORKERS == undefined)
          this.data4.IS_AVAILABILITY_OF_WORKERS = false;

        if (this.data4.IS_SUFFICIENT_AREA == undefined)
          this.data4.IS_SUFFICIENT_AREA = false;

        if (this.data4.ID) {

          if(this.type=="B")
          {
            this.isSpinning = false;
            this.drawerClose4()
          }
          else
          {
            this.api.updateFactoryUnitInformation(this.data4)
            .subscribe(successCode => {
               //console.log(successCode)
              if (successCode['code'] == "200") {
                this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

                this.logtext = 'Update & Close - FactoryUnitInfromation form - SUCCESS ' + JSON.stringify(this.data4) + " KEYWORD [U - FactoryUnitInfromation ]";
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
                  this.drawerClose4();
                this.isSpinning = false;
              }
              else {

                this.logtext = 'Update & Close - FactoryUnitInfromation form - ERROR - ' + JSON.stringify(this.data4) + " KEYWORD [U - FactoryUnitInfromation ]";
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

        
        }
        else {
          if(this.type=="B")
          {
            if (!addNew) {
              this.data4.ID=this.i
              this.data4.CLIENT_ID=this.api.clientId
              this.data4.BUSINESS_FIRM_INFORMATION_ID=0
              this.dataList.push(Object.assign({}, this.data4));
              this.i++
            this.drawerClose4()
            }
            else
            {
              this.data4.ID=this.i
              this.data4.CLIENT_ID=this.api.clientId
              this.data4.BUSINESS_FIRM_INFORMATION_ID=0
              this.dataList.push(Object.assign({}, this.data4));
              this.i++
              this.data4 = new FactoryUnit();
            }
            this.isSpinning = false;

          }
          else
          {
            //console.log(this.data4)
            this.api.createFactoryUnitInformation(this.data4)
            .subscribe(successCode => {
              //console.log(successCode)
              if (successCode['code'] == "200") {
               
                this.message.success(this.api.translate.instant('common.message.error.success'), "");

                if (!addNew) {
                  this.drawerClose4();

                  this.logtext = 'Save & Close - FactoryUnitInfromation form - SUCCESS - ' + JSON.stringify(this.data4) + " KEYWORD [C - FactoryUnitInfromation ]";
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
                  this.data4 = new FactoryUnit();
                  this.logtext = 'Save & New - FactoryUnitInfromation form - SUCCESS - ' + JSON.stringify(this.data4) + " KEYWORD [C - FactoryUnitInfromation ]";
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
                this.logtext = 'Save & Close - FactoryUnitInfromation form - ERROR - ' + JSON.stringify(this.data4) + " KEYWORD [C - FactoryUnitInfromation ]";
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
      } else {
        this.message.error(this.api.translate.instant('business_info.message34'), "");
      }
    } else {
      this.message.error(this.api.translate.instant('business_info.message35'), "");
    }
  }

}
