import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { Proposal } from 'src/app/Models/proposal';
import { ApiService } from 'src/app/Service/api.service';
import { DatePipe } from '@angular/common';
import { conformToMask } from 'angular2-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'
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
  selector: 'app-boardapproval',
  templateUrl: './boardapproval.component.html',
  styleUrls: ['./boardapproval.component.css']
})
export class BoardapprovalComponent implements OnInit {
  isButtonSpinning = false
  @Input() drawerClose: Function;
  @Input() data: Proposal;
  amulya_total: number;
  termdata: any
  REMARKS: string = ""
  STATUS = 'A'
  isSpinning = false
  fileDataFile1: File = null
  @ViewChild('file1', { static: false }) myInputVariable1: ElementRef;
  logtext = ""
  userId = sessionStorage.getItem("userId")
  fkey1 = ""
  userActivityLogData: Useractivitylog = new Useractivitylog();
  pipe = new DatePipe('en-US');
  converted: any;
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')

  constructor(private api: ApiService, private message: NzNotificationService, private datePipe: DatePipe,) { }

  ngOnInit(): void {
    this.fkey1 = this.api.documentFkey
  }

  //for date 

  getdata() {
    this.data.SANCTION_DATE = this.datePipe.transform(this.data.SANCTION_DATE, 'dd/MM/yyyy');
  }
  reset() {
    this.myInputVariable1.nativeElement.value = null;
    this.fileDataFile1 = null
  }

  onFileSelectedFile1(event) {
    this.fileDataFile1 = <File>event.target.files[0];
  }

  TENURE_OF_LOAN2 = 0;

  calcYear(event) {
    this.data.TENURE_OF_LOAN = event;
    this.TENURE_OF_LOAN2 = this.data.TENURE_OF_LOAN / 12;
    this.TENURE_OF_LOAN2 = parseFloat(this.TENURE_OF_LOAN2.toFixed(2))

    if (this.data.TYPE_OF_INSTALLMENT != undefined) {
      this.calcInstallments(this.data.TYPE_OF_INSTALLMENT)
    }
  }


calcMonth(event) {
  this.TENURE_OF_LOAN2 = event;
  this.data.TENURE_OF_LOAN = this.TENURE_OF_LOAN2 * 12;

  if (this.data.TYPE_OF_INSTALLMENT != undefined) {
    this.calcInstallments(this.data.TYPE_OF_INSTALLMENT)
  }
}

sanc(event) {
  if (this.data.TERM_OF_LOAN == 50) {
    this.data.RATE_OF_INTEREST = 60
    this.data.EMI_AMOUNT = 600
    this.data.SANCTION_AMOUNT = 30000;
    this.amulya_total = ~~this.data.EMI_AMOUNT + ~~this.data.RATE_OF_INTEREST;
  }
  if (this.data.TERM_OF_LOAN == 75) {
    this.data.RATE_OF_INTEREST = 60
    this.data.EMI_AMOUNT = 400
    this.data.SANCTION_AMOUNT = 30000;
    this.amulya_total = ~~this.data.EMI_AMOUNT + ~~this.data.RATE_OF_INTEREST;
  }

}

inputdatareflect(){
  if(this.data.LOAN_TYPE_ID == 8){
    this.data.RATE_OF_INTEREST = 15
    this.data.TYPE_OF_INSTALLMENT = 5
    this.data.TERM_OF_LOAN = 9
  }
}
inputdatareflect2(){
  if(this.data.LOAN_TYPE_ID == 10){
    this.data.SANCTION_AMOUNT = this.data.SANCTION_AMOUNT3
    this.data.RATE_OF_INTEREST = this.data.INTEREST_RATE1
  }
}
// getdata1() {
//   this.loadingRecords = true
//   // this.dataList = []
//   this.api.getAlldepositLoan(this.PROPOSAL_ID,this.DEPOSIT_TYPE).subscribe(data => {
//     this.loadingRecords = false
//     if (data['code'] == '200' && data['data'] > 0) {
//       this.data = data['data'];
//       console.log("in the boardapproval",this.data8.SANCTION_AMOUNT3)
//       console.log("in the boardapproval",this.data8)
//       console.log("in the boardapproval",this.data.SANCTION_AMOUNT)
//       this.data.SANCTION_AMOUNT = this.data8.SANCTION_AMOUNT3;
    
//     }
//   }, err => {
//     //console.log(err);
//   });

//   // this.getdata11();


// }









rate(event) {
  this.data.SANCTION_AMOUNT = event
  //console.log(this.LoanAmountOption)
  if (this.data.SANCTION_AMOUNT == 5000) {
    this.data.RATE_OF_INTEREST = 10
    this.data.TERM_OF_LOAN = 50
    this.data.EMI_AMOUNT = 100
    this.amulya_total = ~~this.data.EMI_AMOUNT + ~~this.data.RATE_OF_INTEREST;
  }

  if (this.data.SANCTION_AMOUNT == 10000) {
    this.data.RATE_OF_INTEREST = 20
    this.data.TERM_OF_LOAN = 50
    this.data.EMI_AMOUNT = 200
    this.amulya_total = ~~this.data.EMI_AMOUNT + ~~this.data.RATE_OF_INTEREST;
  }

  if (this.data.SANCTION_AMOUNT == 15000) {
    this.data.RATE_OF_INTEREST = 30
    this.data.TERM_OF_LOAN = 50
    this.data.EMI_AMOUNT = 300
    this.amulya_total = ~~this.data.EMI_AMOUNT + ~~this.data.RATE_OF_INTEREST;
  }

  if (this.data.SANCTION_AMOUNT == 20000) {
    this.data.RATE_OF_INTEREST = 40
    this.data.TERM_OF_LOAN = 50
    this.data.EMI_AMOUNT = 400

    this.amulya_total = ~~this.data.EMI_AMOUNT + ~~this.data.RATE_OF_INTEREST;
  }

  if (this.data.SANCTION_AMOUNT == 25000) {
    this.data.RATE_OF_INTEREST = 50
    this.data.TERM_OF_LOAN = 50
    this.data.EMI_AMOUNT = 500

    this.amulya_total = ~~this.data.EMI_AMOUNT + ~~this.data.RATE_OF_INTEREST;
  }

  if (this.data.SANCTION_AMOUNT == 30000) {
    this.data.RATE_OF_INTEREST = 60
    this.data.TERM_OF_LOAN = 50
    this.data.EMI_AMOUNT = 600
    this.amulya_total = ~~this.data.EMI_AMOUNT + ~~this.data.RATE_OF_INTEREST;
  }

  if (this.data.SANCTION_AMOUNT == null || this.data.SANCTION_AMOUNT == 0) {
    this.data.AMOUNT_IN_WORDS = ""

  }
  else {
    this.data.AMOUNT_IN_WORDS = toWords.convert(this.data.SANCTION_AMOUNT, { currency: true });

  }

}


calcInstallments(event) {
  this.data.TYPE_OF_INSTALLMENT = event;
  // if(this.data.TERM_OF_LOAN)


  if (this.data.TERM_OF_LOAN != undefined && this.data.TERM_OF_LOAN != 0) {
    var terdata = this.termdata.filter((termid) => termid.ID == this.data.TERM_OF_LOAN);
    var name = terdata[0]['NAME']
    var d = name.split('(')
    let year;
    if (this.data.TERM_OF_LOAN > 5) {
      year = Number(d[1].substr(0, 2));
    } else {
      year = Number(d[1].substr(0, 1));
    }
    if (this.data.TYPE_OF_INSTALLMENT == 2)
      this.INSTALLMENT_COUNT = (year * 12) / 1;
    this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

    if (this.data.TYPE_OF_INSTALLMENT == 3)
      this.INSTALLMENT_COUNT = (year * 12) / 3;
    this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

    if (this.data.TYPE_OF_INSTALLMENT == 4)
      this.INSTALLMENT_COUNT = (year * 12) / 6;
    this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

    if (this.data.TYPE_OF_INSTALLMENT == 5)
      this.INSTALLMENT_COUNT = (year * 12) / 12;
    this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

    if (this.data.TYPE_OF_INSTALLMENT == 6)
      this.INSTALLMENT_COUNT = (year * 12) / 3;
    this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

    if (this.data.TYPE_OF_INSTALLMENT == 10)
      this.INSTALLMENT_COUNT = 1;
    this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

    if (this.data.TYPE_OF_INSTALLMENT == 7)
      this.INSTALLMENT_COUNT = (year * 12) / 6;
    this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

    if (this.data.TYPE_OF_INSTALLMENT == 8)
      this.INSTALLMENT_COUNT = (year * 12) / 12;
    this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

    if (this.data.TYPE_OF_INSTALLMENT == 11)
      this.INSTALLMENT_COUNT = (year * 12) / 24;
    this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

    if (this.data.TYPE_OF_INSTALLMENT == 12)
      this.INSTALLMENT_COUNT = (year * 12) / 36;
    this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

    this.INSTALLMENT_COUNT = Math.ceil(this.INSTALLMENT_COUNT)
    this.data.EMI_AMOUNT = Math.ceil(this.data.EMI_AMOUNT)
    // //console.log(this.INSTALLMENT_COUNT);
    //console.log(this.data.EMI_AMOUNT);

  } else {
    this.INSTALLMENT_COUNT = 0
  }


}
INSTALLMENT_COUNT = 0
calcInstallments2(event) {
  this.data.TERM_OF_LOAN = event;


  if (this.data.TERM_OF_LOAN != undefined && this.data.TERM_OF_LOAN != null) {
    var terdata = this.termdata.filter((termid) => termid.ID == this.data.TERM_OF_LOAN);
    var name = terdata[0]['NAME']
    var d = name.split('(')
    let year;
    if (this.data.TERM_OF_LOAN > 5) {
      year = Number(d[1].substr(0, 2));
    } else {
      year = Number(d[1].substr(0, 1));
    }

    if (this.data.TYPE_OF_INSTALLMENT == 2)
      this.INSTALLMENT_COUNT = (year * 12) / 1;
    this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

    if (this.data.TYPE_OF_INSTALLMENT == 3)
      this.INSTALLMENT_COUNT = (year * 12) / 3;
    this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

    if (this.data.TYPE_OF_INSTALLMENT == 4)
      this.INSTALLMENT_COUNT = (year * 12) / 6;
    this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

    if (this.data.TYPE_OF_INSTALLMENT == 5)
      this.INSTALLMENT_COUNT = (year * 12) / 12;
    this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

    if (this.data.TYPE_OF_INSTALLMENT == 6)
      this.INSTALLMENT_COUNT = (year * 12) / 3;
    this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

    if (this.data.TYPE_OF_INSTALLMENT == 10)
      this.INSTALLMENT_COUNT = 1;
    this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

    if (this.data.TYPE_OF_INSTALLMENT == 7)
      this.INSTALLMENT_COUNT = (year * 12) / 6;
    this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

    if (this.data.TYPE_OF_INSTALLMENT == 8)
      this.INSTALLMENT_COUNT = (year * 12) / 12;
    this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

    if (this.data.TYPE_OF_INSTALLMENT == 11)
      this.INSTALLMENT_COUNT = (year * 12) / 24;
    this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

    if (this.data.TYPE_OF_INSTALLMENT == 12)
      this.INSTALLMENT_COUNT = (year * 12) / 36;
    this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

    this.INSTALLMENT_COUNT = Math.ceil(this.INSTALLMENT_COUNT)
    this.data.EMI_AMOUNT = Math.ceil(this.data.EMI_AMOUNT)
    // //console.log(this.INSTALLMENT_COUNT);
    //console.log(this.data.EMI_AMOUNT);

  } else {
    this.INSTALLMENT_COUNT = 0
  }


}
calcInstallments1(event) {
  this.data.SANCTION_AMOUNT = event;


  // this.Amount = event;
  // let words = toWords.convert( this.Amount, { currency: true });
  if (this.data.SANCTION_AMOUNT == null || this.data.SANCTION_AMOUNT == 0) {
    this.data.LOAN_AMOUNT_IN_WORDSS = ""

  }
  else {
    this.data.LOAN_AMOUNT_IN_WORDSS = toWords.convert(this.data.SANCTION_AMOUNT, { currency: true });

  }

  this.claculate();
 

}

claculate() {
  if (this.data.RATE_OF_INTEREST && this.data.TERM_OF_LOAN && this.data.TYPE_OF_INSTALLMENT && this.data.SANCTION_AMOUNT) {

    var terdata = this.termdata.filter(
      (termid) => termid.ID == this.data.TERM_OF_LOAN
    );
    var name = terdata[0]["NAME"];
    var d = name.split("(");
    let year;
    // if (this.data.TERM_OF_LOAN > 5) {
    //   year = Number(d[1].substr(0, 2));
    // } else {
    //   year = Number(d[1].substr(0, 1));
    // }

    if (this.data.TERM_ID > 5 && this.data.TERM_ID < 9) {
      year = Number(d[1].substr(0, 2));
    } else if (this.data.TERM_ID == 9){
      year = Number(d[1].substr(0, 1));
    }
    else{
      year = Number(d[1].substr(0, 1));
    }

    let installmentFrequency = 1

    let principle_amount = Number(this.data.SANCTION_AMOUNT);

    let INSTALLMENT_COUNT = 1


    if (this.data.TYPE_OF_INSTALLMENT == 2) {
      INSTALLMENT_COUNT = (year * 12) / 1;
      installmentFrequency = 12;
    }


    if (this.data.TYPE_OF_INSTALLMENT == 3) {
      INSTALLMENT_COUNT = (year * 12) / 3;
      installmentFrequency = 4;
    }


    if (this.data.TYPE_OF_INSTALLMENT == 4) {
      INSTALLMENT_COUNT = (year * 12) / 6;
      installmentFrequency = 2;
    }


    if (this.data.TYPE_OF_INSTALLMENT == 5) {
      INSTALLMENT_COUNT = (year * 12) / 12;
      installmentFrequency = 1;
    }


    if (this.data.TYPE_OF_INSTALLMENT == 6) {
      INSTALLMENT_COUNT = (year * 12) / 3;
      installmentFrequency = 4;
    }


    if (this.data.TYPE_OF_INSTALLMENT == 10) {
      INSTALLMENT_COUNT = 1;
      installmentFrequency = 1;
    }

    if (this.data.TYPE_OF_INSTALLMENT == 7) {
      INSTALLMENT_COUNT = (year * 12) / 6;
      installmentFrequency = 2;
    }


    if (this.data.TYPE_OF_INSTALLMENT == 8) {
      INSTALLMENT_COUNT = (year * 12) / 12;
      installmentFrequency = 1;
    }


    if (this.data.TYPE_OF_INSTALLMENT == 11) {
      INSTALLMENT_COUNT = (year * 12) / 24;
      installmentFrequency = 1;
    }


    if (this.data.TYPE_OF_INSTALLMENT == 12) {
      INSTALLMENT_COUNT = (year * 12) / 36;
      installmentFrequency = 1;
    }

    if (this.data.LOAN_TYPE_ID == 5 || this.data.LOAN_TYPE_ID == 7) {
      let tenure_of_loan_month = Number(INSTALLMENT_COUNT);
      //console.log("tenure_of_loan_month", tenure_of_loan_month)
      let interest_per_month = (Number(this.data.RATE_OF_INTEREST) / Number(installmentFrequency)) / 100;

      let emi = (principle_amount * interest_per_month * Math.pow((1 + interest_per_month), tenure_of_loan_month)) / (Math.pow((1 + interest_per_month), (tenure_of_loan_month)) - 1);

      //console.log("emi ", emi)
      //console.log("data", this.data)
      this.data.EMI_AMOUNT = Math.round(emi);
    }
    else {
      let emi = this.data.SANCTION_AMOUNT / INSTALLMENT_COUNT;
      this.data.EMI_AMOUNT = Math.round(emi);
    }


  }
}


  save() {
    if (this.STATUS == 'F' || this.STATUS == 'R') {
      this.data.SANCTION_FILE = ''
      if (this.STATUS == 'R') {
        var nextStageId = 6
      } else {
        var nextStageId = 8
      }
      if (this.REMARKS != undefined && this.REMARKS.trim() != '') {

        this.isButtonSpinning = true
        // //console.log(nextStageId, this.data.ID)
        this.api.updateStatus(this.data.CURRENT_STAGE_ID, nextStageId, " ", this.data.ID, 0)
          .subscribe(successCode => {
            // //console.log(successCode)
            this.isButtonSpinning = false

            if (successCode['code'] == "200") {
              if (this.STATUS == 'R') {
                var LOG_ACTION = 'Proposal has rejected by Board '

                var DESCRIPTION = sessionStorage.getItem('userName') + ' has marked proposal' + this.data['LOAN_KEY'] + ' as rejected on behalf of board and given remark -' + this.REMARKS
                var LOG_TYPE = 'I'
                this.api.proposalLogInformation(this.data.ID, this.data.CURRENT_STAGE_ID, 6, LOG_ACTION, Number(this.userId), DESCRIPTION, LOG_TYPE)
                  .subscribe(successCode => {
                    if (successCode['code'] == "200") {
                    }
                  });
              }
              if (this.STATUS == 'F') {
                var LOG_ACTION = 'Proposal resent to refill infomration'

                var DESCRIPTION = sessionStorage.getItem('userName') + ' has sent the proposal' + this.data['LOAN_KEY'] + ' to refill with remark -' + this.REMARKS
                var LOG_TYPE = 'I'
                this.api.proposalLogInformation(this.data.ID, this.data.CURRENT_STAGE_ID, 8, LOG_ACTION, Number(this.userId), DESCRIPTION, LOG_TYPE)
                  .subscribe(successCode => {
                    if (successCode['code'] == "200") {
                    }
                  });
              }
              // this.drawerClose()
              this.logtext = 'FinalApproval  - Proposal Rejected  form - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    // //console.log(successCode);
                  }
                  else {
                    // //console.log(successCode);

                  }
                });

              this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
              this.userActivityLogData.ACTIVITY_DETAILS = " FinalApproval  -   Proposal Rejected  " + "Stage Id" + nextStageId + JSON.stringify(this.data)
              this.userActivityLogData.ACTIVITY_TIME = new Date()
              this.api.createUserActivityLog(this.userActivityLogData)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    // //console.log(successCode);
                  }
                  else {
                    // //console.log(successCode);


                  }
                });


            }
            else {

              this.isButtonSpinning = false

              this.logtext = ' FinalApproval  -  Proposal Rejected  form - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - JoinedBranch ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    // //console.log(successCode);
                  }
                  else {
                    // //console.log(successCode);


                  }
                });
              this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
              this.userActivityLogData.ACTIVITY_DETAILS = " FinalApproval  -  Proposal Rejected  Failed" + "Stage Id" + nextStageId + JSON.stringify(this.data)
              this.userActivityLogData.ACTIVITY_TIME = new Date()
              this.api.createUserActivityLog(this.userActivityLogData)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    // //console.log(successCode);
                  }
                  else {
                    // //console.log(successCode);
                  }
                });
              this.message.error(this.api.translate.instant('common.message.error.failed'), "");

              this.isButtonSpinning = false

            }
          });
      } else {
      } this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
    } else {
      if (this.data.SANCTION_DATE != undefined && this.data.SANCTION_DATE != '' &&
        this.data.RESOLUTION_NO != undefined && this.data.RESOLUTION_NO != 0 &&
        this.data.RATE_OF_INTEREST != undefined &&
        this.data.SANCTION_AMOUNT != undefined && this.data.SANCTION_AMOUNT != 0
      ) {
        if (this.data.SANCTION_DATE[0] >= 0 && this.data.SANCTION_DATE[0] <= 9 && this.data.SANCTION_DATE[1] >= 0 && this.data.SANCTION_DATE[1] <= 9 && this.data.SANCTION_DATE[3] >= 0 && this.data.SANCTION_DATE[3] <= 9 && this.data.SANCTION_DATE[4] >= 0 && this.data.SANCTION_DATE[4] <= 9 && this.data.SANCTION_DATE[9] >= 0 && this.data.SANCTION_DATE[9] <= 9 && this.data.SANCTION_DATE[8] >= 0 && this.data.SANCTION_DATE[8] <= 9 && this.data.SANCTION_DATE[7] >= 0 && this.data.SANCTION_DATE[7] <= 9 && this.data.SANCTION_DATE[6] >= 0 && this.data.SANCTION_DATE[6] <= 9) {

          var conformedPhoneNumber = conformToMask(
            this.data.SANCTION_DATE,
            this.mask,
            { guide: false }
          )
          const str = conformedPhoneNumber.conformedValue.split('/');

          const year = Number(str[2]);
          const month = Number(str[1]) - 1;
          const dates = Number(str[0]);

          this.converted = new Date(year, month, dates)


          // if (this.converted <= new Date()) {
            this.data.SANCTION_DATE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
            this.REMARKS = ''
            if (this.fileDataFile1) {
              var fileExt = this.fileDataFile1.name.split('.').pop();
              this.api.onUploadNewMethod(this.fileDataFile1, fileExt, this.api.documentFkey)
                .subscribe(successCode => {
                  if (successCode['code'] == 200) {
                    let lkey = successCode['data'][0]['L_KEY']
                    this.data.SANCTION_FILE = lkey;
                    this.saveData();
                  }
                  else {
                    //console.log(successCode)
                  }
                });
            }
            else {
              if (this.fileDataFile1 == null)
                this.message.error(this.api.translate.instant('basicinfo.m19'), "");
            }
          // } else {

          //   this.message.error('Sanction Date cannot be in the future', '');
          // }
        }
        else {
          this.message.error('Invalid Sanction Date ', '')
        }
      } else {
        this.message.error(this.api.translate.instant('common.message.error.emptyinfo'), "");
      }


    }

  }

  saveData_GM() {
    this.isButtonSpinning = true;
    if (this.data.LOAN_RELEASE_DATE != undefined && this.data.LOAN_RELEASE_DATE != ''
    ) {
      if (this.data.LOAN_RELEASE_DATE[0] >= 0 && this.data.LOAN_RELEASE_DATE[0] <= 9 && this.data.LOAN_RELEASE_DATE[1] >= 0 && this.data.LOAN_RELEASE_DATE[1] <= 9 && this.data.LOAN_RELEASE_DATE[3] >= 0 && this.data.LOAN_RELEASE_DATE[3] <= 9 && this.data.LOAN_RELEASE_DATE[4] >= 0 && this.data.LOAN_RELEASE_DATE[4] <= 9 && this.data.LOAN_RELEASE_DATE[9] >= 0 && this.data.LOAN_RELEASE_DATE[9] <= 9 && this.data.LOAN_RELEASE_DATE[8] >= 0 && this.data.LOAN_RELEASE_DATE[8] <= 9 && this.data.LOAN_RELEASE_DATE[7] >= 0 && this.data.LOAN_RELEASE_DATE[7] <= 9 && this.data.LOAN_RELEASE_DATE[6] >= 0 && this.data.LOAN_RELEASE_DATE[6] <= 9) {

        var conformedPhoneNumber = conformToMask(
          this.data.LOAN_RELEASE_DATE,
          this.mask,
          { guide: false }
        )
        const str = conformedPhoneNumber.conformedValue.split('/');

        const year = Number(str[2]);
        const month = Number(str[1]) - 1;
        const dates = Number(str[0]);

        this.converted = new Date(year, month, dates)
        console.log('Loan Release Date01------------',this.data.LOAN_RELEASE_DATE)


        // if (this.converted <= new Date()) {
        this.data.LOAN_RELEASE_DATE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');

        console.log('Loan Release Date------------',this.data.LOAN_RELEASE_DATE)


        
      }
    }


    if(this.data.LOAN_TYPE_ID == 8 || this.data.LOAN_TYPE_ID == 9 || this.data.LOAN_TYPE_ID == 10 || this.data.LOAN_TYPE_ID == 11 || this.data.LOAN_TYPE_ID == 15){
      let nextStageId = 16
      this.api.passToMainBranch2(this.data.SIGNATURE, this.data.COMMITTEE_NO, this.data.AMOUNT_IN_WORDS, this.data.TERM_OF_LOAN,
        this.data.TYPE_OF_INSTALLMENT, this.data.EMI_AMOUNT, this.data.RESOLUTION_NO, this.data.RATE_OF_INTEREST,
        this.data.SANCTION_DATE, this.data.SANCTION_AMOUNT, this.data.ID, this.data.CURRENT_STAGE_ID,
        nextStageId, this.REMARKS, Number(this.userId), this.data.PROPOSAL_FILE, this.data.SANCTION_FILE, this.data.MOROTORIUM, this.data.LOAN_RELEASE_DATE, this.data.DISBURSED_AMOUNT, this.data.LOAN_AMOUNT_IN_WORDS, this.data.LOAN_AMOUNT_IN_WORDSS,this.data.INSTALLMENT_COUNT)
        .subscribe(successCode => {
          // ////console.log(successCode)

          if (successCode['code'] == "200") {
            this.isButtonSpinning = false
            this.message.success("Proposal has been Sent To Loan Officer", '');
            this.close();
          }
          else {
            this.isButtonSpinning = false;
            this.message.error("Failed to Send Proposal To Loan Officer", '');
          }
        })
    }

    if(this.data.LOAN_TYPE_ID != 8 && this.data.LOAN_TYPE_ID != 9 && this.data.LOAN_TYPE_ID != 10 && this.data.LOAN_TYPE_ID != 11 && this.data.LOAN_TYPE_ID != 15){
      let nextStageId = 12
      // ////console.log(nextStageId, this.data.ID)
      this.api.passToMainBranch2(this.data.SIGNATURE, this.data.COMMITTEE_NO, this.data.AMOUNT_IN_WORDS, this.data.TERM_OF_LOAN,
      this.data.TYPE_OF_INSTALLMENT, this.data.EMI_AMOUNT, this.data.RESOLUTION_NO, this.data.RATE_OF_INTEREST,
      this.data.SANCTION_DATE, this.data.SANCTION_AMOUNT, this.data.ID, this.data.CURRENT_STAGE_ID,
      nextStageId, this.REMARKS, Number(this.userId), this.data.PROPOSAL_FILE, this.data.SANCTION_FILE, this.data.MOROTORIUM,this.data.LOAN_RELEASE_DATE,this.data.DISBURSED_AMOUNT,this.data.LOAN_AMOUNT_IN_WORDS,this.data.LOAN_AMOUNT_IN_WORDSS,this.data.INSTALLMENT_COUNT)
      .subscribe(successCode => {
        // ////console.log(successCode)

        if (successCode['code'] == "200") {
          this.isButtonSpinning = false
          this.message.success("Loan has been Sanctioned, Waiting for Disbursement", '');
          this.close();
        }
        else {
          this.isButtonSpinning = false;
          this.message.error("Failed to Sanction Loan", '');
        }
      })
    }
    

  }



  onlySave() {

    this.isButtonSpinning = true;
    if (this.data.LOAN_RELEASE_DATE != undefined && this.data.LOAN_RELEASE_DATE != ''
    ) {
      if (this.data.LOAN_RELEASE_DATE[0] >= 0 && this.data.LOAN_RELEASE_DATE[0] <= 9 && this.data.LOAN_RELEASE_DATE[1] >= 0 && this.data.LOAN_RELEASE_DATE[1] <= 9 && this.data.LOAN_RELEASE_DATE[3] >= 0 && this.data.LOAN_RELEASE_DATE[3] <= 9 && this.data.LOAN_RELEASE_DATE[4] >= 0 && this.data.LOAN_RELEASE_DATE[4] <= 9 && this.data.LOAN_RELEASE_DATE[9] >= 0 && this.data.LOAN_RELEASE_DATE[9] <= 9 && this.data.LOAN_RELEASE_DATE[8] >= 0 && this.data.LOAN_RELEASE_DATE[8] <= 9 && this.data.LOAN_RELEASE_DATE[7] >= 0 && this.data.LOAN_RELEASE_DATE[7] <= 9 && this.data.LOAN_RELEASE_DATE[6] >= 0 && this.data.LOAN_RELEASE_DATE[6] <= 9) {

        var conformedPhoneNumber = conformToMask(
          this.data.LOAN_RELEASE_DATE,
          this.mask,
          { guide: false }
        )
        const str = conformedPhoneNumber.conformedValue.split('/');

        const year = Number(str[2]);
        const month = Number(str[1]) - 1;
        const dates = Number(str[0]);

        this.converted = new Date(year, month, dates)
        console.log('Loan Release Date01------------', this.data.LOAN_RELEASE_DATE)


        // if (this.converted <= new Date()) {
        this.data.LOAN_RELEASE_DATE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');

        console.log('Loan Release Date------------', this.data.LOAN_RELEASE_DATE)



      }
    }
    let nextStageId = 15
    // ////console.log(nextStageId, this.data.ID)
    this.api.passToMainBranch2(this.data.SIGNATURE, this.data.COMMITTEE_NO, this.data.AMOUNT_IN_WORDS, this.data.TERM_OF_LOAN,
      this.data.TYPE_OF_INSTALLMENT, this.data.EMI_AMOUNT, this.data.RESOLUTION_NO, this.data.RATE_OF_INTEREST,
      this.data.SANCTION_DATE, this.data.SANCTION_AMOUNT, this.data.ID, this.data.CURRENT_STAGE_ID,
      nextStageId, this.REMARKS, Number(this.userId), this.data.PROPOSAL_FILE, this.data.SANCTION_FILE, this.data.MOROTORIUM, this.data.LOAN_RELEASE_DATE, this.data.DISBURSED_AMOUNT, this.data.LOAN_AMOUNT_IN_WORDS, this.data.LOAN_AMOUNT_IN_WORDSS,this.data.INSTALLMENT_COUNT)
      .subscribe(successCode => {
        // ////console.log(successCode)

        if (successCode['code'] == "200") {
          this.isButtonSpinning = false
          this.message.success("Successfully Saved", '');
          this.close();
        }
        else {
          this.isButtonSpinning = false;
          this.message.error("Failed to Sanction Loan", '');
        }
      })













  }

  
  confirm(){
    this.saveData_GM();
  }

  confirm1(){
    this.save();
  }

  confirm2() {
    this.onlySave();
  }

  cancel(): void {
  }
  saveData() {
    if (this.data.SANCTION_FILE.trim() != '') {
      this.isButtonSpinning = true
      let nextStageId = 12
      // ////console.log(nextStageId, this.data.ID)
      this.api.passToMainBranch2(this.data.SIGNATURE, this.data.COMMITTEE_NO, this.data.AMOUNT_IN_WORDS, this.data.TERM_OF_LOAN,
        this.data.TYPE_OF_INSTALLMENT, this.data.EMI_AMOUNT, this.data.RESOLUTION_NO, this.data.RATE_OF_INTEREST,
        this.data.SANCTION_DATE, this.data.SANCTION_AMOUNT, this.data.ID, this.data.CURRENT_STAGE_ID,
        nextStageId, this.REMARKS, Number(this.userId), this.data.PROPOSAL_FILE, this.data.SANCTION_FILE, this.data.MOROTORIUM,this.data.LOAN_RELEASE_DATE,this.data.DISBURSED_AMOUNT,this.data.LOAN_AMOUNT_IN_WORDS,this.data.LOAN_AMOUNT_IN_WORDSS,this.data.INSTALLMENT_COUNT)
        .subscribe(successCode => {
          // ////console.log(successCode)
          this.isButtonSpinning = false
          if (successCode['code'] == "200") {
            // this.drawerClose()
            this.logtext = 'SubmitProposal - Submit Proposal form - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  // ////console.log(successCode);
                }
                else {
                  // ////console.log(successCode);

                }
              });

            this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
            this.userActivityLogData.ACTIVITY_DETAILS = " SubmitProposal -   Submit Proposal " + "Stage Id" + nextStageId + JSON.stringify(this.data)
            this.userActivityLogData.ACTIVITY_TIME = new Date()
            this.api.createUserActivityLog(this.userActivityLogData)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  // ////console.log(successCode);
                }
                else {
                  // ////console.log(successCode);


                }
              });
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
            this.close()
          }
          else {

            this.isButtonSpinning = false

            this.logtext = ' SubmitProposal -  Submit Proposal form - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - JoinedBranch ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  // ////console.log(successCode);
                }
                else {
                  // ////console.log(successCode);


                }
              });
            this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
            this.userActivityLogData.ACTIVITY_DETAILS = " SubmitProposal -  Submit Proposal Failed" + "Stage Id" + nextStageId + JSON.stringify(this.data)
            this.userActivityLogData.ACTIVITY_TIME = new Date()
            this.api.createUserActivityLog(this.userActivityLogData)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  // ////console.log(successCode);
                }
                else {
                  // ////console.log(successCode);
                }
              });
            this.message.error(this.api.translate.instant('common.message.error.failed'), "");

            this.isButtonSpinning = false

          }
        });
    } else {
      this.message.error(this.api.translate.instant('passtomainbranch.message1'), "");
    }
  }
  close() {
    this.drawerClose()
  }
}

