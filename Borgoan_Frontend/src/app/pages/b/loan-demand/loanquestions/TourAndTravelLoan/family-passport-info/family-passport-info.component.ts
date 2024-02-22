import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import { TRAVELSLOANFAMILYDETAILS } from 'src/app/Models/PersonalProposal/travels-loan-family-details';
import { ApiService } from 'src/app/Service/api.service';

import { conformToMask } from 'angular2-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'

@Component({
  selector: 'app-family-passport-info',
  templateUrl: './family-passport-info.component.html',
  styleUrls: ['./family-passport-info.component.css']
})
export class FamilyPassportInfoComponent implements OnInit {
  @Input() drawerClose: Function;
  @Input() data: TRAVELSLOANFAMILYDETAILS;
  isSpinning = false
  logtext: string = "";
  pipe = new DatePipe('en-US');
  @Output() demo : EventEmitter<boolean> =
    new EventEmitter<boolean>();

    converted : any;
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')
  constructor(
    private message: NzNotificationService,private api: ApiService,
    private datePipe:DatePipe
  ) { }

  ngOnInit(): void {
  }

  disabledDate = (current) => {
    return new Date() > current;
  }

  disabledDate2 = (current) => {
    return new Date() > current;
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
  focusss(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.PASSPORT_VALIDITY_DATE = undefined;
    }
  }
  focusss2(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.VISA_VALIDITY = undefined;
    }
  }
  setValues() {
    this.data.NAME = '';
    this.data.VISA_COUNTRY_NAME = '';
    this.data.VISA_VALIDITY = '';
    this.data.VISA_TYPE = '';
    this.data.PASSPORT_VALIDITY_DATE = null;
    this.data.IS_TAKEN_INSURANCE = false;
  }

  save(addNew: boolean): void {

    var isOk = true;

    if (this.data.NAME == undefined || this.data.NAME.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('family-passport-info.message1'), "");
    }
    if (this.data.PASSPORT_NUMBER == undefined || this.data.PASSPORT_NUMBER.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('family-passport-info.message2'), "");

    }

    if (this.data.PASSPORT_VALIDITY_DATE[0] >= 0 && this.data.PASSPORT_VALIDITY_DATE[0] 
      <= 9 && this.data.PASSPORT_VALIDITY_DATE[1] >= 0 
      && this.data.PASSPORT_VALIDITY_DATE[1] <= 9 && 
      this.data.PASSPORT_VALIDITY_DATE[3] >= 0 && this.data.PASSPORT_VALIDITY_DATE[3] <= 9 && 
      this.data.PASSPORT_VALIDITY_DATE[4] >= 0 && this.data.PASSPORT_VALIDITY_DATE[4] <= 9 && 
      this.data.PASSPORT_VALIDITY_DATE[9] >= 0 && this.data.PASSPORT_VALIDITY_DATE[9] <= 9 && 
      this.data.PASSPORT_VALIDITY_DATE[8] >= 0 && this.data.PASSPORT_VALIDITY_DATE[8] <= 9 && 
      this.data.PASSPORT_VALIDITY_DATE[7] >= 0 && this.data.PASSPORT_VALIDITY_DATE[7] <= 9 && 
      this.data.PASSPORT_VALIDITY_DATE[6] >= 0 && this.data.PASSPORT_VALIDITY_DATE[6] <= 9) {
  
      var conformedPhoneNumber = conformToMask(
        this.data.PASSPORT_VALIDITY_DATE,
        this.mask,
        { guide: false }
      )
      const str = conformedPhoneNumber.conformedValue.split('/');
  
      const year = Number(str[2]);
      const month = Number(str[1]) - 1;
      const dates = Number(str[0]);
  
      this.converted = new Date(year, month, dates)
  
  
      if (this.converted <= new Date()) {
        this.data.PASSPORT_VALIDITY_DATE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
      } 
  }
  else {
    isOk = false;
    this.message.error(this.api.translate.instant('family-passport-info.message3'), "");
  }
  
    if (this.data.VISA_COUNTRY_NAME == undefined || this.data.VISA_COUNTRY_NAME.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('family-passport-info.message4'), "");
    }
    if (this.data.VISA_TYPE == undefined || this.data.VISA_TYPE.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('family-passport-info.message5'), "");
    }

    if (this.data.VISA_VALIDITY[0] >= 0 && this.data.VISA_VALIDITY[0] 
      <= 9 && this.data.VISA_VALIDITY[1] >= 0 
      && this.data.VISA_VALIDITY[1] <= 9 && 
      this.data.VISA_VALIDITY[3] >= 0 && this.data.VISA_VALIDITY[3] <= 9 && 
      this.data.VISA_VALIDITY[4] >= 0 && this.data.VISA_VALIDITY[4] <= 9 && 
      this.data.VISA_VALIDITY[9] >= 0 && this.data.VISA_VALIDITY[9] <= 9 && 
      this.data.VISA_VALIDITY[8] >= 0 && this.data.VISA_VALIDITY[8] <= 9 && 
      this.data.VISA_VALIDITY[7] >= 0 && this.data.VISA_VALIDITY[7] <= 9 && 
      this.data.VISA_VALIDITY[6] >= 0 && this.data.VISA_VALIDITY[6] <= 9) {
  
      var conformedPhoneNumber = conformToMask(
        this.data.VISA_VALIDITY,
        this.mask,
        { guide: false }
      )
      const str = conformedPhoneNumber.conformedValue.split('/');
  
      const year = Number(str[2]);
      const month = Number(str[1]) - 1;
      const dates = Number(str[0]);
  
      this.converted = new Date(year, month, dates)
  
  
      if (this.converted <= new Date()) {
        this.data.VISA_VALIDITY = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
      } 
  }
  else {
    isOk = false;
    this.message.error('Invalid Due Date','')
  }
  

    if (isOk) {
      this.demo.emit(false);
      this.setValues();
      if (!addNew)
        this.close();
    }


  }

}
