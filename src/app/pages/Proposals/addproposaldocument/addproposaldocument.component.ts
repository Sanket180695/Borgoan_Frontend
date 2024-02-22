import { Component, OnInit, Input } from '@angular/core';
import { Document } from 'src/app/Models/BasicForms/document';
import { Applicantdocument } from 'src/app/Models/Applicant/applicantdocument';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ApiService } from 'src/app/Service/api.service';
import { Documentgroup } from 'src/app/Models/BasicForms/documentgroup';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';

@Component({
  selector: 'app-addproposaldocument',
  templateUrl: './addproposaldocument.component.html',
  styleUrls: ['./addproposaldocument.component.css']
})
export class AddproposaldocumentComponent implements OnInit {

  @Input() drawerClose: Function;
  @Input() PROPOSAL_ID: number
  @Input() APPLICANT_ID: number
  @Input() TYPE: string
  isSpinning = false
  documents: Document[]
  documentdata: Applicantdocument = new Applicantdocument();
  documentDetails = []
  documentGroups: Documentgroup[]
  isSpinningDocumentGroup = false
  isSpinningDocument = false
  userId = sessionStorage.getItem('userId')
  userActivityLogData: Useractivitylog = new Useractivitylog();

  i = 2
  DOCUMENT_ID: number
  documentGroupsNodes = []
  browserLang = ''
  constructor(private message: NzNotificationService, private api: ApiService) { }

  ngOnInit() {
    this.browserLang = localStorage.getItem('locale');
    this.loadAllDocumentGroups()
  }

  close() {
    this.drawerClose()
  }

  loadAllDocumentGroups() {
    this.isSpinningDocumentGroup = true;

    let filter = ""
    // if (this.TYPE == "B")
      filter = " AND ID=1"
    // else if (this.TYPE == "G")
    //   filter = " AND ID=54"
    // else if (this.TYPE == "C")
    //   filter = " AND ID=65"
    this.api.getCombinedDocumentGroup(filter).subscribe(localName => {
      ////console.log(localName)
      this.documentGroupsNodes = localName['data'];
      this.isSpinningDocumentGroup = false;
    }, err => {
      ////console.log(err);
      this.isSpinningDocumentGroup = false;
    });
  }

  getChangeDocumentGroup(documentGroupId) {
    var filter = " AND (GROUP_ID=0 OR GROUP_ID=" + documentGroupId+ " )";
    this.isSpinningDocument = true;
    this.api.getAllDocuments(0, 0, 'ID', 'desc', filter).subscribe(localName => {
      ////console.log(localName)
      this.documents = localName['data'];
      this.getChangeDocument(localName['data'][0]['ID'])
      this.isSpinningDocument = false;
    }, err => {
      ////console.log(err);
      this.isSpinningDocument = false;
    });
  }
  getChangeDocument(documentId) {
    //type filter when document add
    var filter = ""
    if (this.TYPE == "B")
      filter = " AND DOCUMENT_ID=" + documentId + " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND TYPE='B'"
    else
      filter = " AND DOCUMENT_ID=" + documentId + " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND APPLICANT_ID=" + this.APPLICANT_ID + " AND TYPE='" + this.TYPE + "'"


    this.api.getAllProposalDocuments(0, 0, '', '', filter).subscribe(localName => {

      if (localName['count'] > 0) {
        if (documentId == 20) {
          this.documentdata.DOCUMENT_TITLE = ""
          this.documentdata.DOCUMENT_DESCRIPTION = ""
          this.documentdata.IS_COMPLUSORY = 0
        }
        else
          this.documentdata = Object.assign({}, localName['data'][0]);
      }
      else {
        var filter1 = " AND ID=" + documentId
        this.api.getAllDocuments(0, 0, 'ID', 'desc', filter1).subscribe(localName => {

          if (localName['count'] > 0) {
            if (documentId != 20) {
              this.documentdata.DOCUMENT_ID = localName['data'][0]['ID']
              if (this.browserLang == 'mr') 
              this.documentdata.DOCUMENT_TITLE = localName['data'][0]['NAME']

              if (this.browserLang == 'kn') 
              this.documentdata.DOCUMENT_TITLE = localName['data'][0]['NAME_KN']

              if (this.browserLang == 'en') 
              this.documentdata.DOCUMENT_TITLE = localName['data'][0]['NAME_EN']

              this.documentdata.DOCUMENT_DESCRIPTION = ""
              this.documentdata.IS_COMPLUSORY = 0
            }
            else {
              this.documentdata.DOCUMENT_TITLE = ""
              this.documentdata.DOCUMENT_DESCRIPTION = ""
              this.documentdata.IS_COMPLUSORY = 0
            }

          }

        }, err => {
          ////console.log(err);
        });


      }

      this.isSpinningDocument = false;
    }, err => {
      ////console.log(err);
      this.isSpinningDocument = false;
    });
  }


  addDocument() {
    if (this.documentdata.DOCUMENT_TITLE && this.documentdata.DOCUMENT_ID) {
      this.addDocuments()
    }
    else {
      this.message.error(this.api.translate.instant('common.message1'), "");
    }
  }


  addDocuments() {
    if (this.documentDetails.length == 0) {
      this.documentDetails = [
        {
          ID: 1,
          CLIENT_ID: 1,
          PROPOSAL_ID: this.PROPOSAL_ID,
          IS_UPLOADED: 0,
          UPLOADED_DATETIME: '1000-01-01 00:00:00',
          DOCUMENT_KEY: "",
          IS_VERIFIED: 0,
          IS_APPROVED: 0,
          REMARK: 'New',
          USER_ID: Number(this.userId),
          DOCUMENT_ID: this.documentdata.DOCUMENT_ID,
          DOCUMENT_TITLE: this.documentdata.DOCUMENT_TITLE,
          DOCUMENT_DESCRIPTION: this.documentdata.DOCUMENT_DESCRIPTION,
          IS_COMPLUSORY: this.documentdata.IS_COMPLUSORY ? 1 : 0,
        }
      ];
    }
    else {

      let time = this.documentDetails.filter(object => {
        return object['DOCUMENT_ID'] == this.documentdata.DOCUMENT_ID && object['DOCUMENT_TITLE'] == this.documentdata.DOCUMENT_TITLE
      });
      ////console.log(time)
      if (time.length == 0) {

        this.documentDetails = [
          ...this.documentDetails,
          {
            ID: this.i,
            CLIENT_ID: 1,
            PROPOSAL_ID: this.PROPOSAL_ID,
            IS_UPLOADED: 0,
            UPLOADED_DATETIME: '1000-01-01 00:00:00',
            DOCUMENT_KEY: "",
            IS_VERIFIED: 0,
            IS_APPROVED: 0,
            REMARK: 'New',
            USER_ID: Number(this.userId),
            DOCUMENT_ID: this.documentdata.DOCUMENT_ID,
            DOCUMENT_TITLE: this.documentdata.DOCUMENT_TITLE,
            DOCUMENT_DESCRIPTION: this.documentdata.DOCUMENT_DESCRIPTION,
            IS_COMPLUSORY: this.documentdata.IS_COMPLUSORY ? 1 : 0,
          }
        ];
        this.i++;
      }
      else {
        this.message.error(this.api.translate.instant('common.message2'), "");
      }


    }

  }


  deleteRow(data) {
    const index = this.documentDetails.indexOf(data);
    this.documentDetails.splice(index, 1);
    this.documentDetails = this.documentDetails.filter(object => {
      return object['ID'] != data
    });
  }

  save() {
    ////console.log(this.documentDetails)
    this.isSpinning = true;
    ////console.log(this.TYPE, this.APPLICANT_ID)
    this.api.addApplicantDocumentMapping(this.documentDetails, this.TYPE, this.APPLICANT_ID)
      .subscribe(successCode => {
        ////console.log(successCode)
        if (successCode['code'] == "200") {
          this.message.success(this.api.translate.instant('common.message3'), "");
          this.drawerClose();
          this.isSpinning = false;

          this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
          this.userActivityLogData.ACTIVITY_DETAILS = "AddApplicantDocument - Save & Close Clicked " + JSON.stringify(this.documentDetails)
          this.userActivityLogData.ACTIVITY_TIME = new Date()
          this.api.createUserActivityLog(this.userActivityLogData)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                ////console.log(successCode);
              }
              else {
                ////console.log(successCode);
              }
            });
        }
        else {
          this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
          this.isSpinning = false;
        }
      });

  }
}
