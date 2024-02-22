import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Loaninformation } from 'src/app/Models/PersonalProposal/loaninformation';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';

@Component({
  selector: 'app-loanquestions',
  templateUrl: './loanquestions.component.html',
  styleUrls: ['./loanquestions.component.css']
})
export class LoanquestionsComponent implements OnInit {
  @Input() PROPOSAL_ID: Number;
  data: Loaninformation = new Loaninformation();
  extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  @Output() demos: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() CURRENT_STAGE_ID: number;
  isButtonVerifySpinning = false;
  @Input() LOAN_KEY: Number;
  constructor(private api: ApiService, private message: NzNotificationService,) { }

  ngOnInit(): void {
    this.getLoanInformation()
    this.loadInfo();
  }


  loadInfo() {
    this.extraApplicantInformation = new Extraapplicantinfo()
    let filter = " AND EXTRA_INFORMATION_ID=10 AND PROPOSAL_ID=" + this.PROPOSAL_ID
    this.api.getAllApplicantExtraInformation(0, 0, "SEQ_NO", "asc", filter).subscribe(data => {
      this.extraApplicantInformation = data['data'][0]
    }, err => {
      //console.log(err);
    });
  }

  demo() {
    this.extraApplicantInformation.IS_PROVIDED = true
    this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          this.demos.emit(false)
        }
        else {
          this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
        }
      });
  }

  getLoanInformation() {
    let filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID
    this.api.getAllLoanInformation(0, 0, 'ID', "asc", filter).subscribe(data => {
      if (data['count'] > 0) {
        this.data = Object.assign({}, data['data'][0]);
        console.log("BANK_LOAN_TYPE_ID ",this.data.BANK_LOAN_TYPE_ID)
      }
    }, err => {
      //console.log(err);
    });
  }


  VerifyUpdate() {
    this.isButtonVerifySpinning = true
    this.extraApplicantInformation.IS_VERIFIED = true
    this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {

          this.demos.emit(false)
          this.isButtonVerifySpinning = false;
          // this.oldIndex++;
          // this.indexChanged.emit(this.oldIndex)
          var LOG_ACTION = ''
          var DESCRIPTION = ''
          if (this.extraApplicantInformation.IS_APPROVED == true) {
            LOG_ACTION = 'Loan questionary Tab information Verified'

            DESCRIPTION = sessionStorage.getItem('userName') + ' has checked and approved the Loan questionary for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK
          } else {
            LOG_ACTION = 'Loan questionary Tab information Rejected'
            DESCRIPTION = sessionStorage.getItem('userName') + 'has checked and rejected the Loan questionary for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK

          }
          var LOG_TYPE = 'I'
          this.api.proposalLogInformation(this.extraApplicantInformation.PROPOSAL_ID, this.extraApplicantInformation.CURRENT_STAGE_ID, 0, LOG_ACTION, Number(sessionStorage.getItem("userId")), DESCRIPTION, LOG_TYPE)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
              }
            });
        }
        else {
          this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
          this.isButtonVerifySpinning = false;
        }
      });

  }
  cancel(): void {

  }

  confirm2(): void {
    this.extraApplicantInformation.IS_APPROVED = false;
    if (this.extraApplicantInformation.REMARK == undefined || this.extraApplicantInformation.REMARK.trim() == "") {

      this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
    } else {

      this.VerifyUpdate();
    }

  }

  confirm(): void {
    this.extraApplicantInformation.REMARK = " "
    this.extraApplicantInformation.IS_APPROVED = true;
    this.VerifyUpdate();
  }


}
