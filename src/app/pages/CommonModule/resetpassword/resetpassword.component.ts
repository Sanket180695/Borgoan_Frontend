import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { User } from 'src/app/Models/Commonmodule/user';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  formTitle = "Reset Password";
  isloginSpinning = false;
  MOBILE = ''
  OTP = '';
  USER_ID = 0;
  ENTER_OTP = '';
  data: User = new User();
  NEW_PASSWORD = ''
  CONFIRM_PASSWORD = ''
  passwordVisible = false;
  passwordVisible2 = false;
  passwordVisible3 = false;
  sendOtp = false;
  newpass = false;
  config = {
    allowNumbersOnly: false,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '30px',
      'height': '30px',
      'font-size': '16px'
    }
  };
  userActivityLogData: Useractivitylog = new Useractivitylog();
  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {

  }
  onOtpChange(event) {
    this.ENTER_OTP = event;
  }

  resendOTP() {
    this.newpass = false;
    this.isloginSpinning = true;
    // this.api.resetpassword({ 'MOBILE_NUMBER': this.MOBILE })
    //   .subscribe(successCode => {
    //     this.isloginSpinning = false;

    //     if (successCode['code'] == "200") {
    //       this.message.success("OTP sent on " + this.MOBILE, "");
    //       this.OTP = successCode['data']['OTP']
    //       this.USER_ID = successCode['data']['ID']
    //       this.sendOtp = true;
    //     }
    //     else {
    //       this.message.error("Something went wrong please try later...", "")
    //     }
    //   });
  }

  save() {
    this.newpass = false;
    if (this.MOBILE != undefined && this.MOBILE.trim() != '') {
      this.isloginSpinning = true;
      // this.api.resetpassword({ 'MOBILE_NUMBER': this.MOBILE })
      //   .subscribe(successCode => {
      //     this.isloginSpinning = false;

      //     if (successCode['code'] == "200") {
      //       this.message.success("OTP sent on " + this.MOBILE, "");
      //       this.OTP = successCode['data']['OTP']
      //       this.USER_ID = successCode['data']['ID']
      //       this.sendOtp = true;
      //     }
      //     else if(successCode['code'] == "400") {
      //       this.message.error("This mobile number is not registered.", "")
      //     }
      //     else {
      //       this.message.error("Something went wrong please try later...", "")
      //     }
      //   });
      
    } else {
      this.message.error("Mobile No. Required...", "");
    }
  }

  varify() {
    if (this.ENTER_OTP == this.OTP) {
      this.message.success("Mobile No. Verified", "");
      this.newpass = true;
      this.sendOtp = false;
    } else {
      this.message.error("Entered OTP is wrong...", "");
    }
  }
  changepass() {
    if (this.NEW_PASSWORD != undefined && this.NEW_PASSWORD.trim() != '') {
      if (this.CONFIRM_PASSWORD != undefined && this.CONFIRM_PASSWORD.trim() != '') {
        if (this.CONFIRM_PASSWORD == this.NEW_PASSWORD) {
          this.data.ID = this.USER_ID;
          this.data.PASSWORD = this.NEW_PASSWORD;
          this.isloginSpinning = true;
          if (this.USER_ID > 0) {
            this.api.updateUser(this.data)
              .subscribe(successCode => {
                this.isloginSpinning = false;
                if (successCode['code'] == "200") {
                  this.message.success("Password changed Successfully...", "");
                  window.location.reload();
                }
                else {
                  this.message.error("Failed to change Password...", "");
                }
              });
          }
        } else {
          this.message.error("Confirm Password and New Password must match....", "");
        }
      } else {
        this.message.error("Confirm Password Required...", "");
      }
    } else {
      this.message.error("New Password Required...", "");
    }
  }

}
