import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { ApiService } from 'src/app/Service/api.service';
import { AgriInfo } from 'src/app/Models/PersonalProposal/agri-info';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { Financialinformation } from 'src/app/Models/PersonalProposal/financialinformation';
import { FCurrentDeposit } from 'src/app/Models/PersonalProposal/Fcurrentdeposit';
import { FRecurringDeposit } from 'src/app/Models/PersonalProposal/FrecurringDeposit';
import { DatePipe } from '@angular/common';
import { createAutoCorrectedDatePipe } from 'text-mask-addons';
import { conformToMask } from 'angular2-text-mask';


@Component({
  selector: 'app-financialcurrentdeposit',
  templateUrl: './financialcurrentdeposit.component.html',
  styleUrls: ['./financialcurrentdeposit.component.css'],
  providers: [DatePipe]
})
export class FinancialcurrentdepositComponent implements OnInit {
  @Input() drawerClose4: Function;
  @Input() data45: FRecurringDeposit;
  @Input() addressinfoCurrent: Addressinfo;
  index = -1;
  @Output() demo: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  pageIndex = 1;
  @Input() CURRENT_STAGE_ID: number;
  @Input() PROPOSAL_ID
  @Input() extraApplicantInformation: Extraapplicantinfo;


  saveCount: number = 0;
  pageSize = 100;
  converted: any;
  sortValue: string = "asc";
  sortKey: string = "ID";
  searchText: string = "";
  likeQuery: string = "";
  isSpinning = false;
  drawerData5: Financialinformation = new Financialinformation();
  bagayat: any;
  jirayat: any;
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  pipe = new DatePipe('en-US');
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')
  logtext: string = ""
  constructor(private api: ApiService, private message: NzNotificationService, private datePipe: DatePipe) {
  }

  ngOnInit(): void { }

  close(): void {
    this.drawerClose4();

    this.logtext = 'CLOSED - Extra Info form';
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
  setValues() {
    this.data45.ACC_AMOUNT = this.data45.ACC_AMOUNT;
    this.data45.ACC_NO = this.data45.ACC_NO;
    this.data45.MATURITY_DUE = this.data45.MATURITY_DUE;
    // this.data.END_DATE = '';
  }

  // save(addNew: boolean): void {

  //   // this.data45.MATURITY_DUE = this.datePipe.transform(this.data45.MATURITY_DUE, 'yyyy-MM-dd');
  //   this.data45.DEPOSIT_TYPE = "C"
  //   if (this.data45.ACC_AMOUNT != undefined && this.data45.ACC_NO != undefined && this.data45.MATURITY_DUE != undefined
  //     ) {
  //       if (this.data45.MATURITY_DUE == undefined || this.data45.MATURITY_DUE == '') {
  //         this.data45.MATURITY_DUE = null
  //       } else
  //         if (this.data45.MATURITY_DUE[0] >= 0 && this.data45.MATURITY_DUE[0] <= 9
  //           && this.data45.MATURITY_DUE[1] >= 0 && this.data45.MATURITY_DUE[1] <= 9
  //           && this.data45.MATURITY_DUE[3] >= 0 && this.data45.MATURITY_DUE[3] <= 9 &&
  //           this.data45.MATURITY_DUE[4] >= 0 && this.data45.MATURITY_DUE[4] <= 9 &&
  //           this.data45.MATURITY_DUE[9] >= 0 && this.data45.MATURITY_DUE[9] <= 9 &&
  //           this.data45.MATURITY_DUE[8] >= 0 && this.data45.MATURITY_DUE[8] <= 9 &&
  //           this.data45.MATURITY_DUE[7] >= 0 && this.data45.MATURITY_DUE[7] <= 9 &&
  //           this.data45.MATURITY_DUE[6] >= 0 && this.data45.MATURITY_DUE[6] <= 9) {

  //           var conformedPhoneNumber = conformToMask(
  //             this.data45.MATURITY_DUE,
  //             this.mask,
  //             { guide: false }
  //           )
  //           const str = conformedPhoneNumber.conformedValue.split('/');

  //           const year = Number(str[2]);
  //           const month = Number(str[1]) - 1;
  //           const dates = Number(str[0]);

  //           this.converted = new Date(year, month, dates)

  //           this.data45.MATURITY_DUE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
  //         } else {
  //           // oks = false
  //           this.message.error(this.api.translate.instant('basicinfo.dateerror'), "")
  //         }
  //     if (this.data45.ACC_AMOUNT == 0 || this.data45.ACC_AMOUNT.toString().trim() == "") {
  //       this.message.error("Not Ok",'');
  //     } else {
  //       if (this.data45.ACC_NO.toString().trim() == "") {
  //         this.message.error('Not Ok', "");
  //       } else {
  //         if (this.data45.MATURITY_DUE) {

  //           this.demo.emit(false);
  //           this.setValues();
  //           console.log(this.setValues)
  //           if (!addNew)
  //           this.close();

  //         } else {
  //           this.message.error(this.api.translate.instant('workorders.message3'), "");
  //         }
  //       }
  //     }
  //   }
  //   else {
  //     this.message.error(this.api.translate.instant('common.message.error.emptyinfo'), "");
  //   }
  // }


  save(): void {
    this.data45.PROPOSAL_ID = this.PROPOSAL_ID
    if (this.data45.ID) {
      this.data45.DEPOSIT_TYPE = 'C'
      this.api.updateDepositInformation(this.data45).subscribe(
        successCode => {
          if (successCode['code'] == 200) {
            this.saveCount = 0;
            this.getCurrentDeposit();
            this.drawerClose4();
          }
        },
        error => {
          this.saveCount = 0;
        }
      );
    }
    else {
      this.saveCount++;
      if (this.saveCount == 1) {
        this.data45.DEPOSIT_TYPE = 'C'
        this.api.createDepositInformation(this.data45).subscribe(
          successCode => {
            if (successCode['code'] == 200) {
              this.getCurrentDeposit();
              this.drawerClose4();
            }
          },
          error => {
            this.saveCount = 0;
          }
        );
      }
    }
    // this.data45.MATURITY_DUE = this.datePipe.transform(this.data45.MATURITY_DUE, 'yyyy-MM-dd');
    // this.data45.DEPOSIT_TYPE = "C"
    // if (this.data45.ACC_AMOUNT != undefined && this.data45.ACC_NO != undefined && this.data45.MATURITY_DUE != undefined
    // ) {
    //   if (this.data45.MATURITY_DUE == undefined || this.data45.MATURITY_DUE == '') {
    //     this.data45.MATURITY_DUE = null
    //   } else
    //     if (this.data45.MATURITY_DUE[0] >= 0 && this.data45.MATURITY_DUE[0] <= 9
    //       && this.data45.MATURITY_DUE[1] >= 0 && this.data45.MATURITY_DUE[1] <= 9
    //       && this.data45.MATURITY_DUE[3] >= 0 && this.data45.MATURITY_DUE[3] <= 9 &&
    //       this.data45.MATURITY_DUE[4] >= 0 && this.data45.MATURITY_DUE[4] <= 9 &&
    //       this.data45.MATURITY_DUE[9] >= 0 && this.data45.MATURITY_DUE[9] <= 9 &&
    //       this.data45.MATURITY_DUE[8] >= 0 && this.data45.MATURITY_DUE[8] <= 9 &&
    //       this.data45.MATURITY_DUE[7] >= 0 && this.data45.MATURITY_DUE[7] <= 9 &&
    //       this.data45.MATURITY_DUE[6] >= 0 && this.data45.MATURITY_DUE[6] <= 9) {
    //       var conformedPhoneNumber = conformToMask(
    //         this.data45.MATURITY_DUE,
    //         this.mask,
    //         { guide: false }
    //       )
    //       const str = conformedPhoneNumber.conformedValue.split('/');
    //       const year = Number(str[2]);
    //       const month = Number(str[1]) - 1;
    //       const dates = Number(str[0]);
    //       this.converted = new Date(year, month, dates)
    //       this.data45.MATURITY_DUE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
    //     } else {
    //       // oks = false
    //       this.message.error(this.api.translate.instant('basicinfo.dateerror'), "")
    //     }
    //   if (this.data45.ACC_AMOUNT == 0 || this.data45.ACC_AMOUNT.toString().trim() == "") {
    //     this.message.error("Not Ok", '');
    //   } else {
    //     if (this.data45.ACC_NO.toString().trim() == "") {
    //       this.message.error('Not Ok', "");
    //     } else {
    //       if (this.data45.MATURITY_DUE) {
    //         this.demo.emit(false);
    //         this.setValues();
    //         //console.log(this.setValues)
    //         if (!addNew)
    //           this.close();
    //       } else {
    //         this.message.error(this.api.translate.instant('workorders.message3'), "");
    //       }
    //     }
    //   }
    // }
    // else {
    //   this.message.error(this.api.translate.instant('common.message.error.emptyinfo'), "");
    // }
  }
  getCurrentDeposit() {
    this.api.getDepositInformation(this.PROPOSAL_ID, 'C').subscribe(
      successCode => {
        if (successCode['code'] == 200) {
          this.data45 = successCode['data'][0]
        }
      }
    )
  }

  isValidPincode(pincode) {
    const expression = /^[1-9][0-9]{5}/;
    return expression.test(String(pincode).toLowerCase())
  }


  setValues2() {
    this.addressinfoCurrent.BUILDING = '';
    this.addressinfoCurrent.DISTRICT = '';
    this.addressinfoCurrent.HOUSE_NO = '';
    this.addressinfoCurrent.LANDMARK = '';
    this.addressinfoCurrent.VILLAGE = '';
    this.addressinfoCurrent.STATE = '';
    this.addressinfoCurrent.TALUKA = '';
    this.addressinfoCurrent.PINCODE = "";
  }
}

