import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Document } from 'src/app/Models/BasicForms/document';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';

@Component({
  selector: 'app-proposaldocuments',
  templateUrl: './proposaldocuments.component.html',
  styleUrls: ['./proposaldocuments.component.css']
})
export class ProposaldocumentsComponent implements OnInit {


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
    ['DOCUMENT_TITLE', this.api.translate.instant('documents.columns2') + " (" + this.api.translate.instant('common.marathi') + ")"],
    ['NAME_EN', this.api.translate.instant('documents.columns2') + " (" + this.api.translate.instant('common.english') + ")"],
    ['NAME_KN', this.api.translate.instant('documents.columns2') + " (" + this.api.translate.instant('common.kannada') + ")"],
    ['IS_COMPLUSORY', 'Is Compulsary'],
    ['IS_UPLOADED', 'Is Uploaded'],
    ['IS_VERIFIED', 'Is Verified'],
    ['REMARK', 'Remark'],
    ['UPLOADED_DATETIME', 'Upload datetime '],
    ['VERIFICATION_DATETIME', 'Verified datetime']
  ]
  proposals = [];
  PROPOSAL_ID = 'AL'
  loadingproposal = false
  //drawer Variables
  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: Document = new Document();
  userActivityLogData: Useractivitylog = new Useractivitylog();

  constructor(private api: ApiService, private message: NzNotificationService) { }
  ngOnInit() {
    this.search();
    this.proposals = [];
    this.loadingproposal = true
    this.api.getPraposalNumber(0, 0, '', '', '').subscribe(data => {
      this.loadingproposal = false
      this.proposals = data['data'];
    }, err => {

    });
    this.logtext = "OPENED - Proposal Documents form KEYWORD[O - Proposal Documents] ";
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
    this.userActivityLogData.ACTIVITY_DETAILS = "Proposal Documents - Opened"
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

      this.logtext = "Filter Applied - Proposal Documents form" + sort + " " + this.sortKey + " KEYWORD [F - Proposal Documents] ";
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
      this.userActivityLogData.ACTIVITY_DETAILS = "Proposal Documents - Sort on " + sort + " " + this.sortKey
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
    var likeQuery = ""
    if (this.searchText != "") {
       likeQuery = " AND";
      this.columns.forEach(column => {
        likeQuery += " " + column[0] + " like '%" + this.searchText + "%' OR";
      });
      likeQuery = likeQuery.substring(0, likeQuery.length - 2)
      //console.log("likeQuery" + likeQuery);
    }

    this.logtext = "Filter Applied - Proposal Documents form " + likeQuery + " KEYWORD [F - Proposal Documents] ";
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
    this.userActivityLogData.ACTIVITY_DETAILS = "Proposal Documents - Search For " + this.searchText + " " + likeQuery
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

    if (this.PROPOSAL_ID == 'AL') {
      likeQuery = likeQuery
    }
    else {
      likeQuery += " AND PROPOSAL_ID=" + this.PROPOSAL_ID
    }
    this.api.getAllProposalDocuments(this.pageIndex, this.pageSize, this.sortKey, sort, likeQuery).subscribe(data => {
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