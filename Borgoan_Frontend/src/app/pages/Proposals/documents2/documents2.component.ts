import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { Proposal } from 'src/app/Models/proposal';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { Applicantdocument } from 'src/app/Models/Applicant/applicantdocument';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { AddproposaldocumentComponent } from '../addproposaldocument/addproposaldocument.component';
import { ApprovedocumentComponent } from '../approvedocument/approvedocument.component';
import { DatePipe } from '@angular/common';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';

@Component({
  selector: 'app-documents2',
  templateUrl: './documents2.component.html',
  styleUrls: ['./documents2.component.css'],
  providers: [DatePipe]

})
export class Documents2Component implements OnInit {

  @Input() drawerClose: Function;
  @Input() data: Proposal;
  @Input() TYPE: string;
  @Input() CURRENT_STAGE_ID: number;
  @Input() extraApplicantInformation: Extraapplicantinfo;
  @Output() demo : EventEmitter<boolean> =
    new EventEmitter<boolean>();
  formTitle = this.api.translate.instant('documents2.title');
  sortValue: string = "desc";
  sortKey: string = "id";
  searchText: string = "";
  filterQuery: string = "";
  isSpinning = false
  pageIndex = 0;
  pageSize = 0;
  totalRecords = 1;
  logtext = ""
  userActivityLogData: Useractivitylog = new Useractivitylog();
  drowerData: Proposal = new Proposal();
  documentData: Applicantdocument = new Applicantdocument();

  proposalDocumentData = []
  columns: string[][] = [['DOCUMENT_TITLE', this.api.translate.instant('documents2.columns')], ['UPLOADED_DATETIME', this.api.translate.instant('documents2.columns2')]]
  PROPOSAL_ID: number
  APPLICANT_ID: number
  buttonVisible = false
  drawerTitle: string = ""
  drawerVisible = false;
  isButtonSpinning = false
  drawerApproveDocumentVisible = false
  drawerApproveDocumentTitle: string = ""

  @ViewChild(AddproposaldocumentComponent) addDocument: AddproposaldocumentComponent;
  @ViewChild(ApprovedocumentComponent) addapproveDocument: ApprovedocumentComponent;
  isLoadingDocuments = false
  searchValue: string = ""
  searchValue1: string = ""
  searchValue2: string = ""
  kycDocuments = []
  incomeDocuments = []
  purposeDocuments = []
  isMapButtonSpinning = false
  branchId = sessionStorage.getItem("branchId")
  userId = sessionStorage.getItem("userId")
  isButtonSpinning2 = false
  fileList: FileList
  today = new Date()
  roleId = sessionStorage.getItem("roleId")

  fkey = this.api.documentFkey
  docverifyButton = false
  browserLang = ''
  cibilverifyButton = false
  constructor(private api: ApiService, private datePipe: DatePipe, private message: NzNotificationService) { }

  ngOnInit(): void {
    this.browserLang = localStorage.getItem('locale');
    if (this.browserLang == 'kn') {
      this.columns = [['NAME_KN', this.api.translate.instant('documents2.columns')], ['UPLOADED_DATETIME', this.api.translate.instant('documents2.columns2')]]
    } else if (this.browserLang == 'en') {
      this.columns = [['NAME_EN', this.api.translate.instant('documents2.columns')], ['UPLOADED_DATETIME', this.api.translate.instant('documents2.columns2')]]
    } else {
      this.columns = [['DOCUMENT_TITLE', this.api.translate.instant('documents2.columns')], ['UPLOADED_DATETIME', this.api.translate.instant('documents2.columns2')]]
    }
  }

  sort(sort: { key: string; value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;
    this.search(true);
  }

  search(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.isSpinning = true;
    var sort: string;
    try {
      sort = this.sortValue.startsWith("a") ? "asc" : "desc";

      this.logtext = "Filter Applied - UserActivityLogs form" + sort + " " + this.sortKey + " KEYWORD [F - UserActivityLogs] ";
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
      this.userActivityLogData.ACTIVITY_DETAILS = "UserActivityLogs - Sort on " + sort + " " + this.sortKey
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

    } catch (error) {
      sort = "";
    }
    // //console.log("search text:" + this.searchText);
    if (this.searchText != "") {
      var likeQuery
      if (this.TYPE == "B")
        likeQuery = " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND TYPE='B'" + " AND (";
      else
        likeQuery = " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND APPLICANT_ID=" + this.APPLICANT_ID + " AND TYPE='" + this.TYPE + "'" + " AND (";

      this.columns.forEach(column1 => {
        likeQuery += " " + column1[0] + " like '%" + this.searchText + "%' OR";
      });
      likeQuery = likeQuery.substring(0, likeQuery.length - 2) + ")"
      // //console.log("likeQuery" + likeQuery);
    }



    var filter = ""
    if (likeQuery)
      filter = this.filterQuery + likeQuery
    else
      filter = this.filterQuery

    this.logtext = "Filter Applied - UserActivityLogs form " + filter + " KEYWORD [F - UserActivityLogs] ";
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
    this.userActivityLogData.ACTIVITY_DETAILS = "UserActivityLogs - Search For " + filter
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
    // //console.log("filter")

    // //console.log(filter)


    this.api.getAllProposalDocuments(this.pageIndex, this.pageSize, 'CREATED_MODIFIED_DATE', 'desc', filter).subscribe(data => {
      // //console.log(data)
      this.isSpinning = false;
      this.totalRecords = data['count'];

      if (this.totalRecords == 0) {
        this.isLoadingDocuments = true
        //APPLICANT_ID and TYPE

        // //console.log(this.PROPOSAL_ID, this.TYPE, this.APPLICANT_ID)

        this.api.getAllMappedDocuments(this.PROPOSAL_ID, this.TYPE, this.APPLICANT_ID).subscribe(data => {
          // //console.log(data)
          this.kycDocuments = data['data'][0]['KYC'];
          this.incomeDocuments = data['data'][0]['OTHER'];
          this.purposeDocuments = [];
          this.isLoadingDocuments = false

        }, err => {
          // //console.log(err);
        });

      }
      else {
        this.proposalDocumentData = data['data'];
        var data1 = []
        data1 = this.proposalDocumentData.filter(object => {
          return (object['IS_COMPLUSORY'] == 1 && object['IS_APPROVED'] == 0 && object['IS_VERIFIED'] == 1) || (object['IS_COMPLUSORY'] == 1 && object['IS_VERIFIED'] != 0 && object['IS_UPLOADED'] == 0) || (object['IS_COMPLUSORY'] == 1 && object['IS_UPLOADED'] == 0);
        });

        //console.log(data1.length)

        if (data1.length > 0) {
          this.buttonVisible = true
        }
        else {
          this.buttonVisible = false

        }
        var data2 = []
        var data22 = []
        data2 = this.proposalDocumentData.filter(object => {
          return (object['IS_COMPLUSORY'] == 1);
        });
        data22 = this.proposalDocumentData.filter(object => {
          return (object['IS_COMPLUSORY'] == 1 && object['IS_UPLOADED'] == 1);
        });
        // //console.log(data1.length)

        if (data2.length == data22.length) {
          this.docverifyButton = true
          
        }
        else {
          this.docverifyButton = false

        }

        var data3 = []
        data3 = this.proposalDocumentData.filter(object => {
          return (object['IS_COMPLUSORY'] == 1 && object['IS_APPROVED'] == 1 && object['IS_VERIFIED'] == 1);
        });

        // //console.log(data1.length)

        if (data2.length == data3.length) {
          this.cibilverifyButton = true
        }
        else {
          this.cibilverifyButton = false

        }
        var d = this.proposalDocumentData.filter(object => {
          return (object['IS_UPLOADED'] == 1);
        });
        
        if(this.proposalDocumentData.length == d.length){
          this.changeState()
        }
      }




    }, err => {
      // //console.log(err);
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });
   
  }

  changeState() {
    if (this.TYPE == 'G' || this.TYPE == 'C') {
      this.extraApplicantInformation.IS_PROVIDED = true
      this.extraApplicantInformation.PROPOSAL_ID = this.PROPOSAL_ID
      this.extraApplicantInformation.EXTRA_INFORMATION_ID = 13
      this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            // this.demo.emit(false)
            // this.message.success(this.api.translate.instant('common.message.error.success'), "");
          }
          else {
            // this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");

          }
        });
    }
  }
  
  addLog(DOCUMENT_TITLE){
    var LOG_ACTION='Document uploaded for the proposal'
    var DESCRIPTION = sessionStorage.getItem('userName') + ' uploaded the ' + DOCUMENT_TITLE + ' documents for the proposal ' + this.data['LOAN_KEY']
    var LOG_TYPE = 'I'
    this.api.proposalLogInformation(this.data.ID, this.data.CURRENT_STAGE_ID, this.data.CURRENT_STAGE_ID, LOG_ACTION, Number(this.userId), DESCRIPTION, LOG_TYPE)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
        }
      });
  }

  handleChange(event: { target: { files: FileList; }; }, data: Applicantdocument): void {
    this.fileList = event.target.files;
    // //console.log("data")
    // //console.log(this.fileList)
    // //console.log(data)

    const isLt2M = event.target.files[0].size < 20480000;
    // //console.log(isLt2M)
    if (isLt2M) {

      if (data.ALLOWED_TYPES == ".pdf") {
        if (this.fileList[0].type === 'application/pdf') {
          this.isSpinning = true
          this.api.onUploadNewMethod(this.fileList[0], this.fileList[0].name.split(".").pop(), this.fkey)
            .subscribe(successCode => {
              if (successCode['code'] == '200') {
                // //console.log(successCode)
                // //console.log(successCode['data'][0]['L_KEY'])
                this.documentData.DOCUMENT_KEY = successCode['data'][0]['L_KEY'];
                this.documentData.ID = data.ID
                this.documentData.DOCUMENT_ID = data.DOCUMENT_ID;
                this.documentData.DOCUMENT_TITLE = data.DOCUMENT_TITLE;
                this.documentData.DOCUMENT_DESCRIPTION = data.DOCUMENT_DESCRIPTION;
                this.documentData.REMARK = data.REMARK;
                this.documentData.IS_UPLOADED = 1;
                this.documentData.IS_COMPLUSORY = data.IS_COMPLUSORY;
                this.documentData.IS_VERIFIED = 0;
                this.documentData.IS_APPROVED = 0;
                this.documentData.PROPOSAL_ID = data.PROPOSAL_ID;
                this.documentData.APPLICANT_ID = data.APPLICANT_ID
                this.documentData.UPLOADED_DATETIME = this.datePipe.transform(this.today, "yyyy-MM-dd HH:mm:ss")
                this.documentData.USER_ID = Number(this.userId)
                this.documentData.TYPE = this.TYPE
                // //console.log(this.documentData)

                this.api.updateApplicantDocument(this.documentData)
                  .subscribe(successCode => {
                    if (successCode['code'] == "200") {
                      this.search();
                      this.addLog(this.documentData.DOCUMENT_TITLE)

                    } else {
                      this.message.error(this.api.translate.instant('common.message.error.updatefailed'), '');
                      this.isButtonSpinning = false;
                    }
                  });
              }
              else {
                this.message.error(this.api.translate.instant('common.message.error.updatefailed'), '');
                this.isButtonSpinning = false;
              }
            });
        }
        else {
          this.message.error(this.api.translate.instant('common.notpdf'), '');
        }
      }
      const allowed_types = ['image/png', 'image/jpeg', 'image/jpg'];

      if ((data.ALLOWED_TYPES.match(".png") && data.ALLOWED_TYPES.match(".jpeg") && data.ALLOWED_TYPES.match(".jpg"))) {

        if (allowed_types.toString().match(event.target.files[0].type)) {
          this.isSpinning = true
          this.api.onUploadNewMethod(this.fileList[0], this.fileList[0].name.split(".").pop(), this.fkey)
            .subscribe(successCode => {
              if (successCode['code'] == '200') {
                // //console.log(successCode)
                // //console.log(successCode['data'][0]['L_KEY'])
                this.documentData.DOCUMENT_KEY = successCode['data'][0]['L_KEY'];
                this.documentData.ID = data.ID
                this.documentData.DOCUMENT_ID = data.DOCUMENT_ID;
                this.documentData.DOCUMENT_TITLE = data.DOCUMENT_TITLE;
                this.documentData.DOCUMENT_DESCRIPTION = data.DOCUMENT_DESCRIPTION;
                this.documentData.REMARK = data.REMARK;
                this.documentData.IS_UPLOADED = 1;
                this.documentData.IS_COMPLUSORY = data.IS_COMPLUSORY;
                this.documentData.IS_VERIFIED = 0;
                this.documentData.IS_APPROVED = 0;
                this.documentData.PROPOSAL_ID = data.PROPOSAL_ID;
                this.documentData.APPLICANT_ID = data.APPLICANT_ID
                this.documentData.UPLOADED_DATETIME = this.datePipe.transform(this.today, "yyyy-MM-dd HH:mm:ss")
                this.documentData.USER_ID = Number(this.userId)
                this.documentData.TYPE = this.TYPE
                // //console.log(this.documentData)

                this.api.updateApplicantDocument(this.documentData)
                  .subscribe(successCode => {
                    if (successCode['code'] == "200") {
                      this.search();
                      this.addLog(this.documentData.DOCUMENT_TITLE)

                    } else {
                      this.message.error(this.api.translate.instant('common.message.error.updatefailed'), '');
                      this.isButtonSpinning = false;
                    }
                  });
              }
              else {
                this.message.error(this.api.translate.instant('common.message.error.updatefailed'), '');
                this.isButtonSpinning = false;
              }
            });
        }
        else {
          this.message.error(this.api.translate.instant('documents2.message1'), '');
        }
      }

      const allowed_types1 = ['image/png', 'image/jpeg', 'image/jpg', "application/pdf"];

      if (data.ALLOWED_TYPES.match(".jpeg") && data.ALLOWED_TYPES.match(".pdf")) {
        if (allowed_types1.toString().match(event.target.files[0].type)) {
          this.isSpinning = true
          this.api.onUploadNewMethod(this.fileList[0], this.fileList[0].name.split(".").pop(), this.fkey)
            .subscribe(successCode => {
              if (successCode['code'] == '200') {
                // //console.log(successCode)
                // //console.log(successCode['data'][0]['L_KEY'])
                this.documentData.DOCUMENT_KEY = successCode['data'][0]['L_KEY'];
                this.documentData.ID = data.ID
                this.documentData.DOCUMENT_ID = data.DOCUMENT_ID;
                this.documentData.DOCUMENT_TITLE = data.DOCUMENT_TITLE;
                this.documentData.DOCUMENT_DESCRIPTION = data.DOCUMENT_DESCRIPTION;
                this.documentData.REMARK = data.REMARK;
                this.documentData.IS_UPLOADED = 1;
                this.documentData.IS_COMPLUSORY = data.IS_COMPLUSORY;
                this.documentData.IS_VERIFIED = 0;
                this.documentData.IS_APPROVED = 0;
                this.documentData.PROPOSAL_ID = data.PROPOSAL_ID;
                this.documentData.APPLICANT_ID = data.APPLICANT_ID
                this.documentData.UPLOADED_DATETIME = this.datePipe.transform(this.today, "yyyy-MM-dd HH:mm:ss")
                this.documentData.USER_ID = Number(this.userId)
                this.documentData.TYPE = this.TYPE
                // //console.log(this.documentData)

                this.api.updateApplicantDocument(this.documentData)
                  .subscribe(successCode => {
                    if (successCode['code'] == "200") {
                      this.search();
                      this.addLog(this.documentData.DOCUMENT_TITLE)
                    } else {
                      this.message.error(this.api.translate.instant('common.message.error.updatefailed'), '');
                      this.isButtonSpinning = false;
                    }
                  });
              }
              else {
                this.message.error(this.api.translate.instant('common.message.error.updatefailed'), '');
                this.isButtonSpinning = false;
              }
            });
        }
        else {
          this.message.error(this.api.translate.instant('documents2.message2'), '');
        }
      }
    }
    else {
      this.message.error(this.api.translate.instant('documents2.message3'), '');
    }

    // if (this.fileList.length > 0) {
    //   if (this.fileList[0].type === 'application/pdf') {
    //     this.isPdf = true;
    //   } else {
    //     this.isPdf = false;
    //     this.message.error(this.api.translate.instant('common.notpdf'), '');
    //   }-
    // }
  }


  getStatus(data: Applicantdocument) {
    if (data.IS_VERIFIED == 1 && data.IS_APPROVED == 1)
      return this.api.translate.instant('documents2.message4')
    else if (data.IS_VERIFIED == 1 && data.IS_APPROVED == 0)
      return this.api.translate.instant('documents2.message5')
  }
  getAllProposalDocuments(data: Proposal, applicantId) {

    this.PROPOSAL_ID = data.ID
    this.APPLICANT_ID = applicantId

    this.isSpinning = true
    if (this.TYPE == "B")
      this.filterQuery = " AND PROPOSAL_ID=" + data.ID + " AND TYPE='B'";
    else
      this.filterQuery = " AND PROPOSAL_ID=" + data.ID + " AND APPLICANT_ID=" + this.APPLICANT_ID + " AND TYPE='" + this.TYPE + "'";

    this.search()
  }

  add() {
    this.drawerTitle = this.api.translate.instant('documents2.drawerTitle')
    this.drawerVisible = true;
    this.addDocument.documentDetails = []
  }

  save() {

    this.isButtonSpinning2 = true


    let nextStageId = 3
    // //console.log(nextStageId, this.data.ID)
    this.api.updateStatus(this.data.CURRENT_STAGE_ID, nextStageId, " ", this.data.ID, 0)
      .subscribe(successCode => {
        // //console.log(successCode)
        this.isButtonSpinning2 = false

        if (successCode['code'] == "200") { 
            var LOG_ACTION='Sent proposal to document verification '
            var DESCRIPTION = sessionStorage.getItem('userName') + ' uploaded all required Documents for proposal  ' + this.data['LOAN_KEY'] +' and send proposal for document verification'
            var LOG_TYPE = 'I'
            this.api.proposalLogInformation(this.data.ID, this.data.CURRENT_STAGE_ID, 3, LOG_ACTION, Number(this.userId), DESCRIPTION, LOG_TYPE)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                }
              });
       
          this.drawerClose()
          this.logtext = 'Update Status - Document Upload form - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
          this.api.addLog('A', this.logtext, this.api.emailId)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                // //console.log(successCode);
              }
              else {
                // //console.log(successCode);
                this.isButtonSpinning2 = false


              }
            });

          this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
          this.userActivityLogData.ACTIVITY_DETAILS = " DocumentUpload -   Document Upload" + "Stage Id" + nextStageId + JSON.stringify(this.data)
          this.userActivityLogData.ACTIVITY_TIME = new Date()
          this.api.createUserActivityLog(this.userActivityLogData)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                // //console.log(successCode);
              }
              else {
                // //console.log(successCode);
                this.isButtonSpinning = false

              }
            });


        }
        else {

          this.isButtonSpinning = false

          this.logtext = ' DocumentUpload -  Document Upload form - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - JoinedBranch ]";
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
          this.userActivityLogData.ACTIVITY_DETAILS = " DocumentUpload -  Document Upload Failed" + "Stage Id" + nextStageId + JSON.stringify(this.data)
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

  }
  save3() {

    this.isButtonSpinning2 = true


    let nextStageId = 4
    // //console.log(nextStageId, this.data.ID)
    this.api.updateStatus(this.data.CURRENT_STAGE_ID, nextStageId, " ", this.data.ID, 0)
      .subscribe(successCode => {
        // //console.log(successCode)
        this.isButtonSpinning2 = false

        if (successCode['code'] == "200") {


          this.drawerClose()
          this.logtext = 'Update Status - Document Checking form - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
          this.api.addLog('A', this.logtext, this.api.emailId)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                // //console.log(successCode);
              }
              else {
                // //console.log(successCode);
                this.isButtonSpinning2 = false


              }
            });

          this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
          this.userActivityLogData.ACTIVITY_DETAILS = " DocumentChecking -   Document Checking" + "Stage Id" + nextStageId + JSON.stringify(this.data)
          this.userActivityLogData.ACTIVITY_TIME = new Date()
          this.api.createUserActivityLog(this.userActivityLogData)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                // //console.log(successCode);
              }
              else {
                // //console.log(successCode);
                this.isButtonSpinning = false

              }
            });


        }
        else {

          this.isButtonSpinning = false

          this.logtext = ' DocumentChecking -  Document Checking form - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - JoinedBranch ]";
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
          this.userActivityLogData.ACTIVITY_DETAILS = " DocumentChecking -  Document Checking Failed" + "Stage Id" + nextStageId + JSON.stringify(this.data)
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

  }

  save2() {

    this.isButtonSpinning = true


    let nextStageId = 2
    // //console.log(nextStageId, this.data.ID)
    this.api.updateNextDocumentUploadStage(nextStageId, 0, this.data.ID, "")
      .subscribe(successCode => {
        // //console.log(successCode)
        this.isButtonSpinning = false

        if (successCode['code'] == "200") {


          this.drawerClose()
          this.logtext = 'Update Status - Document Upload form - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
          this.api.addLog('A', this.logtext, this.api.emailId)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                // //console.log(successCode);
              }
              else {
                // //console.log(successCode);
                this.isButtonSpinning = false


              }
            });

          this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
          this.userActivityLogData.ACTIVITY_DETAILS = " DocumentUpload -   Document Upload" + "Stage Id" + nextStageId + JSON.stringify(this.data)
          this.userActivityLogData.ACTIVITY_TIME = new Date()
          this.api.createUserActivityLog(this.userActivityLogData)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                // //console.log(successCode);
              }
              else {
                // //console.log(successCode);
                this.isButtonSpinning = false

              }
            });


        }
        else {

          this.isButtonSpinning = false

          this.logtext = ' DocumentUpload -  Document Upload form - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - JoinedBranch ]";
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
          this.userActivityLogData.ACTIVITY_DETAILS = " DocumentUpload -  Document Upload Failed" + "Stage Id" + nextStageId + JSON.stringify(this.data)
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

  }

  getUrl(data: Applicantdocument, url: string, documentName) {
    // //console.log(url)

    this.drawerApproveDocumentTitle = this.api.translate.instant('documents2.drawerTitle2')
    this.drawerApproveDocumentVisible = true
    this.documentData = Object.assign({}, data);
    this.drowerData = Object.assign({}, this.data);
    // this.addapproveDocument.getLinkUrl("http://117.204.250.156:1470/userresponses/"+this.data.BOT_REPLY_ID)
    // this.addapproveDocument.getLinkUrl("http://bot.tecpool.in/userresponses/"+this.data.BOT_REPLY_ID)
    this.addapproveDocument.getLinkUrl(this.api.chatbotUrl + "userresponses/" + this.data.BOT_REPLY_ID)

    this.addapproveDocument.getUrl(data.DOCUMENT_KEY, data.DOCUMENT_TITLE)
  }

  get closeCallback() {
    return this.drawerClose1.bind(this);
  }
  drawerClose1(): void {
    this.search()
    this.drawerVisible = false;
  }

  get closeCallbackApproveDocument() {
    return this.drawerCloseApproveDocument.bind(this);
  }
  drawerCloseApproveDocument(): void {
    this.search()
    this.drawerApproveDocumentVisible = false;
  }

  mapDocument() {
    // //console.log(this.TYPE)
    this.isMapButtonSpinning = true
    this.api.mappDocument(this.PROPOSAL_ID, this.kycDocuments, this.incomeDocuments, this.purposeDocuments, this.TYPE, this.APPLICANT_ID)
      .subscribe(successCode => {
        // //console.log(successCode)
        this.isMapButtonSpinning = false
        if (successCode['code'] == "200") {
          this.search()
          this.message.success(this.api.translate.instant('common.message.error.success'), "");
          this.logtext = 'Update Status - after Document Mapping in TYPE=' + this.TYPE + "APPLICANT = " + this.APPLICANT_ID + "PROPOSAL_ID= " + this.PROPOSAL_ID + ' form - SUCCESS ' + " KEYWORD [U - Document2 ]";
          this.api.addLog('A', this.logtext, this.api.emailId)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                // //console.log(successCode);
              }
              else {
                // //console.log(successCode);
                this.isMapButtonSpinning = false
              }
            });

          this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
          this.userActivityLogData.ACTIVITY_DETAILS = 'Update Status - after Document Mapping in TYPE=' + this.TYPE + "APPLICANT = " + this.APPLICANT_ID + "PROPOSAL_ID= " + this.PROPOSAL_ID + ' form - SUCCESS ' + " KEYWORD [U - Document2 ]"
          this.userActivityLogData.ACTIVITY_TIME = new Date()
          this.api.createUserActivityLog(this.userActivityLogData)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                // //console.log(successCode);
              }
              else {
                // //console.log(successCode);
                this.isMapButtonSpinning = false

              }
            });

        }
        else {
          this.isMapButtonSpinning = false
          this.userActivityLogData.ACTIVITY_DETAILS = 'Update Status - after Document Mapping Failed in TYPE=' + this.TYPE + "APPLICANT = " + this.APPLICANT_ID + "PROPOSAL_ID= " + this.PROPOSAL_ID + ' form - SUCCESS ' + " KEYWORD [U - Document2 ]"
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
          this.userActivityLogData.ACTIVITY_DETAILS = 'Update Status - after Document Mapping Failed in TYPE=' + this.TYPE + "APPLICANT = " + this.APPLICANT_ID + "PROPOSAL_ID= " + this.PROPOSAL_ID + ' form - SUCCESS ' + " KEYWORD [U - Document2 ]"
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
          this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");

          this.isMapButtonSpinning = false

        }
      });
  }

}

