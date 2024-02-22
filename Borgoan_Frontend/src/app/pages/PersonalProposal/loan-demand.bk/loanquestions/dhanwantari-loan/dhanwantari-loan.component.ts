import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { DatePipe } from '@angular/common';
import { DhanwantariLoan } from 'src/app/Models/PersonalProposal/dhanwantari-loan';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { ApiService } from 'src/app/Service/api.service';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
@Component({
  selector: 'app-dhanwantari-loan',
  templateUrl: './dhanwantari-loan.component.html',
  styleUrls: ['./dhanwantari-loan.component.css']
})
export class DhanwantariLoanComponent implements OnInit {
  @Input() PROPOSAL_ID: number;
  data: DhanwantariLoan = new DhanwantariLoan();
  isSpinning = false
  all = false;
  logtext: string = "";
  pipe = new DatePipe('en-US');
  addressinfo: Addressinfo = new Addressinfo();
  isButtonSpinning = false
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();
  @Output() demo : EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() CURRENT_STAGE_ID: number;  
  @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  constructor(
    private api: ApiService,
    private message: NzNotificationService,
  ) {
  }

  ngOnInit() {
    this.getdata();
  }

  getdata() {
    this.isSpinning = true
    //console.log("dhanvanri")
    this.api.getAllDhanwantariLoan(0, 0, "ID", 'asc', "AND PROPOSAL_ID=" + this.PROPOSAL_ID).subscribe(data => {
      this.data = new DhanwantariLoan();
      //console.log(data)
      this.isSpinning = false
      if (data['code'] == '200' && data['count'] > 0) {
        this.data = data['data'][0];
        // this.data.YEAR_OF_ORIGINAL_PURCHASE = this.data.YEAR_OF_ORIGINAL_PURCHASE == ' ' ? '' : this.data.YEAR_OF_ORIGINAL_PURCHASE;
        // this.data.DATE_OF_QUOTATION = this.data.TYPE == 'U' ? '' : this.data.DATE_OF_QUOTATION;
        if (this.data.PURPOSE_OF_LOAN != undefined || this.data.PURPOSE_OF_LOAN != "") {
          // this.all = true;
        }
        if (this.data.ADDRESS_ID > 0) {
          this.getaddressData(this.data.ADDRESS_ID);
        }

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
    return new Date() < current;
  }
  focusss1(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.DATE_OF_QUOTATION = undefined;
    }
  }
  focusss2(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.DATE_OF_QUOTATION = undefined;
    }
  }
  focusss3(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.VALUATION_DATE = undefined;
    }
  }
  focusss5(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.YEAR_OF_ORIGINAL_PURCHASE = undefined;
    }
  }
  focusss6(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.YEAR_OF_ORIGINAL_PURCHASE = undefined;
    }
  }
  change() {
    if (this.data.PURPOSE_OF_LOAN == '2' || this.data.PURPOSE_OF_LOAN == '3') {
      this.data.AREA_OF_PLOT = 0
      this.data.EXPECTED_TIME_OF_CONSTRUCTION = 0
      this.data.TOTAL_AREA_OF_CONSTRUCTION = 0
      this.data.TOTAL_COST_OF_CONSTRUCTION = 0
      this.data.NAME_OF_BUILDER_DEVELOPER = " "
      this.data.ADDRESS_ID = 0
      this.data.IS_PLOT_NA_OR_NA_ORDERED = 'N'
      this.data.IS_ALL_GOVERNMENT_DUES_PAID = false
      this.data.IS_CONSTRUCTION_PLAN_READY = false
      this.data.IS_PERMISSION_OF_CONSTRUCTION = false

      if (this.data.YEAR_OF_ORIGINAL_PURCHASE.toString().length > 4) {
        this.data.YEAR_OF_ORIGINAL_PURCHASE = this.pipe.transform(this.data.YEAR_OF_ORIGINAL_PURCHASE, 'yyyy');
      }
    }

    if (this.data.PURPOSE_OF_LOAN == '1') {
      this.data.DETAILS_OF_MACHINERY = ' '
      this.data.NATURE_OF_MACHINERY = ' '
      this.data.EXPECTED_INCOME_PER_ANNUM = 0
      this.data.NAME_OF_DEALER_FIRM = ' '
      // this.data.ADVANCE_PAYMENT_TO_DEALER = 0
      this.data.AVAILABILITY = 'R'
      this.data.TYPE = 'N'
      this.data.VALIDITY = 0
      this.data.AMOUNT_OF_QUOTATION = 0.0;
      // this.data.DATE_OF_QUOTATION = null
      this.data.PURCHASE_AMOUNT = 0.0
      // this.data.YEAR_OF_ORIGINAL_PURCHASE =""
      this.data.IS_RELATED_TO_BUSINESS = false
      this.data.IS_AGREEMENT_WITH_DEALER = false
    }
  }

  save(): void {
    var isOk = true;
    if (this.data.PURPOSE_OF_LOAN == undefined || this.data.PURPOSE_OF_LOAN.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('dhanwantari-loan.message1'), "");
    } else {
      if (this.data.PURPOSE_OF_LOAN == '2' || this.data.PURPOSE_OF_LOAN == '3') {
        if (this.data.PURPOSE_OF_LOAN == '2') {
          if (this.data.DETAILS_OF_MACHINERY == undefined || this.data.DETAILS_OF_MACHINERY.trim() == '') {
            isOk = false;
            this.message.error(this.api.translate.instant('dhanwantari-loan.message2'), "");
          }
          if (this.data.NATURE_OF_MACHINERY == undefined || this.data.NATURE_OF_MACHINERY.trim() == '') {
            isOk = false;
            this.message.error(this.api.translate.instant('dhanwantari-loan.message3'), "");
          }
          if (this.data.COMPANY_OF_MACHINERY == undefined || this.data.COMPANY_OF_MACHINERY.trim() == '') {
            isOk = false;
            this.message.error(this.api.translate.instant('dhanwantari-loan.message4'), "");
          }
          if (this.data.EXPECTED_INCOME_PER_ANNUM == undefined || this.data.EXPECTED_INCOME_PER_ANNUM == 0 || this.data.EXPECTED_INCOME_PER_ANNUM.toString().trim() == '') {
            isOk = false;
            this.message.error(this.api.translate.instant('dhanwantari-loan.message5'), "");
          }

        } else {
          this.data.COMPANY_OF_MACHINERY = " "
        }


        if (this.data.PROFESSIONAL_EXPERTISE_SKILL == undefined || this.data.PROFESSIONAL_EXPERTISE_SKILL.trim() == '') {
          isOk = false;

          this.message.error(this.api.translate.instant('dhanwantari-loan.message6'), "");
        }
        if (this.data.NAME_OF_DEALER_FIRM == undefined || this.data.NAME_OF_DEALER_FIRM.trim() == '') {
          isOk = false;

          this.message.error(this.api.translate.instant('dhanwantari-loan.message7'), "");
        }
        if (this.data.IS_PAID_ADVANCE_AMOUNT) {
          if (this.data.ADVANCE_PAYMENT_TO_DEALER == undefined || this.data.ADVANCE_PAYMENT_TO_DEALER == 0 || this.data.ADVANCE_PAYMENT_TO_DEALER.toString().trim() == '') {
            isOk = false;
            this.message.error(this.api.translate.instant('dhanwantari-loan.message8'), "");
          }
        } else {
          this.data.ADVANCE_PAYMENT_TO_DEALER = 0
        }

        if (this.data.AVAILABILITY == undefined || this.data.AVAILABILITY.trim() == '') {

          if (this.data.PURPOSE_OF_LOAN == '3') {
            isOk = false;
            this.message.error(this.api.translate.instant('dhanwantari-loan.message9'), "");
          }
        }

        if (this.data.TYPE == undefined || this.data.TYPE.trim() == '') {
          isOk = false;
          if (this.data.PURPOSE_OF_LOAN == '2') {
            this.message.error(this.api.translate.instant('dhanwantari-loan.message10'), "");
          } else {
            this.message.error(this.api.translate.instant('dhanwantari-loan.message11'), "");
          }
        }

        if (this.data.VALIDITY == undefined || this.data.VALIDITY == 0 || this.data.VALIDITY.toString().trim() == '') {
          isOk = false;
          if (this.data.PURPOSE_OF_LOAN == '2') {
            this.message.error(this.api.translate.instant('dhanwantari-loan.message12'), "");
          } else {
            this.message.error(this.api.translate.instant('dhanwantari-loan.message13'), "");
          }
        }

        if (this.data.PURPOSE_OF_LOAN == '3') {
          this.data.PURCHASE_AMOUNT = 0.0
          // this.data.YEAR_OF_ORIGINAL_PURCHASE = ""
          this.data.IS_VALUATION_DONE = false
          this.data.VALUATOR_NAME == " "
          this.data.VALUATION_AMOUNT = 0
          this.data.VALUATION_DATE = null

          if (this.data.AMOUNT_OF_QUOTATION == undefined || this.data.AMOUNT_OF_QUOTATION == 0 || this.data.AMOUNT_OF_QUOTATION.toString().trim() == '') {
            isOk = false;
            if (this.data.AVAILABILITY == 'C') {
              this.message.error(this.api.translate.instant('dhanwantari-loan.message14'), "");
            }
            if (this.data.AVAILABILITY == 'R') {
              this.message.error(this.api.translate.instant('dhanwantari-loan.message15'), "");
            }
          }

          if (this.data.AVAILABILITY == 'C') {
            if (this.data.DATE_OF_QUOTATION == undefined || this.data.DATE_OF_QUOTATION == '') {
              isOk = false;
              this.message.error(this.api.translate.instant('dhanwantari-loan.message16'), "");
            } else {
              this.data.DATE_OF_QUOTATION = this.pipe.transform(this.data.DATE_OF_QUOTATION, 'yyyy-MM-dd');
            }
          }

          if (this.data.AVAILABILITY == 'R') {
            if (this.data.YEAR_OF_ORIGINAL_PURCHASE == undefined || this.data.YEAR_OF_ORIGINAL_PURCHASE == '') {
              isOk = false;
              this.message.error(this.api.translate.instant('dhanwantari-loan.message17'), "");
            } else {

            }
          }

        }

        if (this.data.PURPOSE_OF_LOAN == '2' && this.data.TYPE == 'U') {
          this.data.AMOUNT_OF_QUOTATION = 0.0;
          // this.data.DATE_OF_QUOTATION = ''
          if (this.data.PURCHASE_AMOUNT == undefined || this.data.PURCHASE_AMOUNT == 0 || this.data.PURCHASE_AMOUNT.toString().trim() == '') {
            isOk = false;
            this.message.error(this.api.translate.instant('dhanwantari-loan.message18'), "");
          }
          if (this.data.YEAR_OF_ORIGINAL_PURCHASE == undefined || this.data.YEAR_OF_ORIGINAL_PURCHASE == '') {
            isOk = false;
            this.message.error(this.api.translate.instant('dhanwantari-loan.message17'), "");
          } else {
            // this.data.YEAR_OF_ORIGINAL_PURCHASE = this.pipe.transform(this.data.YEAR_OF_ORIGINAL_PURCHASE, 'yyyy');
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


          }
        }

        if (this.data.PURPOSE_OF_LOAN == '2' && this.data.TYPE == 'N') {
          this.data.PURCHASE_AMOUNT = 0.0
          // this.data.YEAR_OF_ORIGINAL_PURCHASE = ""
          if (this.data.AMOUNT_OF_QUOTATION == undefined || this.data.AMOUNT_OF_QUOTATION == 0 || this.data.AMOUNT_OF_QUOTATION.toString().trim() == '') {
            isOk = false;
            this.message.error(this.api.translate.instant('dhanwantari-loan.message19'), "");
          }

          if (this.data.DATE_OF_QUOTATION == undefined || this.data.DATE_OF_QUOTATION == '') {
            isOk = false;
            this.message.error(this.api.translate.instant('dhanwantari-loan.message20'), "");
          } else {
            this.data.DATE_OF_QUOTATION = this.pipe.transform(this.data.DATE_OF_QUOTATION, 'yyyy-MM-dd');
          }

        }
      }

      if (this.data.PURPOSE_OF_LOAN == '1') {
        if (this.data.AREA_OF_PLOT == undefined || this.data.AREA_OF_PLOT == 0 || this.data.AREA_OF_PLOT.toString().trim() == '') {
          isOk = false;
          this.message.error(this.api.translate.instant('dhanwantari-loan.message21'), "");
        }
        if (this.data.EXPECTED_TIME_OF_CONSTRUCTION == undefined || this.data.EXPECTED_TIME_OF_CONSTRUCTION == 0 || this.data.EXPECTED_TIME_OF_CONSTRUCTION.toString().trim() == '') {
          isOk = false;
          this.message.error(this.api.translate.instant('dhanwantari-loan.message22'), "");
        }
        if (this.data.TOTAL_AREA_OF_CONSTRUCTION == undefined || this.data.TOTAL_AREA_OF_CONSTRUCTION == 0 || this.data.TOTAL_AREA_OF_CONSTRUCTION.toString().trim() == '') {
          isOk = false;
          this.message.error(this.api.translate.instant('dhanwantari-loan.message23'), "");
        }
        if (this.data.TOTAL_COST_OF_CONSTRUCTION == undefined || this.data.TOTAL_COST_OF_CONSTRUCTION == 0 || this.data.TOTAL_COST_OF_CONSTRUCTION.toString().trim() == '') {
          isOk = false;
          this.message.error(this.api.translate.instant('dhanwantari-loan.message24'), "");
        }

        if (this.data.NAME_OF_BUILDER_DEVELOPER == undefined || this.data.NAME_OF_BUILDER_DEVELOPER.trim() == '') {
          isOk = false;
          this.message.error(this.api.translate.instant('dhanwantari-loan.message25'), "");
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
        } else {
          isOk = false;
          this.message.error(this.api.translate.instant('common.message.error.address'), "");
        }
      }
    }

    if (isOk) {


      this.isButtonSpinning = true;
      if (this.data.PURPOSE_OF_LOAN == '1') {
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
      } else {
        this.nextProcess();
      }
    }
  }


  nextProcess() {
    this.change();
    this.data.PROPOSAL_ID = this.PROPOSAL_ID;
    if (this.data.ID) {
      this.api.updateDhanwantariLoan(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

            this.logtext = 'Update & Close - DhanwantariLoan form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - DhanwantariLoan ]";
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

      this.api.createDhanwantariLoan(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('common.message.success.addinfo2'), "")
            this.indexChanged.emit(1)
            this.logtext = 'Save & New - DhanwantariLoan form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - DhanwantariLoan ]";
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

            this.logtext = 'Save & Close - DhanwantariLoan form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - DhanwantariLoan ]";
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
