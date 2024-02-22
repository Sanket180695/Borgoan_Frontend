import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Personalloan } from 'src/app/Models/LoanTypeQues/personalloan';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { conformToMask } from 'angular2-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'

@Component({
  selector: 'app-personalloan',
  templateUrl: './personalloan.component.html',
  styleUrls: ['./personalloan.component.css']
})
export class PersonalloanComponent implements OnInit {
  @Input() PROPOSAL_ID: number;
  @Input() LOAN_SKIM_ID: number;
  questionies: Personalloan = new Personalloan()
  isSpinning = false
  isButtonSpinning = false
  pipe = new DatePipe('en-US');
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();
  @Output() demo : EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() CURRENT_STAGE_ID: number;  
  @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  converted : any;
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')
  constructor(private api: ApiService, private message: NzNotificationService,private datePipe:DatePipe) { }

  ngOnInit(): void {
    this.getInformation();
  }
  disabledDate = (current) => {
    return new Date() < current;
  }
  disabledDate2 = (current) => {
    return new Date(this.questionies.INSURANCE_POLICY_TAKEN_DATE) > current;
  }
  getInformation() {
    this.isSpinning = true
    let filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID
    this.api.getAllPersonalLoan(0, 0, 'ID', "asc", filter).subscribe(data => {
      //console.log("personalLoanInformation")
      //console.log(data)
      this.isSpinning = false

      if (data['count'] > 0) {
        this.questionies = Object.assign({}, data['data'][0]);
      }
    }, err => {
      //console.log(err);
    });
  }
  focusss4(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.questionies.INSURANCE_POLICY_TAKEN_DATE = undefined;
    }
  }
  focusss(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.questionies.INSURANCE_POLICY_END_DATE = undefined;
    }
  }

  save() {
    var isOk = true;


    if (this.LOAN_SKIM_ID == 2 && this.questionies.IS_INSURANCE_TAKEN) {
      if (this.questionies.INSURANCE_COMPANY_NAME == undefined || this.questionies.INSURANCE_COMPANY_NAME.trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('personalloan.message1'), "");
      }
      if (this.questionies.INSURANCE_POLICY_NUMBER == undefined || this.questionies.INSURANCE_POLICY_NUMBER <= 0 || this.questionies.INSURANCE_POLICY_NUMBER.toString().trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('personalloan.message2'), "");
      }

      if (this.questionies.INSURANCE_POLICY_TAKEN_DATE[0] >= 0 && this.questionies.INSURANCE_POLICY_TAKEN_DATE[0] 
        <= 9 && this.questionies.INSURANCE_POLICY_TAKEN_DATE[1] >= 0 
        && this.questionies.INSURANCE_POLICY_TAKEN_DATE[1] <= 9 && 
        this.questionies.INSURANCE_POLICY_TAKEN_DATE[3] >= 0 && this.questionies.INSURANCE_POLICY_TAKEN_DATE[3] <= 9 && 
        this.questionies.INSURANCE_POLICY_TAKEN_DATE[4] >= 0 && this.questionies.INSURANCE_POLICY_TAKEN_DATE[4] <= 9 && 
        this.questionies.INSURANCE_POLICY_TAKEN_DATE[9] >= 0 && this.questionies.INSURANCE_POLICY_TAKEN_DATE[9] <= 9 && 
        this.questionies.INSURANCE_POLICY_TAKEN_DATE[8] >= 0 && this.questionies.INSURANCE_POLICY_TAKEN_DATE[8] <= 9 && 
        this.questionies.INSURANCE_POLICY_TAKEN_DATE[7] >= 0 && this.questionies.INSURANCE_POLICY_TAKEN_DATE[7] <= 9 && 
        this.questionies.INSURANCE_POLICY_TAKEN_DATE[6] >= 0 && this.questionies.INSURANCE_POLICY_TAKEN_DATE[6] <= 9) {
    
        var conformedPhoneNumber = conformToMask(
          this.questionies.INSURANCE_POLICY_TAKEN_DATE,
          this.mask,
          { guide: false }
        )
        const str = conformedPhoneNumber.conformedValue.split('/');
    
        const year = Number(str[2]);
        const month = Number(str[1]) - 1;
        const dates = Number(str[0]);
    
        this.converted = new Date(year, month, dates)
    
    
        if (this.converted <= new Date()) {
          this.questionies.INSURANCE_POLICY_TAKEN_DATE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
        } 
    }
    else {
      isOk = false;
      this.message.error(this.api.translate.instant('personalloan.message3'), "");
    }
    
    if (this.questionies.INSURANCE_POLICY_END_DATE[0] >= 0 && this.questionies.INSURANCE_POLICY_END_DATE[0] 
      <= 9 && this.questionies.INSURANCE_POLICY_END_DATE[1] >= 0 
      && this.questionies.INSURANCE_POLICY_END_DATE[1] <= 9 && 
      this.questionies.INSURANCE_POLICY_END_DATE[3] >= 0 && this.questionies.INSURANCE_POLICY_END_DATE[3] <= 9 && 
      this.questionies.INSURANCE_POLICY_END_DATE[4] >= 0 && this.questionies.INSURANCE_POLICY_END_DATE[4] <= 9 && 
      this.questionies.INSURANCE_POLICY_END_DATE[9] >= 0 && this.questionies.INSURANCE_POLICY_END_DATE[9] <= 9 && 
      this.questionies.INSURANCE_POLICY_END_DATE[8] >= 0 && this.questionies.INSURANCE_POLICY_END_DATE[8] <= 9 && 
      this.questionies.INSURANCE_POLICY_END_DATE[7] >= 0 && this.questionies.INSURANCE_POLICY_END_DATE[7] <= 9 && 
      this.questionies.INSURANCE_POLICY_END_DATE[6] >= 0 && this.questionies.INSURANCE_POLICY_END_DATE[6] <= 9) {
  
      var conformedPhoneNumber = conformToMask(
        this.questionies.INSURANCE_POLICY_END_DATE,
        this.mask,
        { guide: false }
      )
      const str = conformedPhoneNumber.conformedValue.split('/');
  
      const year = Number(str[2]);
      const month = Number(str[1]) - 1;
      const dates = Number(str[0]);
  
      this.converted = new Date(year, month, dates)
  
  
      if (this.converted <= new Date()) {
        this.questionies.INSURANCE_POLICY_END_DATE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
      } 
  }
  else {
    isOk = false;
    this.message.error(this.api.translate.instant('personalloan.message4'), "");
  }
  
      if (this.questionies.INSURANCE_POLICY_AMOUNT == undefined || this.questionies.INSURANCE_POLICY_AMOUNT == 0 || this.questionies.INSURANCE_POLICY_AMOUNT.toString().trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('personalloan.message5'), "");
      }
      if (this.questionies.INSURANCE_SURRENDER_AMOUNT == undefined || this.questionies.INSURANCE_SURRENDER_AMOUNT == 0 || this.questionies.INSURANCE_SURRENDER_AMOUNT.toString().trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('personalloan.message6'), "");
      }
    } else {
      this.questionies.INSURANCE_SURRENDER_AMOUNT = 0
      this.questionies.INSURANCE_POLICY_AMOUNT = 0
      this.questionies.INSURANCE_POLICY_END_DATE = null
      this.questionies.INSURANCE_POLICY_TAKEN_DATE = null
      this.questionies.INSURANCE_POLICY_NUMBER = 0
      this.questionies.INSURANCE_COMPANY_NAME = " "
    }

    if (isOk) {
   
      if (this.LOAN_SKIM_ID == 2 && this.questionies.IS_INSURANCE_TAKEN && this.questionies.INSURANCE_POLICY_TAKEN_DATE >= this.questionies.INSURANCE_POLICY_END_DATE) {
        this.message.error(this.api.translate.instant('personalloan.message7'), "");
      } else {
        if (this.questionies.PURPOSE_OF_LOAN != undefined) {
          this.questionies.PROPOSAL_ID = this.PROPOSAL_ID
          this.isButtonSpinning = true
          if (this.questionies.ID) {
            this.api.updatePersonalLoan(this.questionies)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode)
                  this.getInformation();
                  this.demo.emit(false)
                  this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
                  this.isButtonSpinning = false;
                }
                else {
                  this.message.error(this.api.translate.instant('common.message.error.failed'), "");
                  this.isButtonSpinning = false;
                }
              });
          }
          else {

            this.api.createPersonalLoan(this.questionies)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  this.indexChanged.emit(1)

                  this.getInformation();
                  this.demo.emit(false)
                  //console.log(successCode)
                  this.message.success(this.api.translate.instant('common.message.error.success'), "");
                  this.isButtonSpinning = false;
                }
                else {
                  this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
                  this.isButtonSpinning = false;
                }
              });
          }

        }
        else {
          this.message.error(this.api.translate.instant('common.message.error.loanreason'), "");
        }
      }
    }
  }

}