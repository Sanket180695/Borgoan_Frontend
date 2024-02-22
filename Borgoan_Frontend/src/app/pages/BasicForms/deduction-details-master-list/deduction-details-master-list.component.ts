import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/Service/api.service';
import { DeductionDetailsMaster } from 'src/app/Models/PersonalProposal/deduction-details-master';

@Component({
  selector: 'app-deduction-details-master-list',
  templateUrl: './deduction-details-master-list.component.html',
  styleUrls: ['./deduction-details-master-list.component.css']
})
export class DeductionDetailsMasterListComponent implements OnInit {

  formTitle = this.api.translate.instant('deduction-details-master-list.formTitle');
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

  columns: string[][] = [["NAME", this.api.translate.instant('deduction-details-master-list.columns1')], ["STATUS", this.api.translate.instant('deduction-details-master-list.columns2')]]

  //drawer Variables
  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: DeductionDetailsMaster = new DeductionDetailsMaster();
  constructor(private api: ApiService, private cookie: CookieService) { }
  ngOnInit() {

    this.search();

    this.logtext = 'OPENED - DeductionDetailsMaster form KEYWORD[O - DeductionDetailsMaster] ';
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

      this.logtext = 'Filter Applied - DeductionDetailsMaster form "+ likeQuery +" KEYWORD [F - DeductionDetailsMaster] ';
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
    } else {
      likeQuery = '';
    }

    this.logtext = 'Filter Applied - DeductionDetailsMaster form "+ likeQuery +" KEYWORD [F - DeductionDetailsMaster] ';
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          //console.log(successCode);
        }
        else {
          //console.log(successCode);
        }
      });

    this.api.getAllDeductionDetailsMaster(this.pageIndex, this.pageSize, this.sortKey, sort, likeQuery).subscribe(data => {
      this.loadingRecords = false;
      this.totalRecords = data['count'];
      this.dataList = data['data'];
    }, err => {
      //console.log(err);
    });

    this.api.getAllDeductionDetailsMaster(0, 0, this.sortKey, sort, likeQuery).subscribe(data => {

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
    this.drawerTitle = this.api.translate.instant('deduction-details-master-list.drawerTitle1');
    this.drawerData = new DeductionDetailsMaster();
    this.drawerVisible = true;
    this.setValues()
    this.logtext = 'ADD - DeductionDetailsMaster form KEYWORD [A - DeductionDetailsMaster] ';
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
    this.drawerData.NAME = ""
    this.drawerData.IS_ACTIVE = true
  }
  edit(data: DeductionDetailsMaster): void {

    this.drawerTitle = this.api.translate.instant('deduction-details-master-list.drawerTitle2');
    this.drawerData = Object.assign({}, data);
    this.drawerVisible = true;

    this.logtext = 'EDIT - DeductionDetailsMaster form KEYWORD [E - DeductionDetailsMaster] ';
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