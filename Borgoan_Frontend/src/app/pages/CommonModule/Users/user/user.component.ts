import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/Models/Commonmodule/user';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Role } from 'src/app/Models/Commonmodule/role';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  browserLang=''
  @Input() drawerClose: Function;
  @Input() data: User;
  @Input() value1
  passwordVisible = false;
  password: string;
  isSpinning = false
  dataList: User;
  roleLoading = false
  roles: Role[];
  ROLE_IDS: number[]
  loadingroles=false
  branchData=[];
  roleId = sessionStorage.getItem("roleId")
 key="7061737323313233"
  constructor(private api: ApiService, private message: NzNotificationService) {
  }

  ngOnInit() {
    this.loadRoles()
    this.browserLang = localStorage.getItem('locale');
  }

  loadRoles() {
    var Filter = ""
    this.roleLoading = true;
    this.api.getAllRoles(0, 0, '', '', " AND ID > 1").subscribe(roles => {
      this.roles = roles['data'];
      this.roleLoading = false;
    }, err => {
      //console.log(err);
      this.roleLoading = false;
    });
    this.api.getAllBranches(0, 0, 'ID', "asc", "")
    .subscribe(successCode => {
      if (successCode['code'] == "200") {
        this.branchData = successCode['data'];
      }
    });
  }

 

  close(): void {
    this.drawerClose();
  }



  save(addNew: boolean): void {
    // const md5 = new Md5();
    // //console.log(md5.appendStr('hello').end());
  //  var encryptedPassword=this.api.encryptData(this.data.PASSWORD1,this.key)
    
  //   //console.log(encryptedPassword)

  //   this.data.PASSWORD=encryptedPassword


    //console.log(this.data)
    this.isSpinning = true;
    if (this.data.ID) {
      this.api.updateUser(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('user.message1'), "");
            if (!addNew)
              this.drawerClose();
            this.isSpinning = false;
          }
          else {
            this.message.error(this.api.translate.instant('user.message2'), "");
            this.isSpinning = false;
          }
        });
    }
    else {
      this.api.createUser(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('user.message3'), "");
            
            if (!addNew)
              this.drawerClose();
            else {
              this.data = new User();
            }
            this.isSpinning = false;
          }
          else {
            this.message.error(this.api.translate.instant('user.message4'), "");
            this.isSpinning = false;
          }
        });
    }
  }

  searchEmail(emailId): void {
    var likeQuery = "EMAIL_ID=" + emailId + "";
    this.api.getAllUsers(0, 0, "", "", likeQuery).subscribe(data => {
      //console.log(data)
      this.dataList = data['data'];
    }, err => {
      //console.log(err);
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });
  }
}
