import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import { RentDiscountingLoan } from 'src/app/Models/PersonalProposal/rentdiscountingloan';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { ApiService } from 'src/app/Service/api.service';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
@Component({
  selector: 'app-rent-discoumting-loan',
  templateUrl: './rent-discoumting-loan.component.html',
  styleUrls: ['./rent-discoumting-loan.component.css']
})
export class RentDiscoumtingLoanComponent implements OnInit {
  @Input() PROPOSAL_ID: number;
  data: RentDiscountingLoan = new RentDiscountingLoan();
  loadingRecords = true;
  isSpinning = false
  isButtonSpinning = false
  logtext: string = "";
  pipe = new DatePipe('en-US');
  addressinfo: Addressinfo = new Addressinfo();

  @Output() indexChanged: EventEmitter<number> = new EventEmitter();
  @Input() CURRENT_STAGE_ID: number; 
   @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  @Output() demo : EventEmitter<boolean> =
    new EventEmitter<boolean>();
  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {
    this.search();
  }
  search() {
    this.loadingRecords = true;
    this.api.getAllRentDiscountingLoan(0, 0, 'ID', "asc", "AND PROPOSAL_ID=" + this.PROPOSAL_ID).subscribe(data => {
      this.loadingRecords = false;
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
  focusss(event: KeyboardEvent){
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.RENT_AGREEMENT_END_DATE = undefined;
    }
  }

  save(): void {
    var isOk = true;

    if (this.data.NAME_OF_TENANT == undefined || this.data.NAME_OF_TENANT.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('rent-discoumting-loan.message1'), "");
    }

    if (this.data.TENENT_TYPE == undefined || this.data.TENENT_TYPE == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('rent-discoumting-loan.message2'), "");
    }

    if (this.data.RENTED_GIVEN_TIME == undefined || this.data.RENTED_GIVEN_TIME == 0 || this.data.RENTED_GIVEN_TIME.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('rent-discoumting-loan.message3'), "");
    }

    if(this.data.IS_RENT_AGREEMENT_DONE)
    {
      if (this.data.RENT_AGREEMENT_END_DATE == undefined || this.data.RENT_AGREEMENT_END_DATE == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('rent-discoumting-loan.message4'), "");
      }else{
        this.data.RENT_AGREEMENT_END_DATE= this.pipe.transform(this.data.RENT_AGREEMENT_END_DATE, 'yyyy-MM-dd');
      }
      if (this.data.RENT_AGREEMNT_TIME == undefined || this.data.RENT_AGREEMNT_TIME == 0 || this.data.RENT_AGREEMNT_TIME.toString().trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('rent-discoumting-loan.message5'), "");
      }
      if (this.data.MONTHLY_RENT == undefined || this.data.MONTHLY_RENT == 0 || this.data.MONTHLY_RENT.toString().trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('rent-discoumting-loan.message6'), "");
      }
    }
    else
    {
      this.data.RENT_AGREEMENT_END_DATE=null
    }

    if (this.data.AMOUNT_AFTER_TDS_CUTTING == undefined || this.data.AMOUNT_AFTER_TDS_CUTTING == 0 || this.data.AMOUNT_AFTER_TDS_CUTTING.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('rent-discoumting-loan.message7'), "");
    }
    
    if (this.data.IS_ANY_BANK_LOAN_TAKEN) {
      if (this.data.LOAN_BANK_NAME == undefined || this.data.LOAN_BANK_NAME.trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('rent-discoumting-loan.message8'), "");
      }
      if (this.data.SANCTIONED_LOAN_AMOUNT == undefined || this.data.SANCTIONED_LOAN_AMOUNT == 0 || this.data.SANCTIONED_LOAN_AMOUNT.toString().trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('rent-discoumting-loan.message9'), "");
      }
      if (this.data.REMAINING_LOAN_AMOUNT == undefined || this.data.REMAINING_LOAN_AMOUNT == 0 || this.data.REMAINING_LOAN_AMOUNT.toString().trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('rent-discoumting-loan.message10'), "");
      }
    } else {
      this.data.SANCTIONED_LOAN_AMOUNT = 0.0;
      this.data.REMAINING_LOAN_AMOUNT = 0.0;
      this.data.LOAN_BANK_NAME = " "
    }

    if (this.data.IS_RENT_TAKEN_CASH_OR_IN_BANK == "B") {
      if (this.data.RENT_BANK_NAME == undefined || this.data.RENT_BANK_NAME.trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('rent-discoumting-loan.message11'), "");
      }
    } else {
      this.data.RENT_BANK_NAME = " "
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
      this.api.updateRentDiscountingLoan(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

            this.logtext = 'Update & Close - ReentDiscountLoan form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - ReentDiscountLoan ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });
            this.search();
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

      this.api.createRentDiscountingLoan(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('common.message.success.addinfo2'), "")
            this.indexChanged.emit(1)

            this.logtext = 'Save & New - ReentDiscountLoan form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - ReentDiscountLoan ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });

            this.search();
            this.demo.emit(false)
            this.isButtonSpinning = false;
          }
          else {
            this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
            this.isButtonSpinning = false;
            this.logtext = 'Save & Close - ReentDiscountLoan form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - ReentDiscountLoan ]";
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
