import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/Models/Commonmodule/role';
import { ApiService } from 'src/app/Service/api.service';
import { CookieService } from 'ngx-cookie-service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';

@Component({
  selector: 'app-selectrolepage',
  templateUrl: './selectrolepage.component.html',
  styleUrls: ['./selectrolepage.component.css']
})
export class SelectrolepageComponent implements OnInit {

  Title="Select Role"
  roles:Role[]
  loadingRoles=false
  userId= Number(sessionStorage.getItem('userId'))
 // roleId=1
  roleIds=Number(sessionStorage.getItem("roleIdsLength"))
  roleId=Number(sessionStorage.getItem("roleId"))
  userName = sessionStorage.getItem("userName")
  userActivityLogData: Useractivitylog = new Useractivitylog();

  
  constructor(private router: Router,private api: ApiService,private message: NzNotificationService) { }

  ngOnInit() {
    // this.api.addLog('L', this.api.dateforlog +""+ "OPENED Select Role Page'+this.api.dateforlog,this.api.emailId).subscribe(data => {
    // }, err => {
    //   //console.log(err);
    //   if (err['ok'] == false)
    //   this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    // });
    this.router.navigate(['/selectrole'])

    this.loadRoles()

  }

  loadRoles()
  {
//     this.loadingRoles = true
  
//     let filter = " AND USER_ID=" +this.userId
//  this.api.getAllUserMappingData(0, 0, "", "",filter).subscribe(data => {
//       this.roles = data['data'];
//       this.loadingRoles = false
//     }, err => {
//       //console.log(err);
//     });
  }

  chooseRole(id)
  { 
    //gerRecord for this role id and pass to that routing
 sessionStorage.setItem("roleId",id)
 let filter=" AND ID="+this.roleId
 this.api.getAllRoles(0,0,'','',filter).subscribe(data => {
   //console.log(data['data'][0]['START_PAGE'])
    this.router.navigateByUrl(data['data'][0]['START_PAGE'])
 });
 this.api.addLog('A', 'Select Role of '+sessionStorage.getItem("roleId"),this.api.emailId).subscribe(data => {

 

}, err => {
  //console.log(err);
  if (err['ok'] == false)
  this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
});



window.location.reload()
  }

  logout()
  {
    this.api.addLog('A', 'Logout Successfully From Select Role Page',this.api.emailId).subscribe(data => {
    }, err => {
      //console.log(err);
      if (err['ok'] == false)
      this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });
    this.api.logoutForSessionValues()
  }


}
