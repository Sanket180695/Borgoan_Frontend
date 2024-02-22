import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Document } from 'src/app/Models/BasicForms/document';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';

@Component({
  selector: 'app-documentsreport',
  templateUrl: './documentsreport.component.html',
  styleUrls: ['./documentsreport.component.css']
})
export class DocumentsreportComponent implements OnInit {
  formTitle = this.api.translate.instant('documents.formTitle');
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

  columns: string[][] = [
    ['GROUP_NAME', this.api.translate.instant('documents.columns1') + " (" + this.api.translate.instant('common.marathi') + ")"],
    ['GROUP_NAME_EN', this.api.translate.instant('documents.columns1') + " (" + this.api.translate.instant('common.english') + ")"],
    ['GROUP_NAME_KN', this.api.translate.instant('documents.columns1') + " (" + this.api.translate.instant('common.kannada') + ")"],

    ['NAME', this.api.translate.instant('documents.columns2') + " (" + this.api.translate.instant('common.marathi') + ")"],
    ['NAME_EN', this.api.translate.instant('documents.columns2') + " (" + this.api.translate.instant('common.english') + ")"],
    ['NAME_KN', this.api.translate.instant('documents.columns2') + " (" + this.api.translate.instant('common.kannada') + ")"],
    ['MAX_SIZE_ALLOWED', this.api.translate.instant('documents.columns3')],
    ['ALLOWED_TYPES', this.api.translate.instant('documents.columns4')]]


  userActivityLogData: Useractivitylog = new Useractivitylog();
  proposals = [];
  PROPOSAL_ID = 0
  loadingproposal = false
  constructor(private api: ApiService, private message: NzNotificationService) { }
  ngOnInit() {
     
    this.proposals = [];
    this.loadingproposal = true
    this.api.getPraposalNumber(0, 0, '', '', '').subscribe(data => {
      this.loadingproposal = false
      this.proposals = data['data'];
      this.PROPOSAL_ID = this.proposals[0]['ID'];
      this.search()
    }, err => {

    });

    this.logtext = "OPENED - Document Report form KEYWORD[O - Document Report] ";
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
    this.userActivityLogData.ACTIVITY_DETAILS = "Document Report - Opened"
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
  changeProposal(event) {
    this.PROPOSAL_ID = event;
    this.search()
  }
  search(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loadingRecords = true;
    var sort: string;
    try {
      sort = this.sortValue.startsWith("a") ? "asc" : "desc";

      this.logtext = "Filter Applied - Document Report form" + sort + " " + this.sortKey + " KEYWORD [F - Document Report] ";
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
      this.userActivityLogData.ACTIVITY_DETAILS = "Document Report - Sort on " + sort + " " + this.sortKey
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

    this.logtext = "Filter Applied - Document Report form " + likeQuery + " KEYWORD [F - Document Report] ";
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
    this.userActivityLogData.ACTIVITY_DETAILS = "Document Report - Search For " + this.searchText + " " + likeQuery
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

    this.api.getPraposalDocumentList(this.PROPOSAL_ID).subscribe(data => {
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
