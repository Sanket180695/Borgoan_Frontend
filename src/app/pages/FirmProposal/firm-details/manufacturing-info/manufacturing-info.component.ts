import { Component, OnInit, Input } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CookieService } from 'ngx-cookie-service';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { ManufacturingInfo } from 'src/app/Models/FirmProposal/manufacturing-info';
import { ApiService } from 'src/app/Service/api.service';
@Component({
  selector: 'app-manufacturing-info',
  templateUrl: './manufacturing-info.component.html',
  styleUrls: ['./manufacturing-info.component.css']
})
export class ManufacturingInfoComponent implements OnInit {
  @Input() drawerClose1: Function;
  @Input() data1: ManufacturingInfo;
  @Input() dataList 
  @Input() type :string
  @Input() CURRENT_STAGE_ID: number;  
  @Input() extraApplicantInformation: Extraapplicantinfo;
  isSpinning = false
  logtext: string = "";
  i=1
  constructor(
    private api: ApiService,
    private message: NzNotificationService
  ) { }

  ngOnInit(): void {
  }


  close(): void {
    this.drawerClose1();

    this.logtext = 'CLOSED - ManufacturingInfromation form';
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
    if (this.data1.NAME_OF_PRODUCT != undefined && this.data1.USE_OF_PRODUCT_IN_DETAILS != undefined
      && this.data1.AVAILABILITY_OF_MARKET != undefined && this.data1.DETAILS_OF_MANUFACTURING_PROCESS!=undefined && this.data1.DETAILS_OF_MANUFACTURING_PROCESS!="" 
      && this.data1.MANUFACTURED_PRODUCT_OTHER_INFO!=undefined && this.data1.MANUFACTURED_PRODUCT_OTHER_INFO!="" 
      && this.data1.DETAILS_OF_MANUFACTURED_PRODUCT!=undefined && this.data1.DETAILS_OF_MANUFACTURED_PRODUCT!="" 
      && this.data1.RAW_PRODUCT_DETAILS!=undefined && this.data1.RAW_PRODUCT_DETAILS!="" && this.data1.CREDIT_TERMS_DETAILS!=undefined && this.data1.CREDIT_TERMS_DETAILS.toString()!="" 
       ) {
      if (this.data1.NAME_OF_PRODUCT.trim() != '' && this.data1.USE_OF_PRODUCT_IN_DETAILS.trim() != ''&& this.data1.AVAILABILITY_OF_MARKET.trim() != '') {
        if (this.data1.PLACE_OF_MARKET.trim() != '') {
        this.isSpinning = true;

        if (this.data1.IS_ANCILILLARY_PRODUCT == undefined)
          this.data1.IS_ANCILILLARY_PRODUCT = false;
          
        if (this.data1.ID) {

          if(this.type=="B")
          {
            this.isSpinning = false;
            this.drawerClose1()
          }
          else
          {
            //console.log(this.data1)
            this.api.updateManufacturingInfromation(this.data1)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
  
                  this.logtext = 'Update & Close - ManufacturingInfromation form - SUCCESS ' + JSON.stringify(this.data1) + " KEYWORD [U - ManufacturingInfromation ]";
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
                    this.drawerClose1();
                  this.isSpinning = false;
                }
                else {
  
                  this.logtext = 'Update & Close - ManufacturingInfromation form - ERROR - ' + JSON.stringify(this.data1) + " KEYWORD [U - ManufacturingInfromation ]";
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
              this.data1.ID=this.i
              this.data1.CLIENT_ID=this.api.clientId
              this.data1.BUSINESS_FIRM_INFORMATION_ID=0
              this.dataList.push(Object.assign({}, this.data1));
              this.i++
            this.drawerClose1()
            }
            else
            {
              this.data1.ID=this.i
              this.data1.CLIENT_ID=this.api.clientId
              this.data1.BUSINESS_FIRM_INFORMATION_ID=0
              this.dataList.push(Object.assign({}, this.data1));
              this.i++
              this.data1 = new ManufacturingInfo();
            }
            this.isSpinning = false;

          }
          else
          {


          this.api.createManufacturingInfromation(this.data1)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                this.message.success(this.api.translate.instant('common.message.error.success'), "");

                if (!addNew) {
                  this.drawerClose1();

                  this.logtext = 'Save & Close - ManufacturingInfromation form - SUCCESS - ' + JSON.stringify(this.data1) + " KEYWORD [C - ManufacturingInfromation ]";
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
                  this.data1 = new ManufacturingInfo();
                  this.logtext = 'Save & New - ManufacturingInfromation form - SUCCESS - ' + JSON.stringify(this.data1) + " KEYWORD [C - ManufacturingInfromation ]";
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
                this.logtext = 'Save & Close - ManufacturingInfromation form - ERROR - ' + JSON.stringify(this.data1) + " KEYWORD [C - ManufacturingInfromation ]";
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
        this.message.error(this.api.translate.instant('business_info.message36'), "");
      }
      } else {
        this.message.error(this.api.translate.instant('business_info.message37'), "");
      }
    } else {
      this.message.error(this.api.translate.instant('business_info.message38'), "");
    }
  }

}
