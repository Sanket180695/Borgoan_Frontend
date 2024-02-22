import { Component, OnInit } from '@angular/core';
import { Notificationmaster } from 'src/app/Models/BasicForms/notificationmaster';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-notificationmasters',
  templateUrl: './notificationmasters.component.html',
  styleUrls: ['./notificationmasters.component.css']
})
export class NotificationmastersComponent implements OnInit {

  formTitle = this.api.translate.instant('notificationmasters.formTitle');
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
  columns: string[][] = [["TITLE", this.api.translate.instant('notificationmasters.columns1')], ["DESCRIPTION", this.api.translate.instant('notificationmasters.columns2')], ['URL', this.api.translate.instant('notificationmasters.columns3')]]


  //drawer Variables
  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: Notificationmaster = new Notificationmaster();
  constructor(private api: ApiService) { }

  ngOnInit() {
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
      //this.sortKey = "id";
      // this.sortValue = "descend";
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
    this.api.getAllNotification(this.pageIndex, this.pageSize, this.sortKey, sort, likeQuery).subscribe(data => {
      //console.log(data)
      this.loadingRecords = false;
      this.totalRecords = data['count'];
      this.dataList = data['data'];
    }, err => {
      //console.log(err);
    });

    this.api.getAllNotification(0, 0, this.sortKey, sort, likeQuery).subscribe(data => {
      //console.log(data)

      this.dataList1 = data['data'];
    }, err => {
      //console.log(err);
    });
  }


  //Drawer Methods
  get closeCallback() {
    return this.drawerClose.bind(this);
  }

  add(): void {
    this.drawerTitle = this.api.translate.instant('notificationmasters.drawerTitle1');
    this.drawerData = new Notificationmaster();
    this.drawerVisible = true;
  }

  edit(data: Notificationmaster): void {
    this.drawerTitle = this.api.translate.instant('notificationmasters.drawerTitle2');
    this.drawerData = Object.assign({}, data);
    this.drawerVisible = true;
  }

  drawerClose(): void {
    this.search();
    this.drawerVisible = false;
  }

  getType(value) {
    if (value == 'T')
      return this.api.translate.instant('notificationmasters.text1')
    else if (value == 'L')
      return this.api.translate.instant('notificationmasters.text2')
    else if (value == 'I')
      return this.api.translate.instant('notificationmasters.text3')
    else if (value == 'V')
      return this.api.translate.instant('notificationmasters.text4')
  }
}

