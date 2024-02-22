import { Component, OnInit, Input } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { ApiService } from 'src/app/Service/api.service';
import { AgriInfo } from 'src/app/Models/PersonalProposal/agri-info';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { AgriIncomeInfo } from 'src/app/Models/PersonalProposal/argriincomeinfo';



@Component({
  selector: 'app-agri-info',
  templateUrl: './agri-info.component.html',
  styleUrls: ['./agri-info.component.css']
})
export class AgriInfoComponent implements OnInit {
  @Input() drawerClose2: Function;
  @Input() data4: AgriIncomeInfo;
  @Input() addressinfoCurrent: Addressinfo;
  pageIndex = 1;
  @Input() CURRENT_STAGE_ID: number;
  @Input() extraApplicantInformation: Extraapplicantinfo;

  saveCount: number = 0;

  pageSize = 100;
  sortValue: string = "asc";
  sortKey: string = "ID";
  searchText: string = "";
  likeQuery: string = "";
  isSpinning = false;
  bagayat: any;
  jirayat: any;
  logtext: string = ""
  constructor(private api: ApiService, private message: NzNotificationService) {
  }

  ngOnInit(): void { }

  close(): void {
    this.drawerClose2();

    this.logtext = 'CLOSED - Extra Info form';
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
  save(addNew: boolean) {

    var isOk = true;
    // this.data4.TOTAL_AREA_OF_LAND = 0
    // this.data4.TOTAL_AREA_IN_APPLICANT_NAME = 0
    // this.data4.TOTAL_AREA_OF_LAND_AS_PER_8A = 0
    // this.data4.TYPE_OF_AGRICULTURE_LAND = "B"
    // this.data4.PERSON_NAME = ""
    // this.addressinfoCurrent = new Addressinfo()
    // this.data4.AKAR = 0
    // this.data4.REMARK =" "
    // this.data4.TOTAL_AREA_IN_APPLICANT_NAME_AS_PER_8A = 0
    // if (
    //   this.addressinfoCurrent.DISTRICT != undefined && this.addressinfoCurrent.DISTRICT != "" &&
    //   this.addressinfoCurrent.HOUSE_NO != undefined && this.addressinfoCurrent.HOUSE_NO != "" &&
    //   this.addressinfoCurrent.PINCODE != undefined && this.addressinfoCurrent.PINCODE != "" &&
    //   this.addressinfoCurrent.TALUKA != undefined && this.addressinfoCurrent.TALUKA != "" &&
    //   this.addressinfoCurrent.STATE != undefined && this.addressinfoCurrent.STATE != "" &&
    //   this.addressinfoCurrent.VILLAGE != undefined && this.addressinfoCurrent.VILLAGE != ""
    // ) {


    //   if (this.data4.TOTAL_AREA_OF_LAND == undefined || this.data4.TOTAL_AREA_OF_LAND.toString().trim() == "") {
    //     isOk = false;
    //     this.message.error(this.api.translate.instant('agri_info.message1'), "");
    //   }

    //   if (this.data4.TOTAL_AREA_IN_APPLICANT_NAME == undefined || this.data4.TOTAL_AREA_IN_APPLICANT_NAME.toString().trim() == "") {
    //     isOk = false;
    //     this.message.error(this.api.translate.instant('agri_info.message2'), "");
    //   }

    //   if (this.data4.TOTAL_AREA_OF_LAND_AS_PER_8A == undefined || this.data4.TOTAL_AREA_OF_LAND_AS_PER_8A.toString().trim() == "") {
    //     isOk = false;
    //     this.message.error(this.api.translate.instant('agri_info.message3'), "");
    //   }



    //   if (this.data4['bagayat'] == undefined && this.data4['jirayat'] == undefined) {
    //     isOk = false;
    //     this.message.error(this.api.translate.instant('agri_info.message5'), "");
    //   } else {

    //     if (this.data4['bagayat'] && this.data4['jirayat']) {
    //       this.data4.TYPE_OF_AGRICULTURE_LAND = "B,G";
    //     }

    //     if (this.data4['bagayat'] && !this.data4['jirayat']) {
    //       this.data4.TYPE_OF_AGRICULTURE_LAND = "B";
    //     }
    //     if (!this.data4['bagayat'] && this.data4['jirayat']) {
    //       this.data4.TYPE_OF_AGRICULTURE_LAND = "G";
    //     }

    //   }

    //   if (this.data4.PERSON_NAME == undefined || this.data4.PERSON_NAME.trim() == '') {
    //     isOk = false;
    //     this.message.error(this.api.translate.instant('agri_info.message6'), "");
    //   }
    //   if (this.data4.AKAR == undefined || this.data4.AKAR  == 0) {
    //     isOk = false;
    //     this.message.error(this.api.translate.instant('agri_info.message9'), "");
    //   }
    //   if (this.data4.REMARK == undefined || this.data4.REMARK.trim()  == '') {
    //     isOk = false;
    //     this.message.error(this.api.translate.instant('agri_info.message10'), "");
    //   }




    // }
    // else {
    //   isOk = false;
    //   this.message.error(this.api.translate.instant('common.message.error.address'), "");
    // }
    if (isOk) {
      // if (this.data4.ANNUAL_INCOME_FROM_THIS_LAND == undefined || this.data4.ANNUAL_INCOME_FROM_THIS_LAND.toString().trim() == "") {
      //   this.data4.ANNUAL_INCOME_FROM_THIS_LAND =0;
      // }
      // if (this.data4.CURRENT_AGRICULTURE_PRODUCT == undefined || this.data4.CURRENT_AGRICULTURE_PRODUCT.trim() == '') {
      //   this.data4.CURRENT_AGRICULTURE_PRODUCT = ' '
      // }
      // this.data4.DETAILED_ADDRESS_ID = 0
      this.nextstep(addNew);

      // if (this.isValidPincode(this.addressinfoCurrent.PINCODE)) {
      //   this.isSpinning = true;
      //   //console.log(this.data4)
      //   if (this.data4.DETAILED_ADDRESS_ID) {
      //     this.api.updateAddressInformation(this.addressinfoCurrent)
      //       .subscribe(successCode => {
      //         if (successCode['code'] == "200") {
      //           this.nextstep(addNew)
      //         }
      //         else {

      //           this.logtext = 'Update & Close - AgriInformation form - ERROR - ' + JSON.stringify(this.data4) + " KEYWORD [U - AgriInformation ]";
      //           this.api.addLog('A', this.logtext, this.api.emailId)
      //             .subscribe(successCode => {
      //               if (successCode['code'] == "200") {
      //                 // console.log(successCode);
      //               }
      //               else {
      //                 // console.log(successCode);
      //               }
      //             });

      //           this.message.error(this.api.translate.instant('common.message.error.updatefailed'), "");
      //           this.isSpinning = false;
      //         }

      //       });
      //   } else {
      //     this.api.createAddressInformation(this.addressinfoCurrent)
      //       .subscribe(successCode => {
      //         if (successCode['code'] == "200") {
      //           this.api.getAllAddressInformation(0, 0, "ID", "desc", "")
      //             .subscribe(data1 => {
      //               this.data4.DETAILED_ADDRESS_ID = data1['data'][0]['ID'];
      //               this.nextstep(addNew)
      //             });
      //         } else {
      //           this.logtext = 'Update & Close - AgriInformation form - ERROR - ' + JSON.stringify(this.data4) + " KEYWORD [U - AgriInformation ]";
      //           this.api.addLog('A', this.logtext, this.api.emailId)
      //             .subscribe(successCode => {
      //               if (successCode['code'] == "200") {
      //                 // console.log(successCode);
      //               }
      //               else {
      //                 // console.log(successCode);
      //               }
      //             });

      //           this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
      //           this.isSpinning = false;
      //         }
      //       });
      //   }

      // }
      // else {
      //   this.message.error(this.api.translate.instant('common.message.error.wronginfo'), "");
      // }
    }
  }

  nextstep(addNew) {
    if (this.data4.ID) {
      this.data4.DETAILED_ADDRESS_ID = 0
      this.api.updateAgricultureLandInformation(this.data4)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.saveCount = 0;
            this.extraApplicantInformation.IS_PROVIDED = true
            this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                }
                else {
                  this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
                }
              });
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

            this.logtext = 'Update & Close - OtherIncomeInfo form - SUCCESS ' + JSON.stringify(this.data4) + " KEYWORD [U - OtherIncomeInfo ]";
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
              this.drawerClose2();

            this.isSpinning = false;
            this.setValues();
            this.setValues2();
          }
          else {
            this.saveCount = 0;
            this.logtext = 'Update & Close - OtherIncomeInfo form - ERROR - ' + JSON.stringify(this.data4) + " KEYWORD [U - OtherIncomeInfo ]";
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
        },
          error => {
            this.saveCount = 0;
          });


    } else {


      this.saveCount++;
      if (this.saveCount == 1) {

        this.api.createAgricultureLandInformation(this.data4)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.extraApplicantInformation.IS_PROVIDED = true
              this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                  }
                  else {
                    this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
                  }
                });
              this.message.success(this.api.translate.instant('common.message.error.success'), "");
              if (!addNew) {
                this.drawerClose2();

                this.logtext = 'Save & Close - OtherIncomeInfo form - SUCCESS - ' + JSON.stringify(this.data4) + " KEYWORD [C - OtherIncomeInfo ]";
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
                this.data4 = new AgriIncomeInfo();
                this.addressinfoCurrent = new Addressinfo();
                this.setValues();
                this.setValues2();
                this.logtext = 'Save & New - OtherIncomeInfo form - SUCCESS - ' + JSON.stringify(this.data4) + " KEYWORD [C - OtherIncomeInfo ]";
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

              this.logtext = 'Update & Close - OtherIncomeInfo form - ERROR - ' + JSON.stringify(this.data4) + " KEYWORD [U - OtherIncomeInfo ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                  }
                });

              this.saveCount = 0;

              this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
              this.isSpinning = false;
            }
          },
            error => {
              this.saveCount = 0;
            });
      }


    }
  }

  isValidPincode(pincode) {
    const expression = /^[1-9][0-9]{5}/;
    return expression.test(String(pincode).toLowerCase())
  }
  setValues() {
    // this.data4.PERSON_NAME = '';
    // this.data4.TYPE_OF_AGRICULTURE_LAND = '';
    // this.data4.CURRENT_AGRICULTURE_PRODUCT = '';
    // this.data4.ANNUAL_INCOME_FROM_THIS_LAND = 0;
    // this.data4.PLACE_OF_AGRICULTURE_LAND = '';
    // this.data4.DETAILED_ADDRESS_ID = 0;
    // this.data4.TOTAL_AREA_IN_APPLICANT_NAME = 0;
    // this.data4.TOTAL_AREA_IN_APPLICANT_NAME_AS_PER_8A = 0;
    // this.data4.TOTAL_AREA_OF_LAND = 0;
    // this.data4.TOTAL_AREA_OF_LAND_AS_PER_8A = 0;
    // this.data4.IS_NAME_APPEAR_IN_7_12 = false;
  }

  setValues2() {
    this.addressinfoCurrent.BUILDING = '';
    this.addressinfoCurrent.DISTRICT = '';
    this.addressinfoCurrent.HOUSE_NO = '';
    this.addressinfoCurrent.LANDMARK = '';
    this.addressinfoCurrent.VILLAGE = '';
    this.addressinfoCurrent.STATE = '';
    this.addressinfoCurrent.TALUKA = '';
    this.addressinfoCurrent.PINCODE = "";
  }
}

