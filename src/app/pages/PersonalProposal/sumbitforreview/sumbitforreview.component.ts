import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { Proposal } from 'src/app/Models/proposal';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-sumbitforreview',
  templateUrl: './sumbitforreview.component.html',
  styleUrls: ['./sumbitforreview.component.css']
})
export class SumbitforreviewComponent implements OnInit {
  userActivityLogData: Useractivitylog = new Useractivitylog();
  @Input() data: Proposal;

  isButtonSpinning2 = false
  @Input() selectedIndex: number;
  @Output() demo : EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() fsubmit = new EventEmitter<string>();
  isButtonSpinning = false;
  isSpinning = false;
  @Input() PROPOSAL_ID: number;
  @Input() APPLICANT_ID: number;
  @Input() IndivisualInfotabs = []
  userId = sessionStorage.getItem('userId')
  logtext = ''
  REMARKS = ''
  fileDataFile1: File = null
  @ViewChild('file1', { static: false }) myInputVariable1: ElementRef;
  constructor(private api: ApiService, private message: NzNotificationService) { }


  ngOnInit(): void {
  }
  reset() {
    this.myInputVariable1.nativeElement.value = null;
    this.fileDataFile1 = null
  }

  onFileSelectedFile1(event) {
    this.fileDataFile1 = <File>event.target.files[0];
   
    if (this.fileDataFile1) {
      var fileExt = this.fileDataFile1.name.split('.').pop();
      this.api.onUploadNewMethod(this.fileDataFile1, fileExt, this.api.documentFkey)
        .subscribe(successCode => {
          if (successCode['code'] == 200) {
            let lkey = successCode['data'][0]['L_KEY']
            this.data.PROPOSAL_FILE  = lkey;
            //console.log( this.data.PROPOSAL_FILE)
          }
          else {
            //console.log(successCode)
            this.fileDataFile1 = null
            this.data.PROPOSAL_FILE  = ''
          }
        });
    }
    else {
      if (this.fileDataFile1 == null)
        this.message.error(this.api.translate.instant('basicinfo.m19'), "");
    }
  }

  save() {
    if (this.REMARKS != undefined && this.REMARKS.trim() != '') {
      //console.log( this.data.PROPOSAL_FILE)
      
      this.isButtonSpinning = true
      

      let nextStageId = 9
      // //console.log(nextStageId, this.data.ID)
      this.api.passToMainBranch(this.data.ID, this.data.CURRENT_STAGE_ID, nextStageId, this.REMARKS, Number(this.userId), this.data.PROPOSAL_FILE, this.data.PROPOSAL_REPORT)
        .subscribe(successCode => {
          // //console.log(successCode)
          this.isButtonSpinning = false

          if (successCode['code'] == "200") {


            // this.drawerClose()
            this.logtext = 'SubmitProposal - Submit Proposal form - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  // //console.log(successCode);
                }
                else {
                  // //console.log(successCode);

                }
              });

            this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
            this.userActivityLogData.ACTIVITY_DETAILS = " SubmitProposal -   Submit Proposal " + "Stage Id" + nextStageId + JSON.stringify(this.data)
            this.userActivityLogData.ACTIVITY_TIME = new Date()
            this.api.createUserActivityLog(this.userActivityLogData)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  // //console.log(successCode);
                }
                else {
                  // //console.log(successCode);


                }
              });
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
            this.fsubmit.emit()
          }
          else {

            this.isButtonSpinning = false

            this.logtext = ' SubmitProposal -  Submit Proposal form - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - JoinedBranch ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  // //console.log(successCode);
                }
                else {
                  // //console.log(successCode);


                }
              });
            this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
            this.userActivityLogData.ACTIVITY_DETAILS = " SubmitProposal -  Submit Proposal Failed" + "Stage Id" + nextStageId + JSON.stringify(this.data)
            this.userActivityLogData.ACTIVITY_TIME = new Date()
            this.api.createUserActivityLog(this.userActivityLogData)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  // //console.log(successCode);
                }
                else {
                  // //console.log(successCode);
                }
              });
            this.message.error(this.api.translate.instant('common.message.error.failed'), "");

            this.isButtonSpinning = false

          }
        });
    
    } else {
      this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
    }

  }
  
}
