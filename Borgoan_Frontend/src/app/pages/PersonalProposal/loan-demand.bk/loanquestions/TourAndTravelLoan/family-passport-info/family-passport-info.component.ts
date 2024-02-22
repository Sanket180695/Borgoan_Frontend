import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import { TRAVELSLOANFAMILYDETAILS } from 'src/app/Models/PersonalProposal/travels-loan-family-details';
import { ApiService } from 'src/app/Service/api.service';

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
  constructor(
    private message: NzNotificationService,private api: ApiService,
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

    if (this.data.PASSPORT_VALIDITY_DATE == undefined || this.data.PASSPORT_VALIDITY_DATE == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('family-passport-info.message3'), "");
    } else {
      this.data.PASSPORT_VALIDITY_DATE = this.pipe.transform(this.data.PASSPORT_VALIDITY_DATE, 'yyyy-MM-dd');
    }
    if (this.data.VISA_COUNTRY_NAME == undefined || this.data.VISA_COUNTRY_NAME.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('family-passport-info.message4'), "");
    }
    if (this.data.VISA_TYPE == undefined || this.data.VISA_TYPE.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('family-passport-info.message5'), "");
    }

    if (this.data.VISA_VALIDITY == undefined || this.data.VISA_VALIDITY == "") {
      isOk = false;
      this.message.error(this.api.translate.instant('family-passport-info.message6'), "");
    } else {
      this.data.VISA_VALIDITY = this.pipe.transform(this.data.VISA_VALIDITY, 'yyyy-MM-dd');
    }

    if (isOk) {
      this.demo.emit(false);
      this.setValues();
      if (!addNew)
        this.close();
    }


  }

}
