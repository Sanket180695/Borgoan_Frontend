import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Financialinformation } from 'src/app/Models/PersonalProposal/financialinformation';
import { Incomeyear } from 'src/app/Models/PersonalProposal/incomeyear';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd';
@Component({
  selector: 'app-cfinancialinfo',
  templateUrl: './cfinancialinfo.component.html',
  styleUrls: ['./cfinancialinfo.component.css']
})
export class CfinancialinfoComponent implements OnInit {
  @Output() demo: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() CURRENT_STAGE_ID: number;
  @Input() PROPOSAL_ID: number
  @Input() APPLICANT_ID: number
  data: Financialinformation = new Financialinformation();
  isButtonSpinning = false
  date = new Date();
  INCOME_AMOUNT_YEAR
  isButtonVerifySpinning = false
  incomeYears: Incomeyear[]
  value = 0
  @Input() LOAN_KEY: number
  // lastYear = (this.date.getFullYear() - 1)
  // latyear1 = (this.date.getFullYear() - 2)
  // year1 = this.date.getFullYear() + "-" + (this.date.getFullYear() + 1);
  // chnageYear1=this.year1.split("-")
  // changeYearSplit=this.chnageYear1[1].substr(2)
  // finalYear1=this.date.getFullYear() + "-" + this.changeYearSplit
  year1 = ""
  year2 = ""
  year3 = ""
  // year2 = this.lastYear + "-" + this.date.getFullYear()
  // year3 = this.latyear1 + "-" + this.lastYear
  i = 2
  oldType = ""
  oldYear = ""
  incomeSourceId: number
  otherincomeSourceId: number
  otherincomeSourceId2: number
  isSpinning = false
  i1
  extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  dataCode = 0
  proposalType = Number(sessionStorage.getItem("PRAPOSAL_TYPE"))
  isSaved = Number(sessionStorage.getItem("C_IS_SAVED"))
  total = [];
  total1 = [];
  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {
    this.loadInfo()
    //  this.data.FINANCIAL_YEAR = this.date.getFullYear().toString()
    this.loadData()
    this.loadIncomeYear()


  }

  getSessionValues() {
    this.proposalType = Number(sessionStorage.getItem("PRAPOSAL_TYPE"))
    this.isSaved = Number(sessionStorage.getItem("C_IS_SAVED"))
  }

  loadInfo() {
    let filter = " AND EXTRA_INFORMATION_ID=4 AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND APPLICANT_ID=" + this.APPLICANT_ID + " AND TYPE='C'"

    this.api.getAllApplicantExtraInformation(0, 0, "SEQ_NO", "asc", filter).subscribe(data => {
      ////console.log(data)
      this.extraApplicantInformation = data['data'][0]
    }, err => {
      ////console.log(err);
    });
  }


  loadIncomeYear() {
    this.api.getAllIncomeyears(0, 0, "ID", "desc", "").subscribe(data => {
      this.incomeYears = data['data']
    }, err => {
      ////console.log(err);
    });
  }

  loadData() {
    this.isSpinning = true
    ////console.log(this.PROPOSAL_ID, this.APPLICANT_ID)
    this.api.getFinancialInformation(this.PROPOSAL_ID, "C", this.APPLICANT_ID).subscribe(data => {

      if (data['code'] == 200) {
        this.isSpinning = false


        if (this.proposalType == 1) {
          let filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND APPLICANT_ID=" + this.APPLICANT_ID + " AND TYPE='C'"
          this.api.getAllIncomeInformation(0, 0, "ID", 'desc', filter)
            .subscribe(data => {
              this.incomeSourceId = data['data'][0]['INCOME_SOURCE_ID']
              this.otherincomeSourceId = data['data'][0]['OTHER_INCOME_SOURCE_ID']
              this.otherincomeSourceId2 = data['data'][0]['OTHER_INCOME_SOURCE_ID2']
            }, err => {
              ////console.log(err);
            });
        }

        this.dataCode = data['code']
        this.data = Object.assign({}, data['data'][0]);


        if (this.data.DAILY_PIGMY_AMOUNT == 0)
          this.data.DAILY_PIGMY_AMOUNT = undefined

        if (this.data.PIGMY_BALANCE == 0)
          this.data.PIGMY_BALANCE = undefined

        this.data.LAST_3_YEAR_INFORMATION = data['data'][0]['LAST_3_YEAR_INFORMATION']
        this.year1 = this.data.LAST_3_YEAR_INFORMATION[0]['FINANCIAL_YEAR']
        this.year2 = this.data.LAST_3_YEAR_INFORMATION[1]['FINANCIAL_YEAR']
        this.year3 = this.data.LAST_3_YEAR_INFORMATION[2]['FINANCIAL_YEAR']
        this.calculate(0)
        this.calculate(1)
        this.calculate(2)
        this.calculateTotal(0)
        this.calculateTotal(1)
        this.calculateTotal(2)
      }
    }, err => {
      ////console.log(err);
    });
  }

  isAccountNo(pincode) {
    const expression = /^[A-Za-z0-9\-\/]*$/;
    return expression.test(String(pincode).toLowerCase())
  }

  save() {
    ////console.log(this.data)
    var isOk = true;
    if (this.data.IS_INCOME_TAX_FILED) {
      if (this.data.FINANCIAL_YEAR == 0 && this.data.INCOME_AMOUNT == 0 && this.data.TAX_PAID_AMOUNT == 0) {
        isOk = false

      }
    }



    if (this.data.CC_LOAN_TERNOVER == undefined || this.data.CC_LOAN_TERNOVER == 0) {
      isOk = false
    }
    if (this.data.INCOME_SOURCE_AMOUNT == undefined || this.data.INCOME_SOURCE_AMOUNT.trim() == '') {
      isOk = false
    }
    if (this.data.YEARLY_INCOME == undefined || this.data.YEARLY_INCOME == 0) {
      isOk = false
    }
    if (this.data.SAVING_ACCOUNT_NO == undefined || this.data.SAVING_ACCOUNT_NO == '') {
      isOk = false
    }


    if (this.data.SAVING_AMOUNT == undefined || this.data.SAVING_AMOUNT == 0) {
      isOk = false
    }
    if (this.data.BALANCE_AMOUNT == undefined || this.data.BALANCE_AMOUNT == 0) {
      isOk = false
    }

    if (this.proposalType == 1) {
      if (this.data.MONTHLY_HOUSEHOLD_EXPENSES <= 0) {
        isOk = false
        this.message.error(this.api.translate.instant('gfinancialinfo.message1'), "");
      }
    }

    if (this.data.OTHER_DEPOSIT_ACC_NO2 != undefined && this.data.OTHER_DEPOSIT_ACC_NO2.trim() != '') {
      if (!this.isAccountNo(this.data.OTHER_DEPOSIT_ACC_NO2)) {
        isOk = false;
        this.message.error(this.api.translate.instant('common.accountwrong'), '')
      }
    }

    if (this.data.BALANCE_AMOUNT2 == undefined || this.data.BALANCE_AMOUNT2 == 0) {
      this.data.BALANCE_AMOUNT2 = 0
    }

    ////console.log(isOk)
    if (isOk) {
      this.data.TYPE = "C"
      this.data.APPLICANT_ID = this.APPLICANT_ID
      if (!this.data.IS_PIGMY) {
        this.data.BANK_NAME = ""
        this.data.DAILY_PIGMY_AMOUNT = 0
        this.data.PIGMY_BALANCE = 0
      }
      if (this.data.OTHER_DEPOSIT_ACC_NO == undefined) {
        this.data.OTHER_DEPOSIT_ACC_NO = '0';
      }
      if (this.total[0] == this.total1[0] && this.total[1] == this.total1[1] && this.total[2] == this.total1[2]) {
        this.isButtonSpinning = true;

        this.api.updateFinancialInformation(this.data)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.loadData()
              this.demo.emit(false)
              this.isButtonSpinning = false;
              this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

            }
            else {
              this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
              this.isButtonSpinning = false;
            }
          });
      }
      else {
        this.message.error(this.api.translate.instant('gfinancialinfo.message2'), "");
      }
    } else {
      this.message.error(this.api.translate.instant('common.message.error.emptyinfo'), "");
    }



  }

  calculate(index) {
    ////console.log("indesc")
    if (index == 0) {
      this.total[index] = 0;
      this.total[index] = Number(this.data.LAST_3_YEAR_INFORMATION[33]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[36]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[39]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[42]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[45]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[48]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[51]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[54]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[57]['INCOME_AMOUNT'])
    }

    if (index == 1) {
      this.total[index] = 1;
      this.total[index] = Number(this.data.LAST_3_YEAR_INFORMATION[34]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[37]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[40]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[43]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[46]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[49]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[52]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[55]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[58]['INCOME_AMOUNT'])
    }

    if (index == 2) {

      this.total[index] = 2;
      this.total[index] = Number(this.data.LAST_3_YEAR_INFORMATION[35]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[38]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[41]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[44]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[47]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[50]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[53]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[56]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[59]['INCOME_AMOUNT'])
    }


  }


  calculateTotal(index) {
    if (index == 0) {
      this.total1[index] = 0;
      this.total1[index] = Number(this.data.LAST_3_YEAR_INFORMATION[60]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[63]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[66]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[69]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[72]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[75]['INCOME_AMOUNT'])
    }

    if (index == 1) {
      this.total1[index] = 1;
      this.total1[index] = Number(this.data.LAST_3_YEAR_INFORMATION[61]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[64]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[67]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[70]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[73]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[76]['INCOME_AMOUNT'])
    }

    if (index == 2) {

      this.total1[index] = 2;
      this.total1[index] = Number(this.data.LAST_3_YEAR_INFORMATION[62]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[65]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[68]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[71]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[74]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[77]['INCOME_AMOUNT'])
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
              this.demo.emit(false)
              var LOG_ACTION = ''
              var DESCRIPTION = ''
              if (this.extraApplicantInformation.IS_APPROVED == true) {
                LOG_ACTION = 'Coborrower financial Tab information Verified'

                DESCRIPTION = sessionStorage.getItem('userName') + ' has checked and approved the Coborrower financial for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK
              } else {
                LOG_ACTION = 'Coborrower financial Tab information Rejected'
                DESCRIPTION = sessionStorage.getItem('userName') + 'has checked and rejected the Coborrower financial for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK

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

  close() {
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
