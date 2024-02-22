import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Scheduler } from 'src/app/Models/scheduler';
import { ApiService } from 'src/app/Service/api.service';
import { conformToMask } from 'angular2-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  providers: [DatePipe]
})
export class ScheduleComponent implements OnInit {
  datePipe = new DatePipe("en-US");
  @Input() drawerClose: Function;
  @Input() data: Scheduler;

  isSpinning = false
  logtext: string = "";
  users = []
  browserLang = '';
  dates = [];
  dates1 = [];
  dates2 = [];
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

  dataList1 = []

  converted: any;
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')

  columns: string[][] = [['REPEAT_TIME', 'Schedule Time'], ['REPEAT_DATA', 'Repeat Days'], ['EMAIL_IDS', 'Users']]
  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {
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
    this.browserLang = localStorage.getItem('locale');

    this.api.getAllUsers(0, 0, 'id', 'asc', '').subscribe(data => {
      this.users = data['data'];
    }, err => { });
  }
  frequencyChange(value) {
    this.data.FREQUENCY = value

    this.data.REPEAT_DATA = undefined
  }

  sort(sort: { key: string; value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;
    this.search(true);

  }
  edit(data) {
    this.data = Object.assign({}, data);

    var timeArr = this.data.REPEAT_TIME.split(':');
    //console.log(timeArr)
    this.data.REPEAT_TIME1 = timeArr[0]
    this.data.REPEAT_TIME2 = timeArr[1]
    this.data.EMAIL_IDS = this.data.EMAIL_IDS.split(',');

    if (this.data.FREQUENCY == "W" || this.data.FREQUENCY == "M") {
      this.data.REPEAT_DATA = this.data.REPEAT_DATA
      this.data.REPEAT_DATA = this.datePipe.transform(data.REPEAT_DATA, 'dd/MM/yyyy');
    }


  }
  search(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    var sort = this.sortValue.startsWith("a") ? "asc" : "desc";
    this.loadingRecords = true;
    this.isSpinning = true

    this.api.getScheduler(this.pageIndex, this.pageSize, this.sortKey, sort, ' AND REPORT_ID = "1" AND USER_ID = ' + Number(sessionStorage.getItem('userId'))).subscribe(data => {
      this.loadingRecords = false;
      this.isSpinning = false
      if (data['code'] == "200") {
        this.dataList = data['data']
        this.totalRecords = data['count'];

      }
    }, err => {
      ////console.log(err);
    });
  }

  close(): void {
    this.drawerClose();
  }
  setdata(data: any) {

  }
  save(): void {
    var IsOk = true;

    if (this.data.REPEAT_TIME1 == undefined || this.data.REPEAT_TIME2 == undefined || this.data.REPEAT_TIME1 == '' || this.data.REPEAT_TIME2 == '') {
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
    } else {
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
        this.data.REPEAT_DATA = this.datePipe.transform(this.converted, 'yyyy-MM-dd');


      }

    }

    if (IsOk) {

      if (this.data.FREQUENCY == "Y") {
        this.data.REPEAT_DATA = this.datePipe.transform(this.data.REPEAT_DATA, "MM-dd")
      }
      this.data.REPEAT_TIME = this.data.REPEAT_TIME1 + ":" + this.data.REPEAT_TIME2 + ":00"
      if (this.data.FREQUENCY == "D") {
        this.data.REPEAT_DATA = this.data.REPEAT_TIME
      }

      this.data.EMAIL_IDS = this.data.EMAIL_IDS.toString();
      this.isSpinning = true;

      if (this.data.ID) {
        this.api.updateScheduler(this.data)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('user.message1'), "");

              this.isSpinning = false;
              this.search()
              this.data = new Scheduler();
            }
            else {
              this.message.error(this.api.translate.instant('user.message2'), "");
              this.isSpinning = false;
            }
          });
      }
      else {
        this.message.error('Please Select From List To Update', "");
        //   this.api.createScheduler(this.data)
        //     .subscribe(successCode => {
        //       if (successCode['code'] == "200") {
        //         this.message.success(this.api.translate.instant('user.message3'), "");
        //         if (!addNew)
        //           this.drawerClose();
        //         else {
        //           this.data = new Scheduler();
        //         }
        //         this.isSpinning = false;
        //       }
        //       else {
        //         this.message.error(this.api.translate.instant('user.message4'), "");
        //         this.isSpinning = false;
        //       }
        //     });
      }
    }
  }

}
