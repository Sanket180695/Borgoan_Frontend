import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Financialinformation } from 'src/app/Models/PersonalProposal/financialinformation';
import { NzModalRef, NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { ApiService } from 'src/app/Service/api.service';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { Incomeyear } from 'src/app/Models/PersonalProposal/incomeyear';
import { FRecurringDeposit } from 'src/app/Models/PersonalProposal/FrecurringDeposit';
import { FCurrentDeposit } from 'src/app/Models/PersonalProposal/Fcurrentdeposit';
import { TFinancialinfo } from 'src/app/Models/PersonalProposal/Ftermdeposit';
import { SavingaccdetailsComponent } from '../savingaccdetails/savingaccdetails.component';
import { FinancialtermdepositComponent } from '../financialtermdeposit/financialtermdeposit.component';
import { FinancialcurrentdepositComponent } from '../financialcurrentdeposit/financialcurrentdeposit.component';
import { FinancialrecurringdepositComponent } from '../financialrecurringdeposit/financialrecurringdeposit.component';

@Component({
  selector: 'app-financialinfo',
  templateUrl: './financialinfo.component.html',
  styleUrls: ['./financialinfo.component.css']
})
export class FinancialinfoComponent implements OnInit {
  index = -1;

  @Input() loanType: number;
  @Input() FINANCIAL_INFORMATION_ID
  @Output() demo: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() data: Financialinformation;
  @Input() PROPOSAL_ID: number
  @Input() financial
  @Input() APPLICANT_ID: number
  @Input() oldIndex: number
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();

  @ViewChild(SavingaccdetailsComponent) savingAccInfo: SavingaccdetailsComponent;
  @ViewChild(FinancialtermdepositComponent) termAccinfo: FinancialtermdepositComponent;
  @ViewChild(FinancialcurrentdepositComponent) currentAccInfo: FinancialcurrentdepositComponent;
  @ViewChild(FinancialrecurringdepositComponent) recurringAccInfo: FinancialrecurringdepositComponent;
  isButtonSpinning = false
  date = new Date();
  data1: FRecurringDeposit = new FRecurringDeposit();
  data2: FCurrentDeposit = new FCurrentDeposit();
  // data3:FTermDeposit= new FTermDeposit();
  INCOME_AMOUNT_YEAR
  isButtonVerifySpinning = false
  incomeYears: Incomeyear[]
  value = 0
  @Input() LOAN_KEY: Number;
  @Input() CURRENT_STAGE_ID: number;
  // lastYear = (this.date.getFullYear() - 1)
  // latyear1 = (this.date.getFullYear() - 2)
  // year1 = this.date.getFullYear() + "-" + (this.date.getFullYear() + 1);
  // chnageYear1=this.year1.split("-")
  // changeYearSplit=this.chnageYear1[1].substr(2)
  // finalYear1=this.date.getFullYear() + "-" + this.changeYearSplit
  year1 = ""
  year2 = ""
  year3 = ""

  ID
  CLIENT_ID
  // FINANCIAL_INFORMATION_ID
  DEPOSIT_TYPE
  // IS_HAVE_DEPOSIT
  ACC_NO: number
  ACC_AMOUNT: number
  MATURITY_DUE
  roleId = sessionStorage.getItem("roleId")
  drawerVisible3: boolean
  drawerVisible4: boolean
  drawerVisible5: boolean

  pageSize = 100;
  loadingRecords2 = false;
  totalRecords: number;
  pageIndex = 1;
  dataList2: any[] = [];
  dataList22 = [];
  dataList = [];
  dataList5 = [];

  termDepositdata: FRecurringDeposit[] = [];
  currentDepositdata: FRecurringDeposit[] = [];
  recurringDepositdata: FRecurringDeposit[] = [];
  savingAccdata: FRecurringDeposit[] = [];
  // fixedDepositedata:  FRecurringDeposit[] = [];

  FinanceData: Financialinformation = new Financialinformation();
  drawerVisible2: boolean;
  drawerData1: FRecurringDeposit = new FRecurringDeposit();
  drawerData5: FRecurringDeposit = new FRecurringDeposit();
  drawerTitle2: string;
  drawerData2: FRecurringDeposit = new FRecurringDeposit()
  drawerData6: FRecurringDeposit = new FRecurringDeposit();
  drawerData7: Financialinformation = new Financialinformation();
  drawerTitle3: string;
  drawerTitle4: string;
  drawerTitle5: string;
  logtext: string = ""
  loadingRecords4 = false;
  sortValue: string = "desc";
  sortKey: string = "ID";
  // year2 = this.lastYear + "-" + this.date.getFullYear()
  // year3 = this.latyear1 + "-" + this.lastYear
  i = 2
  oldType = ""
  oldYear = ""
  incomeSourceId: number = 0
  otherincomeSourceId: number = 0
  otherincomeSourceId2: number = 0
  isSpinning = false
  i1
  // dataList:any[] = [];
  // dataList1: any[] = []
  financial1
  extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  dataCode = 0
  proposalType = Number(sessionStorage.getItem("PRAPOSAL_TYPE"))
  isSaved = Number(sessionStorage.getItem("IS_SAVED"))
  total = [];
  total1 = [];

  confirmModal?: NzModalRef;
  constructor(private api: ApiService, private message: NzNotificationService, private modal: NzModalService,) { }

  ngOnInit(): void {
    this.loadInfo()
    //  this.data.FINANCIAL_YEAR = this.date.getFullYear().toString()
    this.loadData()
    this.loadIncomeYear()


  }

  getSessionValues() {
    this.proposalType = Number(sessionStorage.getItem("PRAPOSAL_TYPE"))
    this.isSaved = Number(sessionStorage.getItem("IS_SAVED"))
  }


  drawerClose1(): void {
    this.index = -1;
    this.drawerVisible5 = false;
  }


  saveWorkdata24(): void {
    if (this.index > -1) {
      this.savingAccdata[this.index] = Object.assign({}, this.drawerData2);
    } else {
      this.savingAccdata.push(Object.assign({}, this.drawerData2));
    }
    this.savingAccdata = [...this.savingAccdata];
    this.index = -1;
  }

  // saveWorkdata25(): void {
  //   if (this.index > -1) {
  //     this.fixedDepositedata[this.index] = Object.assign({}, this.drawerData2);
  //   } else {
  //     this.fixedDepositedata.push(Object.assign({}, this.drawerData2));
  //   }
  //   this.fixedDepositedata = [...this.fixedDepositedata];
  //   this.index = -1;
  // }


  // saveWorkdata24(): void {
  //   if (this.index > -1) {
  //     this.dataList2[this.index] = Object.assign({}, this.drawerData2);
  //   } else {
  //     this.dataList2.push(Object.assign({}, this.drawerData2));
  //   }
  //   this.dataList2 = [...this.dataList2];
  //   this.index = -1;
  // }

  // saveWorkdata(): void {
  //   if (this.index > -1) {
  //     this.dataList[this.index] = Object.assign({}, this.drawerData5);
  //   } else {
  //     this.dataList.push(Object.assign({}, this.drawerData5));
  //   }
  //   this.dataList = [...this.dataList];
  //   this.index = -1;
  // }
  saveWorkdata(): void {
    if (this.index > -1) {
      this.recurringDepositdata[this.index] = Object.assign({}, this.drawerData5);
    } else {
      this.recurringDepositdata.push(Object.assign({}, this.drawerData5));
    }
    this.recurringDepositdata = [...this.recurringDepositdata];
    this.index = -1;
  }


  // saveWorkdata1(): void {
  //   if (this.index > -1) {
  //     this.dataList1[this.index] = Object.assign({}, this.drawerData1);
  //   } else {
  //     this.dataList1.push(Object.assign({}, this.drawerData1));
  //   }
  //   this.dataList1 = [...this.dataList1];
  //   this.index = -1;
  // }
  saveWorkdata1(): void {
    if (this.index > -1) {
      this.termDepositdata[this.index] = Object.assign({}, this.drawerData1);
    } else {
      this.termDepositdata.push(Object.assign({}, this.drawerData1));
    }
    this.termDepositdata = [...this.termDepositdata];
    this.index = -1;
  }


  saveWorkdata2(): void {
    if (this.index > -1) {
      this.currentDepositdata[this.index] = Object.assign({}, this.drawerData6);
    } else {
      this.currentDepositdata.push(Object.assign({}, this.drawerData6));
    }
    this.currentDepositdata = [...this.currentDepositdata];
    this.index = -1;
  }

  // saveWorkdata2(): void {
  //   if (this.index > -1) {
  //     this.dataList22[this.index] = Object.assign({}, this.drawerData6);
  //   } else {
  //     this.dataList22.push(Object.assign({}, this.drawerData6));
  //   }
  //   this.dataList22 = [...this.dataList22];
  //   this.index = -1;
  // }
  // load(proposalId,applicantId) {
  //   this.api.getAddressInfo(proposalId, "B", applicantId).subscribe(data => {
  //     //console.log(data)
  //     if (data['code'] == 200 && data['data'].length > 0) {
  //       this.data = Object.assign({}, data['data'][0]); 
  //       this.personalInformationId = this.data.ID
  //       this.addressinfoCurrent = Object.assign({}, data['data'][0]['CURRENT_ADDRESS'][0]); 
  //       this.addressinfoPermanent = new Addressinfo()
  //       this.familyDeatils = [];
  //       console.log(this.data.DATE_OF_MEMBERSHIP)
  //       var d = new Date(this.data.DATE_OF_MEMBERSHIP)
  //       this.data.DATE_OF_MEMBERSHIP = this.datePipe.transform(d, 'dd/MM/yyyy');

  //     }
  //   }, err => {
  //     //console.log(err);
  //   });
  // }


  // addFamilyDetails() {
  //   if (this.financial.length == 0) {
  //     this.financial = [
  //       {
  //         ID: 0,
  //         CLIENT_ID: this.api.clientId,
  //         FINANCIAL_INFORMATION_ID: this.data.ID,
  //         DEPOSIT_TYPE: this.DEPOSIT_TYPE,
  //         IS_HAVE_DEPOSIT: this.IS_HAVE_DEPOSIT,
  //         ACC_NO: this.ACC_NO,
  //         ACC_AMOUNT: this.ACC_AMOUNT,
  //         MATURITY_DUE: this.MATURITY_DUE
  //       }
  //     ];
  //   }
  //   else {
  //     this.financial = [
  //       ...this.financial,
  //       {
  //         ID: 0,
  //         CLIENT_ID: this.api.clientId,
  //         FINANCIAL_INFORMATION_ID: this.data.ID,
  //         DEPOSIT_TYPE: this.DEPOSIT_TYPE,
  //         IS_HAVE_DEPOSIT: this.IS_HAVE_DEPOSIT,
  //         ACC_NO: this.ACC_NO,
  //         ACC_AMOUNT: this.ACC_AMOUNT,
  //         MATURITY_DUE: this.MATURITY_DUE
  //       }
  //     ];
  //     this.i++;
  //   }
  // }



  loadInfo() {
    let filter = " AND EXTRA_INFORMATION_ID=4 AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND TYPE='B'"
    this.api.getAllApplicantExtraInformation(0, 0, "SEQ_NO", "asc", filter).subscribe(data => {
      this.extraApplicantInformation = data['data'][0]
    }, err => {
      //console.log(err);
    });
  }

  sort(sort: { key: string; value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;

  }

  loadIncomeYear() {
    this.api.getAllIncomeyears(0, 0, "ID", "desc", "").subscribe(data => {
      this.incomeYears = data['data']
    }, err => {
      //console.log(err);
    });
  }

  get closeCallback2() {
    return this.drawerClose2.bind(this);
  }

  get closeCallback() {
    return this.drawerClose1.bind(this);
  }

  drawerClose2(): void {
    this.getSavingAcc();
    // this.loadData();
    this.drawerVisible2 = false;
  }

  get closeCallback3() {
    return this.drawerClose3.bind(this);
  }

  drawerClose3(): void {
    // this.getData5();
    this.getTermDeposit();
    this.drawerVisible3 = false;
  }

  get closeCallback4() {
    return this.drawerClose4.bind(this);
  }

  drawerClose4(): void {
    this.getCurrentDeposit();
    // this.getData5();
    this.drawerVisible4 = false;
  }
  get closeCallback5() {
    return this.drawerClose5.bind(this);
  }

  drawerClose5(): void {
    this.getRecurringDeposit();
    // this.getData5();
    this.drawerVisible5 = false;
  }

  // drawerClose6(): void {
  //   this.getFixedDeposit();
  //   // this.getData5();
  //   this.drawerVisible6 = false;
  // }
  



  edit1(data, i) {

  }


  edit3(data: FRecurringDeposit, i: number): void {
    this.recurringAccInfo.saveCount = 0;
    this.index = i;
    this.drawerTitle5 = this.api.translate.instant('cash-credit-loan-other.title2');
    this.drawerData5 = Object.assign({}, data);
    this.drawerVisible5 = true;

    this.logtext = 'EDIT - CashCreditOther form KEYWORD [E - CashCreditOther] ';
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

  add1(): void {
    this.drawerTitle5 = this.api.translate.instant('cash-credit-loan-other.title1');
    this.drawerData5 = new FRecurringDeposit();
    this.recurringAccInfo.saveCount = 0;
    this.drawerVisible5 = true;
    this.drawerData5.PROPOSAL_ID = this.PROPOSAL_ID
    this.logtext = 'ADD - CashCreditOther form KEYWORD [A - CashCreditOther] ';
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

  getRecurringDeposit(){
    this.api.getDepositInformation(this.PROPOSAL_ID,'R').subscribe(
      successCode => {
        if(successCode['code'] == 200){
          this.recurringDepositdata = successCode['data']
        }
      }
    )
  }

  deleteRecurringDeposit(data: any): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: this.api.translate.instant('common.confirmModal.nzTitle'),
      nzContent: this.api.translate.instant('common.confirmModal.nzContent'),
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          data.ARCHIVE_FLAG = "T";

          this.api.updateDepositInformation(data).subscribe(
            successCode => {
              if (successCode['code'] == 200) {
                this.getRecurringDeposit();
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                this.drawerClose5();
                this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
              }
              else {
                this.message.error(this.api.translate.instant('common.message.success.deleteinfo'), "");
              }
            }
          )

        }).catch(() => { })//console.log('माहिती बदल करण्यात अयशस्वी!'))
    });

  }




  edit4(data: FRecurringDeposit, i: number): void {
    this.termAccinfo.saveCount = 0;
    this.index = i;
    this.drawerTitle3 = this.api.translate.instant('cash-credit-loan-other.title2');
    this.drawerData1 = Object.assign({}, data);
    this.drawerVisible3 = true;

    this.logtext = 'EDIT - CashCreditOther form KEYWORD [E - CashCreditOther] ';
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



  getTermDeposit() {
    this.api.getDepositInformation(this.PROPOSAL_ID,'T').subscribe(
      successCode => {
        if (successCode['code'] == 200) {
          this.termDepositdata = successCode['data']
        }
      }
    )
  }

  add3(): void {
    this.drawerTitle3 = this.api.translate.instant('cash-credit-loan-other.title1');
    this.drawerData1 = new FRecurringDeposit();
    this.termAccinfo.saveCount = 0;
    this.drawerVisible3 = true;
    this.drawerData1.PROPOSAL_ID = this.PROPOSAL_ID

    this.logtext = 'ADD - CashCreditOther form KEYWORD [A - CashCreditOther] ';
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
  delete3(data: any): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: this.api.translate.instant('common.confirmModal.nzTitle'),
      nzContent: this.api.translate.instant('common.confirmModal.nzContent'),
      nzOnOk: () =>
      new Promise((resolve, reject) => {
        data.ARCHIVE_FLAG = "T";

        this.api.updateDepositInformation(data).subscribe(
          successCode => {
            if (successCode['code'] == 200) {
              this.getTermDeposit();
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
              this.drawerClose3();
              this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
            }
            else {
              this.message.error(this.api.translate.instant('common.message.success.deleteinfo'), "");
            }
          }
        )

        console.log('data delete from table of Financial Tab Question 1 ------------------------------------------- ',this.data)

        // if(this.data.TERM_DEPOSIT.length == 0){
        //   this.data.IS_HAVE_TERM_DEPOSIT = false
        // }
        // if(this.data.CURRENT_DEPOSIT.length == 0){
        //   this.data.IS_HAVE_CURRENT_DEPOSIT = false
        // }
        // if(this.data.RECURING_DEPOSIT.length == 0){
        //   this.data.IS_HAVE_RECURRING_DEPOSIT = false
        // }

        // this.api.updateFinancialInformation(data).subscribe(
        //   (res) =>{
        //     console.log(res);

        //   }
        // )

        // this.api.updateEarlierLoanHistory(data)
        //   .subscribe(successCode => {
        //     if (successCode['code'] == "200") {

        //       this.message.success(this.api.translate.instant('common.message.success.deleteinfo'), "");
        //       this.getData5();
        //       setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        //     }
        //     else {
        //       this.message.error(this.api.translate.instant('common.message.success.deleteinfo'), "");

        //     }
        //   });
      }).catch(() => { })//console.log('माहिती बदल करण्यात अयशस्वी!'))
        
    });

  }


  edit5(data: FRecurringDeposit, i: number): void {
    this.currentAccInfo.saveCount = 0;
    this.index = i;
    this.drawerTitle4 = this.api.translate.instant('cash-credit-loan-other.title2');
    this.drawerData6 = Object.assign({}, data);
    this.drawerVisible4 = true;

    this.logtext = 'EDIT - CashCreditOther form KEYWORD [E - CashCreditOther] ';
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

  add4(): void {
    this.drawerTitle4 = this.api.translate.instant('cash-credit-loan-other.title1');
    this.drawerData6 = new FRecurringDeposit();
    this.currentAccInfo.saveCount = 0;
    this.drawerVisible4 = true;
    this.drawerData6.PROPOSAL_ID = this.PROPOSAL_ID
    this.logtext = 'ADD - CashCreditOther form KEYWORD [A - CashCreditOther] ';
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

  deleteCurrentDeposit(data: any): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: this.api.translate.instant('common.confirmModal.nzTitle'),
      nzContent: this.api.translate.instant('common.confirmModal.nzContent'),
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          data.ARCHIVE_FLAG = "T";

          this.api.updateDepositInformation(data).subscribe(
            successCode => {
              if (successCode['code'] == 200) {
                this.getCurrentDeposit();
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                this.drawerClose4();
                this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
              }
              else {
                this.message.error(this.api.translate.instant('common.message.success.deleteinfo'), "");
              }
            }
          )

        }).catch(() => { })//console.log('माहिती बदल करण्यात अयशस्वी!'))
    });

  }

  getCurrentDeposit() {
    this.api.getDepositInformation(this.PROPOSAL_ID,'C').subscribe(
      successCode => {
        if (successCode['code'] == 200) {
          this.currentDepositdata = successCode['data']
        }
      }
    )
  }



  getData5() {
    this.loadingRecords4 = true;
    this.api.getAllEarlierLoanHistory(0, 0, 'ID', "asc", "AND CREDIT_INFORMATION_ID = " + this.data.ID + " AND ARCHIVE_FLAG = 'F'")
      .subscribe(successCode => {
        this.dataList5 = []
        // this.dataList9 = []
        this.loadingRecords4 = false;
        if (successCode['code'] == "200" && successCode['count'] > 0) {
          this.dataList5 = successCode['data'].filter((item) => item.IS_SUB == 1);
          // this.dataList9 = successCode['data'].filter((item) => item.IS_SUB == 0);
        }
      });

  }


  table() {
    this.drawerTitle2 = this.api.translate.instant('gincomeinfo.drawerTitle17')
    this.drawerData2 = new FRecurringDeposit();
    this.savingAccInfo.saveCount = 0;
    this.drawerData2.PROPOSAL_ID = this.PROPOSAL_ID
    // this.drawerData2.INCOME_INFORMATION_ID = this.data1.ID;
    // this.drawerData2.TYPE = "B"
    // this.drawerData2.APPLICANT_ID = this.APPLICANT_ID
    this.drawerVisible2 = true;
  }

  tabledit(data: FRecurringDeposit, i: number): void {
    this.savingAccInfo.saveCount = 0;
    this.index = i;
    this.drawerTitle2 = this.api.translate.instant('cash-credit-loan-other.title2');
    this.drawerData2 = Object.assign({}, data);
    this.drawerVisible2 = true;

    this.logtext = 'EDIT - CashCreditOther form KEYWORD [E - CashCreditOther] ';
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

  getSavingAcc(){
    this.api.getDepositInformation(this.PROPOSAL_ID,'S').subscribe(
      successCode => {
        if(successCode['code'] == 200){
          this.savingAccdata = successCode['data']
        }
      }
    )
  }

  deleteSavingAcc(data: any): void{
    this.confirmModal = this.modal.confirm({
      nzTitle: this.api.translate.instant('common.confirmModal.nzTitle'),
      nzContent: this.api.translate.instant('common.confirmModal.nzContent'),
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          data.ARCHIVE_FLAG = "T";

          this.api.updateDepositInformation(data).subscribe(
            successCode => {
              if (successCode['code'] == 200) {
                this.getSavingAcc();
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                this.drawerClose2();
                this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
              }
              else {
                this.message.error(this.api.translate.instant('common.message.success.deleteinfo'), "");
              }
            }
          )

        }).catch(() => { })//console.log('माहिती बदल करण्यात अयशस्वी!'))
    });
  }


  // getFixedDeposit(){
  //   this.api.getDepositInformation(this.PROPOSAL_ID,'F').subscribe(
  //     successCode => {
  //       if(successCode['code'] == 200){
  //         this.fixedDepositedata = successCode['data']
  //       }
  //     }
  //   )
  // }

  // deleteFixedDeposit(data: any): void{
  //   this.confirmModal = this.modal.confirm({
  //     nzTitle: this.api.translate.instant('common.confirmModal.nzTitle'),
  //     nzContent: this.api.translate.instant('common.confirmModal.nzContent'),
  //     nzOnOk: () =>
  //       new Promise((resolve, reject) => {
  //         data.ARCHIVE_FLAG = "T";

  //         this.api.updateDepositInformation(data).subscribe(
  //           successCode => {
  //             if (successCode['code'] == 200) {
  //               this.getFixedDeposit();
  //               setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
  //               this.drawerClose2();
  //               this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
  //             }
  //             else {
  //               this.message.error(this.api.translate.instant('common.message.success.deleteinfo'), "");
  //             }
  //           }
  //         )

  //       }).catch(() => { })//console.log('माहिती बदल करण्यात अयशस्वी!'))
  //   });
  // }




  loadData() {
    // this.isSpinning = true
    // this.api.getFinancialInformation(this.PROPOSAL_ID, "B", this.APPLICANT_ID).subscribe(data => {
    //   if (data['code'] == 200 && data['data'].length > 0) {

    //     this.FinanceData=data['data'][0]
    //     this.isSpinning = false
    //     console.log(this.FinanceData,"finanacial")
    //     console.log(data)

    //     if (this.proposalType == 1) {
    //       let filter = "AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND TYPE='B'"
    //       this.api.getAllIncomeInformation(0, 0, "ID", 'desc', filter)
    //         .subscribe(data => {
    //           //console.log("income info in financial")
    //           //console.log(data)
    //           if (data['code'] == 200 && data['data'].length > 0) {
    //             this.incomeSourceId = data['data'][0]['INCOME_SOURCE_ID']
    //             this.otherincomeSourceId = data['data'][0]['OTHER_INCOME_SOURCE_ID']
    //             // this.otherincomeSourceId2 = data['data'][0]['OTHER_INCOME_SOURCE_ID2']
    //           }
    //         }, err => {
    //           //console.log(err);
    //         });
    //     }

    //     this.dataCode = data['code']
    //     this.data = Object.assign({}, data['data'][0]);


    //     // if (this.data.DAILY_PIGMY_AMOUNT == 0)
    //     //   this.data.DAILY_PIGMY_AMOUNT = undefined

    //     // if (this.data.PIGMY_BALANCE == 0)
    //     //   this.data.PIGMY_BALANCE = undefined



    //     // this.data.LAST_3_YEAR_INFORMATION = data['data'][0]['LAST_3_YEAR_INFORMATION']
    //     // this.year1 = this.data.LAST_3_YEAR_INFORMATION[0]['FINANCIAL_YEAR']
    //     // this.year2 = this.data.LAST_3_YEAR_INFORMATION[1]['FINANCIAL_YEAR']
    //     // this.year3 = this.data.LAST_3_YEAR_INFORMATION[2]['FINANCIAL_YEAR']
    //     // this.calculate(0)
    //     // this.calculate(1)
    //     // this.calculate(2)
    //     // this.calculateTotal(0)
    //     // this.calculateTotal(1)
    //     // this.calculateTotal(2)
    //   }
    // }, err => {
    //   //console.log(err);
    // });
             
    this.api.getFinancialInformation(this.PROPOSAL_ID, "B", this.APPLICANT_ID).subscribe(data => {

      if (data['code'] == 200 && data['data'].length > 0) {

        this.FinanceData = data['data'][0]
        this.getSavingAcc();
        this.getTermDeposit();
        this.getCurrentDeposit();
        this.getRecurringDeposit();
        // this.getFixedDeposit();
        // this.dataList1 = this.FinanceData['TERM_DEPOSIT']
        // this.dataList = this.FinanceData['RECURING_DEPOSIT']
        // this.dataList22 = this.FinanceData['CURRENT_DEPOSIT'] 
        this.isSpinning = false
        console.log(this.FinanceData, "finanacial")
        console.log(data)

        if (this.proposalType == 1) {
          let filter = "AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND TYPE='B'"
          this.api.getAllIncomeInformation(0, 0, "ID", 'desc', filter)
            .subscribe(data => {
              //console.log("income info in financial")
              //console.log(data)
              if (data['code'] == 200 && data['data'].length > 0) {
                this.incomeSourceId = data['data'][0]['INCOME_SOURCE_ID']
                this.otherincomeSourceId = data['data'][0]['OTHER_INCOME_SOURCE_ID']
                // this.otherincomeSourceId2 = data['data'][0]['OTHER_INCOME_SOURCE_ID2']
              }
            }, err => {
              //console.log(err);
            });
        }

        this.dataCode = data['code']
        this.data = Object.assign({}, data['data'][0]);


        // if (this.data.DAILY_PIGMY_AMOUNT == 0)
        //   this.data.DAILY_PIGMY_AMOUNT = undefined

        // if (this.data.PIGMY_BALANCE == 0)
        //   this.data.PIGMY_BALANCE = undefined



        // this.data.LAST_3_YEAR_INFORMATION = data['data'][0]['LAST_3_YEAR_INFORMATION']
        // this.year1 = this.data.LAST_3_YEAR_INFORMATION[0]['FINANCIAL_YEAR']
        // this.year2 = this.data.LAST_3_YEAR_INFORMATION[1]['FINANCIAL_YEAR']
        // this.year3 = this.data.LAST_3_YEAR_INFORMATION[2]['FINANCIAL_YEAR']
        // this.calculate(0)
        // this.calculate(1)
        // this.calculate(2)
        // this.calculateTotal(0)
        // this.calculateTotal(1)
        // this.calculateTotal(2)
      }
    }, err => {
      //console.log(err);
    });
  }


  save() {
    //console.log(this.data)
    var isOk = true;
    // this.data.FINANCIAL_INFORMATION_ID = this.data.ID
    this.data.PERIODS = 0
    this.data.OTHER_DEPOSIT_ACC_NO2=''
    this.data.SHARE_ACCOUNT_NO=0


    // this.data.FINANCIAL_YEAR = 0
    this.data.TYPE_OF_ACCOUNT = ''
    // this.data.TAX_PAID_AMOUNT = 0
    this.data.MONTHLY_HOUSEHOLD_EXPENSES = 0;
    this.data.BANK_NAME = ""
    this.data.DAILY_PIGMY_AMOUNT = 0
    this.data.PIGMY_BALANCE = 0
    // this.data.LAST_3_YEAR_INFORMATION = []
    if (this.data.CC_LOAN_TERNOVER == undefined || this.data.CC_LOAN_TERNOVER == 0) {
      this.data.CC_LOAN_TERNOVER = 0
    }
    if (this.data.INCOME_SOURCE_AMOUNT == undefined || this.data.INCOME_SOURCE_AMOUNT.trim() == '') {
      this.data.INCOME_SOURCE_AMOUNT = ''
    }


    if (this.data.SAVING_ACCOUNT_NO != undefined && this.data.SAVING_ACCOUNT_NO==null) {
      if (!this.isAccountNo(this.data.SAVING_ACCOUNT_NO)) {
        isOk = false;
        this.message.error(this.api.translate.instant('common.accountwrong'), '')
      }
    }

    if (this.data.OTHER_DEPOSIT_ACC_NO != undefined && this.data.OTHER_DEPOSIT_ACC_NO.trim() != '') {
      if (!this.isAccountNo(this.data.OTHER_DEPOSIT_ACC_NO)) {
        isOk = false;
        this.message.error(this.api.translate.instant('common.accountwrong'), '')
      }
    }
    if (this.data.OTHER_DEPOSIT_ACC_NO2 != undefined && this.data.OTHER_DEPOSIT_ACC_NO2.trim() != '') {
      if (!this.isAccountNo(this.data.OTHER_DEPOSIT_ACC_NO2)) {
        isOk = false;
        this.message.error(this.api.translate.instant('common.accountwrong'), '')
      }
    }


    if (this.data.ACCOUNT_NO != undefined && this.data.ACCOUNT_NO.trim() != '') {
      if (!this.isAccountNo(this.data.ACCOUNT_NO)) {
        isOk = false;
        this.message.error(this.api.translate.instant('common.accountwrong'), '')
      }
    }

    //console.log(isOk)
    if (isOk) {
      if (this.data.SAVING_AMOUNT == undefined || this.data.SAVING_AMOUNT == 0) {
        this.data.SAVING_AMOUNT = 0
      }
      if (this.data.BALANCE_AMOUNT2 == undefined || this.data.BALANCE_AMOUNT2 == 0) {
        this.data.BALANCE_AMOUNT2 = 0
      }
      if (this.data.YEARLY_INCOME == undefined || this.data.YEARLY_INCOME == 0) {
        this.data.YEARLY_INCOME = 0
      }



      if (this.data.BALANCE_AMOUNT == undefined || this.data.BALANCE_AMOUNT == 0) {
        this.data.BALANCE_AMOUNT = 0
      }

      if (this.data.LOAN_TAKEN_YEARS == undefined || this.data.LOAN_TAKEN_YEARS == 0) {
        this.data.LOAN_TAKEN_YEARS = 0
      }

      if (this.data.ACCOUNT_BALANCE == undefined || this.data.ACCOUNT_BALANCE == 0) {
        this.data.ACCOUNT_BALANCE = 0
      }
      this.data.TYPE = "B"
      //console.log(this.data.TAX_PAID_AMOUNT)
      if (this.data.OTHER_DEPOSIT_ACC_NO == undefined) {
        this.data.OTHER_DEPOSIT_ACC_NO = '';
      }
      if (this.data.ACCOUNT_NO == undefined || this.data.ACCOUNT_NO.trim() == '') {
        this.data.ACCOUNT_NO = ''
      }
      if (this.data.SAVING_ACCOUNT_NO == undefined || this.data.SAVING_ACCOUNT_NO==null) {
        this.data.SAVING_ACCOUNT_NO = ''
      }
      // this.isButtonSpinning = true;
      this.isButtonSpinning = true;
      // this.data.PROPOSAL_ID = this.PROPOSAL_ID;
      // this.dataList.forEach((item, index) => {
      //   this.dataList[index].CLIENT_ID = 1;
      // });

      // this.data.PROPOSAL_ID = this.PROPOSAL_ID;
      // this.dataList1.forEach((item, index) => {
      //   this.dataList1[index].CLIENT_ID = 1;
      // });

      // this.data.PROPOSAL_ID = this.PROPOSAL_ID;
      // this.dataList2.forEach((item, index) => {
      //   this.dataList2[index].CLIENT_ID = 1;
      // });

      // this.data.PROPOSAL_ID = this.PROPOSAL_ID;
      // this.dataList22.forEach((item, index) => {
      //   this.dataList22[index].CLIENT_ID = 1;
      // });

      // this.data['RECURING_DEPOSIT'] = this.dataList;
      // // this.data['TERM_DEPOSIT'] = this.dataList1
      // this.data['CURRENT_DEPOSIT'] = this.dataList22
      // this.data['LAST_3_YEAR_INFORMATION '] = []

      this.api.updateFinancialInformation(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.loadData()

            var LOG_ACTION = 'User saved Financial Info  tab information'
            var DESCRIPTION = sessionStorage.getItem('userName') + 'has saved the Financial Info  for the proposal ' + this.LOAN_KEY
            var LOG_TYPE = 'I'
            this.api.proposalLogInformation(this.extraApplicantInformation.PROPOSAL_ID, this.extraApplicantInformation.CURRENT_STAGE_ID, 0, LOG_ACTION, Number(sessionStorage.getItem("userId")), DESCRIPTION, LOG_TYPE)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                }
              });
            this.isButtonSpinning = false;
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
            this.oldIndex++;
            this.indexChanged.emit(this.oldIndex)
            this.demo.emit(false)
          }
          else {
            this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
            this.isButtonSpinning = false;
          }
        });

    }
    else {
      this.message.error(this.api.translate.instant('common.message.error.emptyinfo'), "");
    }
  }

  isAccountNo(pincode) {
    const expression = /^[A-Za-z0-9\-\/]*$/;
    return expression.test(String(pincode).toLowerCase())
  }

  calculate(index) {
    //console.log("indesc")
    if (index == 0) {
      this.total[index] = 0;
      this.total[index] = Number(this.data.LAST_3_YEAR_INFORMATION[33]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[36]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[39]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[42]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[45]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[48]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[51]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[54]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[57]['INCOME_AMOUNT'])
    }

    if (index == 1) {
      this.total[index] = 1;
      this.total[index] = Number(this.data.LAST_3_YEAR_INFORMATION[34]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[37]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[40]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[43]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[46]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[49]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[52]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[55]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[58]['INCOME_AMOUNT'])
    }

    if (index == 2) {

      this.total[index] = 2;
      this.total[index] = Number(this.data.LAST_3_YEAR_INFORMATION[35]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[38]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[41]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[44]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[47]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[50]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[53]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[56]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[59]['INCOME_AMOUNT'])
    }


  }


  calculateTotal(index) {
    if (index == 0) {
      this.total1[index] = 0;
      this.total1[index] = Number(this.data.LAST_3_YEAR_INFORMATION[60]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[63]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[66]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[69]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[72]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[75]['INCOME_AMOUNT'])
    }

    if (index == 1) {
      this.total1[index] = 1;
      this.total1[index] = Number(this.data.LAST_3_YEAR_INFORMATION[61]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[64]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[67]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[70]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[73]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[76]['INCOME_AMOUNT'])
    }

    if (index == 2) {

      this.total1[index] = 2;
      this.total1[index] = Number(this.data.LAST_3_YEAR_INFORMATION[62]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[65]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[68]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[71]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[74]['INCOME_AMOUNT'])
        + Number(this.data.LAST_3_YEAR_INFORMATION[77]['INCOME_AMOUNT'])
    }
  }


  VerifyUpdate() {

    if (this.extraApplicantInformation.IS_PROVIDED) {

      if (this.extraApplicantInformation.REMARK != "") {
        this.isButtonVerifySpinning = true
        this.extraApplicantInformation.IS_VERIFIED = true
        this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.isButtonVerifySpinning = false;
              this.oldIndex++;
              this.indexChanged.emit(this.oldIndex)
              this.demo.emit(false)
              var LOG_ACTION = ''
              var DESCRIPTION = ''
              if (this.extraApplicantInformation.IS_APPROVED == true) {
                LOG_ACTION = 'Financial info Tab information Verified'

                DESCRIPTION = sessionStorage.getItem('userName') + ' has checked and approved the Financial info for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK
              } else {
                LOG_ACTION = 'Financial info Tab information Rejected'
                DESCRIPTION = sessionStorage.getItem('userName') + 'has checked and rejected the Financial info for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK

              }
              var LOG_TYPE = 'I'
              this.api.proposalLogInformation(this.extraApplicantInformation.PROPOSAL_ID, this.extraApplicantInformation.CURRENT_STAGE_ID, 0, LOG_ACTION, Number(sessionStorage.getItem("userId")), DESCRIPTION, LOG_TYPE)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                  }
                });
            }
            else {
              this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
              this.isButtonVerifySpinning = false;
            }
          });
      }
      else {
        this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
      }
    }
  }

  close() {
  }

  cancel(): void {

  }

  confirm2(): void {
    this.extraApplicantInformation.IS_APPROVED = false;
    if (this.extraApplicantInformation.REMARK == undefined || this.extraApplicantInformation.REMARK.trim() == "") {

      this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
    } else {

      this.VerifyUpdate();
    }

  }

  confirm(): void {
    this.extraApplicantInformation.REMARK = " "
    this.extraApplicantInformation.IS_APPROVED = true;
    this.VerifyUpdate();
  }

  // Padd() {
  //   this.drawerTitle8 = this.api.translate.instant('gincomeinfo.drawerTitle18')
  //   this.drawerData8 = new FRecurringDeposit();
  //   this.pigmyAccInfo.saveCount = 0;
  //   this.drawerVisible8 = true;
  //   this.drawerData8.PROPOSAL_ID = this.PROPOSAL_ID
  //   // this.drawerData2.INCOME_INFORMATION_ID = this.data1.ID;
  //   // this.drawerData2.TYPE = "B"
  //   // this.drawerData2.APPLICANT_ID = this.APPLICANT_ID

  // }

  // deletePigmyAcc(data: any): void {
  //   this.confirmModal = this.modal.confirm({
  //     nzTitle: this.api.translate.instant('common.confirmModal.nzTitle'),
  //     nzContent: this.api.translate.instant('common.confirmModal.nzContent'),
  //     nzOnOk: () =>
  //       new Promise((resolve, reject) => {
  //         data.ARCHIVE_FLAG = "T";

  //         this.api.updateDepositInformation(data).subscribe(
  //           successCode => {
  //             if (successCode['code'] == 200) {
  //               this.getPigmyAcc();
  //               setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
  //               this.drawerClose8();
  //               this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
  //             }
  //             else {
  //               this.message.error(this.api.translate.instant('common.message.success.deleteinfo'), "");
  //             }
  //           }
  //         )

  //       }).catch(() => { })//console.log('माहिती बदल करण्यात अयशस्वी!'))
  //   });
  // }

  // drawerClose8(): void {
  //   // this.loadData();
  //   this.getPigmyAcc();
  //   this.drawerVisible8 = false;
  // }
  // get closeCallback8() {
  //   return this.drawerClose8.bind(this);
  // }


  // Pedit(data: FRecurringDeposit, i: number): void {
  //   this.pigmyAccInfo.saveCount = 0;
  //   this.index = i;
  //   this.drawerTitle8 = this.api.translate.instant('cash-credit-loan-other.title8');
  //   this.drawerData8 = Object.assign({}, data);
  //   this.drawerVisible8 = true;

  //   this.logtext = 'EDIT - CashCreditOther form KEYWORD [E - CashCreditOther] ';
  //   this.api.addLog('A', this.logtext, this.api.emailId)
  //     .subscribe(successCode => {
  //       if (successCode['code'] == "200") {
  //         ////console.log(successCode);
  //       }
  //       else {
  //         ////console.log(successCode);
  //       }
  //     });
  // }

  // getPigmyAcc() {
  //   this.api.getDepositInformation(this.PROPOSAL_ID, 'P').subscribe(
  //     successCode => {
  //       if (successCode['code'] == 200) {
  //         this.pigmyAccdata = successCode['data']
  //       }
  //     }
  //   )
  // }

  // saveWorkdata25(): void {
  //   if (this.index > -1) {
  //     this.pigmyAccdata[this.index] = Object.assign({}, this.drawerData8);
  //   } else {
  //     this.pigmyAccdata.push(Object.assign({}, this.drawerData8));
  //   }
  //   this.pigmyAccdata = [...this.pigmyAccdata];
  //   this.index = -1;
  // }

  totalIncome() {
    let total6 = 0;


    for (const amt of this.termDepositdata) {

      total6 += parseFloat(amt.ACC_AMOUNT.toString());

    }

    return total6;
  }

  averageInterest() {
    if (this.termDepositdata.length === 0) {
      return 0; // Handle the case when the array is empty to avoid division by zero
    }

    let totalInterest = 0;

    for (const entry of this.termDepositdata) {
      // Assuming that the property name is 'interest', modify it if your property is named differently
      totalInterest += parseFloat(entry.INTEREST_RATE.toString());
    }

    // Calculate the average by dividing the total interest by the number of entries
    const average = totalInterest / this.termDepositdata.length;

    return average;
  }

  totalCountOfReceiptNo() {
    // Initialize a variable to store the total count
    let totalCount = 0;

    for (const entry of this.termDepositdata) {
      // Assuming that the property name is 'receipt.no', modify it if your property is named differently
      // Check if the entry has a receipt number before incrementing the count
      if (entry['RECEIPT_NO']) {
        totalCount++;
      }
    }

    return totalCount;
  }


    getDaysRemaining(): number | null {
    const earliestMaturityDate = this.earliestMaturityDueDate();
  
    if (!earliestMaturityDate) {
      return null;
    }
  
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
  
    const MS_PER_DAY = 24 * 60 * 60 * 1000;
    const daysRemaining = Math.floor((earliestMaturityDate.getTime() - currentDate.getTime()) / MS_PER_DAY);
  
    return daysRemaining;
  }
  
  earliestMaturityDueDate(): Date | null {
    if (this.termDepositdata.length === 0) {
      return null;
    }
  
    let earliestDueDate: Date | null = null;
  
    this.termDepositdata.forEach(entry => {
      const maturityDate = new Date(entry['MATURITY_DUE']);
      maturityDate.setHours(0, 0, 0, 0);
  
      if (!earliestDueDate || maturityDate < earliestDueDate) {
        earliestDueDate = maturityDate;
      }
    });
  
    return earliestDueDate;
  }
  
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }

}
