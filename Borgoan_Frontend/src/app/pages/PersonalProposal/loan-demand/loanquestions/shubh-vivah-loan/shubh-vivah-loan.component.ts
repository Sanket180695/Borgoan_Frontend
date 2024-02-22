import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { DatePipe } from '@angular/common';
import { ShubhVivahLoan } from 'src/app/Models/PersonalProposal/shubh-vivah-loan';
import { ApiService } from 'src/app/Service/api.service';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
@Component({
  selector: 'app-shubh-vivah-loan',
  templateUrl: './shubh-vivah-loan.component.html',
  styleUrls: ['./shubh-vivah-loan.component.css']
})
export class ShubhVivahLoanComponent implements OnInit {
  @Input() PROPOSAL_ID: number;
  data: ShubhVivahLoan = new ShubhVivahLoan();
  isSpinning = false
  isButtonSpinning=false
  logtext: string = "";
  pipe = new DatePipe('en-US');
  @Output() demo : EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();
  @Input() CURRENT_STAGE_ID: number;  
  @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  constructor(
    private api: ApiService,
    private message: NzNotificationService
  ) {
  }

  ngOnInit() {
    this.getdata();
  }

  getdata() {
    this.isSpinning=true
    this.api.getAllShubhVivahLoanInformation(0, 0, "ID", 'asc', "AND PROPOSAL_ID=" + this.PROPOSAL_ID).subscribe(data => {
     this.data = new ShubhVivahLoan();
     this.isSpinning=false
      if (data['code'] == '200' && data['count'] > 0) {
        this.data = data['data'][0];
   
      }
    }, err => {
      //console.log(err);
    });
  }

  focusss(event: KeyboardEvent){
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.DOB_OF_CHILD = undefined;
    }
  }
  focusss2(event: KeyboardEvent){
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.MARRIAGE_DATE = undefined;
    }
  }
  disabledDate = (current) => {
    return new Date(new Date().setFullYear(new Date().getFullYear() - 18)) < current;
  }
  disabledDate2 = (current) => {
    return new Date() > current;
  }
  save(): void {
    var isOk = true;
    this.data.PROPOSAL_ID  = this.PROPOSAL_ID;

    if (this.data.PLACE_OF_MARRIAGE == undefined || this.data.PLACE_OF_MARRIAGE.trim() == '') {
      isOk = false;
      this.message.error("विवाह ठिकाण नमूद करा", "");
    }

    if (this.data.NAME_OF_CHILD == undefined || this.data.NAME_OF_CHILD.trim() == '') {
      isOk = false;
      this.message.error("लग्न ठरलेल्या मुलाचे/मुलीचे नाव  नमूद करा", "");
    }

    if (this.data.EDUCATION_OF_CHILD == undefined || this.data.EDUCATION_OF_CHILD.trim() == '') {
      isOk = false;
      this.message.error("लग्न ठरलेल्या मुलाचे/मुलीचे शिक्षण नमूद करा", "");
    }

    if (this.data.ANNUAL_INCOME_OF_CHILD == undefined || this.data.ANNUAL_INCOME_OF_CHILD < 0  || this.data.ANNUAL_INCOME_OF_CHILD.toString().trim() == '') {
      isOk = false;
      this.message.error("लग्न ठरलेल्या मुलाचे/मुलीचे वार्षिक उत्पन्न नमूद करा", "");
    }

    if (this.data.DOB_OF_CHILD == undefined || this.data.DOB_OF_CHILD == '') {
      isOk = false;
      this.message.error("लग्न ठरलेल्या मुलाची/मुलीची जन्मतारीख  नमूद करा", "");
    }else {
      this.data.DOB_OF_CHILD = this.pipe.transform(this.data.DOB_OF_CHILD, 'yyyy-MM-dd');
    }

    if (this.data.MARRIAGE_DATE == undefined || this.data.MARRIAGE_DATE == '') {
      isOk = false;
      this.message.error("विवाह तारीख निवडा", "");
    }else {
      this.data.MARRIAGE_DATE = this.pipe.transform(this.data.MARRIAGE_DATE, 'yyyy-MM-dd');
    }

    if (this.data.ESTIMATED_EXPENSES == undefined || this.data.ESTIMATED_EXPENSES == 0 || this.data.ESTIMATED_EXPENSES.toString().trim() == '') {
      isOk = false;
      this.message.error("लग्नाचा अंदाजित/झालेला खर्च नमूद करा", "");
    }

    if (isOk) {
      this.nextProcess();
    }
  }

  nextProcess() {
this.isButtonSpinning=true
      if (this.data.ID) {
        this.api.updateShubhVivahLoanInformation(this.data)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

              this.logtext = 'Update & Close - ShubhaVivahLoan form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - ShubhaVivahLoan ]";
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

        this.api.createShubhVivahLoanInformation(this.data)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('common.message.success.addinfo2'), "")
            this.indexChanged.emit(1)
              
                this.logtext = 'Save & New - ShubhaVivahLoan form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - ShubhaVivahLoan ]";
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
              this.logtext = 'Save & Close - ShubhaVivahLoan form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - ShubhaVivahLoan ]";
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