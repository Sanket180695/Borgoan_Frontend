import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Branchmaster } from 'src/app/Models/BasicForms/branchmaster';
import { Router } from '@angular/router';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';

@Component({
  selector: 'app-selectbranch',
  templateUrl: './selectbranch.component.html',
  styleUrls: ['./selectbranch.component.css']
})
export class SelectbranchComponent implements OnInit {

 userId = sessionStorage.getItem('userId')
 branchId = Number(sessionStorage.getItem('branchId'))

 branches:Branchmaster[]
 isSpinning=false
 userActivityLogData: Useractivitylog = new Useractivitylog();

  constructor(private api: ApiService,private router: Router) { }

  ngOnInit() {
    this.router.navigateByUrl('/selectbranch')

    this.loadAllBranches()
  }

  loadAllBranches()
  {
    this.isSpinning=true
    var filter=" AND MANAGER_ID="+this.userId
    this.api.getAllBranches(0, 0, '', '', filter).subscribe(data => {
      this.branches = data['data'];
    this.isSpinning=false

    }, err => {
      //console.log(err);
    });
  }

  chooseRole(branchid)
  {
    sessionStorage.setItem('branchId',branchid)
    this.router.navigateByUrl('/dashboard')
    
    this.api.addLog('A', 'Select Role of '+sessionStorage.getItem("roleId"),this.api.emailId).subscribe(data => {

      this.userActivityLogData.USER_ID=Number(sessionStorage.getItem('userId'))
      this.userActivityLogData.ACTIVITY_DETAILS="ProposalStage - Opened"
      this.userActivityLogData.ACTIVITY_TIME=new Date()
      this.api.createUserActivityLog(this.userActivityLogData)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          window.location.reload();

        }
        else {
          //console.log(successCode);
        }
      });

    }, err => {
      //console.log(err);
     
    });
   
  

   
  }

  logout()
  {
    this.api.logoutForSessionValues()
  }
}
