import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/Models/Commonmodule/user';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Branchmaster } from 'src/app/Models/BasicForms/branchmaster';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { AssignBranchmaster } from 'src/app/Models/BasicForms/assignbranch';

@Component({
  selector: 'app-assignbranches',
  templateUrl: './assignbranches.component.html',
  styleUrls: ['./assignbranches.component.css']
})
export class AssignbranchesComponent implements OnInit {

  @Input() drawerClose: Function;
  @Input() data: AssignBranchmaster;
  @Input() data2:[]
  isSpinning = false
  logtext: string = "";
  branchData=[];
  users: User[];
  users1: User[];
  userData: User = new User()
  userVisible: boolean
  browserLang=''
  loanData: any = [];
  userTitle: string = ""
  userActivityLogData: Useractivitylog = new Useractivitylog();

  constructor(private api: ApiService, private message: NzNotificationService) {
  }

  ngOnInit() {
    this.loadusers();
   
    this.browserLang = localStorage.getItem('locale');
  }



  loadusers() {
    // this.isSpinning = true;
    // var filter = " AND ROLE_ID=7"
    //var filter=""
 
    this.api.getAllBranches(0, 0, 'ID', "asc", "")
    .subscribe(successCode => {
      if (successCode['code'] == "200") {
        this.branchData = successCode['data'];
      }
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

  save()
  {
    this.isSpinning = true;
   //console.log(this.roleDetailsData)
  //  this.data.BRANCH_IDS = this.data.EXTRA_TYPE.toString()
      this.api.AssignBranchDetails(this.data.ID,this.data.BRANCH_IDS)
      .subscribe(successCode => {
        //console.log(successCode)
        if(successCode['code']=="200")
        { 
            this.message.success(this.api.translate.instant('roledetails.message1'), "");
            this.drawerClose();
            this.getdata()
            this.isSpinning = false;
        }
        else
        {
          this.message.error(this.api.translate.instant('roledetails.message2'), "");
          this.isSpinning = false;
        }
      });
  }

  getdata(){
    var filter = " AND USER_ID=" + this.data.ID
    this.api.getAllAssignBranches1(0, 0, '', '',filter).subscribe(data => {
     
      this.data =data['data'];
     
     
    //  var name2 =  data['data']['NAME']
      }, err => {
      console.log(err);
    }); 
  }
  // save(addNew: boolean): void {

  //   this.isSpinning = true;

  //   if (this.data.ID) {
  //     this.api.updateAssignBranch(this.data)
  //       .subscribe(successCode => {
  //         if (successCode['code'] == "200") {
  //           this.message.success(this.api.translate.instant('branch.success1.message'), "");

  //           this.logtext = 'Update & Close - Branch form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - Branch ]";
  //           this.api.addLog('A', this.logtext, this.api.emailId)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 //console.log(successCode);
  //               }
  //               else {
  //                 //console.log(successCode);
  //               }
  //             });

  //           this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
  //           this.userActivityLogData.ACTIVITY_DETAILS = "Branches - Update & Close Successfully" + JSON.stringify(this.data)
  //           this.userActivityLogData.ACTIVITY_TIME = new Date()
  //           this.api.createUserActivityLog(this.userActivityLogData)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 //console.log(successCode);
  //               }
  //               else {
  //                 //console.log(successCode);
  //               }
  //             });
  //           if (!addNew)
  //             this.drawerClose();
  //           this.isSpinning = false;
  //         }
  //         else {

  //           this.logtext = 'Update & Close - Branch form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - Branch ]";
  //           this.api.addLog('A', this.logtext, this.api.emailId)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 //console.log(successCode);
  //               }
  //               else {
  //                 //console.log(successCode);
  //               }
  //             });

  //           this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
  //           this.userActivityLogData.ACTIVITY_DETAILS = "Branches - Update & Close Failed" + JSON.stringify(this.data)
  //           this.userActivityLogData.ACTIVITY_TIME = new Date()
  //           this.api.createUserActivityLog(this.userActivityLogData)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 //console.log(successCode);
  //               }
  //               else {
  //                 //console.log(successCode);
  //               }
  //             });

  //           this.message.error(this.api.translate.instant('branch.Error1.message'), "");
  //           this.isSpinning = false;
  //         }
  //       });
  //   }
  //   else {

  //     this.api.createAssignBranch(this.data)
  //       .subscribe(successCode => {
  //         if (successCode['code'] == "200") {
  //           this.message.success(this.api.translate.instant('branch.success2.message'), "");

  //           if (!addNew) {
  //             this.drawerClose();

  //             this.logtext = 'Save & Close - Branch form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - Branch ]";
  //             this.api.addLog('A', this.logtext, this.api.emailId)
  //               .subscribe(successCode => {
  //                 if (successCode['code'] == "200") {
  //                   //console.log(successCode);
  //                 }
  //                 else {
  //                   //console.log(successCode);
  //                 }
  //               });

  //             this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
  //             this.userActivityLogData.ACTIVITY_DETAILS = "Branches - Save & Close Successfully" + JSON.stringify(this.data)
  //             this.userActivityLogData.ACTIVITY_TIME = new Date()
  //             this.api.createUserActivityLog(this.userActivityLogData)
  //               .subscribe(successCode => {
  //                 if (successCode['code'] == "200") {
  //                   //console.log(successCode);
  //                 }
  //                 else {
  //                   //console.log(successCode);
  //                 }
  //               });
  //           }

  //           else {
  //             this.data = new AssignBranchmaster();
  //             this.logtext = 'Save & New - Branch form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - Branch ]";
  //             this.api.addLog('A', this.logtext, this.api.emailId)
  //               .subscribe(successCode => {
  //                 if (successCode['code'] == "200") {
  //                   //console.log(successCode);
  //                 }
  //                 else {
  //                   //console.log(successCode);
  //                 }
  //               });

  //             this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
  //             this.userActivityLogData.ACTIVITY_DETAILS = "Branches - Save & New Successfully" + JSON.stringify(this.data)
  //             this.userActivityLogData.ACTIVITY_TIME = new Date()
  //             this.api.createUserActivityLog(this.userActivityLogData)
  //               .subscribe(successCode => {
  //                 if (successCode['code'] == "200") {
  //                   //console.log(successCode);
  //                 }
  //                 else {
  //                   //console.log(successCode);
  //                 }
  //               });

  //           }
  //           this.isSpinning = false;
  //         }
  //         else {
  //           this.message.error(this.api.translate.instant('branch.Error2.message'), "");
  //           this.isSpinning = false;
  //           this.logtext = 'Save & Close - Branch form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - Branch ]";
  //           this.api.addLog('A', this.logtext, this.api.emailId)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 //console.log(successCode);
  //               }
  //               else {
  //                 //console.log(successCode);
  //               }
  //             });


  //           this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
  //           this.userActivityLogData.ACTIVITY_DETAILS = "Branches - Save & New Failed" + JSON.stringify(this.data)
  //           this.userActivityLogData.ACTIVITY_TIME = new Date()
  //           this.api.createUserActivityLog(this.userActivityLogData)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 //console.log(successCode);
  //               }
  //               else {
  //                 //console.log(successCode);
  //               }
  //             });


  //         }
  //       });
  //   }
  // }

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