import { Component, OnInit, Input } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { EmployeeInfo } from 'src/app/Models/FirmProposal/employee-info';
import { ApiService } from 'src/app/Service/api.service';
@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css']
})
export class EmployeeInfoComponent implements OnInit {
  @Input() drawerClose5: Function;
  @Input() data5: EmployeeInfo;
  @Input() dataList 
  @Input() type :string
  @Input() CURRENT_STAGE_ID: number;  
  @Input() extraApplicantInformation: Extraapplicantinfo;

  isSpinning = false
  logtext: string = "";
  i=1
  categoryTypes = [{ 'ID': this.api.translate.instant('employee_info.categoryTypes1'), 'NAME': this.api.translate.instant('employee_info.categoryTypes1') }, { 'ID': this.api.translate.instant('employee_info.categoryTypes2'), 'NAME': this.api.translate.instant('employee_info.categoryTypes2') }, { 'ID': this.api.translate.instant('employee_info.categoryTypes3'), 'NAME': this.api.translate.instant('employee_info.categoryTypes3') }, { 'ID': this.api.translate.instant('employee_info.categoryTypes4'), 'NAME': this.api.translate.instant('employee_info.categoryTypes4') }];
  constructor(
    private api: ApiService,
    private message: NzNotificationService
  ) { }

  ngOnInit(): void {
  }
  close(): void {
    this.drawerClose5();

    this.logtext = 'CLOSED - EmployeeInfromation form';
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

  save(addNew: boolean): void {
    if (this.data5.EMPLOYEE_CATEGORY != undefined && this.data5.COUNT != undefined) {
      if (this.data5.COUNT.toString().trim() != '') {
        this.isSpinning = true;

        if (this.data5.EDUCATINALLY_QUALIFIED == undefined)
        this.data5.EDUCATINALLY_QUALIFIED = false;

        if (this.data5.ID) {

          if(this.type=="B")
          {
            this.isSpinning = false;
            this.drawerClose5()
          }
          else
          {
            this.api.updateDetailsOfEmployee(this.data5)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

                this.logtext = 'Update & Close - EmployeeInfromation form - SUCCESS ' + JSON.stringify(this.data5) + " KEYWORD [U - EmployeeInfromation ]";
                this.api.addLog('A', this.logtext, this.api.emailId)
                  .subscribe(successCode => {
                    if (successCode['code'] == "200") {
                      //console.log(successCode);
                    }
                    else {
                      //console.log(successCode);
                    }
                  });

                if (!addNew)
                  this.drawerClose5();
                this.isSpinning = false;
              }
              else {

                this.logtext = 'Update & Close - EmployeeInfromation form - ERROR - ' + JSON.stringify(this.data5) + " KEYWORD [U - EmployeeInfromation ]";
                this.api.addLog('A', this.logtext, this.api.emailId)
                  .subscribe(successCode => {
                    if (successCode['code'] == "200") {
                      //console.log(successCode);
                    }
                    else {
                      //console.log(successCode);
                    }
                  });

                this.message.error(this.api.translate.instant('common.message.error.updatefailed'), "");
                this.isSpinning = false;
              }
            });
          }
           
      
        }
        else {

          if(this.type=="B")
          {
            if (!addNew) {
              this.data5.ID=this.i
              this.data5.CLIENT_ID=this.api.clientId
              this.data5.BUSINESS_FIRM_INFORMATION_ID=0
              this.dataList.push(Object.assign({}, this.data5));
              this.i++
            this.drawerClose5()
            }
            else
            {
              this.data5.ID=this.i
              this.data5.CLIENT_ID=this.api.clientId
              this.data5.BUSINESS_FIRM_INFORMATION_ID=0
              this.dataList.push(Object.assign({}, this.data5));
              this.i++
              this.data5= new EmployeeInfo();
            }
            this.isSpinning = false;
          }
          else
          {
            this.api.createDetailsOfEmployee(this.data5)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                this.message.success(this.api.translate.instant('common.message.error.success'), "");

                if (!addNew) {
                  this.drawerClose5();

                  this.logtext = 'Save & Close - EmployeeInfromation form - SUCCESS - ' + JSON.stringify(this.data5) + " KEYWORD [C - EmployeeInfromation ]";
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

                else {
                  this.data5 = new EmployeeInfo();
                 
                  this.logtext = 'Save & New - EmployeeInfromation form - SUCCESS - ' + JSON.stringify(this.data5) + " KEYWORD [C - EmployeeInfromation ]";
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
                this.isSpinning = false;
              }
              else {
                this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
                this.isSpinning = false;
                this.logtext = 'Save & Close - EmployeeInfromation form - ERROR - ' + JSON.stringify(this.data5) + " KEYWORD [C - EmployeeInfromation ]";
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
      } else {
        this.message.error(this.api.translate.instant('employee_info.message1'), "");
      }
    } else {
      this.message.error(this.api.translate.instant('common.message.error.emptyinfo'), "");
    }
  }


}
