import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Proposal } from 'src/app/Models/proposal';
import { ApiService } from 'src/app/Service/api.service';
import { DatePipe } from '@angular/common';
import { NzNotificationService } from 'ng-zorro-antd';
import { Personalinformation } from 'src/app/Models/PersonalProposal/personalinformation';
import { Incomeinformation } from 'src/app/Models/PersonalProposal/incomeinformation';
import { Loaninformation } from 'src/app/Models/PersonalProposal/loaninformation';
import { Financialinformation } from 'src/app/Models/PersonalProposal/financialinformation';
import { Creditinformation } from 'src/app/Models/PersonalProposal/creditinformation';
import { Propertyinformation } from 'src/app/Models/PersonalProposal/propertyinformation';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { PersonalinfoComponent } from '../personalinfo/personalinfo.component';
import { ChatinfoComponent } from '../../Proposals/chatinfo/chatinfo.component';
import { Documents2Component } from '../../Proposals/documents2/documents2.component';
import { StatuslogsComponent } from '../../Proposals/statuslogs/statuslogs.component';
import { PropertyinfoComponent } from '../propertyinfo/propertyinfo.component';
import { FinancialinfoComponent } from '../financialinfo/financialinfo.component';
import { LoanquestionsComponent } from '../loan-demand/loanquestions/loanquestions.component';
import { Gurantorinfo } from 'src/app/Models/FirmProposal/gurantorinfo';
import { GuarantorInfoComponent } from '../../FirmProposal/guarantor-info/guarantor-info.component';
import { CoborrowerinfoComponent } from '../coborrowerinfo/coborrowerinfo.component';


@Component({
  selector: 'app-personalproposal',
  templateUrl: './personalproposal.component.html',
  styleUrls: ['./personalproposal.component.css'],
  providers: [DatePipe]
})
export class PersonalproposalComponent implements OnInit {

  @Input() drawerClose: Function;
  @Input() data: Proposal;

  IndivisualInfotabs = []
  personalInfo: Personalinformation = new Personalinformation();
  incomeInfo: Incomeinformation = new Incomeinformation();
  loanInfo: Loaninformation = new Loaninformation();
  financialInfo: Financialinformation = new Financialinformation();
  creditInfo: Creditinformation = new Creditinformation();
  propertyInfo: Propertyinformation = new Propertyinformation();
  addressinfoCurrent: Addressinfo = new Addressinfo();
  addressinfoPermanent: Addressinfo = new Addressinfo();
  addressinfoAgri: Addressinfo = new Addressinfo()
  addressinfoBussiness: Addressinfo = new Addressinfo()
  addressinfoSalary: Addressinfo = new Addressinfo()
  IsSubmit = false
  isSpinningTabs = false
  isButtonSpinning = false
  index = 0;
  familyDeatails = []
  PROPOSAL_ID: number
  chnageIndex: number
  personalInformationId: number
  PROPOSAL_TYPE: string = ""
  textVisible = false
  drawerchatTitle: string = ""
  drawerchatVisible: boolean
  drowerData: Proposal = new Proposal();
  drawerDocumentVisible = false
  drawerDocumentTitle: string = ""
  drawerStattusVisible = false
  drawerStattusTitle: string
  APPLICANT_ID: number
  @ViewChild(PersonalinfoComponent, { static: false }) personalinfo1: PersonalinfoComponent;
  @ViewChild(ChatinfoComponent) proposalChatDocumnets: ChatinfoComponent;
  @ViewChild(Documents2Component) proposalDocumnets: Documents2Component;
  @ViewChild(StatuslogsComponent) proposalStatuslogsComponent: StatuslogsComponent;
  @ViewChild('tableToMeasure') elementView;
  @ViewChild('container') elementView2;

  @ViewChild(PropertyinfoComponent) property: PropertyinfoComponent;
  @ViewChild(FinancialinfoComponent) finanace: FinancialinfoComponent;
  @ViewChild(LoanquestionsComponent) loanquestion: LoanquestionsComponent;

  @ViewChild(GuarantorInfoComponent) gurantorInfo: GuarantorInfoComponent;
  @ViewChild(CoborrowerinfoComponent) coborrowerInfo: CoborrowerinfoComponent;
  selectedIndex = 0
  isreject = true;
  browserLang = '';
  constructor(private api: ApiService, private datePipe: DatePipe, private message: NzNotificationService) { }

  ngOnInit(): void {
    this.browserLang = localStorage.getItem('locale');
    sessionStorage.setItem("incomesourceId", "0")
    sessionStorage.setItem("otherincomesourceId", "0")
  }

  myFunction(event) {

    if (event.pageX > window.screen.width - 100) {
      this.elementView2.nativeElement.style.display = 'table';
    } else {
      this.elementView2.nativeElement.style.display = 'none';
    }

  }

  onIndexChange(event) {
    this.index = event;
    //console.log(this.index)


  }

  chnage(val) {
    console.log('val', val);
    console.log('val', this.IndivisualInfotabs[val]);
    if (this.IndivisualInfotabs[val] != undefined) {
      if (this.IndivisualInfotabs[val]['EXTRA_INFORMATION_NAME'] == "मालमत्ता माहिती ") {
        this.property.loadInfo(1)

      }
      if (this.IndivisualInfotabs[val]['EXTRA_INFORMATION_NAME'] == "आर्थिक माहिती") {
        this.finanace.getSessionValues()
      }
      if (this.IndivisualInfotabs[val]['EXTRA_INFORMATION_NAME'] == "कर्जप्रकार निहाय माहिती") {
        this.loanquestion.getLoanInformation()
      }

      if (this.IndivisualInfotabs[val]['EXTRA_INFORMATION_NAME'] == "जामीनदाराची माहिती") {
        this.gurantorInfo.getdata()
      }
      if (this.IndivisualInfotabs[val]['EXTRA_INFORMATION_NAME'] == "सह कर्जदारांची माहिती") {
        this.coborrowerInfo.getdata()
      }
    }

  }

  getStatus(status) {
    // if(status)
    // return "finish"
    // else
    // return "wait"

    return "finish"
  }
  checkStatus2() {
    this.isreject = true;
    var data = []
    data = this.IndivisualInfotabs.filter(object => {
      return (object['IS_APPROVED'] == 0);
    });


    if (data.length == 0) {
      this.isreject = false
    }
    else {
      this.isreject = true

    }
  }
  checkStatus() {
    this.IsSubmit = true;
    var data = []
    data = this.IndivisualInfotabs.filter(object => {
      return (object['IS_PROVIDED'] == 0);
    });


    if (data.length == 0) {
      this.IsSubmit = true
    }
    else {
      this.IsSubmit = false

    }
    this.checkStatus2();
  }
  submit() {
    this.drawerClose();
  }
  getTabs() {

    let filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND TYPE='B'"
    this.api.getAllApplicantExtraInformation(0, 0, 'SEQ_NO', "asc", filter).subscribe(data => {
      this.IndivisualInfotabs = [];
      if (data['count'] > 0) {
        this.IndivisualInfotabs = data['data'];
        this.checkStatus();
      }
      else {
        this.IndivisualInfotabs = [];
        this.checkStatus();
      }

    }, err => {
      //console.log(err);
    });
  }

  loadAllExtraInformationMapped(proposalId, applicantId, data1?: Proposal) {
    this.PROPOSAL_ID = proposalId
    this.APPLICANT_ID = applicantId
    //console.log("this.PROPOSAL_ID in personal")

    //console.log(this.PROPOSAL_ID)
    //console.log(this.APPLICANT_ID)

    //load all extra information mapped
    let filter = " AND PROPOSAL_ID=" + proposalId + " AND TYPE='B'"
    this.isSpinningTabs = true
    //console.log(filter)
    this.api.getAllApplicantExtraInformation(0, 0, 'SEQ_NO', "asc", filter).subscribe(data => {
      //console.log("extraInfo")
      //console.log(data)
      this.isSpinningTabs = false
      if (data['count'] > 0) {
        this.selectedIndex = 0
        this.textVisible = false
        this.IndivisualInfotabs = data['data'];
        this.checkStatus();
        this.api.getAllIncomeInformation(0, 0, 'ID', 'ASC', filter).subscribe(data => {
          if (data['code'] == 200 && data['data'].length > 0) {
            sessionStorage.setItem("IS_SAVED", data['data'][0]['IS_SAVED'])
          }
        }, err => {
          //console.log(err);
        });



        if (data1.PRAPOSAL_TYPE == 'वैयक्तिक') {
          this.PROPOSAL_TYPE = "1"
          sessionStorage.setItem("PRAPOSAL_TYPE", this.PROPOSAL_TYPE)

          this.index = 0


          this.api.getAddressInfo(proposalId, "B", applicantId).subscribe(data => {
            //console.log(data)
            if (data['code'] == 200 && data['data'].length > 0) {
              this.personalInfo = Object.assign({}, data['data'][0]);
              this.personalInfo.MOBILE_NO1 = data1.MOBILE_NUMBER
              sessionStorage.setItem("personalMobile", this.personalInfo.MOBILE_NO1)
              this.personalInformationId = this.personalInfo.ID
              this.addressinfoCurrent = Object.assign({}, data['data'][0]['CURRENT_ADDRESS'][0]);
              this.addressinfoPermanent = new Addressinfo()
              this.familyDeatails = []

              this.personalInfo.DATE_OF_MEMBERSHIP = this.datePipe.transform(this.personalInfo.DATE_OF_MEMBERSHIP, 'dd/MM/yyyy');
            console.log(this.personalInfo.DATE_OF_MEMBERSHIP)
              // this.personalinfo1.onChange(this.personalInfo.DOB)
              this.personalinfo1.loadInfo(proposalId)
            }
          }, err => {
            //console.log(err);
          });
        }
        else {
          this.api.getAddressInfo(proposalId, "B", applicantId).subscribe(data => {
            console.log("data proposal")
            console.log(data)
            if (data['code'] == 200 && data['data'].length > 0) {
              this.personalInfo = Object.assign({}, data['data'][0]);
              this.personalInformationId = this.personalInfo.ID
              this.addressinfoCurrent = Object.assign({}, data['data'][0]['CURRENT_ADDRESS'][0]);
              this.addressinfoPermanent = new Addressinfo()
              this.familyDeatails = []
              // if (this.personalInfo.DOB != null && this.personalInfo.DOB != "") {
              // this.personalinfo1.onChange(this.personalInfo.DOB)
              this.personalInfo.DATE_OF_MEMBERSHIP = this.datePipe.transform(this.personalInfo.DATE_OF_MEMBERSHIP, 'dd/MM/yyyy');
              this.personalinfo1.loadInfo(proposalId)
              // }
            }
          }, err => {
            //console.log(err);
          });
          this.PROPOSAL_TYPE = "2"
          sessionStorage.setItem("PRAPOSAL_TYPE", this.PROPOSAL_TYPE)
          // this.index=0
        }
      }
      else {
        this.IndivisualInfotabs = []
        this.checkStatus();
        this.textVisible = true
        sessionStorage.setItem("PRAPOSAL_TYPE", "0")
      }
    }, err => {
      //console.log(err);
    });

    //   this.isSpinningTabs=true
    //   this.api.getAllExtraInformation(0, 0, 'ID', "asc", " AND STATUS=1").subscribe(data => {
    //    this.IndivisualInfotabs = data['data'];
    //    this.isSpinningTabs=false
    //  }, err => {
    //    //console.log(err);
    //  });




  }

  get closeCallbackchat() {
    return this.drawerchatClose.bind(this);
  }
  drawerchatClose(): void {
    this.drawerchatVisible = false;
  }

  get closeCallbackDocument() {
    return this.drawerDocumentClose.bind(this);
  }
  drawerDocumentClose(): void {
    this.drawerDocumentVisible = false;
  }

  get closeCallbackStattus() {
    return this.drawerStattusClose.bind(this);
  }
  drawerStattusClose(): void {
    this.drawerStattusVisible = false;
  }

  chatInfo() {
    //console.log("chat info")
    this.drawerchatTitle = this.api.translate.instant('proposaldocument.link1')
    this.drawerchatVisible = true;
    this.drowerData = Object.assign({}, this.data);
    //this.proposalChatDocumnets.getLinkUrl("http://117.204.250.156:1470/userresponses/"+this.data.BOT_REPLY_ID)
    //this.proposalChatDocumnets.getLinkUrl("http://bot.tecpool.in/userresponses/"+this.data.BOT_REPLY_ID)

    this.proposalChatDocumnets.getLinkUrl(this.api.chatbotUrl + "userresponses/" + this.data.BOT_REPLY_ID)

  }

  Documents() {
    //console.log("Documents")
    this.drawerDocumentTitle = this.api.translate.instant('joinbranch.link1')
    this.drawerDocumentVisible = true;
    this.drowerData = Object.assign({}, this.data);
    this.proposalDocumnets.getAllProposalDocuments(this.data, this.drowerData.APPLICANT_ID)
  }

  statusLogs() {
    //console.log("Status")
    this.drawerStattusTitle = this.api.translate.instant('joinbranch.link2')
    this.drawerStattusVisible = true;
    this.drowerData = Object.assign({}, this.data);
    this.proposalStatuslogsComponent.getProposalSalId(this.data.ID)
  }

  indexChanged(value) {
    this.index = value;
    //console.log(this.index)
    //this.loadAllExtraInformationMapped(this.PROPOSAL_ID)
  }


  CloseChanged(value) {
    //console.log(value)
    // if(value==6)
    // this.drawerClose()
  }

  close() {

  }

}
