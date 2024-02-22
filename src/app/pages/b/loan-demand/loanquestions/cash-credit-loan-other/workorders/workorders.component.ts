import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import { WorkOrders } from 'src/app/Models/PersonalProposal/work-orders';
import { ApiService } from 'src/app/Service/api.service';
import { conformToMask } from 'angular2-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'
@Component({
  selector: 'app-workorders',
  templateUrl: './workorders.component.html',
  styleUrls: ['./workorders.component.css']
})
export class WorkordersComponent implements OnInit {
  @Input() drawerClose: Function;
  @Input() data: WorkOrders;
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
    return new Date() < current;
  }

  disabledDate2 = (current) => {
    return new Date(this.data.START_DATE) > current;
  }
  close(): void {
    this.drawerClose();

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
  focusss1(event: KeyboardEvent)
  {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.START_DATE = undefined;
    }
  }
  focusss2(event: KeyboardEvent)
  {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.END_DATE = undefined;
    }
  }
  setValues() {
    this.data.AMOUNT_OF_WORK_ORDER = 0;
    this.data.NAME_OF_ORGANIZATION_OR_PERSON = '';
    this.data.START_DATE = '';
    this.data.END_DATE = '';
  }

  save(addNew: boolean): void {
    var isOk=true
    if (this.data.START_DATE[0] >= 0 && this.data.START_DATE[0] 
      <= 9 && this.data.START_DATE[1] >= 0 
      && this.data.START_DATE[1] <= 9 && 
      this.data.START_DATE[3] >= 0 && this.data.START_DATE[3] <= 9 && 
      this.data.START_DATE[4] >= 0 && this.data.START_DATE[4] <= 9 && 
      this.data.START_DATE[9] >= 0 && this.data.START_DATE[9] <= 9 && 
      this.data.START_DATE[8] >= 0 && this.data.START_DATE[8] <= 9 && 
      this.data.START_DATE[7] >= 0 && this.data.START_DATE[7] <= 9 && 
      this.data.START_DATE[6] >= 0 && this.data.START_DATE[6] <= 9) {
  
      var conformedPhoneNumber = conformToMask(
        this.data.START_DATE,
        this.mask,
        { guide: false }
      )
      const str = conformedPhoneNumber.conformedValue.split('/');
  
      const year = Number(str[2]);
      const month = Number(str[1]) - 1;
      const dates = Number(str[0]);
  
      this.converted = new Date(year, month, dates)
  
  
      if (this.converted <= new Date()) {
        this.data.START_DATE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
      } 
  }
  else {
    isOk=false
    this.message.error('Invalid Start Date','')
  }
  

  if (this.data.END_DATE[0] >= 0 && this.data.END_DATE[0] 
    <= 9 && this.data.END_DATE[1] >= 0 
    && this.data.END_DATE[1] <= 9 && 
    this.data.END_DATE[3] >= 0 && this.data.END_DATE[3] <= 9 && 
    this.data.END_DATE[4] >= 0 && this.data.END_DATE[4] <= 9 && 
    this.data.END_DATE[9] >= 0 && this.data.END_DATE[9] <= 9 && 
    this.data.END_DATE[8] >= 0 && this.data.END_DATE[8] <= 9 && 
    this.data.END_DATE[7] >= 0 && this.data.END_DATE[7] <= 9 && 
    this.data.END_DATE[6] >= 0 && this.data.END_DATE[6] <= 9) {

    var conformedPhoneNumber = conformToMask(
      this.data.END_DATE,
      this.mask,
      { guide: false }
    )
    const str = conformedPhoneNumber.conformedValue.split('/');

    const year = Number(str[2]);
    const month = Number(str[1]) - 1;
    const dates = Number(str[0]);

    this.converted = new Date(year, month, dates)


    if (this.converted <= new Date()) {
      this.data.END_DATE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
    } 
}
else {
  isOk = false;

  this.message.error('Invalid End  Date','')
}

if(isOk){

  if (this.data.NAME_OF_ORGANIZATION_OR_PERSON != undefined && this.data.AMOUNT_OF_WORK_ORDER != undefined && this.data.START_DATE != undefined
    && this.data.END_DATE != undefined) {

    if (this.data.AMOUNT_OF_WORK_ORDER == 0 || this.data.AMOUNT_OF_WORK_ORDER.toString().trim() == "") {
      this.message.error(this.api.translate.instant('workorders.message1'), "");
    } else {
      if (this.data.NAME_OF_ORGANIZATION_OR_PERSON.toString().trim() == "") {
        this.message.error(this.api.translate.instant('workorders.message2'), "");
      } else {
        // if (this.data.START_DATE !== '' && this.data.END_DATE !== '') {
        //   this.data.END_DATE = this.pipe.transform(this.data.END_DATE, 'yyyy-MM-dd');
        //   this.data.START_DATE = this.pipe.transform(this.data.START_DATE, 'yyyy-MM-dd');
          this.demo.emit(false);
          this.setValues();
          if (!addNew)
          this.close();

      //  } else {
      //     this.message.error(this.api.translate.instant('workorders.message3'), "");
      //   }
      }
    }
  }
  else {
    this.message.error(this.api.translate.instant('common.message.error.emptyinfo'), "");
  }

}





   
  }

}
