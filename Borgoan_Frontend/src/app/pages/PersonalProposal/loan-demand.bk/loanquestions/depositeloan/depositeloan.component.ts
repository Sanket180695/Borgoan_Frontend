import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DatePipe } from '@angular/common';
import { ApiService } from 'src/app/Service/api.service';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { conformToMask } from 'angular2-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'

export class depositLoan {
  ID: number;
  CLIENT_ID: number;
  PROPOSAL_ID: number;
  RECEIPT_NO: string
  RECEIPT_AMOUNT: number
  RECEIPT_DATE: any
  TYPE: string
}
@Component({
  selector: 'app-depositeloan',
  templateUrl: './depositeloan.component.html',
  styleUrls: ['./depositeloan.component.css']
})
export class DepositeloanComponent implements OnInit {
  data: depositLoan = new depositLoan();
  isSpinning = false
  isButtonSpinning = false
  logtext: string = "";
  @Input() PROPOSAL_ID: number;
  pipe = new DatePipe('en-US');
  @Output() demo = new EventEmitter<string>();
  @Input() CURRENT_STAGE_ID: number;
  @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();
  @Input() BANK_LOAN_TYPE_ID: number;
  loadingRecords = false;

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

    this.api.getAlldepositLoan(0, 0, "ID", 'asc', " AND PROPOSAL_ID=" + this.PROPOSAL_ID).subscribe(data => {
      this.loadingRecords = false
      if (data['code'] == '200' && data['count'] > 0) {
        this.data = data['data'][0];
      }
    }, err => {
      console.log(err);
    });
  }

  save(): void {
    var isValid = true;

    if (this.data.TYPE == undefined || this.data.TYPE == '') {
      isValid = false;
    }
    if (this.data.RECEIPT_NO == undefined || this.data.RECEIPT_NO == '') {
      isValid = false;
    }
    if (this.data.RECEIPT_AMOUNT == undefined || this.data.RECEIPT_AMOUNT <= 0) {
      isValid = false;
    }
    if (this.data.RECEIPT_DATE == undefined || this.data.RECEIPT_DATE == '') {
      isValid = false;

    }
    if (this.data.RECEIPT_DATE[0] >= 0 && this.data.RECEIPT_DATE[0] <= 9
      && this.data.RECEIPT_DATE[1] >= 0 && this.data.RECEIPT_DATE[1] <= 9
      && this.data.RECEIPT_DATE[3] >= 0 && this.data.RECEIPT_DATE[3] <= 9 &&
      this.data.RECEIPT_DATE[4] >= 0 && this.data.RECEIPT_DATE[4] <= 9 &&
      this.data.RECEIPT_DATE[9] >= 0 && this.data.RECEIPT_DATE[9] <= 9 &&
      this.data.RECEIPT_DATE[8] >= 0 && this.data.RECEIPT_DATE[8] <= 9 &&
      this.data.RECEIPT_DATE[7] >= 0 && this.data.RECEIPT_DATE[7] <= 9 &&
      this.data.RECEIPT_DATE[6] >= 0 && this.data.RECEIPT_DATE[6] <= 9) {

      var conformedPhoneNumber = conformToMask(
        this.data.RECEIPT_DATE,
        this.mask,
        { guide: false }
      )
      const str = conformedPhoneNumber.conformedValue.split('/');

      const year = Number(str[2]);
      const month = Number(str[1]) - 1;
      const dates = Number(str[0]);

      this.converted = new Date(year, month, dates)
      this.data.RECEIPT_DATE = this.pipe.transform(this.converted, 'yyyy-MM-dd');

    }
    else {
      isValid = false
      this.message.error(this.api.translate.instant('basicinfo.dateerror'), "")
    }


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
                    console.log(successCode);
                  }
                  else {
                    console.log(successCode);
                  }
                });
              this.data = new depositLoan()
              // this.demo.emit()
              this.getdata();

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
                    console.log(successCode);
                  }
                  else {
                    console.log(successCode);
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
                    console.log(successCode);
                  }
                  else {
                    console.log(successCode);
                  }
                });

            }
          });
      }
    } else {
      this.message.error(this.api.translate.instant('common.message.error.compinfo2'), "");
    }


  }


}


