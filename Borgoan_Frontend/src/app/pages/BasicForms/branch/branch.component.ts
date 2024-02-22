import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/Models/Commonmodule/user';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Branchmaster } from 'src/app/Models/BasicForms/branchmaster';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  @Input() drawerClose: Function;
  @Input() data: Branchmaster;
  isSpinning = false
  logtext: string = "";

  users: User[];
  users1: User[];
  userData: User = new User()
  userVisible: boolean
  userTitle: string = ""
  userActivityLogData: Useractivitylog = new Useractivitylog();

  constructor(private api: ApiService, private message: NzNotificationService) {
  }

  ngOnInit() {
    this.loadusers();
    this.loadusers1();

  }
  loadusers() {
    this.isSpinning = true;
    var filter = " AND ROLE_ID=4"
    //var filter=""
    this.api.getAllUsers(0, 0, '', '', filter).subscribe(localName => {
      if (localName['count'] > 0) {
        this.users = localName['data'];
        console.log(this.users)
        this.data.MANAGER_ID = localName['data'][0]['ID']
        this.data.ASSISTANT_ID = localName['data'][0]['ID']
      }
      this.isSpinning = false;
    }, err => {
      //console.log(err);
      this.isSpinning = false;
    });
  }

  loadusers1() {
    this.isSpinning = true;
    var filter = " AND ROLE_ID=5"
    //var filter=""
    this.api.getAllUsers(0, 0, '', '', filter).subscribe(localName => {
      if (localName['count'] > 0) {
        this.users1 = localName['data'];
        // console.log(this.users)
        this.data.MANAGER_ID = localName['data'][0]['ID']
        this.data.ASSISTANT_ID = localName['data'][0]['ID']
      }
      this.isSpinning = false;
    }, err => {
      //console.log(err);
      this.isSpinning = false;
    });
  }

  close(): void {
    this.drawerClose();

    this.logtext = 'CLOSED - Branch form';
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
    this.userActivityLogData.ACTIVITY_DETAILS = "Branches - Close Clicked"
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
      this.api.updateBranch(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('branch.success1.message'), "");

            this.logtext = 'Update & Close - Branch form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - Branch ]";
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
            this.userActivityLogData.ACTIVITY_DETAILS = "Branches - Update & Close Successfully" + JSON.stringify(this.data)
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

            this.logtext = 'Update & Close - Branch form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - Branch ]";
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
            this.userActivityLogData.ACTIVITY_DETAILS = "Branches - Update & Close Failed" + JSON.stringify(this.data)
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

            this.message.error(this.api.translate.instant('branch.Error1.message'), "");
            this.isSpinning = false;
          }
        });
    }
    else {

      this.api.createBranch(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('branch.success2.message'), "");

            if (!addNew) {
              this.drawerClose();

              this.logtext = 'Save & Close - Branch form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - Branch ]";
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
              this.userActivityLogData.ACTIVITY_DETAILS = "Branches - Save & Close Successfully" + JSON.stringify(this.data)
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
              this.data = new Branchmaster();
              this.logtext = 'Save & New - Branch form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - Branch ]";
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
              this.userActivityLogData.ACTIVITY_DETAILS = "Branches - Save & New Successfully" + JSON.stringify(this.data)
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
            this.message.error(this.api.translate.instant('branch.Error2.message'), "");
            this.isSpinning = false;
            this.logtext = 'Save & Close - Branch form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - Branch ]";
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
            this.userActivityLogData.ACTIVITY_DETAILS = "Branches - Save & New Failed" + JSON.stringify(this.data)
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

  addNewUser() {
    this.userVisible = true;
    this.userTitle = this.api.translate.instant('branch.drawert1')
    this.userData = new User();
    this.userData.ROLE_ID = 16

    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "User Add Clicked" + JSON.stringify(this.data)
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
  userClose(): void {
    this.loadusers()
    this.userVisible = false;
  }

  get callbackPartClose() {
    return this.userClose.bind(this);
  }


}