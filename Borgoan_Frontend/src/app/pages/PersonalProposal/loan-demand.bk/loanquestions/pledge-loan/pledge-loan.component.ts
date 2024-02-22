import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { DatePipe } from '@angular/common';
import { PledgeLoan } from 'src/app/Models/PersonalProposal/pledge-loan';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { ApiService } from 'src/app/Service/api.service';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
@Component({
  selector: 'app-pledge-loan',
  templateUrl: './pledge-loan.component.html',
  styleUrls: ['./pledge-loan.component.css']
})
export class PledgeLoanComponent implements OnInit {
  @Input() PROPOSAL_ID: number;
  @Input() LOAN_SKIM_ID: number ;
  data: PledgeLoan = new PledgeLoan();
  isSpinning = false
  isButtonSpinning=false
  logtext: string = "";
  addressinfo: Addressinfo = new Addressinfo();
  pipe = new DatePipe('en-US');
  @Input() CURRENT_STAGE_ID: number;  
  @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();
  @Output() demo : EventEmitter<boolean> =
    new EventEmitter<boolean>();
  constructor(
    private api: ApiService,
    private message: NzNotificationService,
  ) {
  }

  ngOnInit() {
    this.getdata();
  }
  focusss(event: KeyboardEvent){
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.STOCK_YEAR = undefined;
    }
  }
  focusss2(event: KeyboardEvent){
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.VALUATION_DATE = undefined;
    }
  }
  getdata() {
    // this.isSpinning=true
    this.api.getAllPladgeLoanInformation(0, 0, "ID", 'asc', "AND PROPOSAL_ID=" + this.PROPOSAL_ID).subscribe(data => {
      this.data = new PledgeLoan();
      this.isSpinning=false
      if (data['code'] == '200' && data['count'] > 0) {
        this.data = data['data'][0];
        if (this.data.ADDRESS_DETAILS_ID > 0)
          this.getaddressData(this.data.ADDRESS_DETAILS_ID);

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
    this.data.PROPOSAL_ID = this.PROPOSAL_ID;
    var isOk = true;

    if (this.data.NAME_OF_STOCK_STORAGE == undefined || this.data.NAME_OF_STOCK_STORAGE.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('pledge-loan.message1'), "");
    }
    if (this.data.STOCK_DETAILS == undefined || this.data.STOCK_DETAILS.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('pledge-loan.message2'), "");
    }

    if (this.data.STOCK_PLACE == undefined || this.data.STOCK_PLACE.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('pledge-loan.message3'), "");
    }

    if (this.data.STORAGE_OWNER_NAME == undefined || this.data.STORAGE_OWNER_NAME.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('pledge-loan.message4'), "");
    }


    if (this.data.DETAILS_OF_INSURENCE_OF_STOCK_PLACE == undefined || this.data.DETAILS_OF_INSURENCE_OF_STOCK_PLACE.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('pledge-loan.message5'), "");
    }
    

    if (this.data.RECEIPT_NUMBER == undefined || this.data.RECEIPT_NUMBER == 0 || this.data.RECEIPT_NUMBER.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('pledge-loan.message6'), "");
    }
    if (this.data.STOCK_YEAR == undefined || this.data.STOCK_YEAR == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('pledge-loan.message7'), "");
    }

    if (this.data.IS_LOAN_TAKEN_FOR_STOCK_PLACE) {
      if (this.data.BANK_NAME == undefined || this.data.BANK_NAME.trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('pledge-loan.message8'), "");
      }
    } else {
      this.data.BANK_NAME = " ";
    }

    if (this.data.IS_STOCK_PLACE_OWNED_OR_RENTED == 'O') {
      this.data.IS_ANY_RENT_AGREEMENT_FOR_STOCK_PLACE = false;
    }

    if (this.data.IS_VALUATION_DONE) {
      if (this.data.VALUATORS_NAME == undefined || this.data.VALUATORS_NAME.trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('pledge-loan.message9'), "");
      }
      if (this.data.VALUATION_DATE == undefined || this.data.VALUATION_DATE == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('pledge-loan.message10'), "");
      }
      if (this.data.VALUATION_OF_STOCK == undefined || this.data.VALUATION_OF_STOCK == 0 || this.data.VALUATION_OF_STOCK.toString().trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('pledge-loan.message11'), "");
      }
    } else{
      if (this.data.VALUATION_OF_STOCK == undefined || this.data.VALUATION_OF_STOCK == 0 || this.data.VALUATION_OF_STOCK.toString().trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('pledge-loan.message12'), "");
      }
    }
    
    
    if (this.data.WEIGHT_UNIT == undefined || this.data.WEIGHT_UNIT.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('pledge-loan.message13'), "");
    }
    if (this.data.STOCK_WEIGHT == undefined || this.data.STOCK_WEIGHT == 0 || this.data.STOCK_WEIGHT.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('pledge-loan.message14'), "");
    }

    this.data.DETAILS_OF_EXISTING_PLEDGE_LOAN = " "
    // if (this.data.DETAILS_OF_EXISTING_PLEDGE_LOAN == undefined
    //   || this.data.DETAILS_OF_EXISTING_PLEDGE_LOAN.trim() == '') {
    //   isOk = false;
    //   this.message.error("पूर्वी कोणते मालगहाण कर्ज असल्यास त्याचा तपशील नमूद करा", "");
    // }
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
      
      this.data.VALUATION_DATE = this.pipe.transform(this.data.VALUATION_DATE, 'yyyy-MM-dd');
      if(this.data.STOCK_YEAR.toString().length > 4){
        this.data.STOCK_YEAR = this.pipe.transform(this.data.STOCK_YEAR, 'yyyy');
      }
      
      this.isButtonSpinning=true

      if (this.data.ADDRESS_DETAILS_ID) {
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
              this.data.ADDRESS_DETAILS_ID = successCode['data'][0].ID;
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
      this.api.updatePladgeLoanInformation(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

            this.logtext = 'Update & Close - PledgeLoan form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - PledgeLoan ]";
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

      this.api.createPladgeLoanInformation(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('common.message.success.addinfo2'), "")
            this.indexChanged.emit(1)
            
            this.logtext = 'Save & New - PledgeLoan form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - PledgeLoan ]";
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
            this.logtext = 'Save & Close - PledgeLoan form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - PledgeLoan ]";
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