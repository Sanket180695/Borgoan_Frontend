import { Component, OnInit } from '@angular/core';
import { Documentgroup } from 'src/app/Models/BasicForms/documentgroup';
import { ApiService } from 'src/app/Service/api.service';
import { CookieService } from 'ngx-cookie-service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';

@Component({
  selector: 'app-documentgroupsreport',
  templateUrl: './documentgroupsreport.component.html',
  styleUrls: ['./documentgroupsreport.component.css']
})
export class DocumentgroupsreportComponent implements OnInit {

 
  formTitle = this.api.translate.instant('documentgroups.formTitle');
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
  // userId=Number(this.cookie.get('userId'));
  logtext: string = "";

  columns: string[][] = [
  ['PARENT_NAME', this.api.translate.instant('documentgroups.columns1')+ " (" + this.api.translate.instant('common.marathi') + ")"],
  ['PARENT_NAME_EN', this.api.translate.instant('documentgroups.columns1')+ " (" + this.api.translate.instant('common.english') + ")"],
  ['PARENT_NAME_KN', this.api.translate.instant('documentgroups.columns1')+ " (" + this.api.translate.instant('common.kannada') + ")"],
  ['NAME', this.api.translate.instant('documentgroups.columns2') + " (" + this.api.translate.instant('common.marathi') + ")"],
  ['NAME_EN', this.api.translate.instant('documentgroups.columns2') + " (" + this.api.translate.instant('common.english') + ")"],
  ['NAME_KN', this.api.translate.instant('documentgroups.columns2') + " (" + this.api.translate.instant('common.kannada') + ")"],
  ['DOCUMENT_COUNT', 'Documents Count']
  ]

  //drawer Variables
  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: Documentgroup = new Documentgroup();
  userActivityLogData: Useractivitylog = new Useractivitylog();

  constructor(private api: ApiService, private cookie: CookieService, private message: NzNotificationService) { }
  ngOnInit() {
    this.search();

    this.logtext = "OPENED - DocumentGroups form KEYWORD[O - DocumentGroups] ";
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
    this.userActivityLogData.ACTIVITY_DETAILS = "DocumentGroup - Opened"
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
    if (reset) {
      this.pageIndex = 1;
    }
    this.loadingRecords = true;
    var sort: string;
    try {
      sort = this.sortValue.startsWith("a") ? "asc" : "desc";

      this.logtext = "Filter Applied - DocumentGroups form" + sort + " " + this.sortKey + " KEYWORD [F - DocumentGroups] ";
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
      this.userActivityLogData.ACTIVITY_DETAILS = "DocumentGroup - Sort on " + sort + " " + this.sortKey
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

      this.logtext = "Filter Applied - DocumentGroups form " + likeQuery + " KEYWORD [F - DocumentGroups] ";
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
      this.userActivityLogData.ACTIVITY_DETAILS = "DocumentGroup - Search For " + this.searchText + " " + likeQuery
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





    this.api.getAllDocumentGroups(this.pageIndex, this.pageSize, this.sortKey, sort, likeQuery).subscribe(data => {
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

}