import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Loaninformation } from 'src/app/Models/PersonalProposal/loaninformation';
import { Bankloanscheme } from 'src/app/Models/PersonalProposal/bankloanscheme';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService, NzModalService, NzModalRef } from 'ng-zorro-antd';
import { IndustriMarking } from 'src/app/Models/PersonalProposal/industri-marking';
import { PrioritySection } from 'src/app/Models/PersonalProposal/priority-section';
import { WeekerSection } from 'src/app/Models/PersonalProposal/weeker-section';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';

@Component({
  selector: 'app-bankschmemsi',
  templateUrl: './bankschmemsi.component.html',
  styleUrls: ['./bankschmemsi.component.css']
})
export class BankschmemsiComponent implements OnInit {
  @Input() PROPOSAL_ID: number;
  data: Loaninformation = new Loaninformation();
  isSpinning = false
  loanSkimData: Bankloanscheme[];
  disable1 = false
  isButtonSpinning = false
  isButtonSpinning1 = false
  instryCodeIds: IndustriMarking[]
  priorityCode: PrioritySection[]
  weekerSections: WeekerSection[]
  logtext: string = ""
  proposalType = sessionStorage.getItem("PRAPOSAL_TYPE")
  confirmModal?: NzModalRef;
  @Output() demo: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() CURRENT_STAGE_ID: number;
  @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  incomesourceId: number=0
  otherincomesourceId: number=0
  otherincomesourceId2: number=0
  filterQuery = ""
  id_Zero = 0
  loadingBankScheme = false
  loadingIndustryCode = false
  loadingPriorityCode = false
  loadingWeekerCode = false
  id_NA = "NA"
  isButtonSpinning2 = false
  browserLang = '';
  @Input() LOAN_KEY: Number;
  constructor(private api: ApiService, private message: NzNotificationService, private modal: NzModalService,) { }

  ngOnInit(): void {
    this.browserLang = localStorage.getItem('locale');
    this.getData()
    this.loadInfo()
    this.getAllIndustryMarking()
    this.getAllPrioritySection()
    this.getAllWeakerSectionMaster()
    this.getAllIncomeInfo()
  }
  loadInfo() {
    let filter = " AND EXTRA_INFORMATION_ID=11 AND PROPOSAL_ID=" + this.PROPOSAL_ID
    this.api.getAllApplicantExtraInformation(0, 0, "SEQ_NO", "asc", filter).subscribe(data => {
      this.extraApplicantInformation = data['data'][0]
    }, err => {
      //console.log(err);
    });
  }

  getAllIncomeInfo() {
    let filter = "AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND TYPE='B'"
    this.api.getAllIncomeInformation(0, 0, "ID", 'desc', filter)
      .subscribe(data => {
        console.log('databankscheme',data)
        if (data['code'] == 200 && data['data'].length > 0) {
        this.incomesourceId = data['data'][0]['INCOME_SOURCE_ID']
        this.otherincomesourceId = data['data'][0]['OTHER_INCOME_SOURCE_ID']
        this.otherincomesourceId2 = data['data'][0]['OTHER_INCOME_SOURCE_ID2']
      }
        //console.log("bank loan ids")
        //console.log(this.incomesourceId, this.otherincomesourceId, this.otherincomesourceId2)
        this.getAllLoanScheme()
        
      }, err => {
        //console.log(err);
      });
  }

  getAllLoanScheme() {
    //proposalType == 1 ---- personal loan
    //proposalType == 2 ---- buisness loan


    if (this.proposalType == "1") {
      this.filterQuery = " AND IS_INDIVIDUAL=1 AND ("
    }
    else {
      this.filterQuery = " AND IS_FIRM=1 AND ("
    }

    if (this.incomesourceId == 1 || this.otherincomesourceId == 1 || this.otherincomesourceId2 == 1)
      this.filterQuery += " IS_SALARIED=1 OR"
    if (this.incomesourceId == 2 || this.otherincomesourceId == 2 || this.otherincomesourceId2 == 2)
      this.filterQuery += " IS_BUSINESS=1 OR"
    if (this.incomesourceId == 3 || this.otherincomesourceId == 3 || this.otherincomesourceId2 == 3)
      this.filterQuery += " IS_FARMER=1 OR"
    if (this.incomesourceId == 4 || this.otherincomesourceId == 4 || this.otherincomesourceId2 == 4)
      this.filterQuery += " IS_PROPRIETER=1 OR"

    this.filterQuery = this.filterQuery.substring(0, this.filterQuery.length - 2) + ")"

    if (this.incomesourceId == 0 && this.otherincomesourceId == 0 && this.otherincomesourceId2 == 0)
      this.filterQuery = this.filterQuery.substring(0, this.filterQuery.length - 4)


    //console.log(this.filterQuery)

    this.loadingBankScheme = true
    this.api.getAllLoanScheme(0, 0, "ID", "asc", this.filterQuery + ' AND IS_ACTIVE = 1').subscribe(data => {
      //console.log("loan schemme")
      //console.log(data['data'])
      this.loanSkimData = data['data']
      this.loadingBankScheme = false

    }, err => {
      //console.log(err);
    });

  }

  getAllIndustryMarking() {
    this.loadingIndustryCode = true
    this.api.getAllIndustryCodes(0, 0, "ID", "asc", "").subscribe(data => {
      this.instryCodeIds = data['data']
      this.loadingIndustryCode = false

    }, err => {
      //console.log(err);
    });

  }

  getAllPrioritySection() {
    this.loadingPriorityCode = true
    this.api.getAllPriorityCodes(0, 0, "ID", "asc", "").subscribe(data => {
      this.priorityCode = data['data']
      this.loadingPriorityCode = false

    }, err => {
      //console.log(err);
    });
  }

  getAllWeakerSectionMaster() {
    this.loadingWeekerCode = true
    this.api.getAllWeekerSectionCodes(0, 0, "ID", "asc", "").subscribe(data => {
      this.weekerSections = data['data']
      this.loadingWeekerCode = false

    }, err => {
      //console.log(err);
    });
  }

  getData() {

    this.isSpinning = true
    let filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID
    this.api.getAllLoanInformation(0, 0, 'ID', "asc", filter).subscribe(data => {
      this.isSpinning = false

      if (data['count'] > 0) {
        this.data = Object.assign({}, data['data'][0]);
        //console.log("bank MSI")
        //console.log(this.data)
        if (this.data.REAL_ESTATE_MARKING == "")
          this.data.REAL_ESTATE_MARKING = "NA"
        if (this.data.BANK_LOAN_TYPE_ID == 0)
          this.disable1 = false
        else
          // this.disable1=true
          this.disable1 = false
      }
    }, err => {
      //console.log(err);
    });
  }

  save() {
    let isOk = true

    if (this.data.BANK_LOAN_TYPE_ID == 0 || this.data.BANK_LOAN_TYPE_ID == undefined) {
      isOk = false
      this.message.error(this.api.translate.instant('loaninfomation.message1'), "");
    } 

    if (this.data.INDUSTRY_CODE_ID == undefined) {
      this.data.INDUSTRY_CODE_ID = 0;
    }

    if (this.data.PRIORITY_CODE_ID == undefined) {
      this.data.PRIORITY_CODE_ID = 0;
    }

    if (this.data.WEEKER_SECTION_ID == undefined) {
      this.data.WEEKER_SECTION_ID = 0;
    }
    if (this.data.REAL_ESTATE_MARKING == "" || this.data.REAL_ESTATE_MARKING == undefined) {
      this.data.REAL_ESTATE_MARKING = 'NA';
    }

    if (isOk) {

      if (this.data.BANK_LOAN_TYPE_ID != 0) {
        this.isButtonSpinning = true
        this.data.IS_LOAN_SCHEME_UPDATE = 1
        this.api.updateLoanDemand(this.data)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              sessionStorage.setItem("bankLoanId", this.data.BANK_LOAN_TYPE_ID.toString())
              this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
              //console.log(this.extraApplicantInformation)
              this.extraApplicantInformation.IS_PROVIDED = true
              this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                  }
                  else {
                    this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
                  }
                });
              this.isButtonSpinning = false
              this.getData()
              this.demo.emit(false)
              this.logtext = 'Update & Close - loadDemand form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - loadDemand ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                  }
                });
              this.isButtonSpinning = false

            }
            else {
              this.logtext = 'Update & Close - loadDemand form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - loadDemand ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                  }
                });
              this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
              this.isButtonSpinning = false

            }
          });
      }
      else {




        this.isButtonSpinning = true
        this.confirmModal = this.modal.confirm({
          nzTitle: this.api.translate.instant('common.confirmModal.nzTitle'),
          nzContent: this.api.translate.instant('common.confirmModal.nzContent'),
          nzOnOk: () =>
            new Promise((resolve, reject) => {
              this.data.IS_LOAN_SCHEME_UPDATE = 1
              this.api.updateLoanDemand(this.data)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    sessionStorage.setItem("bankLoanId", this.data.BANK_LOAN_TYPE_ID.toString())
                    this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

                    this.extraApplicantInformation.IS_PROVIDED = true
                    this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
                      .subscribe(successCode => {
                        if (successCode['code'] == "200") {
                        }
                        else {
                          this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
                        }
                      });

                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                    this.isButtonSpinning = false
                    this.getData()
                    this.logtext = 'Update & Close - loadDemand form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - loadDemand ]";
                    this.api.addLog('A', this.logtext, this.api.emailId)
                      .subscribe(successCode => {
                        if (successCode['code'] == "200") {
                          //console.log(successCode);
                        }
                        else {
                          //console.log(successCode);
                        }
                      });
                    this.isButtonSpinning = false

                  }
                  else {
                    this.logtext = 'Update & Close - loadDemand form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - loadDemand ]";
                    this.api.addLog('A', this.logtext, this.api.emailId)
                      .subscribe(successCode => {
                        if (successCode['code'] == "200") {
                          //console.log(successCode);
                        }
                        else {
                          //console.log(successCode);
                        }
                      });
                    this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
                    this.isButtonSpinning = false

                  }
                });


            }).catch(() => console.log('माहिती बदल करण्यात अयशस्वी!'))
        });

      }

    }
  }


  saveClose() {

    let isOk = true

    if (this.data.BANK_LOAN_TYPE_ID == 0 || this.data.BANK_LOAN_TYPE_ID == undefined) {
      isOk = false
      this.message.error("बँक कर्ज स्किम प्रकार नमूद करा...", "");
    }

    if (this.data.INDUSTRY_CODE_ID == undefined) {
      isOk = false
      this.message.error("इंडस्ट्री मार्किंग नमूद करा...", "");
    }

    if (this.data.PRIORITY_CODE_ID == undefined) {
      isOk = false
      this.message.error("प्रायोरिटी सेकशन मार्किंग नमूद करा...", "");
    }

    if (this.data.WEEKER_SECTION_ID == undefined) {
      isOk = false
      this.message.error("विकर सेकशन नमूद करा...", "");
    }
    if (this.data.REAL_ESTATE_MARKING == "" || this.data.REAL_ESTATE_MARKING == undefined) {
      isOk = false
      this.message.error("रिअल इस्टेट मार्किंग नमूद करा...", "");
    }

    if (isOk) {

      if (this.data.BANK_LOAN_TYPE_ID != 0) {
        this.isButtonSpinning1 = true
        this.api.updateToBankSchemeMSI(this.data.BANK_LOAN_TYPE_ID, this.data.INDUSTRY_CODE_ID, this.data.PRIORITY_CODE_ID, this.data.WEEKER_SECTION_ID, this.data.REAL_ESTATE_MARKING, this.extraApplicantInformation.CURRENT_STAGE_ID, this.PROPOSAL_ID)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              sessionStorage.setItem("bankLoanId", this.data.BANK_LOAN_TYPE_ID.toString())
              this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
              this.extraApplicantInformation.IS_PROVIDED = true
              var LOG_ACTION = 'User saved Bank MSI  tab information'
              var DESCRIPTION = sessionStorage.getItem('userName') + 'has saved the Bank MSI  for the proposal ' + this.LOAN_KEY
              var LOG_TYPE = 'I'
              this.api.proposalLogInformation(this.extraApplicantInformation.PROPOSAL_ID, this.extraApplicantInformation.CURRENT_STAGE_ID, 0, LOG_ACTION, Number(sessionStorage.getItem("userId")), DESCRIPTION, LOG_TYPE)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                  }
                });
              this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                  }
                  else {
                    this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
                  }
                });
              this.isButtonSpinning1 = false
              this.getData()
              this.demo.emit(false)
            }
            else {
              this.logtext = 'Update & Close - loadDemand form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - loadDemand ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                  }
                });
              this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
              this.isButtonSpinning1 = false
            }
          });
      }
      else {
        this.confirmModal = this.modal.confirm({
          nzTitle: this.api.translate.instant('common.confirmModal.nzTitle'),
          nzContent: this.api.translate.instant('common.confirmModal.nzContent'),
          nzOnOk: () =>
            new Promise((resolve, reject) => {
              this.isButtonSpinning1 = true
              this.api.updateToBankSchemeMSI(this.data.BANK_LOAN_TYPE_ID, this.data.INDUSTRY_CODE_ID, this.data.PRIORITY_CODE_ID, this.data.WEEKER_SECTION_ID, this.data.REAL_ESTATE_MARKING, this.extraApplicantInformation.CURRENT_STAGE_ID, this.PROPOSAL_ID)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    var LOG_ACTION = 'User saved Bank MSI  tab information'
                    var DESCRIPTION = sessionStorage.getItem('userName') + 'has saved the Bank MSI  for the proposal ' + this.LOAN_KEY
                    var LOG_TYPE = 'I'
                    this.api.proposalLogInformation(this.extraApplicantInformation.PROPOSAL_ID, this.extraApplicantInformation.CURRENT_STAGE_ID, 0, LOG_ACTION, Number(sessionStorage.getItem("userId")), DESCRIPTION, LOG_TYPE)
                      .subscribe(successCode => {
                        if (successCode['code'] == "200") {
                        }
                      });
                    sessionStorage.setItem("bankLoanId", this.data.BANK_LOAN_TYPE_ID.toString())
                    this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                    this.extraApplicantInformation.IS_PROVIDED = true
                    this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
                      .subscribe(successCode => {
                        if (successCode['code'] == "200") {
                        }
                        else {
                          this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
                        }
                      });
                    this.isButtonSpinning1 = false
                    this.getData()
                    this.demo.emit(false)
                  }
                  else {
                    this.logtext = 'Update & Close - loadDemand form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - loadDemand ]";
                    this.api.addLog('A', this.logtext, this.api.emailId)
                      .subscribe(successCode => {
                        if (successCode['code'] == "200") {
                          //console.log(successCode);
                        }
                        else {
                          //console.log(successCode);
                        }
                      });
                    this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
                    this.isButtonSpinning1 = false
                  }
                });

            }).catch(() => console.log('माहिती बदल करण्यात अयशस्वी!'))
        });
      }

    }

  }
  VerifyUpdate() {

    if (this.extraApplicantInformation.REMARK != "") {
      this.isButtonSpinning2 = true
      this.extraApplicantInformation.IS_VERIFIED = true
      this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.isButtonSpinning2 = false
            this.demo.emit(false)
            // this.oldIndex++;
            // this.indexChanged.emit(this.oldIndex)
            var LOG_ACTION = ''
            var DESCRIPTION = ''
            if (this.extraApplicantInformation.IS_APPROVED == true) {
              LOG_ACTION = 'Bank MSI Tab information Verified'

              DESCRIPTION = sessionStorage.getItem('userName') + ' has checked and approved the Bank MSI for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK
            } else {
              LOG_ACTION = 'Bank MSI Tab information Rejected'
              DESCRIPTION = sessionStorage.getItem('userName') + 'has checked and rejected the Bank MSI for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK

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
            this.isButtonSpinning2 = false

          }
        });
    }
    else {
      this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
    }
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
