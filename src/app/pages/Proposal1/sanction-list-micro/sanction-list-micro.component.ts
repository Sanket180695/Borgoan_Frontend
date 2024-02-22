import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { Loantypes } from 'src/app/Models/BasicForms/loantypes';
import { Proposalstage } from 'src/app/Models/BasicForms/proposalstage';
import { Proposal } from 'src/app/Models/proposal';
import { ApiService } from 'src/app/Service/api.service';
import { PreviewAmulyaFormComponent } from '../preview-amulya-form/preview-amulya-form.component';
import { AmulyaNew } from 'src/app/Models/amulya-new';
import { FormprintComponent } from '../../formprint/formprint.component';

@Component({
  selector: 'app-sanction-list-micro',
  templateUrl: './sanction-list-micro.component.html',
  styleUrls: ['./sanction-list-micro.component.css']
})
export class SanctionListMicroComponent implements OnInit {
  loadingRecords = true;
  pageIndex = 1;
  pageSize = 10;
  totalRecords = 1;
  sortValue: string = "desc";
  sortKey: string = "id";
  isSpinning: boolean
  
  dataList = [];
  dataList1 = [];

  loanData: Loantypes[]
  isLoanSpinning = false

  value1: string = ""
  value2: string = ""

  loadingProposalStages = false
  proposalStages: Proposalstage[]

  filterClass: string = "filter-visible";
  isFilterApplied: string = "default";

  userId = sessionStorage.getItem('userId')
  branchId = sessionStorage.getItem('branchId')

  PROPOSAL_STAGE_ID = "AL"
  LOAN_TYPE_ID = "AL"
  filterQuery: string = "";
  selectedDate: Date[] = []
  BRANCH_ID = '0';
  branchData = [];

  logtext: string = "";
  formTitle = this.api.translate.instant('proposalsall.formTitle');

  userActivityLogData: Useractivitylog = new Useractivitylog();

  searchText: string = "";
  browserLang = ''

  columns: string[][] = [['LOAN_KEY', this.api.translate.instant('proposalsall.columns1')], ['PRAPOSAL_TYPE', this.api.translate.instant('proposalsall.columns2')], ['LOAN_TYPE_NAME', this.api.translate.instant('proposalsall.columns3')], ['LOAN_AMOUNT', this.api.translate.instant('proposalsall.columns4')], ['APPLICANT_NAME', this.api.translate.instant('proposalsall.columns5')], ['BRANCH_NAME', this.api.translate.instant('proposalsall.columns6')], ['MOBILE_NUMBER', this.api.translate.instant('proposalsall.columns7')], ['AGE', this.api.translate.instant('proposalsall.columns10')], ['CREATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns14')], ['LAST_UPDATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns15')]]


  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {

    this.getData();

    this.browserLang = localStorage.getItem('locale');
    this.formTitle = this.api.translate.instant('proposalsall.formTitle');
    if (this.browserLang == 'mr') {
      this.columns = [['LOAN_KEY', this.api.translate.instant('proposalsall.columns1')], ['LOAN_TYPE_NAME', this.api.translate.instant('proposalsall.columns3')], ['LOAN_AMOUNT', this.api.translate.instant('proposalsall.columns4')], ['APPLICANT_NAME', this.api.translate.instant('proposalsall.columns5')], ['BRANCH_NAME', this.api.translate.instant('proposalsall.columns6')], ['MOBILE_NUMBER', this.api.translate.instant('proposalsall.columns7')], ['AGE', this.api.translate.instant('proposalsall.columns10')], ['CREATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns14')], ['LAST_UPDATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns15')]]
    } else if (this.browserLang == 'en') {
      this.columns = [['LOAN_KEY', this.api.translate.instant('proposalsall.columns1')], ['LOAN_TYPE_NAME_EN', this.api.translate.instant('proposalsall.columns3')], ['LOAN_AMOUNT', this.api.translate.instant('proposalsall.columns4')], ['APPLICANT_NAME', this.api.translate.instant('proposalsall.columns5')], ['BRANCH_NAME_EN', this.api.translate.instant('proposalsall.columns6')], ['MOBILE_NUMBER', this.api.translate.instant('proposalsall.columns7')], ['AGE', this.api.translate.instant('proposalsall.columns10')], ['CREATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns14')], ['LAST_UPDATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns15')]]
    } else {
      this.columns = [['LOAN_KEY', this.api.translate.instant('proposalsall.columns1')], ['LOAN_TYPE_NAME_KN', this.api.translate.instant('proposalsall.columns3')], ['LOAN_AMOUNT', this.api.translate.instant('proposalsall.columns4')], ['APPLICANT_NAME', this.api.translate.instant('proposalsall.columns5')], ['BRANCH_NAME_KN', this.api.translate.instant('proposalsall.columns6')], ['MOBILE_NUMBER', this.api.translate.instant('proposalsall.columns7')], ['AGE', this.api.translate.instant('proposalsall.columns10')], ['CREATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns14')], ['LAST_UPDATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns15')]]
    }

    console.log('This is data from AmulyaNew ------------------------------',this.data2)

    this.api.sharedData$.subscribe((data) => {
      if (data) {
        // Update the component's data when shared data is available
        this.data2 = data;
      }
    });
  }


  drawerFormTitle: string;
  drawerFormData: Proposal;
  drawerFormVisible: boolean;
  formname = ''
  @ViewChild(PreviewAmulyaFormComponent) formPreview: PreviewAmulyaFormComponent;
  @Input() data2: AmulyaNew;
  @Input() data: Proposal;

  printPreview(data: Proposal) {
    this.drawerFormTitle = 'Preview Post-facto'
    // this.api.translate.instant('proposalsall.drawert7')
    this.drawerFormVisible = true
    this.formPreview.data = data;
    // this.formname1 = this.drawerFormData['LOAN_KEY']
    this.formPreview.loanAllReflections2();
    this.formPreview.IS_VISIBLE = true
  }


  drawerFormPrintTitle: string = '';
  drawerFormPrintData: Proposal = new Proposal();
  drawerFormPrintVisible: boolean = false;
  @ViewChild(FormprintComponent) formPrint: FormprintComponent;
  type6 = false
  type9 = false
  type10 = false
  type11 = false

  printPdf(data: Proposal, type: number) {

    if (type == 6) {
      this.type6 = true
      this.type9 = false
      this.type10 = false
      this.type11 = false
    }

    if (type == 9) {
      this.type6 = false
      this.type9 = true
      this.type10 = false
      this.type11 = false
    }

    if (type == 10) {
      this.type6 = false
      this.type9 = false
      this.type10 = true
      this.type11 = false
    }

    if (type == 11) {
      this.type6 = false
      this.type9 = false
      this.type10 = false
      this.type11 = true
    }

    this.drawerFormPrintTitle = this.api.translate.instant('proposalsall.drawert7')
    this.drawerFormPrintData = Object.assign({}, data);
    this.drawerFormPrintVisible = true
    this.formname = this.drawerFormPrintData['LOAN_KEY']
    this.formPrint.loadAllExtraInformationMapped(data.ID, data.APPLICANT_ID, type, data)

    this.formPreview.loanAllReflections();
  }

  get closeCallbackPrint() {
    return this.drawerFormClose.bind(this);
  }
  drawerFormClose(): void {
    this.drawerFormVisible = false;
  }

  get closeCallbackFormPrint() {
    return this.drawerFormPrintClose.bind(this);
  }
  drawerFormPrintClose(): void {
    this.drawerFormPrintVisible = false;
  }


  getData(){
    var sort: string;
    var filter = "AND CURRENT_STAGE_ID = 17"

    sort = this.sortValue.startsWith("a") ? "asc" : "desc";

    this.api.getAllPraposals(this.pageIndex, this.pageSize, 'LAST_UPDATED_ON_DATETIME', sort, filter).subscribe(data => {
      if(data['code'] == 200){
        this.loadingRecords = false;
        this.isSpinning = false
        this.totalRecords = data['count'];
        this.dataList = data['data'];
        this.filterClass = "filter-invisible";
        this.isFilterApplied = "primary"
      }
    }, err => {

      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });
  }

  searchSet() {
    document.getElementById('button1').focus();
    this.search(true)
  }

  applyfilter() {
    //////console.log(this.value1)
    //////console.log(this.value2)

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
            //////console.log(successCode);
          }
          else {
            //////console.log(successCode);
          }
        });
      this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
      this.userActivityLogData.ACTIVITY_DETAILS = "ApplicantProposal - Sort on " + sort + " " + this.sortKey
      this.userActivityLogData.ACTIVITY_TIME = new Date()
      this.api.createUserActivityLog(this.userActivityLogData)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            //////console.log(successCode);
          }
          else {
            //////console.log(successCode);
          }
        });

    } catch (error) {
      sort = "";
    }
    var likeQuery = ""
    //////console.log("search text:" + this.searchText);
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
          //////console.log(successCode);
        }
        else {
          //////console.log(successCode);
        }
      });

    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "ApplicantProposal - Search For " + this.searchText + " " + likeQuery
    this.userActivityLogData.ACTIVITY_TIME = new Date()
    this.api.createUserActivityLog(this.userActivityLogData)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          //////console.log(successCode);
        }
        else {
          //////console.log(successCode);
        }
      });

    //////console.log("filter applied")
    //////console.log(filter)

    this.api.getAllPraposals(this.pageIndex, this.pageSize, 'LAST_UPDATED_ON_DATETIME', "asc", filter).subscribe(data => {
      //////console.log("data")
      //////console.log(data)
      this.loadingRecords = false;
      this.isSpinning = false
      this.totalRecords = data['count'];
      this.dataList = data['data'];
      //console.log("dataList in getAllProposal", this.dataList);
      this.filterClass = "filter-invisible";
      this.isFilterApplied = "primary"
    }, err => {
      //////console.log(err);
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });

    this.api.getAllPraposals(0, 0, 'LAST_UPDATED_ON_DATETIME', "asc", filter).subscribe(data => {
      this.dataList1 = data['data'];
    }, err => {
      //////console.log(err);
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });
  }

  // Basic Methods
  sort(sort: { key: string; value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;
    this.search(true);
  }

  changeDate(value) {
    // //////console.log(value[0])
    // //////console.log(value[1])

    // this.value1 = this.datePipe.transform(value[0], "yyyy-MM-dd")
    // this.value2 = this.datePipe.transform(value[1], "yyyy-MM-dd")

    //this.datePipe.transform(this.month,"yyyy-MM")

  }


  loadProposalStage() {
    this.loadingProposalStages = true;
    let filter = "AND STATUS=1"
    this.api.getAllProposalStages(0, 0, 'SEQUENCE_NUMBER', 'asc', filter).subscribe(localName => {
      this.proposalStages = localName['data'];
      this.loadingProposalStages = false;
    }, err => {
      //////console.log(err);
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
      //////console.log("loam tuypd")
      //////console.log(localName)
      this.loanData = localName['data'];
      this.isLoanSpinning = false;
    }, err => {
      //////console.log(err);
      this.isLoanSpinning = false;
    });
  }





}
