import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { ApiService } from 'src/app/Service/api.service';
import { AgriInfo } from 'src/app/Models/PersonalProposal/agri-info';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { Financialinformation } from 'src/app/Models/PersonalProposal/financialinformation';
import { FRecurringDeposit } from 'src/app/Models/PersonalProposal/FrecurringDeposit';
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
  selector: 'app-savingaccdetails',
  templateUrl: './savingaccdetails.component.html',
  styleUrls: ['./savingaccdetails.component.css']
})
export class SavingaccdetailsComponent implements OnInit {
  @Input() drawerClose2: Function;
  @Input() data4: FRecurringDeposit;
  @Input() addressinfoCurrent: Addressinfo;
  pageIndex = 1;
  @Input() CURRENT_STAGE_ID: number;
  @Input() PROPOSAL_ID
  @Input() extraApplicantInformation: Extraapplicantinfo;
  @Output() demo: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  saveCount: number = 0;
  pageSize = 100;
  sortValue: string = "asc";
  sortKey: string = "ID";
  searchText: string = "";
  likeQuery: string = "";
  isSpinning = false;
  bagayat: any;
  jirayat: any;
  logtext: string = ""
  browserLang = "kn";
  constructor(private api: ApiService, private message: NzNotificationService) {
  }

  ngOnInit(): void {
    this.browserLang = localStorage.getItem("locale");
  }

  close(): void {
    this.drawerClose2();

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
    this.data4.ACC_AMOUNT = this.data4.ACC_AMOUNT;
    this.data4.ACC_NO = this.data4.ACC_NO;
    // this.data4.MATURITY_DUE = this.data4.MATURITY_DUE;
    // this.data.END_DATE = '';
  }

  // save(addNew: boolean): void {
  //   if (this.data4.ACC_AMOUNT != undefined && this.data4.ACC_NO != undefined ){   
  //     if (this.data4.ACC_AMOUNT == 0 || this.data4.ACC_AMOUNT.toString().trim() == "") {
  //       this.message.error("Not Ok",'');
  //     } else {
  //       if (this.data4.ACC_NO.toString().trim() == "") {
  //         this.message.error('Not Ok', "");
  //       } else {
  //         if (this.data4.ACC_NO) {

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
    if (this.data4.ID) {
      this.data4.DEPOSIT_TYPE = 'S'
      this.api.updateDepositInformation(this.data4).subscribe(
        successCode => {
          if (successCode['code'] == 200) {
            this.saveCount = 0;
            this.getSavingAcc();
            this.drawerClose2();
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
        this.data4.DEPOSIT_TYPE = 'S'
        this.api.createDepositInformation(this.data4).subscribe(
          successCode => {
            if (successCode['code'] == 200) {
              this.getSavingAcc();
              this.drawerClose2();
            }
          },
          error => {
            this.saveCount = 0;

          });
      }
    }
    // if (this.data4.ACC_AMOUNT != undefined && this.data4.ACC_NO != undefined) {
    //   if (this.data4.ACC_AMOUNT == 0 || this.data4.ACC_AMOUNT.toString().trim() == "") {
    //     this.message.error("Not Ok", '');
    //   } else {
    //     if (this.data4.ACC_NO.toString().trim() == "") {
    //       this.message.error('Not Ok', "");
    //     } else {
    //       if (this.data4.ACC_NO) {
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
  getSavingAcc() {
    this.api.getDepositInformation(this.PROPOSAL_ID, 'S').subscribe(
      successCode => {
        if (successCode['code'] == 200) {
          this.data4 = successCode['data'][0]
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

  AmounttoWords(event: number) {
    this.data4.LOAN_AMOUNT = event;

    // this.Amount = event;
    // let words = toWords.convert( this.Amount, { currency: true });
    if (this.data4.LOAN_AMOUNT == null || this.data4.LOAN_AMOUNT == 0) {
      this.data4.LOAN_AMOUNT_IN_WORDS = "";

    } else {
      if (this.browserLang == 'en') {
        this.data4.LOAN_AMOUNT_IN_WORDS = toWords.convert(this.data4.LOAN_AMOUNT, { currency: true });
      }
      else if (this.browserLang == 'kn') {
        this.data4.LOAN_AMOUNT_IN_WORDS = toWords_kn.convert(this.data4.LOAN_AMOUNT, { currency: true });
      }
      else if (this.browserLang == 'mr') {
        this.data4.LOAN_AMOUNT_IN_WORDS = toWords_mr.convert(this.data4.LOAN_AMOUNT, { currency: true });
      }
      console.log(this.data4.LOAN_AMOUNT_IN_WORDS, " this.data.LOAN_AMOUNT_IN_WORDS")
    }






  }

  getword() {
    this.data4.LOAN_AMOUNT_IN_WORDS = this.convertNumberToWords(
      this.data4.LOAN_AMOUNT
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

