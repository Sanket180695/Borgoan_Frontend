import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { ReportGetParameters } from 'src/app/Models/PersonalProposal/report-get-parameters';
import { Proposal } from 'src/app/Models/proposal';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-proposal-filterwise-report',
  templateUrl: './proposal-filterwise-report.component.html',
  styleUrls: ['./proposal-filterwise-report.component.css'],
  providers: [DatePipe]
})
export class ProposalFilterwiseReportComponent implements OnInit {

  TITLE: string;

  REPORT_PRAMS: ReportGetParameters = new ReportGetParameters();

  TABLE_DATA: Proposal[] = []

  tableLoading: boolean = false;

  browserLang = localStorage.getItem('locale');

  filter: string = ''

  STAGES_LIST = []
  LOANTYPE_LIST = []
  BRANCH_LIST = []
  INCOME_LIST = []
  APPLICANT_TYPE_LIST = [
    { TYPE: 1, VALUE: "वैयक्तिक", VALUE_EN: 'Personal' },
    { TYPE: 2, VALUE: "व्यवसाईक  / फर्म (संस्था)", VALUE_EN: 'Business / Firm (Society)' }
  ]

  selectedDate = []
  columns: string[][] = [['LOAN_KEY', this.api.translate.instant('proposalsall.columns1')], ['PRAPOSAL_TYPE', this.api.translate.instant('proposalsall.columns2')], ['LOAN_TYPE_NAME', this.api.translate.instant('proposalsall.columns3')], ['LOAN_AMOUNT', this.api.translate.instant('proposalsall.columns4')], ['APPLICANT_NAME', this.api.translate.instant('proposalsall.columns5')], ['BRANCH_NAME', this.api.translate.instant('proposalsall.columns6')], ['MOBILE_NUMBER', this.api.translate.instant('proposalsall.columns7')], ['AGE', this.api.translate.instant('proposalsall.columns10')], ['CREATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns14')], ['LAST_UPDATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns15')]]


  EXEL_DATA = []

  constructor(private api: ApiService, private message: NzNotificationService, private datePipe: DatePipe) { }

  ngOnInit(): void {

    if (this.browserLang == 'mr') {
      this.columns = [['LOAN_KEY', this.api.translate.instant('proposalsall.columns1')], ['LOAN_TYPE_NAME', this.api.translate.instant('proposalsall.columns3')], ['LOAN_AMOUNT', this.api.translate.instant('proposalsall.columns4')], ['APPLICANT_NAME', this.api.translate.instant('proposalsall.columns5')], ['BRANCH_NAME', this.api.translate.instant('proposalsall.columns6')], ['MOBILE_NUMBER', this.api.translate.instant('proposalsall.columns7')], ['AGE', this.api.translate.instant('proposalsall.columns10')], ['CUSTOMER_ID', this.api.translate.instant('newwords.neww1')], ['PAN', this.api.translate.instant('gpersonalinfo.label10')], ['AADHAR', this.api.translate.instant('gpersonalinfo.label11')], ['CREATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns14')], ['LAST_UPDATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns15')]]
    } else if (this.browserLang == 'en') {
      this.columns = [['LOAN_KEY', this.api.translate.instant('proposalsall.columns1')], ['LOAN_TYPE_NAME_EN', this.api.translate.instant('proposalsall.columns3')], ['LOAN_AMOUNT', this.api.translate.instant('proposalsall.columns4')], ['APPLICANT_NAME', this.api.translate.instant('proposalsall.columns5')], ['BRANCH_NAME_EN', this.api.translate.instant('proposalsall.columns6')], ['MOBILE_NUMBER', this.api.translate.instant('proposalsall.columns7')], ['AGE', this.api.translate.instant('proposalsall.columns10')], ['CUSTOMER_ID', this.api.translate.instant('newwords.neww1')], ['PAN', this.api.translate.instant('gpersonalinfo.label10')], ['AADHAR', this.api.translate.instant('gpersonalinfo.label11')], ['CREATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns14')], ['LAST_UPDATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns15')]]
    } else {
      this.columns = [['LOAN_KEY', this.api.translate.instant('proposalsall.columns1')], ['LOAN_TYPE_NAME_KN', this.api.translate.instant('proposalsall.columns3')], ['LOAN_AMOUNT', this.api.translate.instant('proposalsall.columns4')], ['APPLICANT_NAME', this.api.translate.instant('proposalsall.columns5')], ['BRANCH_NAME_KN', this.api.translate.instant('proposalsall.columns6')], ['MOBILE_NUMBER', this.api.translate.instant('proposalsall.columns7')], ['AGE', this.api.translate.instant('proposalsall.columns10')], ['CUSTOMER_ID', this.api.translate.instant('newwords.neww1')], ['PAN', this.api.translate.instant('gpersonalinfo.label10')], ['AADHAR', this.api.translate.instant('gpersonalinfo.label11')], ['CREATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns14')], ['LAST_UPDATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns15')]]
    }

    this.REPORT_PRAMS.PAGE_SIZE = 10;
    this.REPORT_PRAMS.PAGE_INDEX = 1;
    // this.getAllLists();
    this.getReport();
  }


  changeFilterKey() {
    if (this.REPORT_PRAMS.REPORT_ID == "1") {
      this.REPORT_PRAMS.SORT_KEY = 'BRANCH_ID'
    }

    if (this.REPORT_PRAMS.REPORT_ID == "6") {
      this.REPORT_PRAMS.SORT_KEY = 'CURRENT_STAGE_ID'
    }

    if (this.REPORT_PRAMS.REPORT_ID == "7") {
      this.REPORT_PRAMS.SORT_KEY = 'LOAN_AMOUNT'
    }


    if (this.REPORT_PRAMS.REPORT_ID == "8") {
      this.REPORT_PRAMS.SORT_KEY = 'LOAN_TYPE_ID'
    }

    if (this.REPORT_PRAMS.REPORT_ID == "14") {
      this.REPORT_PRAMS.SORT_KEY = 'PRAPOSAL_TYPE'
    }

    // if(this.REPORT_PRAMS.REPORT_ID == "16"){
    //   this.REPORT_PRAMS.SORT_KEY ='PRAPOSAL_TYPE'
    // }


  }

  getReport(clear: boolean = true) {
    this.tableLoading = true;
    this.changeFilterKey();

    if (this.REPORT_PRAMS.REPORT_ID == "1" || this.REPORT_PRAMS.REPORT_ID == "6" || this.REPORT_PRAMS.REPORT_ID == "8" || this.REPORT_PRAMS.REPORT_ID == "16") {
      this.filter = `  AND ${this.REPORT_PRAMS.SORT_KEY}=${this.REPORT_PRAMS.SORT_VALUE} ${this.REPORT_PRAMS.START_DATE ? " AND CREATED_ON_DATETIME >= " + "'" + this.REPORT_PRAMS.START_DATE + "'" : ""} ${this.REPORT_PRAMS.END_DATE ? " AND CREATED_ON_DATETIME <= " + "'" + this.REPORT_PRAMS.END_DATE + "'" : ""} `
    }

    if (this.REPORT_PRAMS.REPORT_ID == "7") {
      this.filter = `${this.REPORT_PRAMS.START_AMOUNT ? "  AND " + this.REPORT_PRAMS.SORT_KEY >= +" " + "'" + this.REPORT_PRAMS.START_AMOUNT + "'" : ""}  ${this.REPORT_PRAMS.END_AMOUNT ? "  AND " + this.REPORT_PRAMS.SORT_KEY >= +" " + "'" + this.REPORT_PRAMS.END_AMOUNT + "'" : ""}  ${this.REPORT_PRAMS.START_DATE ? " AND CREATED_ON_DATETIME >= " + "'" + this.REPORT_PRAMS.START_DATE + "'" : ""} ${this.REPORT_PRAMS.END_DATE ? " AND CREATED_ON_DATETIME <= " + "'" + this.REPORT_PRAMS.END_DATE + "'" : ""} `

    }

    if (this.REPORT_PRAMS.REPORT_ID == "15") {
      this.filter = ` ${this.REPORT_PRAMS.START_DATE ? "  AND CREATED_ON_DATETIME >= " + "'" + this.REPORT_PRAMS.START_DATE + "'" : ""} ${this.REPORT_PRAMS.END_DATE ? " AND CREATED_ON_DATETIME <= " + "'" + this.REPORT_PRAMS.END_DATE + "'" : ""} `
    }

    if (this.REPORT_PRAMS.REPORT_ID == "14") {
      this.filter = `  AND ${this.REPORT_PRAMS.SORT_KEY} = '${this.REPORT_PRAMS.SORT_VALUE}' ${this.REPORT_PRAMS.START_DATE ? " AND CREATED_ON_DATETIME >= " + "'" + this.REPORT_PRAMS.START_DATE + "'" : ""} ${this.REPORT_PRAMS.END_DATE ? " AND CREATED_ON_DATETIME <= " + "'" + this.REPORT_PRAMS.END_DATE + "'" : ""} `
    }

    if (clear) {
      this.filter = ''
    }


    this.api.getFilterwiseReports(this.filter, this.REPORT_PRAMS.PAGE_SIZE, this.REPORT_PRAMS.PAGE_INDEX).subscribe({
      next: (res) => {
        if (res['code'] == 200 && res['data'].length > 0) {
          this.REPORT_PRAMS.TOTAL_COUNT = res['count'];
          this.TABLE_DATA = res['data'];
          this.EXEL_DATA = res['allData'];
          this.tableLoading = false;
        }
        else {
          this.TABLE_DATA = []
          this.tableLoading = false;
        }
      },
      error:()=>{
        this.tableLoading = false;
      }
    });
  }

  getStageList() {
    let filter = " AND STATUS=1"
    this.api.getAllProposalStages(0, 0, 'SEQUENCE_NUMBER', 'asc', filter).subscribe({
      next: (res) => {
        if (res['code'] == 200 && res['data'].length > 0) {
          this.STAGES_LIST = res['data'];
        }
      }, error: () => {
      }
    });
  }

  getLoanTypeList() {
    this.api.getAllLoanTypes(0, 0, 'ID', 'desc', "").subscribe({
      next: (res) => {
        if (res['code'] == 200 && res['data'].length > 0) {
          this.LOANTYPE_LIST = res['data'];
        }
      }, error: () => {
      }
    });
  }

  getBranchList() {
    console.log("In Branch Function")
    this.api.getAllBranches(0, 0, 'ID', "asc", "").subscribe({
      next: (res) => {
        if (res['code'] == 200 && res['data'].length > 0) {
          this.BRANCH_LIST = res['data'];
        }
      }, error: () => {
      }
    });
  }

  getIncomeList() {
    this.api.getAllIncomeSocurce(0, 0, "ID", "asc", "")
      .subscribe({
        next: (res) => {
          if (res['code'] == 200 && res['data'].length > 0) {
            this.INCOME_LIST = res['data'];
          }
        }, error: () => {
        }
      });
  }

  getAllLists() {

    if (this.REPORT_PRAMS.REPORT_ID == "1") {
      this.getBranchList()
    }

    if (this.REPORT_PRAMS.REPORT_ID == "6") {
      this.getStageList();
    }

    if (this.REPORT_PRAMS.REPORT_ID == "8") {
      this.getLoanTypeList();
    }

    if (this.REPORT_PRAMS.REPORT_ID == "16") {
      this.getIncomeList();
    }
  }

  changeDate(event) {
    this.REPORT_PRAMS.START_DATE = ''
    this.REPORT_PRAMS.END_DATE = ''

    this.REPORT_PRAMS.START_DATE = this.datePipe.transform(event[0], "yyyy-MM-dd")
    this.REPORT_PRAMS.END_DATE = this.datePipe.transform(event[1], "yyyy-MM-dd")

  }

  clearFilter() {
    this.REPORT_PRAMS.SORT_VALUE = null
    this.REPORT_PRAMS.START_DATE = null
    this.REPORT_PRAMS.END_DATE = null
    this.REPORT_PRAMS.START_AMOUNT = null
    this.REPORT_PRAMS.END_AMOUNT = null
    this.REPORT_PRAMS.PAGE_INDEX = 1;
    this.REPORT_PRAMS.PAGE_SIZE = 10;
    this.selectedDate = [];
    this.getReport();
  }

  generatePDF(): void {
    var prtContent = document.getElementById("tableContent");

    let newWin= window.open("");
    newWin.document.write(prtContent.outerHTML);
    newWin.print();
    newWin.close();
    // const doc = new jsPDF();

    // doc.addFileToVFS('../../../../../assets/Shreelipi0714.ttf')
    // doc.addFont('../../../../../assets/Shreelipi0714.ttf', 'custom', 'normal');
    // doc.setFont('custom');
    
    // const headers = [
    //   this.api.translate.instant('proposalsall.columns1'),
    //   this.api.translate.instant('proposalsall.columns2'),
    //   this.api.translate.instant('proposalsall.columns3'),
    //   this.api.translate.instant('proposalsall.columns4'),
    //   this.api.translate.instant('proposalsall.columns5'),
    //   this.api.translate.instant('proposalsall.columns6'),
    //   this.api.translate.instant('proposalsall.columns7'),
    //   this.api.translate.instant('proposalsall.columns10'),
    //   this.api.translate.instant('proposalsall.columns14'),
    //   this.api.translate.instant('proposalsall.columns15')
    // ];

    // const data = this.EXEL_DATA.map(entry => [
    //   entry.LOAN_KEY,
    //   entry.PRAPOSAL_TYPE,
    //   entry.LOAN_TYPE_NAME,
    //   entry.LOAN_AMOUNT,
    //   entry.APPLICANT_NAME,
    //   entry.BRANCH_NAME,
    //   entry.MOBILE_NUMBER,
    //   entry.AGE, 
    //   entry.CREATED_ON_DATETIME,
    //   entry.LAST_UPDATED_ON_DATETIME
    // ]);

    // (doc as any).autoTable({
    //   head: [headers],
    //   body: data,
    //   margin: { top: 20 },
    //   styles: {
    //     // font:'custom',
    //     fontSize: 8,
    //     cellPadding: { top: 5, right: 5, bottom: 5, left: 5 },
    //     halign: 'center',
    //     valign: 'middle',
    //     lineWidth: 0.1,
    //     lineColor: [128, 128, 128]
    //   },
    //   headStyles: {
    //     fillColor: [200, 200, 200],
    //     textColor: [0, 0, 0],
    //     fontSize: 8,
    //     fontStyle: 'bold'
    //   },
    //   didDrawPage: function (data: any) {
    //     doc.setFontSize(8);
    //     doc.text('Report', data.settings.margin.left, 10);
    //   }
    // });
    // doc.save('Report.pdf');
  }


}
