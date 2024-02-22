import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/Commonmodule/user';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  formTitle = this.api.translate.instant('users.formtitle1');
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
  columns: string[][] = [["NAME", this.api.translate.instant('users.coloumn1')], ["EMAIL_ID", this.api.translate.instant('users.coloumn2')], ["MOBILE_NUMBER", this.api.translate.instant('users.coloumn3')], ['PASSWORD', this.api.translate.instant('users.coloumn4')]]

  drawerData2: string[];
  //drawer Variables
  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: User = new User();
  userId = sessionStorage.getItem('userId');
  userName = sessionStorage.getItem("userName")
  roleId = sessionStorage.getItem("roleId")
  key = "7061737323313233"

  constructor(private api: ApiService, private message: NzNotificationService) { }
  ngOnInit() {
    // if (this.userId == null || this.userName == null || this.roleId == null) {
    //   this.api.logoutForSessionValues()
    // }
    // else {
    //   this.search();
    // }
    this.search()
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
      likeQuery = " AND ("
      this.columns.forEach(column => {
        likeQuery += " " + column[0] + " like '%" + this.searchText + "%' OR";
      });
      likeQuery = likeQuery.substring(0, likeQuery.length - 2) + ")"
    }
    else {
      likeQuery = " "
    }
    if (this.roleId == '2') {
      likeQuery = likeQuery + " AND ID >2"
    }else {
      likeQuery = likeQuery 
    }
    this.api.getAllUsers(this.pageIndex, this.pageSize, this.sortKey, sort, likeQuery).subscribe(data => {
      this.loadingRecords = false;
      this.totalRecords = data['count'];
      this.dataList = data['data'];
     
    }, err => {
      //console.log(err);
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });

    // this.api.getAllUserMappingData(this.pageIndex, this.pageSize, this.sortKey, sort, "").subscribe(data => {
    //   //console.log(data)
    //   this.loadingRecords = false;
    //   this.totalRecords = data['count'];
    //   this.dataList = data['data'];
    // }, err => {
    //   //console.log(err);
    //   if (err['ok'] == false)
    //     this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    //  });
  }
  //Drawer Methods
  get closeCallback() {
    return this.drawerClose.bind(this);
  }
  add(): void {
    this.drawerTitle = this.api.translate.instant('users.drowercreatetitle');
    this.drawerData = new User();
    this.drawerData.IS_ACTIVE = true
    this.drawerVisible = true;
  }

  edit(data: User): void {
    this.drawerTitle = this.api.translate.instant('users.drowerupdatetitle');
    this.drawerData = Object.assign({}, data);
    // var decrypt=this.api.decryptData(data.PASSWORD,this.key)
    // //console.log(decrypt)
    // this.drawerData.PASSWORD1=decrypt
    this.drawerVisible = true;
  }

  drawerClose(): void {
    this.search();
    this.drawerVisible = false;
  }

  getPassword(password) {
    return this.api.decryptData(password, this.key)
  }

}
