import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Proposal } from 'src/app/Models/proposal';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { Applicantdocument } from 'src/app/Models/Applicant/applicantdocument';
import { AddproposaldocumentComponent } from '../addproposaldocument/addproposaldocument.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ChatinfoComponent } from '../chatinfo/chatinfo.component';
import { Documents2Component } from '../documents2/documents2.component';
import { StatuslogsComponent } from '../statuslogs/statuslogs.component';

@Component({
  selector: 'app-proposaldocument',
  templateUrl: './proposaldocument.component.html',
  styleUrls: ['./proposaldocument.component.css']
})
export class ProposaldocumentComponent implements OnInit {

  @Input() drawerClose: Function;
  @Input() data: Proposal;
  drawerchatTitle: string = ""
  drawerchatVisible: boolean
  PROPOSAL_ID: number
  proposalDocumentData = []
  logtext = ""
  isSpinning = false
  userActivityLogData: Useractivitylog = new Useractivitylog();
  documentdata: Applicantdocument = new Applicantdocument();
  drowerData: Proposal = new Proposal();

  formTitle = ""
  dataList1 = []
  isButtonSpinning = false
  @ViewChild(AddproposaldocumentComponent) addDocument: AddproposaldocumentComponent;
  @ViewChild(ChatinfoComponent) proposalChatDocumnets: ChatinfoComponent;
  @ViewChild(Documents2Component) proposalDocumnets: Documents2Component;
  @ViewChild(StatuslogsComponent) proposalStatuslogsComponent: StatuslogsComponent;

  columns: string[][] = [['DOCUMENT_TITLE', this.api.translate.instant('proposaldocument.columns1')], ['UPLOADED_DATETIME', this.api.translate.instant('proposaldocument.columns2')]]
  StatusVisible = false
  okLoading = false
  // IS_APPROVED:boolean=true
  // REMARK:string=""
  pageIndex = 1;
  pageSize = 10;
  totalRecords = 1;
  sortValue: string = "desc";
  sortKey: string = "id";
  searchText: string = "";
  filterQuery: string = "";
  userId = sessionStorage.getItem('userId')
  url: string = ""
  urlSafe: SafeResourceUrl;
  STATUS: string = 'M'
  disabled = false
  drawerDocumentVisible = false
  drawerDocumentTitle: string = ""
  textVisible = false
  drawerStattusVisible = false
  drawerStattusTitle: string
  REMARKS: string = ""
  AMT_INFORMATION: string = ""
  AMOUNT: number = 0
  TIME: number = 0
  extraInfoDetails = []
  loadingRecords = false
  isSaveSpinning = false
  disabled1 = false
  isLoadingDocuments = false
  isMapSpinning = false
  kycDocuments = []
  kycDocuments1 = [
    {
      title: this.api.translate.instant('proposaldocument.text2'),
      key: 1,
      disabled: false,
      checked: false,
      expanded: true,
      children: [
        {
          title: this.api.translate.instant('proposaldocument.text1') + '1', key: 1, disabled: false, checked: false, isLeaf: true
        },
        {
          title: this.api.translate.instant('proposaldocument.text1') + '2', key: 2, disabled: false, checked: false, isLeaf: true
        },
        {
          title: this.api.translate.instant('proposaldocument.text1') + '3', key: 3, disabled: true, checked: false, isLeaf: true
        },
        {
          title: this.api.translate.instant('proposaldocument.text1') + '4', key: 4, disabled: false, checked: false, isLeaf: true
        }
      ]
    }
  ]
  
  incomeDocuments = []
  incomeDocuments1 = [{
    title: this.api.translate.instant('proposaldocument.text3'),
    key: 1,
    disabled: false,
    checked: false,
    expanded: true,
    children: [
      {
        title: this.api.translate.instant('proposaldocument.text4'), key: 1, disabled: false, checked: false, expanded: true,
        children: [
          {
            title: this.api.translate.instant('proposaldocument.text5'), key: 1, disabled: false, checked: false, expanded: true,
            children: [
              {
                title: this.api.translate.instant('proposaldocument.text1') + '1', key: 5, disabled: false, checked: false, isLeaf: true
              },
              {
                title: this.api.translate.instant('proposaldocument.text1') + '2', key: 6, disabled: false, checked: false, isLeaf: true
              }
            ]
          },
          {
            title: this.api.translate.instant('proposaldocument.text6'), key: 7, disabled: false, checked: false, expanded: true,
            children: [
              {
                title: this.api.translate.instant('proposaldocument.text1') + '1', key: 8, disabled: false, checked: false, isLeaf: true
              },
              {
                title: this.api.translate.instant('proposaldocument.text1') + '2', key: 9, disabled: false, checked: false, isLeaf: true
              }
            ]
          },
          {
            title: this.api.translate.instant('proposaldocument.text7'), key: 3, disabled: false, checked: false, expanded: true,
            children: [
              {
                title: this.api.translate.instant('proposaldocument.text1') + '1', key: 10, disabled: false, checked: false, isLeaf: true
              },
              {
                title: this.api.translate.instant('proposaldocument.text1') + '2', key: 11, disabled: false, checked: false, isLeaf: true
              }
            ]
          },
          {
            title: this.api.translate.instant('proposaldocument.text8'), key: 4, disabled: false, checked: false, expanded: true,
            children: [
              {
                title: this.api.translate.instant('proposaldocument.text1') + '1', key: 12, disabled: false, checked: false, isLeaf: true
              },
              {
                title: this.api.translate.instant('proposaldocument.text1') + '2', key: 13, disabled: false, checked: false, isLeaf: true
              }
            ]
          }
        ]

      },
      {
        title: this.api.translate.instant('proposaldocument.text9'), key: 2, disabled: false, checked: false, expanded: true,
        children: [
          {
            title: this.api.translate.instant('proposaldocument.text10'), key: 1, disabled: false, checked: false, expanded: true,
            children: [
              {
                title: this.api.translate.instant('proposaldocument.text1') + '1', key: 5, disabled: false, checked: false, isLeaf: true
              },
              {
                title: this.api.translate.instant('proposaldocument.text1') + '2', key: 6, disabled: false, checked: false, isLeaf: true
              }
            ]
          },
          {
            title: this.api.translate.instant('proposaldocument.text11'), key: 7, disabled: false, checked: false, expanded: true,
            children: [
              {
                title: this.api.translate.instant('proposaldocument.text1') + '1', key: 8, disabled: false, checked: false, isLeaf: true
              },
              {
                title: this.api.translate.instant('proposaldocument.text1') + '2', key: 9, disabled: false, checked: false, isLeaf: true
              }
            ]
          },
          {
            title: this.api.translate.instant('proposaldocument.text12'), key: 3, disabled: false, checked: false, expanded: true,
            children: [
              {
                title: this.api.translate.instant('proposaldocument.text1') + '1', key: 10, disabled: false, checked: false, isLeaf: true
              },
              {
                title: this.api.translate.instant('proposaldocument.text1') + '2', key: 11, disabled: false, checked: false, isLeaf: true
              }
            ]
          },
          {
            title: this.api.translate.instant('proposaldocument.text13'), key: 4, disabled: false, checked: false, expanded: true,
            children: [
              {
                title: this.api.translate.instant('proposaldocument.text1') + '1', key: 12, disabled: false, checked: false, isLeaf: true
              },
              {
                title: this.api.translate.instant('proposaldocument.text1') + '2', key: 13, disabled: false, checked: false, isLeaf: true
              }
            ]
          }
        ]

      },

    ]
  }]
  purposeDocuments = []
  purposeDocuments1 = [
    {
      title: this.api.translate.instant('proposaldocument.text14'),
      key: 1,
      disabled: false,
      checked: false,
      expanded: true,
      children: [
        {
          title: this.api.translate.instant('proposaldocument.text15'), key: 1, disabled: false, checked: false, expanded: true,
          children: [
            {
              title: this.api.translate.instant('proposaldocument.text16'), key: 2, disabled: false, checked: false, expanded: true,
              children: [
                {
                  title: this.api.translate.instant('proposaldocument.text1') + '1', key: 2, disabled: false, checked: false, isLeaf: true
                },
                {
                  title: this.api.translate.instant('proposaldocument.text1') + '2', key: 2, disabled: false, checked: false, isLeaf: true
                },
              ]
            },
            {
              title: this.api.translate.instant('proposaldocument.text17'), key: 3, disabled: false, checked: false, expanded: true,
              children: [
                {
                  title: this.api.translate.instant('proposaldocument.text1') + '1', key: 2, disabled: false, checked: false, isLeaf: true
                },
                {
                  title: this.api.translate.instant('proposaldocument.text1') + '2', key: 2, disabled: false, checked: false, isLeaf: true
                },
              ]
            }
          ]
        },
        {
          title: this.api.translate.instant('proposaldocument.text18'), key: 2, disabled: false, checked: false, expanded: true,
          children: [
            {
              title: this.api.translate.instant('proposaldocument.text19'), key: 2, disabled: false, checked: false, expanded: true,
              children: [
                {
                  title: this.api.translate.instant('proposaldocument.text1') + '1', key: 2, disabled: false, checked: false, isLeaf: true
                },
                {
                  title: this.api.translate.instant('proposaldocument.text1') + '2', key: 2, disabled: false, checked: false, isLeaf: true
                },
              ]
            },
            {
              title: this.api.translate.instant('proposaldocument.text20'), key: 3, disabled: false, checked: false, expanded: true,
              children: [
                {
                  title: this.api.translate.instant('proposaldocument.text1') + '1', key: 2, disabled: false, checked: false, isLeaf: true
                },
                {
                  title: this.api.translate.instant('proposaldocument.text1') + '2', key: 2, disabled: false, checked: false, isLeaf: true
                },
              ]
            }
          ]
        },
        {
          title: this.api.translate.instant('proposaldocument.text21'), key: 2, disabled: false, checked: false,
          children: [
            {
              title: this.api.translate.instant('proposaldocument.text1') + '1', key: 2, disabled: false, checked: false, isLeaf: true
            },
            {
              title: this.api.translate.instant('proposaldocument.text1') + '1', key: 2, disabled: false, checked: false, isLeaf: true
            },
            {
              title: this.api.translate.instant('proposaldocument.text1') + '1', key: 2, disabled: false, checked: false, isLeaf: true
            },
            {
              title: this.api.translate.instant('proposaldocument.text1') + '1', key: 2, disabled: false, checked: false, isLeaf: true
            },

          ]
        },

      ]
    }
  ]
  searchValue: string = ""
  searchValue1: string = ""
  searchValue2: string = ""
  APPLICANT_ID: number
  browserLang = ''
  constructor(private api: ApiService, private message: NzNotificationService, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.browserLang = localStorage.getItem('locale');
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
            //console.log(successCode);
          }
          else {
            //console.log(successCode);
          }
        });

      this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
      this.userActivityLogData.ACTIVITY_DETAILS = "UserActivityLogs - Sort on " + sort + " " + this.sortKey
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

    } catch (error) {
      sort = "";
    }
    //console.log("search text:" + this.searchText);
    if (this.searchText != "") {
      var likeQuery = " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND TYPE='B'" + " AND (";
      this.columns.forEach(column1 => {
        likeQuery += " " + column1[0] + " like '%" + this.searchText + "%' OR";
      });
      likeQuery = likeQuery.substring(0, likeQuery.length - 2) + ")"
      //console.log("likeQuery" + likeQuery);
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
          //console.log(successCode);
        }
        else {
          //console.log(successCode);
        }
      });

    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "UserActivityLogs - Search For " + filter
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
    //console.log("filter")

    //console.log(filter)


    this.api.getAllProposalDocuments(this.pageIndex, this.pageSize, this.sortKey, sort, filter).subscribe(data => {
      //console.log("document Extra information")
      //console.log(data)
      this.isSpinning = false;
      this.totalRecords = data['count'];
      this.proposalDocumentData = data['data'];
      var data1 = []
      data1 = this.proposalDocumentData.filter(object => {
        return object['IS_COMPLUSORY'] == 1 && object['IS_APPROVED'] == 0;
      });


      let filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND TYPE='B'"
      this.api.getAllApplicantExtraInformation(0, 0, "SEQ_NO", "asc", filter).subscribe(data => {
        //console.log("proposal extra information")
        //console.log(data)
        var extraData = []
        var extraData1 = []
        extraData = data['data'].filter(object => {
          return object['IS_PROVIDED'] == 0
        });

        extraData1 = extraData.filter(object => {
          return object['EXTRA_INFORMATION_ID'] != 10
        });


        //console.log(extraData.length)
        //console.log(data1.length)

        if (extraData.length > 0 && extraData1.length > 0) {
          this.disabled1 = true
        }
        else {
          this.disabled1 = false
        }




        if (data1.length > 0) {
          this.disabled1 = true
          this.disabled = true
          this.textVisible = true

        }
        else {
          this.disabled = false
          this.textVisible = false
          this.getExtraInformation()
          this.getMappedDocuments()
        }
      }, err => {
        //console.log(err);
      });

    }, err => {
      //console.log(err);
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });

    // this.api.getAllProposalDocuments(0, 0, this.sortKey, sort, filter).subscribe(data => {

    //   this.dataList1 = data['data'];
    // }, err => {
    //   //console.log(err);
    //   if (err['ok'] == false)
    //     this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    // });

  }

  getLinkUrl(url) {
    this.url = url
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  getAllProposalDocuments(data: Proposal) {

    this.PROPOSAL_ID = data.ID
    this.APPLICANT_ID = data.APPLICANT_ID
    this.isSpinning = true
    this.filterQuery = " AND PROPOSAL_ID=" + data.ID + " AND TYPE='B'";
    this.search()

  }

  getMappedDocuments() {
    //console.log("Documents Data")
    this.isLoadingDocuments = false
    //APPLICANT_ID and TYPE
    this.api.getAllMappedDocuments(this.PROPOSAL_ID, "B", 0).subscribe(data => {
      //console.log("Document data")
      //console.log(data)
      this.kycDocuments = data['data'][0]['KYC'];
      this.incomeDocuments = data['data'][0]['OTHER'];
      this.purposeDocuments = [];

    }, err => {
      //console.log(err);
    });
  }


  getExtraInformation() {
    //console.log(this.PROPOSAL_ID)
    //console.log(this.APPLICANT_ID)

    //get json of extra information
    this.loadingRecords = true
    let type = "B"
    this.api.getAllExtraInformationMapped(this.PROPOSAL_ID, type).subscribe(data => {
      //console.log("data")
      //console.log(data)
      this.extraInfoDetails = data['data'];
      this.loadingRecords = false
    }, err => {
      //console.log(err);
    });
  }




  changeStatus(data: Applicantdocument) {
    this.StatusVisible = true
    this.documentdata = Object.assign({}, data);
  }




  UpdateOk() {
    // this.documentdata.IS_VERIFIED=1
    // this.documentdata.IS_APPROVED=1
    this.okLoading = true
    if (this.documentdata.IS_APPROVED == true) {
      this.documentdata.IS_APPROVED = 1
      this.documentdata.IS_VERIFIED = 1
    }
    else {
      this.documentdata.IS_VERIFIED = 1
      this.documentdata.IS_APPROVED = 0
    }
    this.documentdata.PROPOSAL_ID = this.data.ID
    this.documentdata.USER_ID = Number(this.userId)



    //console.log(this.documentdata)

    this.api.updateApplicantDocument(this.documentdata)
      .subscribe(successCode => {
        //console.log("updated")
        //console.log(successCode)
        if (successCode['code'] == "200") {
          this.search()
          this.okLoading = false
          this.StatusVisible = false
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
              }
            });


        }
        else {

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
          this.isSpinning = false;
        }
      });

  }

  UpdateCancel() {
    this.StatusVisible = false
  }

  add() {
    // this.drawerTitle = "Add Documents"
    // this.drawerVisible = true;
    // this.addDocument.documentDetails = []
  }

  get closeCallbackchat() {
    return this.drawerchatClose.bind(this);
  }
  drawerchatClose(): void {
    this.search()
    this.drawerchatVisible = false;
  }

  get closeCallbackDocument() {
    return this.drawerDocumentClose.bind(this);
  }
  drawerDocumentClose(): void {
    this.search()
    this.drawerDocumentVisible = false;
  }

  get closeCallbackStattus() {
    return this.drawerStattusClose.bind(this);
  }
  drawerStattusClose(): void {
    this.search()
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
    this.drawerDocumentTitle = this.api.translate.instant('proposaldocument.link2')
    this.drawerDocumentVisible = true;
    this.drowerData = Object.assign({}, this.data);
    this.proposalDocumnets.getAllProposalDocuments(this.data, this.drowerData.APPLICANT_ID)
  }

  statusLogs() {
    //console.log("Status")
    this.drawerStattusTitle = this.api.translate.instant('proposaldocument.link3')
    this.drawerStattusVisible = true;
    this.drowerData = Object.assign({}, this.data);

    this.proposalStatuslogsComponent.getProposalSalId(this.data.ID)
  }

  close() {
    this.drawerClose()
  }
  changeInfo(value, data) {
 
      if (value) {
        data.IS_COMPULSORY = 1;
        data.IS_SELECTED = 1;
      }
      else {
        data.IS_COMPULSORY = 0;
        data.IS_SELECTED = 0;
      }
    
  }

  changeCompulsaryInfo(value, data) {
    if (value)
      data.IS_COMPULSORY = 1;
    else
      data.IS_COMPULSORY = 0
  }

  getType(type) {
    let typeString = ""
    if (type.match("I"))
      typeString = this.api.translate.instant('proposaldocument.typeString1')
    if (type.match("F"))
      typeString += this.api.translate.instant('proposaldocument.typeString2')
    if (type.match("C"))
      typeString += this.api.translate.instant('proposaldocument.typeString3')
    if (type.match("G"))
      typeString += this.api.translate.instant('proposaldocument.typeString4')

    return typeString.substring(0, (typeString.length - 1))

  }

  save() {

    let nextStageId
    if (this.STATUS == "M") {
      this.isSaveSpinning = true
      var ind = this.extraInfoDetails.findIndex((item) => item.ID == 11);
      this.extraInfoDetails[ind].IS_COMPLUSORY = 1;
      this.extraInfoDetails[ind].IS_SELECTED = 1;
      //console.log(this.data.ID, this.extraInfoDetails)

      this.api.addApplicantExtraInformation(this.data.ID, "B", this.extraInfoDetails)
        .subscribe(successCode => {
          //console.log(successCode)
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('common.message.error.success'), "");
            this.drawerClose();
            this.isSaveSpinning = false;
          }
          else {
            this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
            this.isSaveSpinning = false;
          }
        });
    }
    else if (this.STATUS == "B") {
      nextStageId = 5
      //console.log(nextStageId, this.data.ID, this.REMARKS)
      if (this.REMARKS != "") {
        this.isSaveSpinning = true
        this.api.updateStatus(3, nextStageId, this.REMARKS, this.data.ID, 0)
          .subscribe(successCode => {
            //console.log(successCode)
            this.isSaveSpinning = false
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('common.message.error.success'), "");
              this.drawerClose()
              this.logtext = 'Update Status - after Document Checking form - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ProposalDocument ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                    this.isSaveSpinning = false
                  }
                });

              this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
              this.userActivityLogData.ACTIVITY_DETAILS = "afterDocumentChecking -   Document Checking" + "Stage Id" + nextStageId + JSON.stringify(this.data)
              this.userActivityLogData.ACTIVITY_TIME = new Date()
              this.api.createUserActivityLog(this.userActivityLogData)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                    this.isSaveSpinning = false

                  }
                });


            }
            else {

              this.isSaveSpinning = false

              this.logtext = ' ProposalDocument - after Document Checking form - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - ProposalDocument ]";
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
              this.userActivityLogData.ACTIVITY_DETAILS = "ProposalDocument -  after Document Checking Failed" + "Stage Id" + nextStageId + JSON.stringify(this.data)
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
              this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");

              this.isSaveSpinning = false

            }
          });
      }
      else {
        this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
      }

    }
    else if (this.STATUS == "F") {
      nextStageId = 11

      //console.log(this.kycDocuments)
      //console.log(this.incomeDocuments)
      //console.log(this.purposeDocuments)


      if (this.AMT_INFORMATION != "" && this.AMOUNT != 0 && this.AMOUNT != undefined) {
        this.isSaveSpinning = true
        this.api.updateFillAmount(10, this.AMT_INFORMATION, this.AMOUNT, this.data.ID, this.kycDocuments, this.incomeDocuments, this.purposeDocuments, "B")
          .subscribe(successCode => {
            //console.log(successCode)
            this.isSaveSpinning = false
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('common.message.error.success'), "");
              this.drawerClose()
              this.logtext = 'Update Status - after Document Checking form - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ProposalDocument ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                    this.isSaveSpinning = false
                  }
                });

              this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
              this.userActivityLogData.ACTIVITY_DETAILS = "afterDocumentChecking -   Document Checking" + "Stage Id" + nextStageId + JSON.stringify(this.data)
              this.userActivityLogData.ACTIVITY_TIME = new Date()
              this.api.createUserActivityLog(this.userActivityLogData)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                    this.isSaveSpinning = false

                  }
                });

            }
            else {
              this.isSaveSpinning = false
              this.logtext = ' ProposalDocument - after Document Checking form - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - ProposalDocument ]";
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
              this.userActivityLogData.ACTIVITY_DETAILS = "ProposalDocument -  after Document Checking Failed" + "Stage Id" + nextStageId + JSON.stringify(this.data)
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
              this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");

              this.isSaveSpinning = false

            }
          });
      }
      else {
        this.message.error(this.api.translate.instant('common.message.error.emptyinfo'), "");
      }

    }
    else if (this.STATUS == "R") {
      if (this.REMARKS != "") {
        this.isSaveSpinning = true
        this.api.updateNextDocumentUploadStage(this.data.CURRENT_STAGE_ID, 1, this.data.ID, this.REMARKS)
          .subscribe(successCode => {
            if (successCode['code'] == 200) {
              this.message.success(this.api.translate.instant('common.message.error.success'), "");
              this.isSaveSpinning = false
              this.drawerClose()
            }

          });
      }
      else {
        this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
      }
    }




  }

  MapDocuments() {

  }
}
