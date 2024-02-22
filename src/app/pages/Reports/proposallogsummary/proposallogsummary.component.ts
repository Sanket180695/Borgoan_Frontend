import { Component, OnInit, ViewChild } from '@angular/core';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { Branchmaster } from 'src/app/Models/BasicForms/branchmaster';
import { Payments } from 'src/app/Models/Payments/payments';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-proposallogsummary',
  templateUrl: './proposallogsummary.component.html',
  styleUrls: ['./proposallogsummary.component.css'],
  providers: [DatePipe]
})
export class ProposallogsummaryComponent implements OnInit {
  formTitle = "User Summary";
  pageIndex = 1;
  pageSize = 10;
  totalRecords = 1;
  dataList = [];
  loadingRecords = true;
  sortValue: string = "desc";
  sortKey: string = "id";
  searchText: string = "";
  filterQuery: string = "";
  isFilterApplied: string = "default";
  logtext: string = "";
  dataList1 = []
  columns: string[][] = []
  dateFormat = 'dd/MM/yyyy';
  selectedDate: Date[] = []
  value1: string = ""
  value2: string = ""
  //drawer Variables
  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: Payments = new Payments();
  isVisible = false
  filterClass: string = "filter-visible";
  initFilter = true;
  userActivityLogData: Useractivitylog = new Useractivitylog();
  browserLang = ''
  branchId = sessionStorage.getItem("branchId")
  loadingbranches = false
  loadingloantypes = false
  // LOAN_TYPE_ID = 'AL'
  // STAGE_ID= []
  // USER_ID = 'AL'
  // branches = []
  // loantypes = []
  isSpinning: boolean
  users =[]
  constructor(private datePipe: DatePipe, private api: ApiService, private message: NzNotificationService) { }
  ngOnInit() {
    this.browserLang = localStorage.getItem('locale');

    if (this.browserLang == 'mr') {
  
      this.columns = [['USER_NAME', 'User Name'],['STATUS', 'Status'],['ACIIVITY_COUNT', 'User Activity Count'],['LAST_LOGIN', 'Last Login DateTime'],['BRANCH_NAME', 'Branch Name'],['ROLE_NAME', 'Role Name'],['PROPOSAL_CREATED_COUNT', 'Proposal Created Count']]
    } else if (this.browserLang == 'en') {
      this.columns = [['USER_NAME', 'User Name'],['STATUS', 'Status'],['ACIIVITY_COUNT', 'User Activity Count'],['LAST_LOGIN', 'Last Login DateTime'],['BRANCH_NAME', 'Branch Name'],['ROLE_NAME', 'Role Name'],['PROPOSAL_CREATED_COUNT', 'Proposal Created Count']]
    } else {
      this.columns = [['USER_NAME', 'User Name'],['STATUS', 'Status'],['ACIIVITY_COUNT', 'User Activity Count'],['LAST_LOGIN', 'Last Login DateTime'],['BRANCH_NAME', 'Branch Name'],['ROLE_NAME', 'Role Name'],['PROPOSAL_CREATED_COUNT', 'Proposal Created Count']]
    }
    this.search();

    this.logtext = "OPENED - User Summary form KEYWORD[O - User Summary] ";
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          //console.log(successCode);
        }
        else {
          //console.log(successCode);
        }
      });

    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "User Summary - Opened"
    this.userActivityLogData.ACTIVITY_TIME = new Date()
    this.api.createUserActivityLog(this.userActivityLogData)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          //console.log(successCode);
        }
        else {
          //console.log(successCode);
        }
      });

    // this.loadingbranches = true;

    // this.api.getAllProposalStages(0, 0, 'ID', 'asc', '').subscribe(localName => {
    //   this.branches = localName['data'];
    //   this.loadingbranches = false;
    // }, err => {
    //   ////console.log(err);
    //   this.loadingbranches = false;
    // });
  
    // this.api.getAllUsers(0, 0, 'id', 'asc', '').subscribe(data => {
    //   this.users = data['data'];
    // }, err => { });

  }
  showFilter() {
    if (this.filterClass === "filter-visible")
      this.filterClass = "filter-invisible";
    else
      this.filterClass = "filter-visible";
  }

  clearFilter() {
    // this.USER_ID='AL'
    // this.LOAN_TYPE_ID='AL'
    // this.STAGE_ID= []
    this.filterQuery = ""
    this.selectedDate = null
    this.filterClass = "filter-invisible";
    this.search(true)
  }

  changeDate(value) {
    this.value1 = this.datePipe.transform(value[0], "yyyy-MM-dd")
    this.value2 = this.datePipe.transform(value[1], "yyyy-MM-dd")
  }
  applyfilter() {
    ////console.log(this.value1)
    ////console.log(this.value2)

    if (this.value1 == "" && this.value2 == "") {
      this.filterQuery = ""
    }
    else {
      this.filterQuery = " AND ( LOG_DATETIME BETWEEN '" + this.value1 + ":00:00:00" + "' AND '" + this.value2 + ":23:59:59" + "' ) "
    }

    // if (this.STAGE_ID == []) {
    //   this.filterQuery = this.filterQuery
    // }
    // else {
    //   var f='';
    //   for(var i=0;i<this.STAGE_ID.length;i++){
    //     if(i==0) {
    //       f += " AND OLD_STAGE_ID=" + this.STAGE_ID[i]
    //     } else {
    //       f += " OR OLD_STAGE_ID=" + this.STAGE_ID[i]
    //     }
        
    //   }
    //   this.filterQuery += f;
    // }
    

    // if (this.LOAN_TYPE_ID == 'AL') {
    //   this.filterQuery = this.filterQuery
    // }
    // else {
    //   this.filterQuery += " AND LOAN_TYPE_ID=" + this.LOAN_TYPE_ID
    // }
    // if (this.USER_ID == 'AL') {
    //   this.filterQuery = this.filterQuery
    // }
    // else {
    //   this.filterQuery += " AND USER_ID=" + this.USER_ID
    // }

    this.search()
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

      this.logtext = "Filter Applied - User Summary form" + sort + " " + this.sortKey + " KEYWORD [F - User Summary] ";
      this.api.addLog('A', this.logtext, this.api.emailId)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            //console.log(successCode);
          }
          else {
            //console.log(successCode);
          }
        });

      this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
      this.userActivityLogData.ACTIVITY_DETAILS = "User Summary - Sort on " + sort + " " + this.sortKey
      this.userActivityLogData.ACTIVITY_TIME = new Date()
      this.api.createUserActivityLog(this.userActivityLogData)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            //console.log(successCode);
          }
          else {
            //console.log(successCode);
          }
        });

    } catch (error) {
      sort = "";
    }
    //console.log("search text:" + this.searchText);
    if (this.searchText != "") {
      var likeQuery = " AND";
      this.columns.forEach(column => {
        likeQuery += " " + column[0] + " like '%" + this.searchText + "%' OR";
      });
      likeQuery = likeQuery.substring(0, likeQuery.length - 2)
      //console.log("likeQuery" + likeQuery);

      this.logtext = "Filter Applied - User Summary form " + likeQuery + " KEYWORD [F - User Summary] ";
      this.api.addLog('A', this.logtext, this.api.emailId)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            //console.log(successCode);
          }
          else {
            //console.log(successCode);
          }
        });

      this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
      this.userActivityLogData.ACTIVITY_DETAILS = "User Summary - Search For " + this.searchText + " " + likeQuery
      this.userActivityLogData.ACTIVITY_TIME = new Date()
      this.api.createUserActivityLog(this.userActivityLogData)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            //console.log(successCode);
          }
          else {
            //console.log(successCode);
          }
        });
    }

    var filter = ""

    if (likeQuery)
      filter = this.filterQuery + likeQuery
    else
      filter = this.filterQuery
    // var filter = ""
    // if (likeQuery)
    //   filter = " AND BRANCH_ID=" + this.branchId + likeQuery
    // else
    //   filter = " AND BRANCH_ID=" + this.branchId

    // //console.log(filter)

    this.api.getAllEnquiaryLogInformation(this.pageIndex, this.pageSize, this.sortKey, sort, filter).subscribe(data => {
      //console.log(data)
      this.loadingRecords = false;
      this.totalRecords = data['count'];
      this.dataList = data['data'];
      this.filterClass = "filter-invisible";
      this.isFilterApplied = "primary"
    }, err => {
      //console.log(err);
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('payments.messageservernotfound'), "");
    });


  }

}
