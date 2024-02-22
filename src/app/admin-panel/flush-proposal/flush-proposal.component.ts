import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Proposal } from 'src/app/Models/proposal';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { Proposalstage } from 'src/app/Models/BasicForms/proposalstage';

import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { ProposaldocumentComponent } from '../../pages/Proposals/proposaldocument/proposaldocument.component';
import { JoinbranchComponent } from '../../pages/Proposal1/joinbranch/joinbranch.component';
import { CibilcheckingComponent } from '../../pages/Proposal1/cibilchecking/cibilchecking.component';
import { StatuslogsComponent } from '../../pages/Proposals/statuslogs/statuslogs.component';
import { DatePipe } from '@angular/common';
import { PersonalproposalComponent } from '../../pages/PersonalProposal/personalproposal/personalproposal.component';
import { Loantypes } from 'src/app/Models/BasicForms/loantypes';
import { PasstomainbranchComponent } from '../../pages/Proposal1/passtomainbranch/passtomainbranch.component';
import { Applicant } from 'src/app/Models/Applicant/applicant';
import { Personalinformation } from 'src/app/Models/PersonalProposal/personalinformation';
import { Documents2Component } from '../../pages/Proposals/documents2/documents2.component';
import { Payments } from 'src/app/Models/Payments/payments';
import { PaymentapprovalComponent } from '../../pages/BranchForms/paymentapproval/paymentapproval.component';
import { FormprintComponent } from '../../pages/formprint/formprint.component';
import { Basicinfo } from 'src/app/Models/PersonalProposal/basicinfo';


@Component({
  selector: 'app-flush-proposal',
  templateUrl: './flush-proposal.component.html',
  styleUrls: ['./flush-proposal.component.css'],
  providers: [DatePipe]
})
export class FlushProposalComponent implements OnInit {



 
  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.dataList.forEach(item => this.updateCheckedSet(item.ID, value));
    this.refreshCheckedStatus();
  }



  refreshCheckedStatus(): void {
    this.checked = this.dataList.every(item => this.setOfCheckedId.has(item.ID));
    this.indeterminate = this.dataList.some(item => this.setOfCheckedId.has(item.ID)) && !this.checked;
  }



  loadingRecords2 = false
  formTitle = "Flush Proposals";
  pageIndex = 1;
  pageSize = 10;
  totalRecords = 1;
  dataList = [];
  dataList1 = [];
  LOAN_TYPE_ID = "AL"
  loadingRecords = true;
  sortValue: string = "desc";
  sortKey: string = "id";
  searchText: string = "";
  filterQuery: string = "";
  isFilterApplied: string = "default";
  logtext: string = "";
  isVisible = false
  filterClass: string = "filter-visible";
  initFilter = true;
  isSpinning: boolean
  columns: string[][] = [['LOAN_KEY', this.api.translate.instant('proposalsall.columns1')], ['PRAPOSAL_TYPE', this.api.translate.instant('proposalsall.columns2')], ['LOAN_TYPE_NAME', this.api.translate.instant('proposalsall.columns3')], ['LOAN_AMOUNT', this.api.translate.instant('proposalsall.columns4')], ['APPLICANT_NAME', this.api.translate.instant('proposalsall.columns5')], ['BRANCH_NAME', this.api.translate.instant('proposalsall.columns6')], ['MOBILE_NUMBER', this.api.translate.instant('proposalsall.columns7')],   ['AGE', this.api.translate.instant('proposalsall.columns10')],   ['CREATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns14')], ['LAST_UPDATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns15')]]
  //drawer Variables
  drawerVisible: boolean;
  roleId = sessionStorage.getItem("roleId")
  drawerTitle: string;
  drawerData: Proposal = new Proposal();
  branchId = sessionStorage.getItem('branchId')
  applicantId = sessionStorage.getItem('applicantId')
  userActivityLogData: Useractivitylog = new Useractivitylog();
  loadingProposalStages = false
  proposalStages: Proposalstage[]
  PROPOSAL_STAGE_ID = "AL"
  drawerJoinBranchVisible = false
  drawerJoinBranchTitle: string = ""
  drawerCibilTitle: string = ""
  drawerCibilhVisible = false
  okLoading = false
  rejectVisible = false
  REMARKS: string = ""
  drawerStattusTitle: string = ""
  drawerStattusVisible = false
  dateFormat = 'dd/MM/yyyy';
  selectedDate: Date[] = []
  value1: string = ""
  value2: string = ""
  drawerPersonalProposalVisible = false
  drawerPersonalProposalTitle: string = ""
  loanData: Loantypes[]
  isLoanSpinning = false
  drawerpassmainbranchVisible = false
  drawermainbranchTitle: string = ""

  drawerFormPrintTitle: string;
  drawerFormPrintData: Proposal;
  drawerFormPrintVisible: boolean;
  formname = ''
  drawerVisible2: boolean;
  drawerTitle2: string;
  drawerData2: Basicinfo = new Basicinfo();
  @ViewChild('button1') searchElement: ElementRef;
  @ViewChild(FormprintComponent) formPrint: FormprintComponent;
  @ViewChild(ProposaldocumentComponent) proposalDocumnets: ProposaldocumentComponent;
  @ViewChild(Documents2Component) proposalDocumnets2: Documents2Component;
  @ViewChild(JoinbranchComponent) branchcompoent: JoinbranchComponent;
  @ViewChild(CibilcheckingComponent) cibilcheck: CibilcheckingComponent;
  @ViewChild(StatuslogsComponent) proposalStatuslogsComponent: StatuslogsComponent;
  @ViewChild(PersonalproposalComponent) personalProposal: PersonalproposalComponent;
  @ViewChild(PasstomainbranchComponent) mainbranch: PasstomainbranchComponent;
  @ViewChild(PaymentapprovalComponent) paymentApprove: PaymentapprovalComponent;
  drawerDocumentVisible = false;
  drawerDocumentTitle: string = "";
  drowerData: Proposal = new Proposal();
  browserLang = '';
  drawerTitle4 = "";
  drawerData4: Payments = new Payments();
  drawerVisible4 = false;
  //drawer Variables
  drawerVisible8: boolean;
  drawerTitle8: string;
  drawerData8: Payments = new Payments();
  drawerVisible9: boolean;
  drawerTitle9: string;
  drawerData9: Proposal = new Proposal();
  drawerVisible10: boolean;
  drawerTitle10: string;
  drawerData10: Proposal = new Proposal();
  security = false
  type1 = false
  type2 = false
  type4 = false
  type3 = false;
  type5 = false;
  type6 = false;
  type7 = false
  type8 = false
  type9 = false
  type10 = false
  type11 = false
  type12 = false
  type13 = false
  type14 = false
  type15 = false
  type16 = false
  type17 = false
  branchData = [];
  BRANCH_ID = '0';

  constructor(private api: ApiService, private datePipe: DatePipe, private message: NzNotificationService, private router: Router) { }

  ngOnInit() {
    this.browserLang = localStorage.getItem('locale');
    if (this.browserLang == 'mr') {
      this.columns = [['LOAN_KEY', this.api.translate.instant('proposalsall.columns1')],   ['LOAN_TYPE_NAME', this.api.translate.instant('proposalsall.columns3')], ['LOAN_AMOUNT', this.api.translate.instant('proposalsall.columns4')], ['APPLICANT_NAME', this.api.translate.instant('proposalsall.columns5')], ['BRANCH_NAME', this.api.translate.instant('proposalsall.columns6')],['MOBILE_NUMBER', this.api.translate.instant('proposalsall.columns7')],   ['AGE', this.api.translate.instant('proposalsall.columns10')],   ['CREATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns14')], ['LAST_UPDATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns15')]]
    } else if (this.browserLang == 'en') {
      this.columns = [['LOAN_KEY', this.api.translate.instant('proposalsall.columns1')],   ['LOAN_TYPE_NAME_EN', this.api.translate.instant('proposalsall.columns3')], ['LOAN_AMOUNT', this.api.translate.instant('proposalsall.columns4')], ['APPLICANT_NAME', this.api.translate.instant('proposalsall.columns5')], ['BRANCH_NAME_EN', this.api.translate.instant('proposalsall.columns6')], ['MOBILE_NUMBER', this.api.translate.instant('proposalsall.columns7')],   ['AGE', this.api.translate.instant('proposalsall.columns10')],   ['CREATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns14')], ['LAST_UPDATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns15')]]
    } else {
      this.columns = [['LOAN_KEY', this.api.translate.instant('proposalsall.columns1')],   ['LOAN_TYPE_NAME_KN', this.api.translate.instant('proposalsall.columns3')], ['LOAN_AMOUNT', this.api.translate.instant('proposalsall.columns4')], ['APPLICANT_NAME', this.api.translate.instant('proposalsall.columns5')], ['BRANCH_NAME_KN', this.api.translate.instant('proposalsall.columns6')], ['MOBILE_NUMBER', this.api.translate.instant('proposalsall.columns7')],   ['AGE', this.api.translate.instant('proposalsall.columns10')],   ['CREATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns14')], ['LAST_UPDATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns15')]]
    }
    this.search();
    this.loadProposalStage()
    this.loadLoanTypes()
    this.logtext = "OPENED - Praposals form KEYWORD[O - Praposals] ";
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          ////console.log(successCode);
        }
        else {
          ////console.log(successCode);
        }
      });

    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "ApplicantProposal - Opened"
    this.userActivityLogData.ACTIVITY_TIME = new Date()
    this.api.createUserActivityLog(this.userActivityLogData)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          ////console.log(successCode);
        }
        else {
          ////console.log(successCode);
        }
      });
  }


  loadProposalStage() {
    this.loadingProposalStages = true;
    let filter = "AND STATUS=1"
    this.api.getAllProposalStages(0, 0, 'SEQUENCE_NUMBER', 'asc', filter).subscribe(localName => {
      this.proposalStages = localName['data'];
      this.loadingProposalStages = false;
    }, err => {
      ////console.log(err);
      this.loadingProposalStages = false;
    });

    if (this.branchId == '0') {
      this.api.getAllBranches(0, 0, 'ID', "asc", "")
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.branchData = successCode['data'];
          }
        });
    }
  }


  loadLoanTypes() {
    this.isLoanSpinning = true;
    let filter = "AND STATUS=1"
    this.api.getAllLoanScheme(0, 0, 'ID', 'desc', "").subscribe(localName => {
      ////console.log("loam tuypd")
      ////console.log(localName)
      this.loanData = localName['data'];
      this.isLoanSpinning = false;
    }, err => {
      ////console.log(err);
      this.isLoanSpinning = false;
    });
  }

  searchSet() {
    document.getElementById('button1').focus();
    this.search(true)
  }


  showFilter() {
    if (this.filterClass === "filter-visible")
      this.filterClass = "filter-invisible";
    else
      this.filterClass = "filter-visible";

  }

  clearFilter() {
    this.PROPOSAL_STAGE_ID = "AL";
    this.LOAN_TYPE_ID = "AL";
    this.filterQuery = "";
    this.selectedDate = null;
    this.BRANCH_ID = "0";
    this.filterClass = "filter-invisible";
    this.search(true)
  }

  // Basic Methods
  sort(sort: { key: string; value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;
    this.search(true);
  }



  changeDate(value) {
    // ////console.log(value[0])
    // ////console.log(value[1])

    this.value1 = this.datePipe.transform(value[0], "yyyy-MM-dd")
    this.value2 = this.datePipe.transform(value[1], "yyyy-MM-dd")

    //this.datePipe.transform(this.month,"yyyy-MM")

  }

  search(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loadingRecords = true;
    this.isSpinning = true
    var sort: string;
    try {
      sort = this.sortValue.startsWith("a") ? "asc" : "desc";

      this.logtext = "Filter Applied - Praposals form" + sort + " " + this.sortKey + " KEYWORD [F - Praposals] ";
      this.api.addLog('A', this.logtext, this.api.emailId)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            ////console.log(successCode);
          }
          else {
            ////console.log(successCode);
          }
        });
      this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
      this.userActivityLogData.ACTIVITY_DETAILS = "ApplicantProposal - Sort on " + sort + " " + this.sortKey
      this.userActivityLogData.ACTIVITY_TIME = new Date()
      this.api.createUserActivityLog(this.userActivityLogData)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            ////console.log(successCode);
          }
          else {
            ////console.log(successCode);
          }
        });

    } catch (error) {
      sort = "";
    }
    var likeQuery = ""
    ////console.log("search text:" + this.searchText);
    if (this.searchText != "") {
      likeQuery = " AND (";

      this.columns.forEach(column => {
        likeQuery += " " + column[0] + " like '%" + this.searchText + "%' OR";
      });
      likeQuery = likeQuery.substring(0, likeQuery.length - 2) + ")"
    }



    var filter = ""
    if (Number(this.branchId) == 0) {
      if (likeQuery)
        filter = this.filterQuery + likeQuery
      else
        filter = this.filterQuery
    }
    else {
      if (likeQuery)
         filter = "AND BRANCH_ID=" + this.branchId + this.filterQuery + likeQuery
      else
        filter = "AND BRANCH_ID=" + this.branchId + this.filterQuery
    }



    this.logtext = "Filter Applied - Praposals form " + likeQuery + " KEYWORD [F - Praposals] ";
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          ////console.log(successCode);
        }
        else {
          ////console.log(successCode);
        }
      });

    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "ApplicantProposal - Search For " + this.searchText + " " + likeQuery
    this.userActivityLogData.ACTIVITY_TIME = new Date()
    this.api.createUserActivityLog(this.userActivityLogData)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          ////console.log(successCode);
        }
        else {
          ////console.log(successCode);
        }
      });

    ////console.log("filter applied")
    ////console.log(filter)

    this.api.getAllPraposals(this.pageIndex, this.pageSize, this.sortKey, sort, filter).subscribe(data => {
      ////console.log("data")
      ////console.log(data)
      this.loadingRecords = false;
      this.isSpinning = false
      this.totalRecords = data['count'];
      this.dataList = data['data'];
      console.log("dataList in getAllProposal",this.dataList);
      this.filterClass = "filter-invisible";
      this.isFilterApplied = "primary"
    }, err => {
      ////console.log(err);
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });

    this.api.getAllPraposals(0, 0, this.sortKey, sort, filter).subscribe(data => {
      this.dataList1 = data['data'];
    }, err => {
      ////console.log(err);
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });
  }

  applyfilter() {
    ////console.log(this.value1)
    ////console.log(this.value2)

    if (this.value1 == "" && this.value2 == "") {
      this.filterQuery = ""
    }
    else {
      this.filterQuery = " AND ( CREATED_ON_DATETIME BETWEEN '" + this.value1 + ":00:00:00" + "' AND '" + this.value2 + ":23:59:59" + "' ) "
    }

    if (this.PROPOSAL_STAGE_ID == 'AL') {
      this.filterQuery = this.filterQuery
    }
    else {
      this.filterQuery += " AND CURRENT_STAGE_ID=" + this.PROPOSAL_STAGE_ID
    }

    if (this.LOAN_TYPE_ID == 'AL') {
      this.filterQuery = this.filterQuery
    }
    else {
      this.filterQuery += " AND LOAN_TYPE_ID=" + this.LOAN_TYPE_ID
    }

    if (this.branchId == '0') {
      if (this.BRANCH_ID == '0') {
        this.filterQuery = this.filterQuery
      }
      else {
        this.filterQuery += " AND BRANCH_ID=" + this.BRANCH_ID
      }
    }

    this.search()
  }

  //Drawer Methods
  get closeCallback() {
    return this.drawerClose.bind(this);
  }

  get closeCallbackJoinBranch() {
    return this.drawerJoinBranchClose.bind(this);
  }
  get closeCallbackCibil() {
    return this.drawerCibilClose.bind(this);
  }

  Documents(data) {
    //console.log("Documents")
    this.drawerDocumentTitle = this.api.translate.instant('proposaldocument.link2')
    this.drawerDocumentVisible = true;
    this.drowerData = Object.assign({}, data);
    this.proposalDocumnets2.getAllProposalDocuments(data, this.drowerData.APPLICANT_ID)
  }
  get closeCallbackDocument() {
    return this.drawerDocumentClose.bind(this);
  }
  drawerDocumentClose(): void {
    this.search()
    this.drawerDocumentVisible = false;
  }
  view(data: Proposal): void {
    ////console.log(data)

    this.drawerTitle = this.api.translate.instant('proposalsall.drawert1');
    this.drawerData = Object.assign({}, data);
    this.drawerVisible = true;
    this.proposalDocumnets.getAllProposalDocuments(data)
    // this.proposalDocumnets.getLinkUrl("http://117.204.250.156:1470/userresponses/"+data.BOT_REPLY_ID)
    // this.proposalDocumnets.getLinkUrl("http://bot.tecpool.in/userresponses/"+data.BOT_REPLY_ID)
    this.proposalDocumnets.getLinkUrl(this.api.chatbotUrl + "userresponses/" + data.BOT_REPLY_ID)

    // this.proposalDocumnets
    this.proposalDocumnets.REMARKS = ""
    this.proposalDocumnets.AMT_INFORMATION = ""
    this.proposalDocumnets.AMOUNT = undefined
    this.proposalDocumnets.TIME = undefined
    this.proposalDocumnets.STATUS = "M"
    this.proposalDocumnets.getExtraInformation()
    this.logtext = 'VIEW - PraposalDocuments form KEYWORD [V - PraposalDocuments] ';
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          ////console.log(successCode);
        }
        else {
          ////console.log(successCode);
        }
      });

    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "ApplicantProposal - Document Icon Clicked " + data.APPLICANT_NAME + " Current Stage Name (" + data.CURRENT_STAGE_NAME + ")"
    this.userActivityLogData.ACTIVITY_TIME = new Date()
    this.api.createUserActivityLog(this.userActivityLogData)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          ////console.log(successCode);
        }
        else {
          ////console.log(successCode);
        }
      });
  }


  CIBILCheck(data: Proposal): void {
    this.drawerCibilTitle = this.api.translate.instant('proposalsall.drawert2');
    this.drawerData = Object.assign({}, data);
    this.drawerCibilhVisible = true;
    // this.cibilcheck.getUrl("http://117.204.250.156:1470/userresponses/"+data.BOT_REPLY_ID)
    this.cibilcheck.REMARK = ""
    this.cibilcheck.fileData_REPORT_URL = null
    this.cibilcheck.CIBIL_SCORE = undefined
    // this.cibilcheck.getUrl("http://bot.tecpool.in/userresponses/"+data.BOT_REPLY_ID)

    this.cibilcheck.getUrl(this.api.chatbotUrl + "userresponses/" + data.BOT_REPLY_ID)

  }


  joinBranch(data: Proposal) {
    this.drawerJoinBranchTitle = this.api.translate.instant('proposalsall.drawert3');
    this.drawerData = Object.assign({}, data);
    this.drawerJoinBranchVisible = true;
    ////console.log(data)
    this.branchcompoent.BRANCH_ID = undefined
    this.branchcompoent.REMARKS = undefined
    //this.branchcompoent.getUrl("http://117.204.250.156:1470/userresponses/"+data.BOT_REPLY_ID)

    //  this.branchcompoent.getUrl("http://bot.tecpool.in/userresponses/"+data.BOT_REPLY_ID)
    this.branchcompoent.getUrl(this.api.chatbotUrl + "userresponses/" + data.BOT_REPLY_ID)

    this.branchcompoent.loadAllAddressInfo(data.ID, data.APPLICANT_ID)
    //http://117.204.250.156:1470/userresponses/
    this.logtext = 'VIEW - JoinBranch form KEYWORD [V - JoinBranch] ';
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          ////console.log(successCode);
        }
        else {
          ////console.log(successCode);
        }
      });

    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "VIEW - JoinBranch Clicked " + data.APPLICANT_NAME + " Current Stage Name (" + data.CURRENT_STAGE_NAME + ")"
    this.userActivityLogData.ACTIVITY_TIME = new Date()
    this.api.createUserActivityLog(this.userActivityLogData)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          ////console.log(successCode);
        }
        else {
          ////console.log(successCode);
        }
      });
  }

  drawerJoinBranchClose(): void {
    this.search();
    this.drawerJoinBranchVisible = false;
  }

  drawerClose(): void {
    this.search();
    this.drawerVisible = false;
  }

  drawerCibilClose(): void {
    this.search();
    this.drawerCibilhVisible = false;
  }

  tabForm(data: Proposal) {
    this.drawerPersonalProposalTitle = this.api.translate.instant('proposalsall.drawert4')
    this.drawerData = Object.assign({}, data);
    this.drawerPersonalProposalVisible = true
    this.personalProposal.loadAllExtraInformationMapped(data.ID, data.APPLICANT_ID, data)
  }
  reject(data: Proposal) {
    this.rejectVisible = true
    this.drawerData = Object.assign({}, data);
    ////console.log(this.drawerData)
  }

  rejectProposal() {
    this.okLoading = true
    ////console.log(this.drawerData)
    ////console.log(this.REMARKS)


    if (this.REMARKS != "") {
      this.api.updateNextDocumentUploadStage(10, 1, this.drawerData.ID, this.REMARKS)
        .subscribe(successCode => {
          this.rejectVisible = false
          this.search()
          this.okLoading = false

          if (successCode['code'] == "200") {
            this.logtext = 'Update Status - Reject form - SUCCESS ' + "Stage Id" + 2 + " KEYWORD [U - PROPOSAL ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  ////console.log(successCode);
                }
                else {
                  ////console.log(successCode);
                  this.okLoading = false

                }
              });

            this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
            this.userActivityLogData.ACTIVITY_DETAILS = "Reject -  Reject Clicked" + "Stage Id" + 2
            this.userActivityLogData.ACTIVITY_TIME = new Date()
            this.api.createUserActivityLog(this.userActivityLogData)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  ////console.log(successCode);
                }
                else {
                  ////console.log(successCode);
                  this.okLoading = false
                }
              });


          }
          else {


            this.logtext = 'PROPOSALS - Reject form - ERROR - ' + "Stage Id" + 2 + " KEYWORD [U - PROPOSALS ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  ////console.log(successCode);
                }
                else {
                  ////console.log(successCode);
                  this.okLoading = false
                }
              });
            this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
            this.userActivityLogData.ACTIVITY_DETAILS = "PROPOSALS - Reject Failed" + "Stage Id" + 2
            this.userActivityLogData.ACTIVITY_TIME = new Date()
            this.api.createUserActivityLog(this.userActivityLogData)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  ////console.log(successCode);
                }
                else {
                  ////console.log(successCode);
                }
              });
            this.message.error(this.api.translate.instant('common.message.error.failed'), "");
            this.okLoading = false;


          }
        });
    }
    else {
      this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
    }


  }
  rejectCancel() {
    this.rejectVisible = false
  }

  StatusLogs(data: Proposal) {
    this.drawerStattusTitle = this.api.translate.instant('proposalsall.drawert5')
    this.drawerStattusVisible = true;
    this.drawerData = Object.assign({}, data);
    this.proposalStatuslogsComponent.getProposalSalId(data.ID)
  }

  passToMainBranch(data: Proposal) {
    this.drawermainbranchTitle = this.api.translate.instant('proposalsall.drawert6')
    this.drawerpassmainbranchVisible = true;
    this.drawerData = Object.assign({}, data);
    this.mainbranch.reset()
    //this.proposalStatuslogsComponent.getProposalSalId(data.ID)
  }

  get closeCallbackStattus() {
    return this.drawerStattusClose.bind(this);
  }
  drawerStattusClose(): void {
    this.drawerStattusVisible = false;
  }
  get closeCallbackPersonalProposal() {
    return this.drawerPersonalProposalClose.bind(this);
  }
  drawerPersonalProposalClose(): void {
    this.drawerPersonalProposalVisible = false;
    this.search();
  }

  get closeCallbackmainbranch() {
    return this.drawermainbranchClose.bind(this);
  }
  drawermainbranchClose(): void {
    this.search()
    this.drawerpassmainbranchVisible = false;
  }
  printPdf(data: Proposal, type: number) {

    if (type == -1) {
      this.security = true
      this.type2 = true
      this.type3 = true
      this.type4 = true
      this.type1 = false
      this.type5 = true
      this.type6 = false
      this.type7 = false
      this.type8 = true
      this.type9 = false
      this.type10 = false
      this.type11 = false
      this.type12 = false
      this.type13 = false
      this.type14 = false
      this.type15 = false
      this.type16 = false
      this.type17 = false
      
    }

    if (type == 1) {
      this.security = true
      this.type2 = false
      this.type3 = false
      this.type4 = false
      this.type1 = false
      this.type5 = false
      this.type6 = false
      this.type7 = false
      this.type8 = false
      this.type9 = false
      this.type10 = false
      this.type11 = false
      this.type12 = false
      this.type13 = false
      this.type14 = false
      this.type15 = false
      this.type16 = false
      this.type17 = false
      
    }

    if (type == 2) {
      this.type2 = true
      this.security = false
      this.type3 = false
      this.type4 = false
      this.type1 = false
      this.type5 = false
      this.type6 = false
      this.type7 = false
      this.type8 = false
      this.type9 = false
      this.type10 = false
      this.type11 = false
      this.type12 = false
      this.type13 = false
      this.type14 = false
      this.type15 = false
      this.type16 = false
      this.type17 = false
    }

    if (type == 3) {
      this.type3 = true
      this.security = false
      this.type2 = false
      this.type4 = false
      this.type1 = false
      this.type5 = false
      this.type6 = false
      this.type7 = false
      this.type8 = false
      this.type9 = false
      this.type10 = false
      this.type11 = false
      this.type12 = false
      this.type13 = false
      this.type14 = false
      this.type15 = false
      this.type16 = false
      this.type17 = false
    }

    if (type == 4) {
      this.type4 = true
      this.security = false
      this.type2 = false
      this.type3 = false
      this.type1 = false
      this.type5 = false
      this.type6 = false
      this.type7 = false
      this.type8 = false
      this.type9 = false
      this.type10 = false
      this.type11 = false
      this.type12 = false
      this.type13 = false
      this.type14 = false
      this.type15 = false
      this.type16 = false
      this.type17 = false
    }

    if (type == 5) {
      this.type4 = false
      this.security = false
      this.type2 = false
      this.type3 = false
      this.type1 = true
      this.type5 = false
      this.type6 = false
      this.type7 = false
      this.type8 = false
      this.type9 = false
      this.type10 = false
      this.type11 = false
      this.type12 = false
      this.type13 = false
      this.type14 = false
      this.type15 = false
      this.type16 = false
      this.type17 = false
    }

    if (type == 5) {
      this.type4 = false
      this.security = false
      this.type2 = false
      this.type3 = false
      this.type1 = false
      this.type5 = true
      this.type6 = false
      this.type7 = false
      this.type8 = false
      this.type9 = false
      this.type10 = false
      this.type11 = false
      this.type12 = false
      this.type13 = false
      this.type14 = false
      this.type15 = false
      this.type16 = false
      this.type17 = false
    }

    if (type == 6) {
      this.type4 = false
      this.security = false
      this.type2 = false
      this.type3 = false
      this.type1 = false
      this.type6 = true
      this.type5 = false
      this.type7 = false
      this.type8 = false
      this.type9 = false
      this.type10 = false
      this.type11 = false
      this.type12 = false
      this.type13 = false
      this.type14 = false
      this.type15 = false
      this.type16 = false
      this.type17 = false
    }

    if (type == 7) {
      this.type4 = false
      this.security = false
      this.type2 = false
      this.type3 = false
      this.type1 = false
      this.type7 = true
      this.type5 = false
      this.type6 = false
      this.type8 = false
      this.type9 = false
      this.type10 = false
      this.type11 = false
      this.type12 = false
      this.type13 = false
      this.type14 = false
      this.type15 = false
      this.type16 = false
      this.type17 = false
    }

    if (type == 8) {
      this.type4 = false
      this.security = false
      this.type2 = false
      this.type3 = false
      this.type1 = false
      this.type7 = false
      this.type5 = false
      this.type6 = false
      this.type8 = true
      this.type9 = false
      this.type10 = false
      this.type11 = false
      this.type12 = false
      this.type13 = false
      this.type14 = false
      this.type15 = false
      this.type16 = false
      this.type17 = false
    }

    if (type == 9) {
      this.type4 = false
      this.security = false
      this.type2 = false
      this.type3 = false
      this.type1 = false
      this.type7 = false
      this.type5 = false
      this.type6 = false
      this.type8 = false
      this.type9 = true
      this.type10 = false
      this.type11 = false
      this.type12 = false
      this.type13 = false
      this.type14 = false
      this.type15 = false
      this.type16 = false
      this.type17 = false
    }


    if (type == 10) {
      this.type4 = false
      this.security = false
      this.type2 = false
      this.type3 = false
      this.type1 = false
      this.type7 = false
      this.type5 = false
      this.type6 = false
      this.type8 = false
      this.type9 = false
      this.type10 = true
      this.type11 = false
      this.type12 = false
      this.type13 = false
      this.type14 = false
      this.type15 = false
      this.type16 = false
      this.type17 = false
    }

    if (type == 11) {
      this.type4 = false
      this.security = false
      this.type2 = false
      this.type3 = false
      this.type1 = false
      this.type7 = false
      this.type5 = false
      this.type6 = false
      this.type8 = false
      this.type9 = false
      this.type10 = false
      this.type11 = true
      this.type12 = false
      this.type13 = false
      this.type14 = false
      this.type15 = false
      this.type16 = false
      this.type17 = false
    }

    if (type == 12) {
      this.type4 = false
      this.security = false
      this.type2 = false
      this.type3 = false
      this.type1 = false
      this.type7 = false
      this.type5 = false
      this.type6 = false
      this.type8 = false
      this.type9 = false
      this.type10 = false
      this.type11 = false
      this.type12 = true
      this.type13 = false
      this.type14 = false
      this.type15 = false
      this.type16 = false
      this.type17 = false
    }

    if (type == 13) {
      this.type4 = false
      this.security = false
      this.type2 = false
      this.type3 = false
      this.type1 = false
      this.type7 = false
      this.type5 = false
      this.type6 = false
      this.type8 = false
      this.type9 = false
      this.type10 = false
      this.type11 = false
      this.type12 = false
      this.type13 = true
      this.type14 = false
      this.type15 = false
      this.type16 = false
      this.type17 = false
    }




    if (type == 14) {
      this.type4 = false
      this.security = false
      this.type2 = false
      this.type3 = false
      this.type1 = false
      this.type7 = false
      this.type5 = false
      this.type6 = false
      this.type8 = false
      this.type9 = false
      this.type10 = false
      this.type11 = false
      this.type12 = false
      this.type13 = false
      this.type14 = true
      this.type15 = false
      this.type16 = false
      this.type17 = false
    }


    
  if (type == 15) {
    this.type4 = false
    this.security = false
    this.type2 = false
    this.type3 = false
    this.type1 = false
    this.type7 = false
    this.type5 = false
    this.type6 = false
    this.type8 = false
    this.type9 = false
    this.type10 = false
    this.type11 = false
    this.type12 = false
    this.type13 = false
    this.type15 = true
    this.type14 = false
    this.type16 = false
    this.type17 = false
  }



  if (type == 16) {
    this.type4 = false
    this.security = false
    this.type2 = false
    this.type3 = false
    this.type1 = false
    this.type7 = false
    this.type5 = false
    this.type6 = false
    this.type8 = false
    this.type9 = false
    this.type10 = false
    this.type11 = false
    this.type12 = false
    this.type13 = false
    this.type16 = true
    this.type15 = false
    this.type14 = false
    this.type17 = false
  }




  if (type == 17) {
    this.type4 = false
    this.security = false
    this.type2 = false
    this.type3 = false
    this.type1 = false
    this.type7 = false
    this.type5 = false
    this.type6 = false
    this.type8 = false
    this.type9 = false
    this.type10 = false
    this.type11 = false
    this.type12 = false
    this.type13 = false
    this.type17 = true
    this.type15 = false
    this.type16 = false
    this.type14 = false
  }



    this.drawerFormPrintTitle = this.api.translate.instant('proposalsall.drawert7')
    this.drawerFormPrintData = Object.assign({}, data);
    console.log("drawer data1", this.drawerFormPrintData);
    this.drawerFormPrintVisible = true
    this.formname = this.drawerFormPrintData['LOAN_KEY']
    this.formPrint.loadAllExtraInformationMapped(data.ID, data.APPLICANT_ID,type, data)
  }
  get closeCallbackFormPrint() {
    return this.drawerFormPrintClose.bind(this);
  }
  drawerFormPrintClose(): void {
    this.drawerFormPrintVisible = false;
  }

  add() {
    this.drawerTitle2 = this.api.translate.instant('basicinfo.drawername');
    this.drawerVisible2 = true;
    this.drawerData2 = new Basicinfo();
  }

  get closeCallback2() {
    return this.drawerClose2.bind(this);
  }

  drawerClose2(): void {
    this.search()
    this.drawerVisible2 = false;
  }


  paymentReceiptUpload(data: Proposal) {
    // this.drawerData4 = new Payments();
    this.drawerTitle4 = this.api.translate.instant('basicinfo.m10')
    this.api.getAllPayments(0, 0, 'ID', 'desc', " AND PROPOSAL_ID = " + data.ID).subscribe(localName => {
      this.drawerData4 = Object.assign({}, localName['data'][0]);
      this.drawerData4.ATTEMPT_COUNT = this.drawerData4.ATTEMPT_COUNT + 1
      this.drawerVisible4 = true;
    }, err => {

    });

  }
  get closeCallback4() {
    return this.drawerClose4.bind(this);
  }

  drawerClose4(): void {
    this.search()
    this.drawerVisible4 = false;
  }

  get closeCallback8() {
    return this.drawerClose8.bind(this);
  }

  drawerClose8(): void {
    this.search();
    this.drawerVisible8 = false;
  }

  verifyPayment(data: Proposal): void {

    this.drawerTitle8 = this.api.translate.instant('payments.drowername');
    this.api.getAllPayments(0, 0, 'ID', 'desc', " AND PROPOSAL_ID = " + data.ID).subscribe(localName => {
      this.drawerData8 = Object.assign({}, localName['data'][0]);
      if (this.drawerData8.STATUS == "Y")
        this.drawerData8.STATUS = "A"
      this.paymentApprove.getUrl(this.drawerData8.RECEIPT_URL)
      this.drawerVisible8 = true;
    }, err => {

    });
  }
  get closeCallback9() {
    return this.drawerClose9.bind(this);
  }

  drawerClose9(): void {
    this.search();
    this.drawerVisible9 = false;
  }

  finalapprove(data: Proposal): void {
    this.drawerData9 = Object.assign({}, data);
    this.drawerTitle9 = this.api.translate.instant('payments.drowername');
    this.drawerVisible9 = true;

  }

  get closeCallback10() {
    return this.drawerClose10.bind(this);
  }

  drawerClose10(): void {
    this.search();
    this.drawerVisible10 = false;
  }

  loanDisbursement(data: Proposal): void {
    this.drawerData10 = Object.assign({}, data);
    this.drawerTitle10 = this.api.translate.instant('basicinfo.m23');
    this.drawerVisible10 = true;

  }

  downloadForm(file, key, name,i) {
    this.dataList[i].loadingRecords2 = true
    this.api.getFile(file)
      .subscribe(data => {
        this.dataList[i].loadingRecords2 = false
        if (data['code'] == "200") {
          const TYPED_ARRAY = new Uint8Array(data['data']['FILE_DATA']['data']);
          const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
            return data + String.fromCharCode(byte);
          }, '');
          let base64String = btoa(STRING_CHAR);

          var linkSource = "data:application/pdf;base64," + base64String;
          const downloadLink = document.createElement("a");
          const fileName = name + '(' + key + ").pdf";

          downloadLink.href = linkSource;
          downloadLink.download = fileName;
          downloadLink.click();

        }
      }, err => {
        this.dataList[i].loadingRecords2 = false
        console.log(err);
      });
  }

  
  downloadForm2(file, key, name,i) {
    this.dataList[i].loadingRecords = true
    this.api.getFile(file)
      .subscribe(data => {
        this.dataList[i].loadingRecords = false
        if (data['code'] == "200") {
          const TYPED_ARRAY = new Uint8Array(data['data']['FILE_DATA']['data']);
          const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
            return data + String.fromCharCode(byte);
          }, '');
          let base64String = btoa(STRING_CHAR);

          var linkSource = "data:application/pdf;base64," + base64String;
          const downloadLink = document.createElement("a");
          const fileName = name + '(' + key + ").pdf";

          downloadLink.href = linkSource;
          downloadLink.download = fileName;
          downloadLink.click();

        }
      }, err => {
        this.dataList[i].loadingRecords = false
        console.log(err);
      });
  }

}
