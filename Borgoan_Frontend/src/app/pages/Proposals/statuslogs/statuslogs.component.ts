import { Component, OnInit, Input } from '@angular/core';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { Proposal } from 'src/app/Models/proposal';

@Component({
  selector: 'app-statuslogs',
  templateUrl: './statuslogs.component.html',
  styleUrls: ['./statuslogs.component.css']
})
export class StatuslogsComponent implements OnInit {

  @Input() drawerClose: Function;
  @Input() data: Proposal;
  formTitle = this.api.translate.instant('statuslogs.title');
  pageIndex = 1;
  pageSize = 10;
  totalRecords = 1;
  dataList = [];
  dataList1 = [];

  loadingRecords = true;
  sortValue: string = "desc";
  sortKey: string = "id";
  searchText: string = "";
  filterQuery: string = "";
  isFilterApplied: string = "default";
  logtext: string = "";
  drawerData2 = [];

  columns: string[][] = [['NAME_MR', this.api.translate.instant('statuslogs.columns1')], ['COMPLETED_ON_DATETIME', this.api.translate.instant('statuslogs.columns2')], ['REMARKS', this.api.translate.instant('statuslogs.columns3')]]

  //drawer Variables
  drawerVisible: boolean;
  drawerTitle: string;
  drawerVisible1: boolean;
  drawerTitle1: string;
  userActivityLogData: Useractivitylog = new Useractivitylog();
  PROPOSAL_ID: number
  browserLang = 'kn'
  constructor(private api: ApiService, private message: NzNotificationService) { }
  ngOnInit() {
    this.browserLang = localStorage.getItem('locale');
    if (this.browserLang == 'mr') {
      this.columns = [['NAME_MR', this.api.translate.instant('statuslogs.columns1')], ['COMPLETED_ON_DATETIME', this.api.translate.instant('statuslogs.columns2')], ['REMARKS', this.api.translate.instant('statuslogs.columns3')]]
    } else if (this.browserLang == 'en') {
      this.columns = [['NAME_EN', this.api.translate.instant('statuslogs.columns1')], ['COMPLETED_ON_DATETIME', this.api.translate.instant('statuslogs.columns2')], ['REMARKS', this.api.translate.instant('statuslogs.columns3')]]
    } else {
      this.columns = [['NAME_KN', this.api.translate.instant('statuslogs.columns1')], ['COMPLETED_ON_DATETIME', this.api.translate.instant('statuslogs.columns2')], ['REMARKS', this.api.translate.instant('statuslogs.columns3')]]
    }
    this.logtext = "OPENED - LoanTypes form KEYWORD[O - LoanTypes] ";
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
    this.userActivityLogData.ACTIVITY_DETAILS = "LoanTypes - Opened"
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
    var sort: string;
    try {
      sort = this.sortValue.startsWith("a") ? "asc" : "desc";

      this.logtext = "Filter Applied - LoanTypes form" + sort + " " + this.sortKey + " KEYWORD [F - LoanTypes] ";
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
      this.userActivityLogData.ACTIVITY_DETAILS = "LoanTypes - Sort on " + sort + " " + this.sortKey
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
    ////console.log("search text:" + this.searchText);
    if (this.searchText != "") {
      var likeQuery = " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND (";
      this.columns.forEach(column => {
        likeQuery += " " + column[0] + " like '%" + this.searchText + "%' OR";
      });
      likeQuery = likeQuery.substring(0, likeQuery.length - 2) + ")"
      ////console.log("likeQuery" + likeQuery);

      this.logtext = "Filter Applied - LoanTypes form " + likeQuery + " KEYWORD [F - LoanTypes] ";
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
      this.userActivityLogData.ACTIVITY_DETAILS = "StatusLogs - Search For " + this.searchText + " " + likeQuery
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
    else {
      likeQuery = " AND PROPOSAL_ID=" + this.PROPOSAL_ID
    }


    ////console.log(this.PROPOSAL_ID)

    this.api.getAllStatusLogs(this.pageIndex, this.pageSize, 'ID', 'asc', likeQuery).subscribe(data => {
      ////console.log(data)
      this.loadingRecords = false;
      this.totalRecords = data['count'];
      this.dataList = data['data'];
    }, err => {
      ////console.log(err);
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });

    // this.api.getAllLoanTypes(0, 0, this.sortKey, sort, likeQuery).subscribe(data => {
    //  ////console.log(data)
    //   this.dataList1 = data['data'];
    //  }, err => {
    //    ////console.log(err);
    //    if (err['ok'] == false)
    //    this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    //  });
  }

  getProposalSalId(id) {
    ////console.log(id)
    this.PROPOSAL_ID = id
    this.search()
  }
}