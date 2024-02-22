import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Termforloan } from 'src/app/Models/PersonalProposal/termforloan';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-term-for-loans',
  templateUrl: './term-for-loans.component.html',
  styleUrls: ['./term-for-loans.component.css']
})
export class TermForLoansComponent implements OnInit {
  formTitle = "Term For Loan"
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
   logtext:string = "";

  columns: string[][] = [["NAME", "Term For Loan"]]

  //drawer Variables
  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: Termforloan = new Termforloan();
  constructor(private api: ApiService,private message: NzNotificationService) { }
  ngOnInit() {
    this.search();

	this.logtext = 'OPENED - Incomeyears form KEYWORD[O - Incomeyears] ';
	this.api.addLog('A',this.logtext,this.api.emailId)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              // console.log(successCode);
            }
            else {
		 // console.log(successCode);
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
	
	this.logtext = 'Filter Applied - Incomeyears form"+ sort +" "+this.sortKey +" KEYWORD [F - Incomeyears] ';
	this.api.addLog('A',this.logtext,this.api.emailId)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              // console.log(successCode);
            }
            else {
		 // console.log(successCode);
            }
      });

    } catch (error) {
      sort = "";
    }
    console.log("search text:" + this.searchText);
    if (this.searchText != "") {
      var likeQuery = " AND";
      this.columns.forEach(column => {
        likeQuery += " " + column[0] + " like '%" + this.searchText + "%' OR";
      });
      likeQuery = likeQuery.substring(0, likeQuery.length - 2)
      console.log("likeQuery" + likeQuery);
    }

	this.logtext = 'Filter Applied - Incomeyears form "+ likeQuery +" KEYWORD [F - Incomeyears] ';
	this.api.addLog('A',this.logtext,this.api.emailId)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              // console.log(successCode);
            }
            else {
		 // console.log(successCode);
            }
      });

    this.api.getAllTermofLoan(this.pageIndex, this.pageSize, this.sortKey, sort, likeQuery).subscribe(data => {
      this.loadingRecords = false;
      this.totalRecords = data['count'];
      this.dataList = data['data'];
    }, err => {
      console.log(err);
    });
  }
  //Drawer Methods
  get closeCallback() {
    return this.drawerClose.bind(this);
  }
  add(): void {
    this.drawerTitle = this.api.translate.instant('termforloan.drawerTitle1') ;
    this.drawerData = new  Termforloan();
    this.drawerVisible = true;

	this.logtext = 'ADD - Incomeyear form KEYWORD [A - Incomeyear] ';
	this.api.addLog('A',this.logtext,this.api.emailId)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              // console.log(successCode);
            }
            else {
		 // console.log(successCode);
            }
      });

  }
  edit(data:  Termforloan): void {

    this.drawerTitle = this.api.translate.instant('termforloan.drawerTitle2') ;
    this.drawerData = Object.assign({}, data);
    this.drawerVisible = true;

	this.logtext = 'EDIT - Incomeyear form KEYWORD [E - Incomeyear] ';
	this.api.addLog('A',this.logtext,this.api.emailId)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              // console.log(successCode);
            }
            else {
		 // console.log(successCode);
            }
          });


  }
  drawerClose(): void {
    this.search();
    this.drawerVisible = false;
  }

}
