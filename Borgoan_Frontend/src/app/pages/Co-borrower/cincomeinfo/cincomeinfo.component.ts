import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Incomeinformation } from 'src/app/Models/PersonalProposal/incomeinformation';
import { BusinessInfoComponent } from '../../PersonalProposal/business-info/business-info.component';
import { Applicantdocument } from 'src/app/Models/Applicant/applicantdocument';
import { BusinessInfo } from 'src/app/Models/PersonalProposal/business-info';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { AgriInfo } from 'src/app/Models/PersonalProposal/agri-info';
import { SalariedInfo } from 'src/app/Models/PersonalProposal/salaried-info';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { NzModalRef, NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { ApiService } from 'src/app/Service/api.service';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cincomeinfo',
  templateUrl: './cincomeinfo.component.html',
  styleUrls: ['./cincomeinfo.component.css']
})
export class CincomeinfoComponent implements OnInit {
  @Output() demo: EventEmitter<boolean> =
  new EventEmitter<boolean>();
@Input() CURRENT_STAGE_ID: number; @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
@Input() PROPOSAL_ID: number
@Input() APPLICANT_ID: number
@Input() LOAN_KEY: number
data1: Incomeinformation = new Incomeinformation();
@ViewChild(BusinessInfoComponent, { static: false }) buinessInfo: BusinessInfoComponent;

formTitle = this.api.translate.instant('gincomeinfo.formTitle');
pageIndex = 1;
pageSize = 100;
incomeTypeData = [];
incomeTypeData2 = [];
incomeTypeData3 = [];
isSpinning = false;
isSpinning2 = false;
isSpinning3 = false;
isSpinning4 = false;
totalRecords: number;

logtext: string = ""
dataList1 = [];
dataList2 = [];
dataList3 = [];
addressDataList = [];
addressinfoCurrentList = [];
applicantDocument: Applicantdocument = new Applicantdocument();
loadingRecords1 = false;
loadingRecords2 = false;
loadingRecords3 = false;
drawerVisible1: boolean;
drawerTitle1: string;
drawerData1: BusinessInfo = new BusinessInfo();
addressinfoBussiness: Addressinfo = new Addressinfo();
addressinfoCurrent: Addressinfo = new Addressinfo();
drawerVisible2: boolean;
drawerTitle2: string;
drawerData2: AgriInfo = new AgriInfo();
isButtonSpinning = false;
isPdf = false;
sortValue: string = "asc";
sortKey: string = "ID";
searchText: string = "";
likeQuery: string = "";
isFilterApplied: string = "default";
data2: SalariedInfo = new SalariedInfo();
addressinfoSalary: Addressinfo = new Addressinfo();
addressData: Addressinfo = new Addressinfo();
agriaddressData: Addressinfo = new Addressinfo();
fileList: FileList
isButtonVerifySpinning = false
isButtonSpinning1 = false
confirmModal?: NzModalRef;
incomeSourceDisable = false
count
financeVisible = false
fkey = this.api.documentFkey
  constructor(
    private api: ApiService, private modal: NzModalService, private datePipe: DatePipe, private message: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.getData();
    this.loadInfo()
  }

  loadInfo() {
    let filter = " AND EXTRA_INFORMATION_ID=2 AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND APPLICANT_ID=" + this.APPLICANT_ID + " AND  TYPE='C'"
    this.api.getAllApplicantExtraInformation(0, 0, "SEQ_NO", "asc", filter).subscribe(data => {
      this.extraApplicantInformation = data['data'][0]
      ////console.log(this.extraApplicantInformation)
    }, err => {
      ////console.log(err);
    });
  }

  getNetSalary() {
    if (this.data2.GROSS_SALARY == undefined) {
      this.data2.NET_SALARY = 0;
    } else {


      if (this.data2.TOTAL_DEDUCTION <= this.data2.GROSS_SALARY) {
        ////console.log(this.data2.TOTAL_DEDUCTION)
        ////console.log(this.data2.GROSS_SALARY)
        this.data2.TOTAL_DEDUCTION = this.data2.PROVIDANT_FUND + this.data2.INSURANCE + this.data2.INCOME_TAX + this.data2.LOAN_INSTALLMENT + this.data2.OTHER_DEDUCTION
        this.data2.NET_SALARY = this.data2.GROSS_SALARY - this.data2.TOTAL_DEDUCTION;
      }
      else {
        ////console.log(this.data2.TOTAL_DEDUCTION)
        ////console.log(this.data2.GROSS_SALARY)
        this.data2.TOTAL_DEDUCTION = 0
        this.data2.NET_SALARY = 0
      }

    }
  }

  getData() {
    this.isSpinning = true
    this.api.getAllIncomeSocurce(0, 0, this.sortKey, this.sortValue, "")
      .subscribe(data => {
        this.incomeTypeData = data['data'];
      }, err => {
        ////console.log(err);
      });
    let filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND APPLICANT_ID=" + this.APPLICANT_ID + " AND  TYPE='C'"
    this.api.getAllIncomeInformation(0, 0, this.sortKey, this.sortValue, filter)
      .subscribe(data => {
        ////console.log("income get")
        ////console.log(data)
        if (data['code'] == "200" && data['data'].length > 0) {

          this.data1 = data['data'][0];

          if (this.data1.IS_SAVED)
            this.incomeSourceDisable = true
          else
            this.incomeSourceDisable = false


          this.changeIncomeSource(this.data1.INCOME_SOURCE_ID);

          if (this.data1.INCOME_SOURCE_ID == 1 || this.data1.OTHER_INCOME_SOURCE_ID == 1) {
            this.getData3();
          }

          if (this.data1.INCOME_SOURCE_ID == 2 || this.data1.INCOME_SOURCE_ID == 4 || this.data1.OTHER_INCOME_SOURCE_ID == 2 || this.data1.OTHER_INCOME_SOURCE_ID == 4) {
            this.getData4();
          }

          if (this.data1.INCOME_SOURCE_ID == 3 || this.data1.OTHER_INCOME_SOURCE_ID == 3) {
            this.getData5();
          }
          this.isSpinning = false

        }
      }, err => {
        ////console.log(err);
      });
  }

  getData3() {
    this.api.getAllSalariedInformation(0, 0, this.sortKey, this.sortValue, "AND INCOME_INFORMATION_ID = " + this.data1.ID)
      .subscribe(data => {
        ////console.log("salary info")

        if (data['count'] > 0) {
          this.data2 = data['data'][0];

          this.api.getAllAddressInformation(0, 0, this.sortKey, this.sortValue, "AND ID =" + this.data2.PLACE_OF_EMPLOYMENT)
            .subscribe(data => {
              ////console.log(data)
              if (data['code'] == "200") {
                if (data['count'] != 0) { this.addressinfoSalary = data['data'][0]; }
              }
            }, err => {
              ////console.log(err);
            });
        }
        else {
          this.count = 0
        }

      }, err => {
        ////console.log(err);
      });
  }

  getData4() {
    this.loadingRecords1 = true;
    this.loadingRecords3 = true;
    this.api.getAllBusinessInformation(0, 0, 'ID', "asc", "AND INCOME_INFORMATION_ID = " + this.data1.ID)
      .subscribe(successCode => {
        this.loadingRecords1 = false;
        this.loadingRecords3 = false;
        if (successCode['count'] > 0) {
          this.dataList1 = successCode['data'].filter((item) => item.TYPE == 'B');
          this.dataList3 = successCode['data'].filter((item) => item.TYPE == 'P');
        }
      });
  }

  getData5() {
    this.loadingRecords2 = true;

    this.api.getAllAgricultureInformation(1, 20, 'ID', "asc", "AND INCOME_INFORMATION_ID = " + this.data1.ID)
      .subscribe(successCode => {
        this.loadingRecords2 = false;
        if (successCode['count'] > 0) {
          this.dataList2 = successCode['data'];
        } else {
          this.dataList2 = []
        }
      });
  }

  getUrl(applicantDocumentId) {
    this.isSpinning = true
    ////console.log(applicantDocumentId)

    this.api.getAllProposalDocuments(0, 0, this.sortKey, this.sortValue, "AND ID=" + this.data2.APPLICANT_DOCUMENTS_ID)
      .subscribe(data => {
        ////console.log(data)
        if (data['code'] == "200") {
          if (data['count'] > 0) {
            this.applicantDocument = data['data'][0];
            ////console.log(this.applicantDocument)
            if (this.applicantDocument.DOCUMENT_KEY != undefined) {
              this.api.getFile(this.applicantDocument.DOCUMENT_KEY)
                .subscribe(data => {
                  if (data['code'] == "200") {
                    const TYPED_ARRAY = new Uint8Array(data['data']['FILE_DATA']['data']);
                    const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
                      return data + String.fromCharCode(byte);
                    }, '');
                    let base64String = btoa(STRING_CHAR);

                    //  this.fileExt= data['data']['F_EXT']
                    //   if (data['data']['F_EXT'] == "pdf")
                    //  this.imageSrc="data:application/pdf;base64," + base64String;
                    //  else
                    //  this.imageSrc="data:image/jpeg;base64," + base64String;

                    var linkSource = ""
                    let pdfWindow = window.open()

                    if (data['data']['F_EXT'] == "pdf") {
                      linkSource = "data:application/pdf;base64," + base64String;
                      pdfWindow.document.write("<iframe width='100%' height='100%' src='" + linkSource + "'></iframe>")
                    }
                    this.isSpinning = false

                  }
                }, err => {
                  ////console.log(err);
                });
            }
          }
        }
      }, err => {
        ////console.log(err);
      });
  }

  changeIncomeSource(incomeSourceId) {
    this.incomeTypeData2 = [];
    this.incomeTypeData2 = this.incomeTypeData.filter((item) => item.ID !== this.data1.INCOME_SOURCE_ID);
    this.incomeTypeData2.splice(0, 0, { 'ID': 0, 'NAME': this.api.translate.instant('gincomeinfo.arraytext') });
    sessionStorage.setItem("incomesourceId", incomeSourceId);
    ////console.log(this.data1.OTHER_INCOME_SOURCE_ID)
    this.changeOtherIncomeSource(this.data1.OTHER_INCOME_SOURCE_ID)
    if (this.data1.INCOME_SOURCE_ID == 1) {
      this.getData3()
    }

    if (this.data1.INCOME_SOURCE_ID == 2 || this.data1.INCOME_SOURCE_ID == 4) {
      this.getData4();
    }

    if (this.data1.INCOME_SOURCE_ID == 3) {
      this.getData5();
    }
  }

  changeOtherIncomeSource(otherincomeSourceId) {
    this.incomeTypeData3 = [];
    this.incomeTypeData3 = this.incomeTypeData.filter((item) => item.ID !== this.data1.INCOME_SOURCE_ID && item.ID !== this.data1.OTHER_INCOME_SOURCE_ID);
    this.incomeTypeData3.splice(0, 0, { 'ID': 0, 'NAME': this.api.translate.instant('gincomeinfo.arraytext') });
    sessionStorage.setItem("otherincomesourceId", otherincomeSourceId)
    this.changeOtherIncomeSource2(this.data1.OTHER_INCOME_SOURCE_ID2)
    if (this.data1.OTHER_INCOME_SOURCE_ID == 1) {
      this.getData3()
    }

    if (this.data1.OTHER_INCOME_SOURCE_ID == 2 || this.data1.OTHER_INCOME_SOURCE_ID == 4) {
      this.getData4();
    }

    if (this.data1.OTHER_INCOME_SOURCE_ID == 3) {
      this.getData5();
    }
  }

  changeOtherIncomeSource2(otherIncomeSourceId2) {
    sessionStorage.setItem("otherincomesourceId2", otherIncomeSourceId2)

    if (this.data1.OTHER_INCOME_SOURCE_ID2 == 1) {
      this.getData3()
    }

    if (this.data1.OTHER_INCOME_SOURCE_ID2 == 2 || this.data1.OTHER_INCOME_SOURCE_ID2 == 4) {
      this.getData4();
    }

    if (this.data1.OTHER_INCOME_SOURCE_ID2 == 3) {
      this.getData5();
    }

  }
  getname(values) {
    if (values) {
      var v = values.split(',');
      var string = '';
      if (v.length == 2) {
        if (v[0] == "B" || v[1] == "B")
          string = string + this.api.translate.instant('gincomeinfo.bagayat');

        if (v[1] == "G" || v[0] == "G")
          string = string + ',' + this.api.translate.instant('gincomeinfo.jirayat');
      } else {
        if (v[0] == "B")
          string = this.api.translate.instant('gincomeinfo.bagayat');
        else
          string = this.api.translate.instant('gincomeinfo.jirayat');
      }

      return string;
    }
    else {
      return ""
    }

  }

  add1(n: number) {
    this.drawerData1 = new BusinessInfo();
    this.addressinfoBussiness = new Addressinfo();
    this.addressData = new Addressinfo();

    if (n == 2) {
      this.drawerTitle1 = this.api.translate.instant('gincomeinfo.drawerTitle1');
      this.drawerData1.TYPE = 'B';
      this.buinessInfo.dataList4 = []
      this.buinessInfo.dataList5 = []
      this.buinessInfo.manufacturingProcessData = []
      this.buinessInfo.managementData = []

    } else {
      this.drawerTitle1 = this.api.translate.instant('gincomeinfo.drawerTitle2');
      this.drawerData1.TYPE = 'P';
    }

    this.drawerData1.INCOME_INFORMATION_ID = this.data1.ID;
    this.drawerVisible1 = true;
  }

  get closeCallback1() {
    return this.drawerClose1.bind(this);
  }

  drawerClose1(): void {
    this.getData4();
    this.drawerVisible1 = false;
  }

  edit1(data: any): void {
    this.api.getAllAddressInformation(0, 0, this.sortKey, this.sortValue, "AND ID=" + data.ADDRESS_ID)
      .subscribe(data1 => {

        this.addressData = data1['data'][0];

        if (data.TYPE == 'B') {
          this.drawerTitle1 = this.api.translate.instant('gincomeinfo.drawerTitle3');
          this.buinessInfo.getData(data)
        } else {
          this.drawerTitle1 = this.api.translate.instant('gincomeinfo.drawerTitle4');
        }

        this.drawerData1 = Object.assign({}, data);
        this.addressinfoBussiness = Object.assign({}, this.addressData);
        this.drawerVisible1 = true;
        //call manufacturing call


      }, err => {
        ////console.log(err);
      });



    this.logtext = 'EDIT - BuisnessInformation form KEYWORD [E - BuisnessInformation] ';
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          ////console.log(successCode);
        }
        else {
          ////console.log(successCode);
        }
      });


  }

  add2() {
    this.drawerTitle2 = this.api.translate.instant('gincomeinfo.drawerTitle5');
    this.drawerData2 = new AgriInfo();
    this.agriaddressData = new Addressinfo();
    this.drawerData2.TYPE = 'C'
    this.drawerData2.APPLICANT_ID = this.APPLICANT_ID
    this.drawerData2.INCOME_INFORMATION_ID = this.data1.ID;
    this.drawerVisible2 = true;
  }

  get closeCallback2() {
    return this.drawerClose2.bind(this);
  }

  drawerClose2(): void {
    this.getData5();
    this.drawerVisible2 = false;
  }

  edit2(data: AgriInfo): void {

    this.api.getAllAddressInformation(0, 0, this.sortKey, this.sortValue, "AND ID=" + data.DETAILED_ADDRESS_ID)
      .subscribe(data1 => {
        ////console.log(data1['data'])
        this.agriaddressData = Object.assign({}, data1['data'][0]);
        this.drawerTitle2 = this.api.translate.instant('gincomeinfo.drawerTitle6');
        this.drawerData2 = Object.assign({}, data);

        ////console.log(this.agriaddressData)
        if (this.drawerData2.TYPE_OF_AGRICULTURE_LAND) {
          var v = this.drawerData2.TYPE_OF_AGRICULTURE_LAND.split(',');
          if (v.length == 2) {
            if (v[0] == "B" || v[1] == "B")
              this.drawerData2['bagayat'] = true;

            if (v[1] == "G" || v[0] == "G")
              this.drawerData2['jirayat'] = true;
          } else {
            if (v[0] == "B")
              this.drawerData2['bagayat'] = true;
            else
              this.drawerData2['jirayat'] = true;
          }
        }


        this.drawerVisible2 = true;

      }, err => {
        ////console.log(err);
      });



    this.logtext = 'EDIT - AgricultureInformation form KEYWORD [E - AgricultureInformation] ';
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          ////console.log(successCode);
        }
        else {
          ////console.log(successCode);
        }
      });
  }

  update() {

    var isOk = true;
    if (this.data1.INCOME_SOURCE_ID == 1 || this.data1.OTHER_INCOME_SOURCE_ID == 1 || this.data1.OTHER_INCOME_SOURCE_ID2 == 1) {
      if (
        this.addressinfoSalary.DISTRICT != undefined && this.addressinfoSalary.DISTRICT != "" &&
        this.addressinfoSalary.PINCODE != undefined && this.addressinfoSalary.PINCODE != "" &&
        this.addressinfoSalary.TALUKA != undefined && this.addressinfoSalary.TALUKA != "" &&
        this.addressinfoSalary.STATE != undefined && this.addressinfoSalary.STATE != "" &&
        this.addressinfoSalary.VILLAGE != undefined && this.addressinfoSalary.VILLAGE != ""
      ) {
      }
      else {
        this.message.error(this.api.translate.instant('common.message.error.address'), "");
        isOk = false
      }

      if (this.data2.ORGANISATION_NAME == undefined || this.data2.ORGANISATION_NAME.trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('gincomeinfo.message1'), "");
      }

      if (this.data2.CONTACT_NO_OF_EMPLOYER == undefined || this.data2.CONTACT_NO_OF_EMPLOYER.trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('gincomeinfo.message2'), "");
      }

      if (this.data2.POST_OF_EMPLOYMENT == undefined || this.data2.POST_OF_EMPLOYMENT.trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('gincomeinfo.message3'), "");
      }


      if (this.data2.GROSS_SALARY == undefined || this.data2.GROSS_SALARY.toString().trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('gincomeinfo.message5'), "");
      }


      if (this.data2.TOTAL_DEDUCTION == undefined || this.data2.TOTAL_DEDUCTION.toString().trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('gincomeinfo.message6'), "");
      }


      if (this.data2.TOTAL_DEDUCTION == undefined) {
        isOk = false;
        this.message.error(this.api.translate.instant('gincomeinfo.message6'), "");
      }


      if (this.data2.IS_LETTER_FOR_LOAN_DEDUCTION) {
        ////console.log("letter")
        if (this.fileList == undefined) {
          isOk = false;
          this.message.error(this.api.translate.instant('gincomeinfo.message8'), "");
        }
      }



      ////console.log(isOk)
      if (isOk) {
        if (this.data2.SALARY_PAID_TYPE == 'B') {
          if (this.data2.BANK_NAME == undefined) {
            this.data2.BANK_NAME = ""
          }
          if (this.data2.BRANCH_NAME == undefined) {
            this.data2.BRANCH_NAME = ""
          }
        }
        if (this.fileList != undefined && this.isPdf) {
          this.isButtonSpinning = true

          this.api.onUploadNewMethod(this.fileList[0], this.fileList[0].name.split(".").pop(), this.fkey)
            .subscribe(successCode => {
              if (successCode['code'] == '200') {
                ////console.log(successCode)
                ////console.log(successCode['data'][0]['L_KEY'])
                this.applicantDocument.DOCUMENT_KEY = successCode['data'][0]['L_KEY'];

                if (this.data2.APPLICANT_DOCUMENTS_ID != null && this.data2.APPLICANT_DOCUMENTS_ID > 0) {
                  ////console.log("in update")
                  this.applicantDocument.ID = this.data2.APPLICANT_DOCUMENTS_ID
                  this.applicantDocument.DOCUMENT_ID = 21;
                  this.applicantDocument.DOCUMENT_TITLE = this.api.translate.instant('gincomeinfo.text');
                  this.applicantDocument.DOCUMENT_DESCRIPTION = this.api.translate.instant('gincomeinfo.text');
                  this.applicantDocument.REMARK = '';
                  this.applicantDocument.IS_UPLOADED = 0;
                  this.applicantDocument.IS_COMPLUSORY = 0;
                  this.applicantDocument.IS_VERIFIED = 0;
                  this.applicantDocument.IS_APPROVED = 0;
                  this.applicantDocument.PROPOSAL_ID = this.PROPOSAL_ID;
                  this.applicantDocument.USER_ID = 0
                  ////console.log(this.applicantDocument)

                  this.api.updateApplicantDocument(this.applicantDocument)
                    .subscribe(successCode => {
                      if (successCode['code'] == "200") {
                        this.sendata();

                      } else {
                        this.message.error(this.api.translate.instant('common.message.error.updatefailed'), '');
                        this.isButtonSpinning = false;
                      }
                    });
                } else {
                  ////console.log("in insert")
                  this.applicantDocument.DOCUMENT_ID = 21;
                  this.applicantDocument.DOCUMENT_TITLE = this.api.translate.instant('gincomeinfo.text');
                  this.applicantDocument.DOCUMENT_DESCRIPTION = this.api.translate.instant('gincomeinfo.text');
                  this.applicantDocument.REMARK = '';
                  this.applicantDocument.IS_UPLOADED = 0;
                  this.applicantDocument.IS_COMPLUSORY = 0;
                  this.applicantDocument.IS_VERIFIED = 0;
                  this.applicantDocument.IS_APPROVED = 0;
                  this.applicantDocument.PROPOSAL_ID = this.PROPOSAL_ID;
                  this.applicantDocument.USER_ID = 0
                  ////console.log(this.applicantDocument)
                  this.api.createApplicantDocument(this.applicantDocument)
                    .subscribe(successCode => {
                      if (successCode['code'] == "200") {
                        this.api.getAllProposalDocuments(0, 0, 'ID', 'desc', '').subscribe(data => {
                          if (data['code'] == "200") {
                            this.data2.APPLICANT_DOCUMENTS_ID = data['data'][0]['ID']
                            this.sendata();
                          }
                        });

                      } else {
                        this.message.error(this.api.translate.instant('common.message.error.updatefailed'), '');
                        this.isButtonSpinning = false;
                      }
                    });
                }
              }
              else {
                this.message.error(this.api.translate.instant('common.message.error.updatefailed'), '');
                this.isButtonSpinning = false;
              }
            });
        } else {
          this.data2.APPLICANT_DOCUMENTS_ID = 0;
          this.sendata();
        }
      }
    }




  }

  disabledDate = (current) => {
    return new Date(new Date().getTime() - 24 * 60 * 60 * 1000) < current
  }

  disabledDateMonth = (current) => {
    return new Date().setMonth(new Date().getMonth() - 1) < current
  }

  isValidMobile(mobile) {
    const expression = /^[6-9]\d{9}$/;
    return expression.test(String("" + mobile).toLowerCase())
  }
  isValidlandline(landline) {
    const expression = /^[0-9]\d{2,4}\d{6,8}$/;
    return expression.test(String(landline))
  }
  isValidPincode(pincode) {
    const expression = /^[1-9][0-9]{5}/;
    return expression.test(String(pincode).toLowerCase())
  }
  sendata() {
    ////console.log(this.data2.RETIREMENT_DATE)
    ////console.log(this.data2)

    let addressId = 0

    if (this.data2.JOINING_DATE != undefined && this.data2.JOINING_DATE != '') {
      this.data2.JOINING_DATE = this.datePipe.transform(this.data2.JOINING_DATE, "yyyy-MM-dd")
    } else {
      this.data2.JOINING_DATE = ''
    }

    if (this.data2.RETIREMENT_DATE != undefined && this.data2.RETIREMENT_DATE != '') {
      this.data2.RETIREMENT_DATE = this.datePipe.transform(this.data2.RETIREMENT_DATE, "yyyy-MM-dd")
    } else {
      this.data2.RETIREMENT_DATE = ''
    }

    if (this.data2.LATEST_SALARY_MONTH != undefined && this.data2.LATEST_SALARY_MONTH != '') {
      this.data2.LATEST_SALARY_MONTH = this.datePipe.transform(this.data2.LATEST_SALARY_MONTH, "yyyy-MM-dd")
    } else {
      this.data2.LATEST_SALARY_MONTH = ''
    }

    this.data2.INCOME_INFORMATION_ID = this.data1.ID
    if (this.count == 0) {

      if ((this.isValidMobile(this.data2.CONTACT_NO_OF_EMPLOYER) || (this.data2.CONTACT_NO_OF_EMPLOYER.length >= 10 && this.data2.CONTACT_NO_OF_EMPLOYER.length <= 14)) && this.isValidPincode(this.addressinfoSalary.PINCODE)) {
        this.api.createAddressInformation(this.addressinfoSalary)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {

              this.api.getAllAddressInformation(0, 0, "ID", "desc", "").subscribe(data => {
                addressId = data['data'][0]['ID']
                this.data2.PLACE_OF_EMPLOYMENT = addressId
                this.api.createSalariedInformation(this.data2)
                  .subscribe(successCode => {
                    if (successCode['code'] == "200") {
                      this.extraApplicantInformation.IS_PROVIDED = true
                      this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
                        .subscribe(successCode => {
                          if (successCode['code'] == "200") {
                            this.demo.emit(false)
                          }
                          else {
                            this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
                          }
                        });
                      this.isButtonSpinning = false
                      this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
                    }
                    else {
                      this.logtext = 'Update & Close - SalryInformation form - ERROR - ' + JSON.stringify(this.data2) + " KEYWORD [U - SalryInformation ]";
                      this.api.addLog('A', this.logtext, this.api.emailId)
                        .subscribe(successCode => {
                          if (successCode['code'] == "200") {
                            ////console.log(successCode);
                            this.isButtonSpinning = false;

                          }
                          else {
                            ////console.log(successCode);
                          }
                        });

                      this.message.error(this.api.translate.instant('common.message.error.updatefailed'), "");

                    }
                  });


                this.logtext = 'save & Close - SalryInformation form - SUCCESS ' + JSON.stringify(this.data2) + " KEYWORD [U - SalryInformation ]";
                this.api.addLog('A', this.logtext, this.api.emailId)
                  .subscribe(successCode => {
                    if (successCode['code'] == "200") {
                      ////console.log(successCode);
                    }
                    else {
                      ////console.log(successCode);
                    }
                  });
                this.isButtonSpinning = false;

              }, err => {
                ////console.log(err);
              });

            } else {

              this.logtext = 'save & Close - SalryInformation form - ERROR - ' + JSON.stringify(this.data2) + " KEYWORD [U - SalryInformation ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    ////console.log(successCode);
                  }
                  else {
                    ////console.log(successCode);
                  }
                });

              this.message.error(this.api.translate.instant('common.message.error.updatefailed'), "");
            }
          });
      }
      else {
        this.message.error(this.api.translate.instant('common.message.error.wronginfo'), "");
      }
    }
    else {
      if ((this.isValidMobile(this.data2.CONTACT_NO_OF_EMPLOYER) || (this.data2.CONTACT_NO_OF_EMPLOYER.length >= 10 && this.data2.CONTACT_NO_OF_EMPLOYER.length <= 14)) && this.isValidPincode(this.addressinfoSalary.PINCODE)) {
        if (this.data2.PLACE_OF_EMPLOYMENT == 0) {
          this.api.createAddressInformation(this.addressinfoSalary)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                this.api.getAllAddressInformation(0, 0, "ID", "desc", "").subscribe(data => {
                  addressId = data['data'][0]['ID']
                  this.data2.PLACE_OF_EMPLOYMENT = addressId
                  this.api.updateSalariedInformation(this.data2)
                    .subscribe(successCode => {
                      if (successCode['code'] == "200") {
                        this.extraApplicantInformation.IS_PROVIDED = true
                        this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
                          .subscribe(successCode => {
                            if (successCode['code'] == "200") {
                              this.demo.emit(false)
                            }
                            else {
                              this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
                            }
                          });
                        //  this.save();
                        this.isButtonSpinning = false
                        this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
                      }
                      else {
                        this.logtext = 'Update & Close - SalryInformation form - ERROR - ' + JSON.stringify(this.data2) + " KEYWORD [U - SalryInformation ]";
                        this.api.addLog('A', this.logtext, this.api.emailId)
                          .subscribe(successCode => {
                            if (successCode['code'] == "200") {
                              ////console.log(successCode);
                              this.isButtonSpinning = false;

                            }
                            else {
                              ////console.log(successCode);
                            }
                          });

                        this.message.error(this.api.translate.instant('common.message.error.updatefailed'), "");

                      }
                    });


                  this.logtext = 'save & Close - SalryInformation form - SUCCESS ' + JSON.stringify(this.data2) + " KEYWORD [U - SalryInformation ]";
                  this.api.addLog('A', this.logtext, this.api.emailId)
                    .subscribe(successCode => {
                      if (successCode['code'] == "200") {
                        ////console.log(successCode);
                      }
                      else {
                        ////console.log(successCode);
                      }
                    });
                  this.isButtonSpinning = false;

                }, err => {
                  ////console.log(err);
                });

              } else {

                this.logtext = 'save & Close - SalryInformation form - ERROR - ' + JSON.stringify(this.data2) + " KEYWORD [U - SalryInformation ]";
                this.api.addLog('A', this.logtext, this.api.emailId)
                  .subscribe(successCode => {
                    if (successCode['code'] == "200") {
                      ////console.log(successCode);
                    }
                    else {
                      ////console.log(successCode);
                    }
                  });

                this.message.error(this.api.translate.instant('common.message.error.updatefailed'), "");
              }
            });
        }
        else {

          if (this.isValidMobile(this.data2.CONTACT_NO_OF_EMPLOYER) || this.isValidlandline(this.data2.CONTACT_NO_OF_EMPLOYER) && this.isValidPincode(this.addressinfoSalary.PINCODE)) {
            ////console.log("id")
            this.isButtonSpinning = true

            this.api.updateSalariedInformation(this.data2)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  this.api.updateAddressInformation(this.addressinfoSalary)
                    .subscribe(successCode => {
                      ////console.log(successCode)
                      if (successCode['code'] == "200") {
                        this.isButtonSpinning = false
                        this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
                        // this.save();
                        this.extraApplicantInformation.IS_PROVIDED = true
                        this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
                          .subscribe(successCode => {
                            if (successCode['code'] == "200") {
                              this.demo.emit(false)
                            }
                            else {
                              this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
                            }
                          });

                        this.logtext = 'Update & Close - SalryInformation form - SUCCESS ' + JSON.stringify(this.data2) + " KEYWORD [U - SalryInformation ]";
                        this.api.addLog('A', this.logtext, this.api.emailId)
                          .subscribe(successCode => {
                            if (successCode['code'] == "200") {
                              ////console.log(successCode);
                            }
                            else {
                              ////console.log(successCode);
                            }
                          });


                      } else {

                        this.logtext = 'Update & Close - SalryInformation form - ERROR - ' + JSON.stringify(this.data2) + " KEYWORD [U - SalryInformation ]";
                        this.api.addLog('A', this.logtext, this.api.emailId)
                          .subscribe(successCode => {
                            if (successCode['code'] == "200") {
                              ////console.log(successCode);
                            }
                            else {
                              ////console.log(successCode);
                            }
                          });

                        this.message.error(this.api.translate.instant('common.message.error.updatefailed'), "");
                        this.isButtonSpinning = false;
                      }
                    });
                }
                else {

                  this.logtext = 'Update & Close - SalryInformation form - ERROR - ' + JSON.stringify(this.data2) + " KEYWORD [U - SalryInformation ]";
                  this.api.addLog('A', this.logtext, this.api.emailId)
                    .subscribe(successCode => {
                      if (successCode['code'] == "200") {
                        ////console.log(successCode);
                      }
                      else {
                        ////console.log(successCode);
                      }
                    });
                  this.message.error(this.api.translate.instant('common.message.error.updatefailed'), "");
                  this.isButtonSpinning = false;
                }
              });
          }
          else {
            this.message.error(this.api.translate.instant('common.message.error.compinfo'), "");
          }


        }
      }
      else {
        this.message.error(this.api.translate.instant('common.message.error.wronginfo'), "");
      }
    }



  }

  save() {
    ////console.log(this.data1)


  }

  change(value) {
    ////console.log(value)
    ////console.log("change called")
  }

  VerifyUpdate() {

    if (this.extraApplicantInformation.IS_PROVIDED) {

      if (this.extraApplicantInformation.REMARK != "") {
        this.isButtonVerifySpinning = true
        this.extraApplicantInformation.IS_VERIFIED = true
        this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.isButtonVerifySpinning = false;
              this.demo.emit(false)
              var LOG_ACTION = ''
              var DESCRIPTION = ''
              if (this.extraApplicantInformation.IS_APPROVED == true) {
                LOG_ACTION = 'Income info Tab information Verified'

                DESCRIPTION = sessionStorage.getItem('userName') + ' has checked and approved the Income info for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK
              } else {
                LOG_ACTION = 'Income info Tab information Rejected'
                DESCRIPTION = sessionStorage.getItem('userName') + 'has checked and rejected the Income info for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK

              }
              var LOG_TYPE = 'I'
              this.api.proposalLogInformation(this.extraApplicantInformation.PROPOSAL_ID, this.extraApplicantInformation.CURRENT_STAGE_ID, 0, LOG_ACTION, Number(sessionStorage.getItem("userId")), DESCRIPTION, LOG_TYPE)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                  }
                });
            }
            else {
              this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
              this.isButtonVerifySpinning = false;
            }
          });
      }
      else {
        this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
      }
    }
  }


  clear() {
    this.isPdf = false;
    this.fileList = null;
  }

  focusss(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data2.RETIREMENT_DATE = undefined;
    }
  }

  focusss1(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data2.JOINING_DATE = undefined;
    }
  }

  focusss2(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data2.LATEST_SALARY_MONTH = undefined;
    }
  }

  handleChange(event: { target: { files: FileList; }; }): void {
    this.fileList = event.target.files;
    if (this.fileList.length > 0) {
      if (this.fileList[0].type === 'application/pdf') {
        this.isPdf = true;
      } else {
        this.isPdf = false;
        this.message.error(this.api.translate.instant('common.notpdf'), '');
      }
    }
  }

  updateIncomeInformation() {
    this.confirmModal = this.modal.confirm({
      nzTitle: this.api.translate.instant('common.confirmModal.addnzTitle'),
      nzContent: this.api.translate.instant('common.confirmModal.addnzContent'),
      nzOnOk: () =>
        new Promise((resolve, reject) => {

          ////console.log(this.data1)
          if (this.data1.ID) {
            this.data1.TYPE = "C"
            this.data1.APPLICANT_ID = this.APPLICANT_ID
            this.api.updateIncomeInformation(this.data1)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
                  setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);


                  sessionStorage.setItem("C_IS_SAVED", "1")

                  this.logtext = 'Update & Close - IncomeInformation form - SUCCESS ' + JSON.stringify(this.data1) + " KEYWORD [U - IncomeInformation ]";
                  this.api.addLog('A', this.logtext, this.api.emailId)
                    .subscribe(successCode => {
                      if (successCode['code'] == "200") {
                        ////console.log(successCode);
                      }
                      else {
                        ////console.log(successCode);
                      }
                    });

                  this.getData();
                }
                else {

                  this.logtext = 'Update & Close - IncomeInformation form - ERROR - ' + JSON.stringify(this.data1) + " KEYWORD [U - IncomeInformation ]";
                  this.api.addLog('A', this.logtext, this.api.emailId)
                    .subscribe(successCode => {
                      if (successCode['code'] == "200") {
                        ////console.log(successCode);
                      }
                      else {
                        ////console.log(successCode);
                      }
                    });

                  this.message.error(this.api.translate.instant('common.message.error.failed'), "");
                }
              });
          }
        }).catch(() => { })//console.log('माहिती बदल करण्यात अयशस्वी!'))
    });
  }

  cancel(): void {

  }

  confirm2(): void {
    this.extraApplicantInformation.IS_APPROVED = false;
    if (this.extraApplicantInformation.REMARK == undefined || this.extraApplicantInformation.REMARK.trim() == "") {

      this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
    } else {

      this.VerifyUpdate();
    }

  }

  confirm(): void {
    this.extraApplicantInformation.REMARK = " "
    this.extraApplicantInformation.IS_APPROVED = true;
    this.VerifyUpdate();
  }
}
