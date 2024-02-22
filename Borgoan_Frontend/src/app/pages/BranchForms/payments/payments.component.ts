import { Component, OnInit, ViewChild } from '@angular/core';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { Branchmaster } from 'src/app/Models/BasicForms/branchmaster';
import { Payments } from 'src/app/Models/Payments/payments';
import { PaymentapprovalComponent } from '../paymentapproval/paymentapproval.component';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  formTitle = "व्यवहार पहा";
  pageIndex = 1;
  pageSize = 10;
  totalRecords = 1;
  dataList = [];
  loadingRecords = true;
  sortValue: string = "desc";
  sortKey: string = "id";
  searchText: string = "";
  filterQuery: string = "";
  isFilterApplied: string = "default";
  logtext: string = "";
  dataList1 = []
  columns: string[][] = [['LOAN_TYPE_NAME', this.api.translate.instant('payments.columns1')], ['LOAN_AMOUNT', this.api.translate.instant('payments.columns2')], ['APPLICANT_NAME', this.api.translate.instant('payments.columns3')], ['TRANSACTION_NUMBER', this.api.translate.instant('payments.columns4')], ['TRANSACTION_DATE', this.api.translate.instant('payments.columns5')], ['AMOUNT', this.api.translate.instant('payments.columns6')], ['CHALAN_NUMBER', this.api.translate.instant('payments.columns7')]]

  //drawer Variables
  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: Payments = new Payments();

  userActivityLogData: Useractivitylog = new Useractivitylog();
  @ViewChild(PaymentapprovalComponent) paymentApprove: PaymentapprovalComponent;
  browserLang = ''
  branchId = sessionStorage.getItem("branchId")
  constructor(private api: ApiService, private message: NzNotificationService) { }
  ngOnInit() {
    this.browserLang = localStorage.getItem('locale');
    if (this.browserLang == 'mr') {
      this.columns = [['LOAN_TYPE_NAME', this.api.translate.instant('payments.columns1')], ['LOAN_AMOUNT', this.api.translate.instant('payments.columns2')], ['APPLICANT_NAME', this.api.translate.instant('payments.columns3')], ['TRANSACTION_NUMBER', this.api.translate.instant('payments.columns4')], ['TRANSACTION_DATE', this.api.translate.instant('payments.columns5')], ['AMOUNT', this.api.translate.instant('payments.columns6')], ['CHALAN_NUMBER', this.api.translate.instant('payments.columns7')]]
    } else if (this.browserLang == 'en') {
      this.columns = [['LOAN_TYPE_NAME_EN', this.api.translate.instant('payments.columns1')], ['LOAN_AMOUNT', this.api.translate.instant('payments.columns2')], ['APPLICANT_NAME', this.api.translate.instant('payments.columns3')], ['TRANSACTION_NUMBER', this.api.translate.instant('payments.columns4')], ['TRANSACTION_DATE', this.api.translate.instant('payments.columns5')], ['AMOUNT', this.api.translate.instant('payments.columns6')], ['CHALAN_NUMBER', this.api.translate.instant('payments.columns7')]]
    } else {
      this.columns = [['LOAN_TYPE_NAME_KN', this.api.translate.instant('payments.columns1')], ['LOAN_AMOUNT', this.api.translate.instant('payments.columns2')], ['APPLICANT_NAME', this.api.translate.instant('payments.columns3')], ['TRANSACTION_NUMBER', this.api.translate.instant('payments.columns4')], ['TRANSACTION_DATE', this.api.translate.instant('payments.columns5')], ['AMOUNT', this.api.translate.instant('payments.columns6')], ['CHALAN_NUMBER', this.api.translate.instant('payments.columns7')]]
    }
    this.search();

    this.logtext = "OPENED - Payments form KEYWORD[O - Payments] ";
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          //console.log(successCode);
        }
        else {
          //console.log(successCode);
        }
      });

    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "Payments - Opened"
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
  // Basic Methods
  sort(sort: { key: string; value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;
    this.search(true);
  }

  search(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loadingRecords = true;
    var sort: string;
    try {
      sort = this.sortValue.startsWith("a") ? "asc" : "desc";

      this.logtext = "Filter Applied - Payments form" + sort + " " + this.sortKey + " KEYWORD [F - Payments] ";
      this.api.addLog('A', this.logtext, this.api.emailId)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            //console.log(successCode);
          }
          else {
            //console.log(successCode);
          }
        });

      this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
      this.userActivityLogData.ACTIVITY_DETAILS = "Payments - Sort on " + sort + " " + this.sortKey
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

    } catch (error) {
      sort = "";
    }
    //console.log("search text:" + this.searchText);
    if (this.searchText != "") {
      var likeQuery = " AND";
      this.columns.forEach(column => {
        likeQuery += " " + column[0] + " like '%" + this.searchText + "%' OR";
      });
      likeQuery = likeQuery.substring(0, likeQuery.length - 2)
      //console.log("likeQuery" + likeQuery);

      this.logtext = "Filter Applied - Payments form " + likeQuery + " KEYWORD [F - Payments] ";
      this.api.addLog('A', this.logtext, this.api.emailId)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            //console.log(successCode);
          }
          else {
            //console.log(successCode);
          }
        });

      this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
      this.userActivityLogData.ACTIVITY_DETAILS = "Payments - Search For " + this.searchText + " " + likeQuery
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
    var filter = ""
    if (likeQuery)
      filter = " AND BRANCH_ID=" + this.branchId + likeQuery
    else
      filter = " AND BRANCH_ID=" + this.branchId

    //console.log(filter)

    this.api.getAllPayments(this.pageIndex, this.pageSize, this.sortKey, sort, filter).subscribe(data => {
      //console.log(data)
      this.loadingRecords = false;
      this.totalRecords = data['count'];
      this.dataList = data['data'];
    }, err => {
      //console.log(err);
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('payments.messageservernotfound'), "");
    });


  }
  //Drawer Methods
  get closeCallback() {
    return this.drawerClose.bind(this);
  }

  drawerClose(): void {
    this.search();
    this.drawerVisible = false;
  }

  verifyPayment(data: Payments): void {
    //console.log(data)
    this.drawerTitle = this.api.translate.instant('payments.drowername');
    this.drawerData = Object.assign({}, data);
    if (this.drawerData.STATUS == "Y")
      this.drawerData.STATUS = "A"
    this.paymentApprove.getUrl(data.RECEIPT_URL)
    this.drawerVisible = true;


  }
}
