import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { DatePipe } from '@angular/common';
import { IndustrialFinanceMachinery } from 'src/app/Models/PersonalProposal/industrial-finance-machinery';
import { ApiService } from 'src/app/Service/api.service';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { conformToMask } from 'angular2-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'
@Component({
  selector: 'app-industrial-finance-machinery',
  templateUrl: './industrial-finance-machinery.component.html',
  styleUrls: ['./industrial-finance-machinery.component.css'],
  providers: [DatePipe]
})
export class IndustrialFinanceMachineryComponent implements OnInit {
  @Input() PROPOSAL_ID: number;
  data: IndustrialFinanceMachinery = new IndustrialFinanceMachinery();
  isSpinning = false
  logtext: string = "";
  @Input() CURRENT_STAGE_ID: number;  @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  pipe = new DatePipe('en-US');
  isButtonSpinning=false
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();
  @Output() demo : EventEmitter<boolean> =
    new EventEmitter<boolean>();
    converted : any;
    public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
    autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')
  constructor(private api: ApiService,private datePipe: DatePipe, private message: NzNotificationService) {
  }

  ngOnInit() {
    this.data.IS_INDUSTRIAL_LOAN = 1;
    this.getdata();
  }

  getdata() {
    this.isSpinning=true
    this.api.getAllMachineryLoan(0, 0, "ID", 'asc', "AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND IS_INDUSTRIAL_LOAN= '1'").subscribe(data => {
      this.data = new IndustrialFinanceMachinery();
      this.isSpinning=false
      if (data['code'] == '200' && data['count'] > 0) {
        this.data = data['data'][0];
        // this.data.YEAR_OF_PURCHASE = this.data.YEAR_OF_PURCHASE == ' ' ? '' : this.data.YEAR_OF_PURCHASE;
        // this.data.QUOTATION_GIVEN_DATE = this.data.MACHINERY_TYPE == 'U' ? '' : this.data.QUOTATION_GIVEN_DATE;
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
  focusss3(event: KeyboardEvent)
  {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.VALUATION_DATE = undefined;
    }
  }
  focusss4(event: KeyboardEvent){
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.PRODUCTION_YEAR = undefined;
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
      this.message.error(this.api.translate.instant('industrial-finance-machinery.message1'), "");
    }

    if (this.data.NATURE_OF_MACHINERY == undefined || this.data.NATURE_OF_MACHINERY.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('industrial-finance-machinery.message2'), "");
    }

    if (this.data.DEALER_NAME == undefined || this.data.DEALER_NAME.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('industrial-finance-machinery.message3'), "");
    }

    if (this.data.AVAILABILITY_TYPE == undefined || this.data.AVAILABILITY_TYPE.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('industrial-finance-machinery.message4'), "");
    }

    if (this.data.MACHINERY_TYPE == undefined || this.data.MACHINERY_TYPE.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('industrial-finance-machinery.message5'), "");
    }

    if (this.data.LIFE_OF_MACHINERY == undefined || this.data.LIFE_OF_MACHINERY == 0 || this.data.LIFE_OF_MACHINERY.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('industrial-finance-machinery.message6'), "");
    }

    if (this.data.EXPECTED_PER_ANNUM_INCOME == undefined || this.data.EXPECTED_PER_ANNUM_INCOME == 0 || this.data.EXPECTED_PER_ANNUM_INCOME.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('industrial-finance-machinery.message7'), "");
    }
    // if (this.data.EXPECTED_TO_INCREASED_PRODUCTIVITY == undefined || this.data.EXPECTED_TO_INCREASED_PRODUCTIVITY.trim() == '') {
    if (this.data.EXPECTED_TO_INCREASED_PRODUCTIVITY == undefined  || this.data.EXPECTED_TO_INCREASED_PRODUCTIVITY == 0 || this.data.EXPECTED_TO_INCREASED_PRODUCTIVITY.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('industrial-finance-machinery.message8'), "");
    }

    if(this.data.PRODUCTION_YEAR==undefined)
    {
      isOk = false;
      this.message.error(this.api.translate.instant('industrial-finance-machinery.message9'), "");
    }

    if (this.data.MACHINERY_TYPE == 'U') {
      if (this.data.PURCHASE_AMOUNT == undefined || this.data.PURCHASE_AMOUNT == 0 || this.data.PURCHASE_AMOUNT.toString().trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('industrial-finance-machinery.message10'), "");
      }

      if (this.data.YEAR_OF_PURCHASE == undefined || this.data.YEAR_OF_PURCHASE == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('industrial-finance-machinery.message11'), "");
      } else {
        if(this.data.YEAR_OF_PURCHASE.toString().length > 4){
          this.data.YEAR_OF_PURCHASE = this.pipe.transform(this.data.YEAR_OF_PURCHASE, 'yyyy');
        }
        
      }

      if (this.data.IS_ADVANCE_PAID) {
        if (this.data.ADVANCE_PAID_AMOUNT == undefined || this.data.ADVANCE_PAID_AMOUNT == 0 || this.data.ADVANCE_PAID_AMOUNT.toString().trim() == '') {
          isOk = false;
          this.message.error(this.api.translate.instant('industrial-finance-machinery.message12'), "");
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
        this.message.error('Invalid Vauation Date','')
      }
      
      


      }
    }



    if (this.data.MACHINERY_TYPE == 'N') {

      if (this.data.QUOTATION_AMOUNT == undefined || this.data.QUOTATION_AMOUNT == 0 || this.data.QUOTATION_AMOUNT.toString().trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('industrial-finance-machinery.message13'), "");
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
      this.message.error('Invalid Vauation Date','')
    }

    }

    if (isOk) {

      if (this.data.MACHINERY_TYPE == 'U') {
        this.data.QUOTATION_AMOUNT = 0.00
        this.data.QUOTATION_GIVEN_DATE = ''
        if(this.data.YEAR_OF_PURCHASE.toString().length > 4){
          this.data.YEAR_OF_PURCHASE = this.pipe.transform(this.data.YEAR_OF_PURCHASE, 'yyyy');
        }
      } else {
        this.data.IS_ADVANCE_PAID = false
        this.data.IS_DONE_AGREEMENT = false
        this.data.ADVANCE_PAID_AMOUNT = 0.00
        this.data.PURCHASE_AMOUNT = 0.00
       
        this.data.QUOTATION_GIVEN_DATE = this.pipe.transform(this.data.QUOTATION_GIVEN_DATE, 'yyyy-MM-dd');
      }
      if(this.data.PRODUCTION_YEAR.toString().length > 4){
        this.data.PRODUCTION_YEAR = this.pipe.transform(this.data.PRODUCTION_YEAR, 'yyyy');
      }
     
      this.data.PROPOSAL_ID = this.PROPOSAL_ID;
      this.isButtonSpinning = true;
      //console.log(this.data)
      if (this.data.ID) {
        this.api.updateMachineryLoan(this.data)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

              this.logtext = 'Update & Close - IndustrialFinanceMachinery form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - IndustrialFinanceMachinery ]";
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
              this.logtext = 'Save & New - IndustrialFinanceMachinery form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - IndustrialFinanceMachinery ]";
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
              this.logtext = 'Save & Close - IndustrialFinanceMachinery form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - IndustrialFinanceMachinery ]";
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