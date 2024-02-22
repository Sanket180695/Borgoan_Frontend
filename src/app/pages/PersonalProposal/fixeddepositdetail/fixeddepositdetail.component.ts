import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { FRecurringDeposit } from 'src/app/Models/PersonalProposal/FrecurringDeposit';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-fixeddepositdetail',
  templateUrl: './fixeddepositdetail.component.html',
  styleUrls: ['./fixeddepositdetail.component.css']
})
export class FixeddepositdetailComponent implements OnInit {

  @Input() drawerClose2: Function;
  @Input() data7: FRecurringDeposit;
  @Input() addressinfoCurrent: Addressinfo;
  pageIndex = 1;
  @Input() CURRENT_STAGE_ID: number;
  @Input() PROPOSAL_ID
  @Input() extraApplicantInformation: Extraapplicantinfo;
  @Output() demo : EventEmitter<boolean> =
  new EventEmitter<boolean>();
  pageSize = 100;
  sortValue: string = "asc";
  sortKey: string = "ID";
  searchText: string = "";
  likeQuery: string = "";
  isSpinning = false;
  logtext: string = ""

  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {
  }


  close(): void {
    this.drawerClose2();

    this.logtext = 'CLOSED - Extra Info form';
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

  setValues() {
    this.data7.ACC_AMOUNT = this.data7.ACC_AMOUNT;
    this.data7.ACC_NO = this.data7.ACC_NO;
    // this.data7.MATURITY_DUE = this.data7.MATURITY_DUE;
    // this.data.END_DATE = '';
  }


  save(): void {
    if(this.data7.ID){
      this.data7.DEPOSIT_TYPE = 'F'
      this.api.updateDepositInformation(this.data7).subscribe(
        successCode => {
          if(successCode['code']== 200){
            this.getFixedDeposit();
            this.drawerClose2();
          }
        }
      )
    }
    else{
      this.data7.DEPOSIT_TYPE = 'F'
      this.api.createDepositInformation(this.data7).subscribe(
        successCode => {
          if(successCode['code'] == 200){
            this.getFixedDeposit();
            this.drawerClose2();
          }
        }
      )
    }
    // if (this.data7.ACC_AMOUNT != undefined && this.data7.ACC_NO != undefined) {
    //   if (this.data7.ACC_AMOUNT == 0 || this.data7.ACC_AMOUNT.toString().trim() == "") {
    //     this.message.error("Not Ok", '');
    //   } else {
    //     if (this.data7.ACC_NO.toString().trim() == "") {
    //       this.message.error('Not Ok', "");
    //     } else {
    //       if (this.data7.ACC_NO) {
    //         this.demo.emit(false);
    //         this.setValues();
    //         //console.log(this.setValues)
    //         if (!addNew)
    //           this.close();
    //       } else {
    //         this.message.error(this.api.translate.instant('workorders.message3'), "");
    //       }
    //     }
    //   }
    // }
    // else {
    //   this.message.error(this.api.translate.instant('common.message.error.emptyinfo'), "");
    // }
  }

  getFixedDeposit(){
    this.api.getDepositInformation(this.PROPOSAL_ID,'F').subscribe(
      successCode => {
        if(successCode['code'] == 200){
          this.data7 = successCode['data'][0]
        }
      }
    )
  }

  isValidPincode(pincode) {
    const expression = /^[1-9][0-9]{5}/;
    return expression.test(String(pincode).toLowerCase())
  }

  setValues2() {
    this.addressinfoCurrent.BUILDING = '';
    this.addressinfoCurrent.DISTRICT = '';
    this.addressinfoCurrent.HOUSE_NO = '';
    this.addressinfoCurrent.LANDMARK = '';
    this.addressinfoCurrent.VILLAGE = '';
    this.addressinfoCurrent.STATE = '';
    this.addressinfoCurrent.TALUKA = '';
    this.addressinfoCurrent.PINCODE = "";
  }

}
