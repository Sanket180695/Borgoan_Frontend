import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { PrioritySection } from 'src/app/Models/PersonalProposal/priority-section';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-priority-sections',
  templateUrl: './priority-sections.component.html',
  styleUrls: ['./priority-sections.component.css']
})
export class PrioritySectionsComponent implements OnInit {
  formTitle = this.api.translate.instant('priority_sections.formTitle');
  pageIndex = 1;
  pageSize = 10;
  totalRecords = 1;
  dataList = [];
  loadingRecords = false;
  sortValue: string = "desc";
  sortKey: string = "id";
  searchText: string = "";
  filterQuery: string = "";
  isFilterApplied: string = "default";
  logtext: string = "";

  columns: string[][] = [

    ['NAME', this.api.translate.instant('industri_marking.NAME_title') + " (" + this.api.translate.instant('common.marathi') + ")"],
    ['NAME_EN', this.api.translate.instant('industri_marking.NAME_title') + " (" + this.api.translate.instant('common.english') + ")"],
    ['NAME_KN', this.api.translate.instant('industri_marking.NAME_title') + " (" + this.api.translate.instant('common.kannada') + ")"],

    ['CODE', this.api.translate.instant('industri_marking.CODE_title')]]

  //drawer Variables
  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: PrioritySection = new PrioritySection();
  constructor(private api: ApiService, private message: NzNotificationService) { }
  ngOnInit() {
    this.search();

    this.logtext = 'OPENED - PriorityCode form KEYWORD[O - PriorityCode] ';
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

      this.logtext = 'Filter Applied - PriorityCode form"+ sort +" "+this.sortKey +" KEYWORD [F - PriorityCode] ';
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

    this.logtext = 'Filter Applied - PriorityCode form "+ likeQuery +" KEYWORD [F - PriorityCode] ';
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          //console.log(successCode);
        }
        else {
          //console.log(successCode);
        }
      });

    this.api.getAllPriorityCodes(this.pageIndex, this.pageSize, this.sortKey, sort, likeQuery).subscribe(data => {
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
    this.drawerTitle = this.api.translate.instant('priority_sections.drawerTitle1');
    this.drawerData = new PrioritySection();
    this.drawerVisible = true;

    this.logtext = 'ADD - PriorityCode form KEYWORD [A - PriorityCode] ';
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
  edit(data: PrioritySection): void {

    this.drawerTitle = this.api.translate.instant('priority_sections.drawerTitle2');
    this.drawerData = Object.assign({}, data);
    this.drawerVisible = true;

    this.logtext = 'EDIT - PriorityCode form KEYWORD [E - PriorityCode] ';
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