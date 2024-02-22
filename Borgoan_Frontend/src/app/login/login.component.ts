import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../Service/api.service';
import { Useractivitylog } from '../Models/Applicant/useractivitylog';
import { TranslateService } from '@ngx-translate/core';
import { Bank } from 'src/app/bank';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  title = ''
  EMAIL_ID = "";
  PASSWORD = "";
  supportKey = "";
  isLogedIn = false;

  bank= Bank.BankName;

  passwordVisible = false;
  isloginSpinning = false
  userId = sessionStorage.getItem('userId')

  userName = sessionStorage.getItem('userName')
  roleId = sessionStorage.getItem('roleId')
  browserLang = 'kn';
  emailId = ""
  userActivityLogData: Useractivitylog = new Useractivitylog();
  name = this.api.loginName
  constructor(private router: Router, public api: ApiService, private message: NzNotificationService, private cookie: CookieService) { }

  ngOnInit(): void {
    this.browserLang = localStorage.getItem('locale');
    if(this.browserLang == 'kn'){
      this.bank = Bank.BankName_Kn; 
    }
    if(this.browserLang == 'en'){
      this.bank = Bank.BankName; 
    }
    if(this.browserLang == 'mr'){
      this.bank = Bank.BankName_Mr; 
    }
    if (this.cookie.get('token') === '' || this.cookie.get('token') === null) {
      this.isLogedIn = false;
      //this.api.logoutForSessionValues()
      this.router.navigate(['/login'])
    }
    else {
      if (this.userId == null || this.userName == null || this.roleId == null)
        this.api.logoutForSessionValues()
      else {
        this.isLogedIn = true;
        this.router.navigate(['/dashboard'])
      }
    }
    //const userId = '1';
    //this.api.requestPermission(this.userId) 


  }

  login(): void {
    //console.log(this.EMAIL_ID)
    if (this.EMAIL_ID == "" && this.PASSWORD == "") {
      this.message.error(this.api.translate.instant('login.EMAIL_ID.PASSWORD.message'), "");

    }
    else {
      this.isloginSpinning = true
      this.api.login(this.EMAIL_ID, this.PASSWORD).subscribe(data => {
        //console.log(data)
        if (data['code'] == 200) {
          this.cookie.set('token', data["data"][0]["token"], 365, "", "", false, "Strict");
          sessionStorage.setItem("userId", data["data"][0]['UserData'][0]['USER_ID'])
          sessionStorage.setItem("userName", data["data"][0]['UserData'][0]['NAME'])
          sessionStorage.setItem("emailId", data["data"][0]['UserData'][0]['EMAIL_ID'])
          sessionStorage.setItem("roleId", data["data"][0]['UserData'][0]['ROLE_ID'])

          if (sessionStorage.getItem('roleId') == "5") {
            var filter = " AND ASSISTANT_ID=" + sessionStorage.getItem('userId')
            this.api.getAllBranches(0, 0, '', '', filter).subscribe(data => {
              // if (data['count'] > 1) {
                // console.log(data['data'])
              //   sessionStorage.setItem("branchIdCount", data["count"])
              //   sessionStorage.setItem("branchId", "0")
              // }
              // else {
              //   sessionStorage.setItem("branchIdCount", data["count"])
              //   sessionStorage.setItem("branchId", data["data"][0]['ID'])
              //   console.log(data['data'])
              // }
              if (data['count'] > 1) {
                sessionStorage.setItem("branchIdCount", data["count"])
                sessionStorage.setItem("branchId", data["data"][0]['ID'])
                console.log(sessionStorage.setItem("branchId", data["data"][0]['ID']))
              }
             
              else if (data['count'] == 1) {
                sessionStorage.setItem("branchIdCount", data["count"])
                sessionStorage.setItem("branchId", data["data"][0]['ID'])
              } 
              else {
                sessionStorage.setItem("branchId", "0")
                sessionStorage.setItem("branchIdCount", "0")
              }
            }, err => {
              //console.log(err);
              if (err['ok'] == false)
                this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
            });
          } else if (sessionStorage.getItem('roleId') == "4") {
            var filter = " AND MANAGER_ID=" + sessionStorage.getItem('userId')
            this.api.getAllBranches(0, 0, '', '', filter).subscribe(data => {
              // if (data['count'] > 1) {
              //   sessionStorage.setItem("branchIdCount", data["count"])
              //   sessionStorage.setItem("branchId", "0")
              // }
              // else {
              //   sessionStorage.setItem("branchIdCount", data["count"])
              //   sessionStorage.setItem("branchId", data["data"][0]['ID'])
              // }
              if (data['count'] > 1) {
                sessionStorage.setItem("branchIdCount", data["count"])
                sessionStorage.setItem("branchId", data["data"][0]['ID'])
                console.log(sessionStorage.setItem("branchId", data["data"][0]['ID']))
              }
             
              else if (data['count'] == 1) {
                sessionStorage.setItem("branchIdCount", data["count"])
                sessionStorage.setItem("branchId", data["data"][0]['ID'])
              } 
              else {
                sessionStorage.setItem("branchId", "0")
                sessionStorage.setItem("branchIdCount", "0")
              }
            }, err => {
              //console.log(err);
              if (err['ok'] == false)
                this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
            });
          }
          else {
            sessionStorage.setItem("branchId", "0")
            sessionStorage.setItem("branchIdCount", "0")
          }


          this.message.info(this.api.translate.instant('loginnew.message1'), "")
          this.isloginSpinning = false

          this.emailId = sessionStorage.getItem("emailId")
          this.api.addLog('L', "Login Successfully ", this.emailId).subscribe(data => {

            this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
            this.userActivityLogData.ACTIVITY_DETAILS = "Login Successfully"
            this.userActivityLogData.ACTIVITY_TIME = new Date()
            //console.log(this.userActivityLogData)
            this.api.createUserActivityLog(this.userActivityLogData)
              .subscribe(successCode => {
                //console.log(successCode)
                if (successCode['code'] == "200") {
                  window.location.reload();
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });


          }, err => {
            //console.log(err);
            if (err['ok'] == false)
              this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
          });
        }
        else if (data['code'] == 404) {
          this.message.error(this.api.translate.instant('loginnew.message2'), "")
          this.isloginSpinning = false
          this.api.addLog('A', data['message'] + " " + "Login Failed with EmailId= " + this.EMAIL_ID + " and Password=" + this.PASSWORD, "0").subscribe(data => {
            //console.log(data)
          }, err => {
            //console.log(err);
            if (err['ok'] == false)
              this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
            this.isloginSpinning = false
          });
        }

      }, err => {
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
        this.isloginSpinning = false
      });
    }
  }


  changeLang(language: string): void {
    this.browserLang = language
    localStorage.setItem('locale', language);
    this.api.translate.setDefaultLang(language);
    this.api.translate.use(language).toPromise();
    window.location.reload();

  }

}
