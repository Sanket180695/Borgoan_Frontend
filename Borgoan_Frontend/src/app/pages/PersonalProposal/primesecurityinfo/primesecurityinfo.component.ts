import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Propertyinformation } from 'src/app/Models/PersonalProposal/propertyinformation';
import { Primesecurityinfo } from 'src/app/Models/PersonalProposal/primesecurityinfo';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';

@Component({
  selector: 'app-primesecurityinfo',
  templateUrl: './primesecurityinfo.component.html',
  styleUrls: ['./primesecurityinfo.component.css']
})
export class PrimesecurityinfoComponent implements OnInit {
  @Output() demo : EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() data: Propertyinformation;
  @Input() PROPOSAL_ID: number
  @Input() APPLICANT_ID: number
  @Input() TYPE: string
  @Input() LOAN_KEY: Number;
  isSpinning = false
  primesecurityinfo: Primesecurityinfo = new Primesecurityinfo()
  extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  isButtonVerifySpinning = false
  isButtonSpinning = false
  bankLoanId = Number(sessionStorage.getItem("bankLoanId"))
  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {
    //console.log("in prime security")
    //console.log(this.PROPOSAL_ID)
    this.loadAllPrimeInfo()
    this.loadInfo()
  }

  loadInfo() {
    let filter =""
    if(this.TYPE=="B")
    filter = " AND EXTRA_INFORMATION_ID=6 AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND TYPE='B'"
    else
    filter = " AND EXTRA_INFORMATION_ID=6 AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND APPLICANT_ID="+this.APPLICANT_ID + " AND TYPE='"+ this.TYPE+"'"

    this.api.getAllApplicantExtraInformation(0, 0, "ID", "asc", filter).subscribe(data => {
      this.extraApplicantInformation = data['data'][0]
    }, err => {
      //console.log(err);
    });
  }

  getSessionValues()
  {
    this.bankLoanId = Number(sessionStorage.getItem("bankLoanId"))
    //console.log("bank loan id")
  }


  loadAllPrimeInfo() {
    this.isSpinning = true
    let filter=""
    if(this.TYPE=="B")
    filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND TYPE='B'"
    else
    filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND APPLICANT_ID="+this.APPLICANT_ID + " AND TYPE='"+ this.TYPE+"'"

    this.api.getAllPrimeSecurityInformation(0, 0, 'ID', "asc", filter).subscribe(data => {
      //console.log("prime security info")
      //console.log(data)
      this.isSpinning = false
      if (data['code'] == "200" && data['data'].length > 0) {
      this.primesecurityinfo = Object.assign({}, data['data'][0]);
      }
    }, err => {
      //console.log(err);
    });
  }

  save() {

    var isOk = true

    if (this.primesecurityinfo.STOCK_AMOUNT == undefined || this.primesecurityinfo.STOCK_AMOUNT.toString().trim() == "") {
      isOk = false
      this.message.error(this.api.translate.instant('primesecurityinfo.message1'), "");
    }

    if (this.primesecurityinfo.STOCK_DETAILS == undefined || this.primesecurityinfo.STOCK_DETAILS == "") {
      isOk = false
      this.message.error(this.api.translate.instant('primesecurityinfo.message2'), "");
    }

    if (this.primesecurityinfo.DEBTORS_AMOUNT == undefined || this.primesecurityinfo.DEBTORS_AMOUNT.toString().trim() == "") {
      isOk = false
      this.message.error(this.api.translate.instant('primesecurityinfo.message3'), "");
    }

    if (this.primesecurityinfo.DEBTORS_DETAILS == undefined || this.primesecurityinfo.DEBTORS_DETAILS == "") {
      isOk = false
      this.message.error(this.api.translate.instant('primesecurityinfo.message4'), "");
    }

    if (this.primesecurityinfo.WORK_ORDER_AMOUNT == undefined || this.primesecurityinfo.WORK_ORDER_AMOUNT.toString().trim() == "") {
      isOk = false
      this.message.error(this.api.translate.instant('primesecurityinfo.message5'), "");
    }

    if (this.primesecurityinfo.WORK_ORDER_DETAILS == undefined || this.primesecurityinfo.WORK_ORDER_DETAILS == "") {
      isOk = false
      this.message.error(this.api.translate.instant('primesecurityinfo.message6'), "");
    }

    if (this.primesecurityinfo.OTHER_AMOUNT == undefined || this.primesecurityinfo.OTHER_AMOUNT.toString().trim() == "") {
      isOk = false
      this.message.error(this.api.translate.instant('primesecurityinfo.message7'), "");
    }

    if (this.primesecurityinfo.OTHER_DETAILS == undefined || this.primesecurityinfo.OTHER_DETAILS == "") {
      isOk = false
      this.message.error(this.api.translate.instant('primesecurityinfo.message8'), "");
    }

    if(isOk)
    {
      
      this.primesecurityinfo.APPLICANT_ID=this.APPLICANT_ID
      if (this.primesecurityinfo.ID) {
        this.isButtonSpinning = true
        this.primesecurityinfo.PROPOSAL_ID = this.PROPOSAL_ID
        this.api.updatePrimeSecurityInformation(this.primesecurityinfo)
          .subscribe(successCode => {
            this.loadAllPrimeInfo()
            this.demo.emit(false)
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
              this.isButtonSpinning = false;
            }
            else {
              this.message.error(this.api.translate.instant('message.error.failed'), "");
              this.isButtonSpinning = false;
            }
          });
  
      }
      else {
        this.isButtonSpinning = true
        this.primesecurityinfo.PROPOSAL_ID = this.PROPOSAL_ID
  
        if(this.TYPE=="B")
        this.primesecurityinfo.TYPE="B"
        else
        {
          this.primesecurityinfo.APPLICANT_ID=this.APPLICANT_ID
          this.primesecurityinfo.TYPE=this.TYPE
        }

        this.api.createPrimeSecurityInformation(this.primesecurityinfo)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.extraApplicantInformation.IS_PROVIDED = true
              this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    this.isButtonSpinning = false;
                    this.loadAllPrimeInfo()
                    this.demo.emit(false)
                  }
                  else {
                    //this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
                    this.isButtonSpinning = false;
                  }
                });
              this.message.success(this.api.translate.instant('common.message.success.addinfo2'), "");
              this.isButtonSpinning = false;
            }
            else {
              this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
              this.isButtonSpinning = false;
            }

           
          
          });
  
      }
    }
 


  }

  VerifyUpdate() {
    if (this.extraApplicantInformation.IS_PROVIDED) {

      if (this.extraApplicantInformation.REMARK != "") {
        this.isButtonVerifySpinning = true
        this.extraApplicantInformation.IS_VERIFIED = true
        this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.isButtonVerifySpinning = false;
              var LOG_ACTION = ''
              var DESCRIPTION = ''
              if (this.extraApplicantInformation.IS_APPROVED == true) {
                LOG_ACTION = 'Prime security Tab information Verified'
                
                DESCRIPTION = sessionStorage.getItem('userName') + ' has checked and approved the Prime security for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK
              } else {
                LOG_ACTION = 'Prime security Tab information Rejected'
                DESCRIPTION = sessionStorage.getItem('userName') + 'has checked and rejected the Prime security for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK
  
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
      else {
        this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
      }
    }
  }
}
