import { Component, OnInit } from '@angular/core';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-useractivitlogs',
  templateUrl: './useractivitlogs.component.html',
  styleUrls: ['./useractivitlogs.component.css']
})
export class UseractivitlogsComponent implements OnInit {

  formTitle = this.api.translate.instant('useractivitylogs.formTitle');
  pageIndex = 1;
  pageSize = 10;
  totalRecords = 1;
  dataList = [];
  loadingRecords = false;
  sortValue: string = "desc";
  sortKey: string = "id";
  searchText: string = "";
  filterQuery: string = "";
  isFilterApplied: string = "default";
  logtext: string = "";
  EMAIL_ID: string = ""
  MOBILE_NUMBER: string = ""
  columns: string[][] = [['ACTIVITY_TIME', this.api.translate.instant('useractivitylogs.columns1')], ['ACTIVITY_DETAILS', this.api.translate.instant('useractivitylogs.columns2')]]
  columns1: string[][] = [['ACTIVITY_TIME', this.api.translate.instant('useractivitylogs.columns1')], ['ACTIVITY_DETAILS', this.api.translate.instant('useractivitylogs.columns2')], ['EMAIL_ID', this.api.translate.instant('useractivitylogs.columns3')], ['MOBILE_NUMBER', this.api.translate.instant('useractivitylogs.columns4')]]
  typeofsearch = true
  userActivityLogData: Useractivitylog = new Useractivitylog();

  constructor(private api: ApiService, private message: NzNotificationService) { }
  ngOnInit() {
    //this.search();

    this.logtext = "OPENED - UserActivityLogs form KEYWORD[O - UserActivityLogs] ";
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
    this.userActivityLogData.ACTIVITY_DETAILS = "UserActivityLogs - Opened"
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
  // Basic Methods
  sort(sort: { key: string; value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;
    this.search(true);

  }
  search(reset: boolean = false) {
    this.loadingRecords = true
    if (reset) {
      this.pageIndex = 1;
    }
    this.loadingRecords = true;
    var sort: string;
    try {
      sort = this.sortValue.startsWith("a") ? "asc" : "desc";

      this.logtext = "Filter Applied - UserActivityLogs form" + sort + " " + this.sortKey + " KEYWORD [F - UserActivityLogs] ";
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
      this.userActivityLogData.ACTIVITY_DETAILS = "UserActivityLogs - Sort on " + sort + " " + this.sortKey
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
      var likeQuery = " AND (";
      this.columns1.forEach(column1 => {
        likeQuery += " " + column1[0] + " like '%" + this.searchText + "%' OR";
      });
      likeQuery = likeQuery.substring(0, likeQuery.length - 2) + ")"
      //console.log("likeQuery" + likeQuery);


    }


    var filter = ""
    if (likeQuery)
      filter = this.filterQuery + likeQuery
    else
      filter = this.filterQuery



    this.logtext = "Filter Applied - UserActivityLogs form " + filter + " KEYWORD [F - UserActivityLogs] ";
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
    this.userActivityLogData.ACTIVITY_DETAILS = "UserActivityLogs - Search For " + filter
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
    //console.log(filter)
    this.api.getAllUserActivityLogs(this.pageIndex, this.pageSize, this.sortKey, sort, filter).subscribe(data => {
      //console.log(data)
      this.loadingRecords = false;
      this.totalRecords = data['count'];
      this.dataList = data['data'];
    }, err => {
      //console.log(err);
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });
  }

  isValidEmail(email) {
    const expression = /^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/;
    return expression.test(String(email).toLowerCase())
  }

  isValidMobile(mobile) {
    const expression = /^[6-9]\d{9}$/;
    return expression.test(String("" + mobile).toLowerCase())
  }

  filter() {

    if (this.typeofsearch) {
      if (this.isValidEmail(this.EMAIL_ID)) {
        this.filterQuery = " AND EMAIL_ID= '" + this.EMAIL_ID + "' "
        this.search()

        this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
        this.userActivityLogData.ACTIVITY_DETAILS = "UserActivityLogs - Search For Email Id " + this.EMAIL_ID
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
      else {
        this.message.error(this.api.translate.instant('useractivitylogs.message1'), "");
      }

    }
    else {
      if (this.isValidMobile(this.MOBILE_NUMBER)) {
        this.filterQuery = " AND MOBILE_NUMBER= '" + this.MOBILE_NUMBER + "' "
        this.search()
        this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
        this.userActivityLogData.ACTIVITY_DETAILS = "UserActivityLogs - Search For Mobile Number " + this.MOBILE_NUMBER
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
      else {
        this.message.error(this.api.translate.instant('useractivitylogs.message2'), "");
      }
    }


  }

}