import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Bank } from 'src/app/bank';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  bank=Bank.BankName;
  constructor(private router: Router,private api: ApiService,private message: NzNotificationService) { }
  username = sessionStorage.getItem('userName')
  email = this.api.emailId;

  browserLang=''
  ngOnInit() {
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


  //   this.api.addLog('L', 'Login Successfully '+this.api.dateforlog,this.api.emailId).subscribe(data => {
  //  }, err => {
  //    //console.log(err);
  //    if (err['ok'] == false)
  //    this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
  //  });
    this.router.navigateByUrl('/dashboard')
    // this.api.getPageSetttngs(0, 0, 'ID', 'asc', '').subscribe(data => {
    //   //console.log(data)
    //   this.bankName = data['data'][0]['BANK_NAME'];
    //   //console.log(this.bankName)
    // }, err => {
    //   //console.log(err);
    // });
  
  }

}
