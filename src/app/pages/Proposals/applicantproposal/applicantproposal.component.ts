import { Component, OnInit, ViewChild } from '@angular/core';
import { Proposal } from 'src/app/Models/proposal';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ProposaldocumentComponent } from '../proposaldocument/proposaldocument.component';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applicantproposal',
  templateUrl: './applicantproposal.component.html',
  styleUrls: ['./applicantproposal.component.css']
})
export class ApplicantproposalComponent implements OnInit {

  formTitle = this.api.translate.instant('applicantproposal.title');
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
  isVisible = false

  columns: string[][] = [['CURRENT_STAGE_NAME', this.api.translate.instant('applicantproposal.columns1')], ['LOAN_TYPE_NAME', this.api.translate.instant('applicantproposal.columns2')], ['LOAN_AMOUNT', this.api.translate.instant('applicantproposal.columns3')], ['CREATED_ON_DATETIME', this.api.translate.instant('applicantproposal.columns4')], ['LAST_UPDATED_ON_DATETIME', this.api.translate.instant('applicantproposal.columns5')]]

  //drawer Variables
  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: Proposal = new Proposal();
  branchId = sessionStorage.getItem('branchId')
  applicantId = sessionStorage.getItem('applicantId')
  userActivityLogData: Useractivitylog = new Useractivitylog();

  @ViewChild(ProposaldocumentComponent) proposalDocumnets: ProposaldocumentComponent;
  constructor(private api: ApiService, private message: NzNotificationService, private router: Router) { }
  ngOnInit() {
    this.search();

    this.logtext = "OPENED - Praposals form KEYWORD[O - Praposals] ";
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
    this.userActivityLogData.ACTIVITY_DETAILS = "ApplicantProposal - Opened"
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

      this.logtext = "Filter Applied - Praposals form" + sort + " " + this.sortKey + " KEYWORD [F - Praposals] ";
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
      this.userActivityLogData.ACTIVITY_DETAILS = "ApplicantProposal - Sort on " + sort + " " + this.sortKey
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
      var likeQuery = " AND APPLICANT_ID=" + this.applicantId + " AND (";
      this.columns.forEach(column => {
        likeQuery += " " + column[0] + " like '%" + this.searchText + "%' OR";
      });
      likeQuery = likeQuery.substring(0, likeQuery.length - 2) + ")"
      //console.log("likeQuery" + likeQuery);
    }
    else {
      likeQuery = " AND APPLICANT_ID=" + this.applicantId
    }

    this.logtext = "Filter Applied - Praposals form " + likeQuery + " KEYWORD [F - Praposals] ";
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
    this.userActivityLogData.ACTIVITY_DETAILS = "ApplicantProposal - Search For " + this.searchText + " " + likeQuery
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

    //console.log(likeQuery)

    this.api.getAllPraposals(this.pageIndex, this.pageSize, this.sortKey, sort, likeQuery).subscribe(data => {
      //console.log("applicant Data")
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
  //Drawer Methods
  get closeCallback() {
    return this.drawerClose.bind(this);
  }
  backToApplicant() {
    this.isVisible = true
  }

  view(data: Proposal): void {

    this.drawerTitle = this.api.translate.instant('applicantproposal.drawert1') +" (" + data.APPLICANT_NAME + ")";
    this.drawerData = Object.assign({}, data);
    this.drawerVisible = true;

    this.proposalDocumnets.getAllProposalDocuments(data)
    //this.proposalDocumnets.getLinkUrl("http://117.204.250.156:1470/userresponses/"+data.BOT_REPLY_ID)
    // this.proposalDocumnets.getLinkUrl("http://bot.tecpool.in/userresponses/"+data.BOT_REPLY_ID)
    this.proposalDocumnets.getLinkUrl(this.api.chatbotUrl + "userresponses/" + data.BOT_REPLY_ID)

    this.logtext = 'VIEW - PraposalDocuments form KEYWORD [V - PraposalDocuments] ';
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
    this.userActivityLogData.ACTIVITY_DETAILS = "ApplicantProposal - Document Icon Clicked " + data.APPLICANT_NAME + " Current Stage Name (" + data.CURRENT_STAGE_NAME + ")"
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

  drawerClose(): void {
    this.search();
    this.drawerVisible = false;
  }
}
