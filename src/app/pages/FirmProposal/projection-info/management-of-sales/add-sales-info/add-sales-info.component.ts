import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { ManagementOfSalesInformation } from 'src/app/Models/FirmProposal/management-of-sales';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { ApiService } from 'src/app/Service/api.service';
import { ManufacturingInfo } from 'src/app/Models/FirmProposal/manufacturing-info';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
@Component({
  selector: 'app-add-sales-info',
  templateUrl: './add-sales-info.component.html',
  styleUrls: ['./add-sales-info.component.css']
})
export class AddSalesInfoComponent implements OnInit {
  @Input() drawerClose: Function;
  @Input() data: ManagementOfSalesInformation;
  @Input() addressinfo: Addressinfo;
  @Input() type:string
  @Input() dataList
  @Input() PROPOSAL_ID:number;
  isSpinning = false
  logtext: string = "";
  i=1
  
  @Input() CURRENT_STAGE_ID: number;  
  @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  constructor(private api: ApiService, private message: NzNotificationService) {
  }

  ngOnInit() {
    
  }
  close(): void {
    this.drawerClose();

    this.logtext = 'CLOSED - ManagementOfSalesInformation form';
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
   
      if (this.data.IS_SHOWROOM_OR_DEPO_OWNED) {
        if (
          this.addressinfo.HOUSE_NO != undefined && this.addressinfo.HOUSE_NO != "" &&
          this.addressinfo.BUILDING != undefined && this.addressinfo.BUILDING != "" &&
          this.addressinfo.DISTRICT != undefined && this.addressinfo.DISTRICT != "" &&
          this.addressinfo.LANDMARK != undefined && this.addressinfo.LANDMARK != "" &&
          this.addressinfo.PINCODE != undefined && this.addressinfo.PINCODE != "" &&
          this.addressinfo.TALUKA != undefined && this.addressinfo.TALUKA != "" &&
          this.addressinfo.STATE != undefined &&  this.addressinfo.STATE != "" &&
          this.addressinfo.VILLAGE != undefined &&  this.addressinfo.VILLAGE != "" 
        ) {
          if (
            this.addressinfo.HOUSE_NO.trim() != '' &&
            this.addressinfo.BUILDING.trim() != '' &&
            this.addressinfo.DISTRICT.trim() != '' &&
            this.addressinfo.LANDMARK.trim() != '' &&
            this.addressinfo.TALUKA.trim() != '' &&
            this.addressinfo.STATE.trim() != '' &&
            this.addressinfo.VILLAGE.trim() != ''
          ) { } else {
            isOk = false;
            this.message.error(this.api.translate.instant('add-sales-info.message1'), "");
          }
          if ((/^[1-9]{1}[0-9]{5}$/).test(this.addressinfo.PINCODE.toString()) == false) {
            isOk = false;
            this.message.error(this.api.translate.instant('add-sales-info.message2'), "");
          } 
        }else {
          isOk = false;
          this.message.error(this.api.translate.instant('add-sales-info.message3'), "");
        }
      }


      if(this.data.IS_SALE_DIRECT_TO_CUSTOMER)
      {
        if(this.data.CUSTOMER_DETAILS==undefined || this.data.CUSTOMER_DETAILS=="") 
        {
          isOk=false
          this.message.error(this.api.translate.instant('add-sales-info.message4'), "");
        }
       
      }

      if(this.data.IS_EXPORT_SALES)
      {
        if(this.data.EXPORT_DETAILS==undefined || this.data.EXPORT_DETAILS=="") 
        {
          isOk=false
          this.message.error(this.api.translate.instant('add-sales-info.message5'), "");
        }
       
      }
      
      if (!isOk) {
      } else {
        this.isSpinning = true;

        if(this.type=="B")
        {
          //console.log(this.data)
          this.data.ADDRESS=[]
          this.addressinfo.CLIENT_ID=this.api.clientId
          this.addressinfo.ID=0
          this.data.SHOWROOM_OR_DEPO_ADDRESS=Object.assign({}, this.addressinfo)
          this.nextProcess(addNew);
        }
        else
        {
        if (this.data.SHOWROOM_OR_DEPO_ADDRESS_ID) {

         
            this.api.updateAddressInformation(this.addressinfo)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                this.nextProcess(addNew);
              } else {
                this.message.error(this.api.translate.instant('add-sales-info.message6'), "");
                this.isSpinning = false;
              }
            });
          


        
        } else {

            this.api.createAddressInformation(this.addressinfo)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                this.data.SHOWROOM_OR_DEPO_ADDRESS_ID = successCode['data'][0].ID;
                this.nextProcess(addNew);
              } else {
                this.message.error(this.api.translate.instant('add-sales-info.message6'), "");
                this.isSpinning = false;
              }
            });
          }
        }
      }
   
  }

  nextProcess(addNew) {
    if (this.data.ID) {

      if(this.type=="B")
      {
        this.isSpinning = false;
        this.drawerClose()
      }
      else
      {

      this.api.updateManagementOfSalesInformation(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('add-sales-info.message7'), "");

            this.logtext = 'Update & Close - ManagementOfSalesInformation form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - ManagementOfSalesInformation ]";
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

            this.logtext = 'Update & Close - ManagementOfSalesInformation form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - ManagementOfSalesInformation ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });

            this.message.error(this.api.translate.instant('add-sales-info.message8'), "");
            this.isSpinning = false;
          }
        });
      }
    }
    else {
      //console.log("this.type" + this.type)
      if(this.type=="B")
      {
        if (!addNew) {
          this.data.ID=this.i
          this.data.CLIENT_ID=this.api.clientId
          this.data.BUSINESS_FIRM_INFORMATION_ID=0
          // this.data.IS_SHOWROOM_OR_DEPO_OWNED==true?1:0
          // this.data.IS_SALE_DIRECT_TO_CUSTOMER==true?1:0
          // this.data.IS_EXPORT_SALES==true?1:0
          this.data.PROPOSAL_ID=this.PROPOSAL_ID
          //console.log(this.data)
          this.dataList.push(Object.assign({}, this.data));
          this.i++
        this.drawerClose()
        }
        else
        {
          this.data.ID=this.i
          this.data.CLIENT_ID=this.api.clientId
          this.data.BUSINESS_FIRM_INFORMATION_ID=0
          // this.data.IS_SHOWROOM_OR_DEPO_OWNED==true?1:0
          // this.data.IS_SALE_DIRECT_TO_CUSTOMER==true?1:0
          // this.data.IS_EXPORT_SALES==true?1:0
          this.data.PROPOSAL_ID=this.PROPOSAL_ID
          //console.log(this.data)
          this.dataList.push(Object.assign({}, this.data));
          this.i++
          this.data = new ManagementOfSalesInformation();
        }
        this.isSpinning = false;

      }
      else
      {
      this.api.createManagementOfSalesInformation(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('add-sales-info.message9'), "");

            if (!addNew) {
              this.drawerClose();

              this.logtext = 'Save & Close - ManagementOfSalesInformation form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - ManagementOfSalesInformation ]";
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
              this.data = new ManagementOfSalesInformation();
              this.setValues();
              this.logtext = 'Save & New - ManagementOfSalesInformation form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - ManagementOfSalesInformation ]";
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
            this.message.error(this.api.translate.instant('add-sales-info.message10'), "");
            this.isSpinning = false;
            this.logtext = 'Save & Close - ManagementOfSalesInformation form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - ManagementOfSalesInformation ]";
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
  switch2(){
    if(this.data.IS_EXPORT_SALES )
    this.data.EXPORT_DETAILS = '';
  }

  switch () {
    if(this.data.IS_SALE_DIRECT_TO_CUSTOMER )
    this.data.CUSTOMER_DETAILS = '';
  }

  setValues() {
    this.data.AGENT_NAME = '' ;
    this.data.IS_EXPORT_SALES = false;
    this.data.IS_SALE_DIRECT_TO_CUSTOMER = false; 
    this.data.IS_SHOWROOM_OR_DEPO_OWNED = false ;
    this.data.CUSTOMER_DETAILS = '';
    this.data.EXPORT_DETAILS = '';

    this.addressinfo.LANDMARK= '' ;
    this.addressinfo.BUILDING= '' ;
    this.addressinfo.HOUSE_NO= '' ;
    this.addressinfo.VILLAGE= '' ;
    this.addressinfo.TALUKA= '' ;
    this.addressinfo.DISTRICT= '' ;
    this.addressinfo.STATE= '' ;
    this.addressinfo.PINCODE= '' ;
  }
}