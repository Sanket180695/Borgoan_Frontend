import { Component, OnInit, Input } from '@angular/core';
import { Documentgroup } from 'src/app/Models/BasicForms/documentgroup';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';

@Component({
  selector: 'app-documentgroup',
  templateUrl: './documentgroup.component.html',
  styleUrls: ['./documentgroup.component.css']
})
export class DocumentgroupComponent implements OnInit {

  @Input() drawerClose: Function;
  @Input() data: Documentgroup;
  isSpinning = false
  logtext: string = "";
  // userId=Number(this.cookie.get('userId'));
  isSpinningDocumentGroup = false
  userActivityLogData: Useractivitylog = new Useractivitylog();
  documentGroups: Documentgroup[]
  numberZero = 0
  browserLang =''
  constructor(private api: ApiService, private message: NzNotificationService) {

  }

  ngOnInit() {
    this.loadAllDocumentGroups()
    this.browserLang = localStorage.getItem('locale');
  }

  loadAllDocumentGroups() {
    this.isSpinningDocumentGroup = true;
    let filter = " AND IS_PARENT=1"
    this.api.getAllDocumentGroups(0, 0, '', '', filter).subscribe(localName => {
      this.documentGroups = localName['data'];
      this.isSpinningDocumentGroup = false;
    }, err => {
      //console.log(err);
      this.isSpinningDocumentGroup = false;
    });
  }

  close(): void {
    this.drawerClose();

    this.logtext = 'CLOSED - DocumentGroup form';
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
    this.userActivityLogData.ACTIVITY_DETAILS = "DocumentGroup - Close Clicked"
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

    if (this.data.ID) {



      this.api.updateDocumentGroup(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.loadAllDocumentGroups()
            this.message.success(this.api.translate.instant('documentgroup.success1.message'), "");

            this.logtext = 'Update & Close - DocumentGroup form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - DocumentGroup ]";
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
            this.userActivityLogData.ACTIVITY_DETAILS = "DocumentGroup - Update & Close Successfully" + JSON.stringify(this.data)
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

            this.logtext = 'Update & Close - DocumentGroup form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - DocumentGroup ]";
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
            this.userActivityLogData.ACTIVITY_DETAILS = "DocumentGroup - Update & Close Failed" + JSON.stringify(this.data)
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
            this.message.error(this.api.translate.instant('documentgroup.Error1.message'), "");
            this.isSpinning = false;
          }
        });
    }
    else {

      this.api.createDocumentGroup(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.loadAllDocumentGroups()
            this.message.success(this.api.translate.instant('documentgroup.success2.message'), "");

            if (!addNew) {
              this.drawerClose();

              this.logtext = 'Save & Close - DocumentGroup form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - DocumentGroup ]";
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
              this.userActivityLogData.ACTIVITY_DETAILS = "DocumentGroup - Save & Close Successfully" + JSON.stringify(this.data)
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
              this.data = new Documentgroup();
              this.logtext = 'Save & New - DocumentGroup form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - DocumentGroup ]";
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
              this.userActivityLogData.ACTIVITY_DETAILS = "DocumentGroup - Save & New Successfully" + JSON.stringify(this.data)
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
            this.message.error(this.api.translate.instant('documentgroup.Error2.message'), "");
            this.isSpinning = false;
            this.logtext = 'Save & Close - DocumentGroup form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - DocumentGroup ]";
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
            this.userActivityLogData.ACTIVITY_DETAILS = "DocumemtGroup - Save & Close Failed" + JSON.stringify(this.data)
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