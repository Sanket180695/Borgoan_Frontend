import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import { WorkOrders } from 'src/app/Models/PersonalProposal/work-orders';
import { ApiService } from 'src/app/Service/api.service';
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
  constructor(
    private message: NzNotificationService,private api: ApiService,
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
    if (this.data.NAME_OF_ORGANIZATION_OR_PERSON != undefined && this.data.AMOUNT_OF_WORK_ORDER != undefined && this.data.START_DATE != undefined
      && this.data.END_DATE != undefined) {

      if (this.data.AMOUNT_OF_WORK_ORDER == 0 || this.data.AMOUNT_OF_WORK_ORDER.toString().trim() == "") {
        this.message.error(this.api.translate.instant('workorders.message1'), "");
      } else {
        if (this.data.NAME_OF_ORGANIZATION_OR_PERSON.toString().trim() == "") {
          this.message.error(this.api.translate.instant('workorders.message2'), "");
        } else {
          if (this.data.START_DATE !== '' && this.data.END_DATE !== '') {
            this.data.END_DATE = this.pipe.transform(this.data.END_DATE, 'yyyy-MM-dd');
            this.data.START_DATE = this.pipe.transform(this.data.START_DATE, 'yyyy-MM-dd');
            this.demo.emit(false);
            this.setValues();
            if (!addNew)
            this.close();

          } else {
            this.message.error(this.api.translate.instant('workorders.message3'), "");
          }
        }
      }
    }
    else {
      this.message.error(this.api.translate.instant('common.message.error.emptyinfo'), "");
    }
  }

}
