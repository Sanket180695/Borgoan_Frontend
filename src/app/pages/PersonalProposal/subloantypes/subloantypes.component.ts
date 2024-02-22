import { Component, OnInit } from '@angular/core';
import { Subloantypes } from 'src/app/Models/subloantypes';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-subloantypes',
  templateUrl: './subloantypes.component.html',
  styleUrls: ['./subloantypes.component.css']
})
export class SubloantypesComponent implements OnInit {

  formTitle = this.api.translate.instant('subloantypes.formTitle');
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
    ['NAME', this.api.translate.instant('applicanttype.label1.name')+" ("+this.api.translate.instant('common.marathi')+")"],
    ['NAME_EN', this.api.translate.instant('applicanttype.label1.name')+" ("+this.api.translate.instant('common.english')+")"],
    ['NAME_KN', this.api.translate.instant('applicanttype.label1.name')+" ("+this.api.translate.instant('common.kannada')+")"]
  ]

  //drawer Variables
  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: Subloantypes = new Subloantypes();
  constructor(private api: ApiService, private message: NzNotificationService) { }
  ngOnInit() {
    this.search();

    this.logtext = 'OPENED - BankLoanTypes form KEYWORD[O - BankLoanTypes] ';
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

      this.logtext = 'Filter Applied - BankLoanTypes form"+ sort +" "+this.sortKey +" KEYWORD [F - BankLoanTypes] ';
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

    this.logtext = 'Filter Applied - BankLoanTypes form "+ likeQuery +" KEYWORD [F - BankLoanTypes] ';
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          //console.log(successCode);
        }
        else {
          //console.log(successCode);
        }
      });

    this.api.getAllBankLoanTypes(this.pageIndex, this.pageSize, this.sortKey, sort, likeQuery).subscribe(data => {
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
    this.drawerTitle = this.api.translate.instant('subloantypes.drawerTitle1');
    this.drawerData = new Subloantypes();
    this.drawerVisible = true;

    this.logtext = 'ADD - BankLoanType form KEYWORD [A - BankLoanType] ';
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
  edit(data: Subloantypes): void {

    this.drawerTitle = this.api.translate.instant('subloantypes.drawerTitle2');
    this.drawerData = Object.assign({}, data);
    this.drawerVisible = true;
    if (this.drawerData.TYPE == "I") {
      this.drawerData.types = [{ label: this.api.translate.instant('subloantypes.Individual'), value: 'I', checked: true },
      { label: this.api.translate.instant('subloantypes.Organization'), value: 'O', checked: false }]
    }
    else if (this.drawerData.TYPE == "O") {
      this.drawerData.types = [{ label: this.api.translate.instant('subloantypes.Individual'), value: 'I', checked: false },
      { label: this.api.translate.instant('subloantypes.Organization'), value: 'O', checked: true }]
    }
    else if (this.drawerData.TYPE == "B") {
      this.drawerData.types = [{ label: this.api.translate.instant('subloantypes.Individual'), value: 'I', checked: true },
      { label: this.api.translate.instant('subloantypes.Organization'), value: 'O', checked: true }]
    }

    this.logtext = 'EDIT - BankLoanType form KEYWORD [E - BankLoanType] ';
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