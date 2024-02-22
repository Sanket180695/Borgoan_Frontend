import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { ApiService } from 'src/app/Service/api.service';
import { AgriInfo } from 'src/app/Models/PersonalProposal/agri-info';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { Financialinformation } from 'src/app/Models/PersonalProposal/financialinformation';
import { FRecurringDeposit } from 'src/app/Models/PersonalProposal/FrecurringDeposit';
import { DatePipe } from '@angular/common';
import { createAutoCorrectedDatePipe } from 'text-mask-addons';
import { conformToMask } from 'angular2-text-mask';
import { ToWords } from 'to-words';


const toWords = new ToWords({
  localeCode: "en-IN",
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
  },
});

const toWords_kn = new ToWords({
  localeCode: 'kn-IN',
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
  }
});

const toWords_mr = new ToWords({
  localeCode: 'mr-IN',
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
  }
});


@Component({
  selector: 'app-financialrecurringdeposit',
  templateUrl: './financialrecurringdeposit.component.html',
  styleUrls: ['./financialrecurringdeposit.component.css'],
  providers: [DatePipe]
})
export class FinancialrecurringdepositComponent implements OnInit {
  @Input() drawerClose1: Function;
  @Input() data: FRecurringDeposit;
  @Input() addressinfoCurrent: Addressinfo;
  @Input() financial1
  pageIndex = 1;
  @Input() CURRENT_STAGE_ID: number;
  @Input() PROPOSAL_ID
  @Input() extraApplicantInformation: Extraapplicantinfo;
  @Output() demo: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  saveCount: number = 0;
  pageSize = 100;
  sortValue: string = "asc";
  converted: any;
  sortKey: string = "ID";
  searchText: string = "";
  likeQuery: string = "";
  isSpinning = false;
  i = 2
  drawerData5: Financialinformation = new Financialinformation();
  bagayat: any;
  ID
  CLIENT_ID
  FINANCIAL_INFORMATION_ID
  DEPOSIT_TYPE
  IS_HAVE_DEPOSIT
  IS_HAVE_FIXED_DEPOSIT
  ACC_NO: any
  ACC_AMOUNT: number
  MATURITY_DUE
  // financial=[]
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  pipe = new DatePipe('en-US');
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')
  jirayat: any;
  logtext: string = ""
  userId = sessionStorage.getItem('userId');
  browserLang = "kn";
  constructor(private api: ApiService, private message: NzNotificationService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {

    this.browserLang = localStorage.getItem("locale");
  }

  close(): void {
    this.drawerClose1();

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

  //   ATTENDANCE_STATUS:any
  //   EVALUATION_STATUS
  //   TRAINER_REMARK
  //   ID

  //  arraytrain:any
  //   pusharray=[]

  setValues() {
    this.data.ACC_AMOUNT = this.data.ACC_AMOUNT;
    this.data.ACC_NO = this.data.ACC_NO;
    this.data.MATURITY_DUE = this.data.MATURITY_DUE;
    // this.data.END_DATE = '';
  }

  // save(addNew: boolean): void {

  //   // this.data45.MATURITY_DUE = this.datePipe.transform(this.data45.MATURITY_DUE, 'yyyy-MM-dd');
  //   this.data.DEPOSIT_TYPE = "R"
  //   if (this.data.ACC_AMOUNT != undefined && this.data.ACC_NO != undefined && this.data.MATURITY_DUE != undefined
  //     ) {
  //       if (this.data.MATURITY_DUE == undefined || this.data.MATURITY_DUE == '') {
  //         this.data.MATURITY_DUE = null
  //       } else
  //         if (this.data.MATURITY_DUE[0] >= 0 && this.data.MATURITY_DUE[0] <= 9
  //           && this.data.MATURITY_DUE[1] >= 0 && this.data.MATURITY_DUE[1] <= 9
  //           && this.data.MATURITY_DUE[3] >= 0 && this.data.MATURITY_DUE[3] <= 9 &&
  //           this.data.MATURITY_DUE[4] >= 0 && this.data.MATURITY_DUE[4] <= 9 &&
  //           this.data.MATURITY_DUE[9] >= 0 && this.data.MATURITY_DUE[9] <= 9 &&
  //           this.data.MATURITY_DUE[8] >= 0 && this.data.MATURITY_DUE[8] <= 9 &&
  //           this.data.MATURITY_DUE[7] >= 0 && this.data.MATURITY_DUE[7] <= 9 &&
  //           this.data.MATURITY_DUE[6] >= 0 && this.data.MATURITY_DUE[6] <= 9) {

  //           var conformedPhoneNumber = conformToMask(
  //             this.data.MATURITY_DUE,
  //             this.mask,
  //             { guide: false }
  //           )
  //           const str = conformedPhoneNumber.conformedValue.split('/');

  //           const year = Number(str[2]);
  //           const month = Number(str[1]) - 1;
  //           const dates = Number(str[0]);

  //           this.converted = new Date(year, month, dates)

  //           this.data.MATURITY_DUE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
  //         } else {
  //           // oks = false
  //           this.message.error(this.api.translate.instant('basicinfo.dateerror'), "")
  //         }
  //     if (this.data.ACC_AMOUNT == 0 || this.data.ACC_AMOUNT.toString().trim() == "") {
  //       this.message.error("Not Ok",'');
  //     } else {
  //       if (this.data.ACC_NO.toString().trim() == "") {
  //         this.message.error('Not Ok', "");
  //       } else {
  //         if (this.data.MATURITY_DUE) {

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


  // nextstep(addNew) {
  //   // if (this.data4.ID) {

  //   //   this.api.updateAgricultureLandInformation(this.data4)
  //   //     .subscribe(successCode => {
  //   //       if (successCode['code'] == "200") {
  //   //         this.extraApplicantInformation.IS_PROVIDED = true
  //   //         this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
  //   //           .subscribe(successCode => {
  //   //             if (successCode['code'] == "200") {
  //   //             }
  //   //             else {
  //   //               this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
  //   //             }
  //   //           });
  //   //         this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

  //   //         this.logtext = 'Update & Close - OtherIncomeInfo form - SUCCESS ' + JSON.stringify(this.data4) + " KEYWORD [U - OtherIncomeInfo ]";
  //   //         this.api.addLog('A', this.logtext, this.api.emailId)
  //   //           .subscribe(successCode => {
  //   //             if (successCode['code'] == "200") {
  //   //               //console.log(successCode);
  //   //             }
  //   //             else {
  //   //               //console.log(successCode);
  //   //             }
  //   //           });

  //   //         if (!addNew)
  //   //           this.drawerClose2();

  //   //         this.isSpinning = false;
  //   //         this.setValues();
  //   //         this.setValues2();
  //   //       }
  //   //       else {

  //   //         this.logtext = 'Update & Close - OtherIncomeInfo form - ERROR - ' + JSON.stringify(this.data4) + " KEYWORD [U - OtherIncomeInfo ]";
  //   //         this.api.addLog('A', this.logtext, this.api.emailId)
  //   //           .subscribe(successCode => {
  //   //             if (successCode['code'] == "200") {
  //   //               //console.log(successCode);
  //   //             }
  //   //             else {
  //   //               //console.log(successCode);
  //   //             }
  //   //           });

  //   //         this.message.error(this.api.translate.instant('common.message.error.updatefailed'), "");
  //   //         this.isSpinning = false;
  //   //       }
  //   //     });


  //   // } else {

  //   //   this.api.createAgricultureLandInformation(this.data4)
  //   //     .subscribe(successCode => {
  //   //       if (successCode['code'] == "200") {
  //   //         this.extraApplicantInformation.IS_PROVIDED = true
  //   //         this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
  //   //           .subscribe(successCode => {
  //   //             if (successCode['code'] == "200") {
  //   //             }
  //   //             else {
  //   //               this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
  //   //             }
  //   //           });
  //   //         this.message.success(this.api.translate.instant('common.message.error.success'), "");
  //   //         if (!addNew) {
  //   //           this.drawerClose2();

  //   //           this.logtext = 'Save & Close - OtherIncomeInfo form - SUCCESS - ' + JSON.stringify(this.data4) + " KEYWORD [C - OtherIncomeInfo ]";
  //   //           this.api.addLog('A', this.logtext, this.api.emailId)
  //   //             .subscribe(successCode => {
  //   //               if (successCode['code'] == "200") {
  //   //                 //console.log(successCode);
  //   //               }
  //   //               else {
  //   //                 //console.log(successCode);
  //   //               }
  //   //             });
  //   //         }
  //   //         else {
  //   //           this.data4 = new Financialinformation();
  //   //           this.addressinfoCurrent = new Addressinfo();
  //   //           this.setValues();
  //   //           this.setValues2();
  //   //           this.logtext = 'Save & New - OtherIncomeInfo form - SUCCESS - ' + JSON.stringify(this.data4) + " KEYWORD [C - OtherIncomeInfo ]";
  //   //           this.api.addLog('A', this.logtext, this.api.emailId)
  //   //             .subscribe(successCode => {
  //   //               if (successCode['code'] == "200") {
  //   //                 //console.log(successCode);
  //   //               }
  //   //               else {
  //   //                 //console.log(successCode);
  //   //               }
  //   //             });
  //   //         }
  //   //         this.isSpinning = false;
  //   //       }
  //   //       else {

  //   //         this.logtext = 'Update & Close - OtherIncomeInfo form - ERROR - ' + JSON.stringify(this.data4) + " KEYWORD [U - OtherIncomeInfo ]";
  //   //         this.api.addLog('A', this.logtext, this.api.emailId)
  //   //           .subscribe(successCode => {
  //   //             if (successCode['code'] == "200") {
  //   //               //console.log(successCode);
  //   //             }
  //   //             else {
  //   //               //console.log(successCode);
  //   //             }
  //   //           });

  //   //         this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
  //   //         this.isSpinning = false;
  //   //       }
  //   //     });


  //   // }
  // }

  save(): void {
    if (this.data.ID) {
      this.data.DEPOSIT_TYPE = 'R'
      this.api.updateDepositInformation(this.data).subscribe(
        successCode => {
          if (successCode['code'] == 200) {
            this.saveCount = 0;
            this.getRecurringDeposit();
            this.drawerClose1();
          }
        },
        error => {
          this.saveCount = 0;
        }
      )
    }
    else {
      this.saveCount++;
      if (this.saveCount == 1) {
        this.data.DEPOSIT_TYPE = 'R'
        this.api.createDepositInformation(this.data).subscribe(
          successCode => {
            if (successCode['code'] == 200) {
              this.getRecurringDeposit();
              this.drawerClose1();
            }
          },
          error => {
            this.saveCount = 0;
          }
        )
      }
    }
    // this.data45.MATURITY_DUE = this.datePipe.transform(this.data45.MATURITY_DUE, 'yyyy-MM-dd');
    // this.data.DEPOSIT_TYPE = "R"
    // if (this.data.ACC_AMOUNT != undefined && this.data.ACC_NO != undefined && this.data.MATURITY_DUE != undefined
    // ) {
    //   if (this.data.MATURITY_DUE == undefined || this.data.MATURITY_DUE == '') {
    //     this.data.MATURITY_DUE = null
    //   } else
    //     if (this.data.MATURITY_DUE[0] >= 0 && this.data.MATURITY_DUE[0] <= 9
    //       && this.data.MATURITY_DUE[1] >= 0 && this.data.MATURITY_DUE[1] <= 9
    //       && this.data.MATURITY_DUE[3] >= 0 && this.data.MATURITY_DUE[3] <= 9 &&
    //       this.data.MATURITY_DUE[4] >= 0 && this.data.MATURITY_DUE[4] <= 9 &&
    //       this.data.MATURITY_DUE[9] >= 0 && this.data.MATURITY_DUE[9] <= 9 &&
    //       this.data.MATURITY_DUE[8] >= 0 && this.data.MATURITY_DUE[8] <= 9 &&
    //       this.data.MATURITY_DUE[7] >= 0 && this.data.MATURITY_DUE[7] <= 9 &&
    //       this.data.MATURITY_DUE[6] >= 0 && this.data.MATURITY_DUE[6] <= 9) {
    //       var conformedPhoneNumber = conformToMask(
    //         this.data.MATURITY_DUE,
    //         this.mask,
    //         { guide: false }
    //       )
    //       const str = conformedPhoneNumber.conformedValue.split('/');
    //       const year = Number(str[2]);
    //       const month = Number(str[1]) - 1;
    //       const dates = Number(str[0]);
    //       this.converted = new Date(year, month, dates)
    //       this.data.MATURITY_DUE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
    //     } else {
    //       // oks = false
    //       this.message.error(this.api.translate.instant('basicinfo.dateerror'), "")
    //     }
    //   if (this.data.ACC_AMOUNT == 0 || this.data.ACC_AMOUNT.toString().trim() == "") {
    //     this.message.error("Not Ok", '');
    //   } else {
    //     if (this.data.ACC_NO.toString().trim() == "") {
    //       this.message.error('Not Ok', "");
    //     } else {
    //       if (this.data.MATURITY_DUE) {
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
  getRecurringDeposit() {
    this.api.getDepositInformation(this.PROPOSAL_ID, 'R').subscribe(
      successCode => {
        if (successCode['code'] == 200) {
          this.data = successCode['data'][0]
        }
      }
    )
  }



  isValidPincode(pincode) {
    const expression = /^[1-9][0-9]{5}/;
    return expression.test(String(pincode).toLowerCase())
  }

  AmounttoWords(event: number) {
    this.data.LOAN_AMOUNT = event;

    // this.Amount = event;
    // let words = toWords.convert( this.Amount, { currency: true });
    if (this.data.LOAN_AMOUNT == null || this.data.LOAN_AMOUNT == 0) {
      this.data.LOAN_AMOUNT_IN_WORDS = "";

    } else {
      if (this.browserLang == 'en') {
        this.data.LOAN_AMOUNT_IN_WORDS = toWords.convert(this.data.LOAN_AMOUNT, { currency: true });
      }
      else if (this.browserLang == 'kn') {
        this.data.LOAN_AMOUNT_IN_WORDS = toWords_kn.convert(this.data.LOAN_AMOUNT, { currency: true });
      }
      else if (this.browserLang == 'mr') {
        this.data.LOAN_AMOUNT_IN_WORDS = toWords_mr.convert(this.data.LOAN_AMOUNT, { currency: true });
      }
      console.log(this.data.LOAN_AMOUNT_IN_WORDS, " this.data.LOAN_AMOUNT_IN_WORDS")
    }

    // if (this.data.TERM_ID != undefined && this.data.TERM_ID != 0) {
    //   console.log(this.data.TERM_ID);
    //   var terdata = this.termdata.filter(
    //     (termid) => termid.ID == this.data.TERM_ID
    //   );
    //   var name = terdata[0]["NAME"];
    //   var d = name.split("(");
    //   let year;

    //     year = Number(d[1].substr(0, 1));

    //   console.log(year);

    //   if (this.data.INSTALLMENT_FREQUENCY_ID == 2)
    //     this.data.INSTALLMENT_COUNT = (year * 12) / 1;
    //   this.data.INSTALLMENT_AMOUNT =
    //     this.data.LOAN_AMOUNT / this.data.INSTALLMENT_COUNT;

    //   if (this.data.INSTALLMENT_FREQUENCY_ID == 3)
    //     this.data.INSTALLMENT_COUNT = (year * 12) / 3;
    //   this.data.INSTALLMENT_AMOUNT =
    //     this.data.LOAN_AMOUNT / this.data.INSTALLMENT_COUNT;

    //   if (this.data.INSTALLMENT_FREQUENCY_ID == 4)
    //     this.data.INSTALLMENT_COUNT = (year * 12) / 6;
    //   this.data.INSTALLMENT_AMOUNT =
    //     this.data.LOAN_AMOUNT / this.data.INSTALLMENT_COUNT;

    //   if (this.data.INSTALLMENT_FREQUENCY_ID == 5)
    //     this.data.INSTALLMENT_COUNT = (year * 12) / 12;
    //   this.data.INSTALLMENT_AMOUNT =
    //     this.data.LOAN_AMOUNT / this.data.INSTALLMENT_COUNT;

    //   if (this.data.INSTALLMENT_FREQUENCY_ID == 6)
    //     this.data.INSTALLMENT_COUNT = (year * 12) / 3;
    //   this.data.INSTALLMENT_AMOUNT =
    //     this.data.LOAN_AMOUNT / this.data.INSTALLMENT_COUNT;

    //   if (this.data.INSTALLMENT_FREQUENCY_ID == 10)
    //     this.data.INSTALLMENT_COUNT = 1;
    //   this.data.INSTALLMENT_AMOUNT =
    //     this.data.LOAN_AMOUNT / this.data.INSTALLMENT_COUNT;

    //   if (this.data.INSTALLMENT_FREQUENCY_ID == 7)
    //     this.data.INSTALLMENT_COUNT = (year * 12) / 6;
    //   this.data.INSTALLMENT_AMOUNT =
    //     this.data.LOAN_AMOUNT / this.data.INSTALLMENT_COUNT;

    //   if (this.data.INSTALLMENT_FREQUENCY_ID == 8)
    //     this.data.INSTALLMENT_COUNT = (year * 12) / 12;
    //   this.data.INSTALLMENT_AMOUNT =
    //     this.data.LOAN_AMOUNT / this.data.INSTALLMENT_COUNT;

    //   if (this.data.INSTALLMENT_FREQUENCY_ID == 11)
    //     this.data.INSTALLMENT_COUNT = (year * 12) / 24;
    //   this.data.INSTALLMENT_AMOUNT =
    //     this.data.LOAN_AMOUNT / this.data.INSTALLMENT_COUNT;

    //   if (this.data.INSTALLMENT_FREQUENCY_ID == 12)
    //     this.data.INSTALLMENT_COUNT = (year * 12) / 36;
    //   this.data.INSTALLMENT_AMOUNT =
    //     this.data.LOAN_AMOUNT / this.data.INSTALLMENT_COUNT;

    //   this.data.INSTALLMENT_COUNT = Math.ceil(this.data.INSTALLMENT_COUNT);
    //   this.data.INSTALLMENT_AMOUNT = Math.ceil(this.data.INSTALLMENT_AMOUNT);
    //   // console.log(this.data.INSTALLMENT_COUNT);
    //   console.log(this.data.INSTALLMENT_AMOUNT);
    // } else {
    //   this.data.INSTALLMENT_COUNT = 0;
    // }




  }


  getword() {
    this.data.LOAN_AMOUNT_IN_WORDS = this.convertNumberToWords(
      this.data.LOAN_AMOUNT
    );
  }
  convertNumberToWords(num) {
    var a = [
      "",
      "One ",
      "Two ",
      "Three ",
      "Four ",
      "Five ",
      "Six ",
      "Seven ",
      "Eight ",
      "Nine ",
      "Ten ",
      "Eleven ",
      "Twelve ",
      "Thirteen ",
      "Fourteen ",
      "Fifteen ",
      "Sixteen ",
      "Seventeen ",
      "Eighteen ",
      "Nineteen ",
    ];
    var b = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    var n;
    if ((num = num.toString()).length > 9) return "overflow";
    n = ("000000000" + num)
      .substr(-9)
      .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    var str = "";
    str +=
      n[1] != 0
        ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "Crore "
        : "";
    str +=
      n[2] != 0
        ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "Lakh "
        : "";
    str +=
      n[3] != 0
        ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "Thousand "
        : "";
    str +=
      n[4] != 0
        ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "Hundred "
        : "";
    str +=
      n[5] != 0
        ? (str != "" ? "and " : "") +
        (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) +
        "Only "
        : "";
    return str;
  }




}

