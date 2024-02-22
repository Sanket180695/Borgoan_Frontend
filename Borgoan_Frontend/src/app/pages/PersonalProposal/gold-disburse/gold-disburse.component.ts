import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { Proposal } from 'src/app/Models/proposal';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-gold-disburse',
  templateUrl: './gold-disburse.component.html',
  styleUrls: ['./gold-disburse.component.css']
})
export class GoldDisburseComponent implements OnInit {

  userActivityLogData: Useractivitylog = new Useractivitylog();
  @Input() data: Proposal;
  @Input() drawerClose: Function;
  isButtonSpinning2 = false
  @Input() selectedIndex: number;
  @Output() demo: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  isButtonSpinning = false;
  isSpinning = false;
  @Input() PROPOSAL_ID: number;
  @Input() APPLICANT_ID: number;
  @Input() IndivisualInfotabs = []
  userId = sessionStorage.getItem('userId')
  logtext = ''
  REMARKS = ''
  @Input() isreject = true;
  @Output() fsubmit = new EventEmitter<string>();
  AMT_INFORMATION: string = ""
  roleId = sessionStorage.getItem("roleId")
  AMOUNT: number = 0;
  BRANCH_OPINION_TEXT = ''
  IS_IDENTITY_CARD_OBTAINED: boolean
  IS_CHECK_OBTAINED: boolean
  DOCUMENT_TEXT = ''
  imageSrc
  imageSrc1
  images = []
  fileExt: string = ""
  isSpinning1 = false
  browserLang = 'kn'
  @Input() loanType: number;

  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {
    this.browserLang = localStorage.getItem('locale');
    // let filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND TYPE='B'"
    // this.api.getAllApplicantExtraInformation(0, 0, 'SEQ_NO', "asc", filter).subscribe(data => {
    //   if (data['count'] > 0) {
    //     this.IndivisualInfotabs = data['data'];
    //     this.checkStatus();
    //   }
    //   else {
    //     this.IndivisualInfotabs = [];
    //     this.checkStatus();
    //   }

    // }, err => {
    //   ////console.log(err);
    // });
    this.getUrl(this.data.PROPOSAL_FILE)

    this.checkStatus();
  }

  checkStatus() {
    this.isreject = true;
    var data = []
    //console.log("individual tab : ",this.IndivisualInfotabs)
    data = this.IndivisualInfotabs.filter(object => {
      return (object['IS_APPROVED'] == 0);
    });

    //console.log("Individual check",data);
    if (data.length == 0) {
      this.isreject = false
    }
    else {
      this.isreject = true

    }
  }
  base64ToArrayBuffer(base64) {
    var binary_string = base64.replace(/\\n/g, '');
    binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }
  getUrl(url) {
    this.isSpinning1 = true
    if (url == null) {
      this.message.error(this.api.translate.instant('approvedocument.message1'), "");
      this.isSpinning1 = false
    }
    else {
      this.api.getFile(url).subscribe(data => {
        this.isSpinning1 = false
        if (data['code'] == 200) {
          const TYPED_ARRAY = new Uint8Array(data['data']['FILE_DATA']['data']);
          const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
            return data + String.fromCharCode(byte);
          }, '');
          let base64String = btoa(STRING_CHAR);
          this.fileExt = data['data']['F_EXT']

          if (data['data']['F_EXT'] == "pdf") {
            this.imageSrc = this.base64ToArrayBuffer(base64String);
            this.imageSrc1 = "data:application/pdf;base64," + base64String;
          } else {
            this.imageSrc = "data:image/jpeg;base64," + base64String;
            this.images = [this.imageSrc]
          }
        }
        else {
          // this.message.error(data['message'], "");
          this.imageSrc = ""
        }
      }, err => {
        ////console.log(err);
      });
    }
  }
  save(status) {


    this.isButtonSpinning = true

    if (status == 'V') {
      this.DOCUMENT_TEXT = ""
      this.REMARKS = ""
      if (this.BRANCH_OPINION_TEXT != undefined && this.BRANCH_OPINION_TEXT.trim() != '') {
        // if (  this.AMOUNT != 0 && this.AMOUNT != undefined) {
        let nextStageId = 15
        // ////console.log(nextStageId, this.data.ID)
        this.api.updateStatus3(this.IS_CHECK_OBTAINED, this.IS_IDENTITY_CARD_OBTAINED, this.BRANCH_OPINION_TEXT, this.DOCUMENT_TEXT, this.data.CURRENT_STAGE_ID, nextStageId, this.REMARKS, this.data.ID, 0)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.isButtonSpinning = false;

              this.logtext = 'SubmitForScrutiny  - Submit For Scrutiny  form - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {

                  }
                  else {
                  }
                });
              this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
              this.userActivityLogData.ACTIVITY_DETAILS = " SubmitForScrutiny  -   Submit For Scrutiny  " + "Stage Id" + nextStageId + JSON.stringify(this.data)
              this.userActivityLogData.ACTIVITY_TIME = new Date()
              this.api.createUserActivityLog(this.userActivityLogData)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    // ////console.log(successCode);
                  }
                  else {
                    // ////console.log(successCode);


                  }
                });
              this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
              this.fsubmit.emit()
            }
            else {

              this.isButtonSpinning = false

              this.logtext = ' SubmitForScrutiny  -  Submit For Scrutiny  form - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - JoinedBranch ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    // ////console.log(successCode);
                  }
                  else {
                    // ////console.log(successCode);


                  }
                });
              this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
              this.userActivityLogData.ACTIVITY_DETAILS = " SubmitForScrutiny  -  Submit For Scrutiny  Failed" + "Stage Id" + nextStageId + JSON.stringify(this.data)
              this.userActivityLogData.ACTIVITY_TIME = new Date()
              this.api.createUserActivityLog(this.userActivityLogData)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    // ////console.log(successCode);
                  }
                  else {
                    // ////console.log(successCode);
                  }
                });
              this.message.error(this.api.translate.instant('common.message.error.failed'), "");

              this.isButtonSpinning = false

            }
          });
      } else {
        this.message.error(this.api.translate.instant('common.message.error.emptyinfo'), "");
      }
    } else {
      this.isButtonSpinning = true
      let nextStageId = 8
      // ////console.log(nextStageId, this.data.ID)
      this.api.updateStatus(this.data.CURRENT_STAGE_ID, nextStageId, this.BRANCH_OPINION_TEXT, this.data.ID, 0)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.isButtonSpinning = false
            var LOG_ACTION = 'Proposal resent to refill infomration'

            var DESCRIPTION = sessionStorage.getItem('userName') + ' has sent the proposal' + this.data['LOAN_KEY'] + ' to refill with remark -' + this.REMARKS
            var LOG_TYPE = 'I'
            this.api.proposalLogInformation(this.data.ID, this.data.CURRENT_STAGE_ID, 8, LOG_ACTION, Number(this.userId), DESCRIPTION, LOG_TYPE)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                }
              });

            // this.drawerClose()
            this.logtext = 'SubmitForScrutiny  - Submit For Refill  form - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode,"hieee");
                }
                else {
                  // ////console.log(successCode);

                }
              });

            this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
            this.userActivityLogData.ACTIVITY_DETAILS = " SubmitForScrutiny  -   Submit For Refill  " + "Stage Id" + nextStageId + JSON.stringify(this.data)
            this.userActivityLogData.ACTIVITY_TIME = new Date()
            this.api.createUserActivityLog(this.userActivityLogData)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  // ////console.log(successCode);
                }
                else {
                  // ////console.log(successCode);


                }
              });
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
            this.fsubmit.emit()

          }
          else {

            this.isButtonSpinning = false

            this.logtext = ' SubmitForScrutiny  -  Submit For Refill  form - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - JoinedBranch ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  // ////console.log(successCode);
                }
                else {
                  // ////console.log(successCode);


                }
              });
            this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
            this.userActivityLogData.ACTIVITY_DETAILS = " SubmitForScrutiny  -  Submit For Refill  Failed" + "Stage Id" + nextStageId + JSON.stringify(this.data)
            this.userActivityLogData.ACTIVITY_TIME = new Date()
            this.api.createUserActivityLog(this.userActivityLogData)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  // ////console.log(successCode);
                }
                else {
                  // ////console.log(successCode);
                }
              });
            this.message.error(this.api.translate.instant('common.message.error.failed'), "");



          }
        });
    }




  }

}
