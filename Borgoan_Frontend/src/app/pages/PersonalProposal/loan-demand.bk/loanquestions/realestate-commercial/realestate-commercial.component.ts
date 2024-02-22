import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { DatePipe } from '@angular/common';
import { RealEstateCommercial } from 'src/app/Models/PersonalProposal/real-estate-commercial';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { ApiService } from 'src/app/Service/api.service';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
@Component({
  selector: 'app-realestate-commercial',
  templateUrl: './realestate-commercial.component.html',
  styleUrls: ['./realestate-commercial.component.css']
})
export class RealestateCommercialComponent implements OnInit {

  @Input() PROPOSAL_ID: number ;
  data: RealEstateCommercial = new RealEstateCommercial();
  addressinfo: Addressinfo = new Addressinfo();
  isSpinning = false
  isButtonSpinning = false
  logtext: string = "";
  pipe = new DatePipe('en-US');
  @Output() demo : EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();
  @Input() CURRENT_STAGE_ID: number;  @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  constructor(private api: ApiService, private message: NzNotificationService) {
  }

  ngOnInit() {
    this.getdata();
  }
  focusss(event: KeyboardEvent){
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.TENTETIVE_POSSESSION_DATE = undefined;
    }
  }
  focusss2(event: KeyboardEvent){
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.VALUATION_DATE = undefined;
    }
  }
  getdata() {
    this.isSpinning = true;
    this.api.getAllRealEstateComercialLoan(0, 0, 'ID', "asc", "AND PROPOSAL_ID=" + this.PROPOSAL_ID).subscribe(data => {
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
    return new Date() > current;
  }
  disabledDate3= (current) => {
    return new Date() < current;
  }
  save(): void {
    var isOk = true;

    if (this.data.PURPOSE_OF_LOAN == undefined || this.data.PURPOSE_OF_LOAN.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('common.message.error.loanreason'), "");
    }
    if (this.data.TYPE_OF_PROPERTY == undefined || this.data.TYPE_OF_PROPERTY.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('realestate-commercial.message1'), "");
    }
    if (this.data.CARPET_AREA == undefined || this.data.CARPET_AREA == 0 || this.data.CARPET_AREA.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('realestate-commercial.message2'), "");
    }

    if (this.data.SELLABLE_AREA == undefined || this.data.SELLABLE_AREA == 0 || this.data.SELLABLE_AREA.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('realestate-commercial.message3'), "");
    }

    if (this.data.TENTETIVE_POSSESSION_DATE == undefined || this.data.TENTETIVE_POSSESSION_DATE == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('realestate-commercial.message4'), "");
    } else{
      this.data.TENTETIVE_POSSESSION_DATE = this.pipe.transform(this.data.TENTETIVE_POSSESSION_DATE, 'yyyy-MM-dd');
    }

    if (this.data.AGREEMENT_VALUE == undefined || this.data.AGREEMENT_VALUE == 0 || this.data.AGREEMENT_VALUE.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('realestate-commercial.message5'), "");
    }

    if (this.data.PROPERY_VALUE == undefined || this.data.PROPERY_VALUE == 0 || this.data.PROPERY_VALUE.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('realestate-commercial.message6'), "");
    }

    if (this.data.PER_SQ_FEET_RATE == undefined || this.data.PER_SQ_FEET_RATE == 0 || this.data.PER_SQ_FEET_RATE.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('realestate-commercial.message7'), "");
    }
    if (this.data.IS_PAID_ADVANCE_AMOUNT){
    if (this.data.ADVANCE_PAYMENT == undefined || this.data.ADVANCE_PAYMENT == 0 || this.data.ADVANCE_PAYMENT.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('realestate-commercial.message8'), "");
    }
  }else{
    this.data.ADVANCE_PAYMENT =0 
  }

    if (this.data.BOOKED_SHOP_OR_OFFICE_NUMBER == undefined || this.data.BOOKED_SHOP_OR_OFFICE_NUMBER == 0 || this.data.BOOKED_SHOP_OR_OFFICE_NUMBER.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('realestate-commercial.message9'), "");
    }
    if (this.data.IS_VALUATION_DONE) {
      if (this.data.VALUATOR_NAME == undefined || this.data.VALUATOR_NAME.trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('common.message.error.valuator'), "");
      }

      if (this.data.VALUATION_AMOUNT == undefined || this.data.VALUATION_AMOUNT == 0 || this.data.VALUATION_AMOUNT.toString().trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('common.message.error.valuatorprice'), "");
      }

      if (this.data.VALUATION_DATE == undefined || this.data.VALUATION_DATE == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('common.message.error.valuatordate'), "");
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
        this.message.error(this.api.translate.instant('common.message.error.address'), "");
      }
      if ((/^[1-9]{1}[0-9]{5}$/).test(this.addressinfo.PINCODE.toString()) == false) {
        isOk = false;
        this.message.error(this.api.translate.instant('common.message.error.pincode3'), "");
      }
    }else {
      isOk = false;
      this.message.error(this.api.translate.instant('common.message.error.address'), "");
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
              this.message.error(this.api.translate.instant('common.message.error.updatefailed'), "");
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
              this.message.error(this.api.translate.instant('common.message.error.updatefailed'), "");
              this.isButtonSpinning = false;
            }
          });
      }

    }
  }

  nextProcess() {
    //console.log(this.data)
    if (this.data.ID) {
      this.api.updateRealEstateComercialLoan(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

            this.logtext = 'Update & Close - RealEstate-Commercial form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - RealEstate-Commercial ]";
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
            this.demo.emit(false)
            this.isButtonSpinning = false;
          }
          else {
            this.message.error(this.api.translate.instant('common.message.error.updatefailed'), "");
            this.isButtonSpinning = false;
          }
        });
    }
    else {

      this.api.createRealEstateComercialLoan(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('common.message.success.addinfo2'), "")
            this.indexChanged.emit(1)
            this.logtext = 'Save & New - RealEstate-Commercial form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - RealEstate-Commercial ]";
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
            this.demo.emit(false)
            this.isButtonSpinning = false;
          }
          else {
            this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
            this.isButtonSpinning = false;
            this.logtext = 'Save & Close - RealEstate-Commercial form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - RealEstate-Commercial ]";
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
