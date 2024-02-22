import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { IncomeSource } from 'src/app/Models/PersonalProposal/income-source';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-income-source-list',
  templateUrl: './income-source-list.component.html',
  styleUrls: ['./income-source-list.component.css']
})
export class IncomeSourceListComponent implements OnInit {

  formTitle = this.api.translate.instant('income-source-list.formTitle');
  pageIndex = 1;
  pageSize = 10;
  totalRecords = 1;
  dataList = [];
  dataList1 = [];

  loadingRecords = true;
  sortValue: string = "desc";
  sortKey: string = "ID";
  searchText: string = "";
  likeQuery: string = "";
  isFilterApplied: string = "default";
  logtext: string = "";

  columns: string[][] = [["NAME", this.api.translate.instant('income-source-list.columns1')], ["DESCRIPTION", this.api.translate.instant('income-source-list.columns2')], ["IS_ACTIVE", this.api.translate.instant('income-source-list.columns3')]]

  //drawer Variables
  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: IncomeSource = new IncomeSource();
  constructor(private api: ApiService, private cookie: CookieService) { }
  ngOnInit() {

    this.search();

    this.logtext = 'OPENED - IncomeSources form KEYWORD[O - IncomeSources] ';
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

      this.logtext = 'Filter Applied - IncomeSources form"+ sort +" "+this.sortKey +" KEYWORD [F - IncomeSources] ';
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
    if (this.searchText != "") {
      var likeQuery = " AND";
      this.columns.forEach(column => {
        likeQuery += " " + column[0] + " like '%" + this.searchText + "%' OR";
      });
      likeQuery = likeQuery.substring(0, likeQuery.length - 2)
      //console.log("likeQuery" + likeQuery);
    } else
      likeQuery = '';

    this.logtext = 'Filter Applied - IncomeSources form "+ likeQuery +" KEYWORD [F - IncomeSources] ';
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          //console.log(successCode);
        }
        else {
          //console.log(successCode);
        }
      });

    this.api.getAllIncomeSocurce(this.pageIndex, this.pageSize, this.sortKey, sort, likeQuery).subscribe(data => {
      //console.log(data)
      this.loadingRecords = false;
      this.totalRecords = data['count'];
      this.dataList = data['data'];
    }, err => {
      //console.log(err);
    });

    this.api.getAllIncomeSocurce(0, 0, this.sortKey, sort, likeQuery).subscribe(data => {
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
    this.drawerTitle = this.api.translate.instant('income-source-list.drawerTitle1') ;
    this.drawerData = new IncomeSource();
    this.drawerVisible = true;
    this.setValues()
    this.logtext = 'ADD - IncomeSource form KEYWORD [A - IncomeSource] ';
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


  setValues() {
    this.drawerData.NAME = "";
    this.drawerData.DESCRIPTION = this.api.translate.instant('common.No_Description');
    this.drawerData.IS_ACTIVE = true;

  }
  edit(data: IncomeSource): void {
    this.drawerTitle = this.api.translate.instant('income-source-list.drawerTitle1') ;
    this.drawerData = Object.assign({}, data);
    this.drawerVisible = true;
    this.logtext = 'EDIT - IncomeSource form KEYWORD [E - IncomeSource] ';
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