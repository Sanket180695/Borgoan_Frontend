import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './Service/api.service';
import { CookieService } from 'ngx-cookie-service';
import { Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { User } from './Models/Commonmodule/user';
import { Useractivitylog } from './Models/Applicant/useractivitylog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //layout variable
  isCollapsed = false;
  isLogedIn = false;
  message1;

  //menu variable
  menus = []
  resetVisible: boolean = false

  //session getting value
  userId = sessionStorage.getItem('userId')
  roleId = Number(sessionStorage.getItem('roleId'))
  // roleId=0
  USERNAME = sessionStorage.getItem('userName')

  collegeId = Number(sessionStorage.getItem('collegeId'))

  branchIdCount = Number(sessionStorage.getItem('branchIdCount'))
  branchId = Number(sessionStorage.getItem('branchId'))
  //idle state variable
  timedOut = false
  count: number = 0
  startPage: string = ""
  visibleDashboard = false
  selectPage = ""
  password: string
  confirmPassword: string
  passwordVerify: string
  Verified: boolean = false
  verifyLoading: boolean = false
  okdisabled = true
  userData: User = new User()
  okLoading = false
  parentId: number
  redirectPage = ""
  validPages = ""
  userActivityLogData: Useractivitylog = new Useractivitylog();

  constructor(private idle: Idle, private keeplive: Keepalive, private message: NzNotificationService, private router: Router, public api: ApiService, private cookie: CookieService) {
    idle.setIdle(7200);
    idle.setTimeout(30);

    idle.onIdleStart.subscribe(() => {

      this.timedOut = true;
    });

    idle.onTimeout.subscribe(() => {
      this.timedOut = false;
      //remove session and all cookie varibles 
      this.logout()
    });


    idle.onTimeoutWarning.subscribe((countdown: any) => {

      this.count = countdown
    });

    this.reset();
    this.loggerInit();
    this.api.translate.addLangs(['mr', 'kn', 'en']);
    // this.api.translate.setDefaultLang('mr');
  }

  reset() {
    this.idle.watch();
    this.timedOut = false;
  }

  continue() {
    this.reset()
  }
  // onRightClick(event) {
  //   event.preventDefault() 
  //  }

  resetTimeOut() {
    this.cookie.delete('token')
    this.cookie.delete('supportKey')
    this.idle.stop();
    this.idle.onIdleStart.unsubscribe();
    this.idle.onTimeoutWarning.unsubscribe();
    sessionStorage.clear()
    window.location.reload();
  }

  changeLang(language: string): void {
    localStorage.setItem('locale', language);
    this.api.translate.setDefaultLang(language);
    this.api.translate.use(language).toPromise();
    window.location.reload();

  }

  loggerInit() {
    if (this.cookie.get('supportKey') === '' || this.cookie.get('supportKey') === null) {

      this.api.loggerInit().subscribe(data => {
        if (data['code'] == 200) {
          this.cookie.set('supportKey', data["data"][0]["supportkey"], 365, "", "", false, "Strict");
        }
      }, err => {
        //console.log(err);
      });
    }
    else {
    }
  }

  changepass() {
    this.router.navigateByUrl('/changepassword')
  }
  ngOnInit() {
    let url = window.location.href
    var arr = url.split("/")
    this.validPages =  arr[3]

    // this.api.translate.addLangs(['mr', 'kn']);
    // this.api.translate.setDefaultLang('mr');
    if (this.cookie.get('token') === '' || this.cookie.get('token') === null) {
      this.isLogedIn = false;
      // this.isLogedIn=true;
    }
    else {
      if (this.userId || this.roleId != 0) {
        this.isLogedIn = true;
        //this.accessPageForRedirect()

        this.loadForms()
      }
      else {
        this.api.logoutForSessionValues()
      }
    }
    this.api.receiveMessage()
    this.message1 = this.api.currentMessage
  }

  accessPageForRedirect() {
    let url = window.location.href
    var arr = url.split("/")
    let validPage = "/" + arr[3]
    //console.log(validPage);
    if (this.roleId != 0) {
      

      this.api.getCheckAccessOfForm(this.roleId, validPage).subscribe(data => {
        if (data['data'] == true) {
          if (validPage == "/selectpage")
            this.router.navigateByUrl('/dashboard')
          else
            this.router.navigateByUrl(validPage)
        }
        else {
          if (validPage != "/login") {
            this.api.logoutForSessionValues()
          }
        }
      });
    }
  }



  loadForms() {
    this.api.getForms(this.roleId).subscribe(data => {
      if (data['code'] == 200 && data['data'] != null) {
        data['data'].forEach(element => {
          element['children'].sort(this.sortFunction)

          if (element['children'].length == 0)
            delete element['children']
        });
        this.menus = data['data'].sort(this.sortFunction)
      }
    });
  }

  sortFunction(a, b) {
    var dateA = a.SEQ_NO
    var dateB = b.SEQ_NO
    return dateA > dateB ? 1 : -1;
  };

  logout() {
    this.api.addLog('A', this.api.dateforlog + "" + 'Logout Successfully ', this.api.emailId).subscribe(data => {
      this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
      this.userActivityLogData.ACTIVITY_DETAILS = "Logout Successfully"
      this.userActivityLogData.ACTIVITY_TIME = new Date()
      // //console.log(this.userActivityLogData)
      this.api.createUserActivityLog(this.userActivityLogData)
        .subscribe(successCode => {
          //console.log(successCode)
          if (successCode['code'] == "200") {
            // //console.log(successCode);
            this.resetTimeOut()
          }
          else {
            // //console.log(successCode);
          }
        });
    }, err => {
      //console.log(err);
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });

    var LOG_ACTION = 'logged out from the system'
    var DESCRIPTION = sessionStorage.getItem('userName') + ' logged out from system.'
    var LOG_TYPE = 'I'
    this.api.proposalLogInformation(0, 0, 0, LOG_ACTION, Number(this.userId), DESCRIPTION, LOG_TYPE)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
        }
      });

  }

  resetModel() {
    this.resetVisible = true
    this.passwordVerify = ""
    this.password = ""
    this.confirmPassword = ""
    this.Verified = false
  }

  UpdateCancel() {
    this.resetVisible = false
  }

  updateConfirmValidator(conformpass) {
    if (this.password == conformpass)
      this.okdisabled = false
    else
      this.okdisabled = true
  }


  verify() {
    this.verifyLoading = true
    var filter = " AND ID=" + this.userId + " AND PASSWORD=" + this.passwordVerify
    this.api.getAllUsers(0, 0, "ID", "desc", filter).subscribe(data => {
      this.verifyLoading = false
      if (data['count'] > 0) {
        this.Verified = true
        this.userData = Object.assign({}, data['data'][0])
        // this.getRoleData()
      }
      else
        this.message.error(this.api.translate.instant('app.message.error1'), "");
    }, err => {
      //console.log(err);
      if (err['ok'] == false)
        this.verifyLoading = false
      this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });
  }

  // getRoleData() {
  //   let roleIds = ""
  //   let filter = " AND USER_ID=" + this.userId
  //   this.api.getAllUserMappingData(0, 0, '', '', filter).subscribe(data1 => {
  //     data1['data'].forEach(element => {
  //       roleIds = roleIds + element['ROLE_ID'] + ","
  //     });
  //     let userId1 = roleIds.substring(0, roleIds.length - 1)
  //     var arrOfRoleId = userId1.split(',').map(function (item) {
  //       return parseInt(item, 10);
  //     });
  //     if (userId1 == "") {
  //       this.userData.ROLE_DATA = []
  //     }
  //     else {
  //       this.userData.ROLE_DATA = arrOfRoleId
  //     }
  //   }, err => {
  //     //console.log(err);
  //   });
  // }


  UpdateOk() {
    this.okLoading = true
    let roleIds = ""
    if (this.password == "" && this.confirmPassword == "")
      this.message.error(this.api.translate.instant('app.message.error2'), "");
    else {

      this.userData.PASSWORD = this.confirmPassword
      //console.log(this.userData.ROLE_DATA)
      //console.log(this.userData)

      this.api.updateUser(this.userData)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.resetVisible = false;
            this.okLoading = false;
          }
          else {
            this.message.error(this.api.translate.instant('app.message.error3'), "");
            this.okLoading = false;
          }
        }, err => {
          //console.log(err);
          if (err['ok'] == false)
            this.okLoading = false;
          this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
        });
    }
  }


}
