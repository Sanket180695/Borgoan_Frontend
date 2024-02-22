import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import {  Incomeinformation } from 'src/app/Models/PersonalProposal/incomeinformation';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { NzNotificationService, NzModalService, NzModalRef } from 'ng-zorro-antd';
import { Applicantdocument } from 'src/app/Models/Applicant/applicantdocument';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { DatePipe } from '@angular/common';
import { BusinessInfo } from 'src/app/Models/PersonalProposal/business-info';
import { AgriInfo } from 'src/app/Models/PersonalProposal/agri-info';
import { SalariedInfo } from 'src/app/Models/PersonalProposal/salaried-info';
import { BusinessInfoComponent } from '../business-info/business-info.component';
import { HouseShopRentInfo } from 'src/app/Models/PersonalProposal/Houseshoprentinfo';
import { AgriIncomeInfo } from 'src/app/Models/PersonalProposal/argriincomeinfo';
import { ExpenditureInfo } from 'src/app/Models/PersonalProposal/expenditureinfo';


@Component({
  selector: 'app-income-info',
  templateUrl: './income-info.component.html',
  styleUrls: ['./income-info.component.css'],
  providers: [DatePipe]

})
export class IncomeInfoComponent implements OnInit {
  @Output() demo: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() data1: Incomeinformation;
  @Input() PROPOSAL_ID: number
  @Input() APPLICANT_ID: number
  @Input() CURRENT_STAGE_ID: number;
  @Input() oldIndex: number
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();
  @Input() LOAN_KEY: Number;
  @ViewChild(BusinessInfoComponent, { static: false }) buinessInfo: BusinessInfoComponent;
  browserLang = '';
  formTitle = this.api.translate.instant('gincomeinfo.formTitle');
  pageIndex = 1;
  pageSize = 100;
  incomeTypeData11 = [];
  incomeTypeData2 = [];
  incomeTypeData3 = [];
  incomeTypeData4 = [];
  incomeTypeData5 = [];

  isSpinning = false;
  isSpinning2 = false;
  isSpinning3 = false;
  isSpinning4 = false;
  totalRecords: number;

  logtext: string = ""
  dataList1 = [];
  dataList11 = [];
  dataList2 = [];
  dataList4 = [];
  dataList27 = [];
  dataList28 = [];
  dataList14 = [];
  dataList29 = [];
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
  agriii:AgriIncomeInfo= new AgriIncomeInfo();
  addressinfoBussiness: Addressinfo = new Addressinfo();
  houseRentInfo:Incomeinformation = new Incomeinformation(); 
  addressinfoCurrent: Addressinfo = new Addressinfo();
  drawerData30: ExpenditureInfo = new ExpenditureInfo();
  drawerdata12: Addressinfo = new Addressinfo()
  drawerVisible2: boolean;
  drawerVisible3: boolean;
  drawerVisible7: boolean;
  drawerVisible25:boolean
  drawerVisible8: boolean;
  drawerVisible26:boolean
  drawerVisible9: boolean;
  drawerTitle2: string;
  drawerTitle3: string;
  drawerTitle7: string;
  drawerTitle25:string;
  drawerTitle26:string
  drawerTitle8: string;
  drawerTitle9: string;
  drawerData2: AgriIncomeInfo = new AgriIncomeInfo();
  drawerData3: AgriIncomeInfo = new AgriIncomeInfo();
  drawerData25:HouseShopRentInfo = new HouseShopRentInfo();
  drawerData26:AgriIncomeInfo = new AgriIncomeInfo()
  drawerdataa:SalariedInfo = new SalariedInfo()
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
salrieddata: SalariedInfo = new SalariedInfo()
  agriaddressData: Addressinfo = new Addressinfo();
  HouseRentInfoData: HouseShopRentInfo = new HouseShopRentInfo();
  fileList: FileList
  extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  isButtonVerifySpinning = false
  isButtonSpinning1 = false
  confirmModal?: NzModalRef;
  incomeSourceDisable = false
  count
  financeVisible = false
  userId = sessionStorage.getItem("userId")
  today = new Date()
  fkey = this.api.documentFkey;
  talukas = []
  roleId = sessionStorage.getItem("roleId")
  districts = []
  states = []
  pincodes = []
  options = []
  constructor(
    private api: ApiService, private modal: NzModalService, private datePipe: DatePipe, private message: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.getData();
    this.loadInfo();
    this.getAddresslist();
    this.browserLang = localStorage.getItem('locale');
  }
  onChanges(value: string): void {
    this.talukas = [];
    this.options.filter(option => {
      if (option.TALUKA.toLowerCase().includes(value.toLowerCase())) {
        this.talukas.push(option);
      }
    });

    if (this.talukas.length > 0) {
      this.addressinfoSalary.DISTRICT = this.talukas[0]['DISTRICT']
      this.addressinfoSalary.STATE = this.talukas[0]['STATE']
      this.addressinfoSalary.PINCODE = this.talukas[0]['PINCODE']
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

  loadInfo() {
    this.browserLang = localStorage.getItem('locale');
    let filter = " AND EXTRA_INFORMATION_ID=2 AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND TYPE='B'"
    this.api.getAllApplicantExtraInformation(0, 0, "SEQ_NO", "asc", filter).subscribe(data => {
      this.extraApplicantInformation = data['data'][0]
      //console.log(this.extraApplicantInformation)
    }, err => {
      //console.log(err);
    });
  }

  getNetSalary() {
    if (this.data2.GROSS_SALARY == undefined) {
      this.data2.NET_SALARY = 0;
    } else {


      if (this.data2.TOTAL_DEDUCTION <= this.data2.GROSS_SALARY) {
        //console.log(this.data2.TOTAL_DEDUCTION)
        //console.log(this.data2.GROSS_SALARY)
        this.data2.TOTAL_DEDUCTION = this.data2.PROVIDANT_FUND + this.data2.INSURANCE + this.data2.INCOME_TAX + this.data2.LOAN_INSTALLMENT + this.data2.OTHER_DEDUCTION
        this.data2.NET_SALARY = this.data2.GROSS_SALARY - this.data2.TOTAL_DEDUCTION;
      }
      else {
        //console.log(this.data2.TOTAL_DEDUCTION)
        //console.log(this.data2.GROSS_SALARY)
        this.data2.TOTAL_DEDUCTION = 0
        this.data2.NET_SALARY = 0
      }

    }
  }

  getData() {
    this.isSpinning = true
    this.api.getAllIncomeSocurce(0, 0, this.sortKey, this.sortValue, " AND IS_ACTIVE = 1")
      .subscribe(data => {
        this.incomeTypeData11 = data['data'];
        console.log(this.incomeTypeData11,"ok");
        
      }, err => {
        //console.log(err);
      });

    let filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND TYPE='B'"
    this.api.getAllIncomeInformation(0, 0, this.sortKey, this.sortValue, filter)
      .subscribe(data => {
        console.log("income get")
        console.log(data)
        if (data['code'] == "200" && data['data'].length > 0) {

          this.data1 = data['data'][0];
          this.getData3();
          this.getData4();
          this.getData5();
          this.getData6();
          this.getData55();
          this.getData53();


// getss
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

          if (this.data1.INCOME_SOURCE_ID == 5 || this.data1.OTHER_INCOME_SOURCE_ID == 5) {
            this.getData5();
          }

          if (this.data1.INCOME_SOURCE_ID == 5 || this.data1.OTHER_INCOME_SOURCE_ID == 5) {
            this.getData6();
          }
          this.isSpinning = false

        }
      }, err => {
        //console.log(err);
      });
  }

  getData3() {
    this.api.getAllSalariedInformation(0, 0, this.sortKey, this.sortValue, "AND INCOME_INFORMATION_ID = " + this.data1.ID)
      .subscribe(data => {
        console.log("salary info", data['data'])
       
        if (data['count'] > 0) {
          this.data2 = data['data'][0];
          this.dataList27 = data['data'];
          this.data2.SALARY_PAID_TYPE = "B"
          this.api.getAllAddressInformation(0, 0, this.sortKey, this.sortValue, "AND ID =" + this.data2.PLACE_OF_EMPLOYMENT)
            .subscribe(data => {
              //console.log(data)
              if (data['code'] == "200") {
                if (data['count'] != 0) { this.addressinfoSalary = data['data'][0]; }
              }
            }, err => {
              //console.log(err);
            });
        }
        else {
          this.count = 0
        }

      }, err => {
        //console.log(err);
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
          console.log('agri data : ',successCode['data']);
          this.dataList2 = successCode['data'];
        }
      });
  }

  getData53() {
    this.loadingRecords2 = true;

    this.api.getAllAgricultureInformation(1, 20, 'ID', "asc", "AND INCOME_INFORMATION_ID = " + this.data1.ID)
      .subscribe(successCode => {
        this.loadingRecords2 = false;
        if (successCode['count'] > 0) {

          this.dataList11 = successCode['data'];
          console.log("dataList11",this.dataList11)
          // this.agriii.ANNUAL_INCOME_FROM_THIS_LAND = successCode['data'][0]['ANNUAL_INCOME_FROM_THIS_LAND']
          // this.agriii.CURRENT_AGRICULTURE_PRODUCT = successCode['data'][0]['CURRENT_AGRICULTURE_PRODUCT']

          console.log(this.agriii.ANNUAL_INCOME_FROM_THIS_LAND)
        }
      });
  }

  getData55() {
    this.loadingRecords2 = true;

    this.api.getAllExpenditureInformation(1, 20, 'ID', "asc", "AND INCOME_INFORMATION_ID = " + this.data1.ID)
      .subscribe(successCode => {
        this.loadingRecords2 = false;
        if (successCode['count'] > 0) {
          this.dataList29 = successCode['data'];
        }
      });
  }
  

  getData6() {
    this.loadingRecords2 = true;
// houserentinfo get
    this.api.getAllHouseRentInfo(1, 20, 'ID', "asc", "AND INCOME_INFORMATION_ID = " + this.data1.ID)
      .subscribe(successCode => {
        this.loadingRecords2 = false;
        if (successCode['count'] > 0) {
          this.dataList14 = successCode['data'];
          console.log(this.dataList14)
        }
      });
  }

  getUrl(applicantDocumentId) {
    this.isSpinning = true
    //console.log(applicantDocumentId)

    this.api.getAllProposalDocuments(0, 0, this.sortKey, this.sortValue, "AND ID=" + this.data2.APPLICANT_DOCUMENTS_ID)
      .subscribe(data => {
        //console.log(data)
        if (data['code'] == "200") {
          if (data['count'] > 0) {
            this.applicantDocument = data['data'][0];
            //console.log(this.applicantDocument)
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
                  //console.log(err);
                });
            }
          }
        }
      }, err => {
        //console.log(err);
      });
  }

  changeIncomeSource(incomeSourceId) {
    this.incomeTypeData2 = [];
    this.incomeTypeData2 = this.incomeTypeData11.filter((item) => item.ID !== this.data1.INCOME_SOURCE_ID);
    // this.incomeTypeData2.splice(0, 0, { 'ID': 0, 'NAME': this.api.translate.instant('gincomeinfo.arraytext') });
    sessionStorage.setItem("incomesourceId", incomeSourceId);
    //console.log(this.data1.OTHER_INCOME_SOURCE_ID)
    this.changeOtherIncomeSource(this.data1.OTHER_INCOME_SOURCE_ID)
    if (this.data1.INCOME_SOURCE_ID == 1) {
      this.getData3()
    }

    if (this.data1.INCOME_SOURCE_ID == 2 || this.data1.INCOME_SOURCE_ID == 4) {
      this.getData4();
    }

    if (this.data1.INCOME_SOURCE_ID == 5) {
      this.getData5();
    }

  }

  changeOtherIncomeSource(otherincomeSourceId) {
    this.incomeTypeData3 = [];
    this.incomeTypeData3 = this.incomeTypeData11.filter((item) => item.ID !== this.data1.INCOME_SOURCE_ID && item.ID !== this.data1.OTHER_INCOME_SOURCE_ID);
    // this.incomeTypeData3.splice(0, 0, { 'ID': 0, 'NAME': this.api.translate.instant('gincomeinfo.arraytext') });
    sessionStorage.setItem("otherincomesourceId", otherincomeSourceId)
    this.changeOtherIncomeSource2(this.data1.OTHER_INCOME_SOURCE_ID2)
    if (this.data1.OTHER_INCOME_SOURCE_ID == 1) {
      this.getData3()
    }

    if (this.data1.OTHER_INCOME_SOURCE_ID == 2 || this.data1.OTHER_INCOME_SOURCE_ID == 4) {
      this.getData4();
    }

    if (this.data1.OTHER_INCOME_SOURCE_ID == 5) {
      this.getData5();
    }
  }

  changeOtherIncomeSource2(otherIncomeSourceId2) {
    this.incomeTypeData4 = [];
    this.incomeTypeData4 = this.incomeTypeData11.filter((item) => item.ID !== this.data1.INCOME_SOURCE_ID && item.ID !== this.data1.OTHER_INCOME_SOURCE_ID && item.ID !== this.data1.OTHER_INCOME_SOURCE_ID2 );
    // this.incomeTypeData4.splice(0, 0, { 'ID': 0, 'NAME': this.api.translate.instant('gincomeinfo.arraytext') });
    // sessionStorage.setItem("otherincomesourceId", otherincomeSourceId)
    this.changeOtherIncomeSource4(this.data1.OTHER_INCOME_SOURCE_ID3)
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


  changeOtherIncomeSource4(otherIncomeSourceId3) {
    this.incomeTypeData5 = [];
    this.incomeTypeData5 = this.incomeTypeData11.filter((item) => item.ID !== this.data1.INCOME_SOURCE_ID && item.ID !== this.data1.OTHER_INCOME_SOURCE_ID && item.ID !== this.data1.OTHER_INCOME_SOURCE_ID2 && item.ID !== this.data1.OTHER_INCOME_SOURCE_ID3);
    // this.incomeTypeData5.splice(0, 0, { 'ID': 0, 'NAME': this.api.translate.instant('gincomeinfo.arraytext') });
    // sessionStorage.setItem("otherincomesourceId", otherincomeSourceId)
    this.changeOtherIncomeSource5(this.data1.OTHER_INCOME_SOURCE_ID4)
    sessionStorage.setItem("otherincomesourceId2", otherIncomeSourceId3)

    if (this.data1.OTHER_INCOME_SOURCE_ID3 == 1) {
      this.getData3()
    }

    if (this.data1.OTHER_INCOME_SOURCE_ID3 == 2 || this.data1.OTHER_INCOME_SOURCE_ID3 == 4) {
      this.getData4();
    }

    if (this.data1.OTHER_INCOME_SOURCE_ID3 == 3) {
      this.getData5();
    }

  }

  changeOtherIncomeSource5(otherIncomeSourceId4){

    // this.changeOtherIncomeSource5(this.data1.OTHER_INCOME_SOURCE_ID4)
    sessionStorage.setItem("otherincomesourceId2", otherIncomeSourceId4)

    if (this.data1.OTHER_INCOME_SOURCE_ID4 == 1) {
      this.getData3()
    }

    if (this.data1.OTHER_INCOME_SOURCE_ID4 == 2 || this.data1.OTHER_INCOME_SOURCE_ID4 == 4) {
      this.getData4();
    }

    if (this.data1.OTHER_INCOME_SOURCE_ID4 == 3) {
      this.getData5();
    }


  }




  getname(values) {
    if (values) {
      var v = values.split(',');
      var string = '';
      if (v.length == 2) {
        if (v[0] == "B" || v[1] == "B")
          string = string + this.api.translate.instant('gincomeinfo.bagayat')

        if (v[1] == "G" || v[0] == "G")
          string = string + ', ' + this.api.translate.instant('gincomeinfo.jirayat')
      } else {
        if (v[0] == "B")
          string = this.api.translate.instant('gincomeinfo.bagayat')
        else
          string = this.api.translate.instant('gincomeinfo.jirayat')
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
      this.drawerTitle1 = this.api.translate.instant('gincomeinfo.drawerTitle1')
      this.drawerData1.TYPE = 'B';
      this.buinessInfo.dataList4 = []
      this.buinessInfo.dataList5 = []
      this.buinessInfo.manufacturingProcessData = []
      this.buinessInfo.managementData = []

    } else {
      this.drawerTitle1 = this.api.translate.instant('gincomeinfo.drawerTitle2')
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
          this.drawerTitle1 = this.api.translate.instant('gincomeinfo.drawerTitle3')
          this.buinessInfo.getData(data)
        } else {
          this.drawerTitle1 = this.api.translate.instant('gincomeinfo.drawerTitle4')
        }

        this.drawerData1 = Object.assign({}, data);
        this.addressinfoBussiness = Object.assign({}, this.addressData);
        this.drawerVisible1 = true;
        //call manufacturing call


      }, err => {
        //console.log(err);
      });



    this.logtext = 'EDIT - BuisnessInformation form KEYWORD [E - BuisnessInformation] ';
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

  add2() {
    this.drawerTitle2 = this.api.translate.instant('gincomeinfo.drawerTitle7')
    this.drawerData2 = new AgriIncomeInfo();
    // this.agriaddressData = new Addressinfo();
    this.drawerData2.INCOME_INFORMATION_ID = this.data1.ID;
    // this.drawerData2.TYPE = "B"
    // this.drawerData2.APPLICANT_ID = this.APPLICANT_ID
    this.drawerVisible2 = true;
  }
  add3() {
    this.drawerTitle3 = this.api.translate.instant('gincomeinfo.drawerTitle7')
    this.drawerData3 = new AgriIncomeInfo();
    // this.HouseRentInfoData = new HouseRentInfo();
    this.drawerData3.INCOME_INFORMATION_ID = this.data1.ID;
    // this.drawerData3.TYPE = "B"
    // this.drawerData3.APPLICANT_ID = this.APPLICANT_ID
    this.drawerVisible3 = true;
  }


  add25() {
    this.drawerTitle25 = 'House Info' 
    this.drawerData25 = new HouseShopRentInfo();
    // this.HouseRentInfoData = new HouseRentInfo();
    // this.drawerData25.ID = this.data1.ID;
    this.drawerData25.INCOME_INFORMATION_ID = this.data1.ID;
    // this.drawerData3.TYPE = "B"
    // this.drawerData25.APPLICANT_ID = this.APPLICANT_ID
    this.drawerVisible25 = true;
  }


  add7() {
    this.drawerTitle7 = "Add Salary Information"
    this.drawerdataa = new SalariedInfo();
    // this.HouseRentInfoData = new HouseRentInfo();
    this.drawerdataa.INCOME_INFORMATION_ID = this.data1.ID;
    // this.drawerData3.TYPE = "B"
    // this.drawerData3.APPLICANT_ID = this.APPLICANT_ID
    this.drawerVisible7 = true;
  }
  add8() {
    this.drawerTitle8 = "Add Agriculture Information"
    this.drawerData26 = new AgriIncomeInfo();
    // this.HouseRentInfoData = new HouseRentInfo();
    this.drawerData26.INCOME_INFORMATION_ID = this.data1.ID;
    // this.drawerData3.TYPE = "B"
    // this.drawerData3.APPLICANT_ID = this.APPLICANT_ID
    this.drawerVisible26 = true;
  }

  add9() {
    this.drawerTitle9 = "Add Expenditure Information"
    this.drawerData30 = new ExpenditureInfo();
    // this.HouseRentInfoData = new HouseRentInfo();
    this.drawerData30.INCOME_INFORMATION_ID = this.data1.ID;
    // this.drawerData3.TYPE = "B"
    // this.drawerData3.APPLICANT_ID = this.APPLICANT_ID
    this.drawerVisible9 = true;
  }

  get closeCallback2() {
    return this.drawerClose2.bind(this);
  }
 
  drawerClose2(): void {
    this.getData53();
    this.drawerVisible2 = false;
  }

  get closeCallback3() {
    return this.drawerClose3.bind(this);
  }

  get closeCallback25(){
    return this.drawerClose25.bind(this); 
  }
  drawerClose3(): void {
    this.getData6();
    this.drawerVisible3 = false;
  }

  drawerClose25(): void {
    // this.getData6();
    this.getData6()
    this.drawerVisible25 = false;
  }

  get closeCallback7() {
    return this.drawerClose7.bind(this);
  }
  drawerClose7(): void {
    this.getData3();
    this.drawerVisible7 = false;
  }

  get closeCallback26() {
    return this.drawerClose26.bind(this);
  }
  drawerClose26(): void {
    this.getData5();
    this.drawerVisible26 = false;
  }
  get closeCallback9() {
    return this.drawerClose9.bind(this);
  }
  drawerClose9(): void {
    this.getData55();
    this.drawerVisible9 = false;
  }
  edit8(data: AgriIncomeInfo): void {

    // this.api.getAllAddressInformation(0, 0, this.sortKey, this.sortValue, "AND ID=" + data.DETAILED_ADDRESS_ID)
    //   .subscribe(data1 => {
    //console.log(data1['data'])
    this.drawerData26 = new AgriIncomeInfo();
    this.drawerTitle2 = this.api.translate.instant('gincomeinfo.drawerTitle8')
    this.drawerData26 = Object.assign({}, data);

    //console.log(this.agriaddressData)
    // if (this.drawerData2.TYPE_OF_AGRICULTURE_LAND) {
    //   var v = this.drawerData2.TYPE_OF_AGRICULTURE_LAND.split(',');
    //   if (v.length == 2) {
    //     if (v[0] == "B" || v[1] == "B")
    //       this.drawerData2['bagayat'] = true;

    //     if (v[1] == "G" || v[0] == "G")
    //       this.drawerData2['jirayat'] = true;
    //   } else {
    //     if (v[0] == "B")
    //       this.drawerData2['bagayat'] = true;
    //     else
    //       this.drawerData2['jirayat'] = true;
    //   }
    // }


    this.drawerVisible26 = true;

    // }, err => {
    //console.log(err);
    // });



    this.logtext = 'EDIT - OtherincomeInformation form KEYWORD [E - OtherincomeInformation] ';
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
  
  edit2(agriii: AgriIncomeInfo): void {

    // this.api.getAllAddressInformation(0, 0, this.sortKey, this.sortValue, "AND ID=" + data.DETAILED_ADDRESS_ID)
    //   .subscribe(data1 => {
    //console.log(data1['data'])
    this.agriaddressData = new Addressinfo();
    this.drawerTitle2 = this.api.translate.instant('gincomeinfo.drawerTitle8')
    this.drawerData2 = Object.assign({}, agriii);

    //console.log(this.agriaddressData)
    // if (this.drawerData2.TYPE_OF_AGRICULTURE_LAND) {
    //   var v = this.drawerData2.TYPE_OF_AGRICULTURE_LAND.split(',');
    //   if (v.length == 2) {
    //     if (v[0] == "B" || v[1] == "B")
    //       this.drawerData2['bagayat'] = true;

    //     if (v[1] == "G" || v[0] == "G")
    //       this.drawerData2['jirayat'] = true;
    //   } else {
    //     if (v[0] == "B")
    //       this.drawerData2['bagayat'] = true;
    //     else
    //       this.drawerData2['jirayat'] = true;
    //   }
    // }


    this.drawerVisible2 = true;

    // }, err => {
    //console.log(err);
    // });



    this.logtext = 'EDIT - OtherincomeInformation form KEYWORD [E - OtherincomeInformation] ';
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

  edit25(house:HouseShopRentInfo){

    // this.agriaddressData = new Addressinfo();
    this.drawerTitle25 = 'House Info '
    this.drawerData25 = Object.assign({}, house);

    this.drawerVisible25 = true;

    // }, err => {
    //console.log(err);
    // });



    this.logtext = 'EDIT - OtherincomeInformation form KEYWORD [E - OtherincomeInformation] ';
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

  edit7(data1: SalariedInfo): void {
    console.log(data1)
    this.drawerdataa = new SalariedInfo();
    this.drawerdata12 = new Addressinfo();
    this.drawerTitle2 = this.api.translate.instant('gincomeinfo.drawerTitle8')
    this.drawerdataa = Object.assign({}, data1);
    this.api.getAllAddressInformation(0, 0, this.sortKey, this.sortValue, "AND ID=" + data1.PLACE_OF_EMPLOYMENT)
      .subscribe(data1 => {
    console.log(data1['data'])
    this.drawerdata12 =data1['data'][0]

    //console.log(this.agriaddressData)
    // if (this.drawerData2.TYPE_OF_AGRICULTURE_LAND) {
    //   var v = this.drawerData2.TYPE_OF_AGRICULTURE_LAND.split(',');
    //   if (v.length == 2) {
    //     if (v[0] == "B" || v[1] == "B")
    //       this.drawerData2['bagayat'] = true;

    //     if (v[1] == "G" || v[0] == "G")
    //       this.drawerData2['jirayat'] = true;
    //   } else {
    //     if (v[0] == "B")
    //       this.drawerData2['bagayat'] = true;
    //     else
    //       this.drawerData2['jirayat'] = true;
    //   }
    


    this.drawerVisible7 = true;

    }, err => {
    console.log(err);
    });



    this.logtext = 'EDIT - OtherincomeInformation form KEYWORD [E - OtherincomeInformation] ';
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
  edit9(data: ExpenditureInfo): void {

    // this.api.getAllAddressInformation(0, 0, this.sortKey, this.sortValue, "AND ID=" + data.DETAILED_ADDRESS_ID)
    //   .subscribe(data1 => {
    //console.log(data1['data'])
    this.drawerData30 = new ExpenditureInfo();
    this.drawerTitle2 = this.api.translate.instant('gincomeinfo.drawerTitle8')
    this.drawerData30 = Object.assign({}, data);

    //console.log(this.agriaddressData)
    // if (this.drawerData2.TYPE_OF_AGRICULTURE_LAND) {
    //   var v = this.drawerData2.TYPE_OF_AGRICULTURE_LAND.split(',');
    //   if (v.length == 2) {
    //     if (v[0] == "B" || v[1] == "B")
    //       this.drawerData2['bagayat'] = true;

    //     if (v[1] == "G" || v[0] == "G")
    //       this.drawerData2['jirayat'] = true;
    //   } else {
    //     if (v[0] == "B")
    //       this.drawerData2['bagayat'] = true;
    //     else
    //       this.drawerData2['jirayat'] = true;
    //   }
    // }


    this.drawerVisible9 = true;

    // }, err => {
    //console.log(err);
    // });



    this.logtext = 'EDIT - OtherincomeInformation form KEYWORD [E - OtherincomeInformation] ';
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
  update2() {
    this.extraApplicantInformation.IS_PROVIDED = true
    this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          this.demo.emit(false);
        }
        else {
          this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
        }
        this.isButtonSpinning = false;
      });

  }

  update() {

    var isOk = true;
    if (this.data1.INCOME_SOURCE_ID == 1 || this.data1.OTHER_INCOME_SOURCE_ID == 1 || this.data1.OTHER_INCOME_SOURCE_ID2 == 1) {


      if (this.data2.ORGANISATION_NAME == undefined) {
        this.data2.ORGANISATION_NAME = " "
      }

      if (this.data2.CONTACT_NO_OF_EMPLOYER == undefined) {
        this.data2.CONTACT_NO_OF_EMPLOYER = " "
      }

      if (this.data2.POST_OF_EMPLOYMENT == undefined) {
        this.data2.POST_OF_EMPLOYMENT = " "
      }


      if (this.data2.GROSS_SALARY == undefined) {
        this.data2.GROSS_SALARY = 0
      }
      if (this.data2.TOTAL_DEDUCTION == undefined) {
        this.data2.TOTAL_DEDUCTION = 0
      }
      if (this.data2.NET_SALARY == undefined) {
        this.data2.NET_SALARY = 0
      }


      this.data2.BANK_NAME = " "
      this.data2.BRANCH_NAME = " "
      this.data2.SALARY_PAID_TYPE = 'B'
      if (this.addressinfoBussiness.HOUSE_NO == undefined) this.addressinfoBussiness.HOUSE_NO = "";
      if (this.addressinfoBussiness.BUILDING == undefined) this.addressinfoBussiness.BUILDING = ""
      if (this.addressinfoBussiness.LANDMARK == undefined) this.addressinfoBussiness.LANDMARK = "";

      if (

        this.addressinfoSalary.DISTRICT != undefined && this.addressinfoSalary.DISTRICT != "" &&
        this.addressinfoSalary.PINCODE != undefined && this.addressinfoSalary.PINCODE != "" &&
        this.addressinfoSalary.TALUKA != undefined && this.addressinfoSalary.TALUKA != "" &&
        this.addressinfoSalary.STATE != undefined && this.addressinfoSalary.STATE != "" &&
        this.addressinfoSalary.VILLAGE != undefined && this.addressinfoSalary.VILLAGE != ""
      ) {
        if (this.isValidPincode(this.addressinfoSalary.PINCODE)) {
        }
        else {
          isOk = false;
          this.message.error(this.api.translate.instant('common.message.error.wronginfo'), "");
        }
      }
      else {
        this.message.error(this.api.translate.instant('common.message.error.address'), "");
        isOk = false
      }
      //console.log(isOk)
      if (isOk) {
        this.isButtonSpinning = true
        this.data2.APPLICANT_DOCUMENTS_ID = 0;
        this.sendata();
        // if (
        //   (this.addressinfoBussiness.HOUSE_NO == undefined || this.addressinfoBussiness.HOUSE_NO.trim() == "") &&
        //   (this.addressinfoBussiness.BUILDING == undefined || this.addressinfoBussiness.BUILDING.trim() == "") &&
        //   (this.addressinfoBussiness.DISTRICT == undefined || this.addressinfoBussiness.DISTRICT.trim() == "") &&
        //   (this.addressinfoBussiness.LANDMARK == undefined || this.addressinfoBussiness.LANDMARK.trim() == "") &&
        //   (this.addressinfoBussiness.PINCODE == undefined || this.addressinfoBussiness.PINCODE.trim() == "") &&
        //   (this.addressinfoBussiness.TALUKA == undefined || this.addressinfoBussiness.TALUKA.trim() == "") &&
        //   (this.addressinfoBussiness.STATE == undefined || this.addressinfoBussiness.STATE.trim() == "") &&
        //   (this.addressinfoBussiness.VILLAGE == undefined || this.addressinfoBussiness.VILLAGE.trim() == "")

        // ) {
        //   this.data2.PLACE_OF_EMPLOYMENT = 0
        //   this.isButtonSpinning = true
        //   this.data2.APPLICANT_DOCUMENTS_ID = 0;
        //   this.sendata();
        // } else {
        //   if (this.addressinfoBussiness.BUILDING == undefined) {
        //     this.addressinfoBussiness.BUILDING = ' '
        //   }
        //   if (this.addressinfoBussiness.HOUSE_NO == undefined) {
        //     this.addressinfoBussiness.HOUSE_NO = ' '
        //   }
        //   if (this.addressinfoBussiness.DISTRICT == undefined) {
        //     this.addressinfoBussiness.DISTRICT = ' '
        //   }
        //   if (this.addressinfoBussiness.STATE == undefined) {
        //     this.addressinfoBussiness.STATE = ' '
        //   }

        //   if (this.addressinfoBussiness.TALUKA == undefined) {
        //     this.addressinfoBussiness.TALUKA = ' '
        //   }
        //   if (this.addressinfoBussiness.VILLAGE == undefined) {
        //     this.addressinfoBussiness.VILLAGE = ' '
        //   }
        //   if (this.addressinfoBussiness.LANDMARK == undefined) {
        //     this.addressinfoBussiness.LANDMARK = ' '
        //   }
        //   if (this.addressinfoBussiness.PINCODE == undefined) {
        //     this.addressinfoBussiness.PINCODE = ' '
        //   }
        //   this.isButtonSpinning = true
        //   this.data2.APPLICANT_DOCUMENTS_ID = 0;
        //   this.sendata();
        // }
        this.update2();
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
    this.data2.JOINING_DATE = null
    this.data2.RETIREMENT_DATE = null
    this.data2.LATEST_SALARY_MONTH = ''
    let addressId = 0;

    this.data2.INCOME_INFORMATION_ID = this.data1.ID
    if (this.data2.PLACE_OF_EMPLOYMENT > 0) {
      this.api.updateAddressInformation(this.addressinfoSalary)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.nextstep();
          } else {

            this.logtext = 'save & Close - SalryInformation form - ERROR - ' + JSON.stringify(this.data2) + " KEYWORD [U - SalryInformation ]";
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
          }
        });
    }
    else {
      this.isButtonSpinning = true;
      this.api.createAddressInformation(this.addressinfoSalary)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            // this.api.getAllAddressInformation(0, 1, "ID", "desc", "").subscribe(data => {
            addressId = successCode['data'][0]['ID']
            this.data2.PLACE_OF_EMPLOYMENT = addressId
            this.nextstep();
            // }, err => {
            //   //console.log(err);
            // });

          } else {

            this.logtext = 'save & Close - SalryInformation form - ERROR - ' + JSON.stringify(this.data2) + " KEYWORD [U - SalryInformation ]";
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
          }
        });
    }
  }
  nextstep() {
   
    if (this.data2.ID != undefined && this.data2.ID > 0) {
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
            this.isButtonSpinning = false;
            var LOG_ACTION = 'User saved Income Info  tab information'
            var DESCRIPTION = sessionStorage.getItem('userName') + 'has saved the Income Info  for the proposal ' + this.LOAN_KEY
            var LOG_TYPE = 'I'
            this.api.proposalLogInformation(this.extraApplicantInformation.PROPOSAL_ID, this.extraApplicantInformation.CURRENT_STAGE_ID, 0, LOG_ACTION, Number(sessionStorage.getItem("userId")), DESCRIPTION, LOG_TYPE)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                }
              });
            this.logtext = 'save & Close - SalryInformation form - SUCCESS ' + JSON.stringify(this.data2) + " KEYWORD [U - SalryInformation ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
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
                this.isButtonSpinning = false;
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });
            this.message.error(this.api.translate.instant('common.message.error.updatefailed'), "");
          }
        });
    }
    else {
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
            this.isButtonSpinning = false;
            var LOG_ACTION = 'User saved Income Info  tab information'
            var DESCRIPTION = sessionStorage.getItem('userName') + 'has saved the Income Info  for the proposal ' + this.LOAN_KEY
            var LOG_TYPE = 'I'
            this.api.proposalLogInformation(this.extraApplicantInformation.PROPOSAL_ID, this.extraApplicantInformation.CURRENT_STAGE_ID, 0, LOG_ACTION, Number(sessionStorage.getItem("userId")), DESCRIPTION, LOG_TYPE)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                }
              });
            this.logtext = 'save & Close - SalryInformation form - SUCCESS ' + JSON.stringify(this.data2) + " KEYWORD [U - SalryInformation ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });

            //  this.save();
            this.isButtonSpinning = false
            this.message.success(this.api.translate.instant('common.message.error.success'), "");
          }
          else {
            this.logtext = 'Update & Close - SalryInformation form - ERROR - ' + JSON.stringify(this.data2) + " KEYWORD [U - SalryInformation ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                this.isButtonSpinning = false;
                if (successCode['code'] == "200") {
                  //console.log(successCode);


                }
                else {
                  //console.log(successCode);
                }
              });

            this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");

          }
        });
    }
  }

  save() {
    //console.log(this.data1)
  }

  change(value) {
    //console.log(value)
    //console.log("change called")
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
              this.oldIndex++;
              this.indexChanged.emit(this.oldIndex)
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
    if (this.data1.INCOME_SOURCE_ID == undefined || this.data1.INCOME_SOURCE_ID == 0) {
      this.message.error(this.api.translate.instant('gincomeinfo.placeholder1'), '');
    } else {
      this.confirmModal = this.modal.confirm({
        nzTitle: this.api.translate.instant('common.confirmModal.addnzTitle'),
        nzContent: this.api.translate.instant('common.confirmModal.addnzContent'),
        nzOnOk: () =>
          new Promise((resolve, reject) => {

            //console.log(this.data1)
            this.data1.TYPE = "B"

            if (this.data1.ID) {
              this.api.updateIncomeInformation(this.data1)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                    this.extraApplicantInformation.IS_PROVIDED = true
                    this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
                      .subscribe(successCode => {
                        if (successCode['code'] == "200") {
                        }
                        else {
                          this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
                        }
                      });
                    this.oldIndex++;
                    this.indexChanged.emit(this.oldIndex)
                    sessionStorage.setItem("IS_SAVED", "1")
                    this.demo.emit(false)
                    this.logtext = 'Update & Close - IncomeInformation form - SUCCESS ' + JSON.stringify(this.data1) + " KEYWORD [U - IncomeInformation ]";
                    this.api.addLog('A', this.logtext, this.api.emailId)
                      .subscribe(successCode => {
                        if (successCode['code'] == "200") {
                          //console.log(successCode);
                        }
                        else {
                          //console.log(successCode);
                        }
                      });

                    this.getData();
                  }
                  else {

                    this.logtext = 'Update & Close - IncomeInformation form - ERROR - ' + JSON.stringify(this.data1) + " KEYWORD [U - IncomeInformation ]";
                    this.api.addLog('A', this.logtext, this.api.emailId)
                      .subscribe(successCode => {
                        if (successCode['code'] == "200") {
                          //console.log(successCode);
                        }
                        else {
                          //console.log(successCode);
                        }
                      });

                    this.message.error(this.api.translate.instant('common.message.error.failed'), "");
                  }
                });
            }
          }).catch(() => console.log('माहिती बदल करण्यात अयशस्वी!'))
      });
    }
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
