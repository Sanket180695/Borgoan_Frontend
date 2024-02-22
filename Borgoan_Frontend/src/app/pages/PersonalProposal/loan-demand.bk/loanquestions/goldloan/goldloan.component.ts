import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DatePipe } from '@angular/common';
import { ApiService } from 'src/app/Service/api.service';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { Goldloan } from 'src/app/Models/LoanTypeQues/goldloan';

@Component({
  selector: 'app-goldloan',
  templateUrl: './goldloan.component.html',
  styleUrls: ['./goldloan.component.css']
})
export class GoldloanComponent implements OnInit {
  data: Goldloan = new Goldloan();
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
  options = []
  constructor(private api: ApiService, private message: NzNotificationService) {
  }

  ngOnInit(): void {
    this.getdata();
    this.browserLang = localStorage.getItem('locale');
    this.api.getAllGoldItem(0, 0, "ID", 'asc', "").subscribe(data => {
      this.goldItemList = data['data'];
    }, err => {
      //console.log(err);
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
    this.api.getAllGoldLoan(0, 0, "ID", 'asc', " AND PROPOSAL_ID=" + this.PROPOSAL_ID).subscribe(data => {
      this.loadingRecords = false
      if (data['code'] == '200' && data['count'] > 0) {
        this.dataList = data['data'];
      }
    }, err => {
      console.log(err);
    });
  }

  calculateValuation(event) {
    this.data.NET_WEIGHT = event;
    if (event == 0) {
      this.data.VALUATION_AMOUNT = 0;
    }

    if (this.data.PER_GRAM_RATE == 0) {
      this.data.VALUATION_AMOUNT = 0;
    }

    if (event > 0 && this.data.PER_GRAM_RATE > 0) {
      this.data.VALUATION_AMOUNT = this.data.PER_GRAM_RATE * event;
    }
  }

  calculateValuation2(event) {
    this.data.PER_GRAM_RATE = event;
    if (event == 0) {
      this.data.VALUATION_AMOUNT = 0;
    }

    if (this.data.NET_WEIGHT == 0) {
      this.data.VALUATION_AMOUNT = 0;
    }

    if (event > 0 && this.data.NET_WEIGHT > 0) {
      this.data.VALUATION_AMOUNT = this.data.NET_WEIGHT * event;
    }
  }

  add(): void {
    var isValid = true;

    if (this.data.DESCRIPTION_OF_JEWELS == undefined || this.data.DESCRIPTION_OF_JEWELS == '') {
      isValid = false;
      this.message.error(this.api.translate.instant('goldloan.t1_message'), "");
    }
    if (this.data.TOTAL_QUANTITY == undefined || this.data.TOTAL_QUANTITY <= 0) {
      isValid = false;
      this.message.error(this.api.translate.instant('goldloan.t2_message'), "");
    }
    if (this.data.GROSS_WEIGHT == undefined || this.data.GROSS_WEIGHT <= 0) {
      isValid = false;
      this.message.error(this.api.translate.instant('goldloan.t3_message'), "");
    }
    if (this.data.NET_WEIGHT == undefined || this.data.NET_WEIGHT <= 0) {
      isValid = false;
      this.message.error(this.api.translate.instant('goldloan.t4_message'), "");
    }
    if (this.data.PER_GRAM_RATE == undefined || this.data.PER_GRAM_RATE <= 0) {
      isValid = false;
      this.message.error(this.api.translate.instant('goldloan.t5_message'), "");
    }
    if (this.data.VALUATION_AMOUNT == undefined || this.data.VALUATION_AMOUNT <= 0) {
      isValid = false;
      this.message.error(this.api.translate.instant('goldloan.t6_message'), "");
    }
    if (this.data.REMARK == undefined || this.data.REMARK == '') {
      isValid = false;
      this.message.error(this.api.translate.instant('goldloan.t7_message'), "");
    }


    if (isValid) {
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
                    console.log(successCode);
                  }
                  else {
                    console.log(successCode);
                  }
                });
              this.data = new Goldloan()
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

        this.api.createGoldLoan(this.data)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('common.message.success.addinfo2'), "")
              this.indexChanged.emit(1)
              this.logtext = 'Save & New - GoldLoan form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - GoldLoan ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    console.log(successCode);
                  }
                  else {
                    console.log(successCode);
                  }
                });
              this.data = new Goldloan()
              // this.getdata();
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
                    console.log(successCode);
                  }
                  else {
                    console.log(successCode);
                  }
                });

            }
          });
      }
    }


  }

  edit(data: any): void {
    this.data = Object.assign({}, data);
  }
  delete(i: number) {

  }
}


