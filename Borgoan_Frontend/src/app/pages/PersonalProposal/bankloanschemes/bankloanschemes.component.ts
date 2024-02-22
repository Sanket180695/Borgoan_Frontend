import { Component, OnInit } from '@angular/core';
import { Bankloanscheme } from 'src/app/Models/PersonalProposal/bankloanscheme';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-bankloanschemes',
  templateUrl: './bankloanschemes.component.html',
  styleUrls: ['./bankloanschemes.component.css']
})
export class BankloanschemesComponent implements OnInit {

  formTitle = this.api.translate.instant('bankloanschemes.formTitle');
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
    ['NAME_MR', this.api.translate.instant('loantypes.columns1')+" ("+this.api.translate.instant('common.marathi')+")"],
    ['NAME_EN', this.api.translate.instant('loantypes.columns1')+" ("+this.api.translate.instant('common.english')+")"],
    ['NAME_KN', this.api.translate.instant('loantypes.columns1')+" ("+this.api.translate.instant('common.kannada')+")"],
    ['PROCESSING_FEE', this.api.translate.instant('loantypes.columns2')]
  ]

  //drawer Variables
  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: Bankloanscheme = new Bankloanscheme();
  constructor(private api: ApiService, private message: NzNotificationService) { }
  ngOnInit() {
    this.search();

    this.logtext = 'OPENED - LoanScheme form KEYWORD[O - LoanScheme] ';
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

      this.logtext = 'Filter Applied - LoanScheme form"+ sort +" "+this.sortKey +" KEYWORD [F - LoanScheme] ';
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

    this.logtext = 'Filter Applied - LoanScheme form "+ likeQuery +" KEYWORD [F - LoanScheme] ';
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          //console.log(successCode);
        }
        else {
          //console.log(successCode);
        }
      });

    this.api.getAllLoanScheme(this.pageIndex, this.pageSize, this.sortKey, sort, likeQuery).subscribe(data => {
      //console.log("data1")
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
    this.drawerTitle = this.api.translate.instant('bankloanschemes.drawerTitle1');
    this.drawerData = new Bankloanscheme();
    this.drawerVisible = true;

    this.logtext = 'ADD - LoanScheme form KEYWORD [A - LoanScheme] ';
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
  edit(data: Bankloanscheme): void {

    this.drawerTitle = this.api.translate.instant('bankloanschemes.drawerTitle1');
    this.drawerData = Object.assign({}, data);
    this.drawerVisible = true;

    // if (this.drawerData.TYPE == "I") {
    //   this.drawerData.types = [{ label: 'Individual', value: 'I', checked: true },
    //   { label: 'Organization', value: 'O', checked: false }]
    // }
    // else if (this.drawerData.TYPE == "O") {
    //   this.drawerData.types = [{ label: 'Individual', value: 'I', checked: false },
    //   { label: 'Organization', value: 'O', checked: true }]
    // }
    // else if (this.drawerData.TYPE == "B") {
    //   this.drawerData.types = [{ label: 'Individual', value: 'I', checked: true },
    //   { label: 'Organization', value: 'O', checked: true }]
    // }


    this.logtext = 'EDIT - LoanScheme form KEYWORD [E - LoanScheme] ';
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