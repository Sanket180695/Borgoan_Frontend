import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Proposal } from 'src/app/Models/proposal';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { Proposalstage } from 'src/app/Models/BasicForms/proposalstage';

import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { ProposaldocumentComponent } from '../../Proposals/proposaldocument/proposaldocument.component';
import { JoinbranchComponent } from '../joinbranch/joinbranch.component';
import { CibilcheckingComponent } from '../cibilchecking/cibilchecking.component';
import { StatuslogsComponent } from '../../Proposals/statuslogs/statuslogs.component';
import { DatePipe } from '@angular/common';
import { PersonalproposalComponent } from '../../PersonalProposal/personalproposal/personalproposal.component';
import { Loantypes } from 'src/app/Models/BasicForms/loantypes';
import { PasstomainbranchComponent } from '../passtomainbranch/passtomainbranch.component';
import { FormprintComponent } from '../../formprint/formprint.component';
import { Loaninformation } from 'src/app/Models/PersonalProposal/loaninformation';
// import { AhvalprintComponent } from '../../ahvalprint/ahvalprint.component';
import { Applicant } from 'src/app/Models/Applicant/applicant';
import { Payments } from 'src/app/Models/Payments/payments';
import { NewproposalComponent } from '../newproposal/newproposal.component';


@Component({
  selector: 'app-mylistloan',
  templateUrl: './mylistloan.component.html',
  styleUrls: ['./mylistloan.component.css'],
  providers: [DatePipe]
})
export class MylistloanComponent implements OnInit {

  data:Proposal = new Proposal
  drawerData9: Proposal = new Proposal();
  drawerVisible9: boolean;
  drawerTitle9: string;
  formTitle = this.api.translate.instant('proposalsall.formTitle');
  pageIndex = 1;
  pageSize = 10;
  totalRecords = 1;
  dataList = [];
  dataList1 = [];
  dataList2 = [];
  LOAN_TYPE_ID = "AL"
  loadingRecords = true;
  loadingRecords2 = false;
  PARENT_ID:number
  REMARK:string
  sortValue: string = "desc";
  sortKey: string = "id";
  // sort:string ='id'
  searchText: string = "";
  filterQuery: string = "";
  isFilterApplied: string = "default";
  logtext: string = "";
  isVisible = false
  filterClass: string = "filter-visible";
  initFilter = true;
  isSpinning: boolean
  isVisible1=false
  columns: string[][] = [['LOAN_KEY', this.api.translate.instant('proposalsall.columns1')], ['PRAPOSAL_TYPE', this.api.translate.instant('proposalsall.columns2')], ['LOAN_TYPE_NAME', this.api.translate.instant('proposalsall.columns3')], ['LOAN_AMOUNT', this.api.translate.instant('proposalsall.columns4')], ['APPLICANT_NAME', this.api.translate.instant('proposalsall.columns5')], ['BRANCH_NAME', this.api.translate.instant('proposalsall.columns6')], ['MOBILE_NUMBER', this.api.translate.instant('proposalsall.columns7')],   ['AGE', this.api.translate.instant('proposalsall.columns10')],   ['CREATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns14')], ['LAST_UPDATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns15')]]
  //drawer Variables
  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: Proposal = new Proposal();
  branchId = sessionStorage.getItem('branchId')
  userId = sessionStorage.getItem('userId')
  applicantId = sessionStorage.getItem('applicantId')
  userActivityLogData: Useractivitylog = new Useractivitylog();
  loadingProposalStages = false
  proposalStages: Proposalstage[]
  PROPOSAL_STAGE_ID = "AL"
  drawerJoinBranchVisible = false
  drawerJoinBranchTitle: string = ""
  drawerCibilTitle: string = ""
  drawerCibilhVisible = false
  okLoading = false
  rejectVisible = false
  REMARKS: string = ""
  drawerStattusTitle: string = ""
  drawerStattusVisible = false
  dateFormat = 'dd/MM/yyyy';
  selectedDate: Date[] = []
  value1: string = ""
  value2: string = ""
  // okLoading = false
  drawerPersonalProposalVisible = false
  drawerPersonalProposalTitle: string = ""
  loanData: Loantypes[]
  isLoanSpinning = false
  drawerpassmainbranchVisible = false
  drawermainbranchTitle: string = ""
  browserLang = localStorage.getItem('locale');
  @ViewChild('button1') searchElement: ElementRef;

  @ViewChild(ProposaldocumentComponent) proposalDocumnets: ProposaldocumentComponent;
  @ViewChild(JoinbranchComponent) branchcompoent: JoinbranchComponent;
  @ViewChild(CibilcheckingComponent) cibilcheck: CibilcheckingComponent;
  @ViewChild(StatuslogsComponent) proposalStatuslogsComponent: StatuslogsComponent;
  @ViewChild(PersonalproposalComponent) personalProposal: PersonalproposalComponent;
  @ViewChild(PasstomainbranchComponent) mainbranch: PasstomainbranchComponent;
  @ViewChild(NewproposalComponent  ,{ static: false })  newproposal:NewproposalComponent

  @ViewChild(FormprintComponent) formPrint: FormprintComponent;
  // @ViewChild(AhvalprintComponent) ahvalPrint: AhvalprintComponent;
  drawerFormPrintTitle: string = '';
  drawerFormPrintData: Proposal = new Proposal();
  drawerFormPrintVisible: boolean = false;
  drawerFormPrintTitle2: string = '';
  drawerFormPrintData2: Proposal = new Proposal();
  drawerFormPrintVisible2: boolean = false;
 
  security = false
  type1 = false
  type2 = false
  type3 = false
  type4 = false
  type5 = false
  type6 = false
  type7 = false
  type8 = false
  
  type9 = false
  type10 = false
  type11 = false
  type12 = false
  type13 = false
  type14 = false
  type15 = false
  type16 = false
  type17 = false
  formname = ''
  loandatas: Loaninformation = new Loaninformation();
  roleId = sessionStorage.getItem("roleId")
  bdrawerTitle = "";
  bdrawerData: Proposal = new Proposal();
  bdrawerVisible = false;

  sendtoaprovedrawerTitle = "";
  sendtoaprovedrawerData: Proposal = new Proposal();
  sendtoaprovedrawerVisible = false;

  sendtoaprovetobranchdrawerTitle = "";
  sendtoaprovetobranchdrawerData: Proposal = new Proposal();
  sendtoaprovetobranchdrawerVisible = false;

  disbursedrawerTitle = "";
  disbursedrawerData: Proposal = new Proposal();
  disbursedrawerVisible = false;
  
  drawerVisible2: boolean;
  drawerTitle2: string;
  drawerData2: Applicant = new Applicant();

  drawerTitle3 = "";
  drawerData3: Proposal = new Proposal();
  drawerVisible3 = false;

  drawerTitle4 = "";
  drawerData4: Payments = new Payments();
  drawerVisible4 = false;
  LOAN_OFFICER_ID: string;

  // columns1: string[][] =[["NAME", this.api.translate.instant('users.coloumn1')], 
  //                       ["EMAIL_ID", this.api.translate.instant('users.coloumn2')], 
  //                       ["MOBILE_NUMBER", this.api.translate.instant('users.coloumn3')], 
  //                       ['PASSWORD', this.api.translate.instant('users.coloumn4')]]
  // data: any;

  constructor(private api: ApiService, private datePipe: DatePipe, private message: NzNotificationService, private router: Router) { }
  ngOnInit() {
    this.browserLang = localStorage.getItem('locale');
    this.formTitle = this.api.translate.instant('proposalsall.formTitle');
    if (this.browserLang == 'mr') {
      this.columns = [['LOAN_KEY', this.api.translate.instant('proposalsall.columns1')],   ['LOAN_TYPE_NAME', this.api.translate.instant('proposalsall.columns3')], ['LOAN_AMOUNT', this.api.translate.instant('proposalsall.columns4')], ['APPLICANT_NAME', this.api.translate.instant('proposalsall.columns5')], ['BRANCH_NAME', this.api.translate.instant('proposalsall.columns6')],['MOBILE_NUMBER', this.api.translate.instant('proposalsall.columns7')],   ['AGE', this.api.translate.instant('proposalsall.columns10')],   ['CREATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns14')], ['LAST_UPDATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns15')]]
    } else if (this.browserLang == 'en') {
      this.columns = [['LOAN_KEY', this.api.translate.instant('proposalsall.columns1')],   ['LOAN_TYPE_NAME_EN', this.api.translate.instant('proposalsall.columns3')], ['LOAN_AMOUNT', this.api.translate.instant('proposalsall.columns4')], ['APPLICANT_NAME', this.api.translate.instant('proposalsall.columns5')], ['BRANCH_NAME_EN', this.api.translate.instant('proposalsall.columns6')], ['MOBILE_NUMBER', this.api.translate.instant('proposalsall.columns7')],   ['AGE', this.api.translate.instant('proposalsall.columns10')],   ['CREATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns14')], ['LAST_UPDATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns15')]]
    } else {
      this.columns = [['LOAN_KEY', this.api.translate.instant('proposalsall.columns1')],   ['LOAN_TYPE_NAME_KN', this.api.translate.instant('proposalsall.columns3')], ['LOAN_AMOUNT', this.api.translate.instant('proposalsall.columns4')], ['APPLICANT_NAME', this.api.translate.instant('proposalsall.columns5')], ['BRANCH_NAME_KN', this.api.translate.instant('proposalsall.columns6')], ['MOBILE_NUMBER', this.api.translate.instant('proposalsall.columns7')],   ['AGE', this.api.translate.instant('proposalsall.columns10')],   ['CREATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns14')], ['LAST_UPDATED_ON_DATETIME', this.api.translate.instant('proposalsall.columns15')]]
    }
    
    this.search();
    this.loadProposalStage()
    this.loadLoanTypes()
    this.logtext = "OPENED - Praposals form KEYWORD[O - Praposals] ";
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          // console.log(successCode);
        }
        else {
          // console.log(successCode);
        }
      });

    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "ApplicantProposal - Opened"
    this.userActivityLogData.ACTIVITY_TIME = new Date()
    this.api.createUserActivityLog(this.userActivityLogData)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          // console.log(successCode);
        }
        else {
          // console.log(successCode);
        }
      });


      var filter ="AND ROLE_ID = '19'"
      this.api.getAllUsers(this.pageIndex, this.pageSize, this.sortKey, '', filter).subscribe(data => {
        this.loadingRecords = false;
        this.totalRecords = data['count'];
        this.dataList1 = data['data'];
      }, err => {
        console.log(err);
        if (err['ok'] == false)
          this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
      });
  }


  loadProposalStage() {
    this.loadingProposalStages = true;
    let filter = "AND STATUS=1"
    this.api.getAllProposalStages(0, 0, 'SEQUENCE_NUMBER', 'asc', filter).subscribe(localName => {
      this.proposalStages = localName['data'];
      this.loadingProposalStages = false;
    }, err => {

      this.loadingProposalStages = false;
    });
  }


  updateList(){

    this.isVisible1 = true;



    
    
  }




  printPdf(data: Proposal, type: number) {
    if (type == 1) {
      this.security = true
      this.type2 = false
      this.type3 = false
      this.type4 = false
      this.type1 = false
      this.type5 = false
      this.type6 = false
      this.type7 = false
      this.type8 = false
      this.type9 = false
      this.type10 = false
      this.type11 = false
      this.type12 = false
      this.type13 = false
      this.type14 = false
      this.type15 = false
      this.type16 = false
      this.type17 = false
      
    }

    if (type == 2) {
      this.type2 = true
      this.security = false
      this.type3 = false
      this.type4 = false
      this.type1 = false
      this.type5 = false
      this.type6 = false
      this.type7 = false
      this.type8 = false
      this.type9 = false
      this.type10 = false
      this.type11 = false
      this.type12 = false
      this.type13 = false
      this.type14 = false
      this.type15 = false
      this.type16 = false
      this.type17 = false
    }

    if (type == 3) {
      this.type3 = true
      this.security = false
      this.type2 = false
      this.type4 = false
      this.type1 = false
      this.type5 = false
      this.type6 = false
      this.type7 = false
      this.type8 = false
      this.type9 = false
      this.type10 = false
      this.type11 = false
      this.type12 = false
      this.type13 = false
      this.type14 = false
      this.type15 = false
      this.type16 = false
      this.type17 = false
    }

    if (type == 4) {
      this.type4 = true
      this.security = false
      this.type2 = false
      this.type3 = false
      this.type1 = false
      this.type5 = false
      this.type6 = false
      this.type7 = false
      this.type8 = false
      this.type9 = false
      this.type10 = false
      this.type11 = false
      this.type12 = false
      this.type13 = false
      this.type14 = false
      this.type15 = false
      this.type16 = false
      this.type17 = false
    }

    if (type == 5) {
      this.type4 = false
      this.security = false
      this.type2 = false
      this.type3 = false
      this.type1 = true
      this.type5 = false
      this.type6 = false
      this.type7 = false
      this.type8 = false
      this.type9 = false
      this.type10 = false
      this.type11 = false
      this.type12 = false
      this.type13 = false
      this.type14 = false
      this.type15 = false
      this.type16 = false
      this.type17 = false
    }

    if (type == 5) {
      this.type4 = false
      this.security = false
      this.type2 = false
      this.type3 = false
      this.type1 = false
      this.type5 = true
      this.type6 = false
      this.type7 = false
      this.type8 = false
      this.type9 = false
      this.type10 = false
      this.type11 = false
      this.type12 = false
      this.type13 = false
      this.type14 = false
      this.type15 = false
      this.type16 = false
      this.type17 = false
    }

    if (type == 6) {
      this.type4 = false
      this.security = false
      this.type2 = false
      this.type3 = false
      this.type1 = false
      this.type6 = true
      this.type5 = false
      this.type7 = false
      this.type8 = false
      this.type9 = false
      this.type10 = false
      this.type11 = false
      this.type12 = false
      this.type13 = false
      this.type14 = false
      this.type15 = false
      this.type16 = false
      this.type17 = false
    }

    if (type == 7) {
      this.type4 = false
      this.security = false
      this.type2 = false
      this.type3 = false
      this.type1 = false
      this.type7 = true
      this.type5 = false
      this.type6 = false
      this.type8 = false
      this.type9 = false
      this.type10 = false
      this.type11 = false
      this.type12 = false
      this.type13 = false
      this.type14 = false
      this.type15 = false
      this.type16 = false
      this.type17 = false
    }

    if (type == 8) {
      this.type4 = false
      this.security = false
      this.type2 = false
      this.type3 = false
      this.type1 = false
      this.type7 = false
      this.type5 = false
      this.type6 = false
      this.type8 = true
      this.type9 = false
      this.type10 = false
      this.type11 = false
      this.type12 = false
      this.type13 = false
      this.type14 = false
      this.type15 = false
      this.type16 = false
      this.type17 = false
    }

    if (type == 9) {
      this.type4 = false
      this.security = false
      this.type2 = false
      this.type3 = false
      this.type1 = false
      this.type7 = false
      this.type5 = false
      this.type6 = false
      this.type8 = false
      this.type9 = true
      this.type10 = false
      this.type11 = false
      this.type12 = false
      this.type13 = false
      this.type14 = false
      this.type15 = false
      this.type16 = false
      this.type17 = false
    }


    if (type == 10) {
      this.type4 = false
      this.security = false
      this.type2 = false
      this.type3 = false
      this.type1 = false
      this.type7 = false
      this.type5 = false
      this.type6 = false
      this.type8 = false
      this.type9 = false
      this.type10 = true
      this.type11 = false
      this.type12 = false
      this.type13 = false
      this.type14 = false
      this.type15 = false
      this.type16 = false
      this.type17 = false
    }

    if (type == 11) {
      this.type4 = false
      this.security = false
      this.type2 = false
      this.type3 = false
      this.type1 = false
      this.type7 = false
      this.type5 = false
      this.type6 = false
      this.type8 = false
      this.type9 = false
      this.type10 = false
      this.type11 = true
      this.type12 = false
      this.type13 = false
      this.type14 = false
      this.type15 = false
      this.type16 = false
      this.type17 = false
    }

    if (type == 12) {
      this.type4 = false
      this.security = false
      this.type2 = false
      this.type3 = false
      this.type1 = false
      this.type7 = false
      this.type5 = false
      this.type6 = false
      this.type8 = false
      this.type9 = false
      this.type10 = false
      this.type11 = false
      this.type12 = true
      this.type13 = false
      this.type14 = false
      this.type15 = false
      this.type16 = false
      this.type17 = false
    }

    if (type == 13) {
      this.type4 = false
      this.security = false
      this.type2 = false
      this.type3 = false
      this.type1 = false
      this.type7 = false
      this.type5 = false
      this.type6 = false
      this.type8 = false
      this.type9 = false
      this.type10 = false
      this.type11 = false
      this.type12 = false
      this.type13 = true
      this.type14 = false
      this.type15 = false
      this.type16 = false
      this.type17 = false
    }




    if (type == 14) {
      this.type4 = false
      this.security = false
      this.type2 = false
      this.type3 = false
      this.type1 = false
      this.type7 = false
      this.type5 = false
      this.type6 = false
      this.type8 = false
      this.type9 = false
      this.type10 = false
      this.type11 = false
      this.type12 = false
      this.type13 = false
      this.type14 = true
      this.type15 = false
      this.type16 = false
      this.type17 = false
    }


    
  if (type == 15) {
    this.type4 = false
    this.security = false
    this.type2 = false
    this.type3 = false
    this.type1 = false
    this.type7 = false
    this.type5 = false
    this.type6 = false
    this.type8 = false
    this.type9 = false
    this.type10 = false
    this.type11 = false
    this.type12 = false
    this.type13 = false
    this.type15 = true
    this.type14 = false
    this.type16 = false
    this.type17 = false
  }



  if (type == 16) {
    this.type4 = false
    this.security = false
    this.type2 = false
    this.type3 = false
    this.type1 = false
    this.type7 = false
    this.type5 = false
    this.type6 = false
    this.type8 = false
    this.type9 = false
    this.type10 = false
    this.type11 = false
    this.type12 = false
    this.type13 = false
    this.type16 = true
    this.type15 = false
    this.type14 = false
    this.type17 = false
  }




  if (type == 17) {
    this.type4 = false
    this.security = false
    this.type2 = false
    this.type3 = false
    this.type1 = false
    this.type7 = false
    this.type5 = false
    this.type6 = false
    this.type8 = false
    this.type9 = false
    this.type10 = false
    this.type11 = false
    this.type12 = false
    this.type13 = false
    this.type17 = true
    this.type15 = false
    this.type16 = false
    this.type14 = false
  }



    this.drawerFormPrintTitle = this.api.translate.instant('proposalsall.drawert7')
    this.drawerFormPrintData = Object.assign({}, data);
    this.drawerFormPrintVisible = true
    this.formname = this.drawerFormPrintData['LOAN_KEY']
    this.formPrint.loadAllExtraInformationMapped(data.ID, data.APPLICANT_ID,type, data)
  }
  handleOk(data:Proposal): void {
    if (this.REMARK.trim() != "") {
      {
        console.log(this.REMARK)
       
        this.PARENT_ID = Number(this.userId)
        // this.data.APPLICANT_ID = this.data.APPLICANT_ID
        
      //   this.api.updateStatus(data).subscribe(data =>{
          
   
      //    if(data['code'] == "200"){
      //      this.isVisible1=false
      //      this.search()
      //      }
   
      //  })

       console.log(this.REMARK)

       
      }
    }
    else {
      // console.log(this.REMARK)
      this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
    }
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible1 = false;
  }


  loadLoanTypes() {
    this.isLoanSpinning = true;
    let filter = "AND STATUS=1"
    this.api.getAllLoanTypes(0, 0, 'ID', 'desc', "").subscribe(localName => {


      this.loanData = localName['data'];
      this.isLoanSpinning = false;
    }, err => {
      console.log(err);
      this.isLoanSpinning = false;
    });
  }

  searchSet() {
    document.getElementById('button1').focus();
    this.search(true)
  }


  showFilter() {
    if (this.filterClass === "filter-visible")
      this.filterClass = "filter-invisible";
    else
      this.filterClass = "filter-visible";

  }

  clearFilter() {
    this.PROPOSAL_STAGE_ID = "AL";
    this.LOAN_TYPE_ID = "AL";
    this.filterQuery = ""
    this.selectedDate = null
    this.filterClass = "filter-invisible";
    this.search(true)
  }

  // Basic Methods
  sort(sort: { key: string; value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;
    this.search(true);
  }



  changeDate(value) {
    // console.log(value[0])
    // console.log(value[1])

    this.value1 = this.datePipe.transform(value[0], "yyyy-MM-dd")
    this.value2 = this.datePipe.transform(value[1], "yyyy-MM-dd")

    //this.datePipe.transform(this.month,"yyyy-MM")

  }

  //pick










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
            // console.log(successCode);
          }
          else {
            // console.log(successCode);
          }
        });
      this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
      this.userActivityLogData.ACTIVITY_DETAILS = "ApplicantProposal - Sort on " + sort + " " + this.sortKey
      this.userActivityLogData.ACTIVITY_TIME = new Date()
      this.api.createUserActivityLog(this.userActivityLogData)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            // console.log(successCode);
          }
          else {
            // console.log(successCode);
          }
        });

    } catch (error) {
      sort = "";
    }
    var likeQuery = ""
    // console.log("search text:" + this.searchText);
    if (this.searchText != "") {
      likeQuery = " AND (";
      this.searchText = this.searchText.trim()
      this.columns.forEach(column => {
        likeQuery += " " + column[0] + " like '%" + this.searchText + "%' OR";
      });
      likeQuery = likeQuery.substring(0, likeQuery.length - 2) + ")"
    }



    var filter = ""
    if (Number(this.branchId) == 0) {
      if (likeQuery)
        filter = this.filterQuery + likeQuery
      else
        filter = this.filterQuery
    }
    else {
      if (likeQuery)
        filter = "AND BRANCH_ID=" + this.branchId + this.filterQuery + likeQuery
      else
        filter = "AND BRANCH_ID=" + this.branchId + this.filterQuery
    }



    this.logtext = "Filter Applied - Praposals form " + likeQuery + " KEYWORD [F - Praposals] ";
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          // console.log(successCode);
        }
        else {
          // console.log(successCode);
        }
      });

    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "ApplicantProposal - Search For " + this.searchText + " " + likeQuery
    this.userActivityLogData.ACTIVITY_TIME = new Date()
    this.api.createUserActivityLog(this.userActivityLogData)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          // console.log(successCode);
        }
        else {
          // console.log(successCode);
        }
      });
      
    var filter ="AND (CURRENT_STAGE_ID = 14 OR CURRENT_STAGE_ID = 12 OR CURRENT_STAGE_ID = 6 OR CURRENT_STAGE_ID = 13)  AND LOAN_OFFICER_ID = " + this.userId +  likeQuery
    this.api.getAllPraposals(this.pageIndex, this.pageSize, this.sortKey, sort,filter).subscribe(data => {

      this.loadingRecords = false;
      this.isSpinning = false
      this.totalRecords = data['count'];
      this.dataList = data['data'];
      this.filterClass = "filter-invisible";
      this.isFilterApplied = "primary"
    }, err => {

      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });

    // var filter ="AND CURRENT_STAGE_ID = 7 OR CURRENT_STAGE_ID =18 "

    // this.api.getAllPraposals(0, 0, this.sortKey, sort, filter).subscribe(data => {
    //   this.dataList1 = data['data'];
    // }, err => {

    //   if (err['ok'] == false)
    //     this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    // });


    this.api.getAllPraposals(0, 0, this.sortKey, sort, filter).subscribe(data => {
      this.dataList1 = data['data'];
    }, err => {

      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });
  }

  applyfilter() {

    if (this.value1 == "" && this.value2 == "") {
      this.filterQuery = ""
    }
    else {
      this.filterQuery = " AND ( CREATED_ON_DATETIME BETWEEN '" + this.value1 + ":00:00:00" + "' AND '" + this.value2 + ":23:59:59" + "' ) "
    }

    if (this.PROPOSAL_STAGE_ID == 'AL') {
      this.filterQuery = this.filterQuery
    }
    else {
      this.filterQuery += " AND CURRENT_STAGE_ID=" + this.PROPOSAL_STAGE_ID
    }

    if (this.LOAN_TYPE_ID == 'AL') {
      this.filterQuery = this.filterQuery
    }
    else {
      this.filterQuery += " AND LOAN_TYPE_ID=" + this.LOAN_TYPE_ID
    }


    this.search(true)
  }
  get closeCallback9() {
    return this.drawerClose9.bind(this);
  }
  //Drawer Methods
  get closeCallback() {
    return this.drawerClose.bind(this);
  }

  get closeCallbackJoinBranch() {
    return this.drawerJoinBranchClose.bind(this);
  }
  get closeCallbackCibil() {
    return this.drawerCibilClose.bind(this);
  }


  view(data: Proposal): void {


    this.drawerTitle =this.api.translate.instant('proposalsall.drawert1');
    this.drawerData = Object.assign({}, data);
    this.drawerVisible = true;
    this.proposalDocumnets.getAllProposalDocuments(data)
    // this.proposalDocumnets.getLinkUrl("http://117.204.250.156:1470/userresponses/"+data.BOT_REPLY_ID)
    // this.proposalDocumnets.getLinkUrl("http://bot.tecpool.in/userresponses/"+data.BOT_REPLY_ID)
    this.proposalDocumnets.getLinkUrl(this.api.chatbotUrl + "userresponses/" + data.BOT_REPLY_ID)

    // this.proposalDocumnets
    this.proposalDocumnets.REMARKS = ""
    this.proposalDocumnets.AMT_INFORMATION = ""
    this.proposalDocumnets.AMOUNT = undefined
    this.proposalDocumnets.TIME = undefined
    this.proposalDocumnets.STATUS = "M"
    this.proposalDocumnets.getExtraInformation()
    this.logtext = 'VIEW - PraposalDocuments form KEYWORD [V - PraposalDocuments] ';
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          // console.log(successCode);
        }
        else {
          // console.log(successCode);
        }
      });

    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "ApplicantProposal - Document Icon Clicked " + data.APPLICANT_NAME + " Current Stage Name (" + data.CURRENT_STAGE_NAME + ")"
    this.userActivityLogData.ACTIVITY_TIME = new Date()
    this.api.createUserActivityLog(this.userActivityLogData)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          // console.log(successCode);
        }
        else {
          // console.log(successCode);
        }
      });
  }

  view2(data: Proposal): void {
    this.bdrawerTitle =this.api.translate.instant('newwords.label191');
    this.bdrawerData = Object.assign({}, data);
    this.bdrawerVisible = true;

    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "ProposalAtBranch - Proposal Verification Clicked " + data.APPLICANT_NAME + " Current Stage Name (" + data.CURRENT_STAGE_NAME + ")"
    this.userActivityLogData.ACTIVITY_TIME = new Date()
    this.api.createUserActivityLog(this.userActivityLogData)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          // console.log(successCode);
        }
        else {
          // console.log(successCode);
        }
      });
  }
  //Drawer Methods
  get bcloseCallback() {
    return this.bdrawerClose.bind(this);
  }

  bdrawerClose(): void {
    this.search();
    this.bdrawerVisible = false;
  }

  sendtoaprove(data: Proposal): void {
    this.sendtoaprovedrawerTitle = this.api.translate.instant('basicinfo.m6');
    this.sendtoaprovedrawerData = Object.assign({}, data);
    this.sendtoaprovedrawerVisible = true;

    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "ProposalSendForApproval - Proposal Send For Approval Clicked " + data.APPLICANT_NAME + " Current Stage Name (" + data.CURRENT_STAGE_NAME + ")"
    this.userActivityLogData.ACTIVITY_TIME = new Date()
    this.api.createUserActivityLog(this.userActivityLogData)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          // console.log(successCode);
        }
        else {
          // console.log(successCode);
        }
      });
  }
  //Drawer Methods
  get sendtoaprovecloseCallback() {
    return this.sendtoaprovedrawerClose.bind(this);
  }

  sendtoaprovedrawerClose(): void {
    this.search();
    this.sendtoaprovedrawerVisible = false;
  }


  // updateloan(data:Proposal){

  //   if(this.data){ 

  //   this.data.LOAN_OFFICER_ID = Number(this.userId)
 
  //    this.api.updateloanoff(this.data).subscribe(data =>{

  //     if(data['code'] == "200"){
  //       // this.isSpinning = false

  //       this.search()


  //       // this.logtext = 'Update Status - pick Successed form - SUCCESS '+ " KEYWORD [U - Document2 ]";
  //       // console.log(this.data)
  //     }

  //   })
  // }
  // }

    

  // this.dataList['LOAN_OFFICER_ID'] = this.userId

  sendtoaprovetobranch(data: Proposal): void {
    this.sendtoaprovetobranchdrawerTitle = this.api.translate.instant('newwords.label192');
    this.sendtoaprovetobranchdrawerData = Object.assign({}, data);
    this.sendtoaprovetobranchdrawerVisible = true;

    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "ProposalSendToBranch - Proposal Send To Branch Clicked " + data.APPLICANT_NAME + " Current Stage Name (" + data.CURRENT_STAGE_NAME + ")"
    this.userActivityLogData.ACTIVITY_TIME = new Date()
    this.api.createUserActivityLog(this.userActivityLogData)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          // console.log(successCode);
        }
        else {
          // console.log(successCode);
        }
      });
  }
  //Drawer Methods
  get sendtoaprovetobranchcloseCallback() {
    return this.sendtoaprovetobranchdrawerClose.bind(this);
  }

  sendtoaprovetobranchdrawerClose(): void {
    this.search();
    this.sendtoaprovetobranchdrawerVisible = false;
  }

  finalapprove(data: Proposal): void {
    this.drawerData9 = Object.assign({}, data);
    this.drawerTitle9 = this.api.translate.instant('payments.drowername');
    this.drawerVisible9 = true;

  }

  drawerClose9(): void {
    this.search();
    this.drawerVisible9 = false;
  }
  
  disburse(data: Proposal): void {
    this.disbursedrawerTitle = this.api.translate.instant('newwords.label192');
    this.disbursedrawerData = Object.assign({}, data);
    this.disbursedrawerVisible = true;

    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "LoanDisbursement - Loan Disbursement Clicked " + data.APPLICANT_NAME + " Current Stage Name (" + data.CURRENT_STAGE_NAME + ")"
    this.userActivityLogData.ACTIVITY_TIME = new Date()
    this.api.createUserActivityLog(this.userActivityLogData)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          // console.log(successCode);
        }
        else {
          // console.log(successCode);
        }
      })
  }
  //Drawer Methods
  get disbursecloseCallback() {
    return this.disbursedrawerClose.bind(this);
  }

  disbursedrawerClose(): void {
    this.search();
    this.disbursedrawerVisible = false;
  }

  CIBILCheck(data: Proposal): void {
    this.drawerCibilTitle = this.api.translate.instant('proposalsall.drawert2');
    this.drawerData = Object.assign({}, data);
    this.drawerCibilhVisible = true;
    // this.cibilcheck.getUrl("http://117.204.250.156:1470/userresponses/"+data.BOT_REPLY_ID)
    this.cibilcheck.REMARK = ""
    this.cibilcheck.fileData_REPORT_URL = null
    this.cibilcheck.CIBIL_SCORE = undefined
    // this.cibilcheck.getUrl("http://bot.tecpool.in/userresponses/"+data.BOT_REPLY_ID)

    this.cibilcheck.getUrl(this.api.chatbotUrl + "userresponses/" + data.BOT_REPLY_ID)

  }


  joinBranch(data: Proposal) {
    this.drawerJoinBranchTitle = this.api.translate.instant('proposalsall.drawert3');
    this.drawerData = Object.assign({}, data);
    this.drawerJoinBranchVisible = true;

    this.branchcompoent.BRANCH_ID = undefined
    this.branchcompoent.REMARKS = undefined
    //this.branchcompoent.getUrl("http://117.204.250.156:1470/userresponses/"+data.BOT_REPLY_ID)

    //  this.branchcompoent.getUrl("http://bot.tecpool.in/userresponses/"+data.BOT_REPLY_ID)
    this.branchcompoent.getUrl(this.api.chatbotUrl + "userresponses/" + data.BOT_REPLY_ID)

    this.branchcompoent.loadAllAddressInfo(data.ID, data.APPLICANT_ID)
    //http://117.204.250.156:1470/userresponses/
    this.logtext = 'VIEW - JoinBranch form KEYWORD [V - JoinBranch] ';
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          // console.log(successCode);
        }
        else {
          // console.log(successCode);
        }
      });

    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "VIEW - JoinBranch Clicked " + data.APPLICANT_NAME + " Current Stage Name (" + data.CURRENT_STAGE_NAME + ")"
    this.userActivityLogData.ACTIVITY_TIME = new Date()
    this.api.createUserActivityLog(this.userActivityLogData)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          // console.log(successCode);
        }
        else {
          // console.log(successCode);
        }
      });
  }

  drawerJoinBranchClose(): void {
    this.search();
    this.drawerJoinBranchVisible = false;
  }

  drawerClose(): void {
    this.search();
    this.drawerVisible = false;
  }

  drawerCibilClose(): void {
    this.search();
    this.drawerCibilhVisible = false;
  }

  tabForm(data: Proposal) {
    this.drawerPersonalProposalTitle =  this.api.translate.instant('proposalsall.drawert4')
    this.drawerData = Object.assign({}, data);
    console.log(this.drawerData,'salary')
    this.drawerPersonalProposalVisible = true
    this.personalProposal.loadAllExtraInformationMapped(data.ID, data.APPLICANT_ID, data)
  }
  reject(data: Proposal) {
    this.rejectVisible = true
    this.drawerData = Object.assign({}, data);

  }

  rejectProposal() {
    this.okLoading = true


    if (this.REMARKS != "") {
      this.api.updateNextDocumentUploadStage(10, 1, this.drawerData.ID, this.REMARKS)
        .subscribe(successCode => {
          this.rejectVisible = false
          this.search()
          this.okLoading = false

          if (successCode['code'] == "200") {
            this.logtext = 'Update Status - Reject form - SUCCESS ' + "Stage Id" + 2 + " KEYWORD [U - PROPOSAL ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  // console.log(successCode);
                }
                else {
                  // console.log(successCode);
                  this.okLoading = false

                }
              });

            this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
            this.userActivityLogData.ACTIVITY_DETAILS = "Reject -  Reject Clicked" + "Stage Id" + 2
            this.userActivityLogData.ACTIVITY_TIME = new Date()
            this.api.createUserActivityLog(this.userActivityLogData)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  // console.log(successCode);
                }
                else {
                  // console.log(successCode);
                  this.okLoading = false
                }
              });


          }
          else {


            this.logtext = 'PROPOSALS - Reject form - ERROR - ' + "Stage Id" + 2 + " KEYWORD [U - PROPOSALS ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  // console.log(successCode);
                }
                else {
                  // console.log(successCode);
                  this.okLoading = false
                }
              });
            this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
            this.userActivityLogData.ACTIVITY_DETAILS = "PROPOSALS - Reject Failed" + "Stage Id" + 2
            this.userActivityLogData.ACTIVITY_TIME = new Date()
            this.api.createUserActivityLog(this.userActivityLogData)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  // console.log(successCode);
                }
                else {
                  // console.log(successCode);
                }
              });
            this.message.error(this.api.translate.instant('common.message.error.failed'), "");
            this.okLoading = false;


          }
        });
    }
    else {
      this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
    }


  }
  rejectCancel() {
    this.rejectVisible = false
  }

  StatusLogs(data: Proposal) {
    this.drawerStattusTitle = this.api.translate.instant('proposalsall.drawert5');
    this.drawerStattusVisible = true;
    this.drawerData = Object.assign({}, data);
    this.proposalStatuslogsComponent.getProposalSalId(data.ID)
  }

  passToMainBranch(data: Proposal) {
    this.drawermainbranchTitle = this.api.translate.instant('proposalsall.drawert6');
    this.drawerpassmainbranchVisible = true;
    this.drawerData = Object.assign({}, data);
    this.mainbranch.reset()
    //this.proposalStatuslogsComponent.getProposalSalId(data.ID)
  }

  get closeCallbackStattus() {
    return this.drawerStattusClose.bind(this);
  }
  drawerStattusClose(): void {
    this.drawerStattusVisible = false;
  }
  get closeCallbackPersonalProposal() {
    return this.drawerPersonalProposalClose.bind(this);
  }
  drawerPersonalProposalClose(): void {
    this.search()
    this.drawerPersonalProposalVisible = false;
  }

  get closeCallbackmainbranch() {
    return this.drawermainbranchClose.bind(this);
  }
  drawermainbranchClose(): void {
    this.search()
    this.drawerpassmainbranchVisible = false;
  }


  printForm(data: Proposal, type: number) {
    // console.log(type);
    // let filter = " AND PROPOSAL_ID=" + data.ID
    // this.api.getAllLoanInformation(0, 0, 'ID', "asc", filter).subscribe(data => {
    //   if (data['count'] > 0) {
    //     this.loandatas = data['data'][0];
    if (type == 1) {
      this.security = true
      this.type2 = false
      this.type3 = false
      this.type4 = false
      this.type5 = false
      this.type6 = false
      this.type7 = false
      this.type8 = false

    }

    if (type == 2) {
      this.type2 = true
      this.security = false
      this.type3 = false
      this.type4 = false
      this.type5 = false
      this.type6 = false
      this.type7 = false
      this.type8 = false

    }

    if (type == 3) {
      this.type3 = true
      this.security = false
      this.type2 = false
      this.type4 = false
      this.type5 = false
      this.type6 = false
      this.type7 = false
      this.type8 = false

    }

    if (type == 4) {
      this.type4 = true
      this.security = false
      this.type2 = false
      this.type3 = false
      this.type5 = false
      this.type6 = false
      this.type7 = false
      this.type8 = false
    }

    if (type == 5) {
      this.type4 = false
      this.security = false
      this.type2 = false
      this.type3 = false
      this.type5 = true
      this.type6 = false
      this.type7 = false
      this.type8 = false

    }

    if (type == 6) {
      this.type4 = false
      this.security = false
      this.type2 = false
      this.type3 = false
      this.type5 = false
      this.type6 = true
      this.type7 = false
      this.type8 = false

    }


    if (type == 7) {
      this.type4 = false
      this.security = false
      this.type2 = false
      this.type3 = false
      this.type5 = false
      this.type6 = false
      this.type7 = true
      this.type8 = false

    }

    
    if (type == 8) {
      this.type4 = false
      this.security = false
      this.type2 = false
      this.type3 = false
      this.type5 = false
      this.type6 = false
      this.type8 = true
      this.type7 = false
     }
    //   }
    // }, err => {

    // });

    this.formname = data['LOAN_KEY'];
    this.drawerFormPrintTitle =  this.api.translate.instant('proposalsall.drawert7')
    this.drawerFormPrintData = Object.assign({}, data);
    this.drawerFormPrintVisible = true
    this.formPrint.loadAllExtraInformationMapped(data.ID, data.APPLICANT_ID, data)

  }
  get closeCallbackFormPrint() {
    return this.drawerFormPrintClose.bind(this);
  }
  drawerFormPrintClose(): void {
    this.drawerFormPrintVisible = false;
  }

  printForm2(data: Proposal, type: number) {

    if (type == 1) {
      this.security = true
      this.type2 = false
      this.type3 = false
      this.type4 = false
      this.type5 = false

    }



    this.formname = data['LOAN_KEY'];
    this.drawerFormPrintTitle2 = this.api.translate.instant('passtomainbranch.lebel2')
    this.drawerFormPrintData2 = Object.assign({}, data);
    this.drawerFormPrintVisible2 = true
    // this.ahvalPrint.loadAllExtraInformationMapped(data.ID, data.APPLICANT_ID, data)
    
    this.api.getAllPraposals(0, 0, 'ID', "asc", '').subscribe(data => {
      if (data['code'] == 200 && data['count'] > 0) {
        // this.data = data['data'][0];
       
        
          
        }
      });
    

  
  }

  get closeCallbackFormPrint2() {
    return this.drawerFormPrintClose2.bind(this);
  }

  drawerFormPrintClose2(): void {
    this.search()
    this.drawerFormPrintVisible2 = false;
  }

  add() {
   
    this.drawerData2 = new Applicant();
    
    this.drawerTitle2 = this.api.translate.instant('newwords.label193' )
    this.drawerVisible2 = true;
    // this.newproposal.reset()
    // this.drawerData2.
    
  }

  get closeCallback2() {
    return this.drawerClose2.bind(this);
  }

  drawerClose2(): void {
    this.search()
    this.drawerVisible2 = false;
  }

  editStage(data) {
    this.drawerTitle3 = this.api.translate.instant('newwords.label194')
    this.drawerVisible3 = true;
    this.drawerData3 = data;
  }

  get closeCallback3() {
    return this.drawerClose3.bind(this);
  }

  drawerClose3(): void {
    this.search()
    this.drawerVisible3 = false;
  }

  paymentReceiptUpload(data: Payments) {
    this.drawerTitle4 = this.api.translate.instant('basicinfo.m10')
    this.api.getAllPayments(0, 0, 'ID', 'desc', " AND PROPOSAL_ID = " + data.ID).subscribe(localName => {
      this.drawerData4 = Object.assign({}, localName['data'][0]);
      this.drawerData4.ATTEMPT_COUNT = this.drawerData4.ATTEMPT_COUNT + 1
      this.drawerVisible4 = true;
    }, err => {

    });
  }

  get closeCallback4() {
    return this.drawerClose4.bind(this);
  }

  drawerClose4(): void {
    this.search()
    this.drawerVisible4 = false;
  }

  // downloadForm(file, key, name) {
  //   this.loadingRecords2 = true
  //   this.api.getFile(file)
  //     .subscribe(data => {
  //       this.loadingRecords2 = false
  //       if (data['code'] == "200") {
  //         const TYPED_ARRAY = new Uint8Array(data['data']['FILE_DATA']['data']);
  //         const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
  //           return data + String.fromCharCode(byte);
  //         }, '');
  //         let base64String = btoa(STRING_CHAR);

  //         var linkSource = "data:application/pdf;base64," + base64String;
  //         const downloadLink = document.createElement("a");
  //         const fileName = name + '(' + key + ").pdf";

  //         downloadLink.href = linkSource;
  //         downloadLink.download = fileName;
  //         downloadLink.click();

  //       }
  //     }, err => {
  //       this.loadingRecords2 = false
  //       console.log(err);
  //     });
  // }
  downloadForm(file, key, name,i) {
    this.dataList[i].loadingRecords2 = true
    this.api.getFile(file)
      .subscribe(data => {
        this.dataList[i].loadingRecords2 = false
        if (data['code'] == "200") {
          const TYPED_ARRAY = new Uint8Array(data['data']['FILE_DATA']['data']);
          const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
            return data + String.fromCharCode(byte);
          }, '');
          let base64String = btoa(STRING_CHAR);

          var linkSource = "data:application/pdf;base64," + base64String;
          const downloadLink = document.createElement("a");
          const fileName = name + '(' + key + ").pdf";

          downloadLink.href = linkSource;
          downloadLink.download = fileName;
          downloadLink.click();

        }
      }, err => {
        this.dataList[i].loadingRecords2 = false
        console.log(err);
      });
  }
  downloadForm2(file, key, name,i) {
    this.dataList[i].loadingRecords = true
    this.api.getFile(file)
      .subscribe(data => {
        this.dataList[i].loadingRecords = false
        if (data['code'] == "200") {
          const TYPED_ARRAY = new Uint8Array(data['data']['FILE_DATA']['data']);
          const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
            return data + String.fromCharCode(byte);
          }, '');
          let base64String = btoa(STRING_CHAR);

          var linkSource = "data:application/pdf;base64," + base64String;
          const downloadLink = document.createElement("a");
          const fileName = name + '(' + key + ").pdf";

          downloadLink.href = linkSource;
          downloadLink.download = fileName;
          downloadLink.click();

        }
      }, err => {
        this.dataList[i].loadingRecords = false
        console.log(err);
      });
  }
}
// function likeQuery(pageIndex: number, pageSize: number, sortKey: string, arg3: string, likeQuery: any) {
//   throw new Error('Function not implemented.');


