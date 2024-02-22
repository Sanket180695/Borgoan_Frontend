import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { DatePipe } from '@angular/common';
import { TRAVELSLOANFAMILYDETAILS, TravelPlan } from 'src/app/Models/PersonalProposal/travels-loan-family-details';
import { TourAndTravelLoan } from 'src/app/Models/PersonalProposal/tour-and-travel-loan';
import { ApiService } from 'src/app/Service/api.service';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';

@Component({
  selector: 'app-tour-and-travel-loan',
  templateUrl: './tour-and-travel-loan.component.html',
  styleUrls: ['./tour-and-travel-loan.component.css']
})
export class TourAndTravelLoanComponent implements OnInit {
  index = -1;
  pageIndex = 0;
  pageSize = 0;
  totalRecords = 1;
  dataList = [];
  dataListss = [];
  loadingRecords = false;
  isAgent = false
  sortValue: string = "desc";
  sortKey: string = "id";
  filterQuery: string = "";
  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: TRAVELSLOANFAMILYDETAILS = new TRAVELSLOANFAMILYDETAILS();
  @Input() PROPOSAL_ID: number
  data: TourAndTravelLoan = new TourAndTravelLoan();
  isSpinning = false
  isButtonSpinning = false
  logtext: string = "";
  pipe = new DatePipe('en-US');
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();
  drawerTitle2: string;
  drawerData2: TravelPlan = new TravelPlan();
  drawerVisible2: boolean;
  indexs: number = -1;
  @Output() demo : EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() CURRENT_STAGE_ID: number;  
  @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  constructor(private api: ApiService, private message: NzNotificationService) {
  }

  ngOnInit() {

    this.getdata();
  }

  getdata() {
    this.isSpinning = true;
    this.api.getAllToursAndTravelLoan(0, 0, 'ID', "asc", "AND PROPOSAL_ID=" + this.PROPOSAL_ID).subscribe(data => {
      this.isSpinning = false;
      
      if (data['code'] == '200' && data['count'] > 0) {

        this.data = data['data'][0];
        if (this.data.IS_TRAVELLING_SELF_OR_TRAVELLING_AGENCY == "S") {
          this.isAgent = true
        } else {
          this.isAgent = false
        }
        this.api.getAllForeignTravelFamilyDetail(this.pageIndex, this.pageSize, this.sortKey, this.sortValue, "AND TOUR_AND_TRAVELS_LOAN_ID=" + this.data.ID).subscribe(data1 => {
          this.loadingRecords = false;
          this.totalRecords = data1['count'];
          if (data1['code'] == '200' && data1['count'] > 0) {
            this.dataList = data1['data'];
          }
        }, err => {
          //console.log(err);
        });
        this.api.getAllTravellingDetailsInformation(this.pageIndex, this.pageSize, this.sortKey, this.sortValue, "AND TOUR_AND_TRAVELS_LOAN_ID=" + this.data.ID).subscribe(data1 => {
          this.loadingRecords = false;
          this.totalRecords = data1['count'];
          if (data1['code'] == '200' && data1['count'] > 0) {
            this.dataListss = data1['data'];
          }
        }, err => {
          //console.log(err);
        });
      }
    }, err => {
      //console.log(err);
    });
  }

  disabledDate = (current) => {
    return new Date() > current;
  }
  disabledDate2 = (current) => {
    return new Date(this.data.TRAVELLING_START_DATE) > current;
  }
  //Drawer Methods
  get closeCallback() {
    return this.drawerClose.bind(this);
  }
  get closeCallback2() {
    return this.drawerClose2.bind(this);
  }
  focusss(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.TRAVELLING_START_DATE = undefined;
    }
  }
  focusss2(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.TRAVELLING_RETURN_DATE = undefined;
    }
  }
  focusss3(event: KeyboardEvent) {
    // const key = event.key;
    // if (key === "Backspace" || key === "Delete") {
    //   this.data.TRAVEL_DATE = undefined;
    // }
  }
  agentorTravel(){
  if (this.data.IS_TRAVELLING_SELF_OR_TRAVELLING_AGENCY == "S") {
    this.isAgent = true
  } else {
    this.isAgent = false
  }
}
  add(): void {
    this.drawerTitle = this.api.translate.instant('tour-and-travel-loan.title1');
    this.drawerData = new TRAVELSLOANFAMILYDETAILS();
    this.drawerVisible = true;
    // this.logtext = 'ADD - TRAVELSLOANFAMILYDETAILS form KEYWORD [A - TRAVELSLOANFAMILYDETAILS] ';
    // this.api.addLog('A',this.logtext,this.api.emailId)
    //         .subscribe(successCode => {
    //           if (successCode['code'] == "200") {
    //            //console.log(successCode);
    //           }
    //           else {
    // 	//console.log(successCode);
    //           }
    //     });

  }

  edit(data: TRAVELSLOANFAMILYDETAILS, i: number): void {
    this.index = i;
    this.drawerTitle = this.api.translate.instant('tour-and-travel-loan.title2');
    this.drawerData = Object.assign({}, data);
    this.drawerVisible = true;

    // this.logtext = 'EDIT - TRAVELSLOANFAMILYDETAILS form KEYWORD [E - TRAVELSLOANFAMILYDETAILS] ';
    // this.api.addLog('A',this.logtext,this.api.emailId)
    //         .subscribe(successCode => {
    //           if (successCode['code'] == "200") {
    //            //console.log(successCode);
    //           }
    //           else {
    // 	//console.log(successCode);
    //           }
    //         });
  }

  drawerClose(): void {
    this.index = -1;
    this.drawerVisible = false;
  }

  saveWorkdata(): void {
    if (this.index > -1) {

      this.drawerData.IS_TAKEN_INSURANCE = this.drawerData.IS_TAKEN_INSURANCE ? 1 : 0
      this.dataList[this.index] = Object.assign({}, this.drawerData);
    } else {
      this.drawerData.IS_TAKEN_INSURANCE = this.drawerData.IS_TAKEN_INSURANCE ? 1 : 0
      this.dataList.push(Object.assign({}, this.drawerData));
    }
    this.dataList = [...this.dataList];
    this.index = -1;
  }

  add2(): void {
    this.drawerTitle2 = this.api.translate.instant('tour-and-travel-loan.title3');
    this.drawerData2 = new TravelPlan();
    this.drawerVisible2 = true;
    if (this.data.IS_TRAVELLING_SELF_OR_TRAVELLING_AGENCY == "S") {
      this.isAgent = true
    } else {
      this.isAgent = false
    }
    // this.logtext = 'ADD - TRAVELSLOANFAMILYDETAILS form KEYWORD [A - TRAVELSLOANFAMILYDETAILS] ';
    // this.api.addLog('A',this.logtext,this.api.emailId)
    //         .subscribe(successCode => {
    //           if (successCode['code'] == "200") {
    //            //console.log(successCode);
    //           }
    //           else {
    // 	//console.log(successCode);
    //           }
    //     });

  }

  edit2(data: TravelPlan, i: number): void {
    this.indexs = i;
    this.drawerTitle2 = this.api.translate.instant('tour-and-travel-loan.title4');
    this.drawerData2 = Object.assign({}, data);
    this.drawerVisible2 = true;
    if (this.data.IS_TRAVELLING_SELF_OR_TRAVELLING_AGENCY == "S") {
      this.isAgent = true
    } else {
      this.isAgent = false
    }
    // this.logtext = 'EDIT - TRAVELSLOANFAMILYDETAILS form KEYWORD [E - TRAVELSLOANFAMILYDETAILS] ';
    // this.api.addLog('A',this.logtext,this.api.emailId)
    //         .subscribe(successCode => {
    //           if (successCode['code'] == "200") {
    //            //console.log(successCode);
    //           }
    //           else {
    // 	//console.log(successCode);
    //           }
    //         });
  }

  drawerClose2(): void {
    this.indexs = -1;
    this.drawerVisible2 = false;
  }

  saveWorkdata2(): void {
    if (this.indexs > -1) {

      this.drawerData2.IS_TICKET_TAKEN = this.drawerData2.IS_TICKET_TAKEN ? 1 : 0
      this.dataListss[this.indexs] = Object.assign({}, this.drawerData2);
    } else {
      this.drawerData2.IS_TICKET_TAKEN = this.drawerData2.IS_TICKET_TAKEN ? 1 : 0
      this.dataListss.push(Object.assign({}, this.drawerData2));
    }
    this.dataListss = [...this.dataListss];
    this.indexs = -1;
  }

  save(): void {
    var isOk = true;

    if (this.data.TOTAL_FAMILY_MEMBERS_TO_TRAVELS == undefined || this.data.TOTAL_FAMILY_MEMBERS_TO_TRAVELS == 0) {
      isOk = false;
      this.message.error(this.api.translate.instant('tour-and-travel-loan.message1'), "");
    }
    if (this.data.TRAVELLING_PLACE_NAME == undefined || this.data.TRAVELLING_PLACE_NAME.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('tour-and-travel-loan.message2'), "");
    }
    if (this.data.TRAVELING_PLACE == undefined || this.data.TRAVELING_PLACE.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('tour-and-travel-loan.message3'), "");
    }

    if (this.data.TRAVELLING_TIME == undefined || this.data.TRAVELLING_TIME == 0) {
      isOk = false;
      this.message.error(this.api.translate.instant('tour-and-travel-loan.message4'), "");
    }

    if (this.data.TRAVELLING_START_DATE == undefined || this.data.TRAVELLING_START_DATE == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('tour-and-travel-loan.message5'), "");
    } else {
      this.data.TRAVELLING_START_DATE = this.pipe.transform(this.data.TRAVELLING_START_DATE, 'yyyy-MM-dd');
    }

    if (this.data.TRAVELLING_RETURN_DATE == undefined || this.data.TRAVELLING_RETURN_DATE == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('tour-and-travel-loan.message6'), "");
    } else {
      this.data.TRAVELLING_RETURN_DATE = this.pipe.transform(this.data.TRAVELLING_RETURN_DATE, 'yyyy-MM-dd');
    }



    if (this.data.IS_TRAVELLING_SELF_OR_TRAVELLING_AGENCY == 'A') {
      if (this.data.TRAVEL_AGENCY_NAME == undefined || this.data.TRAVEL_AGENCY_NAME.trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('tour-and-travel-loan.message7'), "");
      }

      if (this.data.TRAVEL_AGENCY_QUOTATION_AMOUNT == undefined || this.data.TRAVEL_AGENCY_QUOTATION_AMOUNT == 0) {
        isOk = false;
        this.message.error(this.api.translate.instant('tour-and-travel-loan.message8'), "");
      }
      if (this.data.IS_GIVE_ADVANCE_AMOUNT_TO_TRAVEL_AGENCY) {
        if (this.data.ADVANCE_AMOUNT == undefined || this.data.ADVANCE_AMOUNT == 0) {
          isOk = false;
          this.message.error(this.api.translate.instant('tour-and-travel-loan.message9'), "");
        }
      }
    } else {
      this.data.TRAVEL_AGENCY_NAME = " ";
      this.data.TRAVEL_AGENCY_QUOTATION_AMOUNT = 0;
      this.data.IS_GIVE_ADVANCE_AMOUNT_TO_TRAVEL_AGENCY = false;
      this.data.ADVANCE_AMOUNT = 0;

    }

    if (this.data.TRAVELING_PLACE == "F") {
      if (this.dataList.length == 0) {
        isOk = false;
        this.message.error(this.api.translate.instant('tour-and-travel-loan.message10'), "");
      }
    }
    if (this.dataListss == [] || this.dataListss.length == 0) {
      isOk = false;
      this.message.error(this.api.translate.instant('tour-and-travel-loan.message11'), "");
    }

    if (isOk) {
      this.data.PROPOSAL_ID = this.PROPOSAL_ID;
      this.isButtonSpinning = true;
      this.nextProcess();
      if (this.data.IS_GIVE_ADVANCE_AMOUNT_TO_TRAVEL_AGENCY) {
        this.data.IS_GIVE_ADVANCE_AMOUNT_TO_TRAVEL_AGENCY = 1
      } else {
        this.data.IS_GIVE_ADVANCE_AMOUNT_TO_TRAVEL_AGENCY = 0
      }
    }
  }

  nextProcess() {
    this.dataList.forEach((item, index) => {
      this.dataList[index].CLIENT_ID = 1;
    });
    this.data['TOURS_DETAILS'] = this.dataList;

    this.dataListss.forEach((item, index) => {
      this.dataListss[index].CLIENT_ID = 1;
    });
    this.data['TRAVELLING_DETAILS_INFORMATION'] = this.dataListss;

    this.api.createToursAndTravelLoanBUlk(this.data)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          this.indexChanged.emit(1)

          this.message.success(this.api.translate.instant('common.message.success.addinfo2'), "");

          this.logtext = 'Update & Close - TourAndTravel form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - TourAndTravel ]";
          this.api.addLog('A', this.logtext, this.api.emailId)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                //console.log(successCode);
              }
              else {
                //console.log(successCode);
              }
            });
          this.getdata();
          this.demo.emit(false)
          this.isButtonSpinning = false;
        }
        else {
          this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
          this.isButtonSpinning = false;
        }
      });
  }

}

