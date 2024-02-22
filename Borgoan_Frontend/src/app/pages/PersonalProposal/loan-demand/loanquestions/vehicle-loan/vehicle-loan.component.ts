import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';
import { Vehicleloan } from 'src/app/Models/PersonalProposal/vehicleloan';
import { ApiService } from 'src/app/Service/api.service';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { conformToMask } from 'angular2-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'


@Component({
  selector: 'app-vehicle-loan',
  templateUrl: './vehicle-loan.component.html',
  styleUrls: ['./vehicle-loan.component.css']
})
export class VehicleLoanComponent implements OnInit {
  data: Vehicleloan = new Vehicleloan();
  isSpinning = false
  isButtonSpinning = false
  logtext: string = "";
  @Input() PROPOSAL_ID: number;
  pipe = new DatePipe('en-US');
  @Output() demo: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() CURRENT_STAGE_ID: number; @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  converted: any;
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')
  constructor(private api: ApiService, private message: NzNotificationService, private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.data.VEHICLE_TYPE == 'N'
    this.getdata();
  }

  getdata() {

    this.isSpinning = true
    this.data.PROPOSAL_ID = this.PROPOSAL_ID;
    this.api.getAllVehicleLoan(0, 0, "ID", 'asc', "AND PROPOSAL_ID=" + this.PROPOSAL_ID).subscribe(data => {
      this.isSpinning = false
      if (data['code'] == '200' && data['count'] > 0) {
        this.data = data['data'][0];
        this.data.VALUATION_DATE = this.datePipe.transform(this.data.VALUATION_DATE, 'dd/MM/yyyy');
      }
    }, err => {
      //console.log(err);
    });
  }

  disabledDate = (current) => {
    return new Date(new Date().getTime() - 24 * 60 * 60 * 1000) < current;
  }

  disabledDate2 = (current) => {
    return new Date() < current;
  }
  focusss2(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.QUOTATION_GIVEN_DATE = undefined;
    }
  }
  focusss(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.VALUATION_DATE = undefined;
    }
  }
  focusss4(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.YEAR_OF_PURCHASE = undefined;
    }
  }
  focusss5(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.MAKE_YEAR = undefined;
    }
  }
  save(): void {
    var isOk = true;
    if (this.data.NAME_OF_VEHICLE == undefined || this.data.NAME_OF_VEHICLE.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('vehicle-loan.message1'), "");
    }

    if (this.data.VEHICLE_COMPANY == undefined || this.data.VEHICLE_COMPANY.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('vehicle-loan.message2'), "");
    }

    if (this.data.INSURANCE_TYPE == undefined || this.data.INSURANCE_TYPE == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('vehicle-loan.message6'), "");
    }
    if (this.data.REGISTRATION == undefined || this.data.REGISTRATION == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('vehicle-loan.REGISTRATIONerr'), "");
    }

    if (this.data.FITNESS_PERIOD == undefined || this.data.FITNESS_PERIOD.toString().trim() == "") {
      this.data.FITNESS_PERIOD = ''
      // isOk = false;
      // this.message.error(this.api.translate.instant('vehicle-loan.FITNESS_PERIODerr'), "");
    }
    if (this.data.TAX_PERIOD == undefined || this.data.TAX_PERIOD.toString().trim() == "") {
      this.data.TAX_PERIOD = ''
      // isOk = false;
      // this.message.error(this.api.translate.instant('vehicle-loan.TAX_PERIODerr'), "");
    }
    if (this.data.THIRD_PARTY_INSURANCE_PERIOD == undefined || this.data.THIRD_PARTY_INSURANCE_PERIOD == 0 || this.data.THIRD_PARTY_INSURANCE_PERIOD.toString().trim() == '') {
      // isOk = false;
      this.data.THIRD_PARTY_INSURANCE_PERIOD = 0
      // this.message.error(this.api.translate.instant('vehicle-loan.message8'), "");
    }

    this.data.COMPREHENSIVE_INSURANCE_PERIOD = 0
    // if (this.data.MAKE_YEAR == undefined) {
    //   isOk = false;
    //   this.message.error(this.api.translate.instant('vehicle-loan.message10'), "");
    // }







    this.data.ADVANCE_PAID_AMOUNT = 0

    // if (this.data.IS_ADVANCE_PAID) {
    //   if (this.data.ADVANCE_PAID_AMOUNT == undefined || this.data.ADVANCE_PAID_AMOUNT == 0 || this.data.ADVANCE_PAID_AMOUNT.toString().trim() == '') {
    //     isOk = false;
    //     this.message.error(this.api.translate.instant('vehicle-loan.message16'), "");
    //   }
    // }
    // if (this.data.IS_VALUATION_DONE) {


    if (this.data.VALUATION_AMOUNT == undefined || this.data.VALUATION_AMOUNT == 0 || this.data.VALUATION_AMOUNT.toString().trim() == '') {
      // isOk = false;
      // this.message.error(this.api.translate.instant('common.message.error.valuatorprice'), "");
      this.data.VALUATION_AMOUNT = 0
    }



    // }





    if (this.data.DEALER_NAME == undefined || this.data.DEALER_NAME == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('vehicle-loan.message17'), "");
    }

    // if (this.data.BASIC_PRICE == undefined || this.data.BASIC_PRICE == 0 || this.data.BASIC_PRICE.toString().trim() == '') {
    //   isOk = false;
    //   this.message.error(this.api.translate.instant('vehicle-loan.message18'), "");
    // }
    if (this.data.VEHICLE_VALUATION == undefined || this.data.VEHICLE_VALUATION == 0 || this.data.VEHICLE_VALUATION.toString().trim() == "") {
      isOk = false;
      this.message.error(this.api.translate.instant('vehicle-loan.message15'), "");

    }
    if (this.data.PURCHASE_AMOUNT == undefined || this.data.PURCHASE_AMOUNT == 0 || this.data.PURCHASE_AMOUNT.toString().trim() == "") {
      isOk = false;
      this.message.error(this.api.translate.instant('vehicle-loan.message11'), "");

    }

    if (this.data.VALUATION_DATE[0] >= 0 && this.data.VALUATION_DATE[0] <= 9
      && this.data.VALUATION_DATE[1] >= 0 && this.data.VALUATION_DATE[1] <= 9
      && this.data.VALUATION_DATE[3] >= 0 && this.data.VALUATION_DATE[3] <= 9 &&
      this.data.VALUATION_DATE[4] >= 0 && this.data.VALUATION_DATE[4] <= 9 &&
      this.data.VALUATION_DATE[9] >= 0 && this.data.VALUATION_DATE[9] <= 9 &&
      this.data.VALUATION_DATE[8] >= 0 && this.data.VALUATION_DATE[8] <= 9 &&
      this.data.VALUATION_DATE[7] >= 0 && this.data.VALUATION_DATE[7] <= 9 &&
      this.data.VALUATION_DATE[6] >= 0 && this.data.VALUATION_DATE[6] <= 9) {

      var conformedPhoneNumber = conformToMask(
        this.data.VALUATION_DATE,
        this.mask,
        { guide: false }
      )
      const str = conformedPhoneNumber.conformedValue.split('/');

      const year = Number(str[2]);
      const month = Number(str[1]) - 1;
      const dates = Number(str[0]);

      this.converted = new Date(year, month, dates);
       
        this.data.VALUATION_DATE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
       
        // this.data.VALUATION_DATE = null;
     
    }
    else {
      isOk = false
      this.message.error(this.api.translate.instant('basicinfo.dateerror'), "")
    }

    if (isOk) {
      // if (this.data.VALUATION_DATE == undefined || this.data.VALUATION_DATE == null || this.data.VALUATION_DATE == '') {
      //   this.data.VALUATION_DATE = null;
      //   // isOk = false;
      //   // this.message.error(this.api.translate.instant('realestate-resincom.message7'), "");
      // } else
      //   this.data.VALUATION_DATE = this.pipe.transform(this.data.VALUATION_DATE, 'yyyy-MM-dd');

      // if (this.data.VALUATOR_NAME == undefined || this.data.VALUATOR_NAME.trim() == '') {
      this.data.VALUATOR_NAME = ''
      // }

      // if (this.data.ACCESSORIES_PRICE == undefined || this.data.ACCESSORIES_PRICE < 0 || this.data.ACCESSORIES_PRICE.toString().trim() == '') {
      this.data.ACCESSORIES_PRICE = 0;
      // }
      // if (this.data.RTO_TAX_OR_REGISTRATION_PRICE == undefined || this.data.RTO_TAX_OR_REGISTRATION_PRICE < 0 || this.data.RTO_TAX_OR_REGISTRATION_PRICE.toString().trim() == '') {
      this.data.RTO_TAX_OR_REGISTRATION_PRICE = 0;
      // }

      // if (this.data.INSURENCE == undefined || this.data.INSURENCE < 0 || this.data.INSURENCE.toString().trim() == '') {
      this.data.INSURENCE = 0;
      // }

      // if (this.data.OTHER_CHARGES == undefined || this.data.OTHER_CHARGES < 0 || this.data.OTHER_CHARGES.toString().trim() == '') {
      this.data.OTHER_CHARGES = 0;
      // }
      this.data.BASIC_PRICE = 0;
      // if (this.data.QUOTATION_GIVEN_DATE == undefined) {
      this.data.QUOTATION_GIVEN_DATE = null;
      // } else {
      //   this.data.QUOTATION_GIVEN_DATE = this.pipe.transform(this.data.QUOTATION_GIVEN_DATE, 'yyyy-MM-dd');
      // }
      // if (this.data.PREVIOUS_OWNER_NAME == undefined || this.data.PREVIOUS_OWNER_NAME.trim() == "") {
      //   this.data.PREVIOUS_OWNER_NAME = ''
      // }

      if (this.data.YEAR_OF_PURCHASE == undefined || this.data.YEAR_OF_PURCHASE == "") {
        // isOk = false;
        // this.message.error(this.api.translate.instant('vehicle-loan.message12'), "");
        this.data.YEAR_OF_PURCHASE = null
      } else
        if (this.data.YEAR_OF_PURCHASE.toString().length > 4) {
          this.data.YEAR_OF_PURCHASE = this.pipe.transform(this.data.YEAR_OF_PURCHASE, 'yyyy');
        }

      // this.data.YEAR_OF_PURCHASE = ''
      this.data.PREVIOUS_OWNER_NAME = ''
      this.data.IS_ADVANCE_PAID = false;

      // if (this.data.MAKE_YEAR.toString().length > 4) {
      //   this.data.MAKE_YEAR = this.pipe.transform(this.data.MAKE_YEAR, 'yyyy');
      // }
      this.data.MAKE_YEAR = null
      // if (this.data.NUMBER_OF_OWNERSHIPS == undefined) {
      this.data.NUMBER_OF_OWNERSHIPS = 0;
      // }
      this.isButtonSpinning = true;
      this.data.PROPOSAL_ID = this.PROPOSAL_ID;
      this.data.PREVIOUS_OWNER_NAME = ''
      if (this.data.ID) {
        this.api.updateVehicleLoan(this.data)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

              this.logtext = 'Update & Close - VehicleLoan form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - VehicleLoan ]";
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

              this.logtext = 'Update & Close - VehicleLoan form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - VehicleLoan ]";
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
              this.isButtonSpinning = false;
            }
          });
      }
      else {

        this.api.createVehicleLoan(this.data)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('common.message.success.addinfo2'), "")
              this.data
              this.logtext = 'Save & New - VehicleLoan form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - VehicleLoan ]";
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
              this.logtext = 'Save & Close - VehicleLoan form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - VehicleLoan ]";
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
}