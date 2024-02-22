import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { Proposalstage } from 'src/app/Models/BasicForms/proposalstage';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-proposalstagehistoryreport',
  templateUrl: './proposalstagehistoryreport.component.html',
  styleUrls: ['./proposalstagehistoryreport.component.css']
})
export class ProposalstagehistoryreportComponent implements OnInit {
  
  pageIndex = 1;
  pageSize = 10;
  totalRecords = 1;
  totalRecords2 = 0;
  dataList = [];
  dataList1 = [];
  loadingRecords = false;
  sortValue: string = "desc";
  sortKey: string = "id";
  searchText: string = "";
  filterQuery: string = "";
  isFilterApplied: string = "default";
  logtext: string = "";

  isFiterSpinning = false;
  exportbutton = false;
  columns: string[][] = []
  usertype = 'A';

  //drawer Variables
  filterClass: string = "filter-visible";
  selectedDate: Date[] = []
  userActivityLogData: Useractivitylog = new Useractivitylog();
  value1: string = ""
  value2: string = ""

  dateFormat = 'dd/MM/yyyy';

  loadingproposal = false
  proposalStages: Proposalstage[]
  PROPOSAL_ID = 1
  isLoanSpinning = false
  isSpinning: boolean
  browserLang = ''
  proposals = []
  constructor(private api: ApiService, private message: NzNotificationService) { }
  ngOnInit() {
   
    this.browserLang = localStorage.getItem('locale');
    if (this.browserLang == 'mr') {
  
      this.columns = [['CURRENT_STAGE_NAME', this.api.translate.instant('branch.label2.Name')],['STARTED_DATE', 'Started Date'],['COMPLETED_DATE', 'Completed Date'],['TOTAL_DAYS', 'Total Days ']]
    } else if (this.browserLang == 'en') {
      this.columns = [['CURRENT_STAGE_NAME_EN', this.api.translate.instant('branch.label2.Name')],['STARTED_DATE', 'Started Date'],['COMPLETED_DATE', 'Completed Date'],['TOTAL_DAYS', 'Total Days ']]
    } else {
      this.columns = [['CURRENT_STAGE_NAME_KN', this.api.translate.instant('branch.label2.Name')],['STARTED_DATE', 'Started Date'],['COMPLETED_DATE', 'Completed Date'],['TOTAL_DAYS', 'Total Days ']]
    }
    this.search();
    this.logtext = "OPENED - Proposal Stage History form KEYWORD[O - Enquiries] ";
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {

        }
        else {

        }
      });

    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "Proposal Stage History  - Opened"
    this.userActivityLogData.ACTIVITY_TIME = new Date()
    this.api.createUserActivityLog(this.userActivityLogData)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {

        }
        else {

        }
      });
    this.loadProposalStage()
  }

  showFilter() {
    if (this.filterClass === "filter-visible")
      this.filterClass = "filter-invisible";
    else
      this.filterClass = "filter-visible";
  }
  loadProposalStage() {

    this.proposals = [];
    this.loadingproposal = true
    this.api.getPraposalNumber(0, 0, '', '', '').subscribe(data => {
      this.loadingproposal = false
      this.proposals = data['data'];
    }, err => {
      
    });
  }



  clearFilter() {
    this.PROPOSAL_ID = 1
    this.filterQuery = ""
    // this.selectedDate = null
    this.filterClass = "filter-invisible";
    this.search(true)
  }

  changeDate(value) {
    // this.value1 = this.datePipe.transform(value[0], "yyyy-MM-dd")
    // this.value2 = this.datePipe.transform(value[1], "yyyy-MM-dd")
  }

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

      this.logtext = "Filter Applied - Proposal Stage History  form" + sort + " " + this.sortKey + " KEYWORD [F - Praposals] ";
      this.api.addLog('A', this.logtext, this.api.emailId)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {

          }
          else {

          }
        });
      this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
      this.userActivityLogData.ACTIVITY_DETAILS = "ProposalStageHistory  - Sort on " + sort + " " + this.sortKey
      this.userActivityLogData.ACTIVITY_TIME = new Date()
      this.api.createUserActivityLog(this.userActivityLogData)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {

          }
          else {

          }
        });

    } catch (error) {
      sort = "";
    }
    var likeQuery = ""
    //console.log("search text:" + this.searchText);
    if (this.searchText != "") {
      likeQuery = " AND (";

      this.columns.forEach(column => {
        likeQuery += " " + column[0] + " like '%" + this.searchText + "%' OR";
      });
      likeQuery = likeQuery.substring(0, likeQuery.length - 2) + ")"
    }


    var filter = ""

    if (likeQuery)
      filter = this.filterQuery + likeQuery
    else
      filter = this.filterQuery

    this.logtext = "Filter Applied - Proposal Stage History  form " + likeQuery + " KEYWORD [F - Praposals] ";
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {

        }
        else {

        }
      });

    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "ProposalStageHistory  - Search For " + this.searchText + " " + likeQuery
    this.userActivityLogData.ACTIVITY_TIME = new Date()
    this.api.createUserActivityLog(this.userActivityLogData)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {

        }
        else {

        }
      });


    this.dataList = []
    this.api.getPraposalStageHistory(this.PROPOSAL_ID).subscribe(data => {
      this.loadingRecords = false;
      this.isSpinning = false
      if (data['code'] == 200) {
        this.totalRecords = data['count'];
        this.dataList = data['data'][0];
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
   
    this.search()
  }
  changeProposal(event) {
    this.PROPOSAL_ID = event;
    this.search()
  }
}






