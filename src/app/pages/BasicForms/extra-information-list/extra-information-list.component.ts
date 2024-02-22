import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ExtraInformation } from 'src/app/Models/PersonalProposal/extra-information';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-extra-information-list',
  templateUrl: './extra-information-list.component.html',
  styleUrls: ['./extra-information-list.component.css']
})
export class ExtraInformationListComponent implements OnInit {

  formTitle = this.api.translate.instant('extra-information-list.formTitle');
  pageIndex = 1;
  pageSize = 10;
  totalRecords = 1;
  dataList = [];
  loadingRecords = true;
  sortValue: string = "desc";
  sortKey: string = "ID";
  searchText: string = "";
  likeQuery: string = "";
  isFilterApplied: string = "default";
  userId = sessionStorage.getItem('userId');
  userName = sessionStorage.getItem("userName")
  roleId = sessionStorage.getItem("roleId")
  logtext: string = "";

  columns: string[][] = [["NAME_EN", this.api.translate.instant('extra-information-list.columns1')], ["STATUS", this.api.translate.instant('extra-information-list.columns2')]]

  //drawer Variables
  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: ExtraInformation = new ExtraInformation();
  constructor(private api: ApiService, private cookie: CookieService) { }
  ngOnInit() {

    this.search();

    this.logtext = 'OPENED - ExtraInformation form KEYWORD[O - ExtraInformation] ';
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

      this.logtext = 'Filter Applied - ExtraInformation form"+ sort +" "+this.sortKey +" KEYWORD [F - ExtraInformation] ';
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

    this.logtext = 'Filter Applied - ExtraInformation form "+ likeQuery +" KEYWORD [F - ExtraInformation] ';
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          //console.log(successCode);
        }
        else {
          //console.log(successCode);
        }
      });
    this.api.getAllExtraInformation(this.pageIndex, this.pageSize, this.sortKey, sort, likeQuery)
      .subscribe(data => {
        //console.log(data)
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
    this.drawerTitle = this.api.translate.instant('extra-information-list.drawerTitle1');
    this.drawerData = new ExtraInformation();
    this.drawerVisible = true;
    this.setValues()
    this.logtext = 'ADD - ExtraInformation form KEYWORD [A - ExtraInformation] ';
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
    this.drawerData.NAME_EN = ""
    this.drawerData.NAME_KN= ""
    this.drawerData.NAME_MR = ""
    this.drawerData.STATUS = true
  }
  edit(data: ExtraInformation): void {

    try {
      data.EXTRA_TYPE = data.TYPE.split(",");
    } catch (error) {
      data.EXTRA_TYPE = [];
    }
    this.drawerTitle = this.api.translate.instant('extra-information-list.drawerTitle1');
    this.drawerData = Object.assign({}, data);
    this.drawerVisible = true;

    this.logtext = 'EDIT - ExtraInformation form KEYWORD [E - ExtraInformation] ';
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