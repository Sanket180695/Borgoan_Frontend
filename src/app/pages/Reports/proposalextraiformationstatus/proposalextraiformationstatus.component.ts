import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Document } from 'src/app/Models/BasicForms/document';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';

@Component({
  selector: 'app-proposalextraiformationstatus',
  templateUrl: './proposalextraiformationstatus.component.html',
  styleUrls: ['./proposalextraiformationstatus.component.css']
})
export class ProposalextraiformationstatusComponent implements OnInit {

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
    ['EXTRA_INFORMATION_NAME', 'Extra Infoirmation tab Name'],
    ['NAME_EN', 'Extra Infoirmation tab Name'],
    ['NAME_KN', 'Extra Infoirmation tab Name'],
    ['IS_PROVIDED', 'Is Provided'],
    ['IS_VERIFIED', 'Is Verified'],
    ['USER_NAME', 'Approved By'],
    ['VERIFICATION_DATETIME', 'Approved Time'],
    ['REMARK', 'Remark']

  ]
  proposals = [];
  PROPOSAL_ID = 0
  loadingproposal = false
  //drawer Variables
  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: Document = new Document();
  userActivityLogData: Useractivitylog = new Useractivitylog();

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
  
    this.logtext = "OPENED - Proposal Extrainformation Status form KEYWORD[O - Proposal Extrainformation Status] ";
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
    this.userActivityLogData.ACTIVITY_DETAILS = "Proposal Extrainformation Status - Opened"
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

      this.logtext = "Filter Applied - Proposal Extrainformation Status form" + sort + " " + this.sortKey + " KEYWORD [F - Proposal Extrainformation Status] ";
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
      this.userActivityLogData.ACTIVITY_DETAILS = "Proposal Extrainformation Status - Sort on " + sort + " " + this.sortKey
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

    this.logtext = "Filter Applied - Proposal Extrainformation Status form " + likeQuery + " KEYWORD [F - Proposal Extrainformation Status] ";
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
    this.userActivityLogData.ACTIVITY_DETAILS = "Proposal Extrainformation Status - Search For " + this.searchText + " " + likeQuery
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
   
    this.api.getPraposalExtraInfoStatus(this.PROPOSAL_ID).subscribe(data => {
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