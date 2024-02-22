import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-rolemasterreport',
  templateUrl: './rolemasterreport.component.html',
  styleUrls: ['./rolemasterreport.component.css']
})
export class RolemasterreportComponent implements OnInit {
  formTitle = this.api.translate.instant('roles.formTitle1');
  pageIndex = 1;
  pageSize = 10;
  totalRecords = 1;
  dataList = [];
  loadingRecords = true;
  sortValue: string = "desc";
  sortKey: string = "ID";
  searchText: string = "";
  filterQuery: string = "";
  isFilterApplied: string = "default";
  columns: string[][] =[["NAME",this.api.translate.instant('roles.coloumn2')],["ACTIVE_USERS",'Active Users']]

  userId = sessionStorage.getItem("userId")
  userName = sessionStorage.getItem("userName")
  roleId = sessionStorage.getItem("roleId")

  constructor(private api: ApiService,private message: NzNotificationService) { }
  ngOnInit() {
    // if (this.userId == null || this.userName == null || this.roleId == null) {
    //   this.api.logoutForSessionValues()
    // }
    // else {
    // this.search();
    // }
    this.search();
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
    } catch (error) {
      sort = "";
    }
    //console.log("search text:" + this.searchText);
    var likeQuery = "";
  
    if (this.searchText != "") {
      likeQuery = " AND";
      this.columns.forEach(column => {
        likeQuery += " " + column[0] + " like '%" + this.searchText + "%' OR";
      });
      likeQuery = likeQuery.substring(0, likeQuery.length - 2) +")"
      //console.log("likeQuery" + likeQuery);
    }
   


    this.api.getRoleMaster(this.pageIndex, this.pageSize, this.sortKey, sort, likeQuery).subscribe(data => {

      this.loadingRecords = false;
      this.totalRecords = data['count'];
      this.dataList = data['data'];
    }, err => {
      //console.log(err);
      if(err['ok']==false)
      this.message.error(this.api.translate.instant('roles.message1'), "");
    });
  }
}