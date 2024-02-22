import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzNotificationService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import { RealEstateToUpLoan } from 'src/app/Models/PersonalProposal/real-estate-to-up-loan';
import { ApiService } from 'src/app/Service/api.service';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';

@Component({
  selector: 'app-real-estate-to-up-loan',
  templateUrl: './real-estate-to-up-loan.component.html',
  styleUrls: ['./real-estate-to-up-loan.component.css']
})
export class RealEstateToUpLoanComponent implements OnInit {
  confirmModal?: NzModalRef;
  index = -1;
  pageIndex = 0;
  pageSize = 0;
  totalRecords = 1;
  expenceList = [];
  loadingRecords = false;
  sortValue: string = "desc";
  sortKey: string = "id";
  filterQuery: string = "";
  expencedata = { SPENT_AMOUNT: 0, REASON: '' }
  @Input() PROPOSAL_ID: number;
  data: RealEstateToUpLoan = new RealEstateToUpLoan();
  isSpinning = false
  isButtonSpinning = false
  logtext: string = "";
  pipe = new DatePipe('en-US');
  @Input() CURRENT_STAGE_ID: number; 
   @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();

  constructor(private api: ApiService, private message: NzNotificationService, private modal: NzModalService,) {
  }

  ngOnInit() {
    this.getdata();
  }

  getdata() {
    this.isSpinning = true;
    this.api.getAllRealEstateTopUpLoan(0, 0, 'ID', "asc", "AND PROPOSAL_ID=" + this.PROPOSAL_ID).subscribe(data => {
      this.isSpinning = false;
      if (data['code'] == '200' && data['count'] > 0) {
        this.data = data['data'][0];
        this.api.getAllTopUpLoanReasonDetails(0, 0, 'ID', "asc", " AND REAL_ESTATE_TOP_UP_LOAN_ID=" + this.data.ID).subscribe(data1 => {
          this.loadingRecords = false;
          this.totalRecords = data1['count'];
          if (data1['code'] == '200' && data1['count'] > 0) {
            this.expenceList = data1['data'];
          }
        }, err => {
          //console.log(err);
        });
      }
    }, err => {
      //console.log(err);
    });
  }

  save(): void {
    var isOk = true;

    if (this.expenceList == null || this.expenceList.length == 0) {
      isOk = false;
      this.message.error(this.api.translate.instant('rent-estate-to-up-loan.message1') , "");
    }


    if (isOk) {
      this.data.PROPOSAL_ID = this.PROPOSAL_ID;
      this.isButtonSpinning = true;
      this.nextProcess();

    }
  }

  add(): void {
    var isValid = true;
    if (this.expencedata.REASON == undefined || this.expencedata.REASON.trim() == '') {
      isValid = false;
      this.message.error(this.api.translate.instant('rent-estate-to-up-loan.message2'), "");
    }
    if (this.expencedata.SPENT_AMOUNT == undefined || this.expencedata.SPENT_AMOUNT == 0 || this.expencedata.SPENT_AMOUNT.toString().trim() == '') {
      isValid = false;
      this.message.error(this.api.translate.instant('rent-estate-to-up-loan.message3'), "");
    }

    if (isValid) {
      if (this.index > -1) {
        this.expenceList[this.index] = Object.assign({}, this.expencedata);
      } else {
        this.expenceList.push(Object.assign({}, this.expencedata));
      }
      this.expenceList = [...this.expenceList];
      this.index = -1;
      this.expencedata.REASON = " ";
      this.expencedata.SPENT_AMOUNT = 0;
    }


  }

  edit(data: any, i: number): void {
    this.index = i;
    this.expencedata = Object.assign({}, this.expenceList[this.index]);
  }

  delete(i: number) {
    this.expenceList.splice(i, 1);

  }

  delete1(i: any): void {
    if (this.expenceList.length > 1) {
      this.confirmModal = this.modal.confirm({
        nzTitle: this.api.translate.instant('rent-estate-to-up-loan.message4'),
        nzContent: this.api.translate.instant('rent-estate-to-up-loan.message5'),
        nzOnOk: () =>
          new Promise((resolve, reject) => {
            this.expenceList.splice(i, 1);
            this.data['REASON_DETAILS'] = this.expenceList;
            this.api.createRealEstateTopUpLoanBullk(this.data)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  this.message.success(this.api.translate.instant('rent-estate-to-up-loan.message6'), "");
                  setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                  this.getdata();
                }
                else {
                  this.message.error(this.api.translate.instant('rent-estate-to-up-loan.message7'), "");

                }
              });

          }).catch(() => console.log(this.api.translate.instant('rent-estate-to-up-loan.message8')))
      });
    } else {
      this.message.error(this.api.translate.instant('rent-estate-to-up-loan.message9'), "");
    }
  }

  nextProcess() {
    this.expenceList.forEach((item, index) => {
      this.expenceList[index].CLIENT_ID = 1;
    });
    this.data['REASON_DETAILS'] = this.expenceList;

    this.api.createRealEstateTopUpLoanBullk(this.data)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          this.message.success(this.api.translate.instant('rent-estate-to-up-loan.message10'), "");
          this.indexChanged.emit(1)

          this.logtext = 'Update & Close - RealEstateToTopUpLoan form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - RealEstateToTopUpLoan ]";
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
          this.isButtonSpinning = false;
        }
        else {
          this.message.error(this.api.translate.instant('rent-estate-to-up-loan.message11'), "");
          this.isButtonSpinning = false;
        }
      });

  }
}
