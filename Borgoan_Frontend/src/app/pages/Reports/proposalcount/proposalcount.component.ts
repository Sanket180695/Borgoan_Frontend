import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { Proposalstage } from 'src/app/Models/BasicForms/proposalstage';
import { Scheduler } from 'src/app/Models/scheduler';
import { ApiService } from 'src/app/Service/api.service';
import { ScheduleComponent } from '../schedule/schedule.component';

import { conformToMask } from 'angular2-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'

@Component({
  selector: 'app-proposalcount',
  templateUrl: './proposalcount.component.html',
  styleUrls: ['./proposalcount.component.css'],
  providers: [DatePipe]
})
export class ProposalcountComponent implements OnInit {
  converted: any;
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')

  datePipe = new DatePipe("en-US");
  pageIndex = 1;
  pageSize = 10;
  totalRecords = 1;
  totalRecords2 = 0;
  dataList = [];
  dataList1 = [];
  loadingRecords = false;
  sortValue: string = "desc";
  sortKey: string = "id";
  searchText: string = "";
  filterQuery: string = "";
  isFilterApplied: string = "default";
  logtext: string = "";

  isFiterSpinning = false;
  exportbutton = false;
  columns: string[][] = [['NAME_MR', this.api.translate.instant('branch.label2.Name')], ['TOTAL', 'Total']]
  usertype = 'A';

  //drawer Variables
  filterClass: string = "filter-visible";
  selectedDate: Date[] = []
  userActivityLogData: Useractivitylog = new Useractivitylog();
  value1: string = ""
  value2: string = ""

  dateFormat = 'dd/MM/yyyy';
  isSpinning2 = false
  loadingProposalStages = false
  proposalStages: Proposalstage[]
  PROPOSAL_STAGE_ID = []
  isLoanSpinning = false
  isSpinning: boolean
  browserLang = ''
  loantypes = []
  //drawer Variables
  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: Scheduler = new Scheduler();
  @ViewChild(ScheduleComponent) scheduler: ScheduleComponent;
  data: Scheduler = new Scheduler();
  users = []
  dates = [];
  isShow = false
  dates1 = [];
  dates2 = [];
  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit() {
    for (var i = 0; i < 31; i++) {
      this.dates[i] = i;
    }
    for (var i = 0; i < 24; i++) {
      if (i < 10)
        this.dates1[i] = "0" + i;
      else
        this.dates1[i] = i;
    }
    for (var i = 0; i < 60; i++) {
      if (i < 10)
        this.dates2[i] = "0" + i;
      else
        this.dates2[i] = i;
    }
    this.api.getAllUsers(0, 0, 'id', 'asc', '').subscribe(data => {
      this.users = data['data'];
    }, err => { });

    this.selectedDate = [new Date(), new Date()]
    this.changeDate(this.selectedDate)
    this.browserLang = localStorage.getItem('locale');
    if (this.browserLang == 'mr') {
      this.columns = [['NAME_MR', this.api.translate.instant('branch.label2.Name')]]
    } else if (this.browserLang == 'en') {
      this.columns = [['NAME_EN', this.api.translate.instant('branch.label2.Name')]]
    } else {
      this.columns = [['NAME_KN', this.api.translate.instant('branch.label2.Name')]]
    }
    this.search();
    this.logtext = "OPENED - Branch wise stage wise count form KEYWORD[O - Enquiries] ";
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {

        }
        else {

        }
      });

    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "Branch wise stage wise count  - Opened"
    this.userActivityLogData.ACTIVITY_TIME = new Date()
    this.api.createUserActivityLog(this.userActivityLogData)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {

        }
        else {

        }
      });
    this.loadProposalStage()
  }

  showFilter() {
    if (this.filterClass === "filter-visible")
      this.filterClass = "filter-invisible";
    else
      this.filterClass = "filter-visible";
  }

  loadProposalStage() {

    this.api.getAllLoanScheme(0, 0, 'ID', 'asc', ' AND IS_ACTIVE = 1').subscribe(data => {
      if (data['code'] == "200") {
        this.loantypes = data['data'];
        for (var i = 0; i < this.loantypes.length; i++) {
          if (this.browserLang == 'mr') {
            this.columns.push(['LOAN_TYPE_' + (i + 1), this.loantypes[i].NAME_MR]);
          } else if (this.browserLang == 'en') {
            this.columns.push(['LOAN_TYPE_' + (i + 1), this.loantypes[i].NAME_EN]);
          } else {
            this.columns.push(['LOAN_TYPE_' + (i + 1), this.loantypes[i].NAME_KN]);
          }

          if (i == (this.loantypes.length - 1)) {
            this.columns.push(['TOTAL', this.api.translate.instant('balance-sheet.field27')])
          }
        }
      }

    }, err => {
    });

    this.loadingProposalStages = true;
    let filter = "AND STATUS=1"
    this.api.getAllProposalStages(0, 0, 'SEQUENCE_NUMBER', 'asc', filter).subscribe(localName => {
      this.proposalStages = localName['data'];
      this.loadingProposalStages = false;
    }, err => {
      ////console.log(err);
      this.loadingProposalStages = false;
    });
  }

  getStagename(id) {
    //console.log(id)
    if (id != null && id != 0 && this.proposalStages.length > 0) {
      var dist = this.proposalStages.filter((item) => item.ID == id);
      if (dist[0] == undefined) {
        return "";
      } else {
        return dist[0].NAME_MR;
      }

    } else {
      return "";
    }
  }

  clearFilter() {
    this.PROPOSAL_STAGE_ID = [];
    this.filterQuery = ""
    this.selectedDate = null
    this.filterClass = "filter-invisible";
    this.search(true)
  }

  changeDate(value) {
    this.value1 = this.datePipe.transform(value[0], "yyyy-MM-dd")
    this.value2 = this.datePipe.transform(value[1], "yyyy-MM-dd")
  }

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
    this.isSpinning = true
    var sort: string;
    try {
      sort = this.sortValue.startsWith("a") ? "asc" : "desc";

      this.logtext = "Filter Applied - Branch wise stage wise count  form" + sort + " " + this.sortKey + " KEYWORD [F - Praposals] ";
      this.api.addLog('A', this.logtext, this.api.emailId)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {

          }
          else {

          }
        });
      this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
      this.userActivityLogData.ACTIVITY_DETAILS = "Branchwisestagewisecount  - Sort on " + sort + " " + this.sortKey
      this.userActivityLogData.ACTIVITY_TIME = new Date()
      this.api.createUserActivityLog(this.userActivityLogData)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {

          }
          else {

          }
        });

    } catch (error) {
      sort = "";
    }
    var likeQuery = ""
    //console.log("search text:" + this.searchText);
    if (this.searchText != "") {
      likeQuery = " AND (";

      this.columns.forEach(column => {
        likeQuery += " " + column[0] + " like '%" + this.searchText + "%' OR";
      });
      likeQuery = likeQuery.substring(0, likeQuery.length - 2) + ")"
    }


    var filter = ""

    if (likeQuery)
      filter = this.filterQuery + likeQuery
    else
      filter = this.filterQuery

    this.logtext = "Filter Applied - Branch wise stage wise count  form " + likeQuery + " KEYWORD [F - Praposals] ";
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {

        }
        else {

        }
      });

    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "Branchwisestagewisecount  - Search For " + this.searchText + " " + likeQuery
    this.userActivityLogData.ACTIVITY_TIME = new Date()
    this.api.createUserActivityLog(this.userActivityLogData)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {

        }
        else {

        }
      });


    this.dataList = []
    this.exportbutton = false
    this.api.getBranchProposalcount(this.value1, this.value2, this.PROPOSAL_STAGE_ID.toString()).subscribe(data => {
      this.loadingRecords = false;
      this.isSpinning = false
      if (data['code'] == 200) {
        this.totalRecords = data['count'];
        this.dataList = data['data'];
        this.filterClass = "filter-invisible";
        this.isFilterApplied = "primary"
      }
    }, err => {
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });

  }

  searchSet() {
    document.getElementById('button1').focus();
    this.search(true)
  }

  applyfilter() {

    this.search()
  }

  frequencyChange(value) {
    this.data.FREQUENCY = value

    this.data.REPEAT_DATA = undefined
  }
  showScheduler() {
    this.data = new Scheduler()
    this.isShow = true;
  }
  //Drawer Methods
  get closeCallback() {
    return this.drawerClose.bind(this);
  }
  settings(): void {

    this.drawerTitle = 'Schedule Report';
    this.drawerVisible = true;
    this.drawerData = new Scheduler()
    this.drawerData.REPORT_ID = 1
    this.scheduler.search();
  }

  drawerClose(): void {

    this.drawerVisible = false;
  }

  save(): void {
    var IsOk = true;

    if (this.data.REPEAT_TIME == undefined || this.data.REPEAT_TIME == '') {
      IsOk = false;
      this.message.error('Repeat Time required', "");
    }
    if (this.data.EMAIL_IDS == undefined || this.data.EMAIL_IDS == []) {
      IsOk = false;
      this.message.error('Select Users', "");
    }
    if (this.data.FREQUENCY != "D" && (this.data.REPEAT_DATA == undefined || this.data.REPEAT_DATA == '')) {
      IsOk = false;
      this.message.error('Select Repeate Days', "");
    }
    // if (this.PROPOSAL_STAGE_ID == []) {
    //   IsOk = false;
    //   this.message.error('Select Filter Dates', "");
    // }
    if (IsOk) {
      this.data.REPORT_ID = 1
      this.data.STATUS = 'A'
      if (this.data.FREQUENCY == "Y") {
        if (this.data.REPEAT_DATA[0] >= 0 && this.data.REPEAT_DATA[0] <= 9 && this.data.REPEAT_DATA[1] >= 0 && this.data.REPEAT_DATA[1] <= 9 && this.data.REPEAT_DATA[3] >= 0 && this.data.REPEAT_DATA[3] <= 9 && this.data.REPEAT_DATA[4] >= 0 && this.data.REPEAT_DATA[4] <= 9 && this.data.REPEAT_DATA[9] >= 0 && this.data.REPEAT_DATA[9] <= 9 && this.data.REPEAT_DATA[8] >= 0 && this.data.REPEAT_DATA[8] <= 9 && this.data.REPEAT_DATA[7] >= 0 && this.data.REPEAT_DATA[7] <= 9 && this.data.REPEAT_DATA[6] >= 0 && this.data.REPEAT_DATA[6] <= 9) {

          var conformedPhoneNumber = conformToMask(
            this.data.REPEAT_DATA,
            this.mask,
            { guide: false }
          )
          const str = conformedPhoneNumber.conformedValue.split('/');

          const year = Number(str[2]);
          const month = Number(str[1]) - 1;
          const dates = Number(str[0]);

          this.converted = new Date(year, month, dates);
          // this.data.REPEAT_DATA = this.datePipe.transform(this.converted, 'yyyy-MM-dd');

          this.data.REPEAT_DATA = this.datePipe.transform(this.data.REPEAT_DATA, "MM-dd")


        }
      }
      this.data.REPEAT_TIME = this.data.REPEAT_TIME1 + ":" + this.data.REPEAT_TIME2 + ":00"
      if (this.data.FREQUENCY == "D") {
        this.data.REPEAT_DATA = this.data.REPEAT_TIME
      }
      if (this.data.FREQUENCY == "M" || this.data.FREQUENCY == "W") {
        this.data.REPEAT_DATA = this.data.REPEAT_DATA.toString()
      }
      this.data.EMAIL_IDS = this.data.EMAIL_IDS.toString();
      this.isSpinning2 = true;
      this.data.PARAMETERS = JSON.stringify(
        {
          FROM_DATE: this.value1,
          TO_DATE: this.value2,
          LOAN_TYPES: this.PROPOSAL_STAGE_ID.toString()
        }
      )
      this.isSpinning2 = true
      // if (this.data.ID) {
      //   this.api.updateScheduler(this.data)
      //     .subscribe(successCode => {
      //       if (successCode['code'] == "200") {
      //         this.message.success('Successfully Updated', "");
      //         // if (!addNew)
      //         //   this.drawerClose();
      //         this.isSpinning2 = false;
      //         this.isShow = false
      //       }
      //       else {
      //         this.message.error('Failed To Update', "");
      //         this.isSpinning2 = false;
      //       }
      //     });
      // }
      // else {
      this.api.createScheduler2(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success('Successfully Saved', "");
            // if (!addNew)
            //   this.drawerClose();
            // else {
            this.data = new Scheduler();
            // }
            this.isShow = false
            this.isSpinning2 = false;
          }
          else {
            this.message.error('Failed To Save', "");
            this.isSpinning2 = false;
          }
        });
      // }
    }
  }
}



