import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BankLoan } from './Models/bank-loan';
import { GuarantorForLoans } from './Models/guarantor-for-loans';
import { EarlierLoanInfo } from './Models/earlier-loan-info';
import { DepositeInBank } from './Models/deposite-in-bank';
import { NzNotificationService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Creditinformation } from 'src/app/Models/PersonalProposal/creditinformation';
import { ApiService } from 'src/app/Service/api.service';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { DatePipe } from '@angular/common';
import { Bank } from 'src/app/bank';


@Component({
  selector: 'app-credit-info',
  templateUrl: './credit-info.component.html',
  styleUrls: ['./credit-info.component.css']
})
export class CreditInfoComponent implements OnInit {
  @Output() demo: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() data: Creditinformation;
  @Input() PROPOSAL_ID: number
  @Input() APPLICANT_ID: number
  @Input() oldIndex: number
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();
  isSpinning = false;
  isSpinning1 = false;
  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();
  pageIndex = 1;
  pageSize = 10;
  totalRecords = 1;
  loanData: any = [];
  loanData2: any = [];
  loans2: any = [];
  loans: any = [];
  dataList = [];
  dataList2 = [];
  dataList3 = [];
  dataList4 = [];
  dataList5 = [];
  dataList6 = [];
  dataList7 = [];
  dataList8 = [];
  dataList9 = [];
  dataList11 = [];
  dataList10 = [];
  loadingRecords1 = false;
  loadingRecords2 = false;
  loadingRecords3 = false;
  loadingRecords4 = false;
  sortValue: string = "desc";
  sortKey: string = "ID";
  searchText: string = "";
  likeQuery: string = "";
  isFilterApplied: string = "default";
  drawerVisible1: boolean;
  drawerTitle1: string;
  drawerData1: BankLoan = new BankLoan();
  drawerData2: BankLoan = new BankLoan();
  drawerVisible2: boolean;
  drawerTitle2: string;
  drawerData3: GuarantorForLoans = new GuarantorForLoans();
  drawerData4: GuarantorForLoans = new GuarantorForLoans();
  drawerVisible3: boolean;
  drawerTitle3: string;
  drawerData5: EarlierLoanInfo = new EarlierLoanInfo();
  drawerVisible4: boolean;
  drawerTitle4: string;
  drawerData6: DepositeInBank = new DepositeInBank();
  logtext: string = ""
  creditId: number
  extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  isButtonVerifySpinning = false
  confirmModal?: NzModalRef;
  proposaltype = sessionStorage.getItem("PRAPOSAL_TYPE")
  bankName = ""
  @Input() LOAN_KEY: Number;
  @Input() CURRENT_STAGE_ID: number;
  browserLang = 'en';
  constructor(
    private message: NzNotificationService,
    private api: ApiService,
    private modal: NzModalService,
    private datePipe:DatePipe

  ) { }

  ngOnInit(): void {
    this.browserLang = localStorage.getItem('locale');
    if(this.browserLang == 'kn'){
      this.bank = Bank.BankName_Kn; 
    }
    if(this.browserLang == 'en'){
      this.bank = Bank.BankName; 
    }
    if(this.browserLang == 'mr'){
      this.bank = Bank.BankName_Mr; 
    }
    this.getData();
    this.loadInfo()
  }


  loadInfo() {
    let filter = " AND EXTRA_INFORMATION_ID=5 AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND TYPE='B'"
    this.api.getAllApplicantExtraInformation(0, 0, "SEQ_NO", "asc", filter).subscribe(data => {
      this.extraApplicantInformation = data['data'][0]
    }, err => {
      //console.log(err);
    });
  }

  getData() {
    this.api.getPageSetttngs(0, 0, 'ID', 'asc', '').subscribe(data => {
      //console.log(data)
     
      //console.log(this.bankName)
    }, err => {
      //console.log(err);
    });

    // this.api.getAllLoanTypes(0, 0, 'ID', "asc", " AND STATUS=1")
    //   .subscribe(successCode => {
    //     this.loanData = [];
    //     if (successCode['code'] == "200" && successCode['count'] > 0) {
    //       this.loanData = successCode['data'];
          this.loadData()
    //     }
    //   });

    let filter = ""
    //console.log("this.proposaltype")

    //console.log(this.proposaltype)
    if (this.proposaltype == "1") {
      //console.log("I")
      filter = " AND IS_ACTIVE=1 "
    }
    else {
      //console.log("F")
      filter = " AND IS_ACTIVE=1 AND TYPE='B'"
    }


    this.api.getAllLoanScheme(0, 0, 'ID', "asc", filter)
      .subscribe(successCode => {
        //console.log("bank loan types")
        //console.log(successCode)
        this.loanData2 = [];
        if (successCode['code'] == "200" && successCode['count'] > 0) {
          this.loanData2 = successCode['data'];
        }
      });
  }

  loadData() {
    this.isSpinning = true
    let filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND TYPE='B'"
    this.api.getAllCreditInformation(0, 0, 'ID', "asc", filter).subscribe(data => {
      this.isSpinning = false
      this.data = new Creditinformation();
      if (data['count'] > 0) {
        this.data = Object.assign({}, data['data'][0]);
        this.creditId = this.data.ID
        this.getData2();
        this.getData3();
        // this.getData4();
        this.getData5();
      }
    }, err => {
      //console.log(err);
    });
  }

  updateCheckedSet(id: number, checked: boolean, amount: number, indexOfelement): void {
    if (id != undefined) {
      if (checked) {
        this.data.OUTSTANDING_BANK_AMOUNT = this.data.OUTSTANDING_BANK_AMOUNT + amount;
        this.dataList10[indexOfelement].IS_SELECTED = true;
        this.setOfCheckedId.add(id);
      } else {
        this.setOfCheckedId.delete(id);
        this.data.OUTSTANDING_BANK_AMOUNT = this.data.OUTSTANDING_BANK_AMOUNT - amount;
        this.dataList10[indexOfelement].IS_SELECTED = false;
        if (this.data.OUTSTANDING_BANK_AMOUNT < 0) {
          this.data.OUTSTANDING_BANK_AMOUNT = 0;
        }
      }
    }
  }

  onItemChecked(id: number, amount: number, indexOfelement, checked: boolean): void {

    this.updateCheckedSet(id, checked, amount, indexOfelement);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.data.OUTSTANDING_BANK_AMOUNT = 0;
    this.dataList10.forEach((item, index) => {
      this.updateCheckedSet(item.ID, value, item.LOAN_OUTSTANDING, index);
    });
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.dataList10.every(item => this.setOfCheckedId.has(item.ID));
    this.indeterminate = this.dataList10.some(item => this.setOfCheckedId.has(item.ID)) && !this.checked;
  }

  filterLoans(IS_EXISTING_LOAN_WITH_SUB, IS_EXISTING_LOAN_WITH_OTHER_BANKS) {
    //this.dataList10 = [];
    //console.log(IS_EXISTING_LOAN_WITH_OTHER_BANKS)
    //console.log(IS_EXISTING_LOAN_WITH_SUB)

    if (this.dataList11.length > 0) {
      if (IS_EXISTING_LOAN_WITH_SUB == 1 && IS_EXISTING_LOAN_WITH_OTHER_BANKS == 1) {
        this.dataList10 = this.dataList11;
      } else {


        if (IS_EXISTING_LOAN_WITH_OTHER_BANKS == 1) {
          this.dataList10 = this.dataList11.filter((item) => item.IS_SUB == 0);
        }

        if (IS_EXISTING_LOAN_WITH_SUB == 1) {
          this.dataList10 = this.dataList11.filter((item) => item.IS_SUB == 1);
        }
      }
    }
    this.data.OUTSTANDING_BANK_AMOUNT = 0;
    this.dataList10.forEach((item, index) => {

      if (item.IS_SELECTED == 1) {
        this.updateCheckedSet(item.ID, true, item.LOAN_OUTSTANDING, index);
      } else {
        this.updateCheckedSet(item.ID, false, 0, index);
      }
    });
    this.refreshCheckedStatus();
  }

  getData2() {
    this.loadingRecords1 = true;
    this.api.getAllLoanTakenInformation(0, 0, 'ID', "asc", "AND CREDIT_INFORMATION_ID = " + this.data.ID + " AND ARCHIVE_FLAG = 'F'")
      .subscribe(successCode => {
        //console.log(successCode)
        this.dataList11 = [];
        this.dataList = [];
        this.dataList6 = [];
        this.loadingRecords1 = false;
        if (successCode['code'] == "200" && successCode['count'] > 0) {
          this.dataList11 = successCode['data'];
          this.dataList = successCode['data'].filter((item) => item.IS_SUB == 1);
          this.dataList6 = successCode['data'].filter((item) => item.IS_SUB == 0);
          // this.filterLoans(this.data.IS_EXISTING_LOAN_WITH_SUB, this.data.IS_EXISTING_LOAN_WITH_OTHER_BANKS);

        }
      });
  }


  getData3() {
    this.loadingRecords2 = true;
    this.api.getAllGuarantorForLoans(0, 0, 'ID', "asc", "AND CREDIT_INFORMATION_ID = " + this.data.ID + " AND ARCHIVE_FLAG = 'F'")
      .subscribe(successCode => {
        this.dataList2 = []
        this.dataList7 = []
        this.loadingRecords2 = false;
        if (successCode['code'] == "200" && successCode['count'] > 0) {
          this.dataList2 = successCode['data'].filter((item) => item.IS_SUB == 1);
          this.dataList7 = successCode['data'].filter((item) => item.IS_SUB == 0);
        }
      });
  }

  getData4() {
    this.loadingRecords3 = true;
    this.api.getAllDepositsInBank(0, 0, 'ID', "asc", "AND CREDIT_INFORMATION_ID = " + this.data.ID + " AND ARCHIVE_FLAG = 'F'")
      .subscribe(successCode => {
        this.loadingRecords3 = false;
        this.dataList4 = []
        this.dataList8 = []
        if (successCode['code'] == "200" && successCode['count'] > 0) {
          this.dataList4 = successCode['data'].filter((item) => item.IS_SUB == 1);
          this.dataList8 = successCode['data'].filter((item) => item.IS_SUB == 0);
        }
      });

  }

  getData5() {
    this.loadingRecords4 = true;
    this.api.getAllEarlierLoanHistory(0, 0, 'ID', "asc", "AND CREDIT_INFORMATION_ID = " + this.data.ID + " AND ARCHIVE_FLAG = 'F'")
      .subscribe(successCode => {
        this.dataList5 = []
        this.dataList9 = []
        this.loadingRecords4 = false;
        if (successCode['code'] == "200" && successCode['count'] > 0) {
          this.dataList5 = successCode['data'].filter((item) => item.IS_SUB == 1);
          this.dataList9 = successCode['data'].filter((item) => item.IS_SUB == 0);
        }
      });

  }

  getLoanName(id: number, issub) {

     var num = Number(id);
      if (this.loanData2.length > 0 && num > 0) {
        var loannames = this.loanData2.filter((item) => item.ID == id);
        if (this.browserLang == 'mr') {
          return loannames[0]['NAME_MR'];
        } else if (this.browserLang == 'en') {
          return loannames[0]['NAME_EN'];
        } else {
          return loannames[0]['NAME_KN'];
        }
      } else {
        return '-';
      }
   
  }




  save() {
    //console.log("saves for data")
    //console.log(this.data)
    //console.log(Boolean(1))
    var isOk = true;
    var isOk1 = true;
    if (this.data.IS_EXISTING_LOAN_WITH_SUB == 1) {
      if (this.dataList.length == 0) {
        this.message.error(Bank.BankName + this.api.translate.instant('gcreditinfo.message1'), "");
        isOk = false;
      }
    }

    if (this.data.IS_EXISTING_LOAN_WITH_OTHER_BANKS == 1) {
      if (this.dataList6.length == 0) {
        //console.log(this.dataList6.length)
        this.message.error(this.api.translate.instant('gcreditinfo.message2'), "");
        isOk = false;
      }
    }
    if (this.data.IS_GUARANTOR_TO_LOAN_WITH_SUB == 1) {
      if (this.dataList2.length == 0) {
        this.message.error(this.api.translate.instant('gcreditinfo.label1.child1') + Bank.BankName + this.api.translate.instant('gcreditinfo.message3'), "");
        isOk = false;
      }
    }
    if (this.data.IS_GUARANTOR_TO_LOAN_WITH_OTHER_BANK == 1) {
      if ( this.dataList7.length == 0) {
        this.message.error(this.api.translate.instant('gcreditinfo.message4'), "");
        isOk = false;
      }
    }
    if (this.data.IS_EARLIAR_LOAN_HISTORY == true) {
      if ( this.dataList5.length == 0) {
        this.message.error(this.api.translate.instant('gcreditinfo.label5.child1') + Bank.BankName + this.api.translate.instant('gcreditinfo.message5'), "");
        isOk = false;
      }
    }

    if (this.data.IS_EARLIAR_LOAN_HISTORY_WITH_OTHER_BANK == 1) {
      if ( this.dataList9.length == 0) {
        this.message.error(this.api.translate.instant('gcreditinfo.message6'), "");
        isOk = false;
      }
    }


    if (this.data.IS_ANY_DEPOSITES_WITH_SUB == 1) {
      if ( this.dataList4.length == 0) {
        this.message.error(this.api.translate.instant('gcreditinfo.label1.child1') + Bank.BankName + this.api.translate.instant('gcreditinfo.message7'), "");
        isOk = false;
      }
    }
    if (this.data.IS_ANY_DEPOSITES_WITH_OTHER_BANK == 1) {
      if (this.dataList8.length == 0) {
        this.message.error(this.api.translate.instant('gcreditinfo.message8'), "");
        isOk = false;
      }
    }

    if (this.data.IS_LOAN_TAKEN_FOR_CLOSE_OTHER_LOANS == 1) {
      var extraData = []
      extraData = this.dataList10.filter(object => {
        return object['IS_SELECTED'] == 1
      });
      //console.log(extraData.length)
      if (extraData.length > 0)
        isOk1 = true
      else {
        isOk1 = false
        this.message.error(this.api.translate.instant('gcreditinfo.message9'), "");
      }
    }
    if(this.data.OTHER_LOAN_DETAILS == undefined ){
      this.data.OTHER_LOAN_DETAILS = " "
    }
    if(this.data.LOAN_GUARENTEE_AMOUNT == undefined ){
      this.data.LOAN_GUARENTEE_AMOUNT = 0
    }
    if(this.data.LOAN_GUARENTEE_COUNT == undefined ){
      this.data.LOAN_GUARENTEE_COUNT = 0
    }
    //console.log(isOk)
    if (isOk && isOk1) {
      this.data['data'] = this.dataList10;
      this.data.TYPE = "B"

      //console.log("comeplie")
      if (this.data.ID) {
        this.isSpinning1 = true;
        this.api.updateCreaditInfo(this.data)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              var LOG_ACTION = 'User saved Credit Info tab information'
              var DESCRIPTION = sessionStorage.getItem('userName') + 'has saved the Credit Info for the proposal ' + this.LOAN_KEY
              var LOG_TYPE = 'I'
              this.api.proposalLogInformation(this.extraApplicantInformation.PROPOSAL_ID, this.extraApplicantInformation.CURRENT_STAGE_ID, 0, LOG_ACTION, Number(sessionStorage.getItem("userId")), DESCRIPTION, LOG_TYPE)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                  }
                });
              this.getData()
              this.demo.emit(false)
              this.oldIndex++;
              this.indexChanged.emit(this.oldIndex)
              this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
              this.logtext = 'Update & Close - CreaditInfo form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - CreaditInfo ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                  }
                });
              this.isSpinning1 = false;
            }
            else {
              this.logtext = 'Update & Close - CreaditInfo form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - CreaditInfo ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                  }
                });
              this.message.error(this.api.translate.instant('gcreditinfo.message10'), "");
              this.isSpinning1 = false;
            }
          });
      }





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
                LOG_ACTION = 'Credit Info Tab information Verified'

                DESCRIPTION = sessionStorage.getItem('userName') + ' has checked and approved the Credit Info for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK
              } else {
                LOG_ACTION = 'Credit Info Tab information Rejected'
                DESCRIPTION = sessionStorage.getItem('userName') + 'has checked and rejected the Credit Info for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK

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

  sort(sort: { key: string; value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;

  }

  search(reset: boolean = false) {
  }

  changeInfo(value, data) {
    if (value)
      data.IS_SELECTED = 1;
    else
      data.IS_SELECTED = 0
  }

  add1(is_sub: boolean) {

    this.drawerData1 = new BankLoan();
    if (is_sub) {
      this.drawerTitle1 = Bank.BankName + this.api.translate.instant('gcreditinfo.drawerTitle1');
      this.drawerData1.IS_SUB = true;
      this.drawerData1.BANK_OR_INSTITUTE_NAME = Bank.BankName + this.api.translate.instant('gcreditinfo.name');
      this.loans = this.loanData2;
    } else {
      this.drawerTitle1 = this.api.translate.instant('gcreditinfo.drawerTitle2');
      this.drawerData1.IS_SUB = false;
      this.drawerData1.BANK_OR_INSTITUTE_NAME = undefined;
      this.loans = this.loanData2;
    }
    this.drawerData1.CREDIT_INFORMATION_ID = this.data.ID;
    this.drawerData1.SECURITY_OFFERED = undefined;
    this.drawerVisible1 = true;
  }

  get closeCallback1() {
    return this.drawerClose1.bind(this);
  }



  drawerClose1(): void {
    this.getData2();
    this.drawerVisible1 = false;
  }

  delete1(data: any): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: this.api.translate.instant('common.confirmModal.nzTitle'),
      nzContent: this.api.translate.instant('common.confirmModal.nzContent'),
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          data.ARCHIVE_FLAG = "T";
          this.api.updateLoanTakenInformation(data)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                this.message.success(this.api.translate.instant('common.message.success.deleteinfo'), "");
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                this.getData2();
              }
              else {
                this.message.error(this.api.translate.instant('common.message.success.deleteinfo'), "");

              }
            });
        }).catch(() => console.log('माहिती बदल करण्यात अयशस्वी!'))
    });


  }

  edit1(data: any): void {
    if (data.IS_SUB) {
      this.loans = this.loanData2;
      this.drawerTitle1 = Bank.BankName + this.api.translate.instant('gcreditinfo.drawerTitle3');
    }
    else {
      this.drawerTitle1 = this.api.translate.instant('gcreditinfo.drawerTitle4');
      this.loans = this.loanData2;
    }
    this.drawerData1 = Object.assign({}, data);
    this.drawerData1.SANCTION_DATE = this.datePipe.transform(this.drawerData1.SANCTION_DATE, 'dd/MM/yyyy');
    this.drawerData1.DUE_DATE = this.datePipe.transform(this.drawerData1.DUE_DATE, 'dd/MM/yyyy');
    this.drawerData1.REPAYMENT_DATE = this.datePipe.transform(this.drawerData1.REPAYMENT_DATE, 'dd/MM/yyyy');
    this.drawerVisible1 = true;
    // this.logtext = 'EDIT - CreditIfo form KEYWORD [E - CreditIfo] ';
    // this.api.addLog('A', this.logtext, this.api.emailId)
    //   .subscribe(successCode => {
    //     if (successCode['code'] == "200") {
    //       //console.log(successCode);
    //     }
    //     else {
    //       //console.log(successCode);
    //     }
    //   });


  }

  add2(is_sub2: boolean) {

    if (is_sub2) {
      this.drawerTitle2 = Bank.BankName + this.api.translate.instant('gcreditinfo.drawerTitle5');
      this.drawerData3 = new GuarantorForLoans();
      this.drawerData3.IS_SUB = true;
      this.drawerData3.BANK_OR_INSTITUTE_NAME = Bank.BankName + this.api.translate.instant('gcreditinfo.name');
      this.loans2 = this.loanData2;
    } else {
      this.drawerTitle2 = this.api.translate.instant('gcreditinfo.drawerTitle6');
      this.drawerData3 = new GuarantorForLoans();
      this.drawerData3.IS_SUB = false;
      this.drawerData3.BANK_OR_INSTITUTE_NAME = undefined;
      this.loans2 = this.loanData2;
    }
    this.drawerData3.CREDIT_INFORMATION_ID = this.data.ID;
    this.drawerVisible2 = true;
  }

  get closeCallback2() {
    return this.drawerClose2.bind(this);
  }

  drawerClose2(): void {
    this.getData3();
    this.drawerVisible2 = false;
  }
  
  delete2(data: any): void {
    //console.log("data gurantor")
    //console.log(data)
    this.confirmModal = this.modal.confirm({
      nzTitle: this.api.translate.instant('common.confirmModal.nzTitle'),
      nzContent: this.api.translate.instant('common.confirmModal.nzContent'),
      nzOnOk: () =>
        new Promise((resolve, reject) => {


          data.ARCHIVE_FLAG = "T";
          this.api.updateGuarantorForLoans(data)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                this.message.success(this.api.translate.instant('common.message.success.deleteinfo'), "");
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                this.getData3();
              }
              else {
                this.message.error(this.api.translate.instant('common.message.success.deleteinfo'), "");

              }
            });
        }).catch(() => console.log('माहिती बदल करण्यात अयशस्वी!'))
    });
  }
  edit2(data: any): void {
    if (data.IS_SUB) {
      this.loans2 = this.loanData2;
      this.drawerTitle2 = Bank.BankName + this.api.translate.instant('gcreditinfo.drawerTitle7');
    }
    else {
      this.loans2 = this.loanData2;
      this.drawerTitle2 = this.api.translate.instant('gcreditinfo.drawerTitle8');
    }

    this.drawerData3 = Object.assign({}, data);
    this.drawerData3.DUE_DATE = this.datePipe.transform(this.drawerData3.DUE_DATE, 'dd/MM/yyyy');
    this.drawerVisible2 = true;

    // this.logtext = 'EDIT - CreditInfo form KEYWORD [E - Creadit] ';
    // this.api.addLog('A', this.logtext, this.api.emailId)
    //   .subscribe(successCode => {
    //     if (successCode['code'] == "200") {
    //       //console.log(successCode);
    //     }
    //     else {
    //       //console.log(successCode);
    //     }
    //   });
  }

  add3(is_sub3: boolean) {

    this.drawerData5 = new EarlierLoanInfo();
    this.loans = this.loanData2;
    if (is_sub3) {
      this.drawerTitle3 = Bank.BankName + this.api.translate.instant('gcreditinfo.drawerTitle9');
      this.drawerData5.IS_SUB = true;
      this.drawerData5.BANK_NAME = Bank.BankName + this.api.translate.instant('gcreditinfo.name');
    } else {
      this.drawerTitle3 = this.api.translate.instant('gcreditinfo.drawerTitle10');
      this.drawerData5.IS_SUB = false;
      this.drawerData5.BANK_NAME = undefined;
    }
    this.drawerData5.CREDIT_INFORMATION_ID = this.data.ID;

    this.drawerVisible3 = true;
  }

  get closeCallback3() {
    return this.drawerClose3.bind(this);
  }

  drawerClose3(): void {
    this.getData5();
    this.drawerVisible3 = false;
  }

  delete3(data: any): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: this.api.translate.instant('common.confirmModal.nzTitle'),
      nzContent: this.api.translate.instant('common.confirmModal.nzContent'),
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          data.ARCHIVE_FLAG = "T";
          this.api.updateEarlierLoanHistory(data)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                this.message.success(this.api.translate.instant('common.message.success.deleteinfo'), "");
                this.getData5();
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
              }
              else {
                this.message.error(this.api.translate.instant('common.message.success.deleteinfo'), "");

              }
            });
        }).catch(() => console.log('माहिती बदल करण्यात अयशस्वी!'))
    });

  }

  edit3(data: any): void {
    this.loans = this.loanData2;
    if (data.IS_SUB)
      this.drawerTitle3 = Bank.BankName + this.api.translate.instant('gcreditinfo.drawerTitle11');
    else
      this.drawerTitle3 = this.api.translate.instant('gcreditinfo.drawerTitle12');
    this.drawerData5 = Object.assign({}, data);
    this.drawerData5.LOAN_TAKEN_DATE = this.datePipe.transform(this.drawerData5.LOAN_TAKEN_DATE, 'dd/MM/yyyy');
    this.drawerData5.DUEDATE = this.datePipe.transform(this.drawerData5.DUEDATE, 'dd/MM/yyyy');
    this.drawerData5.REPAYMENT_DATE = this.datePipe.transform(this.drawerData5.REPAYMENT_DATE, 'dd/MM/yyyy');
    

    this.drawerVisible3 = true;

    // this.logtext = 'EDIT - CreditInfo form KEYWORD [E - CreditInfo] ';
    // this.api.addLog('A', this.logtext, this.api.emailId)
    //   .subscribe(successCode => {
    //     if (successCode['code'] == "200") {
    //       //console.log(successCode);
    //     }
    //     else {
    //       //console.log(successCode);
    //     }
    //   });


  }

  add4(is_sub3: boolean) {

    this.drawerData6 = new DepositeInBank();
    if (is_sub3) {
      this.drawerTitle4 = Bank.BankName + this.api.translate.instant('gcreditinfo.drawerTitle13');
      this.drawerData6.IS_SUB = true;
      this.drawerData6.BANK_NAME = Bank.BankName + this.api.translate.instant('gcreditinfo.name');
    } else {
      this.drawerTitle4 = this.api.translate.instant('gcreditinfo.drawerTitle14');
      this.drawerData6.IS_SUB = false;
      this.drawerData6.BANK_NAME = undefined;
    }
    this.drawerData6.CREDIT_INFORMATION_ID = this.data.ID;

    this.drawerVisible4 = true;
  }

  get closeCallback4() {
    return this.drawerClose4.bind(this);
  }

  drawerClose4(): void {
    this.getData4();
    this.drawerVisible4 = false;
  }
  delete4(data: any): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: this.api.translate.instant('common.confirmModal.nzTitle'),
      nzContent: this.api.translate.instant('common.confirmModal.nzContent'),
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          data.ARCHIVE_FLAG = "T";
          this.api.updateDepositsInBank(data)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                this.message.success(this.api.translate.instant('common.message.success.deleteinfo'), "");
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                this.getData4();
              }
              else {
                this.message.error(this.api.translate.instant('common.message.success.deleteinfo'), "");

              }
            });
        }).catch(() => console.log('माहिती बदल करण्यात अयशस्वी!'))
    });
  }

  edit4(data: any): void {
    if (data.IS_SUB)
      this.drawerTitle4 = Bank.BankName + this.api.translate.instant('gcreditinfo.drawerTitle15');
    else
      this.drawerTitle4 = this.api.translate.instant('gcreditinfo.drawerTitle16');

    this.drawerData6 = Object.assign({}, data);

    this.drawerVisible4 = true;

    // this.logtext = 'EDIT - CreditInfo form KEYWORD [E - CreditInfo] ';
    // this.api.addLog('A', this.logtext, this.api.emailId)
    //   .subscribe(successCode => {
    //     if (successCode['code'] == "200") {
    //       //console.log(successCode);
    //     }
    //     else {
    //       //console.log(successCode);
    //     }
    //   });


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
}
