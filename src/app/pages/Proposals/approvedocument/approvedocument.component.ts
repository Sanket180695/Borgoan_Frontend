import { Component, OnInit, Input } from '@angular/core';
import { Proposal } from 'src/app/Models/proposal';
import { Applicantdocument } from 'src/app/Models/Applicant/applicantdocument';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-approvedocument',
  templateUrl: './approvedocument.component.html',
  styleUrls: ['./approvedocument.component.css']
})
export class ApprovedocumentComponent implements OnInit {

  @Input() drawerClose: Function;
  @Input() data: Proposal;
  @Input() documentData: Applicantdocument;

  isSpinning = false
  isButtonSpinning = false
  //documentdata: Applicantdocument = new Applicantdocument();
  logtext: string = ""
  userId = sessionStorage.getItem('userId')
  userActivityLogData: Useractivitylog = new Useractivitylog();
  url: string = ""
  urlSafe: SafeResourceUrl;
  imageSrc
  imageSrc1

  fileExt: string = ""
  isSpinning1 = false
  service: string;
  images = []
  imageIndex = 0;
  //base64="...SVFT0YNCg=="
  constructor(private api: ApiService, private message: NzNotificationService, public sanitizer: DomSanitizer) { }

  ngOnInit(): void {

  }

  getLinkUrl(url) {
    this.url = url
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  getUrl(url, documentName) {

    this.isSpinning1 = true
    if (url == null) {
      this.message.error(this.api.translate.instant('approvedocument.message1'), "");
      this.isSpinning1 = false
    }
    else {
      var linkSource = ""

      this.api.getFile(url).subscribe(data => {

        this.isSpinning1 = false
        if (data['code'] == 200) {
          const TYPED_ARRAY = new Uint8Array(data['data']['FILE_DATA']['data']);
          const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
            return data + String.fromCharCode(byte);
          }, '');
          let base64String = btoa(STRING_CHAR);

          this.fileExt = data['data']['F_EXT']
          //console.log("file ext")

          //console.log(this.fileExt)



          if (data['data']['F_EXT'] == "pdf") {
            // this.imageSrc1=data['data']['FILE_DATA']['data']
            this.imageSrc = this.base64ToArrayBuffer(base64String);
            this.imageSrc1 = "data:application/pdf;base64," + base64String;
            //  this.imageSrc=base64String
            //  //console.log(this.imageSrc)
          }

          else {
            this.imageSrc = "data:image/jpeg;base64," + base64String;
            this.images = [this.imageSrc]
          }


          // let pdfWindow =""

          // if (data['data']['F_EXT'] == "pdf") {
          //   linkSource = "data:application/pdf;base64," + base64String;
          //   pdfWindow.document.write("<iframe width='100%' height='100%' src='" + linkSource + "'></iframe>")
          // }
          // else {
          //   linkSource = "data:image/jpeg;base64," + base64String;
          //   pdfWindow.document.write("<img  width='100%' height='100%' src='" + linkSource + "'>")
          // }




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
          this.userActivityLogData.ACTIVITY_DETAILS = "ProposalDocument - Applicant Name " + this.data.APPLICANT_NAME + " Viewing Document " + documentName
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
          this.message.error(data['message'], "");
          this.imageSrc = ""
        }
      }, err => {
        //console.log(err);
      });




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



  getUrlDocument() {


    let pdfWindow = window.open()

    if (this.fileExt == "pdf") {
      //  linkSource = "data:application/pdf;base64," + base64String;
      pdfWindow.document.write("<iframe width='100%' height='100%' src='" + this.imageSrc1 + "'></iframe>")

    }
    else {
      //linkSource = "data:image/jpeg;base64," + base64String;
      pdfWindow.document.write("<img  width='100%' height='100%' src='" + this.imageSrc + "'>")
      pdfWindow.document.close();
      pdfWindow.focus();
      pdfWindow.print();
      pdfWindow.close();
    }

    //   //console.log("url : "+this.documentData.DOCUMENT_KEY)
    //   this.isSpinning1=true
    //    if (this.documentData.DOCUMENT_KEY == null)
    //      this.message.error("File Not Uploaded", "");
    //    else {
    //      var linkSource = ""
    //      //console.log("Called")
    //      this.api.getFile(this.documentData.DOCUMENT_KEY).subscribe(data => {
    //        //console.log(data)
    //        this.isSpinning1=false
    //        if (data['code'] == 200) {
    //          const TYPED_ARRAY = new Uint8Array(data['data']['FILE_DATA']['data']);
    //          const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
    //            return data + String.fromCharCode(byte);
    //          }, '');
    //          let base64String = btoa(STRING_CHAR);
    //          //console.log(this.fileExt)

    //         //  this.fileExt= data['data']['F_EXT']
    //         //   if (data['data']['F_EXT'] == "pdf")
    //         //  this.imageSrc="data:application/pdf;base64," + base64String;
    //         //  else
    //         //  this.imageSrc="data:image/jpeg;base64," + base64String;


    //          let pdfWindow =window.open()

    //          if (data['data']['F_EXT'] == "pdf") {
    //            linkSource = "data:application/pdf;base64," + base64String;
    //            pdfWindow.document.write("<iframe width='100%' height='100%' src='" + linkSource + "'></iframe>")
    //          }
    //          else {
    //            linkSource = "data:image/jpeg;base64," + base64String;
    //            pdfWindow.document.write("<img  width='100%' height='100%' src='" + linkSource + "'>")
    //          }

    //        }
    //        else {
    //          this.message.error(data['message'], "");
    //        }
    //      }, err => {
    //        //console.log(err);
    //      });




    //  }
  }



  getPrintDocument() {

    let pdfWindow = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0')
    if (this.fileExt == "pdf") {
      //  linkSource = "data:application/pdf;base64," + base64String;
      pdfWindow.document.write("<iframe width='100%' height='100%' src='" + this.imageSrc1 + "'></iframe>")
    }
    else {
      //linkSource = "data:image/jpeg;base64," + base64String;
      pdfWindow.document.write("<img width='100%' height='100%' src='" + this.imageSrc + "'>")
    }
    pdfWindow.document.close();
    pdfWindow.focus();
    pdfWindow.print();
    pdfWindow.close();
  }



  save() {
    //console.log(this.documentData.REMARK)

    if (this.documentData.REMARK != undefined && this.documentData.REMARK != "") {
      this.isButtonSpinning = true
      if (this.documentData.IS_APPROVED == true) {
        this.documentData.IS_APPROVED = 1
        this.documentData.IS_VERIFIED = 1
      }
      else {
        this.documentData.IS_VERIFIED = 1
        this.documentData.IS_APPROVED = 0
      }

      this.documentData.USER_ID = Number(this.userId)
      //console.log(this.documentData)

      this.api.updateApplicantDocument(this.documentData)
        .subscribe(successCode => {
          //console.log("updated")
          //console.log(successCode)
          if (successCode['code'] == "200") {
            if (this.documentData.IS_APPROVED == true) {
              var LOG_ACTION = 'Document approved for the proposal '
              var DESCRIPTION = sessionStorage.getItem('userName') + ' has approved the ' + this.documentData.DOCUMENT_TITLE + ' for proposal ' + this.data['LOAN_KEY'] + ' and given remark ' + this.documentData.REMARK
            } else {
              var LOG_ACTION = 'Document rejected for the proposal '
              var DESCRIPTION = sessionStorage.getItem('userName') + ' has rejected the ' + this.documentData.DOCUMENT_TITLE + ' for proposal ' + this.data['LOAN_KEY'] + ' and given remark ' + this.documentData.REMARK

            }
            var LOG_TYPE = 'I'
            this.api.proposalLogInformation(this.data.ID, this.data.CURRENT_STAGE_ID, this.data.CURRENT_STAGE_ID, LOG_ACTION, Number(this.userId), DESCRIPTION, LOG_TYPE)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
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
            this.userActivityLogData.ACTIVITY_DETAILS = "ApplicantDocument -  Update Status Clicked" + JSON.stringify(this.data)
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
            this.message.error(this.api.translate.instant('common.message.error.failed'), "");
            this.isButtonSpinning = false
          }
        });
    }
    else {
      this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");

    }


  }

}
