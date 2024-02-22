import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { DatePipe } from '@angular/common';
import { Resincom } from 'src/app/Models/PersonalProposal/resincom';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { ApiService } from 'src/app/Service/api.service';
@Component({
  selector: 'app-realestate-resincom',
  templateUrl: './realestate-resincom.component.html',
  styleUrls: ['./realestate-resincom.component.css']
})
export class RealestateResincomComponent implements OnInit {

  @Input() PROPOSAL_ID: number;
  data: Resincom = new Resincom();
  addressinfo: Addressinfo = new Addressinfo();
  isSpinning = false
  isButtonSpinning= false
  logtext: string = "";
  pipe = new DatePipe('en-US');
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();

  constructor(private api: ApiService, private message: NzNotificationService) {
  }

  ngOnInit() {
    this.getdata();
  }

  getdata() {
    this.isSpinning = true;
    this.api.getAllRealEstateResidentialComercialLoanInformation(0, 0, 'ID', "asc", "AND PROPOSAL_ID=" + this.PROPOSAL_ID).subscribe(data => {
      this.isSpinning = false;
      if (data['code'] == '200' && data['count'] > 0) {
        this.data = data['data'][0];
        if (this.data.ADDRESS_ID > 0)
          this.getaddressData(this.data.ADDRESS_ID);
      }
    }, err => {
      //console.log(err);
    });
  }
  disabledDate3= (current) => {
    return new Date() < current;
  }
  getaddressData(ID) {
    this.api.getAllAddressInformation(0, 0, "ID", "asc", "AND ID =" + ID)
      .subscribe(data => {
        this.addressinfo = new Addressinfo();
        if (data['code'] == "200" && data['count'] > 0) {
          this.addressinfo = data['data'][0];
        }
      }, err => {
        //console.log(err);
      });
  }

  disabledDate = (current) => {
    return new Date() < current;
  }

  save(): void {
    var isOk = true;

    if (this.data.OWNER_NAME == undefined || this.data.OWNER_NAME.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('realestate-resincom.message1'), "");
    }

    if (this.data.AREA_OF_PROPERTY == undefined || this.data.AREA_OF_PROPERTY == 0 || this.data.AREA_OF_PROPERTY.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('realestate-resincom.message2'), "");
    }
    if (this.data.PROPERY_VALUE == undefined || this.data.PROPERY_VALUE == 0 || this.data.PROPERY_VALUE.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('realestate-resincom.message3'), "");
    }
    if (this.data.IS_ANY_EXISTING_LOAN) {
      if (this.data.TOTAL_AMOUNT_OF_DEBTS == undefined || this.data.TOTAL_AMOUNT_OF_DEBTS == 0 || this.data.TOTAL_AMOUNT_OF_DEBTS.toString().trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('realestate-resincom.message4'), "");
      }
    } else {
      this.data.TOTAL_AMOUNT_OF_DEBTS = 0.0 ;
    }

    // if (this.data.IS_DEBT_AMOUNT_PAYABLE_TO_OTHER_BANK) {
    //   if (this.data.PAYABLE_AMOUNT == undefined || this.data.PAYABLE_AMOUNT == 0 || this.data.PAYABLE_AMOUNT.toString().trim() == '') {
    //     isOk = false;
    //     this.message.error("बँकेचे/संस्थेचे देय रक्कम नमूद करा", "");
    //   }
    // } else {
    //   this.data.PAYABLE_AMOUNT = 0.0 ;
    // }
    if (this.data.IS_VALUATION_DONE) {
      if (this.data.VALUATOR_NAME == undefined || this.data.VALUATOR_NAME.trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('realestate-resincom.message5'), "");
      }

      if (this.data.VALUATION_AMOUNT == undefined || this.data.VALUATION_AMOUNT == 0 || this.data.VALUATION_AMOUNT.toString().trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('realestate-resincom.message6'), "");
      }

      if (this.data.VALUATION_DATE == undefined || this.data.VALUATION_DATE == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('realestate-resincom.message7'), "");
      } else {
        this.data.VALUATION_DATE = this.pipe.transform(this.data.VALUATION_DATE, 'yyyy-MM-dd');
      }
    } else {

      this.data.VALUATION_AMOUNT = 0
      this.data.VALUATOR_NAME = " "
      this.data.VALUATION_DATE = ""
    }
    if (
      this.addressinfo.HOUSE_NO != undefined &&
      this.addressinfo.BUILDING != undefined &&
      this.addressinfo.DISTRICT != undefined &&
      this.addressinfo.LANDMARK != undefined &&
      this.addressinfo.PINCODE != undefined &&
      this.addressinfo.TALUKA != undefined &&
      this.addressinfo.STATE != undefined &&
      this.addressinfo.VILLAGE != undefined
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
        this.message.error(this.api.translate.instant('realestate-resincom.message8'), "");
      }
      if ((/^[1-9]{1}[0-9]{5}$/).test(this.addressinfo.PINCODE.toString()) == false) {
        isOk = false;
        this.message.error(this.api.translate.instant('realestate-resincom.message9'), "");
      }
    }else {
      isOk = false;
      this.message.error(this.api.translate.instant('realestate-resincom.message10'), "");
    }

    
    if (isOk) {
      this.data.PROPOSAL_ID = this.PROPOSAL_ID;
      this.isButtonSpinning = true;
      if (this.data.ADDRESS_ID) {
        this.api.updateAddressInformation(this.addressinfo)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.nextProcess();
            } else {
              this.message.error(this.api.translate.instant('realestate-resincom.message11'), "");
              this.isButtonSpinning = false;
            }
          });
      } else {
        this.api.createAddressInformation(this.addressinfo)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.data.ADDRESS_ID = successCode['data'][0].ID;
              this.nextProcess();
            } else {
              this.message.error(this.api.translate.instant('realestate-resincom.message12'), "");
              this.isButtonSpinning = false;
            }
          });
      }

    }
  }
  focusss(event: KeyboardEvent)
  {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.VALUATION_DATE = undefined;
    }
  }
  nextProcess() {
    this.data.IS_DEBT_AMOUNT_PAYABLE_TO_OTHER_BANK = false;
    this.data.PAYABLE_AMOUNT = 0;
    if (this.data.ID) {
      this.api.updateRealEstateResidentialComercialLoanInformation(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('realestate-resincom.message13'), "");

            this.logtext = 'Update & Close - RealEstate-Residencial&Commercial form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - RealEstate-Residencial&Commercial ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });
            this.getdata();
            this.isButtonSpinning = false;
          }
          else {
            this.message.error(this.api.translate.instant('realestate-resincom.message14'), "");
            this.isButtonSpinning = false;
          }
        });
    }
    else {

      this.api.createRealEstateResidentialComercialLoanInformation(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('realestate-resincom.message15'), "")
            this.indexChanged.emit(1)
          
            this.logtext = 'Save & New - RealEstate-Residencial&Commercial form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - RealEstate-Residencial&Commercial ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });

            this.getdata();
            this.isButtonSpinning = false;
          }
          else {
            this.message.error(this.api.translate.instant('realestate-resincom.message16'), "");
            this.isButtonSpinning = false;
            this.logtext = 'Save & Close - RealEstate-Residencial&Commercial form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - RealEstate-Residencial&Commercial ]";
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