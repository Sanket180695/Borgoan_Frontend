import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { DatePipe } from '@angular/common';
import { MachineryLoan } from 'src/app/Models/PersonalProposal/machinery-loan';
import { ApiService } from 'src/app/Service/api.service';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { conformToMask } from 'angular2-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'
@Component({
  selector: 'app-machinery-loan',
  templateUrl: './machinery-loan.component.html',
  styleUrls: ['./machinery-loan.component.css'],
  providers: [DatePipe]
})
export class MachineryLoanComponent implements OnInit {
  @Input() PROPOSAL_ID: number;
  data: MachineryLoan = new MachineryLoan();
  isSpinning = false
  isButtonSpinning = false
  logtext: string = "";
  pipe = new DatePipe('en-US');
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();
  @Output() demo : EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() CURRENT_STAGE_ID: number;  
  @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  converted : any;
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')
  constructor(private api: ApiService,private datePipe: DatePipe, private message: NzNotificationService) {
  }

  ngOnInit() {
    this.data.IS_INDUSTRIAL_LOAN = 0;
    this.getdata();
  }

  getdata() {
    this.isSpinning = true
    this.api.getAllMachineryLoan(0, 0, "ID", 'asc', " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND IS_INDUSTRIAL_LOAN= '0'").subscribe(data => {
      this.data = new MachineryLoan();
      this.isSpinning = false
      if (data['code'] == '200' && data['count'] > 0) {
        this.data = data['data'][0];
       
      }
    }, err => {
      //console.log(err);
    });
  }

  disabledDate = (current) => {
    return new Date() < current;
  }
  focusss(event: KeyboardEvent){
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.QUOTATION_GIVEN_DATE = undefined;
    }
  }
  focusss2(event: KeyboardEvent){
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.YEAR_OF_PURCHASE = undefined;
    }
  }
  focusss4(event: KeyboardEvent){
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.PRODUCTION_YEAR = undefined;
    }
  }
  focusss3(event: KeyboardEvent)
  {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.VALUATION_DATE = undefined;
    }
  }
  save(): void {
    var isOk = true;

    if (this.data.PURPOSE_OF_LOAN == undefined || this.data.PURPOSE_OF_LOAN.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('common.message.error.loanreason'), "");
    }

    if (this.data.DETAILS_OF_MACHINERY == undefined || this.data.DETAILS_OF_MACHINERY.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('machinery-loan.message1'), "");
    }

    if (this.data.NATURE_OF_MACHINERY == undefined || this.data.NATURE_OF_MACHINERY.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('machinery-loan.message2'), "");
    }

    if (this.data.DEALER_NAME == undefined || this.data.DEALER_NAME.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('machinery-loan.message3'), "");
    }

    if (this.data.AVAILABILITY_TYPE == undefined || this.data.AVAILABILITY_TYPE.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('machinery-loan.message4'), "");
    }

    if (this.data.MACHINERY_TYPE == undefined || this.data.MACHINERY_TYPE.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('machinery-loan.message5'), "");
    }

    if (this.data.LIFE_OF_MACHINERY == undefined || this.data.LIFE_OF_MACHINERY==0 || this.data.LIFE_OF_MACHINERY.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('machinery-loan.message6'), "");
    }

    if (this.data.EXPECTED_PER_ANNUM_INCOME == undefined || this.data.EXPECTED_PER_ANNUM_INCOME == 0 || this.data.EXPECTED_PER_ANNUM_INCOME.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('machinery-loan.message7'), "");
    }
    if (this.data.EXPECTED_TO_INCREASED_PRODUCTIVITY == undefined || this.data.EXPECTED_TO_INCREASED_PRODUCTIVITY == 0 || this.data.EXPECTED_TO_INCREASED_PRODUCTIVITY.toString().trim() == '') {
      // if (this.data.EXPECTED_TO_INCREASED_PRODUCTIVITY == undefined || this.data.EXPECTED_TO_INCREASED_PRODUCTIVITY.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('machinery-loan.message8'), "");
    }

    if(this.data.PRODUCTION_YEAR==undefined)
    {
      isOk = false;
      this.message.error(this.api.translate.instant('machinery-loan.message9'), "");
    }

    if (this.data.MACHINERY_TYPE == 'U') {
      if (this.data.PURCHASE_AMOUNT == undefined || this.data.PURCHASE_AMOUNT == 0 || this.data.PURCHASE_AMOUNT.toString().trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('machinery-loan.message10'), "");
      }

      if (this.data.YEAR_OF_PURCHASE == undefined || this.data.YEAR_OF_PURCHASE == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('machinery-loan.message11'), "");
      } else {
        if(this.data.YEAR_OF_PURCHASE.toString().length > 4){
          this.data.YEAR_OF_PURCHASE = this.pipe.transform(this.data.YEAR_OF_PURCHASE, 'yyyy');
        }
      }

      if (this.data.IS_ADVANCE_PAID) {
        if (this.data.ADVANCE_PAID_AMOUNT == undefined || this.data.ADVANCE_PAID_AMOUNT == 0 || this.data.ADVANCE_PAID_AMOUNT.toString().trim() == '') {
          isOk = false;
          this.message.error(this.api.translate.instant('machinery-loan.message12'), "");
        }
      }
      if (this.data.IS_VALUATION_DONE) {
        if (this.data.VALUATOR_NAME == undefined || this.data.VALUATOR_NAME.trim() == '') {
          isOk = false;
          this.message.error(this.api.translate.instant('common.message.error.valuator'), "");
        }

        if (this.data.VALUATION_AMOUNT == undefined || this.data.VALUATION_AMOUNT == 0 || this.data.VALUATION_AMOUNT.toString().trim() == '') {
          isOk = false;
          this.message.error(this.api.translate.instant('common.message.error.valuatorprice'), "");
        }

        if (this.data.VALUATION_DATE[0] >= 0 && this.data.VALUATION_DATE[0] 
          <= 9 && this.data.VALUATION_DATE[1] >= 0 
          && this.data.VALUATION_DATE[1] <= 9 && 
          this.data.VALUATION_DATE[3] >= 0 && this.data.VALUATION_DATE[3] <= 9 && 
          this.data.VALUATION_DATE[4] >= 0 && this.data.VALUATION_DATE[4] <= 9 && 
          this.data.VALUATION_DATE[9] >= 0 && this.data.VALUATION_DATE[9] <= 9 && 
          this.data.VALUATION_DATE[8] >= 0 && this.data.VALUATION_DATE[8] <= 9 && 
          this.data.VALUATION_DATE[7] >= 0 && this.data.VALUATION_DATE[7] <= 9 && 
          this.data.VALUATION_DATE[6] >= 0 && this.data.VALUATION_DATE[6] <= 9) {
      
          var conformedPhoneNumber = conformToMask(
            this.data.VALUATION_DATE,
            this.mask,
            { guide: false }
          )
          const str = conformedPhoneNumber.conformedValue.split('/');
      
          const year = Number(str[2]);
          const month = Number(str[1]) - 1;
          const dates = Number(str[0]);
      
          this.converted = new Date(year, month, dates)
      
      
          if (this.converted <= new Date()) {
            this.data.VALUATION_DATE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
          } 
      }
      else {
        isOk = false;
        this.message.error('Invalid Due Date','')
      }


      }
    }

    if (this.data.MACHINERY_TYPE == 'N') {

      if (this.data.QUOTATION_AMOUNT == undefined || this.data.QUOTATION_AMOUNT == 0 || this.data.QUOTATION_AMOUNT.toString().trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('machinery-loan.message13'), "");
      }

      if (this.data.QUOTATION_GIVEN_DATE[0] >= 0 && this.data.QUOTATION_GIVEN_DATE[0] 
        <= 9 && this.data.QUOTATION_GIVEN_DATE[1] >= 0 
        && this.data.QUOTATION_GIVEN_DATE[1] <= 9 && 
        this.data.QUOTATION_GIVEN_DATE[3] >= 0 && this.data.QUOTATION_GIVEN_DATE[3] <= 9 && 
        this.data.QUOTATION_GIVEN_DATE[4] >= 0 && this.data.QUOTATION_GIVEN_DATE[4] <= 9 && 
        this.data.QUOTATION_GIVEN_DATE[9] >= 0 && this.data.QUOTATION_GIVEN_DATE[9] <= 9 && 
        this.data.QUOTATION_GIVEN_DATE[8] >= 0 && this.data.QUOTATION_GIVEN_DATE[8] <= 9 && 
        this.data.QUOTATION_GIVEN_DATE[7] >= 0 && this.data.QUOTATION_GIVEN_DATE[7] <= 9 && 
        this.data.QUOTATION_GIVEN_DATE[6] >= 0 && this.data.QUOTATION_GIVEN_DATE[6] <= 9) {
    
        var conformedPhoneNumber = conformToMask(
          this.data.QUOTATION_GIVEN_DATE,
          this.mask,
          { guide: false }
        )
        const str = conformedPhoneNumber.conformedValue.split('/');
    
        const year = Number(str[2]);
        const month = Number(str[1]) - 1;
        const dates = Number(str[0]);
    
        this.converted = new Date(year, month, dates)
    
    
        if (this.converted <= new Date()) {
          this.data.QUOTATION_GIVEN_DATE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
        } 
    }
    else {
      isOk = false;
      this.message.error('Invalid Quotation Given  Date','')
    }
    }

    if (isOk) {
    
      if(this.data.PRODUCTION_YEAR.toString().length > 4){
        this.data.PRODUCTION_YEAR = this.pipe.transform(this.data.PRODUCTION_YEAR, 'yyyy');
      }
     //console.log(this.data)
      this.isButtonSpinning = true;
      if (this.data.MACHINERY_TYPE == 'U') {
        this.data.QUOTATION_AMOUNT = 0.00
        this.data.QUOTATION_GIVEN_DATE = ''
        if(this.data.YEAR_OF_PURCHASE.toString().length > 4){
          this.data.YEAR_OF_PURCHASE = this.pipe.transform(this.data.YEAR_OF_PURCHASE, 'yyyy');
        }
      } else {
        this.data.ADVANCE_PAID_AMOUNT = 0.00
        this.data.PURCHASE_AMOUNT = 0.00
        this.data.QUOTATION_GIVEN_DATE = this.pipe.transform(this.data.QUOTATION_GIVEN_DATE, 'yyyy-MM-dd');
      }
   
      this.data.PROPOSAL_ID = this.PROPOSAL_ID;
      if (this.data.ID) {
        this.api.updateMachineryLoan(this.data)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

              this.logtext = 'Update & Close - MachineryLoan form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - MachineryLoan ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                  }
                });
              this.getdata();
              this.demo.emit(false)
              this.isButtonSpinning = false;
            }
            else {
              this.message.error(this.api.translate.instant('common.message.error.updatefailed'), "");
              this.isButtonSpinning = false;
            }
          });
      }
      else {

        this.api.createMachineryLoan(this.data)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('common.message.success.addinfo2'), "")
              this.indexChanged.emit(1)
              this.logtext = 'Save & New - MachineryLoan form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - MachineryLoan ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                  }
                });

              this.getdata();
              this.demo.emit(false)
              this.isButtonSpinning = false;
            }
            else {
              this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
              this.isButtonSpinning = false;
              this.logtext = 'Save & Close - MachineryLoan form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - MachineryLoan ]";
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