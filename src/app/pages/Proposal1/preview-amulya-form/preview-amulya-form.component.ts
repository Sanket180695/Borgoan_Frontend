import { Component, Input, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';

import html2pdf from "html2pdf.js";
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { Proposalstage } from 'src/app/Models/BasicForms/proposalstage';
import { Sort } from 'src/app/Models/LoanTypeQues/Amulya/Sorts';
import { Goldloan } from 'src/app/Models/LoanTypeQues/goldloan';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { Amulya } from 'src/app/Models/PersonalProposal/amulyaloan';
import { Personalinformation } from 'src/app/Models/PersonalProposal/personalinformation';
import { AmulyaNew } from 'src/app/Models/amulya-new';
import { Proposal } from 'src/app/Models/proposal';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-preview-amulya-form',
  templateUrl: './preview-amulya-form.component.html',
  styleUrls: ['./preview-amulya-form.component.css']
})
export class PreviewAmulyaFormComponent implements OnInit {
  @Input() drawerClose: Function;

  @Input() filterClose: Function;

  @Input() data: Proposal;

  @Input() data2: AmulyaNew;

  @Input() selectedDate1

  @Input() IS_SANCTIONED = false

  IS_VISIBLE: boolean = false;

  roleId = sessionStorage.getItem("roleId")

  addressinfoCurrent: Addressinfo = new Addressinfo();

  addressList = []

  PROPOSAL_ID: number;
  isButtonSpinning = false;
  browserLang = "kn";
  reconsideredlist = [];
  reconsidered = [];

  formSpinning:boolean = false;

  userId = sessionStorage.getItem('userId')
  REMARKS: string = ""

  loadingRecords1 = false;
  pageIndex = 1;
  pageSize = 10;
  totalRecords = 1;

  loadingRecords = true;
  sortValue: string = "desc";
  sortKey: string = "id";
  isSpinning: boolean

  loansList = []
  goldLoanList = []
  depositLoanList = []
  termDepositInfo: any = [];
  amulyaLoanList = []

  goldAddressList = [new Personalinformation(), new Personalinformation()]
  depositAddressList = [new Personalinformation(), new Personalinformation()]
  amulyaAddressList = [new Personalinformation(), new Personalinformation()]

  goldLoanSpecificData: Goldloan = new Goldloan();
  goldLoanSpecificList = []

  amulyaLoanSpecific = [new Amulya(), new Amulya()]
  groupSaving: string = '';

  postSanctionData: AmulyaNew = new AmulyaNew;
  postSanctionList = []

  branchList = []
  branchData = []
  dataList1 = [];

  constructor(public api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {

  }
  branchById() {

    let getBranches

    this.api.getAllBranches(0, 0, 'ID', "asc", "")
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          getBranches = successCode['data'];
        }
      });
  }

  processBranch() {

    this.branchList = []

    for (let branchGold of this.goldLoanList) {
      if (!this.branchList.includes(branchGold.BRANCH_ID)) {
        this.branchList.push(branchGold.BRANCH_ID)
      }
    }


    for (let branchDeposit of this.depositLoanList) {
      if (!this.branchList.includes(branchDeposit.BRANCH_ID)) {
        this.branchList.push(branchDeposit.BRANCH_ID)
      }
    }


    for (let branchAmulya of this.amulyaLoanList) {
      if (!this.branchList.includes(branchAmulya.BRANCH_ID)) {
        this.branchList.push(branchAmulya.BRANCH_ID)
      }
    }


    this.filterProposals();

    console.log("This is branchList ---------- ", this.branchList)
    console.log("This is branchData ---------- ", this.branchData)

  }

  filterProposals() {
    this.branchData = []



    for (let branch of this.branchList) {
      let obj = { branch_id: branch, branch_name: '', goldList: [], amulyaList: [], depositList: [] }


      for (let goldBranch of this.goldLoanList) {
        if (goldBranch.BRANCH_ID == branch) {
          obj.goldList.push(goldBranch);
          obj.branch_name = goldBranch.BRANCH_NAME
        }
      }

      for (let depositBranch of this.depositLoanList) {
        if (depositBranch.BRANCH_ID == branch) {
          obj.depositList.push(depositBranch);
          obj.branch_name = depositBranch.BRANCH_NAME
        }
      }

      for (let amulyaBranch of this.amulyaLoanList) {
        if (amulyaBranch.BRANCH_ID == branch) {
          obj.amulyaList.push(amulyaBranch);
          obj.branch_name = amulyaBranch.BRANCH_NAME
        }
      }

      this.branchData.push(obj)

      this.formSpinning = false;

    }
  }

  receiveProposalIDs(proposalIDs: number[]) {
    this.data2.SANCTIONED_LIST = proposalIDs;
  }

  PROPOSAL_TYPE: string = "";
  index = 0;
  personalInformationId: number;
  personalInfo: Personalinformation = new Personalinformation();

  batchIdCounter: number = 1;

  numericId: number;

  async sanction() {

    this.isButtonSpinning = true;

    this.api.generateNewNumericId();
    this.numericId = this.api.getNumericId();

    var batchId = this.numericId

    this.data2.BATCH_ID = batchId;

    this.data2.IS_COMPLETED = true

    this.api.updateNewAmulya(this.data2).subscribe({
      next: (res) => {
        if (res['code'] != 200) {
          this.message.error("Failed Update to Amulya Loan-Specific Information", '');
        }
      }
    })



    for (let loan of this.goldLoanList) {

      loan.CURRENT_STAGE_ID = 17
      loan.BATCH_ID = batchId;
      loan.IS_RECONSIDERED = false;

      // ////console.log(nextStageId, this.data.ID)
      this.api.updateProposal(loan).subscribe({
        next: (successCode) => {
          if (successCode['code'] != "200") {
            this.message.error("Failed To Send Proposals To Loan Sanctioned Stage", '');
          }
        }
      })

    }



    for (let loan of this.depositLoanList) {

      loan.CURRENT_STAGE_ID = 17
      loan.BATCH_ID = batchId;
      loan.IS_RECONSIDERED = false;

      // ////console.log(nextStageId, this.data.ID)
      this.api.updateProposal(loan).subscribe({
        next: (depositUpdate) => {
          if (depositUpdate['code'] != "200") {
            this.message.error("Failed To Send Proposals To Loan Sanctioned Stage", '');
          }
        }
      })



    }


    for (let loan of this.amulyaLoanList) {

      loan.CURRENT_STAGE_ID = 17
      loan.BATCH_ID = batchId;
      loan.IS_RECONSIDERED = false;

      // ////console.log(nextStageId, this.data.ID)
      await this.api.updateProposal(loan).subscribe({
        next: (amulyaUpdate) => {
          if (amulyaUpdate['code'] != "200") {
            this.message.error("Failed To Send Proposals To Loan Sanctioned Stage", '');
          }
        }
      })

    }

    this.isButtonSpinning = false;
    this.close()

    this.data = new Proposal()
    this.data2 = new AmulyaNew()
    this.filterClose();
    // this.search()

  }

  logtext: string = "";
  userActivityLogData: Useractivitylog = new Useractivitylog();
  searchText: string = "";
  columns: string[][] = [['LOAN_KEY', this.api.translate.instant('proposalsall.columns1')], ['PRAPOSAL_TYPE', this.api.translate.instant('proposalsall.columns2')], ['LOAN_TYPE_NAME', this.api.translate.instant('proposalsall.columns3')], ['LOAN_AMOUNT', this.api.translate.instant('proposalsall.columns4')], ['APPLICANT_NAME', this.api.translate.instant('proposalsall.columns5')], ['BRANCH_NAME', this.api.translate.instant('proposalsall.columns6')], ['MOBILE_NUMBER', this.api.translate.instant('proposalsall.columns7')], ['AGE', this.api.translate.instant('proposalsall.columns10')], ['CREATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns14')], ['HANDED_OVER_TO_HO_DATETIME', this.api.translate.instant('proposalsall.columns16')], ['HANDED_OVER_TO_HO_DATETIME', this.api.translate.instant('proposalsall.columns16')], ['LAST_UPDATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns15')]]
  branchId = sessionStorage.getItem('branchId')
  filterQuery: string = "";
  filterClass: string = "filter-visible";
  isFilterApplied: string = "default";
  dataList = [];

  dataListAddress = []


  getProposals(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loadingRecords = true;
    this.isSpinning = true
    var sort: string;
    try {
      sort = this.sortValue.startsWith("a") ? "asc" : "desc";

      this.logtext = "Filter Applied - Praposals form" + sort + " " + this.sortKey + " KEYWORD [F - Praposals] ";
      this.api.addLog('A', this.logtext, this.api.emailId)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            //////console.log(successCode);
          }
          else {
            //////console.log(successCode);
          }
        });
      this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
      this.userActivityLogData.ACTIVITY_DETAILS = "ApplicantProposal - Sort on " + sort + " " + this.sortKey
      this.userActivityLogData.ACTIVITY_TIME = new Date()
      this.api.createUserActivityLog(this.userActivityLogData)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            //////console.log(successCode);
          }
          else {
            //////console.log(successCode);
          }
        });

    } catch (error) {
      sort = "";
    }
    var likeQuery = ""
    //////console.log("search text:" + this.searchText);
    if (this.searchText != "") {
      likeQuery = " AND (";

      this.columns.forEach(column => {
        likeQuery += " " + column[0] + " like '%" + this.searchText + "%' OR";
      });
      likeQuery = likeQuery.substring(0, likeQuery.length - 2) + ")"
    }



    var filter = ""
    if (Number(this.branchId) == 0) {
      if (likeQuery)
        filter = "AND CURRENT_STAGE_ID = 16" + this.filterQuery + likeQuery
      else
        filter = "AND CURRENT_STAGE_ID = 16" + this.filterQuery
    }
    else {
      if (likeQuery)
        filter = "AND CURRENT_STAGE_ID = 16 AND BRANCH_ID=" + this.branchId + this.filterQuery + likeQuery
      else
        filter = "AND CURRENT_STAGE_ID = 16 AND BRANCH_ID=" + this.branchId + this.filterQuery
    }



    this.logtext = "Filter Applied - Praposals form " + likeQuery + " KEYWORD [F - Praposals] ";
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          //////console.log(successCode);
        }
        else {
          //////console.log(successCode);
        }
      });

    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "ApplicantProposal - Search For " + this.searchText + " " + likeQuery
    this.userActivityLogData.ACTIVITY_TIME = new Date()
    this.api.createUserActivityLog(this.userActivityLogData)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          //////console.log(successCode);
        }
        else {
          //////console.log(successCode);
        }
      });

    //////console.log("filter applied")
    //////console.log(filter)

    this.api.getAllPraposals(this.pageIndex, this.pageSize, this.sortKey, sort, filter).subscribe(data => {
      //////console.log("data")
      //////console.log(data)
      this.loadingRecords = false;
      this.isSpinning = false
      this.totalRecords = data['count'];
      this.dataList = data['data'];
      //console.log("dataList in getAllProposal", this.dataList);
      this.filterClass = "filter-invisible";
      this.isFilterApplied = "primary"
    }, err => {
      //////console.log(err);
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });
  }

  close() {
    this.drawerClose()
    this.IS_VISIBLE = false
    this.search()
  }

  getData() {
    this.api.getNewAmulya().subscribe(data => {

      this.totalRecords = data['count'];

      if (data['data'].length > 0) {
        this.data2 = data['data'][0]
      }
      else {
        this.data2 = new AmulyaNew()
      }

    }, err => {
      console.log(err);
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });

  }

  loanAllReflections() {
    this.formSpinning = true
    this.getGoldLoan();
    this.getDepositLoan();
    this.getAmulyaLoan();
    this.IS_VISIBLE = true
    setTimeout(() => {
      this.processBranch();
    }, 6000);
  }

  loanAllReflections2() {
    this.getGoldLoan2();
    this.getDepositLoan2();
    this.getAmulyaLoan2();
    this.getAmulyaNewCompleted()
    this.IS_VISIBLE = true
    setTimeout(() => {
      this.processBranch();
    }, 6000);
  }

  getAmulyaNewCompleted() {
    let filter = ` AND BATCH_ID = ${this.data.BATCH_ID}`
    this.api.getCompletedNewAmulya(filter).subscribe({
      next: (amulyaGet) => {
        console.log("AMULYA NEW ", amulyaGet)
        if (amulyaGet['code'] == 200 && amulyaGet['data'].length > 0) {
          this.data2 = amulyaGet['data'][0];
        }
      }
    })

  }

  getGoldLoan() {

    this.loadingRecords1 = true;
    this.isSpinning = true
    var sort: string;

    let list = '(0,'

    for (let value of this.reconsideredlist) {
      list += `${value},`;
    }

    list = list.slice(0, -1);

    list += ')';

    var filter = `AND CURRENT_STAGE_ID = 16 AND LOAN_TYPE_ID = 8 AND ID not in${list}`

    this.api.getAllPraposals(this.pageIndex, this.pageSize, this.sortKey, sort, filter).subscribe(data => {

      this.loadingRecords1 = false;
      this.isSpinning = false
      this.totalRecords = data['count'];
      this.goldLoanList = data['data'];
      // this.filterGoldloan();
      this.getGoldAddress();
      this.goldLoanSpecific();

    }, err => {
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });

  }

  filterGoldloan() {
    let filteredlist = []
    for (let reid of this.reconsideredlist) {


      for (let gold of this.goldLoanList) {
        if (reid != gold.ID) {
          filteredlist.push(gold)
        }

      }

    }


    this.goldLoanList = filteredlist


  }

  getGoldLoan2() {

    this.loadingRecords1 = true;
    this.isSpinning = true
    var sort: string;
    var filter = `AND CURRENT_STAGE_ID = ${this.data.CURRENT_STAGE_ID} AND LOAN_TYPE_ID = 8 AND BATCH_ID = ${this.data.BATCH_ID} AND BRANCH_ID = ${this.data.BRANCH_ID}`

    this.api.getAllPraposals(this.pageIndex, this.pageSize, this.sortKey, sort, filter).subscribe(data => {

      this.loadingRecords1 = false;
      this.isSpinning = false
      this.totalRecords = data['count'];
      this.goldLoanList = data['data'];
      this.getGoldAddress();
      this.goldLoanSpecific();

    }, err => {
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });

  }

  getGoldAddress() {
    this.goldAddressList = []
    this.goldLoanList.forEach((item) => {
      this.api.getAddressInfo(item.ID, "B", null)
        .subscribe(
          (data) => {
            if (data["code"] == 200 && data["data"].length > 0) {
              this.goldAddressList.push(data["data"][0]);
            }
          },
          (err) => {
            ////console.log(err);
          }
        );
    });
  }

  goldLoanSpecific() {

    this.goldLoanSpecificList = []
    this.goldLoanList.forEach((item) => {
      this.api.getAllGoldLoan(0, 0, "", 'asc', " AND PROPOSAL_ID=" + item.ID)
        .subscribe(data => {
          if (data['code'] == '200' && data['count'] > 0) {
            this.goldLoanSpecificList.push(data["data"][0]);
          }
        }, err => {
          //console.log(err);
        });
    });
  }

  getDepositLoan() {
    this.loadingRecords1 = true;
    this.isSpinning = true
    var sort: string;

    let list = '(0,'

    for (let value of this.reconsideredlist) {
      list += `${value},`;
    }

    list = list.slice(0, -1);

    list += ')';

    var filter = `AND CURRENT_STAGE_ID = 16 AND (LOAN_TYPE_ID = 9 OR LOAN_TYPE_ID = 10 OR LOAN_TYPE_ID = 11) AND ID not in${list}`

    this.api.getAllPraposals(this.pageIndex, this.pageSize, this.sortKey, sort, filter).subscribe(data => {

      this.loadingRecords1 = false;
      this.isSpinning = false
      this.totalRecords = data['count'];
      this.depositLoanList = data['data'];
      this.getDepositAddress()
      this.loadTermDepositData()

    }, err => {
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });

    // this.loadTermDepositData();
  }

  getDepositLoan2() {
    this.loadingRecords1 = true;
    this.isSpinning = true
    var sort: string;
    var filter = `AND CURRENT_STAGE_ID = ${this.data.CURRENT_STAGE_ID} AND (LOAN_TYPE_ID = 9 OR LOAN_TYPE_ID = 10 OR LOAN_TYPE_ID = 11) AND BATCH_ID = ${this.data.BATCH_ID} AND BRANCH_ID = ${this.data.BRANCH_ID}`

    this.api.getAllPraposals(this.pageIndex, this.pageSize, this.sortKey, sort, filter).subscribe(data => {

      this.loadingRecords1 = false;
      this.isSpinning = false
      this.totalRecords = data['count'];
      this.depositLoanList = data['data'];
      this.getDepositAddress()
      this.loadTermDepositData()

    }, err => {
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });

    // this.loadTermDepositData();
  }

  getDepositAddress() {
    this.depositAddressList = []
    this.depositLoanList.forEach((item) => {
      this.api.getAddressInfo(item.ID, "B", null)
        .subscribe(
          (data) => {
            if (data["code"] == 200 && data["data"].length > 0) {
              this.depositAddressList.push(data["data"][0]);
            }
          },
          (err) => {
            ////console.log(err);
          }
        );
    });
  }


  termDepositeTotal: any = []

  loadTermDepositData() {
    this.termDepositeTotal = []
    this.depositLoanList.forEach((item) => {
      this.api.getDepositInformation(item.ID, 'T').subscribe((data) => {
        if (data["code"] == 200 && data["data"]) {
          this.termDepositInfo.push(data['data']);
          this.termDepositeTotal.push(this.calculateTotal(data['data'], item.ID))

          console.log("Term deposite array", this.termDepositInfo);
          console.log("Term deposite amount total", this.termDepositeTotal);
        }
      });
    })
  }

  calculateTotal(arr, proposal_id) {
    let result = {
      total: 0,
      PROPOSAL_ID: proposal_id
    }

    for (let item of arr) {
      result.total += item.ACC_AMOUNT;
    }

    return result;
  }


  getAmulyaLoan() {
    this.loadingRecords1 = true;
    this.isSpinning = true
    var sort: string;
    let list = '(0,'

    for (let value of this.reconsideredlist) {
      list += `${value},`;
    }

    list = list.slice(0, -1);

    list += ')';

    var filter = `AND CURRENT_STAGE_ID = 16 AND LOAN_TYPE_ID = 17 AND ID not in${list}`

    this.api.getAllPraposals(this.pageIndex, this.pageSize, this.sortKey, sort, filter).subscribe(data => {

      this.loadingRecords1 = false;
      this.isSpinning = false
      this.totalRecords = data['count'];
      this.amulyaLoanList = data['data'];
      this.getAmulyatAddress()
      this.getAmulyaLoanSpecific()

    }, err => {
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });

    // let sortKey: Sort = new Sort(this.PROPOSAL_ID);
    // this.api.getLoanSpecificInfo_Amulya(sortKey).subscribe(data => {
    //   if (data['code'] == 200 && data['data'].length > 0) {
    //     this.LoanSpecific = data['data']
    //   }
    // });


  }

  getAmulyaLoan2() {
    this.loadingRecords1 = true;
    this.isSpinning = true
    var sort: string;
    var filter = `AND CURRENT_STAGE_ID = ${this.data.CURRENT_STAGE_ID} AND LOAN_TYPE_ID = 17 AND BATCH_ID = ${this.data.BATCH_ID} AND BRANCH_ID = ${this.data.BRANCH_ID}`

    this.api.getAllPraposals(this.pageIndex, this.pageSize, this.sortKey, sort, filter).subscribe(data => {

      this.loadingRecords1 = false;
      this.isSpinning = false
      this.totalRecords = data['count'];
      this.amulyaLoanList = data['data'];
      this.getAmulyatAddress()
      this.getAmulyaLoanSpecific()

    }, err => {
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });

  }

  getAmulyatAddress() {
    this.amulyaAddressList = []
    this.amulyaLoanList.forEach((item) => {
      this.api.getAddressInfo(item.ID, "B", null)
        .subscribe(
          (data) => {
            if (data["code"] == 200 && data["data"].length > 0) {
              this.amulyaAddressList.push(data["data"][0]);
            }
          },
          (err) => {
            ////console.log(err);
          }
        );
    });
  }

  getAmulyaLoanSpecific() {

    this.amulyaLoanSpecific = []
    this.amulyaLoanList.forEach((item) => {

      let sortKey: Sort = {
        PROPOSAL_ID: item.ID
      }
      this.api.getLoanSpecificInfo_Amulya(sortKey).subscribe(res => {
        if (res['code'] == 200 && res['data'].length > 0) {
          this.amulyaLoanSpecific.push(res["data"][0]);
        }
      })
    });

  }



  // let sortKey: Sort = new Sort(this.PROPOSAL_ID);
  //   this.api.getLoanSpecificInfo_Amulya(sortKey).subscribe(data => {
  //     if (data['code'] == 200 && data['data'].length > 0) {
  //       this.LoanSpecific = data['data']
  //     }
  //   });


  public generatePDF() {
    var i = 0;

    var data = document.getElementById("contentToConvert");
    let startCount = 0;

    let loan_type = '';
    loan_type = 'Loan Application'

    var opt = {
      margin: 0.2,
      filename: 'Sanction_Note',
      // filename: `${this.data.APPLICANT_NAME}_${this.data.ID}_${loan_type}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 4 },
      jsPDF: { unit: "in", format: "A4", orientation: "portrait" },
    };
    html2pdf()
      .set(opt)
      .from(data)
      .toPdf()
      .get("pdf")
      .then((pdf) => {
        var totalPages = pdf.internal.getNumberOfPages();
        for (i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.setFontSize(10);
          pdf.setTextColor(100);
          pdf.text(
            `${i + startCount}`,
            pdf.internal.pageSize.getWidth() / 2,
            pdf.internal.pageSize.getHeight() - 0.1
          );
        }
        this.message.success("PDF generated Successfully!", "");

      })
      .save();



    this.api
      .getAllPraposals(
        0,
        0,
        "ID",
        "asc",
        " AND PROPOSAL_ID=" + this.PROPOSAL_ID
      )
      .subscribe(
        (data) => {
          if (data["code"] == 200 && data["count"] > 0) {
            this.data = data["data"][0];
            //console.log("poposal signature ani" + this.data);
          }
        },
        (err) => {
          this.isButtonSpinning = false;
          //console.log(err);
          if (err["ok"] == false) this.message.error("Server Not Found", "");
        }
      );
  }


  gPDF() {
    this.isButtonSpinning = true;
    //console.log(" this.isButtonSpinning", this.isButtonSpinning);
    this.generatePDF();
    this.isButtonSpinning = false;

  }

  changeLang(language: string): void {
    this.browserLang = language;
  }



  
  search(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loadingRecords = true;
    this.isSpinning = true
    var sort: string;
    try {
      sort = this.sortValue.startsWith("a") ? "asc" : "desc";

      this.logtext = "Filter Applied - Praposals form" + sort + " " + this.sortKey + " KEYWORD [F - Praposals] ";
      this.api.addLog('A', this.logtext, this.api.emailId)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            //////console.log(successCode);
          }
          else {
            //////console.log(successCode);
          }
        });
      this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
      this.userActivityLogData.ACTIVITY_DETAILS = "ApplicantProposal - Sort on " + sort + " " + this.sortKey
      this.userActivityLogData.ACTIVITY_TIME = new Date()
      this.api.createUserActivityLog(this.userActivityLogData)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            //////console.log(successCode);
          }
          else {
            //////console.log(successCode);
          }
        });

    } catch (error) {
      sort = "";
    }
    var likeQuery = ""
    //////console.log("search text:" + this.searchText);
    if (this.searchText != "") {
      likeQuery = " AND (";

      this.columns.forEach(column => {
        likeQuery += " " + column[0] + " like '%" + this.searchText + "%' OR";
      });
      likeQuery = likeQuery.substring(0, likeQuery.length - 2) + ")"
    }



    var filter = ""
    if (Number(this.branchId) == 0) {
      if (likeQuery)
        filter = "AND CURRENT_STAGE_ID = 16" + this.filterQuery + likeQuery
      else
        filter = "AND CURRENT_STAGE_ID = 16" + this.filterQuery
    }
    else {
      if (likeQuery)
        filter = "AND CURRENT_STAGE_ID = 16 AND BRANCH_ID=" + this.branchId + this.filterQuery + likeQuery
      else
        filter = "AND CURRENT_STAGE_ID = 16 AND BRANCH_ID=" + this.branchId + this.filterQuery
    }



    this.logtext = "Filter Applied - Praposals form " + likeQuery + " KEYWORD [F - Praposals] ";
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          //////console.log(successCode);
        }
        else {
          //////console.log(successCode);
        }
      });

    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "ApplicantProposal - Search For " + this.searchText + " " + likeQuery
    this.userActivityLogData.ACTIVITY_TIME = new Date()
    this.api.createUserActivityLog(this.userActivityLogData)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          //////console.log(successCode);
        }
        else {
          //////console.log(successCode);
        }
      });

    //////console.log("filter applied")
    //////console.log(filter)

    this.api.getAllPraposals(this.pageIndex, this.pageSize, 'LAST_UPDATED_ON_DATETIME', sort, filter).subscribe(data => {
      //////console.log("data")
      //////console.log(data)
      this.loadingRecords = false;
      this.isSpinning = false
      this.totalRecords = data['count'];
      this.dataList = data['data'];
      this.reconsidered = [];
      //console.log("dataList in getAllProposal", this.dataList);
      this.filterClass = "filter-invisible";
      this.isFilterApplied = "primary"
    }, err => {
      //////console.log(err);
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });

    this.api.getAllPraposals(0, 0, 'LAST_UPDATED_ON_DATETIME', sort, filter).subscribe(data => {
      this.dataList1 = data['data'];
    }, err => {
      //////console.log(err);
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });
  }

 

 

 

}
