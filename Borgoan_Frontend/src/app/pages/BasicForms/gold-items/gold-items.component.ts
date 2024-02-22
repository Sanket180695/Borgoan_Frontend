import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { GoldItem } from 'src/app/Models/BasicForms/gold-item';

@Component({
  selector: 'app-gold-items',
  templateUrl: './gold-items.component.html',
  styleUrls: ['./gold-items.component.css']
})
export class GoldItemsComponent implements OnInit {
  formTitle = this.api.translate.instant('GoldItem.formTitle');
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

  columns: string[][] = [
    ['NAME_MR', this.api.translate.instant('GoldItem.lebel1') + " (" + this.api.translate.instant('common.marathi') + ")"],
    ['NAME_EN', this.api.translate.instant('GoldItem.lebel1') + " (" + this.api.translate.instant('common.english') + ")"],
    ['NAME_KN', this.api.translate.instant('GoldItem.lebel1') + " (" + this.api.translate.instant('common.kannada') + ")"],
    ["PER_GRAM_RATE", this.api.translate.instant('GoldItem.lebel2')]]

  //drawer Variables
  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: GoldItem = new GoldItem();
  constructor(private api: ApiService, private message: NzNotificationService) { }
  ngOnInit() {
    this.search();

    this.logtext = 'OPENED - GoldItem form KEYWORD[O - GoldItem] ';
    this.api.addLog('A', this.logtext, this.api.emailId)
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

      this.logtext = 'Filter Applied - GoldItem form"+ sort +" "+this.sortKey +" KEYWORD [F - GoldItem] ';
      this.api.addLog('A', this.logtext, this.api.emailId)
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
    }

    this.logtext = 'Filter Applied - GoldItem form "+ likeQuery +" KEYWORD [F - GoldItem] ';
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          //console.log(successCode);
        }
        else {
          //console.log(successCode);
        }
      });

    this.api.getAllGoldItem(this.pageIndex, this.pageSize, this.sortKey, sort, likeQuery).subscribe(data => {
      this.loadingRecords = false;
      this.totalRecords = data['count'];
      this.dataList = data['data'];
    }, err => {
      //console.log(err);
    });
  }
  //Drawer Methods
  get closeCallback() {
    return this.drawerClose.bind(this);
  }
  add(): void {
    this.drawerTitle = this.api.translate.instant('GoldItem.drawerTitle1');
    this.drawerData = new GoldItem();
    this.drawerVisible = true;

    this.logtext = 'ADD - GoldItem form KEYWORD [A - GoldItem] ';
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          //console.log(successCode);
        }
        else {
          //console.log(successCode);
        }
      });

  }
  edit(data: GoldItem): void {

    this.drawerTitle = this.api.translate.instant('GoldItem.drawerTitle2');
    this.drawerData = Object.assign({}, data);
    this.drawerVisible = true;

    this.logtext = 'EDIT - GoldItem form KEYWORD [E - GoldItem] ';
    this.api.addLog('A', this.logtext, this.api.emailId)
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
