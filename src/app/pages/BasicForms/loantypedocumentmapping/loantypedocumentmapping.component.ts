import { Component, OnInit, Input } from '@angular/core';
import { Loantypes } from 'src/app/Models/BasicForms/loantypes';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';

@Component({
  selector: 'app-loantypedocumentmapping',
  templateUrl: './loantypedocumentmapping.component.html',
  styleUrls: ['./loantypedocumentmapping.component.css']
})
export class LoantypedocumentmappingComponent implements OnInit {

  @Input() drawerClose: Function;
  @Input() data: Loantypes;
  @Input() loadTypeDocumentData;
  @Input() drawerVisible: boolean;
  isSpinning = false

  userActivityLogData: Useractivitylog = new Useractivitylog();


  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit() {
  }

  close(): void {
    this.drawerClose();

    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "LoanTypeDocumentMapping - Close Clicked"
    this.userActivityLogData.ACTIVITY_TIME = new Date()
    this.api.createUserActivityLog(this.userActivityLogData)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          //console.log(successCode);
        }
        else {
          //console.log(successCode);
        }
      });
  }


  changeIsComplusory(value, data) {
    if (value)
      data.IS_COMPULSORY = 1;
    else
      data.IS_COMPULSORY = 0
  }

  changestatus(value, data) {
    if (value)
      data.STATUS = 1;
    else
      data.STATUS = 0
  }



  save() {
    //this.isSpinning = true;

    //console.log(this.loadTypeDocumentData)
    // this.api.addLoanTypeMapping(this.data.ID,this.loadTypeDocumentData)
    // .subscribe(successCode => {
    //   //console.log(successCode)
    //   if(successCode['code']=="200")
    //   { 
    //       this.message.success("Documents added Successfully ...", "");
    //       this.drawerClose();
    //       this.isSpinning = false;

    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "LoanTypeDocumentMapping - Save & Close Clicked " + "For Loan Tpe " + this.data.NAME_KN + " " + JSON.stringify(this.loadTypeDocumentData)
    this.userActivityLogData.ACTIVITY_TIME = new Date()
    this.api.createUserActivityLog(this.userActivityLogData)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          //console.log(successCode);
        }
        else {
          //console.log(successCode);
        }
      });
    //   }
    //   else
    //   {
    //     this.message.error("Documents assigning Failed...", "");
    //     this.isSpinning = false;
    //   }
    // });
  }

}
