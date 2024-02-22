import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DatePipe } from '@angular/common';
import { ApiService } from 'src/app/Service/api.service';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { Goldloan } from 'src/app/Models/LoanTypeQues/goldloan';
import { Goldloan1 } from 'src/app/Models/LoanTypeQues/goldloan1';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import { Loaninformation } from 'src/app/Models/PersonalProposal/loaninformation';
import { ToWords } from 'to-words';


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


const toWords = new ToWords({
  localeCode: 'en-IN',
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
  }
});

@Component({
  selector: 'app-goldloan',
  templateUrl: './goldloan.component.html',
  styleUrls: ['./goldloan.component.css']
})
export class GoldloanComponent implements OnInit {
  data: Goldloan = new Goldloan();
  golddata1: Goldloan1 = new Goldloan1();
  @Input() data8: Loaninformation;
  isSpinning = false
  isButtonSpinning = false
  logtext: string = "";
  @Input() PROPOSAL_ID: number;
  pipe = new DatePipe('en-US');
  @Output() demo = new EventEmitter<string>();
  @Input() CURRENT_STAGE_ID: number;
  @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();
  dataList = []
  goldItemList = []
  loadingRecords = false
  browserLang = 'kn';
  options = [];
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy')
  constructor(private api: ApiService, private message: NzNotificationService) {
  }

  ngOnInit(): void {
    this.calculateTotal();
    this.getdata();
    this.getdata1();
    this.getdata2();
    this.browserLang = localStorage.getItem('locale');
    this.api.getAllGoldItem(0, 0, "ID", 'asc', "").subscribe(data => {
      this.goldItemList = data['data'];
    }, err => {
      ////console.log(err);
    });
  }
  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    if (value.trim() != '') {
      this.options = []
      for (let i = 0; i < this.goldItemList.length; i++) {

        if (this.goldItemList[i].NAME_KN.includes(value)) {
          this.options.push(this.goldItemList[i].NAME_KN);
        }
        if (this.goldItemList[i].NAME_MR.includes(value)) {
          this.options.push(this.goldItemList[i].NAME_MR);
        }
        if (this.goldItemList[i].NAME_EN.includes(value)) {
          this.options.push(this.goldItemList[i].NAME_EN);
        }
      }
    }
  }


  getdata() {
    this.loadingRecords = true
    this.dataList = []
    this.api.getAllGoldLoanData(this.PROPOSAL_ID).subscribe(data1 => {
      this.loadingRecords = false
      if (data1['code'] == '200' && data1['count'] > 0) {
        this.dataList = data1['data'];
      }
    }, err => {
      //console.log(err);
    });

    this.getdata1();

  
  }

  getdata2() {
    this.loadingRecords = true
    this.data = new Goldloan()
    this.api.getAllGoldLoan(0,
      0,
      "ID",
      "asc",
      " AND PROPOSAL_ID=" + this.PROPOSAL_ID) .subscribe(
        (data) => {
          if (data["code"] == "200" && data["count"] > 0) {
            this.data = data["data"][0];
            // for (let i = 0; i < this.golddataList.length; i++) {
            //   this.goldTotal =
            //     this.goldTotal + this.golddataList[i]["VALUATION_AMOUNT"];
            // }
          } else {
            this.data =  new Goldloan()
             
            
          }
        },
        (err) => {
          ////console.log(err);
        }
      );


      this.getdata1();
  }

  total: number = 0;
  total11: number = 0;
  total2: number = 0;
  total3: number = 0;

  calculateTotal() {
    this.total = this.dataList.reduce((total, data) => total + data.VALUATION_AMOUNT, 0);
    this.ValuationAmounttoWord(this.total);
    this.total11 = this.dataList.reduce((total11, data) => total11 + data.TOTAL_QUANTITY, 0);
    this.total2 = this.dataList.reduce((total2, data) => total2 + data.GROSS_WEIGHT, 0);
    this.total3 = this.dataList.reduce((total3, data) => total3 + data.NET_WEIGHT, 0);

    // console.log("total values",this.total11)
    // console.log("total values",this.total2)
    // console.log("total values",this.total3)

  }





  

  calculateValuation() {
    this.golddata1.VALUATION_AMOUNT = this.golddata1.NET_WEIGHT * this.golddata1.PER_GRAM_RATE
    this.AmounttoWordss(this.golddata1.VALUATION_AMOUNT);
  }

  // calculateValuation2(event) {
  //   this.data.PER_GRAM_RATE = event;
  //   if (event == 0) {
  //     this.data.VALUATION_AMOUNT = 0;
  //   }

  //   if (this.data1.NET_WEIGHT == 0) {
  //     this.data.VALUATION_AMOUNT = 0;
  //   }

  //   if (event > 0 && this.data1.NET_WEIGHT > 0) {
  //     this.data.VALUATION_AMOUNT = this.data1.NET_WEIGHT * event;
  //   }
  // }

 

  


  addData() {

    var isValid = true;

    if (this.golddata1.DESCRIPTION_OF_JEWELS == undefined || this.golddata1.DESCRIPTION_OF_JEWELS == '') {
      isValid = false;
      this.message.error(this.api.translate.instant('goldloan.t1_message'), "");
    }
    if (this.golddata1.TOTAL_QUANTITY == undefined || this.golddata1.TOTAL_QUANTITY <= 0) {
      isValid = false;
      this.message.error(this.api.translate.instant('goldloan.t2_message'), "");
    }
    if (this.golddata1.GROSS_WEIGHT == undefined || this.golddata1.GROSS_WEIGHT <= 0) {
      isValid = false;
      this.message.error(this.api.translate.instant('goldloan.t3_message'), "");
    }
    if (this.golddata1.NET_WEIGHT == undefined || this.golddata1.NET_WEIGHT <= 0) {
      isValid = false;
      this.message.error(this.api.translate.instant('goldloan.t4_message'), "");
    }
    if (this.golddata1.PER_GRAM_RATE == undefined || this.golddata1.PER_GRAM_RATE <= 0) {
      isValid = false;
      this.message.error(this.api.translate.instant('goldloan.t5_message'), "");
    }
    if (this.golddata1.VALUATION_AMOUNT == undefined || this.golddata1.VALUATION_AMOUNT <= 0) {
      isValid = false;
      this.message.error(this.api.translate.instant('goldloan.t6_message'), "");
    }
    if (this.golddata1.REMARK == undefined || this.golddata1.REMARK == '') {
      isValid = false;
      this.message.error(this.api.translate.instant('goldloan.t7_message'), "");
    }


    if (isValid) {

    if (this.golddata1.ID) {
      this.api.updateGoldLoanData(this.golddata1).subscribe({
        next: (res) => {
          if (res['code'] == 200) {
            this.getdata();
            this.golddata1 = new Goldloan1();
          }
        }
      })
    }
    else {
      this.golddata1.PROPOSAL_ID = this.PROPOSAL_ID;
      this.golddata1.CLIENT_ID = this.api.clientId;
      this.api.createGoldLoanData(this.golddata1).subscribe({
        next: (res) => {
          if (res['code'] == 200) {
            this.getdata();
            this.golddata1 = new Goldloan1();
          }
        }
      })
    }
  }

  }




  save(): void {
    
    if (this.data.LOAN_AMOUNT1 <= this.data.total){

    this.isButtonSpinning = true;
    this.data.PROPOSAL_ID = this.PROPOSAL_ID;
    if (this.data.ID) {
      this.api.updateGoldLoan(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

            this.logtext = 'Update & Close - GoldLoan form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - GoldLoan ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });
            this.data = new Goldloan()
            this.getdata2();

            this.isButtonSpinning = false;
          }
          else {
            this.message.error(this.api.translate.instant('common.message.error.updatefailed'), "");
            this.isButtonSpinning = false;
          }
        });
    }
    else {

      this.api.createGoldLoan(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('common.message.success.addinfo2'), "")
            this.indexChanged.emit(1)
            this.logtext = 'Save & New - GoldLoan form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - GoldLoan ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });
            this.data = new Goldloan()
            // this.getdata2();
            this.demo.emit()
            this.isButtonSpinning = false;
          }
          else {
            this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
            this.isButtonSpinning = false;
            this.logtext = 'Save & Close - GoldLoan form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - GoldLoan ]";
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

  } else {
    this.message.error(this.api.translate.instant('common.message.error.addfailed'), "Total Valuation Amount cannot be less than Requested Loan Amount");

  }



  }










  delete(golddata1) {
    golddata1.ARCHIVE_FLAG = "T";
    this.api.updateGoldLoanData(golddata1)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          this.getdata();
        }
      });
  }

  // GoldFamily: Goldloan1 = new Goldloan1();

  edit(data1: any) {
    this.golddata1 = data1;
    let arr = this.dataList.filter(value => {
      return value.ID != data1.ID
    })
    this.dataList = arr;
  }


  getdata1(){

    let filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID
    this.api.getAllLoanInformation(0, 0, 'ID', "asc", filter).subscribe(data => {
      ////console.log("loan info")
      ////console.log(data)
      if (data['count'] > 0) {
        this.data8 = Object.assign({}, data['data'][0]);
        console.log('loan datadddddddddddddddddd : ', this.data8)
        // this.loanType.emit(this.data.LOAN_TYPE_ID);
        //console.log()
        this.data.LOAN_AMOUNT1 = this.data8.LOAN_AMOUNT;
        console.log('loan ammmmmmmnttttttttt : ',this.data.LOAN_AMOUNT1)


        
      }
    }, err => {
      ////console.log(err);
    });


  }








  


  AmounttoWordss(event: number) {
    this.golddata1.VALUATION_AMOUNT = event;

    // this.Amount = event;
    // let words = toWords.convert( this.Amount, { currency: true });
    if (this.golddata1.VALUATION_AMOUNT == null || this.golddata1.VALUATION_AMOUNT == 0) {
      this.golddata1.LOAN_AMOUNT_IN_WORDSSS = "";

    } else {
      if (this.browserLang == 'en') {
        this.golddata1.LOAN_AMOUNT_IN_WORDSSS = toWords.convert(this.golddata1.VALUATION_AMOUNT, { currency: true });
      }
      else if (this.browserLang == 'kn') {
        this.golddata1.LOAN_AMOUNT_IN_WORDSSS = toWords_kn.convert(this.golddata1.VALUATION_AMOUNT, { currency: true });
      }
      else if (this.browserLang == 'mr') {
        this.golddata1.LOAN_AMOUNT_IN_WORDSSS = toWords_mr.convert(this.golddata1.VALUATION_AMOUNT, { currency: true });
      }
      console.log(this.golddata1.LOAN_AMOUNT_IN_WORDSSS, " this.data3.LOAN_AMOUNT_IN_WORDSS")
    }


  }


  getwords() {
    this.golddata1.LOAN_AMOUNT_IN_WORDSSS = this.convertNumberToWordss(
      this.golddata1.VALUATION_AMOUNT
    );
  }
  convertNumberToWordss(num) {
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




  ValuationAmounttoWord(event: number) {
    this.data.total = event;

    // this.Amount = event;
    // let words = toWords.convert( this.Amount, { currency: true });
    if (this.data.total == null || this.data.total == 0) {
      this.data.VALUATION_AMOUNT_IN_WORDS = "";

    } else 
      if (this.browserLang == 'en') {
        this.data.VALUATION_AMOUNT_IN_WORDS = toWords.convert(this.data.total, { currency: true });
      }
    //   else if (this.browserLang == 'kn') {
    //     this.data.VALUATION_AMOUNT_IN_WORDS = toWords_kn.convert(this.data.total, { currency: true });
    //   }
    //   else if (this.browserLang == 'mr') {
    //     this.data.VALUATION_AMOUNT_IN_WORDS = toWords_mr.convert(this.data.total, { currency: true });
    //   }
    //   console.log(this.data.VALUATION_AMOUNT_IN_WORDS, " this.data3.VALUATION_AMOUNT_IN_WORDS")
    // }






  }


  getValuationAmountword() {
    this.data.VALUATION_AMOUNT_IN_WORDS = this.convertNumberToWordss(
      this.data.total
    );
  }
  convertValuationAmountToWordss(num) {
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


