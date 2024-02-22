import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { CashCreditLoan } from 'src/app/Models/PersonalProposal/cash-credit-loan';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { ApiService } from 'src/app/Service/api.service';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
@Component({
  selector: 'app-cash-credit-loan',
  templateUrl: './cash-credit-loan.component.html',
  styleUrls: ['./cash-credit-loan.component.css']
})
export class CashCreditLoanComponent implements OnInit {
  @Input() PROPOSAL_ID: number; 
  @Input() CASH_CREDIT_TYPE: string; 
  @Input() CURRENT_STAGE_ID: number;  
  @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  title: string;
  data: CashCreditLoan = new CashCreditLoan();
  isSpinning = false
  logtext: string = "";
  addressinfo: Addressinfo = new Addressinfo();
  isButtonSpinning = false;
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();
  index: number = -1;
  addressinfoList:any[] = [];
  addressIdList = [];
  pageIndex = 0;
  pageSize = 0;
  totalRecords = 1;
  loadingRecords = false;
  sortValue: string = "desc";
  sortKey: string = "id";
  filterQuery: string = "";
  @Output() demo : EventEmitter<boolean> =
    new EventEmitter<boolean>();
  constructor(private api: ApiService, private message: NzNotificationService) {
  }

  ngOnInit() {
    if (this.CASH_CREDIT_TYPE == "T")
      this.title =  this.api.translate.instant('cash-credit-loan.title1');
    else
      this.title = this.api.translate.instant('cash-credit-loan.title2');
    this.getdata();
  }

  getdata() {
    this.isSpinning = true
    this.api.getAllCashCreditLoanInformation(0, 0, "ID", 'asc', "AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND CASH_CREDIT_TYPE='" + this.CASH_CREDIT_TYPE + "'").subscribe(data => {
      this.data = new CashCreditLoan();
      this.isSpinning = false
      if (data['code'] == '200' && data['count'] > 0) {
        this.data = data['data'][0];
        if (this.data.IS_STOCK_MAINTAINED_AT_OTHER_PLACE) {
          this.getaddressData(this.data.ID);
        }
      }
    }, err => {
      //console.log(err);
    });

  }
  getaddressData(ID) {
    this.api.getAllCashCreditAddressDetails(ID)
      .subscribe(datas => {
        this.addressinfoList = [];
        if (datas['code'] == "200" && datas['data'].length > 0) {
          datas['data'].forEach(element => {
            this.addressinfoList.push(element.ADDRESS[0]);
          });
    
        }
      }, err => {
        //console.log(err);
      });
  }

  disabledDate = (current) => {
    return new Date() < current;
  }

  add(): void {
    var isValid = true;
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
        isValid = false;
        this.message.error(this.api.translate.instant('common.message.error.address'), "");
      }
      if ((/^[1-9]{1}[0-9]{5}$/).test(this.addressinfo.PINCODE.toString()) == false) {
        isValid = false;
        this.message.error(this.api.translate.instant('common.message.error.pincode3'), "");
      }
    } else {
      isValid = false;
      this.message.error(this.api.translate.instant('common.message.error.address'), "");
    }

    if (isValid) {
      if (this.index > -1) {
        this.addressinfoList[this.index] = Object.assign({}, this.addressinfo);
      } else {
        this.addressinfoList.push(Object.assign({}, this.addressinfo));
      }
      this.addressinfoList = [...this.addressinfoList];
      this.index = -1;
      this.addressinfo.BUILDING = " ";
      this.addressinfo.HOUSE_NO = " ";
      this.addressinfo.VILLAGE = " ";
      this.addressinfo.STATE = " ";
      this.addressinfo.TALUKA = " ";
      this.addressinfo.DISTRICT = " ";
      this.addressinfo.LANDMARK = " ";
      this.addressinfo.PINCODE = " ";
    }


  }

  edit(data: any, i: number): void {
    this.index = i;
    this.addressinfo = Object.assign({}, this.addressinfoList[this.index]);
  }
  delete(i: number) {
    this.addressinfoList.splice(i, 1);

  }

  save(): void {
    var isOk = true;

    if (this.data.PURPOSE_OF_LOAN == undefined || this.data.PURPOSE_OF_LOAN == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('cash-credit-loan.message1'), "");
    }

    if (this.data.APPROXIMATE_DAILY_SALES == undefined || this.data.APPROXIMATE_DAILY_SALES == 0 || this.data.APPROXIMATE_DAILY_SALES.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('cash-credit-loan.message2'), "");
    }


    if (this.data.APPROXIMATE_MONTHLY_SALES == undefined || this.data.APPROXIMATE_MONTHLY_SALES == 0 || this.data.APPROXIMATE_MONTHLY_SALES.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('cash-credit-loan.message3'), "");
    } else if (this.data.APPROXIMATE_DAILY_SALES > this.data.APPROXIMATE_MONTHLY_SALES) {
      isOk = false;
      this.message.error(this.api.translate.instant('cash-credit-loan.message4'), "");
    }

    if (this.data.APPROXIMATE_MONTHLY_CREDIT_SALES == undefined || this.data.APPROXIMATE_MONTHLY_CREDIT_SALES == 0 || this.data.APPROXIMATE_MONTHLY_CREDIT_SALES.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('cash-credit-loan.message5'), "");
    } else if (this.data.APPROXIMATE_MONTHLY_CREDIT_SALES > this.data.APPROXIMATE_MONTHLY_SALES) {
      isOk = false;
      this.message.error(this.api.translate.instant('cash-credit-loan.message6'), "");
    }

    if (this.data.AVERAGE_RECOVERY_PERIOD == undefined || this.data.AVERAGE_RECOVERY_PERIOD == 0 || this.data.AVERAGE_RECOVERY_PERIOD.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('cash-credit-loan.message7'), "");
    }
    if (this.data.APPROXIMATE_MONTHLY_PURCHASE == undefined || this.data.APPROXIMATE_MONTHLY_PURCHASE == 0 || this.data.APPROXIMATE_MONTHLY_PURCHASE.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('cash-credit-loan.message8'), "");
    }
    if (this.data.APPROXIMATE_MONTHLY_CREDIT_PURCHASE == undefined || this.data.APPROXIMATE_MONTHLY_CREDIT_PURCHASE == 0 || this.data.APPROXIMATE_MONTHLY_CREDIT_PURCHASE.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('cash-credit-loan.message9'), "");
    } else if (this.data.APPROXIMATE_MONTHLY_CREDIT_PURCHASE > this.data.APPROXIMATE_MONTHLY_PURCHASE) {
      isOk = false;
      this.message.error(this.api.translate.instant('cash-credit-loan.message10'), "");
    }

    if (this.data.APPROXIMATE_MONTHLY_STOCK == undefined || this.data.APPROXIMATE_MONTHLY_STOCK == 0 || this.data.APPROXIMATE_MONTHLY_STOCK.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('cash-credit-loan.message11'), "");
    }
    if (this.data.AVERAGE_CREDIT_PERIOD == undefined || this.data.AVERAGE_CREDIT_PERIOD == 0 || this.data.AVERAGE_CREDIT_PERIOD.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('cash-credit-loan.message12'), "");
    }


    if (this.data.IS_THERE_ANY_OBSOLUTE_DAMAGED_STOCK) {
      if (this.data.AMOUNT_OF_OBSOLUTE_DAMAGED_PRODUCTS == undefined || this.data.AMOUNT_OF_OBSOLUTE_DAMAGED_PRODUCTS == 0 || this.data.AMOUNT_OF_OBSOLUTE_DAMAGED_PRODUCTS.toString().trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('cash-credit-loan.message13'), "");
      }
    }

    if (this.data.IS_STOCK_IS_INSURED) {
      if (this.data.SUM_INSURED_AMOUNT == undefined || this.data.SUM_INSURED_AMOUNT == 0 || this.data.SUM_INSURED_AMOUNT.toString().trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('cash-credit-loan.message14'), "");
      }
    }

    if (this.data.IS_STOCK_MAINTAINED_AT_OTHER_PLACE) {
      if (this.addressinfoList == null|| this.addressinfoList.length == 0) {
        isOk = false;
        this.message.error(this.api.translate.instant('cash-credit-loan.message15'), "");
      }
    }

    if (isOk) {
      this.isButtonSpinning = true;
      if (this.data.IS_STOCK_MAINTAINED_AT_OTHER_PLACE) {
      this.addressinfoList.forEach((item, index) => {
        this.addressinfoList[index].CLIENT_ID = 1;
      });
      this.data['ADDRESS_DETAILS'] = this.addressinfoList
    } else {
      this.data['ADDRESS_DETAILS'] = []
    }
      this.data.PROPOSAL_ID = this.PROPOSAL_ID;
      this.api.createCashCreditLoanInformationBulk(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.indexChanged.emit(1)

            this.message.success(this.api.translate.instant('common.message.success.addinfo2'), "");

            this.logtext = 'Update & Close - CashCreditLoan form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - CashCreditLoan ]";
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
          }
        });
      // this.isButtonSpinning = true;
      // if (this.data.ADDRESS_ID) {
      //   this.api.updateAddressInformation(this.addressinfo)
      //     .subscribe(successCode => {
      //       if (successCode['code'] == "200") {
      //         this.nextProcess();
      //       } else {
      //         this.message.error(this.api.translate.instant('common.message.error.updatefailed'), "");
      //         this.isButtonSpinning = false;
      //       }
      //     });
      // } else {
      //   this.api.createAddressInformation(this.addressinfo)
      //     .subscribe(successCode => {
      //       if (successCode['code'] == "200") {
      //         this.data.ADDRESS_ID = successCode['data'][0].ID;
      //         this.nextProcess();
      //       } else {
      //         this.message.error(this.api.translate.instant('common.message.error.updatefailed'), "");
      //         this.isButtonSpinning = false;
      //       }
      //     });
      // }

    }

  }

  // nextProcess() {

  //   this.data.PROPOSAL_ID = this.PROPOSAL_ID;
  //   this.data.CASH_CREDIT_TYPE = this.CASH_CREDIT_TYPE;
  //   if (this.data.ID) {
  //     this.api.updateCashCreditLoanInformation(this.data)
  //       .subscribe(successCode => {
  //         if (successCode['code'] == "200") {
  //           this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

  //           this.logtext = 'Update & Close - CashCreditLoan form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - CashCreditLoan ]";
  //           this.api.addLog('A', this.logtext, this.api.emailId)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 //console.log(successCode);
  //               }
  //               else {
  //                 //console.log(successCode);
  //               }
  //             });
  //           this.getdata();
  //           this.isButtonSpinning = false;
  //         }
  //         else {
  //           this.message.error(this.api.translate.instant('common.message.error.updatefailed'), "");
  //           this.isButtonSpinning = false;
  //         }
  //       });
  //   }
  //   else {

  //     this.api.createCashCreditLoanInformation(this.data)
  //       .subscribe(successCode => {
  //         if (successCode['code'] == "200") {
  //           this.message.success(this.api.translate.instant('common.message.success.addinfo2'), "")
  //           this.indexChanged.emit(1)
  //           this.logtext = 'Save & New - CashCreditLoan form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - CashCreditLoan ]";
  //           this.api.addLog('A', this.logtext, this.api.emailId)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 //console.log(successCode);
  //               }
  //               else {
  //                 //console.log(successCode);
  //               }
  //             });

  //           this.getdata();
  //           this.isButtonSpinning = false;
  //         }
  //         else {
  //           this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
  //           this.isButtonSpinning = false;
  //           this.logtext = 'Save & Close - CashCreditLoan form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - CashCreditLoan ]";
  //           this.api.addLog('A', this.logtext, this.api.emailId)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 //console.log(successCode);
  //               }
  //               else {
  //                 //console.log(successCode);
  //               }
  //             });

  //         }
  //       });
  //   }
  // }

}