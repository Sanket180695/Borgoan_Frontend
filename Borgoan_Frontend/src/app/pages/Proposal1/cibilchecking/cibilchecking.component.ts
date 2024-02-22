import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Proposal } from 'src/app/Models/proposal';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ApiService } from 'src/app/Service/api.service';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { NzNotificationService } from 'ng-zorro-antd';
import { ProposaldocumentComponent } from '../../Proposals/proposaldocument/proposaldocument.component';
import { StatuslogsComponent } from '../../Proposals/statuslogs/statuslogs.component';
import { Documents2Component } from '../../Proposals/documents2/documents2.component';

@Component({
  selector: 'app-cibilchecking',
  templateUrl: './cibilchecking.component.html',
  styleUrls: ['./cibilchecking.component.css']
})
export class CibilcheckingComponent implements OnInit {

  @Input() drawerClose: Function;
  @Input() data: Proposal;
  STATUS = 'P'
  REMARK: string = ""
  url: string = ""
  urlSafe: SafeResourceUrl;
  isSpinning = false
  logtext: string = ""
  userActivityLogData: Useractivitylog = new Useractivitylog();
  drawerTitle: string = ""
  drawerVisible = false
  browserLang = "kn";
  drawerData: Proposal = new Proposal()
  @ViewChild(ProposaldocumentComponent) proposalDocument: ProposaldocumentComponent;
  fileData_REPORT_URL: File = null
  cibilitReportUrl: string = ""
  fkey = this.api.cibilifkey
  CIBIL_SCORE: number
  isSpinning1 = false
  isSpinning2 = false
  isSpinning3 = false
  @ViewChild(StatuslogsComponent) proposalStatuslogsComponent: StatuslogsComponent;
  @ViewChild(Documents2Component) proposalDocumnets: Documents2Component;

  drawerStattusVisible = false
  drawerStattusTitle: string
  drawerDocumentTitle: string
  drawerDocumentVisible: boolean
  @ViewChild('file1', { static: false }) myInputVariable1: ElementRef;
  saveCount: number = 0;

  constructor(public sanitizer: DomSanitizer, private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {
    this.browserLang = localStorage.getItem("locale");
  }

  reset() {
    this.myInputVariable1.nativeElement.value = null;
    this.REMARK = ""
    this.fileData_REPORT_URL = null
    this.CIBIL_SCORE = undefined
  }

  getUrl(url) {
    this.url = url
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  save(val) {
    var st = true;
    if (this.STATUS == 'S') {
      if (this.REMARK != "") {
      }
      else {
        st = false;
        this.message.error(this.api.translate.instant('cibilchecking.message1'), "");
      }
      if (this.CIBIL_SCORE == undefined) {
        this.CIBIL_SCORE = 0;
      }
    } else {
      if (this.REMARK != "" && this.CIBIL_SCORE != undefined) {
      }
      else {
        st = false;
        this.message.error(this.api.translate.instant('cibilchecking.message1'), "");
      }
    }

    if (st == true) {
      this.isSpinning3 = true;
      if (this.fileData_REPORT_URL) {
        var fileExt = this.fileData_REPORT_URL.name.split('.').pop();
        var lkey = ""
        this.saveCount++;
        if (this.saveCount == 1) {
          this.api.onUploadNewMethod(this.fileData_REPORT_URL, fileExt, this.fkey)
            .subscribe(successCode => {
              //console.log(successCode)
              if (successCode['code'] == 200) {
                lkey = successCode['data'][0]['L_KEY']
                this.cibilitReportUrl = lkey
                this.updateData(val)
              }
              else {
                this.saveCount = 0;
                //console.log(successCode)
              }
            },
              error => {
                this.saveCount = 0;

              });
        }
      } else {
        this.cibilitReportUrl = " ";
        this.updateData(val)
      }
    }

  }

  updateData(val) {

    let isCompleted
    let nextStageId: number

    if (this.STATUS == 'P' || this.STATUS == 'S')
      nextStageId = 8
    else if (this.STATUS == 'H')
      nextStageId = 5
    else if (this.STATUS == 'R')
      nextStageId = 6

    if (val == 'C') {

      isCompleted = 0
    }
    else if (val == 'O') {

      isCompleted = 0
    }
    else if (val == 'H') {

      isCompleted = 1
    }
    else if (val == 'R') {

      isCompleted = 1
    }

    this.api.updateCIBILProposal(this.CIBIL_SCORE, this.cibilitReportUrl, this.data.ID, this.data.CURRENT_STAGE_ID, nextStageId, this.REMARK, isCompleted)
      .subscribe(successCode => {


        if (successCode['code'] == "200") {

          if (val == "C" || val == "H" || val == "R") {
            this.drawerClose()
            this.reset();
            this.isSpinning = false
            this.isSpinning1 = false
            this.isSpinning2 = false
            this.isSpinning3 = false
          }
          else {
            this.drawerClose()
            this.drawerTitle = this.api.translate.instant('cibilchecking.lebel12')
            this.drawerVisible = true
            this.drawerData = Object.assign({}, this.data);
            this.proposalDocument.getAllProposalDocuments(this.data)
            //this.proposalDocument.getLinkUrl("http://117.204.250.156:1470/userresponses/"+this.data.BOT_REPLY_ID)
            // this.proposalDocument.getLinkUrl("http://bot.tecpool.in/userresponses/"+this.data.BOT_REPLY_ID)
            this.proposalDocument.getLinkUrl(this.api.chatbotUrl + "userresponses/" + this.data.BOT_REPLY_ID)


            this.proposalDocument.REMARKS = ""
            this.proposalDocument.AMT_INFORMATION = ""
            this.proposalDocument.AMOUNT = undefined
            this.proposalDocument.TIME = undefined
            this.isSpinning = false
            this.isSpinning1 = false
            this.isSpinning2 = false
            this.isSpinning3 = false
          }

          this.logtext = 'Update Status - CIBIL Checking form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
          this.api.addLog('A', this.logtext, this.api.emailId)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                //console.log(successCode);
              }
              else {
                //console.log(successCode);
                this.isSpinning = false
                this.isSpinning1 = false
                this.isSpinning2 = false
                this.isSpinning3 = false
              }
            });

          this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
          this.userActivityLogData.ACTIVITY_DETAILS = "CIBIL Checking -  CIBIL Checking Clicked" + JSON.stringify(this.data)
          this.userActivityLogData.ACTIVITY_TIME = new Date()
          this.api.createUserActivityLog(this.userActivityLogData)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                //console.log(successCode);
              }
              else {
                //console.log(successCode);
                this.isSpinning = false
                this.isSpinning1 = false
                this.isSpinning2 = false
                this.isSpinning3 = false
              }
            });


        }
        else {
          this.isSpinning = false
          this.isSpinning1 = false
          this.isSpinning2 = false
          this.isSpinning3 = false
          this.logtext = 'CIBIL Checking - CIBIL Checking form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - JoinedBranch ]";
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
          this.userActivityLogData.ACTIVITY_DETAILS = "CIBIL Checking - CIBIL Checking Failed" + JSON.stringify(this.data)
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
          this.message.error(this.api.translate.instant('common.message.error.failed'), "");
          this.isSpinning = false
          this.isSpinning1 = false
          this.isSpinning2 = false
          this.isSpinning3 = false
        }
      });
  }

  onFileSelectedCIBIL_REPRT_URL(event) {
    this.fileData_REPORT_URL = <File>event.target.files[0];
  }

  get closeCallback() {
    return this.drawerClose1.bind(this);
  }

  drawerClose1(): void {
    this.drawerVisible = false;
  }

  statusLogs() {

    this.drawerStattusTitle = this.api.translate.instant('cibilchecking.link2')
    this.drawerStattusVisible = true;
    this.drawerData = Object.assign({}, this.data);
    this.proposalStatuslogsComponent.getProposalSalId(this.data.ID)
  }

  get closeCallbackStattus() {
    return this.drawerStattusClose.bind(this);
  }

  drawerStattusClose(): void {
    this.drawerStattusVisible = false;
  }

  getStatusName(status) {
    if (status == 'R')
      return this.api.translate.instant('cibilchecking.lebel9')
    else if (status == 'B')
      return this.api.translate.instant('cibilchecking.lebel10')
    else
      return this.api.translate.instant('cibilchecking.lebel11')
  }

  documents() {

    this.drawerDocumentTitle = this.api.translate.instant('cibilchecking.link1')
    this.drawerDocumentVisible = true;
    this.drawerData = Object.assign({}, this.data);
    this.proposalDocumnets.getAllProposalDocuments(this.data, this.drawerData.APPLICANT_ID)
  }

  drawerDocumentClose(): void {
    this.drawerDocumentVisible = false;
  }

  get closeCallbackDocument() {
    return this.drawerDocumentClose.bind(this);
  }
}
