import {
  Component,
  OnInit,
  Input,
  ViewChild,
  EventEmitter,
  Output,
} from "@angular/core";
import { Loaninformation } from "src/app/Models/PersonalProposal/loaninformation";
import { Extraapplicantinfo } from "src/app/Models/extraapplicantinfo";
import { Personalloan } from "src/app/Models/LoanTypeQues/personalloan";
import { ApiService } from "src/app/Service/api.service";
import {
  NzNotificationService,
  NzModalService,
  NzModalRef,
  kn_IN,
} from "ng-zorro-antd";
import { Bankloanscheme } from "src/app/Models/PersonalProposal/bankloanscheme";
import { PrimesecurityinfoComponent } from "../../primesecurityinfo/primesecurityinfo.component";
import { DatePipe } from "@angular/common";
import { conformToMask } from "angular2-text-mask";
import createAutoCorrectedDatePipe from "text-mask-addons/dist/createAutoCorrectedDatePipe";
import { Purposeofloan } from "src/app/Models/PersonalProposal/purposeofloan";
// import { timeStamp } from 'console';
import { ToWords } from "to-words";

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
  selector: "app-loaninfomation",
  templateUrl: "./loaninfomation.component.html",
  styleUrls: ["./loaninfomation.component.css"],
})
export class LoaninfomationComponent implements OnInit {
  @Input() PROPOSAL_ID: Number;
  @Input() data: Loaninformation;
  @Output() demo: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() loanType: EventEmitter<number> = new EventEmitter<number>();
  questionies: Personalloan = new Personalloan();
  @Input() CURRENT_STAGE_ID: number;
  @Input() extraApplicantInformation: Extraapplicantinfo =
    new Extraapplicantinfo();
  isSpinning = false;
  @Input() LOAN_KEY: Number;
  isButtonSpinning = false;
  logtext: string = "";
  userId = sessionStorage.getItem("userId");
  installmentFrequencyData: any;
  roleId = sessionStorage.getItem("roleId");
  loanpurpose = [new Purposeofloan()];
  termdata: any;
  PurposeloanData: any;
  isSpinning1 = false;
  loanData: any;
  isButtonVerifySpinning = false;
  index = 0;
  interest = true;
  term = true;
  loanSkimData: Bankloanscheme[];
  disable1 = false;
  confirmModal?: NzModalRef;
  loadingLoanTypes = false;
  browserLang = "kn";
  filterQuery = "";
  proposalType = sessionStorage.getItem("PRAPOSAL_TYPE");
  pipe = new DatePipe("en-US");
  TENURE_OF_LOAN2 = 0;
  converted: any;
  public mask = [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/];
  autoCorrectedDatePipe = createAutoCorrectedDatePipe("dd/mm/yyyy HH:MM");

  amulya_total: number;
  LoanAmountOption: number;
  SanctionAmountOption: number;
  total_amount = true

  loantypeid = localStorage.getItem("loantypeid");

  @ViewChild(PrimesecurityinfoComponent, { static: false })
  prime: PrimesecurityinfoComponent;
  constructor(
    private api: ApiService,
    private message: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.loadInfo();
    this.browserLang = localStorage.getItem("locale");
  }




  claculate() {
    if (this.data.INTEREST_RATE && this.data.TERM_ID && this.data.INSTALLMENT_FREQUENCY_ID && this.data.LOAN_AMOUNT) {

      var terdata = this.termdata.filter(
        (termid) => termid.ID == this.data.TERM_ID
      );
      var name = terdata[0]["NAME"];
      var d = name.split("(");
      let year;
      if (this.data.TERM_ID > 5) {
        year = Number(d[1].substr(0, 2));
      } else {
        year = Number(d[1].substr(0, 1));
      }

      let installmentFrequency = 1

      let principle_amount = Number(this.data.LOAN_AMOUNT);



      if (this.data.INSTALLMENT_FREQUENCY_ID == 2) {
        this.data.INSTALLMENT_COUNT = (year * 12) / 1;
        installmentFrequency = 12;
      }


      if (this.data.INSTALLMENT_FREQUENCY_ID == 3) {
        this.data.INSTALLMENT_COUNT = (year * 12) / 3;
        installmentFrequency = 4;
      }


      if (this.data.INSTALLMENT_FREQUENCY_ID == 4) {
        this.data.INSTALLMENT_COUNT = (year * 12) / 6;
        installmentFrequency = 2;
      }


      if (this.data.INSTALLMENT_FREQUENCY_ID == 5) {
        this.data.INSTALLMENT_COUNT = (year * 12) / 12;
        installmentFrequency = 1;
      }


      if (this.data.INSTALLMENT_FREQUENCY_ID == 6) {
        this.data.INSTALLMENT_COUNT = (year * 12) / 3;
        installmentFrequency = 4;
      }


      if (this.data.INSTALLMENT_FREQUENCY_ID == 10) {
        this.data.INSTALLMENT_COUNT = 1;
        installmentFrequency = 1;
      }

      if (this.data.INSTALLMENT_FREQUENCY_ID == 7) {
        this.data.INSTALLMENT_COUNT = (year * 12) / 6;
        installmentFrequency = 2;
      }


      if (this.data.INSTALLMENT_FREQUENCY_ID == 8) {
        this.data.INSTALLMENT_COUNT = (year * 12) / 12;
        installmentFrequency = 1;
      }


      if (this.data.INSTALLMENT_FREQUENCY_ID == 11) {
        this.data.INSTALLMENT_COUNT = (year * 12) / 24;
        installmentFrequency = 1;
      }


      if (this.data.INSTALLMENT_FREQUENCY_ID == 12) {
        this.data.INSTALLMENT_COUNT = (year * 12) / 36;
        installmentFrequency = 1;
      }

      if (this.data.LOAN_TYPE_ID == 5 || this.data.LOAN_TYPE_ID == 7) {
        let tenure_of_loan_month = Number(this.data.INSTALLMENT_COUNT);
        //console.log("tenure_of_loan_month", tenure_of_loan_month)
        let interest_per_month = (Number(this.data.INTEREST_RATE) / Number(installmentFrequency)) / 100;

        let emi = (principle_amount * interest_per_month * Math.pow((1 + interest_per_month), tenure_of_loan_month)) / (Math.pow((1 + interest_per_month), (tenure_of_loan_month)) - 1);

        //console.log("emi ", emi)
        //console.log("data", this.data)
        this.data.INSTALLMENT_AMOUNT = Math.round(emi);
      }
      else {
        let emi = this.data.LOAN_AMOUNT / this.data.INSTALLMENT_COUNT;
        this.data.INSTALLMENT_AMOUNT = Math.round(emi);
      }


    }
  }

  calcYear(event) {
    this.data.TENURE_OF_LOAN = event;
    this.TENURE_OF_LOAN2 = this.data.TENURE_OF_LOAN / 12;
    this.TENURE_OF_LOAN2 = parseFloat(this.TENURE_OF_LOAN2.toFixed(2));

    if (this.data.INSTALLMENT_FREQUENCY_ID != undefined) {
      this.calcInstallments(this.data.INSTALLMENT_FREQUENCY_ID);
    }
  }

  calcMonth(event) {
    this.TENURE_OF_LOAN2 = event;
    this.data.TENURE_OF_LOAN = this.TENURE_OF_LOAN2 * 12;

    if (this.data.INSTALLMENT_FREQUENCY_ID != undefined) {
      this.calcInstallments(this.data.INSTALLMENT_FREQUENCY_ID);
    }
  }

  calcInstallments(event) {
    this.data.INSTALLMENT_FREQUENCY_ID = event;
    // if(this.data.TERM_ID)

    if (this.data.TERM_ID != undefined && this.data.TERM_ID != 0) {
      var terdata = this.termdata.filter(
        (termid) => termid.ID == this.data.TERM_ID
      );
      var name = terdata[0]["NAME"];
      var d = name.split("(");
      let year;
    
      if (this.data.TERM_ID > 5) {
        year = Number(d[1].substr(0, 2));
      } else {
        year = Number(d[1].substr(0, 1));
      }
   
      console.log(year);
      if (this.data.INSTALLMENT_FREQUENCY_ID == 2)
        this.data.INSTALLMENT_COUNT = (year * 12) / 1;
      this.data.INSTALLMENT_AMOUNT =
        this.data.LOAN_AMOUNT / this.data.INSTALLMENT_COUNT;

      if (this.data.INSTALLMENT_FREQUENCY_ID == 3)
        this.data.INSTALLMENT_COUNT = (year * 12) / 3;
      this.data.INSTALLMENT_AMOUNT =
        this.data.LOAN_AMOUNT / this.data.INSTALLMENT_COUNT;

      if (this.data.INSTALLMENT_FREQUENCY_ID == 4)
        this.data.INSTALLMENT_COUNT = (year * 12) / 6;
      this.data.INSTALLMENT_AMOUNT =
        this.data.LOAN_AMOUNT / this.data.INSTALLMENT_COUNT;

      if (this.data.INSTALLMENT_FREQUENCY_ID == 5)
        this.data.INSTALLMENT_COUNT = (year * 12) / 12;
      this.data.INSTALLMENT_AMOUNT =
        this.data.LOAN_AMOUNT / this.data.INSTALLMENT_COUNT;

      if (this.data.INSTALLMENT_FREQUENCY_ID == 6)
        this.data.INSTALLMENT_COUNT = (year * 12) / 3;
      this.data.INSTALLMENT_AMOUNT =
        this.data.LOAN_AMOUNT / this.data.INSTALLMENT_COUNT;

      if (this.data.INSTALLMENT_FREQUENCY_ID == 10)
        this.data.INSTALLMENT_COUNT = 1;
      this.data.INSTALLMENT_AMOUNT =
        this.data.LOAN_AMOUNT / this.data.INSTALLMENT_COUNT;

      if (this.data.INSTALLMENT_FREQUENCY_ID == 7)
        this.data.INSTALLMENT_COUNT = (year * 12) / 6;
      this.data.INSTALLMENT_AMOUNT =
        this.data.LOAN_AMOUNT / this.data.INSTALLMENT_COUNT;

      if (this.data.INSTALLMENT_FREQUENCY_ID == 8)
        this.data.INSTALLMENT_COUNT = (year * 12) / 12;
      this.data.INSTALLMENT_AMOUNT =
        this.data.LOAN_AMOUNT / this.data.INSTALLMENT_COUNT;

      if (this.data.INSTALLMENT_FREQUENCY_ID == 11)
        this.data.INSTALLMENT_COUNT = (year * 12) / 24;
      this.data.INSTALLMENT_AMOUNT =
        this.data.LOAN_AMOUNT / this.data.INSTALLMENT_COUNT;

      if (this.data.INSTALLMENT_FREQUENCY_ID == 12)
        this.data.INSTALLMENT_COUNT = (year * 12) / 36;
      this.data.INSTALLMENT_AMOUNT =
        this.data.LOAN_AMOUNT / this.data.INSTALLMENT_COUNT;

      this.data.INSTALLMENT_COUNT = Math.ceil(this.data.INSTALLMENT_COUNT);
      this.data.INSTALLMENT_AMOUNT = Math.ceil(this.data.INSTALLMENT_AMOUNT);
      // console.log(this.data.INSTALLMENT_COUNT);
      console.log(this.data.INSTALLMENT_AMOUNT);
    } else {
      this.data.INSTALLMENT_COUNT = 0;
    }
  }

  calcInstallments1(event:number) {
    this.data.LOAN_AMOUNT = event;

    // this.Amount = event;
    // let words = toWords.convert( this.Amount, { currency: true });
    if (this.data.LOAN_AMOUNT == null || this.data.LOAN_AMOUNT == 0) {
      this.data.LOAN_AMOUNT_IN_WORDS = "";

    } else {
      if (this.browserLang == 'en') {
        this.data.LOAN_AMOUNT_IN_WORDS = toWords.convert(this.data.LOAN_AMOUNT, { currency: true });
      }
      else if(this.browserLang== 'kn'){
        this.data.LOAN_AMOUNT_IN_WORDS = toWords_kn.convert(this.data.LOAN_AMOUNT, { currency: true });
      }
      else if(this.browserLang== 'mr'){
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

    this.claculate();


  }

  calcInstallments2(event) {
    this.data.TERM_ID = event;
    console.log("Term Id", this.data.TERM_ID);
    if (this.data.TERM_ID != undefined && this.data.TERM_ID != 0) {
      var terdata = this.termdata.filter(
        (termid) => termid.ID == this.data.TERM_ID
      );
      var name = terdata[0]["NAME"];
      var d = name.split("(");
      let year;
     
      if (this.data.TERM_ID > 5) {
        year = Number(d[1].substr(0, 2));
      } else {
        year = Number(d[1].substr(0, 1));
      }
      
      console.log("year", year);

      if (this.data.INSTALLMENT_FREQUENCY_ID == 2)
        this.data.INSTALLMENT_COUNT = (year * 12) / 1;
      this.data.INSTALLMENT_AMOUNT =
        this.data.LOAN_AMOUNT / this.data.INSTALLMENT_COUNT;

      if (this.data.INSTALLMENT_FREQUENCY_ID == 3)
        this.data.INSTALLMENT_COUNT = (year * 12) / 3;
      this.data.INSTALLMENT_AMOUNT =
        this.data.LOAN_AMOUNT / this.data.INSTALLMENT_COUNT;

      if (this.data.INSTALLMENT_FREQUENCY_ID == 4)
        this.data.INSTALLMENT_COUNT = (year * 12) / 6;
      this.data.INSTALLMENT_AMOUNT =
        this.data.LOAN_AMOUNT / this.data.INSTALLMENT_COUNT;

      if (this.data.INSTALLMENT_FREQUENCY_ID == 5)
        this.data.INSTALLMENT_COUNT = (year * 12) / 12;
      this.data.INSTALLMENT_AMOUNT =
        this.data.LOAN_AMOUNT / this.data.INSTALLMENT_COUNT;

      if (this.data.INSTALLMENT_FREQUENCY_ID == 6)
        this.data.INSTALLMENT_COUNT = (year * 12) / 3;
      this.data.INSTALLMENT_AMOUNT =
        this.data.LOAN_AMOUNT / this.data.INSTALLMENT_COUNT;

      if (this.data.INSTALLMENT_FREQUENCY_ID == 10)
        this.data.INSTALLMENT_COUNT = 1;
      this.data.INSTALLMENT_AMOUNT =
        this.data.LOAN_AMOUNT / this.data.INSTALLMENT_COUNT;

      if (this.data.INSTALLMENT_FREQUENCY_ID == 7)
        this.data.INSTALLMENT_COUNT = (year * 12) / 6;
      this.data.INSTALLMENT_AMOUNT =
        this.data.LOAN_AMOUNT / this.data.INSTALLMENT_COUNT;

      if (this.data.INSTALLMENT_FREQUENCY_ID == 8)
        this.data.INSTALLMENT_COUNT = (year * 12) / 12;
      this.data.INSTALLMENT_AMOUNT =
        this.data.LOAN_AMOUNT / this.data.INSTALLMENT_COUNT;

      if (this.data.INSTALLMENT_FREQUENCY_ID == 11)
        this.data.INSTALLMENT_COUNT = (year * 12) / 24;
      this.data.INSTALLMENT_AMOUNT =
        this.data.LOAN_AMOUNT / this.data.INSTALLMENT_COUNT;

      if (this.data.INSTALLMENT_FREQUENCY_ID == 12)
        this.data.INSTALLMENT_COUNT = (year * 12) / 36;
      this.data.INSTALLMENT_AMOUNT =
        this.data.LOAN_AMOUNT / this.data.INSTALLMENT_COUNT;

      this.data.INSTALLMENT_COUNT = Math.ceil(this.data.INSTALLMENT_COUNT);
      this.data.INSTALLMENT_AMOUNT = Math.ceil(this.data.INSTALLMENT_AMOUNT);
      // console.log(this.data.INSTALLMENT_COUNT);
      console.log(this.data.INSTALLMENT_AMOUNT);
    } else {
      this.data.INSTALLMENT_COUNT = 0;
    }
  }

  onIndexChange(value) {
    this.index = value;
  }

  loadInfo() {
    let filter =
      " AND EXTRA_INFORMATION_ID=3 AND PROPOSAL_ID=" + this.PROPOSAL_ID;
    this.api
      .getAllApplicantExtraInformation(0, 0, "SEQ_NO", "asc", filter)
      .subscribe(
        (data) => {
          this.extraApplicantInformation = data["data"][0];
        },
        (err) => {
          //console.log(err);
        }
      );
  }


  rate(event) {
    this.LoanAmountOption = event
    //console.log(this.LoanAmountOption)
    if (this.LoanAmountOption == 1) {
      this.data.INTEREST_RATE = 10
      this.data.TERM_ID = 50
      this.data.INSTALLMENT_AMOUNT = 100
      this.data.LOAN_AMOUNT = 5000;
      this.amulya_total = ~~this.data.INSTALLMENT_AMOUNT + ~~this.data.INTEREST_RATE;
    }

    if (this.LoanAmountOption == 2) {
      this.data.INTEREST_RATE = 20
      this.data.TERM_ID = 50
      this.data.INSTALLMENT_AMOUNT = 200
      this.data.LOAN_AMOUNT = 10000;
      this.amulya_total = ~~this.data.INSTALLMENT_AMOUNT + ~~this.data.INTEREST_RATE;
    }

    if (this.LoanAmountOption == 3) {
      this.data.INTEREST_RATE = 30
      this.data.TERM_ID = 50
      this.data.INSTALLMENT_AMOUNT = 300
      this.data.LOAN_AMOUNT = 15000;
      this.amulya_total = ~~this.data.INSTALLMENT_AMOUNT + ~~this.data.INTEREST_RATE;
    }

    if (this.LoanAmountOption == 4) {
      this.data.INTEREST_RATE = 40
      this.data.TERM_ID = 50
      this.data.INSTALLMENT_AMOUNT = 400
      this.data.LOAN_AMOUNT = 20000;
      this.amulya_total = ~~this.data.INSTALLMENT_AMOUNT + ~~this.data.INTEREST_RATE;
    }

    if (this.LoanAmountOption == 5) {
      this.data.INTEREST_RATE = 50
      this.data.TERM_ID = 50
      this.data.INSTALLMENT_AMOUNT = 500
      this.data.LOAN_AMOUNT = 25000;
      this.amulya_total = ~~this.data.INSTALLMENT_AMOUNT + ~~this.data.INTEREST_RATE;
    }

    if (this.LoanAmountOption == 6) {
      this.data.INTEREST_RATE = 60
      this.data.TERM_ID = 50
      this.data.INSTALLMENT_AMOUNT = 600
      this.data.LOAN_AMOUNT = 30000;
      this.amulya_total = ~~this.data.INSTALLMENT_AMOUNT + ~~this.data.INTEREST_RATE;
    }

    if (this.data.LOAN_AMOUNT == null || this.data.LOAN_AMOUNT == 0) {
      this.data.LOAN_AMOUNT_IN_WORDS = ""

    }
    else {
      this.data.LOAN_AMOUNT_IN_WORDS = toWords.convert(this.data.LOAN_AMOUNT, { currency: true });

    }

  }
  sanc(event) {
    if (this.data.TERM_ID == 50) {
      this.data.INTEREST_RATE = 60
      this.data.INSTALLMENT_AMOUNT = 600
      this.data.LOAN_AMOUNT = 30000;
      this.amulya_total = ~~this.data.INSTALLMENT_AMOUNT + ~~this.data.INTEREST_RATE;
    }
    if (this.data.TERM_ID == 75) {
      this.data.INTEREST_RATE = 60
      this.data.INSTALLMENT_AMOUNT = 400
      this.data.LOAN_AMOUNT = 30000;
      this.amulya_total = ~~this.data.INSTALLMENT_AMOUNT + ~~this.data.INTEREST_RATE;
    }

  }

  // rate(event) {
  //   this.data.LOAN_AMOUNT = event;
  //   console.log(this.data.LOAN_AMOUNT);
  //   if (this.data.LOAN_AMOUNT == 1) {
  //     this.data.INTEREST_RATE = 10;
  //     this.data.TERM_ID = 50;
  //     this.data.INSTALLMENT_AMOUNT = 100;
  //   }

  //   if (this.data.LOAN_AMOUNT == 2) {
  //     this.data.INTEREST_RATE = 20;
  //     this.data.TERM_ID = 50;
  //     this.data.INSTALLMENT_AMOUNT = 200;
  //   }

  //   if (this.data.LOAN_AMOUNT == 3) {
  //     this.data.INTEREST_RATE = 30;
  //     this.data.TERM_ID = 50;
  //     this.data.INSTALLMENT_AMOUNT = 300;
  //   }

  //   if (this.data.LOAN_AMOUNT == 4) {
  //     this.data.INTEREST_RATE = 40;
  //     this.data.TERM_ID = 50;
  //     this.data.INSTALLMENT_AMOUNT = 400;
  //   }

  //   if (this.data.LOAN_AMOUNT == 5) {
  //     this.data.INTEREST_RATE = 50;
  //     this.data.TERM_ID = 50;
  //     this.data.INSTALLMENT_AMOUNT = 500;
  //   }

  //   if (this.data.LOAN_AMOUNT == 6) {
  //     this.data.INTEREST_RATE = 60;
  //     this.data.TERM_ID = 50;
  //     this.data.INSTALLMENT_AMOUNT = 600;
  //   }

  //   if (this.data.LOAN_AMOUNT == 7) {
  //     this.data.INTEREST_RATE = 60;
  //     this.data.TERM_ID = 75;
  //     this.data.INSTALLMENT_AMOUNT = 700;
  //   }
  // }

  // rate1(event) {
  //   this.data.LOAN_AMOUNT = event
  //   console.log(this.data.LOAN_AMOUNT)
  //   if (this.data.LOAN_AMOUNT == 1) {
  //     this.data.TERM_ID = 50
  //   }

  //   if (this.data.LOAN_AMOUNT == 2) {
  //     this.data.TERM_ID = 50
  //   }

  //   if (this.data.LOAN_AMOUNT == 3) {
  //     this.data.TERM_ID = 50
  //   }

  //   if (this.data.LOAN_AMOUNT == 4) {
  //     this.data.TERM_ID = 50
  //   }

  //   if (this.data.LOAN_AMOUNT == 5) {
  //     this.data.TERM_ID = 50
  //   }

  //   if (this.data.LOAN_AMOUNT == 6) {
  //     this.data.TERM_ID = 50
  //   }

  //   if (this.data.LOAN_AMOUNT == 7) {
  //     this.data.TERM_ID = 75
  //   }

  // }
  getData() {
    this.proposalType = sessionStorage.getItem("PRAPOSAL_TYPE");
    if (this.proposalType == "1") {
      this.filterQuery = " AND IS_INDIVIDUAL=1 ";
    } else {
      this.filterQuery = " AND IS_FIRM=1 ";
    }
    this.loadingLoanTypes = true;
    this.api
      .getAllLoanScheme(0, 0, "ID", "asc", " AND IS_ACTIVE = 1")
      .subscribe((successCode) => {
        this.loadingLoanTypes = false;
        if (successCode["code"] == "200" && successCode["count"] > 0) {
          this.loanData = successCode["data"];
          this.data.LOAN_PURPOSE_ID = successCode["data"][0]["LOAN_PURPOSE_ID"];

          console.log(this.data.LOAN_PURPOSE_ID);
          var filter = "AND LOAN_TYPE_ID =" + this.data.LOAN_TYPE_ID;

          this.api.getAllPurposeofloan(0, 0, "ID", "asc", filter).subscribe(
            (data) => {
              if (data["code"] == "200") {
                this.loanpurpose = data["data"];
                this.isSpinning1 = false;
              }
            },
            (err) => {
              //console.log(err);
            }
          );
          this.changepurpose(this.data.LOAN_TYPE_ID);
        }
      });
    this.isSpinning1 = true;
    this.api
      .getAllInstallmentFrequency(0, 0, "ID", "asc", "AND IS_ACTIVE = '1'")
      .subscribe(
        (data) => {
          if (data["code"] == "200") {
            this.installmentFrequencyData = data["data"];
            this.isSpinning1 = false;
            console.log('Installment Frequency',this.installmentFrequencyData);
          }
        },
        (err) => {
          //console.log(err);
        }
      );


      this.isSpinning = true
    let filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID
    this.api.getAllLoanInformation(0, 0, 'ID', "asc", filter).subscribe(data => {
      ////console.log("loan info")
      ////console.log(data)
      if (data['count'] > 0) {
        this.data = Object.assign({}, data['data'][0]);
        //console.log('loan data : ', this.data)
        this.loanType.emit(this.data.LOAN_TYPE_ID);
        //console.log()

        if (this.data.LOAN_TYPE_ID == 17) {
          if (this.data.LOAN_AMOUNT == 5000) {
            this.LoanAmountOption = 1;
            this.data.INTEREST_RATE = 10
            this.data.TERM_ID = 50
            this.data.INSTALLMENT_AMOUNT = 100
            this.amulya_total = ~~this.data.INSTALLMENT_AMOUNT + ~~this.data.INTEREST_RATE;
          }
          if (this.data.LOAN_AMOUNT == 10000) {
            this.LoanAmountOption = 2;
            this.data.INTEREST_RATE = 20
            this.data.TERM_ID = 50
            this.data.INSTALLMENT_AMOUNT = 200
            this.amulya_total = ~~this.data.INSTALLMENT_AMOUNT + ~~this.data.INTEREST_RATE;
          }
          if (this.data.LOAN_AMOUNT == 15000) {
            this.LoanAmountOption = 3;
            this.data.INTEREST_RATE = 30
            this.data.TERM_ID = 50
            this.data.INSTALLMENT_AMOUNT = 300
            this.amulya_total = ~~this.data.INSTALLMENT_AMOUNT + ~~this.data.INTEREST_RATE;
          }
          if (this.data.LOAN_AMOUNT == 20000) {
            this.LoanAmountOption = 4;
            this.data.INTEREST_RATE = 40
            this.data.TERM_ID = 50
            this.data.INSTALLMENT_AMOUNT = 400
            this.amulya_total = ~~this.data.INSTALLMENT_AMOUNT + ~~this.data.INTEREST_RATE;
          }
          if (this.data.LOAN_AMOUNT == 25000) {
            this.LoanAmountOption = 5;
            this.data.INTEREST_RATE = 50
            this.data.TERM_ID = 50
            this.data.INSTALLMENT_AMOUNT = 500
            this.amulya_total = ~~this.data.INSTALLMENT_AMOUNT + ~~this.data.INTEREST_RATE;
          }
          if (this.data.LOAN_AMOUNT == 30000) {
            this.LoanAmountOption = 6;
            this.data.INTEREST_RATE = 60
            if (this.data.TERM_ID == 75) {
              this.data.TERM_ID = 75
              this.data.INSTALLMENT_AMOUNT = 400
            }
            if (this.data.TERM_ID == 50) {
              this.data.TERM_ID = 50
              this.data.INSTALLMENT_AMOUNT = 600
            }
            this.amulya_total = ~~this.data.INSTALLMENT_AMOUNT + ~~this.data.INTEREST_RATE;
          }
        }

        if (this.data.BANK_LOAN_TYPE_ID == 0)
          this.disable1 = false
        else
          // this.disable1=true
          this.disable1 = false

        this.isSpinning1 = true
        this.api.getAllTermofLoan(1, 20, 'ID', "asc", "").subscribe(data => {
          if (data['code'] == "200") {
            this.termdata = data['data'];
            this.isSpinning1 = false;
            this.calcYear(this.data.TENURE_OF_LOAN)

          }
        }, err => {
          ////console.log(err);
        });

        this.isSpinning = false
      }
    }, err => {
      ////console.log(err);
    });

    // this.isSpinning = true;
    // let filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID;
    // this.api.getAllLoanInformation(0, 0, "ID", "asc", filter).subscribe(
    //   (data) => {
    //     //console.log("loan info")
    //     //console.log(data)
    //     if (data["count"] > 0) {
    //       this.data = Object.assign({}, data["data"][0]);
    //       if (this.data.BANK_LOAN_TYPE_ID == 0) this.disable1 = false;
    //       // this.disable1=true
    //       else this.disable1 = false;

    //       this.isSpinning1 = true;
    //       this.api.getAllTermofLoan(1, 20, "ID", "asc", "").subscribe(
    //         (data) => {
    //           if (data["code"] == "200") {
    //             this.termdata = data["data"];
    //             console.log("termdata ", this.termdata);
    //             this.isSpinning1 = false;
    //             this.calcYear(this.data.TENURE_OF_LOAN);
    //           }
    //         },
    //         (err) => {
    //           //console.log(err);
    //         }
    //       );

    //       this.isSpinning = false;
    //     }
    //   },
    //   (err) => {
    //     //console.log(err);
    //   }
    // );
  }

  changepurpose(event) {
    console.log(event);
    this.data.LOAN_TYPE_ID = event;
    this.loanType.emit(this.data.BANK_LOAN_TYPE_ID);
    var filter = "AND LOAN_TYPE_ID =" + this.data.LOAN_TYPE_ID;

    this.api.getAllPurposeofloan(0, 0, "ID", "asc", filter).subscribe(
      (data) => {
        if (data["code"] == "200") {
          this.loanpurpose = data["data"];
          this.isSpinning1 = false;
        }
      },
      (err) => {
        //console.log(err);
      }
    );
  }

  divide = 0;

  set1(event) {
    this.data.LOAN_AMOUNT = event;
    this.data.INSTALLMENT_COUNT =
      this.data.LOAN_AMOUNT / this.data.INSTALLMENT_AMOUNT;

    this.divide = this.data.INSTALLMENT_COUNT;

    console.log(this.divide, "Installmentcount");
  }

  divide1 = 0;

  set(event) {
    this.data.INSTALLMENT_AMOUNT = event;
    this.data.INSTALLMENT_COUNT =
      this.data.LOAN_AMOUNT / this.data.INSTALLMENT_AMOUNT;

    this.divide = this.data.INSTALLMENT_COUNT;

    console.log(this.divide, "Installmentcount");
  }

  save(): void {
    this.data.BANK_LOAN_TYPE_ID = this.data.LOAN_TYPE_ID;
    if (
      this.data.LOAN_PURPOSE_ID != undefined &&
      this.data.LOAN_AMOUNT.toString().trim() != "" &&
      this.data.LOAN_AMOUNT_IN_WORDS != undefined &&
      this.data.LOAN_AMOUNT_IN_WORDS.toString().trim() != ""
    ) {
      this.isButtonSpinning = true;
      if (this.data.INSURANCE_AMOUNT == undefined) {
        this.data.INSURANCE_AMOUNT = 0;
      }
      if (this.data.SHARE_AMOUNT == undefined) {
        this.data.SHARE_AMOUNT = 0;
      }
      if (this.data.SECURITY_DEPOSIT == undefined) {
        this.data.SECURITY_DEPOSIT = 0;
      }

      if (
        this.data.INSTALLMENT_FREQUENCY_ID == undefined ||
        this.data.INSTALLMENT_FREQUENCY_ID.toString().trim() == ""
      ) {
        this.data.INSTALLMENT_FREQUENCY_ID = 0;
      }
      if (
        this.data.TENURE_OF_LOAN == undefined ||
        this.data.TENURE_OF_LOAN.toString().trim() == ""
      ) {
        this.data.TENURE_OF_LOAN = 0;
      }

      if (
        this.data.INSTALLMENT_AMOUNT == undefined ||
        this.data.INSTALLMENT_AMOUNT.toString().trim() == ""
      ) {
        this.data.INSTALLMENT_AMOUNT = 0;
      }

      if (
        this.data.INSTALLMENT_COUNT == undefined ||
        this.data.INSTALLMENT_COUNT.toString().trim() == ""
      ) {
        this.data.INSTALLMENT_COUNT = 0;
      }

      if (this.data.NOMINEE_NAME == undefined) {
        this.data.NOMINEE_NAME = " ";
      }
      if (this.data.REAL_ESTATE_MARKING == undefined) {
        this.data.REAL_ESTATE_MARKING = " ";
      }
      if (this.data.NOMINEE_AGE == undefined) {
        this.data.NOMINEE_AGE = " ";
      }
      if (this.data.NOMINEE_ADDRESS == undefined) {
        this.data.NOMINEE_ADDRESS = " ";
      }
      if (this.data.NOMINEE_RELATION == undefined) {
        this.data.NOMINEE_RELATION = " ";
      }

      if (this.data.HAND_WRITTEN_AMT_IN_WORDS == undefined) {
        this.data.HAND_WRITTEN_AMT_IN_WORDS = " ";
      }

      this.data.IS_LOAN_SCHEME_UPDATE = 1;
      this.data.PENALTY_INTEREST = 2;

      var dateOk = true;
      if (
        this.data.SANCTION_DATE == undefined ||
        this.data.SANCTION_DATE == ""
      ) {
        this.data.SANCTION_DATE = null;
      } else if (
        this.data.SANCTION_DATE[0] >= 0 &&
        this.data.SANCTION_DATE[0] <= 9 &&
        this.data.SANCTION_DATE[1] >= 0 &&
        this.data.SANCTION_DATE[1] <= 9 &&
        this.data.SANCTION_DATE[3] >= 0 &&
        this.data.SANCTION_DATE[3] <= 9 &&
        this.data.SANCTION_DATE[4] >= 0 &&
        this.data.SANCTION_DATE[4] <= 9 &&
        this.data.SANCTION_DATE[9] >= 0 &&
        this.data.SANCTION_DATE[9] <= 9 &&
        this.data.SANCTION_DATE[8] >= 0 &&
        this.data.SANCTION_DATE[8] <= 9 &&
        this.data.SANCTION_DATE[7] >= 0 &&
        this.data.SANCTION_DATE[7] <= 9 &&
        this.data.SANCTION_DATE[6] >= 0 &&
        this.data.SANCTION_DATE[6] <= 9
      ) {
        var conformedPhoneNumber = conformToMask(
          this.data.SANCTION_DATE,
          this.mask,
          { guide: false }
        );
        const str = conformedPhoneNumber.conformedValue.split("/");

        const year = Number(str[2]);
        const month = Number(str[1]) - 1;
        const dates = Number(str[0]);

        this.converted = new Date(year, month, dates);

        this.data.SANCTION_DATE = this.pipe.transform(
          this.converted,
          "yyyy-MM-dd"
        );
      } else {
        dateOk = false;
        this.message.error(
          this.api.translate.instant("basicinfo.dateerror"),
          ""
        );
      }
      if (dateOk) {
        if (this.data.ID) {
          this.api.updateLoanDemand(this.data).subscribe((successCode) => {
            if (successCode["code"] == "200") {
              sessionStorage.setItem(
                "bankLoanId",
                this.data.BANK_LOAN_TYPE_ID.toString()
              );
              this.message.success(
                this.api.translate.instant("common.message.success.addinfo"),
                ""
              );
              this.isButtonSpinning = false;
              var LOG_ACTION = "User saved Loan Demand Info  tab information";
              var DESCRIPTION =
                sessionStorage.getItem("userName") +
                "has saved the Loan Demand Info  for the proposal " +
                this.LOAN_KEY;
              var LOG_TYPE = "I";
              this.api
                .proposalLogInformation(
                  this.extraApplicantInformation.PROPOSAL_ID,
                  this.extraApplicantInformation.CURRENT_STAGE_ID,
                  0,
                  LOG_ACTION,
                  Number(sessionStorage.getItem("userId")),
                  DESCRIPTION,
                  LOG_TYPE
                )
                .subscribe((successCode) => {
                  if (successCode["code"] == "200") {
                  }
                });
              this.demo.emit(false);
              this.getData();
              this.logtext =
                "Update & Close - loadDemand form - SUCCESS " +
                JSON.stringify(this.data) +
                " KEYWORD [U - loadDemand ]";
              this.api
                .addLog("A", this.logtext, this.api.emailId)
                .subscribe((successCode) => {
                  if (successCode["code"] == "200") {
                    //console.log(successCode);
                  } else {
                    //console.log(successCode);
                  }
                });
              this.isButtonSpinning = false;
            } else {
              this.logtext =
                "Update & Close - loadDemand form - ERROR - " +
                JSON.stringify(this.data) +
                " KEYWORD [U - loadDemand ]";
              this.api
                .addLog("A", this.logtext, this.api.emailId)
                .subscribe((successCode) => {
                  if (successCode["code"] == "200") {
                    //console.log(successCode);
                  } else {
                    //console.log(successCode);
                  }
                });
              this.message.error(
                this.api.translate.instant("common.message.error.addfailed"),
                ""
              );
              this.isButtonSpinning = false;
            }
          });
        }
      }
    } else {
      if (this.data.BANK_LOAN_TYPE_ID == 0)
        this.message.error(
          this.api.translate.instant("loaninfomation.message1"),
          ""
        );
      else if (this.data.INSTALLMENT_FREQUENCY_ID == 0)
        this.message.error(
          this.api.translate.instant("loaninfomation.message2"),
          ""
        );
      else if (
        this.data.INSTALLMENT_AMOUNT == undefined ||
        this.data.INSTALLMENT_AMOUNT == 0
      )
        this.message.error(
          this.api.translate.instant("loaninfomation.message3"),
          ""
        );
      else if (
        this.data.TENURE_OF_LOAN.toString().trim() == "" ||
        this.data.TENURE_OF_LOAN == 0
      )
        this.message.error(
          this.api.translate.instant("common.message.error.emptyinfo"),
          ""
        );
      else if (
        this.data.LOAN_AMOUNT_IN_WORDS == undefined ||
        this.data.LOAN_AMOUNT_IN_WORDS.toString().trim() == ""
      )
        this.message.error(
          this.api.translate.instant("loaninfomation.message4"),
          ""
        );
    }

    // if (this.data.BANK_LOAN_TYPE_ID !== undefined
    //   && this.data.LOAN_PURPOSE.trim() != ''
    //   && this.data.LOAN_AMOUNT.toString().trim() != ''
    //   && this.data.TENURE_OF_LOAN.toString().trim() != '') {
    //   this.isButtonSpinning = true
    //   if (this.data.ID) {

    //     this.api.updateLoanDemand(this.data)
    //       .subscribe(successCode => {
    //         if (successCode['code'] == "200") {
    //           this.getData()
    //           // this.oldIndex++;
    //           // this.indexChanged.emit(this.oldIndex)
    //           this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
    //           this.logtext = 'Update & Close - loadDemand form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - loadDemand ]";
    //           this.api.addLog('A', this.logtext, this.userId)
    //             .subscribe(successCode => {
    //               if (successCode['code'] == "200") {
    //                 //console.log(successCode);
    //               }
    //               else {
    //                 //console.log(successCode);
    //               }
    //             });
    //           this.isButtonSpinning = false

    //         }
    //         else {
    //           this.logtext = 'Update & Close - loadDemand form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - loadDemand ]";
    //           this.api.addLog('A', this.logtext, this.userId)
    //             .subscribe(successCode => {
    //               if (successCode['code'] == "200") {
    //                 //console.log(successCode);
    //               }
    //               else {
    //                 //console.log(successCode);
    //               }
    //             });
    //           this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
    //           this.isButtonSpinning = false

    //         }
    //       });
    //   }
    // } else {
    //   this.message.error("योग्य माहिती नमूद करा", "");
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

  // convertNumberToWords(amount) {
  //   var words = new Array();
  //   words[0] = '';
  //   words[1] = 'One';
  //   words[2] = 'Two';
  //   words[3] = 'Three';
  //   words[4] = 'Four';
  //   words[5] = 'Five';
  //   words[6] = 'Six';
  //   words[7] = 'Seven';
  //   words[8] = 'Eight';
  //   words[9] = 'Nine';
  //   words[10] = 'Ten';
  //   words[11] = 'Eleven';
  //   words[12] = 'Twelve';
  //   words[13] = 'Thirteen';
  //   words[14] = 'Fourteen';
  //   words[15] = 'Fifteen';
  //   words[16] = 'Sixteen';
  //   words[17] = 'Seventeen';
  //   words[18] = 'Eighteen';
  //   words[19] = 'Nineteen';
  //   words[20] = 'Twenty';
  //   words[30] = 'Thirty';
  //   words[40] = 'Forty';
  //   words[50] = 'Fifty';
  //   words[60] = 'Sixty';
  //   words[70] = 'Seventy';
  //   words[80] = 'Eighty';
  //   words[90] = 'Ninety';
  //   amount = amount.toString();
  //   var atemp = amount.split(".");
  //   var number = atemp[0].split(",").join("");
  //   var n_length = number.length;
  //   var words_string = "";
  //   if (n_length <= 9) {
  //     var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
  //     var received_n_array = new Array();
  //     for (var i = 0; i < n_length; i++) {
  //       received_n_array[i] = number.substr(i, 1);
  //     }
  //     for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
  //       n_array[i] = received_n_array[j];
  //     }
  //     for (var i = 0, j = 1; i < 9; i++, j++) {
  //       if (i == 0 || i == 2 || i == 4 || i == 7) {
  //         if (n_array[i] == 1) {
  //           n_array[j] = 10 + (n_array[j]);
  //           n_array[i] = 0;
  //         }
  //       }
  //     }
  //     var value = 0;
  //     for (var i = 0; i < 9; i++) {
  //       if (i == 0 || i == 2 || i == 4 || i == 7) {
  //         value = n_array[i] * 10;
  //       } else {
  //         value = n_array[i];
  //       }
  //       if (value != 0) {
  //         words_string += words[value] + " ";
  //       }
  //       if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
  //         words_string += "Crores ";
  //       }
  //       if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
  //         words_string += "Lakhs ";
  //       }
  //       if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
  //         words_string += "Thousand ";
  //       }
  //       if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
  //         words_string += "Hundred and ";
  //       } else if (i == 6 && value != 0) {
  //         words_string += "Hundred ";
  //       }
  //     }
  //     words_string = words_string.split("  ").join(" ");
  //   }
  //   return words_string;
  // }

  VerifyUpdate() {
    this.isButtonVerifySpinning = true;
    this.extraApplicantInformation.IS_VERIFIED = true;
    this.api
      .updateApplicantExtraInformation(this.extraApplicantInformation)
      .subscribe((successCode) => {
        if (successCode["code"] == "200") {
          this.getData();
          this.demo.emit(false);
          this.isButtonVerifySpinning = false;
          // this.oldIndex++;
          // this.indexChanged.emit(this.oldIndex)
          var LOG_ACTION = "";
          var DESCRIPTION = "";
          if (this.extraApplicantInformation.IS_APPROVED == true) {
            LOG_ACTION = "Loan info Tab information Verified";

            DESCRIPTION =
              sessionStorage.getItem("userName") +
              " has checked and approved the Loan info for the proposal " +
              this.LOAN_KEY +
              " and given the remark -" +
              this.extraApplicantInformation.REMARK;
          } else {
            LOG_ACTION = "Loan info Tab information Rejected";
            DESCRIPTION =
              sessionStorage.getItem("userName") +
              "has checked and rejected the Loan info for the proposal " +
              this.LOAN_KEY +
              " and given the remark -" +
              this.extraApplicantInformation.REMARK;
          }
          var LOG_TYPE = "I";
          this.api
            .proposalLogInformation(
              this.extraApplicantInformation.PROPOSAL_ID,
              this.extraApplicantInformation.CURRENT_STAGE_ID,
              0,
              LOG_ACTION,
              Number(sessionStorage.getItem("userId")),
              DESCRIPTION,
              LOG_TYPE
            )
            .subscribe((successCode) => {
              if (successCode["code"] == "200") {
              }
            });
        } else {
          this.message.error(
            this.api.translate.instant("common.message.error.addfailed"),
            ""
          );
          this.isButtonVerifySpinning = false;
        }
      });
  }
  cancel(): void {}

  confirm2(): void {
    this.extraApplicantInformation.IS_APPROVED = false;
    if (
      this.extraApplicantInformation.REMARK == undefined ||
      this.extraApplicantInformation.REMARK.trim() == ""
    ) {
      this.message.error(
        this.api.translate.instant("common.message.error.remarkempty"),
        ""
      );
    } else {
      this.VerifyUpdate();
    }
  }

  confirm(): void {
    this.extraApplicantInformation.REMARK = " ";
    this.extraApplicantInformation.IS_APPROVED = true;
    this.VerifyUpdate();
  }
}
