import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NzNotificationService } from 'ng-zorro-antd';
import { CookieService } from 'ngx-cookie-service';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { Basicinfo } from 'src/app/Models/PersonalProposal/basicinfo';
import { Incomeyear } from 'src/app/Models/PersonalProposal/incomeyear';
import { Purposeofloan } from 'src/app/Models/PersonalProposal/purposeofloan';
import { ApiService } from 'src/app/Service/api.service';
import { ToWords } from 'to-words'


const toWords = new ToWords({
  localeCode: 'en-IN',
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
  }
});

@Component({
  selector: 'app-newproposal',
  templateUrl: './newproposal.component.html',
  styleUrls: ['./newproposal.component.css'],
  providers: [DatePipe]
})
export class NewproposalComponent implements OnInit {
  @Input() drawerClose: Function;
  loadingLoanTypes = false
  @Input() data: Basicinfo = new Basicinfo();

  saveCount: number = 0;
  addressinfoCurrent: Addressinfo = new Addressinfo();
  addressinfoSalary: Addressinfo = new Addressinfo();
  addressinfoBussiness: Addressinfo = new Addressinfo();
  addressinfoCurrent2: Addressinfo = new Addressinfo();
  isSpinning = false;
  isSpinning1 = false;
  age: number;
  applicantID = 0
  loanData: any = [];
  isVisible = false;
  isButtonSpinning = false
  branchData: any;
  incomeYears: Incomeyear[]
  browserLang = 'kn';
  filterQuery = ""
  constitutionData = [{ 'ID': '1', 'NAME': this.api.translate.instant('business_info.constitutionData1') }, { 'ID': '2', 'NAME': this.api.translate.instant('business_info.constitutionData2') }, { 'ID': '3', 'NAME': this.api.translate.instant('business_info.constitutionData3') }, { 'ID': '4', 'NAME': this.api.translate.instant('business_info.constitutiondata') }, { 'ID': '5', 'NAME': this.api.translate.instant('business_info.constitutionData5') }, { 'ID': '6', 'NAME': this.api.translate.instant('business_info.constitutionData6') }, { 'ID': '7', 'NAME': this.api.translate.instant('business_info.constitutionData7') }];
  maxBirthDate = new Date();
  talukas = []
  districts = []
  states = []
  pincodes = []
  talukas2 = []
  loanpurpose = [new Purposeofloan()]
  pincodes2 = []
  talukas3 = []
  pincodes3 = []
  options = []
  branchid=Number(sessionStorage.getItem("branchId"))
  // loanpurpose:any
  numberOfCharacters1 = 0;
  constructor(private datePipe: DatePipe, private api: ApiService, private cookie: CookieService, public sanitizer: DomSanitizer, private message: NzNotificationService) { }

  ngOnInit(): void {
    this.addressinfoCurrent = new Addressinfo();
    this.addressinfoSalary = new Addressinfo();
    this.addressinfoBussiness = new Addressinfo();
    this.addressinfoCurrent2 = new Addressinfo();
    this.maxBirthDate.setFullYear(this.maxBirthDate.getFullYear() - 18);
    this.browserLang = localStorage.getItem('locale');
    this.loadingLoanTypes = true

    this.getAddresslist()
    this.api.getAllLoanScheme(0, 0, 'ID', "asc", ' AND IS_ACTIVE = 1')
      .subscribe(successCode => {

        if (successCode['code'] == "200") {
          this.loanData = successCode['data'];

        }
        this.loadingLoanTypes = false
      });

      this.api.getAllPurposeofloan(0, 0, 'ID', "asc", "").subscribe(data => {
        if (data['code'] == "200") {
          this.loanpurpose = data['data'];
        //  console.log(this.loanpurpose+"aniruddha reached here ")
          // this.isSpinning1 = false
        }
      }, err => {
        //console.log(err);
      });

      this.changepurpose(this.data.LOAN_TYPE_ID)
    this.api.getAllBranches(0, 0, 'ID', "asc", "")
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          this.branchData = successCode['data'];
        }
      });
    this.api.getAllIncomeyears(0, 0, "ID", "desc", "").subscribe(data => {
      this.incomeYears = data['data']
    }, err => {
      ////console.log(err);
    });
  }


  calcInstallments1(event) {
    this.data.LOAN_AMOUNT = event;

    
      // this.Amount = event;
      // let words = toWords.convert( this.Amount, { currency: true });
      if (this.data.LOAN_AMOUNT == null || this.data.LOAN_AMOUNT == 0) {
        this.data.LOAN_AMOUNT_IN_WORDS = ""
  
      }
      else {
        this.data.LOAN_AMOUNT_IN_WORDS = toWords.convert(this.data.LOAN_AMOUNT, { currency: true });
      
      }}

  onChanges(value: string): void {
    this.talukas = [];
    this.options.filter(option => {
      if (option.TALUKA.toLowerCase().includes(value.toLowerCase())) {
        this.talukas.push(option);
      }
    });

    if (this.talukas.length > 0) {
      this.addressinfoCurrent.DISTRICT = this.talukas[0]['DISTRICT']
      this.addressinfoCurrent.STATE = this.talukas[0]['STATE']
      this.addressinfoCurrent.PINCODE = this.talukas[0]['PINCODE']
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
  onChanges22(value: string): void {
    this.talukas2 = [];
    this.options.filter(option => {
      if (option.TALUKA.toLowerCase().includes(value.toLowerCase())) {
        this.talukas2.push(option);
      }
    });

    if (this.talukas2.length > 0) {
      this.addressinfoSalary.DISTRICT = this.talukas2[0]['DISTRICT']
      this.addressinfoSalary.STATE = this.talukas2[0]['STATE']
      this.addressinfoSalary.PINCODE = this.talukas2[0]['PINCODE']
    }
  }
  onChanges222(value: string): void {
    this.pincodes2 = [];
    this.talukas2.filter(option => {
      if (option.PINCODE.toLowerCase().includes(value.toLowerCase())) {
        this.pincodes2.push(option.PINCODE);
      }
    });

  }
  onChanges33(value: string): void {
    this.talukas3 = [];
    this.options.filter(option => {
      if (option.TALUKA.toLowerCase().includes(value.toLowerCase())) {
        this.talukas3.push(option);
      }
    });

    if (this.talukas3.length > 0) {
      this.addressinfoBussiness.DISTRICT = this.talukas3[0]['DISTRICT']
      this.addressinfoBussiness.STATE = this.talukas3[0]['STATE']
      this.addressinfoBussiness.PINCODE = this.talukas3[0]['PINCODE']
    }
  }
  onChanges333(value: string): void {
    this.pincodes3 = [];
    this.talukas3.filter(option => {
      if (option.PINCODE.toLowerCase().includes(value.toLowerCase())) {
        this.pincodes3.push(option.PINCODE);
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
  getAllLoanScheme(event) {

    this.data.PRAPOSAL_TYPE = event
    if (this.data.PRAPOSAL_TYPE == "वैयक्तिक") {
      this.filterQuery = " AND IS_INDIVIDUAL=1 AND ("

      if (this.data.INCOME_SOURCE == '1')
        this.filterQuery += " IS_SALARIED=1 )"

      if (this.data.INCOME_SOURCE == '2')
        this.filterQuery += " IS_BUSINESS=1) "

      if (this.data.INCOME_SOURCE == '3')
        this.filterQuery += " IS_FARMER=1) "

      if (this.data.INCOME_SOURCE == '4')
        this.filterQuery += " IS_PROPRIETER=1) "


    }
    else {
      this.filterQuery = " AND IS_FIRM=1 "
    }

    this.api.getAllLoanScheme(0, 0, "ID", "asc", ' AND IS_ACTIVE = 1').subscribe(data => {
      if (data['code'] == "200") {
        this.loanData = data['data'];

      }
      this.loadingLoanTypes = false
    }, err => {
      ////console.log(err);
    });

  }

  getAllLoanScheme2(event) {

    this.data.INCOME_SOURCE = event
    if (this.data.PRAPOSAL_TYPE == "वैयक्तिक") {
      this.filterQuery = " AND IS_INDIVIDUAL=1 AND ("

      if (this.data.INCOME_SOURCE == '1')
        this.filterQuery += " IS_SALARIED=1 )"

      if (this.data.INCOME_SOURCE == '2')
        this.filterQuery += " IS_BUSINESS=1) "

      if (this.data.INCOME_SOURCE == '3')
        this.filterQuery += " IS_FARMER=1) "

      if (this.data.INCOME_SOURCE == '4')
        this.filterQuery += " IS_PROPRIETER=1) "


    }
    else {
      this.filterQuery = " AND IS_FIRM=1 "
    }

    this.api.getAllLoanScheme(0, 0, "ID", "asc", this.filterQuery + ' AND IS_ACTIVE = 1').subscribe(data => {
      if (data['code'] == "200") {
        this.loanData = data['data'];

      }
      this.loadingLoanTypes = false
    }, err => {
      ////console.log(err);
    });

  }

  LoanAmountOption:number;
  rate(event) {
    this.LoanAmountOption = event
    console.log(this.LoanAmountOption)
    if (this.LoanAmountOption == 1) {
      this.data.LOAN_AMOUNT = 5000;
    }

    if (this.LoanAmountOption == 2) {
     
      this.data.LOAN_AMOUNT = 10000;
     
    }

    if (this.LoanAmountOption == 3) {
      this.data.LOAN_AMOUNT = 15000;
    }

    if (this.LoanAmountOption == 4) {
      this.data.LOAN_AMOUNT = 20000;
    }

    if (this.LoanAmountOption == 5) {
      this.data.LOAN_AMOUNT = 25000;
    }

    if (this.LoanAmountOption == 6) {
      this.data.LOAN_AMOUNT = 30000;
    }

    if (this.data.LOAN_AMOUNT == null || this.data.LOAN_AMOUNT == 0) {
      this.data.LOAN_AMOUNT_IN_WORDS = ""

    }
    else {
      this.data.LOAN_AMOUNT_IN_WORDS = toWords.convert(this.data.LOAN_AMOUNT, { currency: true });

    }

  }

  isValidEmail(email) {
    const expression = /^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/;
    return expression.test(String(email).toLowerCase())
  }
  isValidPan(pan) {
    const expression = /[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}/;
    return expression.test(String(pan))
  }
  isValidMobile(mobile) {
    const expression = /^[6-9]\d{9}$/;
    return expression.test(String("" + mobile).toLowerCase())
  }
  isValidAdhar(adhar) {
    const expression = /[0-9]{12}/;
    return expression.test(String(adhar))
  }
  // isValidlandline(landline)
  // {

  //     const expression = /^[0-9]\d{2,4}-\d{6,8}$/;
  //     return expression.test(String(landline))
  // }
  isValidPincode(pincode) {
    const expression = /^[1-9][0-9]{5}/;
    return expression.test(String(pincode).toLowerCase())
  }

  checkValidation() {

    if (this.isValidPan(this.data.PAN)) { }
    else
      this.message.error(this.api.translate.instant('gpersonalinfo.message29'), "");

    if (this.isValidAdhar(this.data.AADHAR)) { }
    else
      this.message.error(this.api.translate.instant('gpersonalinfo.message30'), "");

    if (this.isValidPincode(this.addressinfoCurrent.PINCODE)) { }
    else
      this.message.error(this.api.translate.instant('common.message.error.pincode'), "");

  }
  changepurpose(event) {
    console.log(event);
    this.data.LOAN_TYPE_ID = event


    var filter = "AND LOAN_TYPE_ID =" + this.data.LOAN_TYPE_ID

    this.api.getAllPurposeofloan(0, 0, 'ID', "asc", filter).subscribe(data => {
      if (data['code'] == "200") {
        this.loanpurpose = data['data'];
        console.log(this.loanpurpose)
        // this.isSpinning1 = false
      }
    }, err => {
      //console.log(err);
    });


  }
  save() {
    // this.data.ASSING_BRANCH_ID = Number(sessionStorage.getItem('branchId'));
    // this.data.BRANCH_ID = this.data.ASSING_BRANCH_ID
    //console.log(this.data.IS_AGRICULTURE_LAND_OR_OTHER.toString());
    this.data.TYPE = "B"
    var Isok = true;
    // if (this.data.IS_CUSTOMER_OF_BANK) {
    //   if (this.data.ASSING_BRANCH_ID == 0) {
    //     Isok = false;
    //     this.message.error(this.api.translate.instant('basicinfo.message1'), "");
    //   }
    // }

    {
      if (this.data.PRAPOSAL_TYPE == 'वैयक्तिक') {
        if (this.data.APPLICANT_NAME == undefined || this.data.APPLICANT_NAME.trim() == '') {
          Isok = false;
          //this.message.error(this.api.translate.instant('basicinfo.message1'), "");
        }
        if (this.data.OCCUPATION == undefined || this.data.OCCUPATION.trim() == '') {
          Isok = false;
          //this.message.error(this.api.translate.instant('basicinfo.message1'), "");
        }

        if (this.data.GENDER == undefined || this.data.GENDER.trim() == '') {
          // Isok = false;
          this.data.GENDER = "M"
          //this.message.error(this.api.translate.instant('basicinfo.message1'), "");
        }
        if (this.data.EDUCATION == undefined || this.data.EDUCATION.trim() == '') {
          // Isok = false;
          this.data.EDUCATION = " "
          //this.message.error(this.api.translate.instant('basicinfo.message1'), "");
        }
        if (this.data.DOB == undefined || this.data.DOB == '') {
          // Isok = false;
          this.data.DOB = null
          //this.message.error(this.api.translate.instant('basicinfo.message1'), "");
        }
        if (this.data.RELIGION == undefined || this.data.RELIGION.trim() == '') {
          // Isok = false;
          this.data.RELIGION = " "
          //this.message.error(this.api.translate.instant('basicinfo.message1'), "");
        }
        if (this.data.CAST == undefined || this.data.CAST.trim() == '') {
          // Isok = false;
          this.data.CAST = " "
          //this.message.error(this.api.translate.instant('basicinfo.message1'), "");
        }
        if (this.data.MEMBERS_IN_FAMILY == undefined || this.data.MEMBERS_IN_FAMILY == 0) {
          Isok = false;
          //this.message.error(this.api.translate.instant('basicinfo.message1'), "");
        }
        if (this.data.PAN == undefined || this.data.PAN.trim() == '') {
          // Isok = false;
          this.data.PAN = " "
          //this.message.error(this.api.translate.instant('basicinfo.message1'), "");
        }
        // else {
        //   if (!this.isValidPan(this.data.PAN)) {
        //     Isok = false;
        //     this.message.error(this.api.translate.instant('gpersonalinfo.lebel10.nzErrorTip'), "");
        //   }
        // }

        if (this.data.AADHAR == undefined || this.data.AADHAR.trim() == '') {
          // Isok = false;
          this.data.AADHAR = " "
          //this.message.error(this.api.translate.instant('basicinfo.message1'), "");
        }
        // else {
        //   if (!this.isValidAdhar(this.data.AADHAR)) {
        //     Isok = false;
        //     this.message.error(this.api.translate.instant('gpersonalinfo.lebel11.nzErrorTip'), "");
        //   }
        // }

        if (this.data.EMAIL_ID == undefined || this.data.EMAIL_ID.trim() == '') {
          this.data.EMAIL_ID = ' '
        }
        // else {
        //   if (!this.isValidEmail(this.data.EMAIL_ID)) {
        //     Isok = false;
        //     this.message.error(this.api.translate.instant('gpersonalinfo.label13.nzErrorTip'), "");
        //   }
        // }

        if (this.data.MOBILE_NO1 == undefined || this.data.MOBILE_NO1.trim() == '') {
          Isok = false;
         // this.message.error(this.api.translate.instant('basicinfo.message1'), "");
        } else {
          if (!this.isValidMobile(this.data.MOBILE_NO1)) {
            Isok = false;
            this.message.error(this.api.translate.instant('gpersonalinfo.label14.nzErrorTip'), "");
          }
        }

        ////console.log("Isok", Isok);
        if (this.addressinfoCurrent.HOUSE_NO == undefined) this.addressinfoCurrent.HOUSE_NO = "";
        if (this.addressinfoCurrent.BUILDING == undefined) this.addressinfoCurrent.BUILDING = "";
        if (this.addressinfoCurrent.LANDMARK == undefined) this.addressinfoCurrent.LANDMARK = "";

        if (this.addressinfoCurrent.VILLAGE != undefined && this.addressinfoCurrent.VILLAGE != ""
          && this.addressinfoCurrent.TALUKA != undefined && this.addressinfoCurrent.TALUKA != ""
          && this.addressinfoCurrent.DISTRICT != undefined && this.addressinfoCurrent.DISTRICT != ""
          && this.addressinfoCurrent.STATE != undefined && this.addressinfoCurrent.STATE != ""
          && this.addressinfoCurrent.PINCODE != undefined && this.addressinfoCurrent.PINCODE != ""
        ) {
          if (!this.isValidPincode(this.addressinfoCurrent.PINCODE)) {
            Isok = false;
            this.message.error(this.api.translate.instant('business_info.business_info_pincode1_nzErrorTip'), "");
          } else {
            this.data['CURRENT_ADDRESS'] = this.addressinfoCurrent
          }
        } else {
          Isok = false;

        }
        if (this.data.LOAN_TYPE_ID == undefined || this.data.LOAN_TYPE_ID == 0) {
          Isok = false;
          //this.message.error(this.api.translate.instant('basicinfo.message1'), "");
        }

        if (this.data.LOAN_AMOUNT == undefined || this.data.LOAN_AMOUNT == 0) {
          Isok = false;
          //this.message.error(this.api.translate.instant('basicinfo.message1'), "");
        }
        if (this.data.LOAN_AMOUNT_IN_WORDS == undefined || this.data.LOAN_AMOUNT_IN_WORDS.trim() == '') {
          Isok = false;
          //this.message.error(this.api.translate.instant('basicinfo.message1'), "");
        }
        if (this.data.LOAN_PURPOSE == undefined || this.data.LOAN_PURPOSE == null) {
          Isok = false;
          //this.message.error(this.api.translate.instant('basicinfo.message1'), "");
        }

        if (this.data.LOAN_TYPE_ID != undefined) {
          ////console.log("Isok", Isok);
          if(this.data.LOAN_TYPE_ID == 17){
            this.data.INCOME_SOURCE = '0';
            this.data['CURRENT_ADDRESS'] = ''
            this.data['AGRI_ADDRESS'] = ''
            this.data.DOB = null
            this.data.GENDER = "F"
            this.data.CAST = ''
            this.data.PAN = ''
            this.data.AADHAR = ''
            this.data.RELIGION = ''
            this.data.EDUCATION = ''
            this.data.TYPE_OF_AGRICULTURE_LAND = ""
            this.data.SALARY_PAID_TYPE == 'B'
            this.data.BANK_NAME = ''
            this.data.BRANCH_NAME = ''
            this.data.IFSC_CODE = ''
            this.data.GROSS_SALARY = 0;
            this.data.NET_SALARY = 0;
            this.data.POST_OF_EMPLOYMENT = ''
            this.data.ORGANISATION_NAME = ''
            this.data['EMPLOYMENT_ADDRESS'] = ''
            this.data.NAME_OF_FIRM = '';
            this.data.NATURE_OF_FIRM = '';
            this.data.ADDRESS_ID = 0;
            this.data.NUMBER_OF_YEARS = 0;
            this.data.B_FIRM_INVESTMENT = 0;
            this.data.B_FIRM_YEARLY_BUSINESS = 0;
            this.data.B_FIRM_YEARLY_PROFIT = 0;
            this.data['BUSINESS_PROFESSION_ADDRESS'] = ''
            this.data.TYPE_OF_AGRICULTURE_LAND = ""
            this.data.TOTAL_AREA_IN_APPLICANT_NAME = 0
            this.data.DETAILED_ADDRESS_ID = 0
            this.data.TYPE_OF_AGRICULTURE_LAND = ''
            this.data.CURRENT_AGRICULTURE_PRODUCT = ''
            this.data.ANNUAL_INCOME_FROM_THIS_LAND = 0
            this.data['AGRI_ADDRESS'] = ''
            this.data.VILLAGE_NAME = ''
            this.data.VALUATION_AMOUNT = 0
            this.data.IS_AGRICULTURE_LAND_OR_OTHER = []
            this.data.IS_AGRICULTURE_LAND_OR_OTHER_PROPERTY = false
            this.data.IS_EXISTING_LOAN_WITH_OTHER_BANKS = false
            this.data.OUTSTANDING_BANK_AMOUNT = ''
          }
          if (this.data.INCOME_SOURCE == '1') {
            if (this.addressinfoSalary.HOUSE_NO == undefined) this.addressinfoSalary.HOUSE_NO = "";
            if (this.addressinfoSalary.BUILDING == undefined) this.addressinfoSalary.BUILDING = ""
            if (this.addressinfoSalary.LANDMARK == undefined) this.addressinfoSalary.LANDMARK = "";
            if (

              this.addressinfoSalary.DISTRICT != undefined && this.addressinfoSalary.DISTRICT != "" &&
              this.addressinfoSalary.PINCODE != undefined && this.addressinfoSalary.PINCODE != "" &&
              this.addressinfoSalary.TALUKA != undefined && this.addressinfoSalary.TALUKA != "" &&
              this.addressinfoSalary.STATE != undefined && this.addressinfoSalary.STATE != "" &&
              this.addressinfoSalary.VILLAGE != undefined && this.addressinfoSalary.VILLAGE != ""
            ) {
              if (!this.isValidPincode(this.addressinfoSalary.PINCODE)) {
                Isok = false;
                this.message.error(this.api.translate.instant('business_info.business_info_pincode1_nzErrorTip'), "");
              } else {
                this.data['EMPLOYMENT_ADDRESS'] = this.addressinfoSalary
              }
            }
            else {
              this.message.error(this.api.translate.instant('common.message.error.address'), "");
              Isok = false
            }

            if (this.data.ORGANISATION_NAME == undefined || this.data.ORGANISATION_NAME.trim() == '') {
              Isok = false;
              this.message.error(this.api.translate.instant('gincomeinfo.message1'), "");
            }



            if (this.data.POST_OF_EMPLOYMENT == undefined || this.data.POST_OF_EMPLOYMENT.trim() == '') {
              Isok = false;
              this.message.error(this.api.translate.instant('gincomeinfo.message3'), "");
            }



            if (this.data.GROSS_SALARY == undefined || this.data.GROSS_SALARY.toString().trim() == '') {
              Isok = false;
              this.message.error(this.api.translate.instant('gincomeinfo.message5'), "");
            }
            if (this.data.NET_SALARY == undefined || this.data.NET_SALARY.toString().trim() == '') {
              Isok = false;

            }

            this.data.BANK_NAME = ' '
            // if (this.data.SALARY_PAID_TYPE == 'B') {
            //   if (this.data.BANK_NAME == undefined || this.data.BANK_NAME == "") {
            //     this.message.error(this.api.translate.instant('gincomeinfo.message9'), "");
            //     Isok = false;
            //   }
            // } else {
            //   this.data.BANK_NAME = ''

            // }
            this.data.BRANCH_NAME = ''
            this.data.IFSC_CODE = ''
            ////console.log("Isok", Isok);
          } else {
            this.data.SALARY_PAID_TYPE == 'B'
            this.data.BANK_NAME = ''
            this.data.BRANCH_NAME = ''
            this.data.IFSC_CODE = ''
            this.data.GROSS_SALARY = 0
            this.data.NET_SALARY = 0
            this.data.POST_OF_EMPLOYMENT = ''
            this.data.ORGANISATION_NAME = ''

            this.data['EMPLOYMENT_ADDRESS'] = ''

          }


          if (this.data.INCOME_SOURCE == '2') {
            if (this.addressinfoBussiness.HOUSE_NO == undefined) this.addressinfoBussiness.HOUSE_NO = "";
            if (this.addressinfoBussiness.BUILDING == undefined) this.addressinfoBussiness.BUILDING = ""
            if (this.addressinfoBussiness.LANDMARK == undefined) this.addressinfoBussiness.LANDMARK = "";
            if (
              this.addressinfoBussiness.DISTRICT != undefined && this.addressinfoBussiness.DISTRICT != "" &&
              this.addressinfoBussiness.PINCODE != undefined && this.addressinfoBussiness.PINCODE != "" &&
              this.addressinfoBussiness.TALUKA != undefined && this.addressinfoBussiness.TALUKA != "" &&
              this.addressinfoBussiness.STATE != undefined && this.addressinfoBussiness.STATE != "" &&
              this.addressinfoBussiness.VILLAGE != undefined && this.addressinfoBussiness.VILLAGE != ""

            ) {
              if (!this.isValidPincode(this.addressinfoBussiness.PINCODE)) {
                Isok = false;
                this.message.error(this.api.translate.instant('business_info.business_info_pincode1_nzErrorTip'), "");
              } else {
                this.data['BUSINESS_PROFESSION_ADDRESS'] = this.addressinfoBussiness
              }


              if (this.data.NUMBER_OF_YEARS == undefined || this.data.NUMBER_OF_YEARS.toString().trim() == "") {
                this.data.NUMBER_OF_YEARS = 0
              }

              if (this.data.NAME_OF_FIRM == undefined || this.data.NAME_OF_FIRM.trim() == '') {
                Isok = false;
                this.message.error(this.api.translate.instant('business_info.message3'), "");
              }
              if (this.data.NATURE_OF_FIRM == undefined || this.data.NATURE_OF_FIRM.trim() == '') {
                Isok = false;
                this.message.error(this.api.translate.instant('business_info.message4'), "");
              }

              if (this.data.B_FIRM_INVESTMENT == undefined || this.data.B_FIRM_INVESTMENT == 0) {
                Isok = false;
                //this.message.error(this.api.translate.instant('basicinfo.message1'), "");
              }
              if (this.data.B_FIRM_YEARLY_BUSINESS == undefined || this.data.B_FIRM_YEARLY_BUSINESS == 0) {
                Isok = false;
                //this.message.error(this.api.translate.instant('basicinfo.message1'), "");
              }
              if (this.data.B_FIRM_YEARLY_PROFIT == undefined || this.data.B_FIRM_YEARLY_PROFIT == 0) {
                Isok = false;
                //this.message.error(this.api.translate.instant('basicinfo.message1'), "");
              }





            } else {
              Isok = false;
              this.message.error(this.api.translate.instant('common.message.error.address'), "");
            }
          } else {
            this.data.NAME_OF_FIRM = '';
            this.data.NATURE_OF_FIRM = '';
            this.data.ADDRESS_ID = 0
            this.data.NUMBER_OF_YEARS = 0


            this.data.B_FIRM_INVESTMENT = 0;
            this.data.B_FIRM_YEARLY_BUSINESS = 0;
            this.data.B_FIRM_YEARLY_PROFIT = 0;

            this.data['BUSINESS_PROFESSION_ADDRESS'] = ''

          }



          // if (this.data.INCOME_SOURCE == '3') {
          //   this.data.TYPE_OF_AGRICULTURE_LAND = ""
          //   this.data.TOTAL_AREA_IN_APPLICANT_NAME = 0
          //   this.data.DETAILED_ADDRESS_ID = 0
          //   this.data.TYPE_OF_AGRICULTURE_LAND = ''
          //   this.data.CURRENT_AGRICULTURE_PRODUCT = ''
          //   this.data.ANNUAL_INCOME_FROM_THIS_LAND = null
          //   this.data['AGRI_ADDRESS'] = ''
          //   this.data.VILLAGE_NAME = ''
          //   // if (
          //   //   this.addressinfoCurrent2.DISTRICT != undefined && this.addressinfoCurrent2.DISTRICT != "" &&
          //   //   this.addressinfoCurrent2.HOUSE_NO != undefined && this.addressinfoCurrent2.HOUSE_NO != "" &&
          //   //   this.addressinfoCurrent2.PINCODE != undefined && this.addressinfoCurrent2.PINCODE != "" &&
          //   //   this.addressinfoCurrent2.TALUKA != undefined && this.addressinfoCurrent2.TALUKA != "" &&
          //   //   this.addressinfoCurrent2.STATE != undefined && this.addressinfoCurrent2.STATE != "" &&
          //   //   this.addressinfoCurrent2.VILLAGE != undefined && this.addressinfoCurrent2.VILLAGE != ""
          //   // ) {
          //   //   if (!this.isValidPincode(this.addressinfoCurrent2.PINCODE)) {
          //   //     Isok = false;
          //   //     this.message.error(this.api.translate.instant('business_info.business_info_pincode1_nzErrorTip'), "");
          //   //   } else {
          //   //     this.data['AGRI_ADDRESS'] = this.addressinfoCurrent2
          //   //   }

          //   //   if (this.data.VILLAGE_NAME == undefined || this.data.VILLAGE_NAME.trim() == "") {
          //   //     Isok = false;
          //   //   }

          //   //   if (this.data.TOTAL_AREA_IN_APPLICANT_NAME == undefined || this.data.TOTAL_AREA_IN_APPLICANT_NAME.toString().trim() == "") {
          //   //     Isok = false;
          //   //     this.message.error(this.api.translate.instant('agri_info.message2'), "");
          //   //   }
          //   //   if (this.data['bagayat'] && this.data['jirayat']) {
          //   //     this.data.TYPE_OF_AGRICULTURE_LAND = "B,G";
          //   //   }

          //   //   if (this.data['bagayat'] && !this.data['jirayat']) {
          //   //     this.data.TYPE_OF_AGRICULTURE_LAND = "B";
          //   //   }
          //   //   if (!this.data['bagayat'] && this.data['jirayat']) {
          //   //     this.data.TYPE_OF_AGRICULTURE_LAND = "G";
          //   //   }





          //   // }
          //   // else {
          //   //   Isok = false;
          //   //   this.message.error(this.api.translate.instant('common.message.error.address'), "");
          //   // }
          // } else {
          //   this.data.TYPE_OF_AGRICULTURE_LAND = ""
          //   this.data.TOTAL_AREA_IN_APPLICANT_NAME = 0
          //   this.data.DETAILED_ADDRESS_ID = 0
          //   this.data.TYPE_OF_AGRICULTURE_LAND = ''
          //   this.data.CURRENT_AGRICULTURE_PRODUCT = ''
          //   this.data.ANNUAL_INCOME_FROM_THIS_LAND = 0
          //   this.data['AGRI_ADDRESS'] = ''
          //   this.data.VILLAGE_NAME = ''
          // }

          if (this.data.IS_AGRICULTURE_LAND_OR_OTHER_PROPERTY) {
            if (this.data.IS_AGRICULTURE_LAND_OR_OTHER != undefined && this.data.IS_AGRICULTURE_LAND_OR_OTHER.length > 0 && this.data.VALUATION_AMOUNT != undefined && this.data.VALUATION_AMOUNT.toString() != "") {

            } else {
              Isok = false;
            }
          } else {
            this.data.VALUATION_AMOUNT = 0
            this.data.IS_AGRICULTURE_LAND_OR_OTHER = []
          }

          if (this.data.IS_EXISTING_LOAN_WITH_OTHER_BANKS) {
            if (this.data.OUTSTANDING_BANK_AMOUNT == undefined || this.data.OUTSTANDING_BANK_AMOUNT.trim() == '')
              Isok = false;

             
          } else {
            this.data.OUTSTANDING_BANK_AMOUNT = '';
          }

        }
         else {
          this.data.INCOME_SOURCE = '0';
          this.data['CURRENT_ADDRESS'] = ''
          this.data['AGRI_ADDRESS'] = ''
          this.data.DOB = null
          this.data.GENDER = "M"
          this.data.CAST = ''
          this.data.PAN = ''
          this.data.AADHAR = ''
          this.data.RELIGION = ''
          this.data.EDUCATION = ''
          this.data.TYPE_OF_AGRICULTURE_LAND = ""
          this.data.SALARY_PAID_TYPE == 'B'
          this.data.BANK_NAME = ''
          this.data.BRANCH_NAME = ''
          this.data.IFSC_CODE = ''
          this.data.GROSS_SALARY = 0;
          this.data.NET_SALARY = 0;
          this.data.POST_OF_EMPLOYMENT = ''
          this.data.ORGANISATION_NAME = ''
          this.data['EMPLOYMENT_ADDRESS'] = ''
          this.data.NAME_OF_FIRM = '';
          this.data.NATURE_OF_FIRM = '';
          this.data.ADDRESS_ID = 0;
          this.data.NUMBER_OF_YEARS = 0;
          this.data.B_FIRM_INVESTMENT = 0;
          this.data.B_FIRM_YEARLY_BUSINESS = 0;
          this.data.B_FIRM_YEARLY_PROFIT = 0;
          this.data['BUSINESS_PROFESSION_ADDRESS'] = ''
          this.data.TYPE_OF_AGRICULTURE_LAND = ""
          this.data.TOTAL_AREA_IN_APPLICANT_NAME = 0
          this.data.DETAILED_ADDRESS_ID = 0
          this.data.TYPE_OF_AGRICULTURE_LAND = ''
          this.data.CURRENT_AGRICULTURE_PRODUCT = ''
          this.data.ANNUAL_INCOME_FROM_THIS_LAND = 0
          this.data['AGRI_ADDRESS'] = ''
          this.data.VILLAGE_NAME = ''
          this.data.VALUATION_AMOUNT = 0
          this.data.IS_AGRICULTURE_LAND_OR_OTHER = []
          this.data.IS_AGRICULTURE_LAND_OR_OTHER_PROPERTY = false
          this.data.IS_EXISTING_LOAN_WITH_OTHER_BANKS = false
          this.data.OUTSTANDING_BANK_AMOUNT = ''
        }

      } else {
        this.data['CURRENT_ADDRESS'] = ''
        this.data['EMPLOYMENT_ADDRESS'] = ''
        this.data['AGRI_ADDRESS'] = ''
        this.data['BUSINESS_PROFESSION_ADDRESS'] = ''
        this.data.APPLICANT_NAME = ''
        this.data.DOB = null
        this.data.GENDER = "M"
        this.data.CAST = ''
        this.data.PAN = ''
        this.data.AADHAR = ''
        this.data.RELIGION = ''
        this.data.EDUCATION = ''
        this.data.MOBILE_NO1 = ''
        this.data.MEMBERS_IN_FAMILY = 0
        this.data.B_FIRM_INVESTMENT = 0;
        this.data.B_FIRM_YEARLY_BUSINESS = 0;
        this.data.B_FIRM_YEARLY_PROFIT = 0;
        this.data.TYPE_OF_AGRICULTURE_LAND = ""
      }


      this.data['FIRM_ADDRESS'] = ''
      this.data.F_NAME_OF_FIRM = ''
      this.data.F_NATURE_OF_BUSINESS = ''
      this.data.F_CONSTITUTION_OF_FIRM = ''
      this.data.F_IS_MSME_REGISTERED = false;
      this.data.F_MSME_REGISTRATION_NUMBER = ''
      this.data.F_MSME_REGISTRATION_DATE = null
      this.data.F_PAN_NUMBER_OF_FIRM = ''
      this.data.F_IS_GST_REGISTARTION_CERTIFICATE = false;

      this.data.F_LANDLINE_NUMBER = ''
      this.data.F_GST_NUMBER = ''
      this.data.FIRM_INVESTMENT = 0;
      this.data.FIRM_YEARLY_BUSINESS = 0;
      this.data.FIRM_YEARLY_PROFIT = 0;
      this.data.OUTSTANDING_BANK_AMOUNT = '';
      this.data.IS_LOAN_FOR_FILL_PREVIOUS_LOAN = false
      this.data.IS_INCOME_TAX_FILED = false
      this.data.FINANCIAL_YEAR = 0
      this.data.INCOME_AMOUNT = 0
      this.data.TAX_PAID_AMOUNT = 0


    }
    ////console.log(this.data);
    if (Isok) {
      this.data.F_MSME_REGISTRATION_DATE = null
      this.data.DOB = null
      this.data.IS_AGRICULTURE_LAND_OR_OTHER = this.data.IS_AGRICULTURE_LAND_OR_OTHER.toString()

    
      this.isButtonSpinning = true;
      // this.data.BRANCH_ID=this.branchid

      this.data.BRANCH_ID = Number(sessionStorage.getItem('branchId'))
      this.data.ASSING_BRANCH_ID = Number(sessionStorage.getItem('branchId'))


      
      for (let i = 0; i < this.branchData.length; i++) {
        if (this.branchData[i].ID == this.data.BRANCH_ID) {
          this.data.BRANCH_NAME = this.branchData[i].NAME;
          this.data.BRANCH_NAME_EN = this.branchData[i].NAME_EN;
          this.data.BRANCH_NAME_KN = this.branchData[i].NAME_KN;

        }
      }





      // console.log(this.data);
      // if(this.data.IS_CUSTOMER_OF_BANK==false){
      //   this.data.ASSING_BRANCH_ID = 0


      // }
      // else{
      //    this.message.error(this.api.translate.instant('basicinfo.message1'), "");
      // }

      this.saveCount++;
      if (this.saveCount == 1) {

     
      this.api.createNewPorposal(this.data)
        .subscribe(successCode => {
          ////console.log(successCode)
          if (successCode['code'] == "200") {
            this.data = new Basicinfo()
            this.addressinfoCurrent = new Addressinfo();
            this.addressinfoCurrent2 = new Addressinfo();
            this.addressinfoSalary = new Addressinfo();
            this.addressinfoBussiness = new Addressinfo();
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
            this.drawerClose()
            this.saveCount = 0
            this.isButtonSpinning = false;
          }
          else {
            this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
            this.isButtonSpinning = false;
            this.saveCount = 0
          }
        },
        error => {
          this.isButtonSpinning = false;
          this.saveCount = 0
      });
    }
    } else {
      this.message.error(this.api.translate.instant('common.message.error.compinfo2'), "");
    }

  }

  disabledDate = (current) => {
    return new Date(new Date().setFullYear(new Date().getFullYear() - 18)) < current;
  }
  focusss(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.DOB = undefined;
    }
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

 
  wordCounter(textValue: string): void {
    this.numberOfCharacters1 = textValue.length;
  }
  getword() {
    this.data.LOAN_AMOUNT_IN_WORDS = this.convertNumberToWords(this.data.LOAN_AMOUNT);
  }

  convertNumberToWords(num) {
    var a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    var b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    var n;
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Only ' : '';
    return str;
  }
}
