import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ApiService } from 'src/app/Service/api.service';
import { Form } from 'src/app/Models/Commonmodule/form';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  formTitle = this.api.translate.instant('forms.formTitle1')
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
  columns: string[][] = [["PARENT_NAME", this.api.translate.instant('forms.coloumns1')], ["NAME",  this.api.translate.instant('forms.coloumns2')], ["LINK", this.api.translate.instant('forms.coloumns3')], ["ICON", this.api.translate.instant('forms.coloumns4')]]

  //drawer Variables
  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: Form = new Form();
  loadingForm = false
  forms: Form[]
  userId = sessionStorage.getItem("userId")
  userName = sessionStorage.getItem("userName")
  roleId = sessionStorage.getItem("roleId")

  constructor(private api: ApiService, private message: NzNotificationService) { }
  ngOnInit() {
    if (this.userId == null || this.userName == null || this.roleId == null) {
      this.api.logoutForSessionValues()
    }
    else {
      this.search()
      this.loadForms()
    }
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
    if (this.searchText != "") {
      var likeQuery = " AND";
      this.columns.forEach(column => {
        likeQuery += " " + column[0] + " like '%" + this.searchText + "%' OR";
      });
      likeQuery = likeQuery.substring(0, likeQuery.length - 2)
      //console.log("likeQuery" + likeQuery);
    }
    
    this.api.getAllForms(this.pageIndex, this.pageSize, this.sortKey, sort, likeQuery).subscribe(data => {
      this.loadingRecords = false;
      this.totalRecords = data['count'];
      this.dataList = data['data'];
    }, err => {
      //console.log(err);
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('forms.message1'), "");
    });
  }
  //Drawer Methods
  get closeCallback() {
    return this.drawerClose.bind(this);
  }
  add(): void {
    this.drawerTitle = this.api.translate.instant('forms.drowercreatetitle') ;
    this.drawerData = new Form();
    //this.loadForms()
    this.drawerVisible = true;
  }
  edit(data: Form): void {
    this.drawerTitle = this.api.translate.instant('forms.drowerupdatetitle') ;
    this.drawerData = Object.assign({}, data);
    this.drawerVisible = true;
  }
  drawerClose(): void {
    this.search();
    this.drawerVisible = false;
  }

  loadForms() {
    this.loadingForm = true;
    this.api.getAllForms(0, 0, '', '', 'AND PARENT_ID=0').subscribe(data => {
      this.forms = data['data'];
      this.loadingForm = false;
    }, err => {
      //console.log(err);
      //this.loadingForm = false;
    });
  }




  



}