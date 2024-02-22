import { Component, OnInit } from '@angular/core';
import { Loantypes } from 'src/app/Models/BasicForms/loantypes';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';

@Component({
  selector: 'app-loantypes',
  templateUrl: './loantypes.component.html',
  styleUrls: ['./loantypes.component.css']
})
export class LoantypesComponent implements OnInit {

  formTitle = this.api.translate.instant('loantypes.formTitle');
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
  drawerData2 = [];

  columns: string[][] = [
    ['NAME_MR', this.api.translate.instant('loantypes.columns1')+" ("+this.api.translate.instant('common.marathi')+")"],
    ['NAME_EN', this.api.translate.instant('loantypes.columns1')+" ("+this.api.translate.instant('common.english')+")"],
    ['NAME_KN', this.api.translate.instant('loantypes.columns1')+" ("+this.api.translate.instant('common.kannada')+")"],
    ['PROCESSING_FEE', this.api.translate.instant('loantypes.columns2')]
  ]

  //drawer Variables
  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: Loantypes = new Loantypes();
  drawerVisible1: boolean;
  drawerTitle1: string;
  userActivityLogData: Useractivitylog = new Useractivitylog();

  constructor(private api: ApiService, private message: NzNotificationService) { }
  ngOnInit() {
    this.search();

    this.logtext = "OPENED - LoanTypes form KEYWORD[O - LoanTypes] ";
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
    this.userActivityLogData.ACTIVITY_DETAILS = "LoanTypes - Opened"
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

      this.logtext = "Filter Applied - LoanTypes form" + sort + " " + this.sortKey + " KEYWORD [F - LoanTypes] ";
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
      this.userActivityLogData.ACTIVITY_DETAILS = "LoanTypes - Sort on " + sort + " " + this.sortKey
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

      this.logtext = "Filter Applied - LoanTypes form " + likeQuery + " KEYWORD [F - LoanTypes] ";
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
      this.userActivityLogData.ACTIVITY_DETAILS = "LoanTypes - Search For " + this.searchText + " " + likeQuery
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



    this.api.getAllLoanTypes(this.pageIndex, this.pageSize, this.sortKey, sort, likeQuery).subscribe(data => {
      this.loadingRecords = false;
      this.totalRecords = data['count'];
      this.dataList = data['data'];
    }, err => {
      //console.log(err);
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });

    this.api.getAllLoanTypes(0, 0, this.sortKey, sort, likeQuery).subscribe(data => {
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
    this.drawerTitle = this.api.translate.instant('loantypes.drawerTitle1');
    this.drawerData = new Loantypes();
    this.drawerVisible = true;

    this.logtext = "ADD - LoanTypes form KEYWORD [A - LoanTypes] ";
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
    this.userActivityLogData.ACTIVITY_DETAILS = "LoanType - Add Clicked"
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

  edit(data: Loantypes): void {

    this.drawerTitle = this.api.translate.instant('loantypes.drawerTitle2');
    this.drawerData = Object.assign({}, data);
    this.drawerVisible = true;

    this.logtext = "EDIT - LoanTypes form KEYWORD [E - LoanTypes] ";
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
    this.userActivityLogData.ACTIVITY_DETAILS = "LoanType - Edit Clicked"
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
  mapDocument(data: Loantypes) {
    this.api.getLoanTypeMapping(data.ID).subscribe(data => {
      //console.log(data['data']);
      this.drawerData2 = data['data'];
    }, err => {
      //console.log(err);
    });

    this.drawerData2 = [
      {
        title: this.api.translate.instant('loantypes.title1') + '-1',
        key: 'DG1',
        expanded: true,
        checked: false,
        children: [
          {
            title: this.api.translate.instant('loantypes.title2') + '-1', key: 'DOC1', isLeaf: true, checked: false, IS_COMPULSORY: 1, STATUS: 1
          },
          {
            title: this.api.translate.instant('loantypes.title2') + '-2', key: 'DOC2', isLeaf: true, checked: false, IS_COMPULSORY: 1, STATUS: 1
          }
        ]
      },
      {
        title: this.api.translate.instant('loantypes.title1') + '-2',
        key: 'DG2',
        expanded: true,
        checked: false,
        children: [
          {
            title: this.api.translate.instant('loantypes.title2') + '-3', key: 'DOC3', isLeaf: true, checked: false, IS_COMPULSORY: 0, STATUS: 1
          },
          {
            title: this.api.translate.instant('loantypes.title2') + '-4', key: 'DOC4', isLeaf: true, checked: false, IS_COMPULSORY: 1, STATUS: 0
          }
        ]
      }
    ];
    this.drawerTitle1 = this.api.translate.instant('loantypes.drawerTitle3') + " " + data.NAME_KN + "";
    this.drawerData = Object.assign({}, data);
    this.drawerVisible1 = true;

    this.logtext = "MAP_DOCUMENT - LoanTypes form KEYWORD [M - LoanTypes] ";
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
    this.userActivityLogData.ACTIVITY_DETAILS = "LoanType - Map Document Clicked"
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
  drawerClose1(): void {
    this.drawerVisible1 = false;
  }
  get closeCallback1() {
    return this.drawerClose1.bind(this);
  }
}