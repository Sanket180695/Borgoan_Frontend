import { Component, OnInit, Input } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DatePipe } from '@angular/common';
import { PartnersInfo } from 'src/app/Models/FirmProposal/partners-info';
import { ApiService } from 'src/app/Service/api.service';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
@Component({
  selector: 'app-partners-info',
  templateUrl: './partners-info.component.html',
  styleUrls: ['./partners-info.component.css']
})
export class PartnersInfoComponent implements OnInit {
  @Input() drawerClose3: Function;
  @Input() data3: PartnersInfo;
  @Input() iscompany: Number;
  @Input() CURRENT_STAGE_ID: number;  
  @Input() extraApplicantInformation: Extraapplicantinfo;
  isSpinning = false;
  logtext: string = "";
  age: number;
  datePipe = new DatePipe("en-US");
  constructor(
    private api: ApiService,
    private message: NzNotificationService
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.drawerClose3();

    this.logtext = 'CLOSED - PartnerInfromation form';
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

  disabledDate = (current) => {
    return new Date(new Date().setFullYear(new Date().getFullYear() - 18)) < current;
  }

  onChange(date) {
    const darray = date.split('/');
    let bdate = new Date(darray[2],darray[1],darray[0]);
    console.log(bdate);
    console.log(Date.now)
    let timeDiff = Math.abs(Date.now() - bdate.getTime());
    console.log(timeDiff)
    this.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
  }


  save(addNew: boolean): void {
    if (this.data3.NAME != undefined && this.data3.DOB != undefined && this.data3.PAN_NUMBER != undefined && this.data3.AADHAR != undefined
      && this.data3.MOBILE_NUMBER != undefined && this.data3.RELIGION != undefined ) {
      if (this.data3.NAME.trim() != '' && this.data3.PAN_NUMBER.trim() != '' && this.data3.AADHAR.trim() != '' && this.data3.MOBILE_NUMBER.trim() != ''
      && this.data3.RELIGION.trim() != '' ) {

        if ((/^[1-9]{1}[0-9]{11}$/).test(this.data3.AADHAR) == false) {
          this.message.error(this.api.translate.instant('gpersonalinfo.lebel11.nzErrorTip'), "");
        } else {
          if ((/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/).test(this.data3.PAN_NUMBER) == false) {
            this.message.error(this.api.translate.instant('gpersonalinfo.lebel10.nzErrorTip'), "");
          } else {
            
              this.data3.PAN_NUMBER= this.data3.PAN_NUMBER.toUpperCase();
            
            if ((/^[6-9]{1}[0-9]{9}$/).test(this.data3.MOBILE_NUMBER) == false) {
              this.message.error(this.api.translate.instant('common.checkmobile'), "");
            } else {

              // if(this.iscompany==1 && this.data3.DIRECTORS_IDENTITY_NUMBER == undefined )
              // {
              //   this.message.error("संचालक ओळख क्रमांक", "");
              // } else {

              // }
              
              this.data3.DOB = this.datePipe.transform(this.data3.DOB, 'yyyy-MM-dd');
              if (this.data3.IS_AUTHORISED_TO_TRANSACT == undefined)
                this.data3.IS_AUTHORISED_TO_TRANSACT = false;

                
              this.isSpinning = true;
              if (this.data3.ID) {
                this.api.updatePartnersInformation(this.data3)
                  .subscribe(successCode => {
                    if (successCode['code'] == "200") {
                      this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

                      this.logtext = 'Update & Close - PartnerInfromation form - SUCCESS ' + JSON.stringify(this.data3) + " KEYWORD [U - PartnerInfromation ]";
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
                        this.drawerClose3();
                      this.isSpinning = false;
                    }
                    else {

                      this.logtext = 'Update & Close - PartnerInfromation form - ERROR - ' + JSON.stringify(this.data3) + " KEYWORD [U - PartnerInfromation ]";
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
              else {

                this.api.createPartnersInformation(this.data3)
                  .subscribe(successCode => {
                    if (successCode['code'] == "200") {
                      this.message.success(this.api.translate.instant('common.message.error.success'), "");

                      if (!addNew) {
                        this.drawerClose3();

                        this.logtext = 'Save & Close - PartnerInfromation form - SUCCESS - ' + JSON.stringify(this.data3) + " KEYWORD [C - PartnerInfromation ]";
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
                        this.data3 = new PartnersInfo();
                        this.logtext = 'Save & New - PartnerInfromation form - SUCCESS - ' + JSON.stringify(this.data3) + " KEYWORD [C - PartnerInfromation ]";
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
                      this.logtext = 'Save & Close - PartnerInfromation form - ERROR - ' + JSON.stringify(this.data3) + " KEYWORD [C - PartnerInfromation ]";
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
        }
      } else {
        this.message.error(this.api.translate.instant('common.message.error.wronginfo'), "");
      }
    } else {
      this.message.error(this.api.translate.instant('common.message.error.compinfo2'), "");
    }
  }

}
