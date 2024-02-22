import { Component, OnInit, Input } from '@angular/core';
import { Payments } from 'src/app/Models/Payments/payments';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';

@Component({
  selector: 'app-paymentapproval',
  templateUrl: './paymentapproval.component.html',
  styleUrls: ['./paymentapproval.component.css']
})
export class PaymentapprovalComponent implements OnInit {

  @Input() drawerClose: Function;
  @Input() data: Payments;
  isSpinning1 = false
  isButtonSpinning = false
  logtext: string = ""
  imageSrc
  images = []
  userActivityLogData: Useractivitylog = new Useractivitylog();
  imageIndex = 0;
  userId = sessionStorage.getItem("userId")

  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {
  }


  getUrl(url) {
    //console.log("url : " + url)
    this.isSpinning1 = true
    if (url == null) {
      this.message.error(this.api.translate.instant('paymentapproval.message1'), "");
      this.isSpinning1 = false
    }
    else {
      //console.log("Called")
      this.api.getFile(url).subscribe(data => {
        //console.log("data file")
        //console.log(data)
        this.isSpinning1 = false
        if (data['code'] == 200) {
          const TYPED_ARRAY = new Uint8Array(data['data']['FILE_DATA']['data']);
          const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
            return data + String.fromCharCode(byte);
          }, '');
          let base64String = btoa(STRING_CHAR);
          this.imageSrc = "data:image/jpeg;base64," + base64String;
          this.images = [this.imageSrc]

          this.logtext = "ProposalDocument Click - ProposalDocument form KEYWORD [V - ProposalDocument] ";
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
          this.userActivityLogData.ACTIVITY_DETAILS = "PaymentsApproval - Applicant Name " + this.data.APPLICANT_NAME
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
        else {
          // this.message.error(data['message'], "");
          this.imageSrc = ""
        }
      }, err => {
        //console.log(err);
      });




    }


  }


  save() {



    //console.log(this.data)
    if (this.data.STATUS == "A") {

      this.isButtonSpinning = true
      this.data.USER_ID = Number(this.userId)
      this.api.updatePaymentTransaction(this.data)
        .subscribe(successCode => {
          //console.log("updated")
          //console.log(successCode)
          if (successCode['code'] == "200") {

            this.api.updateStatus(10, 11, "", this.data.PROPOSAL_ID, 0)
              .subscribe(successCode => {
                //console.log(successCode)
                this.isButtonSpinning = false
                if (successCode['code'] == "200") {
                  this.message.success(this.api.translate.instant('paymentapproval.message2'), "");
                  var LOG_ACTION='Scrutiny fee receipt verification and approved'
                  var DESCRIPTION = sessionStorage.getItem('userName') + ' has checked and approved Scrutiny fee receipt for proposal ' + this.data['LOAN_KEY'] +' and sent the proposal for approval of board '
                  var LOG_TYPE = 'I'
                  this.api.proposalLogInformation(this.data.ID, 10,11, LOG_ACTION, Number(this.userId), DESCRIPTION, LOG_TYPE)
                    .subscribe(successCode => {
                      if (successCode['code'] == "200") {
                      }
                    });
                  this.drawerClose()

                }
                else {

                  this.isButtonSpinning = false

                  this.message.error(this.api.translate.instant('paymentapproval.message3'), "");
                }
              });

            this.drawerClose()
            this.isButtonSpinning = false
            this.logtext = 'Update Status - ApplicantDocument form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
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
            this.userActivityLogData.ACTIVITY_DETAILS = "PaymentApproval -  Update Status Clicked" + JSON.stringify(this.data)
            this.userActivityLogData.ACTIVITY_TIME = new Date()
            this.api.createUserActivityLog(this.userActivityLogData)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                  this.isButtonSpinning = false
                }
              });


          }
          else {
            this.isButtonSpinning = false
            this.logtext = 'Update Status - ApplicantDocument form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
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
            this.userActivityLogData.ACTIVITY_DETAILS = "LoanType - Update Status Failed" + JSON.stringify(this.data)
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
            this.message.error(this.api.translate.instant('paymentapproval.message4'), "");
            this.isButtonSpinning = false
          }
        });

    }
    else {
      if (this.data.FAILURE_LOG != undefined && this.data.FAILURE_LOG != "") {
        this.isButtonSpinning = true
        this.api.updatePaymentTransaction(this.data)
          .subscribe(successCode => {
            //console.log("updated")
            //console.log(successCode)
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('paymentapproval.message5'), "");
              this.drawerClose()
              var LOG_ACTION='Scrutiny fee receipt checked and rejected '
              var DESCRIPTION = sessionStorage.getItem('userName') + ' has checked and rejected Scrutiny fee receipt for proposal  ' + this.data['LOAN_KEY'] +' and sent the proposal to upload Scrutiny fee receipt '
              var LOG_TYPE = 'I'
              this.api.proposalLogInformation(this.data.ID, 10,10, LOG_ACTION, Number(this.userId), DESCRIPTION, LOG_TYPE)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                  }
                });
              this.isButtonSpinning = false
              this.logtext = 'Update Status - ApplicantDocument form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
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
              this.userActivityLogData.ACTIVITY_DETAILS = "PaymentApproval -  Update Status Clicked" + JSON.stringify(this.data)
              this.userActivityLogData.ACTIVITY_TIME = new Date()
              this.api.createUserActivityLog(this.userActivityLogData)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                    this.isButtonSpinning = false
                  }
                });


            }
            else {
              this.isButtonSpinning = false
              this.logtext = 'Update Status - ApplicantDocument form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
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
              this.userActivityLogData.ACTIVITY_DETAILS = "LoanType - Update Status Failed" + JSON.stringify(this.data)
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
              this.message.error(this.api.translate.instant('paymentapproval.message4'), "");
              this.isButtonSpinning = false
            }
          });
      }
      else {
        this.message.error(this.api.translate.instant('paymentapproval.message6'), "");

      }

    }



  }
}
