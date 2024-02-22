import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { DatePipe } from '@angular/common';
import { RealEstateResidential } from 'src/app/Models/PersonalProposal/real-estate-residential';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { ApiService } from 'src/app/Service/api.service';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
@Component({
  selector: 'app-realestate-residential',
  templateUrl: './realestate-residential.component.html',
  styleUrls: ['./realestate-residential.component.css']
})
export class RealestateResidentialComponent implements OnInit {

  @Input() PROPOSAL_ID: number;
  data: RealEstateResidential = new RealEstateResidential();
  addressinfo: Addressinfo = new Addressinfo();
  isSpinning = false
  logtext: string = "";
  pipe = new DatePipe('en-US');
  isButtonSpinning: boolean = false;
  numberOfCharacters1 = 0;
  numberOfCharacters2 = 0;
  @Output() demo: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() CURRENT_STAGE_ID: number;
  @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();

  constructor(private api: ApiService, private message: NzNotificationService) {
  }
  wordCounter(textValue: string): void {
    this.numberOfCharacters1 = textValue.length;
  }
  wordCounter2(textValue: string): void {
    this.numberOfCharacters2 = textValue.length;
  }
  ngOnInit() {
    this.getdata();
  }
  focusss1(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.TENTETIVE_POSSESSION_DATE = undefined;
    }
  }
  focusss(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.VALUATION_DATE = undefined;
    }
  }
  focusss2(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.VALUATION_AMOUNT = undefined;
    }
  }
  getdata() {
    this.isSpinning = false;
    this.api.getAllRealEstateResidentialLoan(0, 0, 'ID', "asc", "AND PROPOSAL_ID=" + this.PROPOSAL_ID).subscribe(data => {
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
  disabledDate3 = (current) => {
    return new Date() < current;
  }
  save(): void {
    var isOk = true;

    if (this.data.PURPOSE_OF_LOAN == undefined || this.data.PURPOSE_OF_LOAN.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('common.message.error.loanreason'), "");
    } else {
      if (this.data.NATURE_OF_PROPERTY == undefined || this.data.NATURE_OF_PROPERTY == ' ') {
        this.data.NATURE_OF_PROPERTY = '';
        }

      //   if (this.data.AGREEMENT_VALUE == undefined || this.data.AGREEMENT_VALUE == 0 || this.data.AGREEMENT_VALUE.toString().trim() == '') {
      //     isOk = false;
      //     this.message.error(this.api.translate.instant('realestate-residential.message3'), "");
      //   }

      //   if (this.data.CARPET_AREA == undefined || this.data.CARPET_AREA == 0 || this.data.CARPET_AREA.toString().trim() == '') {
      //     isOk = false;
      //     this.message.error(this.api.translate.instant('realestate-residential.message4'), "");
      //   }

      //   if (this.data.SELLABLE_AREA == undefined || this.data.SELLABLE_AREA == 0 || this.data.SELLABLE_AREA.toString().trim() == '') {
      //     isOk = false;
      //     this.message.error(this.api.translate.instant('realestate-residential.message5'), "");
      //   }

      //   if (this.data.TENTETIVE_POSSESSION_DATE == undefined || this.data.TENTETIVE_POSSESSION_DATE == '') {
      //     isOk = false;
      //     this.message.error(this.api.translate.instant('realestate-residential.message6'), "");
      //   } else {
      //     this.data.TENTETIVE_POSSESSION_DATE = this.pipe.transform(this.data.TENTETIVE_POSSESSION_DATE, 'yyyy-MM-dd');
      //   }
      //   if (this.data.IS_PAID_ADVANCE_AMOUNT) {
      //     if (this.data.ADVANCE_PAYMENT == undefined || this.data.ADVANCE_PAYMENT == 0 || this.data.ADVANCE_PAYMENT.toString().trim() == '') {
      //       isOk = false;
      //       this.message.error(this.api.translate.instant('realestate-residential.message7'), "");
      //     }
      //   } else {
      //     this.data.ADVANCE_PAYMENT = 0
      //   }


      //   if (this.data.PER_SQ_FEET_RATE == undefined || this.data.PER_SQ_FEET_RATE == 0 || this.data.PER_SQ_FEET_RATE.toString().trim() == '') {
      //     isOk = false;
      //     this.message.error(this.api.translate.instant('realestate-residential.message8'), "");
      //   }

      // }

      // if (this.data.PURPOSE_OF_LOAN == '2' || this.data.PURPOSE_OF_LOAN == '4' || this.data.PURPOSE_OF_LOAN == '5') {
      //   if (this.data.PROPERY_VALUE == undefined || this.data.PROPERY_VALUE == 0 || this.data.PROPERY_VALUE.toString().trim() == '') {
      //     isOk = false;
      //     this.message.error(this.api.translate.instant('realestate-residential.message9'), "");
      //   }
      // }
      // if (this.data.PURPOSE_OF_LOAN == '2') {
      //   if (this.data.IS_VALUATION_DONE) {
      //     if (this.data.VALUATOR_NAME == undefined || this.data.VALUATOR_NAME.trim() == '') {
      //       isOk = false;
      //       this.message.error(this.api.translate.instant('common.message.error.valuator'), "");
      //     }

      //     if (this.data.VALUATION_AMOUNT == undefined || this.data.VALUATION_AMOUNT == 0 || this.data.VALUATION_AMOUNT.toString().trim() == '') {
      //       isOk = false;
      //       this.message.error(this.api.translate.instant('common.message.error.valuatorprice'), "");
      //     }

      //     if (this.data.VALUATION_DATE == undefined || this.data.VALUATION_DATE == '') {
      //       isOk = false;
      //       this.message.error(this.api.translate.instant('common.message.error.valuatordate'), "");
      //     } else {
      //       this.data.VALUATION_DATE = this.pipe.transform(this.data.VALUATION_DATE, 'yyyy-MM-dd');
      //     }
      //   } else {

      //     this.data.VALUATION_AMOUNT = 0
      //     this.data.VALUATOR_NAME = " "
      //     this.data.VALUATION_DATE = ""
      //   }
      // }

      if (this.data.PURPOSE_OF_LOAN == '1') {
        if (this.data.TOTAL_CONSTRUCTION_AREA == undefined || this.data.TOTAL_CONSTRUCTION_AREA == 0 || this.data.TOTAL_CONSTRUCTION_AREA.toString().trim() == '') {
          isOk = false;
          this.message.error(this.api.translate.instant('realestate-residential.message13'), "");
        }
        if (this.data.NAME_OF_BUILDER_DEVELOPER == undefined || this.data.NAME_OF_BUILDER_DEVELOPER == '') {
          isOk = false;
          this.message.error(this.api.translate.instant('realestate-residential.message14'), "");
        }
        if (this.data.CONSTRUCTION_MATERIAL_DETAILS == undefined || this.data.CONSTRUCTION_MATERIAL_DETAILS == '') {
          isOk = false;
          this.message.error(this.api.translate.instant('realestate-residential.CONSTRUCTION_MATERIAL_DETAILSerr'), "");
        }
        if (this.data.AKAR_RS == undefined || this.data.AKAR_RS == 0 || this.data.AKAR_RS.toString().trim() == '') {
          isOk = false;
          this.message.error(this.api.translate.instant('realestate-residential.AKARerr'), "");
        }
        if (this.data.TOTAL_CONSTRUCTION_COST == undefined || this.data.TOTAL_CONSTRUCTION_COST == 0 || this.data.TOTAL_CONSTRUCTION_COST.toString().trim() == '') {
          isOk = false;
          this.message.error(this.api.translate.instant('realestate-residential.message15'), "");
        }
        if (this.data.EXPECTED_COMPLETION_TIME == undefined || this.data.EXPECTED_COMPLETION_TIME == 0 || this.data.EXPECTED_COMPLETION_TIME.toString().trim() == '') {
          isOk = false;
          this.message.error(this.api.translate.instant('realestate-residential.message16'), "");
        }

        if (this.data.EAST == undefined || this.data.EAST.toString().trim() == '' ||
          this.data.WEST == undefined || this.data.WEST.toString().trim() == '' ||
          this.data.SOUTH == undefined || this.data.SOUTH.toString().trim() == '' ||
          this.data.NORTH == undefined || this.data.NORTH.toString().trim() == '') {
          isOk = false;

        }
      }

      if (this.data.PURPOSE_OF_LOAN == '1' || this.data.PURPOSE_OF_LOAN == '2' || this.data.PURPOSE_OF_LOAN == '5') {
        if (this.data.PLOT_AREA == undefined || this.data.PLOT_AREA == 0 || this.data.PLOT_AREA.toString().trim() == '') {
          isOk = false;
          // if (this.data.PURPOSE_OF_LOAN == '5')
          //   this.message.error(this.api.translate.instant('realestate-residential.message17'), "");
          // else
            this.message.error(this.api.translate.instant('realestate-residential.message18'), "");
        }
      }

      if (this.data.PURPOSE_OF_LOAN == '5' || this.data.PURPOSE_OF_LOAN == '3' || this.data.PURPOSE_OF_LOAN == '1' || (this.data.TYPE_OF_PROPERTY == 'R' && (this.data.PURPOSE_OF_LOAN == '2' || this.data.PURPOSE_OF_LOAN == '4'))) {
        // if (this.data.OWNER_NAME == undefined || this.data.OWNER_NAME.trim() == '') {
        //   isOk = false;
        this.data.OWNER_NAME = " "
          // if (this.data.PURPOSE_OF_LOAN == '2' || this.data.PURPOSE_OF_LOAN == '4') {
          //   this.message.error(this.api.translate.instant('realestate-residential.message19'), "");
          // }
          // if (this.data.PURPOSE_OF_LOAN == '1') {
          //   this.message.error(this.api.translate.instant('realestate-residential.message20'), "");
          // }
          // if (this.data.PURPOSE_OF_LOAN == '5' || this.data.PURPOSE_OF_LOAN == '3') {
          //   this.message.error(this.api.translate.instant('realestate-residential.message21'), "");
          // }
        // }
      }

      // if (this.data.PURPOSE_OF_LOAN == '3') {
      //   if (this.data.ESTIMATION_DETAILS == undefined || this.data.ESTIMATION_DETAILS.trim() == '') {
      //     isOk = false;
      //     this.message.error(this.api.translate.instant('realestate-residential.message22'), "");
      //   }

      //   if (this.data.COST_OF_REPAIRY == undefined || this.data.COST_OF_REPAIRY == 0 || this.data.COST_OF_REPAIRY.toString().trim() == '') {
      //     isOk = false;
      //     this.message.error(this.api.translate.instant('realestate-residential.message23'), "");
      //   }
      // }

      // if (this.data.PURPOSE_OF_LOAN == '5' && this.data.IS_ANY_EXISTING_LOAN) {
      //   if (this.data.TOTAL_AMOUNT_OF_DEBTS == undefined || this.data.TOTAL_AMOUNT_OF_DEBTS == 0 || this.data.TOTAL_AMOUNT_OF_DEBTS.toString().trim() == '') {
      //     isOk = false;
      //     this.message.error(this.api.translate.instant('realestate-residential.message24'), "");
      //   }

      // }
      // if (this.data.PURPOSE_OF_LOAN == '5') {
      //   // if (this.data.IS_DEBT_AMOUNT_PAYABLE_TO_OTHER_BANK) {
      //   //   if (this.data.EXISTING_LOAN_AMOUNT == undefined || this.data.EXISTING_LOAN_AMOUNT == 0 || this.data.EXISTING_LOAN_AMOUNT.toString().trim() == '') {
      //   //     isOk = false;
      //   //     this.message.error("बँकेचे/संस्थेचे देय रक्कम नमूद करा", "");
      //   //   }
      //   // }
      //   this.data.IS_DEBT_AMOUNT_PAYABLE_TO_OTHER_BANK = false;
      //   this.data.EXISTING_LOAN_AMOUNT = 0
      //   if (this.data.PLEDGED_TYPE == undefined || this.data.PLEDGED_TYPE.trim() == '') {
      //     isOk = false;
      //     this.message.error(this.api.translate.instant('realestate-residential.message25'), "");
      //   }
      //   if (this.data.IS_VALUATION_DONE) {
      //     if (this.data.VALUATOR_NAME == undefined || this.data.VALUATOR_NAME.trim() == '') {
      //       isOk = false;
      //       this.message.error(this.api.translate.instant('common.message.error.valuator'), "");
      //     }

      //     if (this.data.VALUATION_AMOUNT == undefined || this.data.VALUATION_AMOUNT == 0 || this.data.VALUATION_AMOUNT.toString().trim() == '') {
      //       isOk = false;
      //       this.message.error(this.api.translate.instant('common.message.error.valuatorprice'), "");
      //     }

      //     if (this.data.VALUATION_DATE == undefined || this.data.VALUATION_DATE == '') {
      //       isOk = false;
      //       this.message.error(this.api.translate.instant('common.message.error.valuatordate'), "");
      //     } else {
      //       this.data.VALUATION_DATE = this.pipe.transform(this.data.VALUATION_DATE, 'yyyy-MM-dd');
      //     }
      //   } else {

      //     this.data.VALUATION_AMOUNT = 0
      //     this.data.VALUATOR_NAME = " "
      //     this.data.VALUATION_DATE = ""
      //   }
      // }

      // if (this.data.PURPOSE_OF_LOAN == '4') {
      //   if (this.data.TYPE_OF_PROPERTY == 'R') {
      //     if (this.data.BOOKED_FLAT_NUMBER == undefined || this.data.BOOKED_FLAT_NUMBER == 0 || this.data.BOOKED_FLAT_NUMBER.toString().trim() == '') {
      //       isOk = false;
      //       this.message.error(this.api.translate.instant('realestate-residential.message29'), "");
      //     }
      //   }
      //   if (this.data.IS_VALUATION_DONE) {
      //     if (this.data.VALUATOR_NAME == undefined || this.data.VALUATOR_NAME.trim() == '') {
      //       isOk = false;
      //       this.message.error(this.api.translate.instant('common.message.error.valuator'), "");
      //     }

      //     if (this.data.VALUATION_AMOUNT == undefined || this.data.VALUATION_AMOUNT == 0 || this.data.VALUATION_AMOUNT.toString().trim() == '') {
      //       isOk = false;
      //       this.message.error(this.api.translate.instant('common.message.error.valuatorprice'), "");
      //     }

      //     if (this.data.VALUATION_DATE == undefined || this.data.VALUATION_DATE == '') {
      //       isOk = false;
      //       this.message.error(this.api.translate.instant('common.message.error.valuatordate'), "");
      //     } else {
      //       this.data.VALUATION_DATE = this.pipe.transform(this.data.VALUATION_DATE, 'yyyy-MM-dd');
      //     }
      //   } else {

      //     this.data.VALUATION_AMOUNT = 0
      //     this.data.VALUATOR_NAME = " "
      //     this.data.VALUATION_DATE = ""
      //   }
      // }


      // if (this.data.PURPOSE_OF_LOAN != '2') {
        if(this.addressinfo.HOUSE_NO == undefined ) this.addressinfo.HOUSE_NO = "";  
        if (this.addressinfo.BUILDING == undefined ) this.addressinfo.BUILDING  = ""
        if (this.addressinfo.LANDMARK == undefined ) this.addressinfo.LANDMARK  = ""; 
      if ( 
        this.addressinfo.DISTRICT != undefined && 
        this.addressinfo.PINCODE != undefined &&
        this.addressinfo.TALUKA != undefined &&
        this.addressinfo.STATE != undefined &&
        this.addressinfo.VILLAGE != undefined
      ) {
        if (
           
          this.addressinfo.DISTRICT.trim() != '' && 
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
      } else {
        isOk = false;
        this.message.error(this.api.translate.instant('common.message.error.address'), "");
      }
      // }
    }

    if (isOk) {
      this.data.PROPOSAL_ID = this.PROPOSAL_ID;
      this.isButtonSpinning = true;
      // //console.log(this.data)
      // if (this.data.PURPOSE_OF_LOAN != '2') {
      if (this.data.ADDRESS_ID != undefined && this.data.ADDRESS_ID > 0) {
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
      // } else {
      //   this.data.ADDRESS_ID = 0;
      //   this.nextProcess();
      // }
    } else {
      this.message.error(this.api.translate.instant('common.message.error.compinfo2'), "");
    }
  }

  nextProcess() {
    if (this.data.PURPOSE_OF_LOAN == '4') { } else {
      this.data.BOOKED_FLAT_NUMBER = 0;
    }

    if (this.data.PURPOSE_OF_LOAN == '5' && this.data.IS_ANY_EXISTING_LOAN) { } else {
      this.data.TOTAL_AMOUNT_OF_DEBTS = 0
    }

    if (this.data.PURPOSE_OF_LOAN == '3') { } else {
      this.data.ESTIMATION_DETAILS = " "
      this.data.COST_OF_REPAIRY = 0
    }

    if (this.data.PURPOSE_OF_LOAN == '5' || this.data.PURPOSE_OF_LOAN == '3' || this.data.PURPOSE_OF_LOAN == '1' || (this.data.TYPE_OF_PROPERTY == 'R' && (this.data.PURPOSE_OF_LOAN == '2' || this.data.PURPOSE_OF_LOAN == '4'))) { } else {
      this.data.OWNER_NAME = " "
    }

    if (this.data.PURPOSE_OF_LOAN == '1' || this.data.PURPOSE_OF_LOAN == '2' || this.data.PURPOSE_OF_LOAN == '5') { } else {
      this.data.PLOT_AREA = 0;
    }

    if (this.data.PURPOSE_OF_LOAN == '1') { } else {
      this.data.EXPECTED_COMPLETION_TIME = 0
      this.data.TOTAL_CONSTRUCTION_COST = 0
      this.data.TOTAL_CONSTRUCTION_AREA = 0
    }
    if (this.data.PURPOSE_OF_LOAN == '2' || this.data.PURPOSE_OF_LOAN == '4') { } else {
      this.data.PER_SQ_FEET_RATE = 0;
      this.data.ADVANCE_PAYMENT = 0;
      this.data.TENTETIVE_POSSESSION_DATE = null
      this.data.SELLABLE_AREA = 0;
      this.data.CARPET_AREA = 0;
      this.data.AGREEMENT_VALUE = 0;
    }

    if (this.data.PURPOSE_OF_LOAN == '2' || this.data.PURPOSE_OF_LOAN == '4' || this.data.PURPOSE_OF_LOAN == '5') { } else {
      this.data.PROPERY_VALUE = 0
    }


    if (this.data.ID) {
      //console.log(this.data)
      this.api.updateRealEstateResidentialLoan(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

            this.logtext = 'Update & Close - RealEstate-Residencial form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - RealEstate-Residencial ]";
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

      this.api.createRealEstateResidentialLoan(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('common.message.success.addinfo2'), "")
            this.indexChanged.emit(1)

            this.logtext = 'Save & New - RealEstate-Residencial form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - RealEstate-Residencial ]";
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
            this.logtext = 'Save & Close - RealEstate-Residencial form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - RealEstate-Residencial ]";
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