import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DatePipe } from '@angular/common';
import { FirmDetails } from 'src/app/Models/FirmProposal/firm-details';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { ApiService } from 'src/app/Service/api.service';
import { EmployeeInfo } from 'src/app/Models/FirmProposal/employee-info';
import { FactoryUnit } from 'src/app/Models/FirmProposal/factory-unit';
import { PartnersInfo } from 'src/app/Models/FirmProposal/partners-info';
import { SisterConcern } from 'src/app/Models/FirmProposal/sister-concern';
import { ManufacturingInfo } from 'src/app/Models/FirmProposal/manufacturing-info';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { Constitutes } from 'src/app/Models/FirmProposal/constitutes';
import { Firmbranchesdetails } from 'src/app/Models/FirmProposal/firmbranchesdetails';
import { tick } from '@angular/core/testing';
@Component({
  selector: 'app-firm-details',
  templateUrl: './firm-details.component.html',
  styleUrls: ['./firm-details.component.css']
})
export class FirmDetailsComponent implements OnInit {
  @Input() PROPOSAL_ID: number;
  @Input() oldIndex: number
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();
  @Output() demo : EventEmitter<boolean> =
    new EventEmitter<boolean>();
  data: FirmDetails;
  @Input() LOAN_KEY: number
  datePipe = new DatePipe("en-US");
  isSpinning = false;
  logtext: string = "";
  constitutionData = [{ 'ID': '1', 'NAME':  this.api.translate.instant('business_info.constitutionData1') }, { 'ID': '2', 'NAME':  this.api.translate.instant('business_info.constitutionData2') }, { 'ID': '3', 'NAME':  this.api.translate.instant('business_info.constitutionData3') }, { 'ID': '4', 'NAME':  this.api.translate.instant('business_info.constitutionData4') }, { 'ID': '5', 'NAME':  this.api.translate.instant('business_info.constitutionData5') }, { 'ID': '6', 'NAME':  this.api.translate.instant('business_info.constitutionData6') },{ 'ID': '7', 'NAME': this.api.translate.instant('business_info.constitutionData7')}];
  registerTypeData = [{ 'ID': '1', 'NAME':  this.api.translate.instant('business_info.registerTypeData1') }, { 'ID': '2', 'NAME': this.api.translate.instant('business_info.registerTypeData2') }, { 'ID': '3', 'NAME': this.api.translate.instant('business_info.registerTypeData3') }, { 'ID': '4', 'NAME': this.api.translate.instant('business_info.registerTypeData4') }];
  dataList1 = [];
  dataList2 = [];
  dataList3 = [];
  dataList4 = [];
  dataList5 = [];
  loadingRecords1 = false;
  loadingRecords2 = false;
  loadingRecords3 = false;
  loadingRecords4 = false;
  loadingRecords5 = false;
  totalRecords = '';
  pageSize = 1;
  pageIndex = 1;
  addressinfoBussiness: Addressinfo;
  branchAddress:Addressinfo=new Addressinfo()
  drawerTitle1: string;
  drawerVisible2: boolean;
  drawerVisible1: boolean;
  drawerTitle2: string;
  drawerData1: any;
  drawerData2: any;
  drawerTitle3: string;
  drawerVisible3: boolean;
  drawerData3: any;
  drawerTitle4: string;
  drawerVisible4: boolean;
  drawerData4: any;
  drawerTitle5: string;
  drawerVisible5: boolean;
  drawerData5: any;
  is_company = '';
  sortValue: string = "asc";
  sortKey: string = "ID"
  isButtonVerifySpinning = false
  extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  drawerDataConstitutes: Constitutes = new Constitutes()
  branchData: Firmbranchesdetails = new Firmbranchesdetails()

  isButtonSpinning = false
  dataListConstitutes=[]
  drawerVisibleConstitutes=false
  drawerTitleConstitutes:string
  loadingConstitutes=false

  dataListNewConstitutes=[]
  constituteData=[]
  mode=""
  loadingAddress=false
  dataListAddress=[]
  BRANCH_NAME:string=""
  HOUSE_NO:string=""
  BUILDING:string=""
  LANDMARK:string=""
  VILLAGE:string=""
  TALUKA:string=""
  DISTRICT:string=""
  STATE:string=""
  PINCODE:string=""
  isAddSpinning=false
  @Input() CURRENT_STAGE_ID: number;  
  constructor(
    private api: ApiService,
    private message: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.data = new FirmDetails();
    this.addressinfoBussiness = new Addressinfo();
    this.drawerData1 = new ManufacturingInfo();
    this.drawerData2 = new SisterConcern();
    this.drawerData3 = new PartnersInfo();
    this.drawerData4 = new FactoryUnit();
    this.drawerData5 = new EmployeeInfo();
    this.getData();
    this.loadInfo()
  }


  loadInfo() {

    let filter = " AND EXTRA_INFORMATION_ID=7 AND PROPOSAL_ID=" + this.PROPOSAL_ID
    this.api.getAllApplicantExtraInformation(0, 0, "SEQ_NO", "asc", filter).subscribe(data => {

      this.extraApplicantInformation = data['data'][0]
    }, err => {
      //console.log(err);
    });
  }

  getData() {
    this.isSpinning = true
    this.api.getAllFirmInformation(this.pageIndex, this.pageSize, this.sortKey, this.sortValue, "AND PROPOSAL_ID=" + this.PROPOSAL_ID)
      .subscribe(data => {
        //console.log(data)
        this.data = new FirmDetails();
        if (data['code'] == "200" && data['count'] > 0) {
          this.isSpinning = false

          this.data = data['data'][0];
          this.getData4();
          this.getData5();
          this.getData1();
          this.getData6(this.data.REGISTERED_OFFICE_ADDRESS_ID);
          sessionStorage.setItem("personalMobile", this.data.LANDLINE_NUMBER)
          if (this.data.IS_ANOTHER_BRANCH)
            this.getAddressData();
          if (this.data.IS_SISTER_OR_ASSOCIATE_CONSERN) {
            this.getData2();
          }

          if(this.data.IS_ANY_CHANGE_IN_CONSTITUENTS)
          {
            this.getDataConstitutes()
          
          }
         
            this.getData3();

        }
      }, err => {
        //console.log(err);
      });
  }

  getData1() {
    //console.log("data 1234")
    this.loadingRecords1 = true;
    this.api.getAllManufacturingInfromation(0, 0, 'ID', "asc", "AND FIRM_INFORMATION_ID = " + this.data.ID)
      .subscribe(successCode => {
        this.dataList1 =[]
        this.loadingRecords1 = false;
        if (successCode['code'] == "200" && successCode['count'] > 0) {
          this.dataList1 = successCode['data'];
        }
      });
  }

  getData2() {
    this.loadingRecords2 = true;
    this.api.getAllSisterOrAssociateConcern(0, 0, 'ID', "asc", "AND FIRM_INFORMATION_ID = " + this.data.ID)
      .subscribe(successCode => {
        this.dataList2 = []
        this.loadingRecords2 = false;
        if (successCode['code'] == "200" && successCode['count'] > 0) {
          this.dataList2 = successCode['data'];
        }
      });
  }

  getData3() {
    this.loadingRecords3 = true;
    this.api.getAllPartnersInformation(0, 0, 'ID', "asc", "AND FIRM_INFORMATION_ID = " + this.data.ID)
      .subscribe(successCode => {
        this.dataList3 =[]
        this.loadingRecords3 = false;
        if (successCode['code'] == "200" && successCode['count'] > 0) {
          this.dataList3 = successCode['data'];
        }
      });
  }

  getData4() {
    // this.loadingRecords4 = true;
    this.api.getAllFactoryUnitInformation(0, 0, 'ID', "asc", "AND FIRM_INFORMATION_ID = " + this.data.ID)
      .subscribe(successCode => {
        this.dataList4 = []
        this.loadingRecords4 = false;
        if (successCode['code'] == "200" && successCode['count'] > 0) {
          this.dataList4 = successCode['data'];
          //console.log("dataList4")
          //console.log(this.dataList4)
        }
      });
  }

  getData5() {
     this.loadingRecords5 = true;
    this.api.getAllDetailsOfEmployee(0, 0, 'ID', "asc", "AND FIRM_INFORMATION_ID = " + this.data.ID)
      .subscribe(successCode => {
        this.dataList5 = []
        this.loadingRecords5 = false;
        if (successCode['code'] == "200" && successCode['count'] > 0) {
          this.dataList5 = successCode['data'];
        }
      });
  }

  getDataConstitutes() {
     this.loadingConstitutes = true;
    this.api.getAllConstitutes(0, 0, 'ID', "asc", "AND FIRM_INFORMATION_ID = " + this.data.ID )
      .subscribe(successCode => {
        this.loadingConstitutes = false;
        if (successCode['code'] == "200" && successCode['count'] > 0) {
          //console.log(successCode)
          this.constituteData = successCode['data'];
          this.dataListConstitutes = successCode['data'].filter((item) => item.TYPE == 'O');
          this.dataListNewConstitutes = successCode['data'].filter((item) => item.TYPE == 'N');
        }
      });
  }

  getAddressData()
  {
    this.loadingAddress=true
    this.api.getFirmInformation(this.PROPOSAL_ID)
    .subscribe(data => {
      //console.log(data)
      if (data['code'] == "200") {
        this.loadingAddress=false

        this.dataListAddress = data['data'][0]['FIRM_BRANCHES_DETAILS']
      }
    }, err => {
      //console.log(err);
    });
  }
 

  getData6(ID) {
    this.api.getAllAddressInformation(this.pageIndex, this.pageSize, this.sortKey, this.sortValue, "AND ID =" + ID)
      .subscribe(data => {
        this.addressinfoBussiness = new Addressinfo()
        if (data['code'] == "200" && data['count'] > 0) {
          this.addressinfoBussiness = data['data'][0];
        }
      }, err => {
        //console.log(err);
      });
  }

 


  getconsti(value) {
    if(value)
    {
      var data = this.constitutionData.filter((item) => item.ID == value);
      return data[0]['NAME'];

    }
    else
    {return ""}
  }

  disabledDate = (current) => {
    return new Date() < current;
  }
  // disabledDate2 = (current) => {
  //   return new Date() > current;
  // } 
  add1() {
    this.drawerTitle1 = this.api.translate.instant('business_info.drawerTitle1');
    this.drawerData1 = new ManufacturingInfo();
    this.drawerData1.FIRM_INFORMATION_ID = this.data.ID;
    this.drawerVisible1 = true;
  }

  get closeCallback1() {
    return this.drawerClose1.bind(this);
  }

  drawerClose1(): void {
    this.getData1();
    this.drawerVisible1 = false;
  }

  edit1(data: any): void {

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

  add2() {
    this.drawerTitle2 = this.api.translate.instant('business_info.drawerTitle7');
    this.drawerData2 = new SisterConcern();
    this.drawerData2.FIRM_INFORMATION_ID = this.data.ID;
    this.drawerVisible2 = true;
  }

  get closeCallback2() {
    return this.drawerClose2.bind(this);
  }

  drawerClose2(): void {
    this.getData2();
    this.drawerVisible2 = false;
  }

  edit2(data: any): void {

    this.drawerTitle2 = this.api.translate.instant('business_info.drawerTitle7');
    this.drawerData2 = Object.assign({}, data);
    this.drawerVisible2 = true;

    this.logtext = 'सिस्टर कन्सर्न - Level form KEYWORD [E - सिस्टर कन्सर्न] ';
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

  add3() {
    this.drawerTitle3 = this.api.translate.instant('business_info.drawerTitle8');
    this.drawerData3 = new PartnersInfo();
    if(this.data.CONSTITUTION_OF_FIRM=="2")
    this.is_company = '1';
    else
    this.is_company = '0';

    this.drawerData3.FIRM_INFORMATION_ID = this.data.ID;
    //console.log(this.drawerData3.FIRM_INFORMATION_ID)
    this.drawerVisible3 = true;
  }

  get closeCallback3() {
    return this.drawerClose3.bind(this);
  }

  drawerClose3(): void {
    this.getData3();
    this.drawerVisible3 = false;
  }

  edit3(data: any): void {

    this.drawerTitle3 = this.api.translate.instant('business_info.drawerTitle9');
    this.drawerData3 = Object.assign({}, data);
    if(this.data.CONSTITUTION_OF_FIRM=="2")
    this.is_company = '1';
    else
    this.is_company = '0';
  //  this.is_company = this.data.TYPE_OF_FIRM_REGISTRATION;
    this.drawerVisible3 = true;
 
    this.logtext = 'EDIT - भागीदारांची माहिती form KEYWORD [E - भागीदारांची माहिती] ';
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

  add4() {
    this.drawerTitle4 = this.api.translate.instant('business_info.drawerTitle3');
    this.drawerData4 = new FactoryUnit();
    this.drawerData4.FIRM_INFORMATION_ID = this.data.ID;
    this.drawerVisible4 = true;
  }

  get closeCallback4() {
    return this.drawerClose4.bind(this);
  }

  drawerClose4(): void {
    this.getData4();
    this.drawerVisible4 = false;
  }

  edit4(data: any): void {
    //console.log(data)
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

  add5() {
    this.drawerTitle5 = this.api.translate.instant('business_info.drawerTitle5');
    this.drawerData5 = new EmployeeInfo();
    this.drawerData5.FIRM_INFORMATION_ID = this.data.ID;
    this.drawerVisible5 = true;
  }

  get closeCallback5() {
    return this.drawerClose5.bind(this);
  }

  drawerClose5(): void {
    this.getData5();
    this.drawerVisible5 = false;
  }

  edit5(data: any): void {

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

  addConstitutes()
  {
    this.drawerTitleConstitutes = this.api.translate.instant('business_info.drawerTitle10');
    this.drawerDataConstitutes = new Constitutes();
    this.drawerDataConstitutes.FIRM_INFORMATION_ID = this.data.ID;
    this.drawerDataConstitutes.TYPE="O"
    this.drawerVisibleConstitutes = true;
  }
 get closeCallbackConstitutes() {
    return this.drawerCloseConstitutes.bind(this);
  }

  drawerCloseConstitutes(): void {
    this.getDataConstitutes();
    this.drawerVisibleConstitutes = false;
  }
  
  editConstitutes(data:Constitutes)
  {
    this.drawerTitleConstitutes = this.api.translate.instant('business_info.drawerTitle11');
    this.drawerDataConstitutes = Object.assign({}, data);
    this.drawerVisibleConstitutes = true;

    this.logtext = 'EDIT - संचालक/भागीदार/ट्रस्टी माहिती form KEYWORD [E - संचालक/भागीदार/ट्रस्टी यांच्या माहिती] ';
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

  addNewConstitutes()
  {
    this.drawerTitleConstitutes = this.api.translate.instant('business_info.drawerTitle12');
    this.drawerDataConstitutes = new Constitutes();
    this.drawerDataConstitutes.FIRM_INFORMATION_ID = this.data.ID;
    this.drawerDataConstitutes.TYPE="N"
    this.drawerVisibleConstitutes = true;
  }

  editNewConstitutes(data:Constitutes)
  {

    this.drawerTitleConstitutes = this.api.translate.instant('business_info.drawerTitle13');
    this.drawerDataConstitutes = Object.assign({}, data);
    this.drawerVisibleConstitutes = true;

    this.logtext = 'EDIT - संचालक/भागीदार/ट्रस्टी माहिती form KEYWORD [E - संचालक/भागीदार/ट्रस्टी यांच्या माहिती] ';
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

  getAddressString(addressData:Addressinfo)
  {
    return addressData.HOUSE_NO+", "+addressData.BUILDING+", "+addressData.LANDMARK+", "+addressData.VILLAGE+", "+addressData.TALUKA+", "+addressData.DISTRICT+", "+addressData.STATE+", "+addressData.PINCODE
  }

  save(): void {
    //console.log(this.addressinfoBussiness)
    var isOk = true;
    if (
      this.data.CONSTITUTION_OF_FIRM != undefined &&  this.data.CONSTITUTION_OF_FIRM != "" &&
      this.data.REGISTRATION_NUMBER != undefined && this.data.REGISTRATION_NUMBER != "" &&
      this.data.PAN_NUMBER_OF_FIRM != undefined && this.data.PAN_NUMBER_OF_FIRM != "" &&
      this.data.EMAIL_ID != undefined && this.data.EMAIL_ID != "" &&
      this.data.LANDLINE_NUMBER != undefined && this.data.LANDLINE_NUMBER != "" &&
      this.data.NAME_OF_FIRM != undefined && this.data.NAME_OF_FIRM != "" &&
      this.data.NATURE_OF_BUSINESS != undefined && this.data.NATURE_OF_BUSINESS != "" &&
      this.data.PRIME_COSTOMERS_DETAILS != undefined && this.data.PRIME_COSTOMERS_DETAILS != "" 

    ) {
    
      if (
        this.addressinfoBussiness.HOUSE_NO != undefined && this.addressinfoBussiness.HOUSE_NO != "" &&
        this.addressinfoBussiness.BUILDING != undefined && this.addressinfoBussiness.BUILDING != "" &&
        this.addressinfoBussiness.DISTRICT != undefined && this.addressinfoBussiness.DISTRICT != "" &&
        this.addressinfoBussiness.LANDMARK != undefined && this.addressinfoBussiness.LANDMARK != "" &&
        this.addressinfoBussiness.TALUKA != undefined && this.addressinfoBussiness.TALUKA != "" &&
        this.addressinfoBussiness.STATE != undefined && this.addressinfoBussiness.STATE != "" &&
        this.addressinfoBussiness.VILLAGE != undefined && this.addressinfoBussiness.VILLAGE != "" &&
        this.addressinfoBussiness.PINCODE != undefined && this.addressinfoBussiness.PINCODE != ""
      ) {
      } else {
        isOk = false;
        this.message.error(this.api.translate.instant('business_info.message19'), "");
      }

      if(this.data.IS_ANOTHER_BRANCH)
      {
        
        if(this.dataListAddress.length==0)
        {
          isOk=false
          this.message.error(this.api.translate.instant('business_info.message20'), "");
        }
       

      }

      if ((/^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/).test(this.data.EMAIL_ID) == false) {
        isOk = false;
        this.message.error(this.api.translate.instant('business_info.EMAIL_ID_nzErrorTip'), "");
      }
      if ((/^[0-9]{10,12}$/).test(this.data.LANDLINE_NUMBER) == false) {
        isOk = false;
        this.message.error(this.api.translate.instant('business_info.LANDLINE_NUMBER_nzErrorTip'), "");
      }
      if (this.data.NAME_OF_FIRM == undefined) {
        isOk = false;
        this.message.error(this.api.translate.instant('business_info.message16'), "");
      }

      if (this.data.NATURE_OF_BUSINESS == undefined) {
        isOk = false;
        this.message.error(this.api.translate.instant('business_info.message17'), "");
      }

      if (this.data.PRIME_COSTOMERS_DETAILS == undefined || this.data.PRIME_COSTOMERS_DETAILS == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('business_info.message18'), "");
      }

    
      this.data.DETAILS_OF_MANUFACTURING_PROCESS=""
      this.data.MANUFACTURED_PRODUCT_OTHER_INFO=""
      this.data.DETAILS_OF_MANUFACTURED_PRODUCT = "";
      this.data.USE_OF_MANUFACTURED_PRODUCT = "";
      

      if (this.data.IS_ANY_CHANGE_IN_CONSTITUENTS) {
        if(this.constituteData.length==0)
        {
          isOk=false
          this.message.error(this.api.translate.instant('business_info.message21'), "");
        }
      }
      //console.log(this.data.IS_MSME_REGISTERED)
      if (this.data.IS_MSME_REGISTERED) {
        if (this.data.MSME_REGISTRATION_DATE == undefined || this.data.MSME_REGISTRATION_NUMBER == undefined) {
          isOk = false;
          this.message.error(this.api.translate.instant('business_info.message22'), "");
        } else if (this.data.MSME_REGISTRATION_NUMBER == '') {
          isOk = false;
          this.message.error(this.api.translate.instant('business_info.message23'), "");
        }
      }
      else {
        this.data.IS_MSME_REGISTERED = false;
        this.data.MSME_REGISTRATION_DATE = null;
        this.data.MSME_REGISTRATION_NUMBER = ' ';
      }


      //console.log(this.data.IS_OTHER_LICENSE)

      if (this.data.IS_OTHER_LICENSE) {

        if (this.data.OTHER_LICENSE_NAME == undefined || this.data.OTHER_LICENSE_NAME == '') {
          isOk = false;
          this.message.error(this.api.translate.instant('business_info.message25'), "");
        } 
        if (this.data.OTHER_LICENSE_NUMBER == undefined || this.data.OTHER_LICENSE_NUMBER == '') {
          isOk = false;
          this.message.error(this.api.translate.instant('business_info.message27'), "");
        }
      }
      else {
        this.data.IS_OTHER_LICENSE = false;
        this.data.OTHER_LICENSE_NAME = ' ';
        this.data.OTHER_LICENSE_NUMBER = ' ';
      }

      if (this.data.IS_SHOP_ACT_LICENSE) {
        if (this.data.SHOP_ACT_NUMBER == undefined) {
          isOk = false;
          this.message.error(this.api.translate.instant('business_info.message28'), "");
        } 
        if (this.data.SHOP_ACT_NUMBER == "") {
          isOk = false;
          this.message.error(this.api.translate.instant('business_info.message28'), "");
        }
      } else {
        this.data.SHOP_ACT_NUMBER = ' ';
        this.data.IS_SHOP_ACT_LICENSE_RENEWAL_FOR_CURRENT_YEAR = false;
      }

      if (this.data.IS_GST_REGISTARTION_CERTIFICATE) {
        if (this.data.GST_NUMBER == undefined) {
          isOk = false;
          this.message.error(this.api.translate.instant('business_info.message6'), "");
        } else if ((/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/).test(this.data.GST_NUMBER) == false) {
          isOk = false;
          this.message.error(this.api.translate.instant('business_info.message27'), "");
        }
      } else {
        this.data.GST_NUMBER = " ";
      }

      if (this.data.PAN_NUMBER_OF_FIRM != undefined) {
        if ((/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/).test(this.data.PAN_NUMBER_OF_FIRM) == false) {
          isOk = false;
          this.message.error(this.api.translate.instant('business_info.message28'), "");
        } else {
          this.data.PAN_NUMBER_OF_FIRM = this.data.PAN_NUMBER_OF_FIRM.toUpperCase();
        }
      }

      if (this.data.IS_INVOLVE_IN_MANUFACTURING_PROCESS) {
        if (this.dataList1 == [] || this.dataList1.length == 0) {
          this.message.error(this.api.translate.instant('business_info.message11'), "");
          isOk = false;
        }
        if ( this.dataList4.length == 0) {
          this.message.error(this.api.translate.instant('business_info.message14'), "");
          isOk = false;
        }
        if ( this.dataList5.length == 0) {
          this.message.error(this.api.translate.instant('business_info.message15'), "");
          isOk = false;
        }
      }

      if(this.data.OWNERSHIP_OF_BUSINESS=="" || this.data.OWNERSHIP_OF_BUSINESS==undefined)
      {
        isOk = false;
        this.message.error(this.api.translate.instant('business_info.message29'), "");
      }
     

      if (this.data.OWNERSHIP_OF_BUSINESS == 'R') {
        if (this.data.OWNER_NAME == undefined || this.data.OWNER_NAME == '') {
          isOk = false;
          this.message.error(this.api.translate.instant('business_info.message30'), "");
        }
        if (this.data.IS_RENT_AGREEMENT_DONE) {
          if (this.data.RENT_AGREEMENT_END_DATE == undefined) {
            isOk = false;
            this.message.error(this.api.translate.instant('business_info.message31'), "");
          }
        }

      }

      //console.log(this.dataList3.length)
        if (this.dataList3.length >= 2) {
        
      }
      else
      {
        this.message.error(this.api.translate.instant('business_info.message32'), "");
        isOk = false;
     
      }
      


    } else {
      isOk = false;
      this.message.error(this.api.translate.instant('common.message.error.compinfo2'), "");
    }

    if (isOk) {
      this.isButtonSpinning = true;
      this.data.RENT_AGREEMENT_END_DATE = this.datePipe.transform(this.data.RENT_AGREEMENT_END_DATE, 'yyyy-MM-dd');
      this.data.DATE_OF_REGISTRATION = this.datePipe.transform(this.data.DATE_OF_REGISTRATION, 'yyyy-MM-dd');
      this.data.MSME_REGISTRATION_DATE = this.datePipe.transform(this.data.MSME_REGISTRATION_DATE, 'yyyy-MM-dd');
      if (this.data.ID) {

        this.nextProcess();

        // if (this.data.IS_ANOTHER_BRANCH) {
        //   if (this.data.ANOTHER_BRANCH_ADDRESS_ID) {
        //     this.api.updateAddressInformation(this.branchAddress)
        //       .subscribe(successCode => {
        //         if (successCode['code'] == "200") {
        //           this.isButtonSpinning = false;
                

        //         } else {
        //           this.message.error(this.api.translate.instant('common.message.error.updatefailed'), "");
        //           this.isButtonSpinning = false;
        //         }
        //       });
        //   } else {
        //     this.api.createAddressInformation(this.branchAddress)
        //       .subscribe(successCode => {
        //         if (successCode['code'] == "200") {
        //           this.data.ANOTHER_BRANCH_ADDRESS_ID = successCode['data'][0].ID;
        //           this.nextProcess();
        //         } else {
        //           this.message.error(this.api.translate.instant('common.message.error.updatefailed'), "");
        //           this.isButtonSpinning = false;
        //         }
        //       });
        //   }
        // } else {
        //     this.nextProcess();
        // }
      }

    }
  }

  nextProcess() {
    this.nextProcess2();
    // if (this.data.REGISTERED_OFFICE_ADDRESS_ID) {
    //   this.api.updateAddressInformation(this.addressinfoBussiness)
    //     .subscribe(successCode => {
    //       if (successCode['code'] == "200") {
            
    //       } else {
    //         this.message.error(this.api.translate.instant('common.message.error.updatefailed'), "");
    //         this.isButtonSpinning = false;
    //       }
    //     });
    // } else {
    //   this.api.createAddressInformation(this.addressinfoBussiness)
    //     .subscribe(successCode => {
    //       if (successCode['code'] == "200") {
    //         this.data.REGISTERED_OFFICE_ADDRESS_ID = successCode['data'][0].ID;
    //         this.nextProcess2();
    //       } else {
    //         this.message.error(this.api.translate.instant('common.message.error.updatefailed'), "");
    //         this.isButtonSpinning = false;
    //       }
    //     });
    // }
  }
  isValidPincode(pincode)
  {
      const expression = /^[1-9][0-9]{5}/;
      return expression.test(String(pincode).toLowerCase())
  }

  addAddressDetails()
  {
    if (this.dataListAddress.length == 0) {
      this.dataListAddress = [
        {
          ID: 0,
          BRANCH_NAME: this.BRANCH_NAME,
          HOUSE_NO: this.HOUSE_NO,
          BUILDING: this.BUILDING,
          LANDMARK: this.LANDMARK,
          VILLAGE:this.VILLAGE,
          TALUKA:this.TALUKA,
          DISTRICT:this.DISTRICT,
          STATE:this.STATE,
          PINCODE:this.PINCODE,
          CLIENT_ID: this.api.clientId
        }
      ];
    }
    else {
      this.dataListAddress = [
        ...this.dataListAddress,
        {
          ID: 0,
          BRANCH_NAME: this.BRANCH_NAME,
          HOUSE_NO: this.HOUSE_NO,
          BUILDING: this.BUILDING,
          LANDMARK: this.LANDMARK,
          VILLAGE:this.VILLAGE,
          TALUKA:this.TALUKA,
          DISTRICT:this.DISTRICT,
          STATE:this.STATE,
          PINCODE:this.PINCODE,
          CLIENT_ID: this.api.clientId
        }
      ];
      
    }
  }

  addAddress()
  {
    if(this.BRANCH_NAME!="" && this.HOUSE_NO !="" && this.BUILDING!="" && this.LANDMARK!="" && this.VILLAGE!="" && this.TALUKA!="" && this.DISTRICT!="" && this.STATE!="" && this.PINCODE!="" && this.isValidPincode(this.PINCODE) )
    {
      this.branchAddress.HOUSE_NO=this.HOUSE_NO
         this.branchAddress.BUILDING=this.BUILDING
         this.branchAddress.LANDMARK=this.LANDMARK
         this.branchAddress.VILLAGE=this.VILLAGE
         this.branchAddress.TALUKA = this.TALUKA
          this.branchAddress.DISTRICT=this.DISTRICT
          this.branchAddress.STATE=this.STATE
          this.branchAddress.PINCODE=this.PINCODE

          
          //console.log(this.branchAddress)
          //console.log(this.branchData)
          

                if(this.mode =="U"){
          // this.dataListAddress[this.index]['NAME'] = this.NAME;
          // this.dataListAddress[this.index]['RELATION'] = this.RELATION;
          // this.dataListAddress[this.index]['OCCUPATION'] = this.OCCUPATION;
          // this.dataListAddress[this.index]['YEARLY_INCOME'] = this.YEARLY_INCOME;

          this.isAddSpinning=true
       
          this.api.updateAddressInformation(this.branchAddress)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              
            //console.log(successCode)

            this.branchData.FIRM_INFORMATION_ID=this.data.ID
            this.branchData.BRANCH_NAME=this.BRANCH_NAME
            
            this.api.updateFirmBranchesDetails(this.branchData) 
                  .subscribe(successCode => {
                    if (successCode['code'] == "200") {
                      this.getAddressData()
                      this.clearAddress()
                      this.isAddSpinning=false
                      
                    }
                    else {
                          
                      this.message.error(this.api.translate.instant('common.message.error.updatefailed'), "");
                      this.isAddSpinning=true
                    }
                  });


           
            }

            else {
              this.message.error(this.api.translate.instant('common.message.error.updatefailed'), "");
              this.isAddSpinning = false;
            }
          });


         
        }
        else
        {
         // this.addAddressDetails()
         

          this.isAddSpinning=true

          this.api.createAddressInformation(this.branchAddress)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  
                //console.log(successCode)

                this.branchData.FIRM_INFORMATION_ID=this.data.ID
                this.branchData.BRANCH_NAME=this.BRANCH_NAME
                this.branchData.ADDRESS_ID=successCode['data'][0]['ID']
                
                this.api.createFirmBranchesDetails(this.branchData) 
                      .subscribe(successCode => {
                        if (successCode['code'] == "200") {
                          this.getAddressData()
                          this.clearAddress()
                          this.isAddSpinning=false
                          
                        }
                        else {
                              
                          this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
                          this.isSpinning = false;
                        }
                      });


               
                }
    
                else {
                  this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
                  this.isAddSpinning = false;
                }
              });


          


        }
     
        
    }
    else
    {
      if(!this.isValidPincode(this.PINCODE))
      this.message.error(this.api.translate.instant('business_info.business_info_pincode1_nzErrorTip'), "");
      else
      this.message.error(this.api.translate.instant('business_info.message33'), "");

    }

  }


  clearAddress()
  {
    this.BRANCH_NAME = ""
        this.HOUSE_NO = ""
        this.BUILDING = ""
        this.LANDMARK = ""
        this.VILLAGE = ""
        this.TALUKA = ""
        this.DISTRICT = ""
        this.STATE = ""
        this.PINCODE = ""
       
  }

  editAddress(data)
  {
    //console.log(data)
    this.mode="U"
    this.branchData.ID=data.ID
    this.branchData.ADDRESS_ID=data.ADDRESS_ID
    this.branchAddress.ID=data.ADDRESS_ID
   this.BRANCH_NAME=data.BRANCH_NAME
    this.HOUSE_NO=data['ADDRESS'][0]['HOUSE_NO']
    this.BUILDING=data['ADDRESS'][0]['BUILDING']
    this.LANDMARK=data['ADDRESS'][0]['LANDMARK']
    this.VILLAGE=data['ADDRESS'][0]['VILLAGE']
    this.TALUKA=data['ADDRESS'][0]['TALUKA']
    this.DISTRICT=data['ADDRESS'][0]['DISTRICT']
    this.STATE=data['ADDRESS'][0]['STATE']
    this.PINCODE=data['ADDRESS'][0]['PINCODE']
  }

  nextProcess2() {

   
    this.api.updateFirmInformation(this.data)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          var LOG_ACTION = 'User saved Firm Info  tab information'
          var DESCRIPTION = sessionStorage.getItem('userName') + 'has saved the Firm Info  for the proposal ' + this.LOAN_KEY 
          var LOG_TYPE = 'I'
          this.api.proposalLogInformation(this.extraApplicantInformation.PROPOSAL_ID, this.extraApplicantInformation.CURRENT_STAGE_ID, 0, LOG_ACTION, Number(sessionStorage.getItem("userId")), DESCRIPTION, LOG_TYPE)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
              }
            });
          this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
          this.getData();
          this.demo.emit(false)
          this.extraApplicantInformation.IS_PROVIDED=true
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
          this.logtext = 'Update & Close - FirmInformation form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - FirmInformation ]";
          this.api.addLog('A', this.logtext, this.api.emailId)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                //console.log(successCode);
              }
              else {
                //console.log(successCode);
              }
            });
          this.isButtonSpinning = false;
        }
        else {

          this.logtext = 'Update & Close - FirmInformation form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - FirmInformation ]";
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
          this.isButtonSpinning = false;
        }
      });
    


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
                LOG_ACTION = 'Firm Info Tab information Verified'
                
                DESCRIPTION = sessionStorage.getItem('userName') + ' has checked and approved the Firm Info for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK
              } else {
                LOG_ACTION = 'Firm Info Tab information Rejected'
                DESCRIPTION = sessionStorage.getItem('userName') + 'has checked and rejected the Firm Info for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK
  
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
