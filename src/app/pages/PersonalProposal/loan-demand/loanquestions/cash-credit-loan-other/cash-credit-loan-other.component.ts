import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { CashCreditLoanOther } from 'src/app/Models/PersonalProposal/cash-credit-loan-other';
import { ApiService } from 'src/app/Service/api.service';
import { WorkOrders } from 'src/app/Models/PersonalProposal/work-orders';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
@Component({
  selector: 'app-cash-credit-loan-other',
  templateUrl: './cash-credit-loan-other.component.html',
  styleUrls: ['./cash-credit-loan-other.component.css']
})
export class CashCreditLoanOtherComponent implements OnInit {
  index = -1;
  pageIndex = 0;
  pageSize = 0;
  totalRecords = 1;
  dataList:any[] = [];
  loadingRecords = false;
  sortValue: string = "desc";
  sortKey: string = "id";
  filterQuery: string = "";
  logtext: string = "";
  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: WorkOrders = new WorkOrders();
  @Input() PROPOSAL_ID: number ;
  data: CashCreditLoanOther = new CashCreditLoanOther();
  isSpinning = false
  isBttonSpinning = false
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();
  @Output() demo : EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() CURRENT_STAGE_ID: number;  
  @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  constructor(private api: ApiService, private message: NzNotificationService) { }
  ngOnInit() {
    this.search();
  }
  // Basic Methods

  search() {
    this.isSpinning = true;
    this.api.getAllCashCreditOtherInformation(this.pageIndex, this.pageSize, this.sortKey, this.sortValue, "AND PROPOSAL_ID=" + this.PROPOSAL_ID).subscribe(data => {
      this.isSpinning = false;
      if (data['code'] == '200' && data['count'] > 0) {
        this.data = data['data'][0];
        this.loadingRecords = true;
        this.api.getAllWorkOrderDetails(this.pageIndex, this.pageSize, this.sortKey, this.sortValue, "AND CASH_CREDIT_OTHER_ID=" + this.data.ID).subscribe(data1 => {
          this.loadingRecords = false;
          this.totalRecords = data1['count'];
          if (data1['code'] == '200' && data1['count'] > 0) {
          this.dataList = data1['data'];
          }
        }, err => {
          //console.log(err);
        });
      }

    }, err => {
      //console.log(err);
    });
  }

  //Drawer Methods
  get closeCallback() {
    return this.drawerClose.bind(this);
  }

  add(): void {
    this.drawerTitle = this.api.translate.instant('cash-credit-loan-other.title1');
    this.drawerData = new WorkOrders();
    this.drawerVisible = true;
    this.logtext = 'ADD - CashCreditOther form KEYWORD [A - CashCreditOther] ';
    this.api.addLog('A',this.logtext,this.api.emailId)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
               //console.log(successCode);
              }
              else {
    	//console.log(successCode);
              }
        });

  }

  edit(data: WorkOrders, i: number): void {
    this.index = i;
    this.drawerTitle = this.api.translate.instant('cash-credit-loan-other.title2');
    this.drawerData = Object.assign({}, data);
    this.drawerVisible = true;

    this.logtext = 'EDIT - CashCreditOther form KEYWORD [E - CashCreditOther] ';
    this.api.addLog('A',this.logtext,this.api.emailId)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
               //console.log(successCode);
              }
              else {
    	//console.log(successCode);
              }
            });
  }

  drawerClose(): void {
    this.index = -1;
    this.drawerVisible = false;
  }

  saveWorkdata(): void {
    if (this.index > -1) {
      this.dataList[this.index] = Object.assign({},this.drawerData);
    } else {
      this.dataList.push(Object.assign({},this.drawerData));
    }
    this.dataList = [...this.dataList];
    this.index = -1;
  }

  save(): void {
    var isOk = true;

    if (this.data.PURPOSE_OF_CASH_CREDIT == undefined || this.data.PURPOSE_OF_CASH_CREDIT == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('cash-credit-loan-other.message1'), "");
    }

    if (this.data.EXPECTED_NET_PROFIT == undefined || this.data.EXPECTED_NET_PROFIT == 0 || this.data.EXPECTED_NET_PROFIT.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('cash-credit-loan-other.message2'), "");
    }

    if (this.data.EXPECTED_AMOUNT_OF_WORK_ORDERS == undefined || this.data.EXPECTED_AMOUNT_OF_WORK_ORDERS == 0 || this.data.EXPECTED_AMOUNT_OF_WORK_ORDERS.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('cash-credit-loan-other.message3'), "");
    }
    if (this.data.IS_MAIN_CONTRACTOR_OR_SUB_CONTRACTOR == undefined || this.data.IS_MAIN_CONTRACTOR_OR_SUB_CONTRACTOR.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('cash-credit-loan-other.message4'), "");
    }
    if (this.data.IS_ANY_WORK_ORDER_IN_HAND) {
      if (this.dataList == null || this.dataList.length == 0) {
        isOk = false;
        this.message.error(this.api.translate.instant('cash-credit-loan-other.message5'), "");
      }
    } else{
      this.dataList = [];
    }


    if (isOk) {
      this.isBttonSpinning = true;
      this.data.PROPOSAL_ID = this.PROPOSAL_ID;
      this.dataList.forEach((item, index) => {
        this.dataList[index].CLIENT_ID = 1;
      });
      this.data['WORK_ORDER_DETAILS'] = this.dataList;
      if (this.data.ID) {
        this.api.createCashCreditOtherInformationBulk(this.data)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
              this.indexChanged.emit(1)
            
              this.logtext = 'Update & Close - CashCreditOther form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - CashCreditOther ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                  }
                });
              this.search();
              this.demo.emit(false)
              this.isBttonSpinning = false;
            }
            else {
              this.message.error(this.api.translate.instant('common.message.error.updatefailed'), "");
              this.isBttonSpinning = false;
            }
          });
      }
      else {

        this.api.createCashCreditOtherInformationBulk(this.data)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('common.message.success.addinfo2'), "")
            this.indexChanged.emit(1)
             
              this.logtext = 'Save & New - CashCreditOther form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - CashCreditOther ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                  }
                });

              this.search();
              this.demo.emit(false)
              this.isBttonSpinning = false;
            }
            else {
              this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
              this.isBttonSpinning = false;
              this.logtext = 'Save & Close - CashCreditOther form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - CashCreditOther ]";
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
          });
      }
    }
  }

  
}