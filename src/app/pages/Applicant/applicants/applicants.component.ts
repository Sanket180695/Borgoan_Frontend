import { Component, OnInit } from '@angular/core';
import { Applicant } from '../../../Models/Applicant/applicant';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})
export class ApplicantsComponent implements OnInit {

  formTitle = this.api.translate.instant('applicants.formTitle');
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

  columns: string[][] = [['NAME', this.api.translate.instant('homepagebanner.label1.name')], ['MOBILE_NUMBER', this.api.translate.instant('guarantor-info.table_header3')]]

  //drawer Variables
  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: Applicant = new Applicant();
  userActivityLogData: Useractivitylog = new Useractivitylog();
  isVisible = false
  constructor(private api: ApiService, private message: NzNotificationService) { }
  ngOnInit() {
    this.search();

    this.logtext = "OPENED - Applicants form KEYWORD[O - Applicants] ";
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
    this.userActivityLogData.ACTIVITY_DETAILS = "View Applicants - Opened"
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

      this.logtext = "Filter Applied - Applicants form" + sort + " " + this.sortKey + " KEYWORD [F - Applicants] ";
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
      this.userActivityLogData.ACTIVITY_DETAILS = "View Applicant - Sort on " + sort + " " + this.sortKey
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
    }

    this.logtext = "Filter Applied - Applicants form " + likeQuery + " KEYWORD [F - Applicants] ";
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
    this.userActivityLogData.ACTIVITY_DETAILS = "View Applicant - Search For " + this.searchText + " " + likeQuery
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

    this.api.getAllApplicants(this.pageIndex, this.pageSize, this.sortKey, sort, likeQuery).subscribe(data => {
      this.loadingRecords = false;
      this.totalRecords = data['count'];
      this.dataList = data['data'];
    }, err => {
      //console.log(err);
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });


    this.api.getAllApplicants(0, 0, this.sortKey, sort, likeQuery).subscribe(data => {
      //console.log(data)
      this.dataList1 = data['data'];
    }, err => {
      //console.log(err);
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });
  }
  //Drawer Methods
  get closeCallback() {
    return this.drawerClose.bind(this);
  }
  // add(): void {
  //   this.drawerTitle = "Create New Applicant";
  //   this.drawerData = new  Applicant();
  //   this.drawerVisible = true;

  // this.logtext = "ADD - Applicant form KEYWORD [A - Applicant] ";
  // this.api.addLog('A',this.logtext,this.api.emailId)
  //         .subscribe(successCode => {
  //           if (successCode['code'] == "200") {
  //            //console.log(successCode);
  //           }
  //           else {
  // 	//console.log(successCode);
  //           }
  //     });

  // }
  // edit(data:  Applicant): void {

  //   this.drawerTitle = "Update Applicant";
  //   this.drawerData = Object.assign({}, data);
  //   this.drawerVisible = true;

  // this.logtext = "EDIT - Applicant form KEYWORD [E - Applicant] ";
  // this.api.addLog('A',this.logtext,this.api.emailId)
  //         .subscribe(successCode => {
  //           if (successCode['code'] == "200") {
  //            //console.log(successCode);
  //           }
  //           else {
  // 	//console.log(successCode);
  //           }
  //         });
  // }
  drawerClose(): void {
    this.search();
    this.drawerVisible = false;
  }

  viewProposals(data: Applicant) {
    sessionStorage.setItem('applicantId', data.ID.toString())
    this.isVisible = true

  }
}