import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-weekersectortargetcompletion',
  templateUrl: './weekersectortargetcompletion.component.html',
  styleUrls: ['./weekersectortargetcompletion.component.css']
})
export class WeekersectortargetcompletionComponent implements OnInit {
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
  datePipe = new DatePipe("en-US");
  branchId = sessionStorage.getItem('branchId')
  applicantId = sessionStorage.getItem('applicantId')
  userActivityLogData: Useractivitylog = new Useractivitylog();
  selectedDate: Date[] = []
  value1: string = ""
  value2: string = ""
  dateFormat = 'dd/MM/yyyy';
  browserLang =""
  constructor(private api: ApiService, private message: NzNotificationService,) { }

  ngOnInit(): void {
    this.selectedDate = [new Date(), new Date()]
    this.changeDate(this.selectedDate)
    this.browserLang = localStorage.getItem('locale');
    this.columns = [
      ['PRORITY_SECTOR_NAME', 'Sector  Name'],
      ['TARGET_AMOUNT', 'Target Amount'],
      ['COMPLETED_AMOUNT', 'Completed Amount'],
      ['COMPLETION_PERCENTAGE', 'Target achived Percentage']
    ]

    this.search();
 
    this.logtext = "OPENED - Weeker sector target completion  KEYWORD[O - Praposals] ";
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
    this.userActivityLogData.ACTIVITY_DETAILS = "Weekersectortargetcompletion  - Opened"
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
  changeDate(value) {
    this.value1 = this.datePipe.transform(value[0], "yyyy-MM-dd")
    this.value2 = this.datePipe.transform(value[1], "yyyy-MM-dd")
  }
  clearFilter() {

    this.filterQuery = ""

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

      this.logtext = "Filter Applied - Weeker sector target completion " + sort + " " + this.sortKey + " KEYWORD [F - Praposals] ";
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
      this.userActivityLogData.ACTIVITY_DETAILS = "Weekersectortargetcompletion  - Sort on " + sort + " " + this.sortKey
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



    this.logtext = "Filter Applied - Weeker sector target completion  " + likeQuery + " KEYWORD [F - Praposals] ";
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
    this.userActivityLogData.ACTIVITY_DETAILS = "Weekersectortargetcompletion  - Search For " + this.searchText + " " + likeQuery
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
    this.api.getWeakerSectorTargetCompletion(this.pageIndex, this.pageSize, this.sortKey, sort, filter).subscribe(data => {

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

  applyfilter() {
    this.filterQuery = "";
    if (this.value1 == "" && this.value2 == "") {
      this.filterQuery = ""
    }
    else {
      this.filterQuery = " AND ( PROPOSAL_DISTRBUTE_DATE BETWEEN '" + this.value1 + ":00:00:00" + "' AND '" + this.value2 + ":23:59:59" + "' ) "
    }
    this.search()
  }

}

