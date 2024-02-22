import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { DatePipe } from '@angular/common';
import { BuilderFinance } from 'src/app/Models/PersonalProposal/builder-finance';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { ApiService } from 'src/app/Service/api.service';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';

@Component({
  selector: 'app-builderfinance',
  templateUrl: './builderfinance.component.html',
  styleUrls: ['./builderfinance.component.css']
})
export class BuilderfinanceComponent implements OnInit {
  @Input() PROPOSAL_ID: number;
  @Input() CURRENT_STAGE_ID: number;  
  @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  data: BuilderFinance = new BuilderFinance();
  addressinfo: Addressinfo = new Addressinfo();
  isSpinning = false
  isButtonSpinning = false
  logtext: string = "";
  pipe = new DatePipe('en-US');
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();
  @Output() demo : EventEmitter<boolean> =
    new EventEmitter<boolean>();
  constructor(private api: ApiService, private message: NzNotificationService) {
  }

  ngOnInit() {
    this.getdata();
  }

  getdata() {
    this.isSpinning = true

    this.api.getAllBuilderFinanceInformation(0, 0, 'ID', "asc", "AND PROPOSAL_ID=" + this.PROPOSAL_ID).subscribe(data => {
      this.isSpinning = false

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
    return new Date() < current;
  }

  save(): void {
    var isOk = true;

    if (this.data.NAME_OF_PROJECT == undefined || this.data.NAME_OF_PROJECT.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('builderfinance.message1'), "");
    }

    if (this.data.PROJECT_TYPE == undefined || this.data.PROJECT_TYPE.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('builderfinance.message2'), "");
    }
    if (this.data.AREA_OF_PLOT == undefined || this.data.AREA_OF_PLOT == 0 || this.data.AREA_OF_PLOT.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('builderfinance.message3'), "");
    }

    if (this.data.PLOT_VALUATION == undefined || this.data.PLOT_VALUATION == 0 || this.data.PLOT_VALUATION.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('builderfinance.message4'), "");
    }

    if (this.data.NAME_OF_OWNER == undefined || this.data.NAME_OF_OWNER.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('builderfinance.message5'), "");
    }

    if (this.data.EXPECTED_COMPLETION_TIME == undefined || this.data.EXPECTED_COMPLETION_TIME == 0 || this.data.EXPECTED_COMPLETION_TIME.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('builderfinance.message6'), "");
    }

    if (this.data.TOTAL_AREA_OF_CONSTRUCTION == undefined || this.data.TOTAL_AREA_OF_CONSTRUCTION == 0 || this.data.TOTAL_AREA_OF_CONSTRUCTION.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('builderfinance.message7'), "");
    }

    if (this.data.TOTAL_COST_OF_CONSTRUCTION == undefined || this.data.TOTAL_COST_OF_CONSTRUCTION == 0 || this.data.TOTAL_COST_OF_CONSTRUCTION.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('builderfinance.message8'), "");
    }

    if (this.data.IS_PROJECT_WORK_STARTED) {
      if (this.data.TOTAL_COST_OF_WORK_IN_PROGRESS == undefined || this.data.TOTAL_COST_OF_WORK_IN_PROGRESS == 0 || this.data.TOTAL_COST_OF_WORK_IN_PROGRESS.toString().trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('builderfinance.message9'), "");
      }
    } else {
      this.data.TOTAL_COST_OF_WORK_IN_PROGRESS = 0;
    }

    if (this.data.FLATS_COUNT == undefined || this.data.FLATS_COUNT < 0 || this.data.FLATS_COUNT.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('builderfinance.message10'), "");
    }

    if (this.data.PROPERTY_BELONGS_TO == 'D') {
      if (this.data.NUMBER_OF_FLATS_GIVEN_TO_OWNER == undefined || this.data.NUMBER_OF_FLATS_GIVEN_TO_OWNER < 0 || this.data.NUMBER_OF_FLATS_GIVEN_TO_OWNER.toString().trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('builderfinance.message11'), "");
      }

      if (this.data.TOTAL_SELLEBLE_AREA_GIVEN_TO_OWNER_FLATS == undefined || this.data.TOTAL_SELLEBLE_AREA_GIVEN_TO_OWNER_FLATS < 0 || this.data.TOTAL_SELLEBLE_AREA_GIVEN_TO_OWNER_FLATS.toString().trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('builderfinance.message12'), "");
      }
      if (this.data.NUMBER_OF_SHOPS_OFFICES_GIVEN_TO_OWNER == undefined || this.data.NUMBER_OF_SHOPS_OFFICES_GIVEN_TO_OWNER < 0 || this.data.NUMBER_OF_SHOPS_OFFICES_GIVEN_TO_OWNER.toString().trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('builderfinance.message13'), "");
      }
      if (this.data.TOTAL_SELLEBLE_AREA_GIVEN_TO_OWNER_SHOPS_OFFICES == undefined || this.data.TOTAL_SELLEBLE_AREA_GIVEN_TO_OWNER_SHOPS_OFFICES < 0 || this.data.TOTAL_SELLEBLE_AREA_GIVEN_TO_OWNER_SHOPS_OFFICES.toString().trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('builderfinance.message14'), "");
      }
    } else {
      this.data.NUMBER_OF_FLATS_GIVEN_TO_OWNER = 0
      this.data.TOTAL_SELLEBLE_AREA_GIVEN_TO_OWNER_FLATS = 0
      this.data.NUMBER_OF_SHOPS_OFFICES_GIVEN_TO_OWNER = 0
      this.data.TOTAL_SELLEBLE_AREA_GIVEN_TO_OWNER_SHOPS_OFFICES = 0
    }
    if (this.data.OTHER_TOTAL_SELLABLE_AREA == undefined || this.data.OTHER_TOTAL_SELLABLE_AREA < 0 || this.data.OTHER_TOTAL_SELLABLE_AREA.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('builderfinance.message15'), "");
    }
    if (this.data.SELLING_RATE_FLATS == undefined || this.data.SELLING_RATE_FLATS < 0 || this.data.SELLING_RATE_FLATS.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('builderfinance.message16'), "");
    }
    if (this.data.TOTAL_OTHER_FLATS_SELLING_RATE == undefined || this.data.TOTAL_OTHER_FLATS_SELLING_RATE < 0 || this.data.TOTAL_OTHER_FLATS_SELLING_RATE.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('builderfinance.message17'), "");
    }
    if (this.data.NUMBER_OF_COMMERCIAL_PLACES == undefined || this.data.NUMBER_OF_COMMERCIAL_PLACES < 0 || this.data.NUMBER_OF_COMMERCIAL_PLACES.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('builderfinance.message18'), "");
    }
    if (this.data.TOTAL_AREA_OF_OTHER_COMMERCIAL_PLACES == undefined || this.data.TOTAL_AREA_OF_OTHER_COMMERCIAL_PLACES < 0 || this.data.TOTAL_AREA_OF_OTHER_COMMERCIAL_PLACES.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('builderfinance.message19'), "");
    }
    if (this.data.SELLING_RATE_COMMERCIAL_OFFICES == undefined || this.data.SELLING_RATE_COMMERCIAL_OFFICES < 0 || this.data.SELLING_RATE_COMMERCIAL_OFFICES.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('builderfinance.message20'), "");
    }

    if (this.data.TOTAL_SELLING_PRICE_OF_COMMERCIAL_OFFICES == undefined || this.data.TOTAL_SELLING_PRICE_OF_COMMERCIAL_OFFICES < 0 || this.data.TOTAL_SELLING_PRICE_OF_COMMERCIAL_OFFICES.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('builderfinance.message21'), "");
    }
    if (this.data.TOTAL_SELL_PRICE_OTHER == undefined || this.data.TOTAL_SELL_PRICE_OTHER < 0 || this.data.TOTAL_SELL_PRICE_OTHER.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('builderfinance.message22'), "");
    }

    if (this.data.IS_STARTED_BOOKING) {
      if (this.data.COLLECTED_AMOUNT == undefined || this.data.COLLECTED_AMOUNT < 0 || this.data.COLLECTED_AMOUNT.toString().trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('builderfinance.message23'), "");
      }
      if (this.data.SALE_DEEDS_EXECUTED_COUNT == undefined || this.data.SALE_DEEDS_EXECUTED_COUNT < 0 || this.data.SALE_DEEDS_EXECUTED_COUNT.toString().trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('builderfinance.message24'), "");
      }
    } else {
      this.data.COLLECTED_AMOUNT = 0;
      this.data.SALE_DEEDS_EXECUTED_COUNT = 0;
    }

    if (this.data.IS_TAKEN_UNSECURED_LOAN) {
      if (this.data.REMAINING_LOAN_AMOUNT == undefined || this.data.REMAINING_LOAN_AMOUNT == 0 || this.data.REMAINING_LOAN_AMOUNT.toString().trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('builderfinance.message25'), "");
      }
    }
    if (this.data.IS_REGISTERED_UNDER_RERA) {
      if (this.data.RERA_REGISTRATION_NUMBER == undefined || this.data.RERA_REGISTRATION_NUMBER.trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('builderfinance.message26'), "");
      }
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


    if (this.data.ID) {
      this.api.updateBuilderFinanceInformation(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
            this.logtext = 'Update & Close -buildfinanceLoan form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - buildfinanceLoan ]";
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

      this.api.createBuilderFinanceInformation(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.indexChanged.emit(1)
            this.message.success(this.api.translate.instant('common.message.success.addinfo2'), "")
            this.logtext = 'Save & New - buildfinanceLoan form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - buildfinanceLoan ]";
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
            this.logtext = 'Save & Close - buildfinanceLoan form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - buildfinanceLoan ]";
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
