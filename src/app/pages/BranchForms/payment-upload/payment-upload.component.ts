import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { Payments } from 'src/app/Models/Payments/payments';
import { Proposal } from 'src/app/Models/proposal';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-payment-upload',
  templateUrl: './payment-upload.component.html',
  styleUrls: ['./payment-upload.component.css']
})
export class PaymentUploadComponent implements OnInit {
  isButtonSpinning = false
  @Input() drawerClose: Function;
  @Input() data2: Proposal;
  @Input() data: Payments;
  REMARK: string = ""
  isSpinning = false
  fileDataFile1: File = null
  @ViewChild('file1', { static: false }) myInputVariable1: ElementRef;
  logtext = ""
  userId = sessionStorage.getItem("userId")
  fkey1 = ""
  previous= 0
  userActivityLogData: Useractivitylog = new Useractivitylog();
  constructor(private api: ApiService, private message: NzNotificationService) { }

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

  save() {

    if (this.fileDataFile1) {
      this.isSpinning = true
      var fileExt = this.fileDataFile1.name.split('.').pop();

      this.api.onUploadNewMethod(this.fileDataFile1, fileExt, this.fkey1)
        .subscribe(successCode => {
          // //console.log(successCode)
          if (successCode['code'] == 200) {
            let lkey = successCode['data'][0]['L_KEY']
             this.data.RECEIPT_URL  = lkey;
            this.isButtonSpinning = true
            
            
            this.data.TRANSACTION_NUMBER="999";
            this.data.IS_PAYMENT_DONE=true
            this.data.PAYMENT_MODE="F"
            this.data.STATUS='Y'

            this.data.USER_ID = Number(this.userId)
            this.api.updatePaymentTransaction(this.data)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  this.drawerClose()
                  this.isButtonSpinning = false
                  this.logtext = 'Update Status - PaymentReceiptupload form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - PaymentReceiptupload ]";
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
                  this.userActivityLogData.ACTIVITY_DETAILS = "PaymentReceiptupload -  Update Status Clicked" + JSON.stringify(this.data)
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
                  this.logtext = 'Update Status - PaymentReceiptupload form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - PaymentReceiptupload ]";
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
            //console.log(successCode)
          }
        });

    }
    else {
      if (this.fileDataFile1 == null)
        this.message.error(this.api.translate.instant('basicinfo.m12'), "");
    }
  }

  close() {
    this.drawerClose()
  }
}

