import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Branchmaster } from 'src/app/Models/BasicForms/branchmaster';
import { ApiService } from 'src/app/Service/api.service';
import { Proposal } from 'src/app/Models/proposal';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { NzNotificationService } from 'ng-zorro-antd';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { CibilcheckingComponent } from '../cibilchecking/cibilchecking.component';
import { StatuslogsComponent } from '../../Proposals/statuslogs/statuslogs.component';
import { Documents2Component } from '../../Proposals/documents2/documents2.component';

@Component({
  selector: 'app-joinbranch',
  templateUrl: './joinbranch.component.html',
  styleUrls: ['./joinbranch.component.css']
})
export class JoinbranchComponent implements OnInit {

  @Input() drawerClose: Function;
  @Input() data: Proposal;

  STATUS = 'S'
  REMARKS: string
  branches: Branchmaster[]
  loadingBranch = false
  BRANCH_ID: number
  isSpinning = false
  isSpinning1 = false
  isSpinning2 = false

  logtext: string = ""
  userActivityLogData: Useractivitylog = new Useractivitylog();
  drawerCibilhVisible = false
  drawerCibilTitle: string = ""
  drawerData: Proposal = new Proposal();
  drawerStattusVisible = false
  drawerStattusTitle: string
  url: string = ""
  urlSafe: SafeResourceUrl;
  userId = sessionStorage.getItem('userId')
  drawerDocumentTitle: string
  drawerDocumentVisible: boolean

  @ViewChild(CibilcheckingComponent) cibilcheck: CibilcheckingComponent;
  @ViewChild(StatuslogsComponent) proposalStatuslogsComponent: StatuslogsComponent;
  @ViewChild(Documents2Component) proposalDocumnets: Documents2Component;
  currentAddress: string

  constructor(private api: ApiService, private message: NzNotificationService, public sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    ////console.log(this.url)

    this.loadBranches()

  }

  getUrl(url) {
    this.url = url
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  loadBranches() {
    this.loadingBranch = true;
    this.api.getAllBranches(0, 0, 'ID', 'asc', '').subscribe(localName => {
      //console.log(localName)
      this.branches = localName['data'];
   //   console.log(this.branches);
      this.loadingBranch = false;
    }, err => {
      //console.log(err);
      this.loadingBranch = false;
    });
  }



  save(val) {
    //console.log(this.BRANCH_ID, this.REMARKS)


    let nextStageId: number
    let isCompleted




    //console.log(this.data.ID, this.BRANCH_ID, this.data.CURRENT_STAGE_ID, nextStageId, this.REMARKS, isCompleted)

    if (val == 'C' || val == 'O') {
      nextStageId = 3
      isCompleted = 0


      if (this.BRANCH_ID != undefined && this.REMARKS != undefined) {
        if (val == 'C') {
          this.isSpinning = true
        }
        else if (val == 'O') {
          this.isSpinning1 = true
        }
        this.updateProposal(val, nextStageId, isCompleted)
      }
      else {
        this.message.error(this.api.translate.instant('common.message.error.emptyinfo'), "");
      }
    }
    else {
      if (this.REMARKS != undefined) {
        this.isSpinning2 = true
        nextStageId = 10
        this.BRANCH_ID = 0
        isCompleted = 1
        this.updateProposal(val, nextStageId, isCompleted)
      }
      else {
        this.message.error(this.api.translate.instant('common.message.error.emptyinfo'), "");
      }
    }
  }


  updateProposal(val, nextStageId, isCompleted) {
    this.api.updateBranchProposal(this.data.ID, this.BRANCH_ID, this.data.CURRENT_STAGE_ID, nextStageId, this.REMARKS, isCompleted)
      .subscribe(successCode => {
        this.isSpinning = false
        this.isSpinning1 = false
        this.isSpinning2 = false

        if (successCode['code'] == "200") {
          if (val == 'C' || val == 'R') {
            this.drawerClose()
          }
          else {
            this.drawerClose()
            this.drawerCibilTitle = this.api.translate.instant('joinbranch.drawerT1');
            let likeQuery = " AND ID=" + this.data.ID
            this.api.getAllPraposals(0, 0, 'ID', 'desc', likeQuery).subscribe(data => {
              //console.log(data)
              var dataList1 = data['data'][0];
              this.drawerData = Object.assign({}, dataList1);
              this.drawerCibilhVisible = true;
              //this.cibilcheck.getUrl("http://117.204.250.156:1470/userresponses/" + this.data.BOT_REPLY_ID)
              this.cibilcheck.reset()
              //  this.cibilcheck.getUrl("http://bot.tecpool.in/userresponses/"+this.data.BOT_REPLY_ID)
              this.cibilcheck.getUrl(this.api.chatbotUrl + "userresponses/" + this.data.BOT_REPLY_ID)

            }, err => {
              //console.log(err);
              if (err['ok'] == false)
                this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
            });
          }

          this.logtext = 'Update Status - Joined Branch form - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
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
              }
            });

          this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
          this.userActivityLogData.ACTIVITY_DETAILS = "JoinedBranch -  Joined Branch Clicked" + "Stage Id" + nextStageId + JSON.stringify(this.data)
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
              }
            });


        }
        else {


          this.logtext = 'JoinedBranch - JoinedBranch form - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - JoinedBranch ]";
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

              }
            });
          this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
          this.userActivityLogData.ACTIVITY_DETAILS = "JoinedBranch - JoinedBranch Failed" + "Stage Id" + nextStageId + JSON.stringify(this.data)
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
          this.isSpinning = false;
          this.isSpinning1 = false
          this.isSpinning2 = false

        }
      });
  }



  get closeCallbackCibil() {
    return this.drawerCibilClose.bind(this);
  }

  drawerCibilClose(): void {
    this.drawerCibilhVisible = false;
  }

  statusLogs() {

    this.drawerStattusTitle = this.api.translate.instant('joinbranch.link2')
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

  loadAllAddressInfo(proposalId, applicant) {

    this.api.getAddressInfo(proposalId, "B", applicant)
      .subscribe(data => {
        //console.log(data['data'][0]['CURRENT_ADDRESS'][0])
        this.currentAddress = data['data'][0]['CURRENT_ADDRESS'][0]['BUILDING'] + ", " + data['data'][0]['CURRENT_ADDRESS'][0]['VILLAGE'] + ", तालुका: " + data['data'][0]['CURRENT_ADDRESS'][0]['TALUKA'] + ", जिल्हा: " + data['data'][0]['CURRENT_ADDRESS'][0]['DISTRICT'] + ", राज्य: " + data['data'][0]['CURRENT_ADDRESS'][0]['STATE'] + ", " + data['data'][0]['CURRENT_ADDRESS'][0]['PINCODE']

      });

  }

  // getAddress()
  // {

  //   return this.currentAddress

  //  //return ""+ data.BUILDING + ", "+data.VILLAGE+ ", तालुका: "+data.TALUKA+", जिल्हा: "+data.DISTRICT+ ", राज्य: "+data.STATE +", "+data.PINCODE
  // }

  documents() {
    //console.log("Documents")
    this.drawerDocumentTitle = this.api.translate.instant('joinbranch.link1')
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
