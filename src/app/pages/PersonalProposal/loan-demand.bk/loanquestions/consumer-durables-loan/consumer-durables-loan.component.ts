import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { ConsumerDuarablesLoan } from 'src/app/Models/PersonalProposal/consumer-durables-loan';
import { ApiService } from 'src/app/Service/api.service';
@Component({
  selector: 'app-consumer-durables-loan',
  templateUrl: './consumer-durables-loan.component.html',
  styleUrls: ['./consumer-durables-loan.component.css']
})
export class ConsumerDuarablesLoanComponent implements OnInit {
  data: ConsumerDuarablesLoan = new ConsumerDuarablesLoan();
  @Input() PROPOSAL_ID: number ;
  isSpinning = false
  isButtonSpinning=false
  logtext: string = "";
  @Input() CURRENT_STAGE_ID: number;  
  @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  durableData = [{ 'ID': '1', 'NAME': this.api.translate.instant('consumer-durables-loan.durableData1') }, { 'ID': '2', 'NAME': this.api.translate.instant('consumer-durables-loan.durableData2') },{ 'ID': '3', 'NAME': this.api.translate.instant('consumer-durables-loan.durableData3') }, { 'ID': '4', 'NAME': this.api.translate.instant('consumer-durables-loan.durableData4') }, { 'ID': '5', 'NAME': this.api.translate.instant('consumer-durables-loan.durableData5') }, { 'ID': '6', 'NAME': this.api.translate.instant('consumer-durables-loan.durableData6') }, { 'ID': '7', 'NAME': this.api.translate.instant('consumer-durables-loan.durableData7') }, { 'ID': '8', 'NAME': this.api.translate.instant('consumer-durables-loan.durableData8') }, { 'ID': '9', 'NAME': this.api.translate.instant('consumer-durables-loan.durableData9') }]
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();
  @Output() demo : EventEmitter<boolean> =
    new EventEmitter<boolean>();
  constructor(
    private api: ApiService,
    private message: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.isSpinning = true
    this.api.getAllConsumerDurablesLoans(0, 0, "ID", 'asc', "AND PROPOSAL_ID=" + this.PROPOSAL_ID).subscribe(data => {
      this.data = new ConsumerDuarablesLoan();
      this.isSpinning = false
      if (data['code'] == '200' && data['count'] > 0) {
        this.data = data['data'][0];
      }
    }, err => {
      //console.log(err);
    });
  }

  save(): void {
    var isOk = true;
    if (this.data.BRAND_NAME == undefined || this.data.BRAND_NAME == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('consumer-durables-loan.message1'), "");
    }
    if (this.data.DURABLE_NAME == undefined || this.data.DURABLE_NAME == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('consumer-durables-loan.message2'), "");
    }


    if (this.data.DURABLE_NAME != undefined && this.data.DURABLE_NAME == "9" && this.data.OTHER_DURABLE_NAME == undefined) {
      isOk = false;
      this.message.error(this.api.translate.instant('consumer-durables-loan.message3'), "");
    } else {
      if (this.data.DURABLE_NAME == "9" && this.data.OTHER_DURABLE_NAME == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('consumer-durables-loan.message3'), "");
      }
    }

    if (this.data.LIFE_OF_PRODUCT == undefined || this.data.LIFE_OF_PRODUCT == 0) {
      isOk = false;
      this.message.error(this.api.translate.instant('consumer-durables-loan.message4'), "");
    }

    if (this.data.DEALER_NAME == undefined || this.data.DEALER_NAME.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('consumer-durables-loan.message5'), "");
    }

    if (this.data.IS_GIVEN_ADVANCE) {
      if (this.data.ADVANCE_AMOUNT == undefined || this.data.ADVANCE_AMOUNT == 0 || this.data.ADVANCE_AMOUNT.toString().trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('consumer-durables-loan.message6'), "");
      }
    }

    if (this.data.IS_QUOTATION_TAKEN) {
      if (this.data.QUOTATION_AMOUNT == undefined || this.data.QUOTATION_AMOUNT == 0) {
        isOk = false;
        this.message.error(this.api.translate.instant('consumer-durables-loan.message7'), "");
      }
    }

    if (isOk) {
      if (this.data.DURABLE_NAME != "8")
      {
        this.data.OTHER_DURABLE_NAME =" ";
      }
      this.isButtonSpinning = true;
      this.data.PROPOSAL_ID = this.PROPOSAL_ID;
      if (this.data.ID) {
        this.api.updateConsumerDurablesLoans(this.data)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

              this.logtext = 'Update & Close - ConsumerDurablesLoans form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - ConsumerDurablesLoans ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                  }
                });
              this.getData();
              this.demo.emit(false)
              this.isButtonSpinning = false;
            }
            else {

              this.logtext = 'Update & Close - ConsumerDurablesLoans form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - ConsumerDurablesLoans ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                  }
                });

              this.message.error(this.api.translate.instant('common.message.error.updatefailed'), "");
              this.isButtonSpinning = false;
            }
          });
      }
      else {

        this.api.createConsumerDurablesLoans(this.data)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('common.message.success.addinfo2'), "")
              this.indexChanged.emit(1)

              this.getData();
              this.demo.emit(false)
              this.isButtonSpinning = false;
            }
            else {
              this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
              this.isButtonSpinning = false;
              this.logtext = 'Save & Close - ConsumerDurablesLoans form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - ConsumerDurablesLoans ]";
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
    }

  }
}
