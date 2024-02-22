import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { Loantypes } from 'src/app/Models/BasicForms/loantypes';
import { Proposalstage } from 'src/app/Models/BasicForms/proposalstage';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-weakersectorloan',
  templateUrl: './weakersectorloan.component.html',
  styleUrls: ['./weakersectorloan.component.css']
})
export class WeakersectorloanComponent implements OnInit {
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
  columns: string[][] = []

  branchId = sessionStorage.getItem('branchId')
  applicantId = sessionStorage.getItem('applicantId')
  userActivityLogData: Useractivitylog = new Useractivitylog();
  loadingProposalStages = false
  proposalStages: Proposalstage[]
  PROPOSAL_STAGE_ID = "AL"
  browserLang = '';
  loanData: Loantypes[]
  isLoanSpinning = false
  BRANCH_ID = 'AL'
  branches = [];
  loadingBranch = false
  constructor(private api: ApiService, private message: NzNotificationService,) { }

  ngOnInit(): void {
    this.browserLang = localStorage.getItem('locale');

    if (this.browserLang == 'mr') {
      //mobile no, amount, loan type, branch name, current stage, 
      this.columns = [['LOAN_KEY', this.api.translate.instant('proposalsall.columns1')], ['APPLICANT_NAME', this.api.translate.instant('proposalsall.columns5')],  ['MOBILE_NUMBER', this.api.translate.instant('proposalsall.columns7')],['BRANCH_NAME', this.api.translate.instant('proposalsall.columns6')],  ['LOAN_TYPE_NAME', this.api.translate.instant('proposalsall.columns3')],['CURRENT_STAGE_NAME', this.api.translate.instant('proposalsall.th4')], ['LOAN_AMOUNT', this.api.translate.instant('proposalsall.columns4')] ]
    } else if (this.browserLang == 'en') {
      this.columns = [['LOAN_KEY', this.api.translate.instant('proposalsall.columns1')], ['APPLICANT_NAME', this.api.translate.instant('proposalsall.columns5')],  ['MOBILE_NUMBER', this.api.translate.instant('proposalsall.columns7')],['BRANCH_NAME_EN', this.api.translate.instant('proposalsall.columns6')], ['LOAN_TYPE_NAME_EN', this.api.translate.instant('proposalsall.columns3')], ['STAGE_NAME_KN', this.api.translate.instant('proposalsall.th4')], ['LOAN_AMOUNT', this.api.translate.instant('proposalsall.columns4')] ]
    } else {
      this.columns = [['LOAN_KEY', this.api.translate.instant('proposalsall.columns1')], ['APPLICANT_NAME', this.api.translate.instant('proposalsall.columns5')],  ['MOBILE_NUMBER', this.api.translate.instant('proposalsall.columns7')],['BRANCH_NAME_KN', this.api.translate.instant('proposalsall.columns6')],  ['LOAN_TYPE_NAME_KN', this.api.translate.instant('proposalsall.columns3')], ['STAGE_NAME_EN', this.api.translate.instant('proposalsall.th4')], ['LOAN_AMOUNT', this.api.translate.instant('proposalsall.columns4')]]
    }
    this.search();
    this.loadProposalStage()
    this.loadLoanTypes()
    this.logtext = "OPENED - Weaker Sector Loan  KEYWORD[O - Praposals] ";
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
    this.userActivityLogData.ACTIVITY_DETAILS = "WeakerSectorLoan  - Opened"
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
    this.branches = [];
    this.loadingBranch = true
    this.api.getAllBranches(0, 0, '', '', '').subscribe(data => {
      this.branches = data['data'];
      this.loadingBranch = false
    }, err => {
      //console.log(err);
    });
    this.loadingProposalStages = true;
    let filter = "AND STATUS=1"
    this.api.getAllProposalStages(0, 0, 'SEQUENCE_NUMBER', 'asc', filter).subscribe(localName => {
      this.proposalStages = localName['data'];
      this.loadingProposalStages = false;
    }, err => {
      ////console.log(err);
      this.loadingProposalStages = false;
    });
  }


  loadLoanTypes() {
    this.isLoanSpinning = true;
    let filter = "AND STATUS=1"
    this.api.getAllLoanTypes(0, 0, 'ID', 'desc', "").subscribe(localName => {
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
    this.filterQuery = ""
    this.BRANCH_ID = 'AL'
    this.filterClass = "filter-invisible";
    this.search(true)
  }

  // Basic Methods
  sort(sort: { key: string; value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;
    this.search(true);
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

      this.logtext = "Filter Applied - Weaker Sector Loan " + sort + " " + this.sortKey + " KEYWORD [F - Praposals] ";
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
      this.userActivityLogData.ACTIVITY_DETAILS = "WeakerSectorLoan  - Sort on " + sort + " " + this.sortKey
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
    // if (Number(this.branchId) == 0) {
    if (likeQuery)
      filter = this.filterQuery + likeQuery
    else
      filter = this.filterQuery
    // }
    // else {
    //   if (likeQuery)
    //     filter = "AND BRANCH_ID=" + this.branchId + this.filterQuery + likeQuery
    //   else
    //     filter = "AND BRANCH_ID=" + this.branchId + this.filterQuery
    // }



    this.logtext = "Filter Applied - Weaker Sector Loan  " + likeQuery + " KEYWORD [F - Praposals] ";
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
    this.userActivityLogData.ACTIVITY_DETAILS = "WeakerSectorLoan  - Search For " + this.searchText + " " + likeQuery
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


      // filter += " AND BRANCH_ID=" + this.BRANCH_ID
    this.api.getWeakerSectorLoanReport(this.pageIndex, this.pageSize, this.sortKey, sort, filter).subscribe(data => {

      this.loadingRecords = false;
      this.isSpinning = false
      this.totalRecords = data['count'];
      this.dataList = data['data'];
      this.filterClass = "filter-invisible";
      this.isFilterApplied = "primary"
    }, err => {
      ////console.log(err);
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });


  }

  applyfilter() { this.filterQuery ="";
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
    if (this.BRANCH_ID == 'AL') {
      this.filterQuery = this.filterQuery
    }
    else {
      this.filterQuery += " AND BRANCH_ID=" + this.BRANCH_ID
    }
    this.search()
  }

}
