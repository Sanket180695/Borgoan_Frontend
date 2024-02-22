import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { User } from 'src/app/Models/Commonmodule/user';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {
  formTitle = "Change Password";
  isSpinning=false;
  data: User = new User();
  OLD_PASSWORD=''
  NEW_PASSWORD=''
  CONFIRM_PASSWORD=''
  passwordVisible = false;
  passwordVisible2 = false;
  passwordVisible3 = false;
  userId = sessionStorage.getItem('userId')
  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {
    this.isSpinning = true;
    this.api.getAllUsers(0, 0, 'id', 'asc', ' AND ID = '+this.userId).subscribe(data => {
      this.data = data['data'][0];
      this.isSpinning = false;
    }, err => {
      //console.log(err);
     
    });
  }
  save() {
    if(this.OLD_PASSWORD != undefined && this.OLD_PASSWORD.trim() != '') {
      if(this.NEW_PASSWORD != undefined && this.NEW_PASSWORD.trim() != '') {
        if(this.CONFIRM_PASSWORD != undefined && this.CONFIRM_PASSWORD.trim() != '') {
          if(this.CONFIRM_PASSWORD == this.NEW_PASSWORD) {
            this.data.ID = Number(this.userId);
            this.data.PASSWORD = this.NEW_PASSWORD;
            this.data['OPASSWORD'] = this.OLD_PASSWORD;
            this.isSpinning = true;
            this.api.changePassword(this.data)
            .subscribe(successCode => {
              this.isSpinning = false;
              if (successCode['code'] == "200") {
                this.message.success(this.api.translate.instant('basicinfo.errorm2'), "");
                
                this.isSpinning = false;
                window.location.reload();
              }
              else {
                this.message.error(this.api.translate.instant('basicinfo.errorm3'), "");
                this.isSpinning = false;
              }
            });
          } else {
            this.message.error(this.api.translate.instant('basicinfo.errorm4'), "");
          }
        } else {
          this.message.error(this.api.translate.instant('basicinfo.errorm5'), "");
        }
      } else {
        this.message.error(this.api.translate.instant('basicinfo.errorm6'), "");
      }
    } else {
      this.message.error(this.api.translate.instant('basicinfo.errorm7'), "");
    }
  }

 
}

