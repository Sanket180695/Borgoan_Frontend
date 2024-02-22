import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Role } from 'src/app/Models/Commonmodule/role';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

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
  columns: string[][] =[['PARENT_ROLE_NAME',this.api.translate.instant('roles.coloumn1')],["NAME",this.api.translate.instant('roles.coloumn2')],["TYPE",this.api.translate.instant('roles.coloumn3')],["START_PAGE",this.api.translate.instant('roles.coloumn4')]]
  drawerData2: string[];
  //drawer Variables
  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: Role = new Role();
  drawerVisible1: boolean;
  drawerTitle1: string;
  drawerData1: Role = new Role();
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
   


    this.api.getAllRoles(this.pageIndex, this.pageSize, this.sortKey, sort, likeQuery).subscribe(data => {
      //console.log(data)
      this.loadingRecords = false;
      this.totalRecords = data['count'];
      this.dataList = data['data'];
    }, err => {
      //console.log(err);
      if(err['ok']==false)
      this.message.error(this.api.translate.instant('roles.message1'), "");
    });
  }
  //Drawer Methods
  get closeCallback() {
    return this.drawerClose.bind(this);
  }

  get closeCallback1() {
    return this.drawerClose1.bind(this);
  }
  


  add(): void {
    this.drawerTitle = this.api.translate.instant('roles.drowercreatetitle');
    this.drawerData = new  Role();
    this.drawerData.IS_ACTIVE=true
    this.drawerData.DESCRIPTION="No Description"
    this.drawerVisible = true;
  }
  edit(data:  Role): void {
    this.drawerTitle = this.api.translate.instant('roles.drowerupdatetitle'); 
    this.drawerData = Object.assign({}, data);
    this.drawerVisible = true;
  }

  MapForms(data: Role): void {
    this.api.getRoleDetails(data.ID).subscribe(data => {
      //console.log("data");
      //console.log(data['data']);
     this.drawerData2 =data['data'];
      }, err => {
      //console.log(err);
    }); 
    this.drawerTitle1 = this.api.translate.instant('roles.drowerdetailstitle'); + data.NAME ;
    this.drawerData1 = Object.assign({}, data);
    this.drawerVisible1 = true;
  }

  drawerClose(): void {
    this.search();
    this.drawerVisible = false;
  }
  drawerClose1(): void {
  
    this.drawerVisible1 = false;
  }
 
}