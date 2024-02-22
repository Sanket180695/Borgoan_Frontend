import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { InstallmentFrequency } from 'src/app/Models/PersonalProposal/installment-frequency';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-installment-frequency-list',
  templateUrl: './installment-frequency-list.component.html',
  styleUrls: ['./installment-frequency-list.component.css']
})
export class InstallmentFrequencyListComponent implements OnInit {

  formTitle = this.api.translate.instant('installment-frequency-list.formTitle');
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
  userId = sessionStorage.getItem('userId');
  userName = sessionStorage.getItem("userName");
  roleId = sessionStorage.getItem("roleId");
  logtext: string = "";
  columns: string[][] = [
    ['NAME', this.api.translate.instant('installment-frequency-list.columns1')+" ("+this.api.translate.instant('common.marathi')+")"],
    ['NAME_EN', this.api.translate.instant('installment-frequency-list.columns1')+" ("+this.api.translate.instant('common.english')+")"],
    ['NAME_KN', this.api.translate.instant('installment-frequency-list.columns1')+" ("+this.api.translate.instant('common.kannada')+")"],
    ["DESCRIPTION", this.api.translate.instant('installment-frequency-list.columns2')+" ("+this.api.translate.instant('common.marathi')+")"], 
    ["DESCRIPTION", this.api.translate.instant('installment-frequency-list.columns2')+" ("+this.api.translate.instant('common.english')+")"], 
    ["DESCRIPTION", this.api.translate.instant('installment-frequency-list.columns2')+" ("+this.api.translate.instant('common.kannada')+")"], 
    ["IS_ACTIVE", this.api.translate.instant('installment-frequency-list.columns3')]]
  //drawer Variables
  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: InstallmentFrequency = new InstallmentFrequency();
  constructor(private api: ApiService, private cookie: CookieService) { }
  ngOnInit() {
    this.search();
    this.logtext = 'OPENED - InstallmentFrequency form KEYWORD[O - InstallmentFrequency] ';
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

      this.logtext = 'Filter Applied - InstallmentFrequency form"+ sort +" "+this.sortKey +" KEYWORD [F - InstallmentFrequency] ';
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

    this.logtext = 'Filter Applied - InstallmentFrequency form "+ likeQuery +" KEYWORD [F - InstallmentFrequency] ';
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          //console.log(successCode);
        }
        else {
          //console.log(successCode);
        }
      });


    this.api.getAllInstallmentFrequency(this.pageIndex, this.pageSize, this.sortKey, sort, likeQuery).subscribe(data => {
      this.loadingRecords = false;
      this.totalRecords = data['count'];
      this.dataList = data['data'];
    }, err => {
      //console.log(err);
    });

    this.api.getAllInstallmentFrequency(this.pageIndex, this.pageSize, this.sortKey, sort, likeQuery).subscribe(data => {
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
    this.drawerTitle = this.api.translate.instant('installment-frequency-list.drawerTitle1') ;
    this.drawerData = new InstallmentFrequency();
    this.drawerVisible = true;
    this.setValues()
    this.logtext = 'ADD - InstallmentFrequency form KEYWORD [A - InstallmentFrequency] ';
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

    this.drawerData.NAME_EN = "";
    this.drawerData.NAME_KN = "";
    this.drawerData.NAME = "";
    this.drawerData.DESCRIPTION = "";
    this.drawerData.DESCRIPTION_EN = "";
    this.drawerData.DESCRIPTION_KN = "";
    this.drawerData.IS_ACTIVE = true;
  }

  edit(data: InstallmentFrequency): void {
    this.drawerTitle = this.api.translate.instant('installment-frequency-list.drawerTitle2') ;
    this.drawerData = Object.assign({}, data);
    this.drawerVisible = true;

    this.logtext = 'EDIT - InstallmentFrequency form KEYWORD [E - InstallmentFrequency] ';
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
