import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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
// import { FTermDeposit } from 'src/app/Models/PersonalProposal/Ftermdeposit';


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
  selector: 'app-financialtermdeposit',
  templateUrl: './financialtermdeposit.component.html',
  styleUrls: ['./financialtermdeposit.component.css'],
  providers: [DatePipe]
})
export class FinancialtermdepositComponent implements OnInit {
  @Input() drawerClose3: Function;
  @Input() data3: FRecurringDeposit;
  @Input() addressinfoCurrent: Addressinfo;
  @Input() PROPOSAL_ID

  @Output() demo: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  pageIndex = 1;
  @Input() CURRENT_STAGE_ID: number;
  @Input() extraApplicantInformation: Extraapplicantinfo;
  saveCount: number = 0;
  pageSize = 100;
  converted: any;
  sortValue: string = "asc";
  sortKey: string = "ID";
  searchText: string = "";
  likeQuery: string = "";
  isSpinning = false;
  drawerData35: Financialinformation = new Financialinformation();
  bagayat: any;
  jirayat: any;
  logtext: string = ""
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  browserLang = "kn";
  // pipe = new DatePipe('en-US');
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')
  dataList = [];
  constructor(private api: ApiService, private message: NzNotificationService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.browserLang = localStorage.getItem("locale");
  }

  close(): void {
    this.drawerClose3();

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
    this.data3.ACC_AMOUNT = this.data3.ACC_AMOUNT;
    this.data3.ACC_NO = this.data3.ACC_NO;
    this.data3.MATURITY_DUE = this.data3.MATURITY_DUE;
    // this.data3.END_DATE = '';
  }

  // save(addNew: boolean): void {

  //   // this.data345.MATURITY_DUE = this.datePipe.transform(this.data345.MATURITY_DUE, 'yyyy-MM-dd');
  //   this.data3.DEPOSIT_TYPE = "T"
  //   if (this.data3.ACC_AMOUNT != undefined && this.data3.ACC_NO != undefined && this.data3.MATURITY_DUE != undefined
  //     ) {
  //       if (this.data3.MATURITY_DUE == undefined || this.data3.MATURITY_DUE == '') {
  //         this.data3.MATURITY_DUE = null
  //       } else
  //         if (this.data3.MATURITY_DUE[0] >= 0 && this.data3.MATURITY_DUE[0] <= 9
  //           && this.data3.MATURITY_DUE[1] >= 0 && this.data3.MATURITY_DUE[1] <= 9
  //           && this.data3.MATURITY_DUE[3] >= 0 && this.data3.MATURITY_DUE[3] <= 9 &&
  //           this.data3.MATURITY_DUE[4] >= 0 && this.data3.MATURITY_DUE[4] <= 9 &&
  //           this.data3.MATURITY_DUE[9] >= 0 && this.data3.MATURITY_DUE[9] <= 9 &&
  //           this.data3.MATURITY_DUE[8] >= 0 && this.data3.MATURITY_DUE[8] <= 9 &&
  //           this.data3.MATURITY_DUE[7] >= 0 && this.data3.MATURITY_DUE[7] <= 9 &&
  //           this.data3.MATURITY_DUE[6] >= 0 && this.data3.MATURITY_DUE[6] <= 9) {

  //           var conformedPhoneNumber = conformToMask(
  //             this.data3.MATURITY_DUE,
  //             this.mask,
  //             { guide: false }
  //           )
  //           const str = conformedPhoneNumber.conformedValue.split('/');

  //           const year = Number(str[2]);
  //           const month = Number(str[1]) - 1;
  //           const dates = Number(str[0]);

  //           this.converted = new Date(year, month, dates)

  //           this.data3.MATURITY_DUE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
  //         } else {
  //           // oks = false
  //           this.message.error(this.api.translate.instant('basicinfo.dateerror'), "")
  //         }
  //     if (this.data3.ACC_AMOUNT == 0 || this.data3.ACC_AMOUNT.toString().trim() == "") {
  //       this.message.error("Not Ok",'');
  //     } else {
  //       if (this.data3.ACC_NO.toString().trim() == "") {
  //         this.message.error('Not Ok', "");
  //       } else {
  //         if (this.data3.MATURITY_DUE) {

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
    this.data3.PROPOSAL_ID = this.PROPOSAL_ID
    if (this.data3.ID) {
      this.data3.DEPOSIT_TYPE = 'T'
      this.api.updateDepositInformation(this.data3).subscribe(
        successCode => {
          if (successCode['code'] == 200) {
            this.saveCount = 0;
            this.getTermDeposit();
            this.drawerClose3();
            // this.demo.emit(false);
            // this.setValues();
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
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
        this.data3.DEPOSIT_TYPE = 'T'
        this.api.createDepositInformation(this.data3).subscribe(
          successCode => {
            if (successCode['code'] == 200) {
              this.getTermDeposit();
              this.drawerClose3();
              this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
            }
          },
          error => {
            this.saveCount = 0;
          }

        );
      }
    }
  }
  getTermDeposit() {
    this.api.getDepositInformation(this.PROPOSAL_ID, 'T').subscribe(
      successCode => {
        if (successCode['code'] == 200) {
          this.data3 = successCode['data3'][0]
        }
      }
    )
  }
  print(){
    console.log("printing data3",this.data3)
  }





  isValidPincode(pincode) {
    const expression = /^[1-9][0-9]{5}/;
    return expression.test(String(pincode).toLowerCase())
  }

  AmounttoWords(event: number) {
    this.data3.LOAN_AMOUNT = event;

    // this.Amount = event;
    // let words = toWords.convert( this.Amount, { currency: true });
    if (this.data3.LOAN_AMOUNT == null || this.data3.LOAN_AMOUNT == 0) {
      this.data3.LOAN_AMOUNT_IN_WORDS = "";

    } else {
      if (this.browserLang == 'en') {
        this.data3.LOAN_AMOUNT_IN_WORDS = toWords.convert(this.data3.LOAN_AMOUNT, { currency: true });
      }
      else if (this.browserLang == 'kn') {
        this.data3.LOAN_AMOUNT_IN_WORDS = toWords_kn.convert(this.data3.LOAN_AMOUNT, { currency: true });
      }
      else if (this.browserLang == 'mr') {
        this.data3.LOAN_AMOUNT_IN_WORDS = toWords_mr.convert(this.data3.LOAN_AMOUNT, { currency: true });
      }
      console.log(this.data3.LOAN_AMOUNT_IN_WORDS, " this.data3.LOAN_AMOUNT_IN_WORDS")
    }

    // if (this.data3.TERM_ID != undefined && this.data3.TERM_ID != 0) {
    //   console.log(this.data3.TERM_ID);
    //   var terdata3 = this.termdata3.filter(
    //     (termid) => termid.ID == this.data3.TERM_ID
    //   );
    //   var name = terdata3[0]["NAME"];
    //   var d = name.split("(");
    //   let year;

    //     year = Number(d[1].substr(0, 1));

    //   console.log(year);

    //   if (this.data3.INSTALLMENT_FREQUENCY_ID == 2)
    //     this.data3.INSTALLMENT_COUNT = (year * 12) / 1;
    //   this.data3.INSTALLMENT_AMOUNT =
    //     this.data3.LOAN_AMOUNT / this.data3.INSTALLMENT_COUNT;

    //   if (this.data3.INSTALLMENT_FREQUENCY_ID == 3)
    //     this.data3.INSTALLMENT_COUNT = (year * 12) / 3;
    //   this.data3.INSTALLMENT_AMOUNT =
    //     this.data3.LOAN_AMOUNT / this.data3.INSTALLMENT_COUNT;

    //   if (this.data3.INSTALLMENT_FREQUENCY_ID == 4)
    //     this.data3.INSTALLMENT_COUNT = (year * 12) / 6;
    //   this.data3.INSTALLMENT_AMOUNT =
    //     this.data3.LOAN_AMOUNT / this.data3.INSTALLMENT_COUNT;

    //   if (this.data3.INSTALLMENT_FREQUENCY_ID == 5)
    //     this.data3.INSTALLMENT_COUNT = (year * 12) / 12;
    //   this.data3.INSTALLMENT_AMOUNT =
    //     this.data3.LOAN_AMOUNT / this.data3.INSTALLMENT_COUNT;

    //   if (this.data3.INSTALLMENT_FREQUENCY_ID == 6)
    //     this.data3.INSTALLMENT_COUNT = (year * 12) / 3;
    //   this.data3.INSTALLMENT_AMOUNT =
    //     this.data3.LOAN_AMOUNT / this.data3.INSTALLMENT_COUNT;

    //   if (this.data3.INSTALLMENT_FREQUENCY_ID == 10)
    //     this.data3.INSTALLMENT_COUNT = 1;
    //   this.data3.INSTALLMENT_AMOUNT =
    //     this.data3.LOAN_AMOUNT / this.data3.INSTALLMENT_COUNT;

    //   if (this.data3.INSTALLMENT_FREQUENCY_ID == 7)
    //     this.data3.INSTALLMENT_COUNT = (year * 12) / 6;
    //   this.data3.INSTALLMENT_AMOUNT =
    //     this.data3.LOAN_AMOUNT / this.data3.INSTALLMENT_COUNT;

    //   if (this.data3.INSTALLMENT_FREQUENCY_ID == 8)
    //     this.data3.INSTALLMENT_COUNT = (year * 12) / 12;
    //   this.data3.INSTALLMENT_AMOUNT =
    //     this.data3.LOAN_AMOUNT / this.data3.INSTALLMENT_COUNT;

    //   if (this.data3.INSTALLMENT_FREQUENCY_ID == 11)
    //     this.data3.INSTALLMENT_COUNT = (year * 12) / 24;
    //   this.data3.INSTALLMENT_AMOUNT =
    //     this.data3.LOAN_AMOUNT / this.data3.INSTALLMENT_COUNT;

    //   if (this.data3.INSTALLMENT_FREQUENCY_ID == 12)
    //     this.data3.INSTALLMENT_COUNT = (year * 12) / 36;
    //   this.data3.INSTALLMENT_AMOUNT =
    //     this.data3.LOAN_AMOUNT / this.data3.INSTALLMENT_COUNT;

    //   this.data3.INSTALLMENT_COUNT = Math.ceil(this.data3.INSTALLMENT_COUNT);
    //   this.data3.INSTALLMENT_AMOUNT = Math.ceil(this.data3.INSTALLMENT_AMOUNT);
    //   // console.log(this.data3.INSTALLMENT_COUNT);
    //   console.log(this.data3.INSTALLMENT_AMOUNT);
    // } else {
    //   this.data3.INSTALLMENT_COUNT = 0;
    // }




  }


  getword() {
    this.data3.LOAN_AMOUNT_IN_WORDS = this.convertNumberToWords(
      this.data3.LOAN_AMOUNT
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


  DepositTotal: number = 0;
  ReceiptTotal: number = 0;
  calculateTotal() {
    this.DepositTotal = this.dataList.reduce((DepositTotal, data3) => DepositTotal + data3.RECEIPT_AMOUNT, 0);
    // this.ValuationAmounttoWord(this.total);
    this.ReceiptTotal = this.dataList.reduce((ReceiptTotal, data3) => ReceiptTotal + data3.TOTAL_QUANTITY, 0);
    // console.log("total values",this.DepositTotal)

  }

  getTotal(INTEREST_RATE: string): number {
    // Your existing logic to calculate the total for the specified column

    // Return the total value for the 'INTEREST_RATE' column
    return this.dataList.reduce((acc, data3) => acc + Number(data3[INTEREST_RATE]), 0);
  }

  getAverage(INTEREST_RATE: string): number {
    // Calculate the average by dividing the total by the number of items
    const total = this.getTotal(INTEREST_RATE);
    const count = this.dataList.length;

    return count > 0 ? total / count : 0;
  }

  updateTotalCount(dataList: any[]): void {
    // Reset the total count
    this.ReceiptTotal = 0;

    // Iterate through dataList and update the total count
    dataList.forEach(data3 => {
      this.ReceiptTotal += data3.RECEIPT_NO ? 1 : 0;
    });
  }
}

