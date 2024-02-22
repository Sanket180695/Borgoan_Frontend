import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { NzNotificationService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { ApiService } from 'src/app/Service/api.service';
import { ManufacturingInfo } from 'src/app/Models/FirmProposal/manufacturing-info';
import { FactoryUnit } from 'src/app/Models/FirmProposal/factory-unit';
import { EmployeeInfo } from 'src/app/Models/FirmProposal/employee-info';
import { DatePipe } from '@angular/common';
import { BusinessInfo } from 'src/app/Models/PersonalProposal/business-info';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';

@Component({
  selector: 'app-business-info',
  templateUrl: './business-info.component.html',
  styleUrls: ['./business-info.component.css'],
  providers: [DatePipe]
})
export class BusinessInfoComponent implements OnInit {
  @Input() drawerClose1: Function;
  @Input() data4: BusinessInfo;
  @Input() PROPOSAL_ID: number
  @Input() addressinfoBussiness: Addressinfo;
  @Input() CURRENT_STAGE_ID: number;
  @Input() extraApplicantInformation: Extraapplicantinfo;
  saveCount: number = 0;
  pageIndex = 1;
  pageSize = 100;
  sortValue: string = "asc";
  sortKey: string = "ID";
  searchText: string = "";
  likeQuery: string = "";
  isSpinning = false;
  logtext: string = ""
  drawerTitle1 = "";
  drawerData1: ManufacturingInfo = new ManufacturingInfo();

  drawerTitle4: string;
  drawerVisible4: boolean;
  drawerData4: FactoryUnit = new FactoryUnit();
  drawerTitle5: string;
  drawerVisible5: boolean;
  drawerData5: EmployeeInfo = new EmployeeInfo();
  drawerVisible1: boolean;
  loadingRecords1 = false
  manufacturingProcessData = []
  dataList4 = []
  loadingRecords4 = false
  dataList5 = []
  loadingRecords5 = false
  type: string = ""
  confirmModal?: NzModalRef;
  index = -1;
  managementData = []
  talukas = []
  districts = []
  states = []
  pincodes = []
  options = []
  constructor(private api: ApiService, private modal: NzModalService, private datePipe: DatePipe, private message: NzNotificationService) { }

  ngOnInit(): void {
  }
  onChanges(value: string): void {
    this.talukas = [];
    this.options.filter(option => {
      if (option.TALUKA.toLowerCase().includes(value.toLowerCase())) {
        this.talukas.push(option);
      }
    });

    if (this.talukas.length > 0) {
      this.addressinfoBussiness.DISTRICT = this.talukas[0]['DISTRICT']
      this.addressinfoBussiness.STATE = this.talukas[0]['STATE']
      this.addressinfoBussiness.PINCODE = this.talukas[0]['PINCODE']
    }
  }
  onChanges2(value: string): void {
    this.pincodes = [];
    this.talukas.filter(option => {
      if (option.PINCODE.toLowerCase().includes(value.toLowerCase())) {
        this.pincodes.push(option.PINCODE);
      }
    });

  }
  getAddresslist() {
    let filter = ""
    this.api.getAddresslist(0, 0, "TALUKA", "asc", filter).subscribe(data => {
      this.options = data['data'];
    }, err => {
      this.options = []
    });
  }
  indexChanged(value) {
    //console.log("retuened value")

    //console.log(value)
    this.managementData = value
  }

  focusss1(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data4.RENT_AGREEMENT_END_DATE = undefined;
    }
  }

  disabledDate = (current) => {
    return new Date() < current;
  }
  disabledDate2 = (current) => {
    return new Date() > current;
  }

  getData(data: BusinessInfo) {
    //console.log("called")
    this.data4.ID = data.ID
    this.type = data.TYPE
    this.manufacturingProcessData = []
    this.dataList4 = []
    this.dataList5 = []
    this.managementData = []
    this.getAddresslist();
    this.getManufacturingInformation();
    this.getData4()
    this.getData5()
    this.getDataManagingSales()

  }

  close(): void {
    this.drawerClose1();

    this.logtext = 'CLOSED - BuisnessInformation Info form';
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

  getDataManagingSales() {
    //console.log(this.data4.ID)
    this.api.getAllManagementOfSalesInformation(0, 0, this.sortKey, this.sortValue, " AND BUSINESS_FIRM_INFORMATION_ID =" + this.data4.ID).subscribe(data => {
      //console.log("management sales")
      //console.log( data)
      this.managementData = data['data'];
    }, err => {
      //console.log(err);
    });
  }

  save(addNew: boolean) {
    var isOk = true;


    this.data4.IS_OTHER_LICENSE = false;
    this.data4.OTHER_LICENSE_NAME = ' ';
    this.data4.OTHER_LICENSE_NUMBER = ' ';
    this.data4.NAME_OF_FIRM = this.data4.NAME_OF_FIRM

    if (this.data4.NATURE_OF_FIRM == undefined) {
      this.data4.NATURE_OF_FIRM = " "
    }

    if (this.data4.CAPITAL == undefined) {
      this.data4.CAPITAL = 0
    }

    if (this.data4.TURNOVER_YEARLY == undefined) {
      this.data4.TURNOVER_YEARLY = 0
    }

    if (this.data4.INCOME_YEARLY == undefined) {
      this.data4.INCOME_YEARLY = 0
    }

    this.data4.IS_SHOP_ACT_LICENSE = false;
    this.data4.SHOP_ACT_NUMBER = ' ';
    this.data4.IS_SHOP_ACT_LICENSE_RENEWAL_FOR_CURRENT_YEAR = false;
    this.data4.IS_GST_REGISTARTION_CERTIFICATE = false;
    this.data4.GST_NUMBER = " ";
    this.data4.RENT_AGREEMENT_END_DATE = null
    this.data4.OWNER_NAME = " "
    this.data4.OWNERSHIP_TYPE = "R"
    this.data4.MSME_REGISTRATION_NUMBER = " "
    this.data4.MSME_REGISTRATION_DATE = null;

    if (this.addressinfoBussiness.HOUSE_NO == undefined) this.addressinfoBussiness.HOUSE_NO = "";
    if (this.addressinfoBussiness.BUILDING == undefined) this.addressinfoBussiness.BUILDING = ""
    if (this.addressinfoBussiness.LANDMARK == undefined) this.addressinfoBussiness.LANDMARK = "";
    if (

      (this.addressinfoBussiness.DISTRICT == undefined || this.addressinfoBussiness.DISTRICT.trim() == "") &&

      (this.addressinfoBussiness.PINCODE == undefined || this.addressinfoBussiness.PINCODE.trim() == "") &&
      (this.addressinfoBussiness.TALUKA == undefined || this.addressinfoBussiness.TALUKA.trim() == "") &&
      (this.addressinfoBussiness.STATE == undefined || this.addressinfoBussiness.STATE.trim() == "") &&
      (this.addressinfoBussiness.VILLAGE == undefined || this.addressinfoBussiness.VILLAGE.trim() == "")

    ) {
      this.message.error(this.api.translate.instant('common.message.error.address'), "");
      isOk = false
    } else {

      if (this.isValidPincode(this.addressinfoBussiness.PINCODE)) {
      }
      else {
        isOk = false;
        this.message.error(this.api.translate.instant('common.message.error.wronginfo'), "");
      }
    }



    if (isOk) {

      //console.log(this.data4)
      if (this.data4.OWNER_NAME == undefined || this.data4.OWNER_NAME.trim() == "") {
        this.data4.OWNER_NAME = ' ';
      }
      if (this.data4.NUMBER_OF_YEARS == undefined || this.data4.NUMBER_OF_YEARS.toString().trim() == "") {
        this.data4.NUMBER_OF_YEARS = 0
      }
      this.isSpinning = true;

      if (this.data4.IS_INVOLVE_IN_MANUFACTURING_PROCESS) {
        this.data4.MANUFACTURING_INFORMATION = this.manufacturingProcessData
        this.data4.FACTORY_UNIT_INFORMATION = this.dataList4
        this.data4.DETAILS_OF_EMPLOYEE = this.dataList5
        this.data4.MANAGEMENT_OF_SALES = this.managementData
      }
      else {
        this.data4.MANUFACTURING_INFORMATION = []
        this.data4.FACTORY_UNIT_INFORMATION = []
        this.data4.DETAILS_OF_EMPLOYEE = []
        this.data4.MANAGEMENT_OF_SALES = []
      }


      if (this.data4.ADDRESS_ID != undefined && this.data4.ADDRESS_ID > 0) {
        this.api.updateAddressInformation(this.addressinfoBussiness)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.nextstep(addNew)
            }
            else {

              this.logtext = 'Update & Close - BuisnessInformation form - ERROR - ' + JSON.stringify(this.data4) + " KEYWORD [U - BuisnessInformation ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    // console.log(successCode);
                  }
                  else {
                    // console.log(successCode);
                  }
                });

              this.message.error(this.api.translate.instant('common.message.error.updatefailed'), "");
              this.isSpinning = false;
            }

          });
      } else {
        this.saveCount++;
        if (this.saveCount == 1) {
          this.api.createAddressInformation(this.addressinfoBussiness)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                this.data4.ADDRESS_ID = successCode['data'][0].ID;
                this.nextstep(addNew)
              } else {
                this.logtext = 'Update & Close - BuisnessInformation form - ERROR - ' + JSON.stringify(this.data4) + " KEYWORD [U - BuisnessInformation ]";
                this.api.addLog('A', this.logtext, this.api.emailId)
                  .subscribe(successCode => {
                    if (successCode['code'] == "200") {
                      // console.log(successCode);
                    }
                    else {
                      // console.log(successCode);
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
  }

  nextstep(addNew) {
    if (this.data4.ID) {

      this.api.AddBusinessFirmInformation(this.data4, this.PROPOSAL_ID)
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
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

            this.logtext = 'Update & Close - BuisnessInformation form - SUCCESS ' + JSON.stringify(this.data4) + " KEYWORD [U - BuisnessInformation ]";
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
              this.drawerClose1();
            this.isSpinning = false;
            this.setValues();
            this.setValues2();
          }
          else {

            this.logtext = 'Update & Close - BuisnessInformation form - ERROR - ' + JSON.stringify(this.data4) + " KEYWORD [U - BuisnessInformation ]";
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

    } else {


      this.api.AddBusinessFirmInformation(this.data4, this.PROPOSAL_ID)
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
              this.drawerClose1();
              this.logtext = 'Save & Close - BuisnessInformation form - SUCCESS - ' + JSON.stringify(this.data4) + " KEYWORD [C - BuisnessInformation ]";
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
              this.data4 = new BusinessInfo();
              this.addressinfoBussiness = new Addressinfo();
              this.setValues();
              this.setValues2();
              this.logtext = 'Save & New - BuisnessInformation form - SUCCESS - ' + JSON.stringify(this.data4) + " KEYWORD [C - BuisnessInformation ]";
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

            this.logtext = 'Update & Close - BuisnessInformation form - ERROR - ' + JSON.stringify(this.data4) + " KEYWORD [U - BuisnessInformation ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });

            this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
            this.isSpinning = false;
          }
        });

    }
  }
  nextstep2(addNew) {
    if (this.data4.ID) {

      this.api.updateBusinessFirmInformation(this.data4)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.saveCount = 0;

            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

            this.logtext = 'Update & Close - BuisnessInformation form - SUCCESS ' + JSON.stringify(this.data4) + " KEYWORD [U - BuisnessInformation ]";
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
              this.drawerClose1();
            this.isSpinning = false;
            this.setValues();
            this.setValues2();
          }
          else {
            this.saveCount = 0;

            this.logtext = 'Update & Close - BuisnessInformation form - ERROR - ' + JSON.stringify(this.data4) + " KEYWORD [U - BuisnessInformation ]";
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

      this.api.createBusinessFirmInformation(this.data4)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('common.message.error.success'), "");
            if (!addNew) {
              this.drawerClose1();
              this.logtext = 'Save & Close - BuisnessInformation form - SUCCESS - ' + JSON.stringify(this.data4) + " KEYWORD [C - BuisnessInformation ]";
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
              this.data4 = new BusinessInfo();
              this.data4.MANUFACTURING_INFORMATION = []
              this.data4.FACTORY_UNIT_INFORMATION = []
              this.data4.DETAILS_OF_EMPLOYEE = []
              this.data4.MANAGEMENT_OF_SALES = []
              this.addressinfoBussiness = new Addressinfo();
              this.setValues();
              this.setValues2();
              this.logtext = 'Save & New - BuisnessInformation form - SUCCESS - ' + JSON.stringify(this.data4) + " KEYWORD [C - BuisnessInformation ]";
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
            this.saveCount = 0;
            this.logtext = 'Update & Close - BuisnessInformation form - ERROR - ' + JSON.stringify(this.data4) + " KEYWORD [U - BuisnessInformation ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });

            this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
            this.isSpinning = false;
          }
        },
        error => {
          this.saveCount = 0;
    });

    }
  }

  isValidPincode(pincode) {
    const expression = /^[1-9][0-9]{5}/;
    return expression.test(String(pincode).toLowerCase())
  }

  setValues() {
    this.data4.NAME_OF_FIRM = this.data4.NAME_OF_FIRM
    this.data4.NATURE_OF_FIRM = this.data4.NATURE_OF_FIRM;
    this.data4.NUMBER_OF_YEARS = 0;
    this.data4.OTHER_LICENSE_NAME = '';
    this.data4.OTHER_LICENSE_NUMBER = '';
    this.data4.OWNERSHIP_TYPE = '';
    this.data4.SHOP_ACT_NUMBER = '';
    this.data4.GST_NUMBER = '';
    this.data4.ADDRESS_ID = 0;
    this.data4.IS_CERTIFICATE_FROM_PROFESSIONAL_TAX_AUTHORITY = false;
    this.data4.IS_GST_REGISTARTION_CERTIFICATE = false;
    this.data4.IS_OTHER_LICENSE = false;
    this.data4.IS_SHOP_ACT_LICENSE = false;
    this.data4.IS_SHOP_ACT_LICENSE_RENEWAL_FOR_CURRENT_YEAR = false;
  }

  setValues2() {
    this.addressinfoBussiness.BUILDING = '';
    this.addressinfoBussiness.DISTRICT = '';
    this.addressinfoBussiness.HOUSE_NO = '';
    this.addressinfoBussiness.LANDMARK = '';
    this.addressinfoBussiness.VILLAGE = '';
    this.addressinfoBussiness.STATE = '';
    this.addressinfoBussiness.TALUKA = '';
    this.addressinfoBussiness.PINCODE = '';
  }





  //manufacturing information Details
  getManufacturingInformation() {
    this.loadingRecords1 = true;
    this.api.getAllManufacturingInfromation(0, 0, 'ID', "asc", "AND BUSINESS_FIRM_INFORMATION_ID = " + this.data4.ID)
      .subscribe(successCode => {
        this.loadingRecords1 = false;
        if (successCode['code'] == "200" && successCode['count'] > 0) {
          this.manufacturingProcessData = successCode['data'];
        }
      });
  }

  add1() {
    this.drawerTitle1 = this.api.translate.instant('business_info.drawerTitle1');
    this.drawerData1 = new ManufacturingInfo();
    this.drawerData1.FIRM_INFORMATION_ID = 0;
    this.drawerData1.BUSINESS_FIRM_INFORMATION_ID = this.data4.ID;
    this.type = this.data4.TYPE
    this.drawerVisible1 = true;
  }

  get closeCallback1() {
    return this.drawerCloseManufacureProcess.bind(this);
  }







  drawerCloseManufacureProcess(): void {
    if (this.index > -1) {
      this.manufacturingProcessData[this.index] = this.drawerData1;
    }
    this.index = -1;
    this.drawerVisible1 = false;
  }

  edit1(data: any, i: number): void {
    this.index = i;
    this.drawerTitle1 = this.api.translate.instant('business_info.drawerTitle2');
    this.drawerData1 = Object.assign({}, data);
    this.drawerVisible1 = true;
    this.logtext = 'EDIT - उत्पादनाची माहिती form KEYWORD [E - उत्पादनाची माहिती] ';
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


  getData4() {
    this.loadingRecords4 = true;
    this.api.getAllFactoryUnitInformation(0, 0, 'ID', "asc", "AND BUSINESS_FIRM_INFORMATION_ID = " + this.data4.ID)
      .subscribe(successCode => {
        this.loadingRecords4 = false;
        if (successCode['code'] == "200" && successCode['count'] > 0) {
          this.dataList4 = successCode['data'];
        }
      });
  }


  getfactoryType(value) {
    var dataList = [{ 'ID': 'स्वतःच्या मालकीची', 'NAME': 'स्वतःच्या मालकीची' }, { 'ID': 'भाड्याने लिजवर घेतलेली', 'NAME': 'भाड्याने लिजवर घेतलेली' }, { 'ID': 'हायर पर्चेस', 'NAME': 'हायर पर्चेस' }];
    var data = dataList.filter((item) => item.ID == value);
    return data[0]['NAME'];
  }

  add4() {
    this.drawerTitle4 = this.api.translate.instant('business_info.drawerTitle3');
    this.drawerData4 = new FactoryUnit();
    this.type = this.data4.TYPE
    this.drawerData4.BUSINESS_FIRM_INFORMATION_ID = this.data4.ID;
    this.drawerVisible4 = true;

  }

  get closeCallback4() {
    return this.drawerClose4.bind(this);
  }

  drawerClose4(): void {
    if (this.index > -1) {
      this.dataList4[this.index] = this.drawerData4;
    }
    this.drawerVisible4 = false;
  }

  edit4(data: any, i: number): void {
    this.index = i
    this.drawerTitle4 = this.api.translate.instant('business_info.drawerTitle4');
    this.drawerData4 = Object.assign({}, data);
    this.drawerVisible4 = true;

    this.logtext = 'EDIT - फॅक्टरी / युनिट माहिती form KEYWORD [E - फॅक्टरी युनिट माहिती] ';
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

  getData5() {
    this.loadingRecords5 = true;
    this.api.getAllDetailsOfEmployee(0, 0, 'ID', "asc", "AND  BUSINESS_FIRM_INFORMATION_ID = " + this.data4.ID)
      .subscribe(successCode => {
        this.loadingRecords5 = false;
        if (successCode['code'] == "200" && successCode['count'] > 0) {
          this.dataList5 = successCode['data'];
        }
      });
  }

  add5() {
    this.drawerTitle5 = this.api.translate.instant('business_info.drawerTitle5');
    this.drawerData5 = new EmployeeInfo();
    this.drawerData5.BUSINESS_FIRM_INFORMATION_ID = this.data4.ID;
    this.type = this.data4.TYPE
    this.drawerVisible5 = true;
  }



  get closeCallback5() {
    return this.drawerClose5.bind(this);
  }

  drawerClose5(): void {
    if (this.index > -1) {
      this.dataList5[this.index] = this.drawerData5;
    }
    this.drawerVisible5 = false;
  }

  edit5(data: any, i: number): void {
    this.index = i
    this.drawerTitle5 = this.api.translate.instant('business_info.drawerTitle6');
    this.drawerData5 = Object.assign({}, data);
    this.drawerVisible5 = true;

    this.logtext = 'EDIT - कर्मचाऱ्यांची माहिती form KEYWORD [E - कर्मचाऱ्यांची माहिती] ';
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

  delete1(data) {
    this.confirmModal = this.modal.confirm({
      nzTitle: this.api.translate.instant('common.confirmModal.nzTitle'),
      nzContent: this.api.translate.instant('common.confirmModal.nzContent'),
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          const index = this.dataList5.indexOf(data);
          this.dataList5.splice(index, 1);
          this.dataList5 = this.dataList5.filter(object => {
            return object['ID'] != data
          });
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);

        }).catch(() => console.log('माहिती बदल करण्यात अयशस्वी!'))
    });
  }

  delete2(data) {
    this.confirmModal = this.modal.confirm({
      nzTitle: this.api.translate.instant('common.confirmModal.nzTitle'),
      nzContent: this.api.translate.instant('common.confirmModal.nzContent'),
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          const index = this.manufacturingProcessData.indexOf(data);
          this.manufacturingProcessData.splice(index, 1);
          this.manufacturingProcessData = this.manufacturingProcessData.filter(object => {
            return object['ID'] != data
          });
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);

        }).catch(() => console.log('माहिती बदल करण्यात अयशस्वी!'))
    });
  }

  delete3(data) {

    this.confirmModal = this.modal.confirm({
      nzTitle: this.api.translate.instant('common.confirmModal.nzTitle'),
      nzContent: this.api.translate.instant('common.confirmModal.nzContent'),
      nzOnOk: () =>
        new Promise((resolve, reject) => {

          const index = this.dataList4.indexOf(data);
          this.dataList4.splice(index, 1);
          this.dataList4 = this.dataList4.filter(object => {
            return object['ID'] != data
          });
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);

        }).catch(() => console.log('माहिती बदल करण्यात अयशस्वी!'))
    });
  }
}
