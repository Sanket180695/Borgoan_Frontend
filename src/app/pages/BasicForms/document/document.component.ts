import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Documentgroup } from 'src/app/Models/BasicForms/documentgroup';
import { Document } from 'src/app/Models/BasicForms/document';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  @Input() drawerClose: Function;
  @Input() data: Document;
  isSpinning = false
  logtext: string = "";

  userActivityLogData: Useractivitylog = new Useractivitylog();

  documentGroupsNodes1 = [
    {
      title: this.api.translate.instant('common.text2'),
      key: 1,
      disabled: false,
      checked: false,
      expanded: true,
    },
    {
      title: this.api.translate.instant('common.text3'),
      key: 2,
      disabled: true,
      checked: false,
      expanded: true,
      children: [
        {
          title: this.api.translate.instant('common.text4'), key: 3, disabled: true, expanded: false,
          children: [
            {
              title: this.api.translate.instant('common.text5'), key: 4, disabled: false, expanded: false, isLeaf: true
            },
            {
              title: this.api.translate.instant('common.text6'), key: 5, disabled: false, expanded: false,

            },
            {
              title: this.api.translate.instant('common.text7'), key: 6, disabled: false, expanded: false,

            },
            {
              title: this.api.translate.instant('common.text8'), key: 7, disabled: false, expanded: false,

            }
          ]
        },
        {
          title: this.api.translate.instant('common.text9'), key: 8, disabled: true, expanded: false,
          children: [
            {
              title: this.api.translate.instant('common.text10'), key: 9, disabled: false, expanded: false,
            },
            {
              title: this.api.translate.instant('common.text11'), key: 10, disabled: false, expanded: false,

            },
            {
              title: this.api.translate.instant('common.text12'), key: 11, disabled: false, expanded: false,

            },
            {
              title: this.api.translate.instant('common.text13'), key: 12, disabled: false, expanded: false,

            }
          ]
        }
      ]
    },
    {
      title: this.api.translate.instant('common.text14'),
      key: 1,
      disabled: true,
      expanded: false,
      children: [
        {
          title: this.api.translate.instant('common.text15'), key: 13, disabled: true, expanded: false,
          children: [
            {
              title: this.api.translate.instant('common.text16'), key: 14, disabled: false, expanded: false,
            },
            {
              title: this.api.translate.instant('common.text17'), key: 15, disabled: false, expanded: false,
            }
          ]
        },
        {
          title: this.api.translate.instant('common.text18'), key: 16, disabled: true, expanded: true,
          children: [
            {
              title: this.api.translate.instant('common.text19'), key: 17, disabled: false, expanded: true,
            },
            {
              title: this.api.translate.instant('common.text20'), key: 18, disabled: false, expanded: false,
            }
          ]
        },
        {
          title: this.api.translate.instant('common.text21'), key: 19, disabled: false, expanded: false,
        }
      ]
    }
  ]
  documentGroupsNodes = []

  constructor(private api: ApiService, private message: NzNotificationService) {
  }

  ngOnInit() {
    this.loaddocumentGroups();

  }
  loaddocumentGroups() {
    this.isSpinning = true;
    let filter = ""
    this.api.getCombinedDocumentGroup(filter).subscribe(localName => {
      //console.log(localName)
      this.documentGroupsNodes = localName['data'];
      this.isSpinning = false;
    }, err => {
      //console.log(err);
    });
    // this.api.getAllDocumentGroups(0, 0, '', '', '').subscribe(localName => {
    //   this.documentGroups = localName['data']; 
    //   this.isSpinning = false;
    // }, err => {
    //   //console.log(err);
    //   this.isSpinning = false;
    // });
  }


  close(): void {
    this.drawerClose();

    this.logtext = 'CLOSED - Document form';
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
    this.userActivityLogData.ACTIVITY_DETAILS = "Documents - Close Clicked"
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

  save(addNew: boolean): void {

    this.isSpinning = true;

    this.data.ALLOWED_TYPES = this.data.allowedTypes.toString()
    //console.log(this.data)
    if (this.data.ID) {
      this.api.updateDocument(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('document.success1.message'), "");

            this.logtext = 'Update & Close - Document form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - Document ]";
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
            this.userActivityLogData.ACTIVITY_DETAILS = "Documents - Update & Close Successfully" + JSON.stringify(this.data)
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


            if (!addNew)
              this.drawerClose();
            this.isSpinning = false;
          }
          else {

            this.logtext = 'Update & Close - Document form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - Document ]";
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
            this.userActivityLogData.ACTIVITY_DETAILS = "Documents - Update & Close Failed" + JSON.stringify(this.data)
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

            this.message.error(this.api.translate.instant('document.Error1.message'), "");
            this.isSpinning = false;
          }
        });
    }
    else {

      this.api.createDocument(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('document.success2.message'), "");

            if (!addNew) {
              this.drawerClose();

              this.logtext = 'Save & Close - Document form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - Document ]";
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
              this.userActivityLogData.ACTIVITY_DETAILS = "Documents - Save & Close Successfully" + JSON.stringify(this.data)
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
              this.data = new Document();
              this.logtext = 'Save & New - Document form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - Document ]";
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
              this.userActivityLogData.ACTIVITY_DETAILS = "Documents - Save & New Successfully" + JSON.stringify(this.data)
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
            this.isSpinning = false;
          }
          else {
            this.message.error(this.api.translate.instant('document.Error2.message'), "");
            this.isSpinning = false;
            this.logtext = 'Save & Close - Document form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - Document ]";
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
            this.userActivityLogData.ACTIVITY_DETAILS = "Documents - Save & Close Failed" + JSON.stringify(this.data)
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
        });
    }
  }


}