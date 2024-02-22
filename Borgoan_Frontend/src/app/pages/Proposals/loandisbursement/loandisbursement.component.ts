import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { Proposal } from 'src/app/Models/proposal';
import { ApiService } from 'src/app/Service/api.service';
import { createAutoCorrectedDatePipe } from 'text-mask-addons';
import { DatePipe } from '@angular/common';
import { AmulyaNew } from 'src/app/Models/amulya-new';

@Component({
  selector: 'app-loandisbursement',
  templateUrl: './loandisbursement.component.html',
  styleUrls: ['./loandisbursement.component.css'],
  providers: [DatePipe]
})
export class LoandisbursementComponent implements OnInit {
  isButtonSpinning = false
  @Input() drawerClose: Function;
  @Input() data: Proposal;

  @Input() data2: AmulyaNew;

  REMARKS: string = ""
  STATUS = 'A'
  isSpinning = false
  fileDataFile1: File = null
  @ViewChild('file1', { static: false }) myInputVariable1: ElementRef;
  logtext = ""
  userId = sessionStorage.getItem("userId")
  fkey1 = ""
  MATURITY_DUE: any
  converted: any
  userActivityLogData: Useractivitylog = new Useractivitylog();
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  pipe = new DatePipe('en-US');
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')

  optionList = [

    {
      label: 'Vijay Khadakbhavi (General Manager)',
      value: 'A',
    }
    // {
    //   label: 'R.C.Chougala (General Manager)',
    //   value: 'A',
    // },
    // {
    //   label: 'Bahaddur A. Gurav (Deputy G.M.)',
    //   value: 'B',
    // }


  ];



  // isButtonSpinning = false
  // @Input() drawerClose: Function;
  // @Input() data: Proposal;

  // @Input() data2: AmulyaNew;

  // REMARKS: string = ""
  // STATUS = 'A'
  // isSpinning = false
  // fileDataFile1: File = null
  // @ViewChild('file1', { static: false }) myInputVariable1: ElementRef;
  // logtext = ""
  // userId = sessionStorage.getItem("userId")
  // fkey1 = ""
  // MATURITY_DUE: any
  // converted: any
  // userActivityLogData: Useractivitylog = new Useractivitylog();
  // public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  // pipe = new DatePipe('en-US');
  // autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')

  // optionList = [

  //   {
  //     label: 'R.C.Chougala (General Manager)',
  //     value: 'A',
  //   },
  //   {
  //     label: 'Bahaddur A. Gurav (Deputy G.M.)',
  //     value: 'B',
  //   }


  // ];

  constructor(private api: ApiService, private message: NzNotificationService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fkey1 = this.api.documentFkey
  }


  reset() {
    this.myInputVariable1.nativeElement.value = null;
    this.fileDataFile1 = null
  }

  onFileSelectedFile1(event) {
    this.fileDataFile1 = <File>event.target.files[0];
  }

  getData() {
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


  saveda() {

    if (this.STATUS == 'R') {
      var nextStageId = 6
      this.data.PROPOSAL_REPORT = ''
      this.MATURITY_DUE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
      if (this.REMARKS != undefined && this.REMARKS.trim() != '') {

        this.isButtonSpinning = true
        // ////console.log(nextStageId, this.data.ID)
        this.api.updateStatus(this.data.CURRENT_STAGE_ID, nextStageId, this.REMARKS, this.data.ID, 0)
          .subscribe(successCode => {
            // ////console.log(successCode)
            this.isButtonSpinning = false

            if (successCode['code'] == "200") {


              // this.drawerClose()
              this.logtext = 'LoanDisbursment  - Loan Disbursment  form - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
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
              this.userActivityLogData.ACTIVITY_DETAILS = " LoanDisbursment  -   Loan Disbursment  " + "Stage Id" + nextStageId + JSON.stringify(this.data)
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
              this.close();

            }
            else {

              this.isButtonSpinning = false

              this.logtext = ' LoanDisbursment  -  Loan Disbursment  form - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - JoinedBranch ]";
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
              this.userActivityLogData.ACTIVITY_DETAILS = " LoanDisbursment  -  Loan Disbursment  Failed" + "Stage Id" + nextStageId + JSON.stringify(this.data)
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
        this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
      }
    } else {

      if (this.fileDataFile1) {
        this.isButtonSpinning = true
        var fileExt = this.fileDataFile1.name.split('.').pop();
        this.api.onUploadNewMethod(this.fileDataFile1, fileExt, this.api.documentFkey)
          .subscribe(successCode => {
            if (successCode['code'] == 200) {
              let lkey = successCode['data'][0]['L_KEY']
              this.data.PROPOSAL_REPORT = lkey;
              // this.saveData();
            }
            else {
              this.isButtonSpinning = false
              this.message.error(this.api.translate.instant('common.message.error.failed'), "");
            }
          });
      }
      else {
        if (this.fileDataFile1 == null)
          this.message.error(this.api.translate.instant('basicinfo.m19'), "");
      }
    }


  }

  save() {
    // if (this.data.PROPOSAL_REPORT.trim() != '') {
    this.isButtonSpinning = true
    var nextStageId = 13
    this.data.CURRENT_STAGE_ID = 13;
    if (this.REMARKS != undefined && this.REMARKS.trim() != '') {

      this.isButtonSpinning = true
      // ////console.log(nextStageId, this.data.ID)
      this.api.updateStatus2(this.data.CURRENT_STAGE_ID, nextStageId, this.REMARKS, this.data.ID, 0, this.data.PROPOSAL_REPORT)
        .subscribe(successCode => {
          // ////console.log(successCode)
          this.isButtonSpinning = false

          if (successCode['code'] == "200") {

            this.api.updateProposal(this.data).subscribe(
              res => {
                if (res['code'] == 200) {
                  this.close();
                }
              }
            )


            // this.drawerClose()
            this.logtext = 'LoanDisbursment  - Loan Disbursment  form - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
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
            this.userActivityLogData.ACTIVITY_DETAILS = " LoanDisbursment  -   Loan Disbursment  " + "Stage Id" + nextStageId + JSON.stringify(this.data)
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


          }
          else {

            this.isButtonSpinning = false

            this.logtext = ' LoanDisbursment  -  Loan Disbursment  form - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - JoinedBranch ]";
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
            this.userActivityLogData.ACTIVITY_DETAILS = " LoanDisbursment  -  Loan Disbursment  Failed" + "Stage Id" + nextStageId + JSON.stringify(this.data)
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
      this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
    }
    // } else {
    //   this.message.error(this.api.translate.instant('passtomainbranch.message1'), "");
    // }
  }
  close() {
    this.drawerClose()
  }

  reject() {
    this.isButtonSpinning = true;
    var nextStageId = 6;

    if (this.REMARKS != undefined && this.REMARKS.trim() != '') {

      this.isButtonSpinning = true
      // ////console.log(nextStageId, this.data.ID)
      this.api.updateStatus2(this.data.CURRENT_STAGE_ID, nextStageId, this.REMARKS, this.data.ID, 0, this.data.PROPOSAL_REPORT)
        .subscribe(successCode => {
          // ////console.log(successCode)
          this.isButtonSpinning = false

          if (successCode['code'] == "200") {


            // this.drawerClose()
            this.logtext = 'LoanDisbursment  - Loan reject  form - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
            this.api.addLog('R', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  // ////console.log(successCode);
                }
                else {
                  // ////console.log(successCode);

                }
              });

            this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
            this.userActivityLogData.ACTIVITY_DETAILS = " LoanDisbursment  -   Loan Reject  " + "Stage Id" + nextStageId + JSON.stringify(this.data)
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
            this.close();

          }
          else {

            this.isButtonSpinning = false

            this.logtext = ' LoanDisbursment  -  Loan Reject  form - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - JoinedBranch ]";
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
            this.userActivityLogData.ACTIVITY_DETAILS = " LoanDisbursment  -  Loan Disbursment  Failed" + "Stage Id" + nextStageId + JSON.stringify(this.data)
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
      this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
    }
    // } else {
    //   this.message.error(this.api.translate.instant('passtomainbranch.message1'), "");
    // }

  }


  // reset() {
  //   this.myInputVariable1.nativeElement.value = null;
  //   this.fileDataFile1 = null
  // }

  // onFileSelectedFile1(event) {
  //   this.fileDataFile1 = <File>event.target.files[0];
  // }

  // getData() {
  //   let filter = ` AND BATCH_ID = ${this.data.BATCH_ID}`
  //   this.api.getCompletedNewAmulya(filter).subscribe({
  //     next: (amulyaGet) => {
  //       console.log("AMULYA NEW ", amulyaGet)
  //       if (amulyaGet['code'] == 200 && amulyaGet['data'].length > 0) {
  //         this.data2 = amulyaGet['data'][0];
  //       }
  //     }
  //   })

  // }


  // saveda() {

  //   if (this.STATUS == 'R') {
  //     var nextStageId = 6
  //     this.data.PROPOSAL_REPORT = ''
  //     this.MATURITY_DUE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
  //     if (this.REMARKS != undefined && this.REMARKS.trim() != '') {

  //       this.isButtonSpinning = true
  //       // ////console.log(nextStageId, this.data.ID)
  //       this.api.updateStatus(this.data.CURRENT_STAGE_ID, nextStageId, this.REMARKS, this.data.ID, 0)
  //         .subscribe(successCode => {
  //           // ////console.log(successCode)
  //           this.isButtonSpinning = false

  //           if (successCode['code'] == "200") {


  //             // this.drawerClose()
  //             this.logtext = 'LoanDisbursment  - Loan Disbursment  form - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
  //             this.api.addLog('A', this.logtext, this.api.emailId)
  //               .subscribe(successCode => {
  //                 if (successCode['code'] == "200") {
  //                   // ////console.log(successCode);
  //                 }
  //                 else {
  //                   // ////console.log(successCode);

  //                 }
  //               });

  //             this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
  //             this.userActivityLogData.ACTIVITY_DETAILS = " LoanDisbursment  -   Loan Disbursment  " + "Stage Id" + nextStageId + JSON.stringify(this.data)
  //             this.userActivityLogData.ACTIVITY_TIME = new Date()
  //             this.api.createUserActivityLog(this.userActivityLogData)
  //               .subscribe(successCode => {
  //                 if (successCode['code'] == "200") {
  //                   // ////console.log(successCode);
  //                 }
  //                 else {
  //                   // ////console.log(successCode);


  //                 }
  //               });
  //             this.close();

  //           }
  //           else {

  //             this.isButtonSpinning = false

  //             this.logtext = ' LoanDisbursment  -  Loan Disbursment  form - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - JoinedBranch ]";
  //             this.api.addLog('A', this.logtext, this.api.emailId)
  //               .subscribe(successCode => {
  //                 if (successCode['code'] == "200") {
  //                   // ////console.log(successCode);
  //                 }
  //                 else {
  //                   // ////console.log(successCode);


  //                 }
  //               });
  //             this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
  //             this.userActivityLogData.ACTIVITY_DETAILS = " LoanDisbursment  -  Loan Disbursment  Failed" + "Stage Id" + nextStageId + JSON.stringify(this.data)
  //             this.userActivityLogData.ACTIVITY_TIME = new Date()
  //             this.api.createUserActivityLog(this.userActivityLogData)
  //               .subscribe(successCode => {
  //                 if (successCode['code'] == "200") {
  //                   // ////console.log(successCode);
  //                 }
  //                 else {
  //                   // ////console.log(successCode);
  //                 }
  //               });
  //             this.message.error(this.api.translate.instant('common.message.error.failed'), "");

  //             this.isButtonSpinning = false

  //           }
  //         });
  //     } else {
  //       this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
  //     }
  //   } else {

  //     if (this.fileDataFile1) {
  //       this.isButtonSpinning = true
  //       var fileExt = this.fileDataFile1.name.split('.').pop();
  //       this.api.onUploadNewMethod(this.fileDataFile1, fileExt, this.api.documentFkey)
  //         .subscribe(successCode => {
  //           if (successCode['code'] == 200) {
  //             let lkey = successCode['data'][0]['L_KEY']
  //             this.data.PROPOSAL_REPORT = lkey;
  //             // this.saveData();
  //           }
  //           else {
  //             this.isButtonSpinning = false
  //             this.message.error(this.api.translate.instant('common.message.error.failed'), "");
  //           }
  //         });
  //     }
  //     else {
  //       if (this.fileDataFile1 == null)
  //         this.message.error(this.api.translate.instant('basicinfo.m19'), "");
  //     }
  //   }


  // }

  // save() {
  //   // if (this.data.PROPOSAL_REPORT.trim() != '') {
  //   this.isButtonSpinning = true
  //   var nextStageId = 13
  //   this.data.CURRENT_STAGE_ID = 13;
  //   if (this.REMARKS != undefined && this.REMARKS.trim() != '') {

  //     this.isButtonSpinning = true
  //     // ////console.log(nextStageId, this.data.ID)
  //     this.api.updateStatus2(this.data.CURRENT_STAGE_ID, nextStageId, this.REMARKS, this.data.ID, 0, this.data.PROPOSAL_REPORT)
  //       .subscribe(successCode => {
  //         // ////console.log(successCode)
  //         this.isButtonSpinning = false

  //         if (successCode['code'] == "200") {

  //           this.api.updateProposal(this.data).subscribe(
  //             res => {
  //               if (res['code'] == 200) {
  //                 this.close();
  //               }
  //             }
  //           )


  //           // this.drawerClose()
  //           this.logtext = 'LoanDisbursment  - Loan Disbursment  form - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
  //           this.api.addLog('A', this.logtext, this.api.emailId)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 // ////console.log(successCode);
  //               }
  //               else {
  //                 // ////console.log(successCode);

  //               }
  //             });

  //           this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
  //           this.userActivityLogData.ACTIVITY_DETAILS = " LoanDisbursment  -   Loan Disbursment  " + "Stage Id" + nextStageId + JSON.stringify(this.data)
  //           this.userActivityLogData.ACTIVITY_TIME = new Date()
  //           this.api.createUserActivityLog(this.userActivityLogData)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 // ////console.log(successCode);
  //               }
  //               else {
  //                 // ////console.log(successCode);


  //               }
  //             });


  //         }
  //         else {

  //           this.isButtonSpinning = false

  //           this.logtext = ' LoanDisbursment  -  Loan Disbursment  form - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - JoinedBranch ]";
  //           this.api.addLog('A', this.logtext, this.api.emailId)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 // ////console.log(successCode);
  //               }
  //               else {
  //                 // ////console.log(successCode);


  //               }
  //             });
  //           this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
  //           this.userActivityLogData.ACTIVITY_DETAILS = " LoanDisbursment  -  Loan Disbursment  Failed" + "Stage Id" + nextStageId + JSON.stringify(this.data)
  //           this.userActivityLogData.ACTIVITY_TIME = new Date()
  //           this.api.createUserActivityLog(this.userActivityLogData)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 // ////console.log(successCode);
  //               }
  //               else {
  //                 // ////console.log(successCode);
  //               }
  //             });
  //           this.message.error(this.api.translate.instant('common.message.error.failed'), "");

  //           this.isButtonSpinning = false

  //         }
  //       });
  //   } else {
  //     this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
  //   }
  //   // } else {
  //   //   this.message.error(this.api.translate.instant('passtomainbranch.message1'), "");
  //   // }
  // }
  // close() {
  //   this.drawerClose()
  // }

  // reject() {
  //   this.isButtonSpinning = true;
  //   var nextStageId = 6;

  //   if (this.REMARKS != undefined && this.REMARKS.trim() != '') {

  //     this.isButtonSpinning = true
  //     // ////console.log(nextStageId, this.data.ID)
  //     this.api.updateStatus2(this.data.CURRENT_STAGE_ID, nextStageId, this.REMARKS, this.data.ID, 0, this.data.PROPOSAL_REPORT)
  //       .subscribe(successCode => {
  //         // ////console.log(successCode)
  //         this.isButtonSpinning = false

  //         if (successCode['code'] == "200") {


  //           // this.drawerClose()
  //           this.logtext = 'LoanDisbursment  - Loan reject  form - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
  //           this.api.addLog('R', this.logtext, this.api.emailId)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 // ////console.log(successCode);
  //               }
  //               else {
  //                 // ////console.log(successCode);

  //               }
  //             });

  //           this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
  //           this.userActivityLogData.ACTIVITY_DETAILS = " LoanDisbursment  -   Loan Reject  " + "Stage Id" + nextStageId + JSON.stringify(this.data)
  //           this.userActivityLogData.ACTIVITY_TIME = new Date()
  //           this.api.createUserActivityLog(this.userActivityLogData)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 // ////console.log(successCode);
  //               }
  //               else {
  //                 // ////console.log(successCode);


  //               }
  //             });
  //           this.close();

  //         }
  //         else {

  //           this.isButtonSpinning = false

  //           this.logtext = ' LoanDisbursment  -  Loan Reject  form - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - JoinedBranch ]";
  //           this.api.addLog('A', this.logtext, this.api.emailId)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 // ////console.log(successCode);
  //               }
  //               else {
  //                 // ////console.log(successCode);


  //               }
  //             });
  //           this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
  //           this.userActivityLogData.ACTIVITY_DETAILS = " LoanDisbursment  -  Loan Disbursment  Failed" + "Stage Id" + nextStageId + JSON.stringify(this.data)
  //           this.userActivityLogData.ACTIVITY_TIME = new Date()
  //           this.api.createUserActivityLog(this.userActivityLogData)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 // ////console.log(successCode);
  //               }
  //               else {
  //                 // ////console.log(successCode);
  //               }
  //             });
  //           this.message.error(this.api.translate.instant('common.message.error.failed'), "");

  //           this.isButtonSpinning = false

  //         }
  //       });
  //   } else {
  //     this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
  //   }
  //   // } else {
  //   //   this.message.error(this.api.translate.instant('passtomainbranch.message1'), "");
  //   // }

  // }








































  // reset() {
  //   this.myInputVariable1.nativeElement.value = null;
  //   this.fileDataFile1 = null
  // }

  // onFileSelectedFile1(event) {
  //   this.fileDataFile1 = <File>event.target.files[0];
  // }


  // saveda() {

  //   if (this.STATUS == 'R') {
  //     var nextStageId = 6
  //     this.data.PROPOSAL_REPORT = ''
  //     this.MATURITY_DUE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
  //     if (this.REMARKS != undefined && this.REMARKS.trim() != '') {

  //       this.isButtonSpinning = true
  //       // //console.log(nextStageId, this.data.ID)
  //       this.api.updateStatus(this.data.CURRENT_STAGE_ID, nextStageId, this.REMARKS, this.data.ID, 0)
  //         .subscribe(successCode => {
  //           // //console.log(successCode)
  //           this.isButtonSpinning = false

  //           if (successCode['code'] == "200") {


  //             // this.drawerClose()
  //             this.logtext = 'LoanDisbursment  - Loan Disbursment  form - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
  //             this.api.addLog('A', this.logtext, this.api.emailId)
  //               .subscribe(successCode => {
  //                 if (successCode['code'] == "200") {
  //                   // //console.log(successCode);
  //                 }
  //                 else {
  //                   // //console.log(successCode);

  //                 }
  //               });

  //             this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
  //             this.userActivityLogData.ACTIVITY_DETAILS = " LoanDisbursment  -   Loan Disbursment  " + "Stage Id" + nextStageId + JSON.stringify(this.data)
  //             this.userActivityLogData.ACTIVITY_TIME = new Date()
  //             this.api.createUserActivityLog(this.userActivityLogData)
  //               .subscribe(successCode => {
  //                 if (successCode['code'] == "200") {
  //                   // //console.log(successCode);
  //                 }
  //                 else {
  //                   // //console.log(successCode);


  //                 }
  //               });
  //             this.close();

  //           }
  //           else {

  //             this.isButtonSpinning = false

  //             this.logtext = ' LoanDisbursment  -  Loan Disbursment  form - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - JoinedBranch ]";
  //             this.api.addLog('A', this.logtext, this.api.emailId)
  //               .subscribe(successCode => {
  //                 if (successCode['code'] == "200") {
  //                   // //console.log(successCode);
  //                 }
  //                 else {
  //                   // //console.log(successCode);


  //                 }
  //               });
  //             this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
  //             this.userActivityLogData.ACTIVITY_DETAILS = " LoanDisbursment  -  Loan Disbursment  Failed" + "Stage Id" + nextStageId + JSON.stringify(this.data)
  //             this.userActivityLogData.ACTIVITY_TIME = new Date()
  //             this.api.createUserActivityLog(this.userActivityLogData)
  //               .subscribe(successCode => {
  //                 if (successCode['code'] == "200") {
  //                   // //console.log(successCode);
  //                 }
  //                 else {
  //                   // //console.log(successCode);
  //                 }
  //               });
  //             this.message.error(this.api.translate.instant('common.message.error.failed'), "");

  //             this.isButtonSpinning = false

  //           }
  //         });
  //     } else {
  //       this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
  //     }
  //   } else {

  //     if (this.fileDataFile1) {
  //       this.isButtonSpinning = true
  //       var fileExt = this.fileDataFile1.name.split('.').pop();
  //       this.api.onUploadNewMethod(this.fileDataFile1, fileExt, this.api.documentFkey)
  //         .subscribe(successCode => {
  //           if (successCode['code'] == 200) {
  //             let lkey = successCode['data'][0]['L_KEY']
  //             this.data.PROPOSAL_REPORT = lkey;
  //             // this.saveData();
  //           }
  //           else {
  //             this.isButtonSpinning = false
  //             this.message.error(this.api.translate.instant('common.message.error.failed'), "");
  //           }
  //         });
  //     }
  //     else {
  //       if (this.fileDataFile1 == null)
  //         this.message.error(this.api.translate.instant('basicinfo.m19'), "");
  //     }
  //   }


  // }

  // save() {
  //   // if (this.data.PROPOSAL_REPORT.trim() != '') {
  //   this.isButtonSpinning = true
  //   var nextStageId = 13
  //   if (this.REMARKS != undefined && this.REMARKS.trim() != '') {

  //     this.isButtonSpinning = true
  //     // //console.log(nextStageId, this.data.ID)
  //     this.api.updateStatus2(this.data.CURRENT_STAGE_ID, nextStageId, this.REMARKS, this.data.ID, 0, this.data.PROPOSAL_REPORT)
  //       .subscribe(successCode => {
  //         // //console.log(successCode)
  //         this.isButtonSpinning = false

  //         if (successCode['code'] == "200") {


  //           // this.drawerClose()
  //           this.logtext = 'LoanDisbursment  - Loan Disbursment  form - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
  //           this.api.addLog('A', this.logtext, this.api.emailId)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 // //console.log(successCode);
  //               }
  //               else {
  //                 // //console.log(successCode);

  //               }
  //             });

  //           this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
  //           this.userActivityLogData.ACTIVITY_DETAILS = " LoanDisbursment  -   Loan Disbursment  " + "Stage Id" + nextStageId + JSON.stringify(this.data)
  //           this.userActivityLogData.ACTIVITY_TIME = new Date()
  //           this.api.createUserActivityLog(this.userActivityLogData)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 // //console.log(successCode);
  //               }
  //               else {
  //                 // //console.log(successCode);


  //               }
  //             });
  //           this.close();

  //         }
  //         else {

  //           this.isButtonSpinning = false

  //           this.logtext = ' LoanDisbursment  -  Loan Disbursment  form - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - JoinedBranch ]";
  //           this.api.addLog('A', this.logtext, this.api.emailId)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 // //console.log(successCode);
  //               }
  //               else {
  //                 // //console.log(successCode);


  //               }
  //             });
  //           this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
  //           this.userActivityLogData.ACTIVITY_DETAILS = " LoanDisbursment  -  Loan Disbursment  Failed" + "Stage Id" + nextStageId + JSON.stringify(this.data)
  //           this.userActivityLogData.ACTIVITY_TIME = new Date()
  //           this.api.createUserActivityLog(this.userActivityLogData)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 // //console.log(successCode);
  //               }
  //               else {
  //                 // //console.log(successCode);
  //               }
  //             });
  //           this.message.error(this.api.translate.instant('common.message.error.failed'), "");

  //           this.isButtonSpinning = false

  //         }
  //       });
  //   } else {
  //     this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
  //   }
  //   // } else {
  //   //   this.message.error(this.api.translate.instant('passtomainbranch.message1'), "");
  //   // }
  // }
  // close() {
  //   this.drawerClose()
  // }

  // reject() {
  //   this.isButtonSpinning = true;
  //   var nextStageId = 6;

  //   if (this.REMARKS != undefined && this.REMARKS.trim() != '') {

  //     this.isButtonSpinning = true
  //     // //console.log(nextStageId, this.data.ID)
  //     this.api.updateStatus2(this.data.CURRENT_STAGE_ID, nextStageId, this.REMARKS, this.data.ID, 0, this.data.PROPOSAL_REPORT)
  //       .subscribe(successCode => {
  //         // //console.log(successCode)
  //         this.isButtonSpinning = false

  //         if (successCode['code'] == "200") {


  //           // this.drawerClose()
  //           this.logtext = 'LoanDisbursment  - Loan reject  form - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
  //           this.api.addLog('R', this.logtext, this.api.emailId)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 // //console.log(successCode);
  //               }
  //               else {
  //                 // //console.log(successCode);

  //               }
  //             });

  //           this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
  //           this.userActivityLogData.ACTIVITY_DETAILS = " LoanDisbursment  -   Loan Reject  " + "Stage Id" + nextStageId + JSON.stringify(this.data)
  //           this.userActivityLogData.ACTIVITY_TIME = new Date()
  //           this.api.createUserActivityLog(this.userActivityLogData)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 // //console.log(successCode);
  //               }
  //               else {
  //                 // //console.log(successCode);


  //               }
  //             });
  //           this.close();

  //         }
  //         else {

  //           this.isButtonSpinning = false

  //           this.logtext = ' LoanDisbursment  -  Loan Reject  form - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - JoinedBranch ]";
  //           this.api.addLog('A', this.logtext, this.api.emailId)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 // //console.log(successCode);
  //               }
  //               else {
  //                 // //console.log(successCode);


  //               }
  //             });
  //           this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
  //           this.userActivityLogData.ACTIVITY_DETAILS = " LoanDisbursment  -  Loan Disbursment  Failed" + "Stage Id" + nextStageId + JSON.stringify(this.data)
  //           this.userActivityLogData.ACTIVITY_TIME = new Date()
  //           this.api.createUserActivityLog(this.userActivityLogData)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 // //console.log(successCode);
  //               }
  //               else {
  //                 // //console.log(successCode);
  //               }
  //             });
  //           this.message.error(this.api.translate.instant('common.message.error.failed'), "");

  //           this.isButtonSpinning = false

  //         }
  //       });
  //   } else {
  //     this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
  //   }
  //   // } else {
  //   //   this.message.error(this.api.translate.instant('passtomainbranch.message1'), "");
  //   // }

  // }
}

