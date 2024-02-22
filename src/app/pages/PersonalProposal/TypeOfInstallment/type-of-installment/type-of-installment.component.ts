import { Component, Input, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Typeofinstallment } from 'src/app/Models/PersonalProposal/typeofinstallment';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-type-of-installment',
  templateUrl: './type-of-installment.component.html',
  styleUrls: ['./type-of-installment.component.css']
})
export class TypeOfInstallmentComponent implements OnInit {

 
  @Input() drawerClose: Function;
  @Input() data: Typeofinstallment;
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

    
  
    if(this.data.TYPE_OF_INSTALLMENT!="")
{
  this.isSpinning = true;
  if (this.data.ID) {
   
    this.api.UpdateTypeofinstallment(this.data)
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
 /* else {

    this.api.createIncomeyear()
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
            this.data = new Purposeofloan();
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
  }*/
}
else
{
  this.message.error(this.api.translate.instant('incomeyear.Error3.message'), "");
}
     
  }
}
