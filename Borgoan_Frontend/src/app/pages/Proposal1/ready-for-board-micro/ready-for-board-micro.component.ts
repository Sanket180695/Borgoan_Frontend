import { Component, OnInit, ViewChild } from '@angular/core';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { Loantypes } from 'src/app/Models/BasicForms/loantypes';
import { Proposalstage } from 'src/app/Models/BasicForms/proposalstage';
import { AmulyaNew } from 'src/app/Models/amulya-new';
import { Proposal } from 'src/app/Models/proposal';
import { PreviewAmulyaFormComponent } from '../preview-amulya-form/preview-amulya-form.component';
import { ApiService } from 'src/app/Service/api.service';
import { DatePipe } from '@angular/common';
import { NzNotificationService } from 'ng-zorro-antd';
import { FormprintComponent } from '../../formprint/formprint.component';
import { createAutoCorrectedDatePipe } from 'text-mask-addons';

@Component({
  selector: 'app-ready-for-board-micro',
  templateUrl: './ready-for-board-micro.component.html',
  styleUrls: ['./ready-for-board-micro.component.css'],
  providers: [DatePipe]
})
export class ReadyForBoardMicroComponent implements OnInit {
  data: Proposal = new Proposal();
  pData: Proposal[] = [];
  data2: AmulyaNew = new AmulyaNew();
  @ViewChild(PreviewAmulyaFormComponent) formPreview: PreviewAmulyaFormComponent;

  isButtonSpinning = false
  REMARKS: string = ""

  loadingRecords = true;
  pageIndex = 1;
  pageSize = 10;
  totalRecords = 1;
  sortValue: string = "desc";
  sortKey: string = "id";
  isSpinning: boolean

  dateFormat = 'dd/MM/yyyy';
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')
  pipe = new DatePipe('en-US');

  dataList = [];
  dataList1 = [];

  amulyaDataList = [];
  reconsidered = [];

  loanData: Loantypes[]
  isLoanSpinning = false

  value1: string = ""

  loadingProposalStages = false
  proposalStages: Proposalstage[]

  filterClass: string = "filter-visible";
  isFilterApplied: string = "default";

  userId = sessionStorage.getItem('userId')
  branchId = sessionStorage.getItem('branchId')
  roleId = sessionStorage.getItem("roleId")

  PROPOSAL_STAGE_ID = "AL"
  LOAN_TYPE_ID = "AL"
  filterQuery: string = "";
  selectedDate1: any;
  BRANCH_ID = '0';
  branchData1 = [];

  logtext: string = "";
  formTitle = this.api.translate.instant('proposalsall.formTitle');

  userActivityLogData: Useractivitylog = new Useractivitylog();

  searchText: string = "";
  browserLang = ''

  columns: string[][] = [['LOAN_KEY', this.api.translate.instant('proposalsall.columns1')], ['PRAPOSAL_TYPE', this.api.translate.instant('proposalsall.columns2')], ['LOAN_TYPE_NAME', this.api.translate.instant('proposalsall.columns3')], ['LOAN_AMOUNT', this.api.translate.instant('proposalsall.columns4')], ['APPLICANT_NAME', this.api.translate.instant('proposalsall.columns5')], ['BRANCH_NAME', this.api.translate.instant('proposalsall.columns6')], ['MOBILE_NUMBER', this.api.translate.instant('proposalsall.columns7')], ['AGE', this.api.translate.instant('proposalsall.columns10')], ['CREATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns14')], ['LAST_UPDATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns15')]]


  optionList = [

    {
      label: 'Vijay Khadakbhavi (General Manager)',
      value: 'A',
    }

  ];

  drawerFormTitle: string;
  drawerFormData: Proposal;
  drawerFormVisible: boolean;

  formname = ''

  constructor(private api: ApiService, private datePipe: DatePipe, private message: NzNotificationService) { }

  ngOnInit(): void {
    this.browserLang = localStorage.getItem('locale');
    this.formTitle = this.api.translate.instant('proposalsall.formTitle');
    if (this.browserLang == 'mr') {
      this.columns = [['LOAN_KEY', this.api.translate.instant('proposalsall.columns1')], ['LOAN_TYPE_NAME', this.api.translate.instant('proposalsall.columns3')], ['LOAN_AMOUNT', this.api.translate.instant('proposalsall.columns4')], ['APPLICANT_NAME', this.api.translate.instant('proposalsall.columns5')], ['BRANCH_NAME', this.api.translate.instant('proposalsall.columns6')], ['MOBILE_NUMBER', this.api.translate.instant('proposalsall.columns7')], ['AGE', this.api.translate.instant('proposalsall.columns10')], ['CREATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns14')], ['LAST_UPDATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns15')]]
    } else if (this.browserLang == 'en') {
      this.columns = [['LOAN_KEY', this.api.translate.instant('proposalsall.columns1')], ['LOAN_TYPE_NAME_EN', this.api.translate.instant('proposalsall.columns3')], ['LOAN_AMOUNT', this.api.translate.instant('proposalsall.columns4')], ['APPLICANT_NAME', this.api.translate.instant('proposalsall.columns5')], ['BRANCH_NAME_EN', this.api.translate.instant('proposalsall.columns6')], ['MOBILE_NUMBER', this.api.translate.instant('proposalsall.columns7')], ['AGE', this.api.translate.instant('proposalsall.columns10')], ['CREATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns14')], ['LAST_UPDATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns15')]]
    } else {
      this.columns = [['LOAN_KEY', this.api.translate.instant('proposalsall.columns1')], ['LOAN_TYPE_NAME_KN', this.api.translate.instant('proposalsall.columns3')], ['LOAN_AMOUNT', this.api.translate.instant('proposalsall.columns4')], ['APPLICANT_NAME', this.api.translate.instant('proposalsall.columns5')], ['BRANCH_NAME_KN', this.api.translate.instant('proposalsall.columns6')], ['MOBILE_NUMBER', this.api.translate.instant('proposalsall.columns7')], ['AGE', this.api.translate.instant('proposalsall.columns10')], ['CREATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns14')], ['LAST_UPDATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns15')]]
    }

    this.data.IS_RECONSIDERED = false
    var sort = this.sortValue.startsWith("a") ? "asc" : "desc";
    var filter = "AND CURRENT_STAGE_ID = 16 AND IS_RECONSIDERED = 0"
    // this.api.getAllPraposals(0, 0, 'LAST_UPDATED_ON_DATETIME', sort, filter).subscribe(data => {
    //   this.dataList = data['data'];
    // }, err => {
    //   //////console.log(err);
    //   if (err['ok'] == false)
    //     this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    // });

    // this.search();
    this.loadProposalStage();
    this.loadLoanTypes();
    this.getData();
  }
  shareDataToService(data: any): void {
    // Set the shared data in the service
    this.api.setSharedData(data);
  }

  save() {
    this.isButtonSpinning = true;
    this.data2.USER_ID = Number(sessionStorage.getItem('userId'))

    this.data2.SELECTED_DATE = this.selectedDate1

    console.log('It is post sanction amulya loan --------------------------------------------------', this.data2)
    if (this.data2.ID) {
      this.api.updateNewAmulya(this.data2).subscribe((res) => {
        if (res['code'] == 200) {
          this.getData();
          this.api.commonData = this.data2;
          this.message.success("Amulya Information Updated successfully", '');
          this.isButtonSpinning = false;
        }
        else {
          this.message.error("Failed Update  to Amulya Loan-Specific Information", '');
          this.isButtonSpinning = false;
        }

      })
    }
    else {
      this.api.createNewAmulya(this.data2).subscribe((res) => {
        if (res['code'] == 200) {
          this.getData();
          this.api.commonData = this.data2;
          this.message.success("Amulya  Information Added successfully", '');
          this.isButtonSpinning = false;
        }
        else {
          this.message.error("Failed Add  to Amulya Information", '');
          this.isButtonSpinning = false;
        }

      });
    }


    this.api.setSharedData(this.data2);

  }

  boardApprovalData: any;

  emitData2ToBoardApproval() {
    this.boardApprovalData.emit(this.data2);
  }

  getData() {
    this.api.getNewAmulya().subscribe(data => {
      this.loadingRecords = false;
      this.totalRecords = data['count'];

      if (data['data'].length > 0) {
        // this.data2.SELECTED_DATE = this.selectedDate1
        this.data2 = data['data'][0]
      }
      else {
        this.data2 = new AmulyaNew()
      }

    }, err => {
      console.log(err);
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
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
    this.selectedDate1 != undefined;
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

    this.selectedDate1 = value;

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
        filter = "AND CURRENT_STAGE_ID = 16" + this.filterQuery + likeQuery
      else
        filter = "AND CURRENT_STAGE_ID = 16" + this.filterQuery
    }
    else {
      if (likeQuery)
        filter = "AND CURRENT_STAGE_ID = 16 AND BRANCH_ID=" + this.branchId + this.filterQuery + likeQuery
      else
        filter = "AND CURRENT_STAGE_ID = 16 AND BRANCH_ID=" + this.branchId + this.filterQuery
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

    this.api.getAllPraposals(this.pageIndex, this.pageSize, 'LAST_UPDATED_ON_DATETIME', sort, filter).subscribe(data => {
      //////console.log("data")
      //////console.log(data)
      this.loadingRecords = false;
      this.isSpinning = false
      this.totalRecords = data['count'];
      this.dataList = data['data'];
      this.reconsidered = [];
      //console.log("dataList in getAllProposal", this.dataList);
      this.filterClass = "filter-invisible";
      this.isFilterApplied = "primary"
    }, err => {
      //////console.log(err);
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });

    this.api.getAllPraposals(0, 0, 'LAST_UPDATED_ON_DATETIME', sort, filter).subscribe(data => {
      this.dataList1 = data['data'];
    }, err => {
      //////console.log(err);
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });
  }

  applyfilter() {
    //////console.log(this.value1)
    //////console.log(this.value2)

    if (this.selectedDate1 == undefined) {
      this.filterQuery = "";
    } else {
      const selectedDate1String = this.datePipe.transform(this.selectedDate1, "yyyy-MM-dd");
      this.filterQuery = " AND (CREATED_ON_DATETIME <= '" + selectedDate1String + " 23:59:59')";
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
    else if(this.LOAN_TYPE_ID == '10'){
      this.filterQuery += " AND (LOAN_TYPE_ID = 10 OR LOAN_TYPE_ID = 9 OR LOAN_TYPE_ID = 11)"
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
            this.branchData1 = successCode['data'];
          }
        });
    }
  }

  loadLoanTypes() {
    this.isLoanSpinning = true;
    let filter = "AND ID IN (8,10,17)"
    this.api.getAllLoanScheme(0, 0, 'ID', 'desc', filter).subscribe(localName => {
      //////console.log("loam tuypd")
      //////console.log(localName)
      this.loanData = localName['data'];
      this.isLoanSpinning = false;
    }, err => {
      //////console.log(err);
      this.isLoanSpinning = false;
    });
  }

  reconsider(proposalData: Proposal) {
    proposalData.IS_RECONSIDERED = true;
    proposalData.PENDING_DATE = new Date();
    this.api.updateProposal(proposalData).subscribe((res) => {
      // Handle the API response as needed
      if (res['code'] === 200) {
        // Proposal updated successfully
        // Remove the proposal from the current component's table
        const index = this.dataList.indexOf(proposalData);
        if (index !== -1) {
          this.dataList.splice(index, 1);
        }

        this.reconsidered.push(proposalData.ID)
      } else {
        // Handle the API update error
      }
    });

    // Update the proposal's reconsidered status
    // this.api.addReconsideredProposal(proposalData.ID);
  }


  // printPreview(data: Proposal) {
  //   this.drawerFormTitle = 'Preview Post-facto'
  //   // this.api.translate.instant('proposalsall.drawert7')
  //   this.drawerFormData = Object.assign({}, data);
  //   this.drawerFormVisible = true
  //   this.formname = this.drawerFormData['LOAN_KEY']
  //   this.formPreview.loanAllReflections();
  // }


  drawerFormPrintTitle: string = '';
  drawerFormPrintData: Proposal = new Proposal();
  drawerFormPrintVisible: boolean = false;
  @ViewChild(FormprintComponent) formPrint: FormprintComponent;
  type6 = false
  type9 = false
  type10 = false
  type11 = false
  type12 = false
  type13 = false

  printPdf(data: Proposal, type: number) {

    if (type == 6) {
      this.type6 = true
      this.type9 = false
      this.type10 = false
      this.type11 = false
      this.type12 = false
      this.type13 = false
    }

    if (type == 9) {
      this.type6 = false
      this.type9 = true
      this.type10 = false
      this.type11 = false
      this.type12 = false
      this.type13 = false
    }

    if (type == 10) {
      this.type6 = false
      this.type9 = false
      this.type10 = true
      this.type11 = false
      this.type12 = false
      this.type13 = false
    }

    if (type == 11) {
      this.type6 = false
      this.type9 = false
      this.type10 = false
      this.type11 = true
      this.type12 = false
      this.type13 = false
    }

    if (type == 12) {
      this.type6 = false
      this.type9 = false
      this.type10 = false
      this.type11 = false
      this.type12 = true
      this.type13 = false
    }
    if (type == 13) {
      this.type6 = false
      this.type9 = false
      this.type10 = false
      this.type11 = false
      this.type12 = false
      this.type13 = true
    }


    this.drawerFormPrintTitle = this.api.translate.instant('proposalsall.drawert7')
    this.drawerFormPrintData = Object.assign({}, data);
    this.drawerFormPrintVisible = true
    this.formname = this.drawerFormPrintData['LOAN_KEY']
    this.formPrint.loadAllExtraInformationMapped(data.ID, data.APPLICANT_ID, type, data)
  }

  get closeCallbackFormPrint() {
    return this.drawerFormPrintClose.bind(this);
  }
  drawerFormPrintClose(): void {
    this.drawerFormPrintVisible = false;
  }



  preview(data: Proposal) {

    if (this.data2.RESOLUTION_NO != 0 && this.data2.RESOLUTION_NO != undefined
      && this.data2.COMMITTEE_NO != 0 && this.data2.COMMITTEE_NO != undefined
      && this.data2.BOARD_MEETING_DATE != '' && this.data2.BOARD_MEETING_DATE != undefined
      && this.data2.OUTWARD_NUMBER != '' && this.data2.OUTWARD_NUMBER != undefined
      && this.data2.OUTWARD_DATE != '' && this.data2.OUTWARD_DATE != undefined) {

      this.drawerFormTitle = ''
      // this.api.translate.instant('proposalsall.drawert7')
      this.drawerFormData = Object.assign({}, data);
      this.drawerFormVisible = true
      this.formname = this.drawerFormData['LOAN_KEY']

      this.formPreview.IS_VISIBLE = true
      this.formPreview.reconsideredlist = this.reconsidered


      this.isButtonSpinning = true;

      data.CURRENT_STAGE_ID = 16
      // this.data.IS_PENDING = true
      this.api.updateProposal(data)
        .subscribe(successCode => {
          // ////console.log(successCode)

          if (successCode['code'] == "200") {
            this.data = data['data']
            this.isButtonSpinning = false
          }
          else {
            this.isButtonSpinning = false;
            // this.message.error("Failed To Send Proposals To Loan Sanctioned Stage", '');
          }
        })



      this.save()
      // this.search();
      if (this.LOAN_TYPE_ID == '8') {
        this.formPreview.getGoldLoan();
        this.formPreview.amulyaLoanList = []
        this.formPreview.depositLoanList = []
        setTimeout(() => {
          this.formPreview.processBranch();
        }, 6000);
      }
      if (this.LOAN_TYPE_ID == '9' || this.LOAN_TYPE_ID == '10' || this.LOAN_TYPE_ID == '11') {
        this.formPreview.getDepositLoan();
        this.formPreview.goldLoanList = []
        this.formPreview.amulyaLoanList = []
        setTimeout(() => {
          this.formPreview.processBranch();
        }, 6000);
      }
      if (this.LOAN_TYPE_ID == '17') {
        this.formPreview.getAmulyaLoan();
        this.formPreview.goldLoanList = []
        this.formPreview.depositLoanList = []
        setTimeout(() => {
          this.formPreview.processBranch();
        }, 6000);
      }
      
      if (this.LOAN_TYPE_ID == 'AL') {
        this.formPreview.loanAllReflections();
      }

    }
    else {
      this.message.error(this.api.translate.instant('Kindly Fill Up All Input Fields'), "");
    }

  }

  get closeCallbackPrint() {
    return this.drawerFormClose.bind(this);
  }

  drawerFormClose(): void {
    this.drawerFormVisible = false;
    if (this.BRANCH_ID != '0' || this.LOAN_TYPE_ID != 'AL') {
      this.getData();
      this.search();
    }

  }

  filterClose() {
    this.BRANCH_ID == '0'
    this.LOAN_TYPE_ID == 'AL'
  }

  get closeCallbackFilter() {
    return this.filterClose.bind(this);
  }



}
