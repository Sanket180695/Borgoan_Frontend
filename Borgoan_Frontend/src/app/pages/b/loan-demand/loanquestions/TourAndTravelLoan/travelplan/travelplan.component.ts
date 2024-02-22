import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import { TravelPlan } from 'src/app/Models/PersonalProposal/travels-loan-family-details';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from 'src/app/Service/api.service';
import { conformToMask } from 'angular2-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'

@Component({
  selector: 'app-travelplan',
  templateUrl: './travelplan.component.html',
  styleUrls: ['./travelplan.component.css']
})
export class TravelplanComponent implements OnInit {
  @Input() drawerClose2: Function;
  @Input() data: TravelPlan;
  @Input() isAgent: boolean;
  isSpinning = false
  logtext: string = "";
  pipe = new DatePipe('en-US');
  @Output() demo : EventEmitter<boolean> =
    new EventEmitter<boolean>();
    converted : any;
    public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
    autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')
  constructor(
    private message: NzNotificationService,private api: ApiService,private datePipe:DatePipe
  ) { }

  ngOnInit(): void {
  }

  disabledDate = (current) => {
    return new Date() > current;
  }

  close(): void {
    this.drawerClose2();

    //this.logtext = 'CLOSED - Work Orders form';
    // this.api.addLog('A', this.logtext, this.userId)
    //   .subscribe(successCode => {
    //     if (successCode['code'] == "200") {
    //       //console.log(successCode);
    //     }
    //     else {
    //       //console.log(successCode);
    //     }
    //   });

  }
  focusss3(event: KeyboardEvent){
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.TRAVEL_DATE = undefined;
    }
  }

  setValues() {
    this.data.TRAVELS_INSURENCE_DETAILS = '';
    this.data.MEANS_OF_TRAVELS = ' ';
    this.data.FROM_LOCATION = ' ';
    this.data.TO_LOCATION = ' ';
    this.data.TRAVEL_DATE = null;
    this.data.IS_TICKET_TAKEN = false;
  }

  save(addNew: boolean): void {

    var isOk = true;

     if (this.data.TRAVELS_INSURENCE_DETAILS == undefined || this.data.TRAVELS_INSURENCE_DETAILS.trim() == '') {
     
      this.data.TRAVELS_INSURENCE_DETAILS = ""
    }

    if (this.data.MEANS_OF_TRAVELS == undefined || this.data.MEANS_OF_TRAVELS == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('travelplan.message1'), "");
    }
    if (this.data.FROM_LOCATION == undefined || this.data.FROM_LOCATION.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('travelplan.message2'), "");
    }
    if (this.data.TO_LOCATION == undefined || this.data.TO_LOCATION.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('travelplan.message3'), "");
    }
    if (this.data.TRAVEL_DATE[0] >= 0 && this.data.TRAVEL_DATE[0] 
      <= 9 && this.data.TRAVEL_DATE[1] >= 0 
      && this.data.TRAVEL_DATE[1] <= 9 && 
      this.data.TRAVEL_DATE[3] >= 0 && this.data.TRAVEL_DATE[3] <= 9 && 
      this.data.TRAVEL_DATE[4] >= 0 && this.data.TRAVEL_DATE[4] <= 9 && 
      this.data.TRAVEL_DATE[9] >= 0 && this.data.TRAVEL_DATE[9] <= 9 && 
      this.data.TRAVEL_DATE[8] >= 0 && this.data.TRAVEL_DATE[8] <= 9 && 
      this.data.TRAVEL_DATE[7] >= 0 && this.data.TRAVEL_DATE[7] <= 9 && 
      this.data.TRAVEL_DATE[6] >= 0 && this.data.TRAVEL_DATE[6] <= 9) {
  
      var conformedPhoneNumber = conformToMask(
        this.data.TRAVEL_DATE,
        this.mask,
        { guide: false }
      )
      const str = conformedPhoneNumber.conformedValue.split('/');
  
      const year = Number(str[2]);
      const month = Number(str[1]) - 1;
      const dates = Number(str[0]);
  
      this.converted = new Date(year, month, dates)
  
  
      if (this.converted <= new Date()) {
        this.data.TRAVEL_DATE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
      } 
  }
  else {
    isOk = false;
    this.message.error(this.api.translate.instant('travelplan.message4'), "");
  }
  
    if (this.isAgent) {
      if (this.data.TICKET_AMOUNT == undefined || this.data.TICKET_AMOUNT == 0 || this.data.TICKET_AMOUNT.toString().trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('travelplan.message5'), "");
      }
    } else {
      this.data.TICKET_AMOUNT = 0;
    }

    if (isOk) {
      this.data.IS_TICKET_TAKEN?1:0
      this.demo.emit(false);
      this.setValues();
      if (!addNew)
        this.close();
    }


  }

}
