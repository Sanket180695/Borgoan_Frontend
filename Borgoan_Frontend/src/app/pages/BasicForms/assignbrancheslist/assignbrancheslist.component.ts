import { Component, OnInit } from '@angular/core';
import { Branchmaster } from 'src/app/Models/BasicForms/branchmaster';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { AssignBranchmaster } from 'src/app/Models/BasicForms/assignbranch';

@Component({
  selector: 'app-assignbrancheslist',
  templateUrl: './assignbrancheslist.component.html',
  styleUrls: ['./assignbrancheslist.component.css']
})
export class AssignbrancheslistComponent implements OnInit {

  formTitle = this.api.translate.instant('branches.formTitle');
  pageIndex = 1;
  pageSize = 100;
  totalRecords = 1;
  dataList = [];
  loadingRecords = true;
  sortValue: string = "desc";
  sortKey: string = "id";
  searchText: string = "";
  filterQuery: string = "";
  isFilterApplied: string = "default";
  logtext: string = "";
  dataList1 = []
  browserLang=''
  dataL=[]
  assignho1=[]
  drawerData2: string[];
  columns: string[][] = [['NAME', this.api.translate.instant('branches.columns111')]]

  //drawer Variables
  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: AssignBranchmaster = new AssignBranchmaster();
  userActivityLogData: Useractivitylog = new Useractivitylog();

  constructor(private api: ApiService, private message: NzNotificationService) { }
  ngOnInit() {
    this.search();
    this.browserLang = localStorage.getItem('locale');

    this.logtext = "OPENED - Branches form KEYWORD[O - Branches] ";
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
    this.userActivityLogData.ACTIVITY_DETAILS = "Branches - Opened"
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

  // loadusers() {
   
  //   var filter = " AND ROLE_ID=7"
  //   //var filter=""
  //   this.api.getAllUsers(0, 0, '', '', filter).subscribe(localName => {
  //     if (localName['count'] > 0) {
  //       this.dataList = localName['data'];
    
  //       // this.data.USER_ID = localName['data'][0]['ID']
  //     }
  
  //   }, err => {
  //     //console.log(err);
   
  //   });
   
  // }
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

      this.logtext = "Filter Applied - Branches form" + sort + " " + this.sortKey + " KEYWORD [F - Branches] ";
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
      this.userActivityLogData.ACTIVITY_DETAILS = "Branches - Sort on " + sort + " " + this.sortKey
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

      this.logtext = "Filter Applied - Branches form " + likeQuery + " KEYWORD [F - Branches] ";
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
      this.userActivityLogData.ACTIVITY_DETAILS = "Branches - Search For " + this.searchText + " " + likeQuery
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

  

    this.api.getAllUsers(this.pageIndex, this.pageSize, this.sortKey, sort, likeQuery).subscribe(data => {
      this.loadingRecords = false;
      this.totalRecords = data['count'];
      var dataLi = []
      dataLi = data['data'];
      this.dataList = dataLi.filter((item) => item.ROLE_ID == 7);
      
      console.log(this.dataList)
    }, err => {
      //console.log(err);
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });
    // this.mapbranch(this.data)

  
  }
  //Drawer Methods
  get closeCallback() {
    return this.drawerClose.bind(this);
  }
  
  mapbranch(data: AssignBranchmaster): void {
    var filter = " AND USER_ID=" + data.ID
    this.drawerData = Object.assign({}, data);
    this.api.getAllAssignBranches1(this.pageIndex, this.pageSize, this.sortKey, '',filter).subscribe(data => {
     
      this.drawerData2 =data['data'];

      for (let i = 0; i < this.drawerData2.length; i++) {
        this.assignho1.push(this.drawerData2[i]['BRANCH_ID'])
        console.log(this.assignho1)
        if(i+1==this.drawerData2.length){
          this.drawerTitle = "Manage Branches";   
          this.drawerData.BRANCH_IDS=this.assignho1
          this.drawerVisible = true;
        }
      }
   
      
      // this.assignho1.split(",");
    //  var name2 =  data['data']['NAME']
      }, err => {
      console.log(err);
    });
   
  }
  


  drawerClose(): void {
    this.search();
    this.drawerVisible = false;
    this.assignho1=[]
  }
}


