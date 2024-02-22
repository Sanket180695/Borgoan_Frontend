import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ApiService } from 'src/app/Service/api.service';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { conformToMask } from 'angular2-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'
import { FRecurringDeposit } from 'src/app/Models/PersonalProposal/FrecurringDeposit';
import { Financialinformation } from 'src/app/Models/PersonalProposal/financialinformation';
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

export class depositLoan {
  ID: number;
  CLIENT_ID: number;
  PROPOSAL_ID: number;
  RECEIPT_NO: string
  RECEIPT_AMOUNT: number
  RECEIPT_DATE: any
  TYPE: string
  INTEREST_RATE: number
  MATURITY_DUE: any
  ARCHIVE_FLAG: string;
  SANCTION_AMOUNT3: number;
  INTEREST_RATE1: number;
  DAYS: number;
  DEPOSIT_TYPE: any;
  TOTAL_AMOUNT_IN_WORDS: string;
  TOTALAMT:number;
  TOTALAMTWORDS: string;
  WRITTEN_TOTALAMT_WORDS:string;


  constructor() {
    this.ARCHIVE_FLAG = 'F'
  }
}
@Component({
  selector: 'app-depositeloan',
  templateUrl: './depositeloan.component.html',
  styleUrls: ['./depositeloan.component.css']
})
export class DepositeloanComponent implements OnInit {
  data: depositLoan = new depositLoan();
  dataCode = 0
  @Input() data3: FRecurringDeposit
  saveCount: number = 0;
  @Input() drawerClose3: Function;

  termDepositdata: FRecurringDeposit[] = [];
  @Input() PROPOSAL_ID: number;
  @Input() DEPOSIT_TYPE: number

  proposalType = Number(sessionStorage.getItem("PRAPOSAL_TYPE"))
  FinanceData: Financialinformation = new Financialinformation();

  @Input() APPLICANT_ID: number
  incomeSourceId: number = 0
  otherincomeSourceId: number = 0
 
  dataList = []
  isSpinning = false
  isButtonSpinning = false
  logtext: string = "";

  pipe = new DatePipe('en-US');
  @Output() demo = new EventEmitter<string>();
  @Input() CURRENT_STAGE_ID: number;
  @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();
  @Input() BANK_LOAN_TYPE_ID: number;
  loadingRecords = false;
  browserLang="kn"
  


  converted: any;
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')
  constructor(private api: ApiService, private message: NzNotificationService) {
  }
  disabledDate = (current) => {
    return new Date() < current;
  }
  ngOnInit(): void {
    this.getdata();
    this.getTermDeposit();
    this.getdata1();
    this.data.SANCTION_AMOUNT3;
    console.log("im innnnn",this.data.SANCTION_AMOUNT3)
    this.loadData();
    this.browserLang = localStorage.getItem('locale');
  }

  getdata() {
    if (this.BANK_LOAN_TYPE_ID == 9) {
      this.data.TYPE = 'R'
    }
    if (this.BANK_LOAN_TYPE_ID == 10) {
      this.data.TYPE = 'D'
    }
    if (this.BANK_LOAN_TYPE_ID == 11) {
      this.data.TYPE = 'P'
    }
    if (this.BANK_LOAN_TYPE_ID == 12) {
      this.data.TYPE = 'C'
    }

    this.loadingRecords = true;

    this.api.getDepositInformation(this.PROPOSAL_ID,'T').subscribe(data => {
      this.loadingRecords = false
      if (data['code'] == '200' && data['data'].length > 0) {
        this.data = data['data'][0];
      }
    }, err => {
      //console.log(err);
    });
  }


  save1(): void {

    var isValid = true;

    if (isValid) {
      // this.data.RECEIPT_DATE = this.pipe.transform(this.data.RECEIPT_DATE, 'yyyy-MM-dd');
      this.isButtonSpinning = true;
      this.data.PROPOSAL_ID = this.PROPOSAL_ID;
      if (this.data.ID) {
        this.api.updatedepositLoan(this.data)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

              this.logtext = 'Update & Close - depositLoan form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - depositLoan ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                  }
                });
              this.data = new depositLoan()
              // this.demo.emit()
              this.getdata1();

              this.isButtonSpinning = false;
            }
            else {
              this.message.error(this.api.translate.instant('common.message.error.updatefailed'), "");
              this.isButtonSpinning = false;
            }
          });
      }
      else {

        this.api.createdepositLoan(this.data)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('common.message.success.addinfo2'), "")
              this.indexChanged.emit(1)
              this.logtext = 'Save & New - depositLoan form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - depositLoan ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                  }
                });
              this.data = new depositLoan()
              // this.getdata();
              this.demo.emit()
              this.isButtonSpinning = false;
            }
            else {
              this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
              this.isButtonSpinning = false;
              this.logtext = 'Save & Close - depositLoan form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - depositLoan ]";
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
      this.message.error(this.api.translate.instant('common.message.error.compinfo2'), "");
    }
    this.demo.emit('')
  }

  // save(): void {
  //   var isValid = true;

  //   // if (this.data.TYPE == undefined || this.data.TYPE == '') {
  //   //   isValid = false;
  //   // }
  //   if (this.data.RECEIPT_NO == undefined || this.data.RECEIPT_NO == '') {
  //     isValid = false;
  //   }
  //   if (this.data.RECEIPT_AMOUNT == undefined || this.data.RECEIPT_AMOUNT <= 0) {
  //     isValid = false;
  //   }
  //   if (this.data.RECEIPT_DATE == undefined || this.data.RECEIPT_DATE == '') {
  //     isValid = false;

  //   }
  //   if (this.data.RECEIPT_DATE[0] >= 0 && this.data.RECEIPT_DATE[0] <= 9
  //     && this.data.RECEIPT_DATE[1] >= 0 && this.data.RECEIPT_DATE[1] <= 9
  //     && this.data.RECEIPT_DATE[3] >= 0 && this.data.RECEIPT_DATE[3] <= 9 &&
  //     this.data.RECEIPT_DATE[4] >= 0 && this.data.RECEIPT_DATE[4] <= 9 &&
  //     this.data.RECEIPT_DATE[9] >= 0 && this.data.RECEIPT_DATE[9] <= 9 &&
  //     this.data.RECEIPT_DATE[8] >= 0 && this.data.RECEIPT_DATE[8] <= 9 &&
  //     this.data.RECEIPT_DATE[7] >= 0 && this.data.RECEIPT_DATE[7] <= 9 &&
  //     this.data.RECEIPT_DATE[6] >= 0 && this.data.RECEIPT_DATE[6] <= 9) {

  //     var conformedPhoneNumber = conformToMask(
  //       this.data.RECEIPT_DATE,
  //       this.mask,
  //       { guide: false }
  //     )
  //     const str = conformedPhoneNumber.conformedValue.split('/');

  //     const year = Number(str[2]);
  //     const month = Number(str[1]) - 1;
  //     const dates = Number(str[0]);

  //     this.converted = new Date(year, month, dates)
  //     this.data.RECEIPT_DATE = this.pipe.transform(this.converted, 'yyyy-MM-dd');

  //   }
  //   else {
  //     isValid = false
  //     this.message.error(this.api.translate.instant('basicinfo.dateerror'), "")
  //   }


  //   if (isValid) {
  //     // this.data.RECEIPT_DATE = this.pipe.transform(this.data.RECEIPT_DATE, 'yyyy-MM-dd');
  //     this.isButtonSpinning = true;
  //     this.data.PROPOSAL_ID = this.PROPOSAL_ID;
  //     if (this.data.ID) {
  //       this.api.updatedepositLoan(this.data)
  //         .subscribe(successCode => {
  //           if (successCode['code'] == "200") {
  //             this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

  //             this.logtext = 'Update & Close - depositLoan form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - depositLoan ]";
  //             this.api.addLog('A', this.logtext, this.api.emailId)
  //               .subscribe(successCode => {
  //                 if (successCode['code'] == "200") {
  //                   //console.log(successCode);
  //                 }
  //                 else {
  //                   //console.log(successCode);
  //                 }
  //               });
  //             this.data = new depositLoan()
  //             // this.demo.emit()
  //             this.getdata();

  //             this.isButtonSpinning = false;
  //           }
  //           else {
  //             this.message.error(this.api.translate.instant('common.message.error.updatefailed'), "");
  //             this.isButtonSpinning = false;
  //           }
  //         });
  //     }
  //     else {

  //       this.api.createdepositLoan(this.data)
  //         .subscribe(successCode => {
  //           if (successCode['code'] == "200") {
  //             this.message.success(this.api.translate.instant('common.message.success.addinfo2'), "")
  //             this.indexChanged.emit(1)
  //             this.logtext = 'Save & New - depositLoan form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - depositLoan ]";
  //             this.api.addLog('A', this.logtext, this.api.emailId)
  //               .subscribe(successCode => {
  //                 if (successCode['code'] == "200") {
  //                   //console.log(successCode);
  //                 }
  //                 else {
  //                   //console.log(successCode);
  //                 }
  //               });
  //             this.data = new depositLoan()
  //             // this.getdata();
  //             this.demo.emit()
  //             this.isButtonSpinning = false;
  //           }
  //           else {
  //             this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
  //             this.isButtonSpinning = false;
  //             this.logtext = 'Save & Close - depositLoan form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - depositLoan ]";
  //             this.api.addLog('A', this.logtext, this.api.emailId)
  //               .subscribe(successCode => {
  //                 if (successCode['code'] == "200") {
  //                   //console.log(successCode);
  //                 }
  //                 else {
  //                   //console.log(successCode);
  //                 }
  //               });

  //           }
  //         });
  //     }
  //   } else {
  //     this.message.error(this.api.translate.instant('common.message.error.compinfo2'), "");
  //   }


  // }
  addData() {

    var isValid = true;

    if (this.data.RECEIPT_NO == undefined || this.data.RECEIPT_NO == '') {
      isValid = false;
      this.message.error(this.api.translate.instant('goldloan.t1_message'), "");
    }
    if (this.data.RECEIPT_AMOUNT == undefined || this.data.RECEIPT_AMOUNT <= 0) {
      isValid = false;
      this.message.error(this.api.translate.instant('goldloan.t2_message'), "");
    }
    if (this.data.INTEREST_RATE == undefined || this.data.INTEREST_RATE <= 0) {
      isValid = false;
      this.message.error(this.api.translate.instant('goldloan.t3_message'), "");
    }
    if (this.data.MATURITY_DUE == undefined || this.data.MATURITY_DUE <= 0) {
      isValid = false;
      this.message.error(this.api.translate.instant('goldloan.t4_message'), "");
    }



    if (isValid) {

      if (this.data.ID) {
        this.api.updatedepositLoan(this.data).subscribe({
          next: (res) => {
            if (res['code'] == 200) {
              this.getdata1();
              // this.getdata();
              this.data = new depositLoan();
            }
          }
        })
      }
      else {
        this.data.PROPOSAL_ID = this.PROPOSAL_ID;
        this.data.CLIENT_ID = this.api.clientId;
        this.api.createdepositLoan(this.data).subscribe({
          next: (res) => {
            if (res['code'] == 200) {
              this.getdata1();
              this.data = new depositLoan();
            }
          }
        })
      }
    }

  }
  getdata1() {
    this.loadingRecords = true
    this.dataList = []
    this.api.getAlldepositLoan(this.PROPOSAL_ID,this.DEPOSIT_TYPE).subscribe(data => {
      this.loadingRecords = false
      if (data['code'] == '200' && data['data'] > 0) {
        this.data = data['data'];
      }
    }, err => {
      //console.log(err);
    });

    // this.getdata11();


  }

  getTermDeposit() {
    this.api.getDepositInformation(this.PROPOSAL_ID, 'T').subscribe(
      successCode => {
        if (successCode['code'] == 200) {
          this.termDepositdata = successCode['data']
          if (this.termDepositdata && this.termDepositdata.length > 0) {
            // Set data.SANCTION_AMOUNT to 90% of the first ACC_AMOUNT
            this.data.SANCTION_AMOUNT3 = this.calculate90Percent(this.totalIncome1());

          }
          if (this.termDepositdata && this.termDepositdata.length > 0) {
            // Set data.SANCTION_AMOUNT to 90% of the first ACC_AMOUNT
            const TOTALAMT = this.totalIncome1();
            this.data.TOTALAMT = TOTALAMT

          }
          if (this.termDepositdata && this.termDepositdata.length > 0) {
            // Set data.INTEREST_RATE1 to INTEREST_RATE from the table plus 2
            const interestRate: number = this.termDepositdata[0].INTEREST_RATE + 2;
            // this.data.INTEREST_RATE1 = this.termDepositdata[0].INTEREST_RATE + 2;
            this.data.INTEREST_RATE1 = +interestRate.toFixed(2); 
          }

          if (this.termDepositdata && this.termDepositdata.length > 0) {
            // Calculate the average interest rate
            const averageInterestRate1 = this.averageInterest();
            // Set data.INTEREST_RATE1 to the average interest rate plus 2
            this.data.INTEREST_RATE1 = averageInterestRate1 + 2;
          }
          const earliestMaturityDate = this.earliestMaturityDueDate();
          if (earliestMaturityDate && this.termDepositdata && this.termDepositdata.length > 0) {
            // Calculate the number of days remaining
            const currentDate = new Date();
            const daysRemaining = Math.floor((earliestMaturityDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
            // Set data.days to the number of days remaining
            this.data.DAYS = daysRemaining;
          }

        }
      }
    )
    this.ValuationAmounttoWord(this.data.TOTALAMT);
  }
  updateInterestRate(value: string) {
    // Parse the formatted value back to a number and update the actual data property
    this.data.INTEREST_RATE1 = parseFloat(value.replace(',', ''));
  }
  updateSanctionRate(value: string) {
    // Parse the formatted value back to a number and update the actual data property
    this.data.SANCTION_AMOUNT3 = parseFloat(value.replace(',', ''));
  }
 

  calculate90Percent(amount: number): number {
    const ninetyPercent = 0.9 * amount;
    
    // Round to two decimal places
    const roundedValue = Math.round(ninetyPercent * 100) / 100;

    return roundedValue;
}
  loadData() {
   
    this.api.getFinancialInformation(this.PROPOSAL_ID, "B", this.APPLICANT_ID).subscribe(data => {

      if (data['code'] == 200 && data['data'].length > 0) {
        this.FinanceData = data['data'][0]

       
        this.getTermDeposit();
      
    
  


        // this.dataList1 = this.FinanceData['TERM_DEPOSIT']
        // this.dataList = this.FinanceData['RECURING_DEPOSIT']
        // this.dataList22 = this.FinanceData['CURRENT_DEPOSIT']
        this.isSpinning = false
        //console.log(this.FinanceData, "finanacial")
        //console.log(data)

        if (this.proposalType == 1) {
          let filter = "AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND TYPE='B'"
          this.api.getAllIncomeInformation(0, 0, "ID", 'desc', filter)
            .subscribe(data => {
              ////console.log("income info in financial")
              ////console.log(data)
              if (data['code'] == 200 && data['data'].length > 0) {
                this.incomeSourceId = data['data'][0]['INCOME_SOURCE_ID']
                this.otherincomeSourceId = data['data'][0]['OTHER_INCOME_SOURCE_ID']
                // this.otherincomeSourceId2 = data['data'][0]['OTHER_INCOME_SOURCE_ID2']
              }
            }, err => {
              ////console.log(err);
            });
        }

        this.dataCode = data['code']
        // this.data = Object.assign({}, data['data'][0]);


        // if (this.data.DAILY_PIGMY_AMOUNT == 0)
        //   this.data.DAILY_PIGMY_AMOUNT = undefined

        // if (this.data.PIGMY_BALANCE == 0)
        //   this.data.PIGMY_BALANCE = undefined



        // this.data.LAST_3_YEAR_INFORMATION = data['data'][0]['LAST_3_YEAR_INFORMATION']
        // this.year1 = this.data.LAST_3_YEAR_INFORMATION[0]['FINANCIAL_YEAR']
        // this.year2 = this.data.LAST_3_YEAR_INFORMATION[1]['FINANCIAL_YEAR']
        // this.year3 = this.data.LAST_3_YEAR_INFORMATION[2]['FINANCIAL_YEAR']
        // this.calculate(0)
        // this.calculate(1)
        // this.calculate(2)
        // this.calculateTotal(0)
        // this.calculateTotal(1)
        // this.calculateTotal(2)
      }
    }, err => {
      ////console.log(err);
    });
  }

  // delete(data) {
  //   data.ARCHIVE_FLAG = "T";
  //   this.api.updatedepositLoan(data)
  //     .subscribe(successCode => {
  //       if (successCode['code'] == "200") {
  //         this.getdata1();
  //       }
  //     });
  // }

  // GoldFamily: Goldloan1 = new Goldloan1();

  // edit(data: any) {
  //   this.data = data;
  //   let arr = this.dataList.filter(value => {
  //     return value.ID != data.ID
  //   })
  //   this.dataList = arr;
  // }

  totalIncome1() {
    let total6 = 0;
    console.log("im inthe totalincomedepo",this.termDepositdata)

    for (const amt of this.termDepositdata) {

      total6 += parseFloat(amt.ACC_AMOUNT.toString());

    }

    return total6;
  }

  averageInterest() {
    if (this.termDepositdata.length === 0) {
      return 0; // Handle the case when the array is empty to avoid division by zero
    }

    let totalInterest = 0;

    for (const entry of this.termDepositdata) {
      // Assuming that the property name is 'interest', modify it if your property is named differently
      totalInterest += parseFloat(entry.INTEREST_RATE.toString());
    }

    // Calculate the average by dividing the total interest by the number of entries
    const average = totalInterest / this.termDepositdata.length;

    return average;
  }

  totalCountOfReceiptNo() {
    // Initialize a variable to store the total count
    let totalCount = 0;

    for (const entry of this.termDepositdata) {
      // Assuming that the property name is 'receipt.no', modify it if your property is named differently
      // Check if the entry has a receipt number before incrementing the count
      if (entry['RECEIPT_NO']) {
        totalCount++;
      }
    }

    return totalCount;
  }

  getDaysRemaining(): number | null {
    const earliestMaturityDate = this.earliestMaturityDueDate();
  
    if (!earliestMaturityDate) {
      return null;
    }
  
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
  
    const MS_PER_DAY = 24 * 60 * 60 * 1000;
    const daysRemaining = Math.floor((earliestMaturityDate.getTime() - currentDate.getTime()) / MS_PER_DAY);
  
    return daysRemaining;
  }
  
 


  earliestMaturityDueDate(): Date | null {
    if (this.termDepositdata.length === 0) {
      return null;
    }
  
    let earliestDueDate: Date | null = null;
  
    this.termDepositdata.forEach(entry => {
      const maturityDateString = entry['MATURITY_DUE'];
      const [day, month, year] = maturityDateString.split('/').map(Number);
  
      // Note: Month in JavaScript Date is 0-indexed, so subtract 1 from the parsed month
      const maturityDate = new Date(year, month - 1, day);
      maturityDate.setHours(0, 0, 0, 0);
  
      if (!earliestDueDate || maturityDate < earliestDueDate) {
        earliestDueDate = maturityDate;
      }
    });
  
    return earliestDueDate;
  }
  
  
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
  
    return `${month}/${day}/${year}`;
  }
  
  // Add a new function to format the earliest maturity date
  formatEarliestMaturityDate(): string | null {
    const earliestMaturityDate = this.earliestMaturityDueDate();
  
    if (!earliestMaturityDate) {
      return null;
    }
  
    return this.formatDate(earliestMaturityDate);
  }

  ValuationAmounttoWord(event: number) {
    this.data.TOTALAMT = event;

    // this.Amount = event;
    // let words = toWords.convert( this.Amount, { currency: true });
    if (this.data.TOTALAMT == null || this.data.TOTALAMT == 0) {
      this.data.TOTALAMTWORDS = "";

    } else 
      if (this.browserLang == 'en') {
        this.data.TOTALAMTWORDS = toWords.convert(this.data.TOTALAMT, { currency: true });
      }
  






  }

  


}


