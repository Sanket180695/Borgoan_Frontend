import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { ApiService } from 'src/app/Service/api.service';
import { BalanceSheetInformation } from 'src/app/Models/FirmProposal/balance-sheet-information';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { ProjectionInfo } from 'src/app/Models/PersonalProposal/projection-info';
import { Profitabilitystatement } from 'src/app/Models/PersonalProposal/profitabilitystatement';
import { Repayingcapacityborrower } from 'src/app/Models/PersonalProposal/repayingcapacityborrower';
import { RepayingComponent } from 'src/app/pages/PersonalProposal/repaying/repaying.component';
@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.css']
})
export class BalanceSheetComponent implements OnInit {
  @Input() CURRENT_STAGE_ID: number;  
  @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  @Input() PROPOSAL_ID: number;
   data2: BalanceSheetInformation[];
   profitablityStatements: Profitabilitystatement[];
   repayingCapacityBorrower: Repayingcapacityborrower[];
   @Input() LOAN_KEY: Number;
  ProjectionInfo: ProjectionInfo = new ProjectionInfo();

  profitablityStatementData: Profitabilitystatement=new Profitabilitystatement();
  profitablityStatementData1: Profitabilitystatement=new Profitabilitystatement();
  profitablityStatementData2: Profitabilitystatement=new Profitabilitystatement();
  profitablityStatementData3: Profitabilitystatement=new Profitabilitystatement();
  profitablityStatementData4: Profitabilitystatement=new Profitabilitystatement();
  profitablityStatementData5: Profitabilitystatement=new Profitabilitystatement();
  profitablityStatementData6: Profitabilitystatement=new Profitabilitystatement();


  
  balanceSheetInformation : BalanceSheetInformation=new BalanceSheetInformation();
  balanceSheetInformation1 : BalanceSheetInformation=new BalanceSheetInformation();
  balanceSheetInformation2 : BalanceSheetInformation=new BalanceSheetInformation();
  balanceSheetInformation3 : BalanceSheetInformation=new BalanceSheetInformation();
  balanceSheetInformation4 : BalanceSheetInformation=new BalanceSheetInformation();
  balanceSheetInformation5 : BalanceSheetInformation=new BalanceSheetInformation();
  balanceSheetInformation6 : BalanceSheetInformation=new BalanceSheetInformation();;
  isSpinning = false
  logtext: string = "";
  extraApplicantInformation:Extraapplicantinfo = new Extraapplicantinfo()
  isButtonVerifySpinning=false
  total = [];
  total1 = [];
@ViewChild(RepayingComponent) repaying: RepayingComponent ;


  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {
  

    this.getBalanceData();
    this.getProfitablityData()
   // this.getRepayingData()
    this.loadInfo()
    this.getNote();
    this.assignData()
  
  }

  calculate(index) {
    //this.total[index] = 0;
    this.total[index] = Number(this.data2[index]['FIXED_ASSETS']) + Number(this.data2[index]['INVESTMENTS']) + Number(this.data2[index]['STOCK'] + this.data2[index]['WORK_IN_PROGRESS']) + Number(this.data2[index]['DEBTORS']) + Number(this.data2[index]['CASH_AND_BANK']) + Number(this.data2[index]['OTHER_ASSETS']);
    //console.log("index: "+ this.total[index])
    if(this.total[index] == NaN)
      this.total[index] = 0;
  }

  calculateLiability(index) {
    //this.total1[index] = 0;
    this.total1[index] = Number(this.data2[index]['CAPITAL']) + Number(this.data2[index]['RESERVES']) + Number(this.data2[index]['SUB_LOANS'] + this.data2[index]['OTHER_LOANS']) + Number(this.data2[index]['UNSECURED_LOANS']) + Number(this.data2[index]['CREDITORS']) + Number(this.data2[index]['PROVISION']) +  Number(this.data2[index]['OTHER_LIABILITIES']) ;
  }

  assignData()
  {

    this.balanceSheetInformation.YEAR  = new Date().getFullYear()   +"-"+ (new Date().getFullYear()+1).toString().substring(2) ;
    this.balanceSheetInformation1.YEAR = new Date().getFullYear()+1 +"-"+ (new Date().getFullYear()+2).toString().substring(2) ;
    this.balanceSheetInformation2.YEAR = new Date().getFullYear()+2 +"-"+ (new Date().getFullYear()+3).toString().substring(2) ;
    this.balanceSheetInformation3.YEAR = new Date().getFullYear()+3 +"-"+ (new Date().getFullYear()+4).toString().substring(2) ;
    this.balanceSheetInformation4.YEAR = new Date().getFullYear()+4 +"-"+ (new Date().getFullYear()+5).toString().substring(2) ;
    this.balanceSheetInformation5.YEAR = new Date().getFullYear()+5 +"-"+ (new Date().getFullYear()+6).toString().substring(2) ;
    this.balanceSheetInformation6.YEAR = new Date().getFullYear()+6 +"-"+ (new Date().getFullYear()+7).toString().substring(2) ;

    this.profitablityStatementData.YEAR  = this.balanceSheetInformation.YEAR
    this.profitablityStatementData1.YEAR = this.balanceSheetInformation1.YEAR
    this.profitablityStatementData2.YEAR = this.balanceSheetInformation2.YEAR
    this.profitablityStatementData3.YEAR = this.balanceSheetInformation3.YEAR
    this.profitablityStatementData4.YEAR = this.balanceSheetInformation4.YEAR
    this.profitablityStatementData5.YEAR = this.balanceSheetInformation5.YEAR
    this.profitablityStatementData6.YEAR = this.balanceSheetInformation6.YEAR



    this.data2 = [this.balanceSheetInformation,this.balanceSheetInformation1,this.balanceSheetInformation2,this.balanceSheetInformation3,this.balanceSheetInformation4,this.balanceSheetInformation5,this.balanceSheetInformation6];
   
    this.profitablityStatements = [this.profitablityStatementData,this.profitablityStatementData1,this.profitablityStatementData2,this.profitablityStatementData3,this.profitablityStatementData4,this.profitablityStatementData5,this.profitablityStatementData6];

  
  }

  loadInfo()
  {
 let filter=" AND EXTRA_INFORMATION_ID=8 AND PROPOSAL_ID="+this.PROPOSAL_ID
   this.api.getAllApplicantExtraInformation(0,0,"SEQ_NO","asc",filter).subscribe(data => {
    this.extraApplicantInformation=data['data'][0]
    }, err => {
      //console.log(err);
    });
  }


  getNote(){
    this.api.getAllProjectionsInformation(0, 0, "ID", 'asc', "AND PROPOSAL_ID="+this.PROPOSAL_ID).subscribe(data => {
      if (data['code'] == 200 && data['count'] > 0) {
        this.ProjectionInfo = data['data'][0];
      }
    }, err => {
      //console.log(err);
    });

  }

  getBalanceData() {
    this.api.getAllBalanceSheetInformation(0, 0, "ID", 'asc', "AND PROPOSAL_ID="+this.PROPOSAL_ID).subscribe(data => {
      if (data['code'] == '200' && data['count'] > 0) {
        this.data2 = data['data'];
        this.calculate(0)
        this.calculate(1)
        this.calculate(2)
        this.calculate(3)
        this.calculate(4)
        this.calculate(5)
        this.calculate(6)

        this.calculateLiability(0)
        this.calculateLiability(1)
        this.calculateLiability(2)
        this.calculateLiability(3)
        this.calculateLiability(4)
        this.calculateLiability(5)
        this.calculateLiability(6)

        //console.log(this.data2)
      }
    }, err => {
      //console.log(err);
    });
  }

  getProfitablityData() {
    this.api.getAllProfitabiltyStatementInformation(0, 0, "ID", 'asc', "AND PROPOSAL_ID="+this.PROPOSAL_ID).subscribe(data => {
      if (data['code'] == '200' && data['count'] > 0) {
        this.profitablityStatements = data['data'];

        //console.log(this.profitablityStatements)
      }
    }, err => {
      //console.log(err);
    });
  }


  getRepayingData() {
    this.api.getAllRepaymentCapacityInformation(0, 0, "ID", 'asc', "AND PROPOSAL_ID="+this.PROPOSAL_ID).subscribe(data => {
      if (data['code'] == '200' && data['count'] > 0) {
        this.repayingCapacityBorrower = data['data'];
     
       //console.log(this.repayingCapacityBorrower)
      }
    }, err => {
      //console.log(err);
    });
  }

  saveNote(): void {
    this.ProjectionInfo.PROPOSAL_ID = this.PROPOSAL_ID;
    if (this.ProjectionInfo.NOTE_TO_ACHIVE_THE_PROJECTIONS == undefined || this.ProjectionInfo.NOTE_TO_ACHIVE_THE_PROJECTIONS.trim() == '') {
      this.message.error(this.api.translate.instant('balance-sheet.message1'), "");
    } else {
      this.isSpinning = true;
      if (this.ProjectionInfo.ID) {
        this.api.updateProjectionsInformation(this.ProjectionInfo)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('balance-sheet.message2'), "");
              this.getNote();
              var LOG_ACTION = 'User saved Projection Info  tab information'
              var DESCRIPTION = sessionStorage.getItem('userName') + 'has saved the Projection Info  for the proposal ' + this.LOAN_KEY 
              var LOG_TYPE = 'I'
              this.api.proposalLogInformation(this.extraApplicantInformation.PROPOSAL_ID, this.extraApplicantInformation.CURRENT_STAGE_ID, 0, LOG_ACTION, Number(sessionStorage.getItem("userId")), DESCRIPTION, LOG_TYPE)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                  }
                });
              this.logtext = 'Update & Close - ProjectionInfo form - SUCCESS ' + JSON.stringify(this.ProjectionInfo) + " KEYWORD [U - ProjectionInfo ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                  }
                });


              this.isSpinning = false;
            }
            else {

              this.logtext = 'Update & Close - ProjectionInfo form - ERROR - ' + JSON.stringify(this.ProjectionInfo) + " KEYWORD [U - ProjectionInfo ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                  }
                });

              this.message.error(this.api.translate.instant('balance-sheet.message3'), "");
              this.isSpinning = false;
            }
          });
      }
      else {

        this.api.createProjectionsInformation(this.ProjectionInfo)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('balance-sheet.message4'), "");
              this.getNote();
              var LOG_ACTION = 'User saved Projection Info  tab information'
              var DESCRIPTION = sessionStorage.getItem('userName') + 'has saved the Projection Info  for the proposal ' + this.LOAN_KEY 
              var LOG_TYPE = 'I'
              this.api.proposalLogInformation(this.extraApplicantInformation.PROPOSAL_ID, this.extraApplicantInformation.CURRENT_STAGE_ID, 0, LOG_ACTION, Number(sessionStorage.getItem("userId")), DESCRIPTION, LOG_TYPE)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                  }
                });
              this.isSpinning = false;
            }
            else {
              this.message.error(this.api.translate.instant('balance-sheet.message5'), "");
              this.isSpinning = false;
              this.logtext = 'Save & Close - ProjectionInfo form - ERROR - ' + JSON.stringify(this.ProjectionInfo) + " KEYWORD [C - ProjectionInfo ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                  }
                });

            }
          });
      }
    }
  }

  indexChanged(value)
{
  //console.log("retuened value")

  //console.log(value)
  this.repayingCapacityBorrower=value
}

  save(): void {
    //console.log(this.data2)
    //console.log(this.profitablityStatements)
    //console.log(this.repayingCapacityBorrower)
      if (this.data2.length > 0) {
        if(this.total[0]==this.total1[0] && this.total[1]==this.total1[1] && this.total[2]==this.total1[2] && this.total[3]==this.total1[3] && this.total[4]==this.total1[4] && this.total[5]==this.total1[5] && this.total[6]==this.total1[6])
        {
          this.isSpinning = true;
          this.api.updateBalanceSheetInformationBulk(this.PROPOSAL_ID,this.data2,this.profitablityStatements,this.repayingCapacityBorrower)
            .subscribe(successCode => {
              //console.log(successCode)
              if (successCode['code'] == "200") {
                this.message.success(this.api.translate.instant('balance-sheet.message6'), "");
                var LOG_ACTION = 'User saved Balancesheet Info  tab information'
                var DESCRIPTION = sessionStorage.getItem('userName') + 'has saved the Balancesheet Info  for the proposal ' + this.LOAN_KEY 
                var LOG_TYPE = 'I'
                this.api.proposalLogInformation(this.extraApplicantInformation.PROPOSAL_ID, this.extraApplicantInformation.CURRENT_STAGE_ID, 0, LOG_ACTION, Number(sessionStorage.getItem("userId")), DESCRIPTION, LOG_TYPE)
                  .subscribe(successCode => {
                    if (successCode['code'] == "200") {
                    }
                  });
  
                this.extraApplicantInformation.IS_PROVIDED=true
                this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                  }
                  else {
                    this.message.error(this.api.translate.instant('balance-sheet.message7'), "");
                  }
                });
  
                this.logtext = 'Update & Close - BalanceSheetInformation form - SUCCESS PROPOSAL ID='+this.PROPOSAL_ID + JSON.stringify(this.data2) + " KEYWORD [U - BalanceSheetInformation ]";
                this.api.addLog('A', this.logtext, this.api.emailId)
                  .subscribe(successCode => {
                    if (successCode['code'] == "200") {
                      //console.log(successCode);
                    }
                    else {
                      //console.log(successCode);
                    }
                  });
    
                this.getBalanceData();
                this.getProfitablityData()
                this.getNote()
                this.getRepayingData()
                this.isSpinning = false;
              }
              else {
    
                this.logtext = 'Update & Close - BalanceSheetInformation form - ERROR - PROPOSAL ID='+this.PROPOSAL_ID + JSON.stringify(this.data2) + " KEYWORD [U - BalanceSheetInformation ]";
                this.api.addLog('A', this.logtext, this.api.emailId)
                  .subscribe(successCode => {
                    if (successCode['code'] == "200") {
                      //console.log(successCode);
                    }
                    else {
                      //console.log(successCode);
                    }
                  });
    
                this.message.error(this.api.translate.instant('balance-sheet.message8'), "");
                this.isSpinning = false;
              }
            });
        }
        else
        {
          this.message.error(this.api.translate.instant('balance-sheet.message9'), "");
        }
      
      }
  }


  
  VerifyUpdate()
  {

    if(this.extraApplicantInformation.IS_PROVIDED)
    {

      if(this.extraApplicantInformation.REMARK!="")
      {
        this.isButtonVerifySpinning=true
        this.extraApplicantInformation.IS_VERIFIED=true
        this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
    .subscribe(successCode => {
      if (successCode['code'] == "200") {
        this.isButtonVerifySpinning = false;
        // this.oldIndex++;
        // this.indexChanged.emit(this.oldIndex)
        var LOG_ACTION = ''
              var DESCRIPTION = ''
              if (this.extraApplicantInformation.IS_APPROVED == true) {
                LOG_ACTION = 'Balance Sheet Tab information Verified'
                
                DESCRIPTION = sessionStorage.getItem('userName') + ' has checked and approved the Balance Sheet for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK
              } else {
                LOG_ACTION = 'Balance Sheet Tab information Rejected'
                DESCRIPTION = sessionStorage.getItem('userName') + 'has checked and rejected the Balance Sheet for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK
  
              }
              var LOG_TYPE = 'I'
          this.api.proposalLogInformation(this.extraApplicantInformation.PROPOSAL_ID, this.extraApplicantInformation.CURRENT_STAGE_ID, 0, LOG_ACTION, Number(sessionStorage.getItem("userId")), DESCRIPTION, LOG_TYPE)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
              }
            });
      }
      else {
        this.message.error(this.api.translate.instant('balance-sheet.message10'), "");
        this.isButtonVerifySpinning = false;
      }
    });
      }
      else
      {
        this.message.error(this.api.translate.instant('balance-sheet.message11'), "");
      }
    }
  }

}
