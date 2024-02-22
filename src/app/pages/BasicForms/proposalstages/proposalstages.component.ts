import { Component, OnInit } from '@angular/core';
import { Proposalstage } from 'src/app/Models/BasicForms/proposalstage';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';

@Component({
  selector: 'app-proposalstages',
  templateUrl: './proposalstages.component.html',
  styleUrls: ['./proposalstages.component.css']
})
export class ProposalstagesComponent implements OnInit {

  formTitle = this.api.translate.instant('proposalstages.formTitle');
  pageIndex = 1;
  pageSize = 10;
  totalRecords = 1;
  dataList = [];
  dataList1 = []
  loadingRecords = true;
  sortValue: string = "desc";
  sortKey: string = "id";
  searchText: string = "";
  filterQuery: string = "";
  isFilterApplied: string = "default";
  logtext: string = "";

  columns: string[][] = [
    ['NAME_MR', this.api.translate.instant('proposalstages.columns1')+" ("+this.api.translate.instant('common.marathi')+")"],
    ['NAME_EN', this.api.translate.instant('proposalstages.columns1')+" ("+this.api.translate.instant('common.english')+")"],
    ['NAME_KN', this.api.translate.instant('proposalstages.columns1')+" ("+this.api.translate.instant('common.kannada')+")"],
   ['SEQUENCE_NUMBER', this.api.translate.instant('proposalstages.columns2')]]

  //drawer Variables
  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: Proposalstage = new Proposalstage();
  userActivityLogData: Useractivitylog = new Useractivitylog();

  constructor(private api: ApiService, private message: NzNotificationService) { }
  ngOnInit() {
    this.formTitle = this.api.translate.instant('proposalstages.formTitle');
     this.search();

    this.logtext = "OPENED - ProposalStages form KEYWORD[O - ProposalStages] ";
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
    this.userActivityLogData.ACTIVITY_DETAILS = "ProposalStage - Opened"
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

      this.logtext = "Filter Applied - ProposalStages form" + sort + " " + this.sortKey + " KEYWORD [F - ProposalStages] ";
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
      this.userActivityLogData.ACTIVITY_DETAILS = "ProposalStage - Sort on " + sort + " " + this.sortKey
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

      this.logtext = "Filter Applied - ProposalStages form " + likeQuery + " KEYWORD [F - ProposalStages] ";
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
      this.userActivityLogData.ACTIVITY_DETAILS = "ProposalStages - Search For " + this.searchText + " " + likeQuery
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


    // var filter = ""
    // if (likeQuery)
    //   filter = this.filterQuery + likeQuery
    // else
    //   filter = this.filterQuery


    this.api.getAllProposalStages(this.pageIndex, this.pageSize, this.sortKey, sort, likeQuery).subscribe(data => {
      this.loadingRecords = false;
      this.totalRecords = data['count'];
      this.dataList = data['data'];
    }, err => {
      //console.log(err);
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });



    this.api.getAllProposalStages(0, 0, this.sortKey, sort, likeQuery).subscribe(data => {
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

  add(): void {
    this.drawerTitle = this.api.translate.instant('proposalstages.drawerTitle1');
    this.drawerData = new Proposalstage();
    this.drawerVisible = true;

    this.logtext = "ADD - ProposalStage form KEYWORD [A - ProposalStage] ";
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
    this.userActivityLogData.ACTIVITY_DETAILS = "ProposalStage - Add Clicked"
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
  edit(data: Proposalstage): void {


    let childIds = ""
    let filter = " AND ID=" + data.ID
    this.api.getAllProposalStages(0, 0, '', '', filter).subscribe(data1 => {
      //console.log(data1['data'])
      data1['data'].forEach(element => {
        childIds = childIds + element['CHILDS'] + ","
      });
      let userId1 = childIds.substring(0, childIds.length - 1)
      var arrOfId = userId1.split(',').map(function (item) {
        return parseInt(item, 10);
      });

      if (userId1 == "") {
        data.CHILD_INFO = []
      }
      else {
        data.CHILD_INFO = arrOfId
      }

      this.drawerTitle = this.api.translate.instant('proposalstages.drawerTitle2');
      this.drawerData = Object.assign({}, data);
      this.drawerVisible = true;

      this.logtext = "EDIT - ProposalStage form KEYWORD [E - ProposalStage] ";
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
      this.userActivityLogData.ACTIVITY_DETAILS = "ProposalStage - Edit Clicked"
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
    }, err => {
      //console.log(err);
    });



  }
  drawerClose(): void {
    this.search();
    this.drawerVisible = false;
  }
}