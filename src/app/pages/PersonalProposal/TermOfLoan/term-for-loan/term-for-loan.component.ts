import { Component, Input, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Purposeofloan } from 'src/app/Models/PersonalProposal/purposeofloan';
import { Termforloan } from 'src/app/Models/PersonalProposal/termforloan';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-term-for-loan',
  templateUrl: './term-for-loan.component.html',
  styleUrls: ['./term-for-loan.component.css']
})
export class TermForLoanComponent implements OnInit {

 
  @Input() drawerClose: Function;
  @Input() data: Termforloan;
    isSpinning = false
  logtext:string = "";



  constructor(private api: ApiService, private message: NzNotificationService) {
  }

  ngOnInit() {
  
  }
  


  close(): void {
    this.drawerClose();

	this.logtext = 'CLOSED - Incomeyear form';
	this.api.addLog('A',this.logtext,this.api.emailId)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              // console.log(successCode);
            }
            else {
		 // console.log(successCode);
            }
          });

  }

  save(addNew: boolean): void {

    
  
    if(this.data.NAME!="")
{
  this.isSpinning = true;
  if (this.data.ID) {
   
    this.api.UpdateTermofLoan(this.data)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          this.message.success(this.api.translate.instant('incomeyear.success1.message'), "");

   this.logtext = 'Update & Close - Incomeyear form - SUCCESS '+ JSON.stringify(this.data)+" KEYWORD [U - Incomeyear ]";
    this.api.addLog('A',this.logtext,this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          // console.log(successCode);
        }
        else {
   // console.log(successCode);
        }
      });

          if (!addNew)
            this.drawerClose();
          this.isSpinning = false;
        }
        else {

   this.logtext = 'Update & Close - Incomeyear form - ERROR - '+ JSON.stringify(this.data)+" KEYWORD [U - Incomeyear ]";
   this.api.addLog('A',this.logtext,this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          // console.log(successCode);
        }
        else {
   // console.log(successCode);
         }
      });

          this.message.error(this.api.translate.instant('incomeyear.Error1.message'), "");
          this.isSpinning = false;
        }
      });
  }
   else {

    this.api.createTermofLoan(this.data)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          this.message.success(this.api.translate.instant('incomeyear.success2.message'), "");

          if (!addNew)
 {
            this.drawerClose();

   this.logtext = 'Save & Close - Incomeyear form - SUCCESS - '+ JSON.stringify(this.data)+" KEYWORD [C - Incomeyear ]";
   this.api.addLog('A',this.logtext,this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          // console.log(successCode);
        }
        else {
 // console.log(successCode);
        }
      });
}

          else {
            this.data = new Termforloan();
this.logtext = 'Save & New - Incomeyear form - SUCCESS - '+ JSON.stringify(this.data)+" KEYWORD [C - Incomeyear ]";
this.api.addLog('A',this.logtext,this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          // console.log(successCode);
        }
        else {
 // console.log(successCode);
        }
      });

          }
          this.isSpinning = false;
        }
        else {
          this.message.error(this.api.translate.instant('incomeyear.Error2.message'), "");
this.isSpinning = false;
this.logtext = 'Save & Close - Incomeyear form - ERROR - '+ JSON.stringify(this.data)+" KEYWORD [C - Incomeyear ]";
this.api.addLog('A',this.logtext,this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          // console.log(successCode);
        }
        else {
 // console.log(successCode);
        }
      });
          
        }
      });
  }
}
else
{
  this.message.error(this.api.translate.instant('incomeyear.Error3.message'), "");
}
     
  }
}
