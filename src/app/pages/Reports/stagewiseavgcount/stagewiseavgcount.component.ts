import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { Proposalstage } from 'src/app/Models/BasicForms/proposalstage';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-stagewiseavgcount',
  templateUrl: './stagewiseavgcount.component.html',
  styleUrls: ['./stagewiseavgcount.component.css'],
  providers: [DatePipe]
})
export class StagewiseavgcountComponent implements OnInit {
  datePipe = new DatePipe("en-US");
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
  columns: string[][] = [['NAME_MR', this.api.translate.instant('branch.label2.Name')], ['TOTAL', 'Total']]
  usertype = 'A';

  //drawer Variables
  filterClass: string = "filter-visible";
  selectedDate: Date[] = []
  userActivityLogData: Useractivitylog = new Useractivitylog();
  value1: string = ""
  value2: string = ""

  dateFormat = 'dd/MM/yyyy';

  loadingProposalStages = false
  proposalStages: Proposalstage[]
  LOAN_TYPE_ID = "AL"
  isLoanSpinning = false
  isSpinning: boolean
  browserLang = ''
  loantypes = []
  constructor(private api: ApiService, private message: NzNotificationService) { }
  ngOnInit() {
    this.selectedDate = [new Date(), new Date()]
    this.changeDate(this.selectedDate)
    this.browserLang = localStorage.getItem('locale');
    if (this.browserLang == 'mr') {
      this.columns = [['NAME_MR', this.api.translate.instant('branch.label2.Name')]]
    } else if (this.browserLang == 'en') {
      this.columns = [['NAME_EN', this.api.translate.instant('branch.label2.Name')]]
    } else {
      this.columns = [['NAME_KN', this.api.translate.instant('branch.label2.Name')]]
    }
    this.search();
    this.logtext = "OPENED - Branch wise stage wise count form KEYWORD[O - Enquiries] ";
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {

        }
        else {

        }
      });

    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "Branch wise stage wise count  - Opened"
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
    this.api.getAllProposalStages(0, 0, 'ID', 'asc', '').subscribe(data => {
      if (data['code'] == "200") {
        this.loantypes = data['data'];
        for (var i = 0; i < this.loantypes.length; i++) {
          if (this.browserLang == 'mr') {
            this.columns.push(['STAGE_' + (i + 1), this.loantypes[i].NAME_MR]);
          } else if (this.browserLang == 'en') {
            this.columns.push(['STAGE_' + (i + 1), this.loantypes[i].NAME_EN]);
          } else {
            this.columns.push(['STAGE_' + (i + 1), this.loantypes[i].NAME_KN]);
          }

          if (i == (this.loantypes.length - 1)) {
            this.columns.push(['TOTAL', this.api.translate.instant('balance-sheet.field27')])
          }
        }
      }

    }, err => {
    });
    this.loadingProposalStages = true;

    this.api.getAllLoanScheme(0, 0, 'ID', 'asc',  ' AND IS_ACTIVE = 1').subscribe(localName => {
      this.proposalStages = localName['data'];
      this.loadingProposalStages = false;
    }, err => {
      ////console.log(err);
      this.loadingProposalStages = false;
    });
  }

  getStagename(id) {
    
    //console.log(id)
    if (id != null && id != 0 && this.proposalStages.length > 0) {
      var dist = this.proposalStages.filter((item) => item.ID == id);
      if (dist[0] == undefined) {
        return "";
      } else {
        return dist[0].NAME_MR;
      }

    } else {
      return "";
    }
  }

  clearFilter() {
    this.LOAN_TYPE_ID = 'AL';
    this.filterQuery = ""
    this.selectedDate = null
    this.filterClass = "filter-invisible";
    this.search(true)
  }

  changeDate(value) {
    this.value1 = this.datePipe.transform(value[0], "yyyy-MM-dd")
    this.value2 = this.datePipe.transform(value[1], "yyyy-MM-dd")
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

      this.logtext = "Filter Applied - Branch wise stage wise count  form" + sort + " " + this.sortKey + " KEYWORD [F - Praposals] ";
      this.api.addLog('A', this.logtext, this.api.emailId)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {

          }
          else {

          }
        });
      this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
      this.userActivityLogData.ACTIVITY_DETAILS = "Branchwisestagewisecount  - Sort on " + sort + " " + this.sortKey
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

    this.logtext = "Filter Applied - Branch wise stage wise count  form " + likeQuery + " KEYWORD [F - Praposals] ";
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {

        }
        else {

        }
      });

    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "Branchwisestagewisecount  - Search For " + this.searchText + " " + likeQuery
    this.userActivityLogData.ACTIVITY_TIME = new Date()
    this.api.createUserActivityLog(this.userActivityLogData)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {

        }
        else {

        }
      });

    this.exportbutton = false
    this.dataList = []
    this.api.getBranchStageProposalAmount(this.value1, this.value2, this.LOAN_TYPE_ID).subscribe(data => {
      this.loadingRecords = false;
      this.isSpinning = false
      if (data['code'] == 200 ) {
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

    this.search()
  }
}






