import { Component, Input, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Bankloanscheme } from 'src/app/Models/PersonalProposal/bankloanscheme';

import { Purposeofloan } from 'src/app/Models/PersonalProposal/purposeofloan';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-purpose-of-loan',
  templateUrl: './purpose-of-loan.component.html',
  styleUrls: ['./purpose-of-loan.component.css']
})
export class PurposeOfLoanComponent implements OnInit {

  @Input() drawerClose: Function;
  @Input() data: Purposeofloan;
    isSpinning = false
  logtext:string = "";
  documentGroups: Bankloanscheme[]


  constructor(private api: ApiService, private message: NzNotificationService) {
  }

  ngOnInit() {
  this.loadAllDocumentGroups();
  }
  loadAllDocumentGroups() {
    // this.isSpinningDocumentGroup = true;
    // let filter = " AND IS_PARENT=1"
    this.api.getAllLoanScheme(0, 0, '', '', '').subscribe(localName => {
      this.documentGroups = localName['data'];
      console.log('data')
      // this.isSpinningDocumentGroup = false;
    }, err => {
      //console.log(err);
      // this.isSpinningDocumentGroup = false;
    });
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
   
    this.api.UpdatePurposeofloan(this.data)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          this.message.success(this.api.translate.instant('incomeyear.success1.message'), "");

          localStorage.setItem('loantypeid',this.data.LOAN_TYPE_ID)
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

    this.api.createPurposeofloan(this.data)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          this.message.success(this.api.translate.instant('incomeyear.success2.message'), "");
          localStorage.setItem('loantypeid',this.data.LOAN_TYPE_ID)
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
  }
}
else
{
  this.message.error(this.api.translate.instant('incomeyear.Error3.message'), "");
}
     
  }
}
