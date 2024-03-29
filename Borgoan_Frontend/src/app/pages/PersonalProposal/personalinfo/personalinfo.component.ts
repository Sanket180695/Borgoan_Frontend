import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Personalinformation } from 'src/app/Models/PersonalProposal/personalinformation';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { ApiService } from 'src/app/Service/api.service';
import { DatePipe } from '@angular/common';
import { NzNotificationService, NzModalService, NzModalRef } from 'ng-zorro-antd';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { FamilyDetail } from 'src/app/Models/family-detail';
interface Option {
  TALUKA: string;
  DISTRICT: string;
  STATE: string;
  PINCODE: string;
}

import { conformToMask } from 'angular2-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'

@Component({
  selector: 'app-personalinfo',
  templateUrl: './personalinfo.component.html',
  styleUrls: ['./personalinfo.component.css'],
  providers: [DatePipe]
})
export class PersonalinfoComponent implements OnInit {
  isButtonSpinning2 = false;
  @Input() data: Personalinformation;
  @Input() addressinfoCurrent: Addressinfo;
  @Input() addressinfoPermanent: Addressinfo;
  @Input() familyDetils
  @Input() oldIndex: number
  @Input() LOAN_KEY: Number;
  @Input() personalInformationId
  @Input() IndivisualInfotabs
  @Input() APPLICANT_ID
  @Input() PROPOSAL_ID: Number;

  @Input() proposal_type;

  @Output() demo: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() CURRENT_STAGE_ID: number;
  extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();
  converted: any;
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy')
  pipe = new DatePipe('en-US');
  isButtonSpinning = false
  isSpinning = false
  age: any
  IS_PERSONAL_OR_FIRM = true
  NAME: string = ""
  RELATION: string
  OCCUPATION: string
  YEARLY_INCOME: number
  roleId = sessionStorage.getItem("roleId")
  //familyDeatils=[]
  confirmModal?: NzModalRef;
  i = 2
  isButtonVerifySpinning = false
  index1 = -1
  maxBirthDate = new Date();
  talukas = []
  districts = []
  states = []
  pincodes = []
  options = []
  constructor(private api: ApiService, private modal: NzModalService, private datePipe: DatePipe, private message: NzNotificationService) { }

  ngOnInit(): void {
    this.maxBirthDate.setFullYear(this.maxBirthDate.getFullYear() - 18);
    this.loadInfo(this.PROPOSAL_ID)
    this. loadInfo2(this.PROPOSAL_ID,this.APPLICANT_ID)

    // this.getFamily();
  }

  loadInfo2(proposalId,applicantId) {
    this.api.getAddressInfo(proposalId, "B", applicantId).subscribe(data => {
      //console.log(data)
      if (data['code'] == 200 && data['data'].length > 0) {
        this.data = Object.assign({}, data['data'][0]); 
        this.personalInformationId = this.data.ID
        console.log('data : ',data['data'][0])
        this.data.OCCUPATION = data['data'][0]['OCCUPATION']
        this.addressinfoCurrent = Object.assign({}, data['data'][0]['CURRENT_ADDRESS'][0]); 
        this.addressinfoPermanent = Object.assign({}, data['data'][0]['PERMANENT_ADDRESS'][0]);
        // this.addressinfoPermanent = new Addressinfo()
        // this.familyDetils =  data['data'][0]['FAMILY_MEMBERS']
        // console.log(this.data.DATE_OF_MEMBERSHIP)
        // var d = this.data.DATE_OF_MEMBERSHIP
        // this.data.DATE_OF_MEMBERSHIP = this.datePipe.transform(d, 'dd/MM/yyyy');
        // var da = this.data.DOB
        // this.data.DOB = this.datePipe.transform(da, 'dd/MM/yyyy');
        this.getFamily();
        // console.log('data object in loadInfo2 : ',this.data)

        
     
      }
    }, err => {
      //console.log(err);
    });
  }

  loadInfo(proposalId) {

    let filter = ''

    if (this.proposal_type == 1) {
      filter = " AND EXTRA_INFORMATION_ID=1 AND PROPOSAL_ID=" + proposalId + " AND TYPE='B'"
    }
    else if (this.proposal_type == 2) {
      filter = " AND EXTRA_INFORMATION_ID=7 AND PROPOSAL_ID=" + proposalId + " AND TYPE='B'"
    }
    // let filter = " AND EXTRA_INFORMATION_ID=1 AND PROPOSAL_ID=" + proposalId + " AND TYPE='B'"
    // this.api.getAllApplicantExtraInformation(0, 0, "SEQ_NO", "asc", filter).subscribe(data => {
    //   this.extraApplicantInformation = data['data'][0]
    //   console.log(this.extraApplicantInformation)

    this.api.getAllApplicantExtraInformation(0, 0, "SEQ_NO", "asc", filter).subscribe(data => {
      if (data['code'] == 200 && data['data'].length > 0) {
        this.extraApplicantInformation = data['data'][0]
        //console.log(this.extraApplicantInformation)
      }
    }, err => {
      //console.log(err);
    });
    this.getAddresslist();
  }

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
  getAddresslist() {
    let filter = ""
    this.api.getAddresslist(0, 0, "TALUKA", "asc", filter).subscribe(data => {
      this.options = data['data'];
    }, err => {
      this.options = []
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
    this.data.AGE = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    console.log("AGE : ",this.data.AGE);
  }


  copyClick() {
    var addressinfoPermanent = new Addressinfo();
    addressinfoPermanent = Object.assign({}, this.addressinfoCurrent);
    addressinfoPermanent.ID = this.addressinfoPermanent.ID
    this.addressinfoPermanent = Object.assign({}, addressinfoPermanent);
  }

  // addFamilyDetails() {
  //   if (this.familyDetils.length == 0) {
  //     this.familyDetils = [
  //       {
  //         ID: 0,
  //         PERSONAL_INFORMATION_ID: this.personalInformationId,
  //         NAME: this.NAME, 
  //         RELATION: this.RELATION,
  //         OCCUPATION: this.OCCUPATION,
  //         YEARLY_INCOME: this.YEARLY_INCOME,
  //         ARCHIVE_FLAG: 'F',
  //         CLIENT_ID: this.api.clientId
  //       }
  //     ];
  //   }
  //   else {
  //     this.familyDetils = [
  //       ...this.familyDetils,
  //       {
  //         ID: 0,
  //         PERSONAL_INFORMATION_ID: this.personalInformationId,
  //         NAME: this.NAME,
  //         RELATION: this.RELATION,
  //         OCCUPATION: this.OCCUPATION,
  //         YEARLY_INCOME: this.YEARLY_INCOME,
  //         ARCHIVE_FLAG: 'F',
  //         CLIENT_ID: this.api.clientId
          
  //       }
  //     ];
  //     this.i++;
  //   }
  // }

  // addData() {
  //   if (this.NAME != undefined && this.RELATION != undefined && this.OCCUPATION != undefined && this.YEARLY_INCOME != undefined) {

  //     if (this.index1 > -1) {
  //       this.familyDetils[this.index1]['NAME'] = this.NAME;
  //       this.familyDetils[this.index1]['RELATION'] = this.RELATION;
  //       this.familyDetils[this.index1]['OCCUPATION'] = this.OCCUPATION;
  //       this.familyDetils[this.index1]['YEARLY_INCOME'] = this.YEARLY_INCOME;

  //       // sessionStorage.setItem('name',this.NAME)

      
  //       this.index1 = -1

  //     }
  //     else {
  //       this.addFamilyDetails()
  //       console.log(this.familyDetils,'assas')
  //     }

  //     this.NAME = ""
  //     this.RELATION = ""
  //     this.OCCUPATION = ""
  //     this.YEARLY_INCOME = 0

  //   }
  //   else {
  //     this.message.error(this.api.translate.instant('common.message.error.emptyinfo'), "");
  //   }

  // }

  addData() {
    if (this.SingleFamily.ID) {
      this.api.updateFamilyDetail(this.SingleFamily).subscribe({
        next: (res) => {
          if (res['code'] == 200) {
            this.getFamily();
            this.SingleFamily = new FamilyDetail();
          }
        }
      })
    }
    else {
      this.SingleFamily.PERSONAL_INFORMATION_ID = this.personalInformationId;
      this.SingleFamily.CLIENT_ID = this.api.clientId;
      this.api.createFamilyDetail(this.SingleFamily).subscribe({
        next: (res) => {
          if (res['code'] == 200) {
            this.getFamily();
            this.SingleFamily = new FamilyDetail();
          }
        }
      })
    }

  }


  getFamily() {
    this.api.getFamilyDetail(this.personalInformationId).subscribe({
      next: (res) => {
        if (res['code'] == 200 && res['data'].length > 0) {
          this.familyDetils = res['data'];
          this.data.FAMILY_MEMBERS = res['data'];
        }
        else {
          this.familyDetils = []
          this.data.FAMILY_MEMBERS = [];
        }
      }
    })
  }



  deleteRow(data) {
    data.ARCHIVE_FLAG = "T";
    this.api.updateFamilyDetail(data)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          this.getFamily();
        }
      });
  }

  SingleFamily: FamilyDetail = new FamilyDetail();


  editRow(data, i1: number) {
    this.SingleFamily = data;
    let arr = this.familyDetils.filter(value => {
      return value.ID != data.ID
    })
    this.familyDetils = arr;
  }


  // deleteRow(data) {
  //   //console.log(data)

  //   if (data.ID == 0) {
  //     const index = this.familyDetils.indexOf(data);
  //     this.familyDetils.splice(index, 1);
  //     this.familyDetils = this.familyDetils.filter(object => {
  //       return object['ID'] != this.data
  //     });
  //   }
  //   else {
  //     this.confirmModal = this.modal.confirm({
  //       nzTitle: this.api.translate.instant('common.confirmModal.nzTitle'),
  //       nzContent: this.api.translate.instant('common.confirmModal.nzContent'),
  //       nzOnOk: () =>
  //         new Promise((resolve, reject) => {
  //           data.ARCHIVE_FLAG = "T";
  //           this.api.updateFamilyDetails(data)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
  //                 const index = this.familyDetils.indexOf(data);
  //                 this.familyDetils.splice(index, 1);
  //                 this.familyDetils = this.familyDetils.filter(object => {
  //                   return object['ID'] != this.data
  //                 });

  //               }
  //             });
  //         }).catch(() => console.log('माहिती बदल करण्यात अयशस्वी!'))
  //     });
  //   }



  // }

  // editRow(data, i1: number) {
  //   this.index1 = i1
  //   this.NAME = data.NAME
  //   this.RELATION = data.RELATION
  //   this.OCCUPATION = data.OCCUPATION
  //   this.YEARLY_INCOME = data.YEARLY_INCOME
  // }

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

  focusss(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.DOB = undefined;
    }
  }

  save() {
    this.data.TYPE = "B"
    this.data.EDUCATION = " "
    this.data.DOB = this.data.DOB
    let dob = this.data.DOB;
    //console.log("dob in save :", this.data.DOB)
    this.data.PAN = " "

    this.data.MOBILE_NO2 == " "
    this.data.LANDLINE_NO == " "

    this.data.PERMANENT_ADDRESS[0] = [];

    //console.log(this.familyDetils);

    var oks = true;
    if (this.proposal_type == 1) {
      if (this.data.APPLICANT_NAME != undefined && this.data.APPLICANT_NAME.trim() != ""
        && this.data.OCCUPATION != undefined && this.data.OCCUPATION.trim() != ""
      ) {


        if (this.data.MEMBERS_IN_FAMILY == undefined) {
          this.data.MEMBERS_IN_FAMILY = 0
        }

        if (this.data.DOB == undefined || this.data.DOB == '') {
          this.data.DOB = null
        }
        // else
        // if (this.data.DOB[0] >= 0 && this.data.DOB[0] <= 9
        //   && this.data.DOB[1] >= 0 && this.data.DOB[1] <= 9
        //   && this.data.DOB[3] >= 0 && this.data.DOB[3] <= 9 &&
        //   this.data.DOB[4] >= 0 && this.data.DOB[4] <= 9 &&
        //   this.data.DOB[9] >= 0 && this.data.DOB[9] <= 9 &&
        //   this.data.DOB[8] >= 0 && this.data.DOB[8] <= 9 &&
        //   this.data.DOB[7] >= 0 && this.data.DOB[7] <= 9 &&
        //   this.data.DOB[6] >= 0 && this.data.DOB[6] <= 9) {

        //   var conformedPhoneNumber = conformToMask(
        //     this.data.DOB,
        //     this.mask,
        //     { guide: false }
        //   )
        //   const str = conformedPhoneNumber.conformedValue.split('/');

        //   const year = Number(str[2]);
        //   const month = Number(str[1]) - 1;
        //   const dates = Number(str[0]);

        //   this.converted = new Date(year, month, dates)

        //   this.data.DOB = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
        //   this.onChange(dob)
        // } else {
        //   oks = false
        //   this.message.error(this.api.translate.instant('basicinfo.dateerror'), "")
        // }

        // if (this.data.YEAR <= 999) {
        //   oks = false;
        //   this.message.error(this.api.translate.instant('gpersonalinfo.label41'), "");
        // }

        // if (this.data.MOBILE_NO1 == undefined) {
        //   this.data.MOBILE_NO1 = " "
        // } else {
        //   if (this.isValidMobile(this.data.MOBILE_NO1)) { }
        //   else {
        //     oks = false;
        //     this.message.error(this.api.translate.instant('gpersonalinfo.message27'), "");
        //   }
        // }
        if (this.data.RELIGION == undefined)
          this.data.RELIGION = " "
        if (this.data.MEMBERSHIP_NUMBER == undefined) {
          this.data.MEMBERSHIP_NUMBER = " "
        }
        if (this.data.DATE_OF_MEMBERSHIP == undefined || this.data.DATE_OF_MEMBERSHIP == '') {
          this.data.DATE_OF_MEMBERSHIP = null
        }
        // else
        // if (this.data.DATE_OF_MEMBERSHIP[0] >= 0 && this.data.DATE_OF_MEMBERSHIP[0] <= 9
        //   && this.data.DATE_OF_MEMBERSHIP[1] >= 0 && this.data.DATE_OF_MEMBERSHIP[1] <= 9
        //   && this.data.DATE_OF_MEMBERSHIP[3] >= 0 && this.data.DATE_OF_MEMBERSHIP[3] <= 9 &&
        //   this.data.DATE_OF_MEMBERSHIP[4] >= 0 && this.data.DATE_OF_MEMBERSHIP[4] <= 9 &&
        //   this.data.DATE_OF_MEMBERSHIP[9] >= 0 && this.data.DATE_OF_MEMBERSHIP[9] <= 9 &&
        //   this.data.DATE_OF_MEMBERSHIP[8] >= 0 && this.data.DATE_OF_MEMBERSHIP[8] <= 9 &&
        //   this.data.DATE_OF_MEMBERSHIP[7] >= 0 && this.data.DATE_OF_MEMBERSHIP[7] <= 9 &&
        //   this.data.DATE_OF_MEMBERSHIP[6] >= 0 && this.data.DATE_OF_MEMBERSHIP[6] <= 9) {

        //   var conformedPhoneNumber = conformToMask(
        //     this.data.DATE_OF_MEMBERSHIP,
        //     this.mask,
        //     { guide: false }
        //   )
        //   const str = conformedPhoneNumber.conformedValue.split('/');

        //   const year = Number(str[2]);
        //   const month = Number(str[1]) - 1;
        //   const dates = Number(str[0]);

        //   this.converted = new Date(year, month, dates)

        //   this.data.DATE_OF_MEMBERSHIP = this.datePipe.transform(this.converted, 'yyyy-MM-dd');

        // } else {
        //   oks = false
        //   this.message.error(this.api.translate.instant('basicinfo.dateerror'), "")
        // }
        if (this.data.MEMBERSHIP_AMOUNT == undefined) {
          this.data.MEMBERSHIP_AMOUNT = 0
        }
        if (this.data.CHILDREN_COUNT == undefined) {
          this.data.CHILDREN_COUNT = 0
        }
        if (this.data.AUDULT_COUNT == undefined) {
          this.data.AUDULT_COUNT = 0
        }
        if (this.addressinfoCurrent.HOUSE_NO == undefined) this.addressinfoCurrent.HOUSE_NO = "";
        if (this.addressinfoCurrent.BUILDING == undefined) this.addressinfoCurrent.BUILDING = ""
        if (this.addressinfoCurrent.LANDMARK == undefined) this.addressinfoCurrent.LANDMARK = "";
        if (

          (this.addressinfoCurrent.DISTRICT == undefined || this.addressinfoCurrent.DISTRICT.trim() == "") &&
          (this.addressinfoCurrent.PINCODE == undefined || this.addressinfoCurrent.PINCODE.trim() == "") &&
          (this.addressinfoCurrent.TALUKA == undefined || this.addressinfoCurrent.TALUKA.trim() == "") &&
          (this.addressinfoCurrent.STATE == undefined || this.addressinfoCurrent.STATE.trim() == "") &&
          (this.addressinfoCurrent.VILLAGE == undefined || this.addressinfoCurrent.VILLAGE.trim() == "")
          // && this.familyDeatils.length == this.data.MEMBERS_IN_FAMILY
        ) {
          this.message.error(this.api.translate.instant('common.message.error.address'), "");
          oks = false
        } else {

          if (this.isValidPincode(this.addressinfoCurrent.PINCODE)) {
          }
          else {
            oks = false;
            this.message.error(this.api.translate.instant('common.message.error.wronginfo'), "");
          }
        }
        if (oks) {
          this.data.CURRENT_ADDRESS[0] = this.addressinfoCurrent
          this.data.CURRENT_ADDRESS[0]['CLIENT_ID'] = 1
          this.isButtonSpinning = true
          this.extraApplicantInformation.IS_PROVIDED = true;
          this.data.PERMANENT_ADDRESS[0] = this.addressinfoPermanent

          //console.log(this.familyDetils);
          this.age = this.data.AGE
          // this.data.DOB = this.datePipe.transform(this.data.DOB, "yyyy-MM-dd")
          //console.log(this.data.DOB)
          this.api.updatePersonalInformation(this.data)
            .subscribe(successCode => {


              ////console.log(successCode)
              if (successCode['code'] == "200") {
                // this.data.DATE_OF_MEMBERSHIP = this.datePipe.transform(this.data.DATE_OF_MEMBERSHIP, 'dd/MM/yyyy');
                this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
                var LOG_ACTION = 'User saved Personal Info  tab information'
                var DESCRIPTION = sessionStorage.getItem('userName') + 'has saved the Personal Info  for the proposal ' + this.LOAN_KEY
                var LOG_TYPE = 'I'
                this.api.proposalLogInformation(this.extraApplicantInformation.PROPOSAL_ID, this.extraApplicantInformation.CURRENT_STAGE_ID, 0, LOG_ACTION, Number(sessionStorage.getItem("userId")), DESCRIPTION, LOG_TYPE)
                  .subscribe(successCode => {
                    if (successCode['code'] == "200") {
                    }
                  });
                this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
                  .subscribe(successCode => {
                    if (successCode['code'] == "200") {
                      this.isButtonSpinning = false;
                      this.oldIndex++;
                      this.indexChanged.emit(this.oldIndex)

                      this.demo.emit(false)
                    }
                    else {
                      this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
                      this.isButtonSpinning = false;
                    }
                  });


              }
              else {
                this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
                this.isButtonSpinning = false;
              }
            });
        }

      } else {
        this.message.error(this.api.translate.instant('common.message.error.compinfo2'), "");
      }
    }
    else if (this.proposal_type == 2) {
      this.data.CURRENT_ADDRESS[0] = this.addressinfoCurrent
      this.data.CURRENT_ADDRESS[0]['CLIENT_ID'] = 1
      this.isButtonSpinning = true
      this.extraApplicantInformation.IS_PROVIDED = true;
      this.data.PERMANENT_ADDRESS[0] = this.addressinfoPermanent

      //console.log(this.familyDetils);
      this.age = this.data.AGE
      // this.data.DOB = this.datePipe.transform(this.data.DOB, "yyyy-MM-dd")
      //console.log(this.data.DOB)
      this.api.updatePersonalInformation(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            // this.data.DATE_OF_MEMBERSHIP = this.datePipe.transform(this.data.DATE_OF_MEMBERSHIP, 'dd/MM/yyyy');
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
            var LOG_ACTION = 'User saved Personal Info  tab information'
            var DESCRIPTION = sessionStorage.getItem('userName') + 'has saved the Personal Info  for the proposal ' + this.LOAN_KEY
            var LOG_TYPE = 'I'

            this.api.proposalLogInformation(this.extraApplicantInformation.PROPOSAL_ID, this.extraApplicantInformation.CURRENT_STAGE_ID, 0, LOG_ACTION, Number(sessionStorage.getItem("userId")), DESCRIPTION, LOG_TYPE)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                }
              });

            this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  this.isButtonSpinning = false;
                  this.oldIndex++;
                  this.indexChanged.emit(this.oldIndex)

                  this.demo.emit(false)
                }
                else {
                  this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
                  this.isButtonSpinning = false;
                }
              });


          }
          else {
            this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
            this.isButtonSpinning = false;
          }
        });

    }
  }




  // save() {
  //   this.data.TYPE = "B"
  //   this.data.EDUCATION = " "
  //   this.data.DOB = this.data.DOB
  //   let dob = this.data.DOB;
  //   console.log("dob in save :",this.data.DOB)
  //   this.data.PAN = " "
    
  //   this.data.FAMILY_MEMBERS =  this.familyDetils;
  //   this.data.MOBILE_NO2 == " "
  //   this.data.LANDLINE_NO == " "
  //   this.familyDetils = this.data.FAMILY_MEMBERS
  //   this.data.PERMANENT_ADDRESS[0] = [];

  //   console.log( this.familyDetils);
    
  //   var oks = true;
    
  //   if (this.data.APPLICANT_NAME != undefined && this.data.APPLICANT_NAME.trim() != ""
  //     && this.data.OCCUPATION != undefined && this.data.OCCUPATION.trim() != ""
  //     ) {
  //     if (this.data.MEMBERS_IN_FAMILY == undefined) {
  //       this.data.MEMBERS_IN_FAMILY = 0
  //     }

  //     if (this.data.DOB == undefined || this.data.DOB == '') {
  //       this.data.DOB = null
  //     } else
  //       if (this.data.DOB[0] >= 0 && this.data.DOB[0] <= 9
  //         && this.data.DOB[1] >= 0 && this.data.DOB[1] <= 9
  //         && this.data.DOB[3] >= 0 && this.data.DOB[3] <= 9 &&
  //         this.data.DOB[4] >= 0 && this.data.DOB[4] <= 9 &&
  //         this.data.DOB[9] >= 0 && this.data.DOB[9] <= 9 &&
  //         this.data.DOB[8] >= 0 && this.data.DOB[8] <= 9 &&
  //         this.data.DOB[7] >= 0 && this.data.DOB[7] <= 9 &&
  //         this.data.DOB[6] >= 0 && this.data.DOB[6] <= 9) {

  //         var conformedPhoneNumber = conformToMask(
  //           this.data.DOB,
  //           this.mask,
  //           { guide: false }
  //         )
  //         const str = conformedPhoneNumber.conformedValue.split('/');

  //         const year = Number(str[2]);
  //         const month = Number(str[1]) - 1;
  //         const dates = Number(str[0]);

  //         this.converted = new Date(year, month, dates)

  //         this.data.DOB = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
  //         this.onChange(dob)
  //       } else {
  //         oks = false
  //         this.message.error(this.api.translate.instant('basicinfo.dateerror'), "")
  //       }

  //     // if (this.data.YEAR <= 999) {
  //     //   oks = false;
  //     //   this.message.error(this.api.translate.instant('gpersonalinfo.label41'), "");
  //     // }

  //     // if (this.data.MOBILE_NO1 == undefined) {
  //     //   this.data.MOBILE_NO1 = " "
  //     // } else {
  //     //   if (this.isValidMobile(this.data.MOBILE_NO1)) { }
  //     //   else {
  //     //     oks = false;
  //     //     this.message.error(this.api.translate.instant('gpersonalinfo.message27'), "");
  //     //   }
  //     // }
  //     if (this.data.RELIGION == undefined)
  //       this.data.RELIGION = " "
  //     if (this.data.MEMBERSHIP_NUMBER == undefined) {
  //       this.data.MEMBERSHIP_NUMBER = " "
  //     }
  //     if (this.data.DATE_OF_MEMBERSHIP == undefined || this.data.DATE_OF_MEMBERSHIP == '') {
  //       this.data.DATE_OF_MEMBERSHIP = null
  //     } else
  //       if (this.data.DATE_OF_MEMBERSHIP[0] >= 0 && this.data.DATE_OF_MEMBERSHIP[0] <= 9
  //         && this.data.DATE_OF_MEMBERSHIP[1] >= 0 && this.data.DATE_OF_MEMBERSHIP[1] <= 9
  //         && this.data.DATE_OF_MEMBERSHIP[3] >= 0 && this.data.DATE_OF_MEMBERSHIP[3] <= 9 &&
  //         this.data.DATE_OF_MEMBERSHIP[4] >= 0 && this.data.DATE_OF_MEMBERSHIP[4] <= 9 &&
  //         this.data.DATE_OF_MEMBERSHIP[9] >= 0 && this.data.DATE_OF_MEMBERSHIP[9] <= 9 &&
  //         this.data.DATE_OF_MEMBERSHIP[8] >= 0 && this.data.DATE_OF_MEMBERSHIP[8] <= 9 &&
  //         this.data.DATE_OF_MEMBERSHIP[7] >= 0 && this.data.DATE_OF_MEMBERSHIP[7] <= 9 &&
  //         this.data.DATE_OF_MEMBERSHIP[6] >= 0 && this.data.DATE_OF_MEMBERSHIP[6] <= 9) {

  //         var conformedPhoneNumber = conformToMask(
  //           this.data.DATE_OF_MEMBERSHIP,
  //           this.mask,
  //           { guide: false }
  //         )
  //         const str = conformedPhoneNumber.conformedValue.split('/');

  //         const year = Number(str[2]);
  //         const month = Number(str[1]) - 1;
  //         const dates = Number(str[0]);

  //         this.converted = new Date(year, month, dates)

  //         this.data.DATE_OF_MEMBERSHIP = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
          
  //       } else {
  //         oks = false
  //         this.message.error(this.api.translate.instant('basicinfo.dateerror'), "")
  //       }
  //     if (this.data.MEMBERSHIP_AMOUNT == undefined) {
  //       this.data.MEMBERSHIP_AMOUNT = 0
  //     }
  //     if (this.data.CHILDREN_COUNT == undefined) {
  //       this.data.CHILDREN_COUNT = 0
  //     }
  //     if (this.data.AUDULT_COUNT == undefined) {
  //       this.data.AUDULT_COUNT = 0
  //     }
  //     if (this.addressinfoCurrent.HOUSE_NO == undefined) this.addressinfoCurrent.HOUSE_NO = "";
  //     if (this.addressinfoCurrent.BUILDING == undefined) this.addressinfoCurrent.BUILDING = ""
  //     if (this.addressinfoCurrent.LANDMARK == undefined) this.addressinfoCurrent.LANDMARK = "";
  //     if (

  //       (this.addressinfoCurrent.DISTRICT == undefined || this.addressinfoCurrent.DISTRICT.trim() == "") &&
  //       (this.addressinfoCurrent.PINCODE == undefined || this.addressinfoCurrent.PINCODE.trim() == "") &&
  //       (this.addressinfoCurrent.TALUKA == undefined || this.addressinfoCurrent.TALUKA.trim() == "") &&
  //       (this.addressinfoCurrent.STATE == undefined || this.addressinfoCurrent.STATE.trim() == "") &&
  //       (this.addressinfoCurrent.VILLAGE == undefined || this.addressinfoCurrent.VILLAGE.trim() == "")
  //       // && this.familyDeatils.length == this.data.MEMBERS_IN_FAMILY
  //     ) {
  //       this.message.error(this.api.translate.instant('common.message.error.address'), "");
  //       oks = false
  //     } else {

  //       if (this.isValidPincode(this.addressinfoCurrent.PINCODE)) {
  //       }
  //       else {
  //         oks = false;
  //         this.message.error(this.api.translate.instant('common.message.error.wronginfo'), "");
  //       }
  //     }
  //     if (oks) {
  //       this.data.CURRENT_ADDRESS[0] = this.addressinfoCurrent
  //       this.data.CURRENT_ADDRESS[0]['CLIENT_ID'] = 1
  //       this.isButtonSpinning = true
  //       this.extraApplicantInformation.IS_PROVIDED = true;
  //       this.data.PERMANENT_ADDRESS[0] = this.addressinfoPermanent
  //       this.data.FAMILY_MEMBERS = this.familyDetils

  //       console.log(this.familyDetils);
  //       this.age = this.data.AGE
  //       this.data.DOB=this.datePipe.transform(this.data.DOB,"yyyy-MM-dd")
  //       console.log(this.data.DOB)
  //       this.api.updatePersonalInformation(this.data)
  //         .subscribe(successCode => {

          
  //           //console.log(successCode)
  //           if (successCode['code'] == "200") {
  //             this.data.DATE_OF_MEMBERSHIP = this.datePipe.transform(this.data.DATE_OF_MEMBERSHIP, 'dd/MM/yyyy');
  //             this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
  //             var LOG_ACTION = 'User saved Personal Info  tab information'
  //             var DESCRIPTION = sessionStorage.getItem('userName') + 'has saved the Personal Info  for the proposal ' + this.LOAN_KEY
  //             var LOG_TYPE = 'I'
  //             this.api.proposalLogInformation(this.extraApplicantInformation.PROPOSAL_ID, this.extraApplicantInformation.CURRENT_STAGE_ID, 0, LOG_ACTION, Number(sessionStorage.getItem("userId")), DESCRIPTION, LOG_TYPE)
  //               .subscribe(successCode => {
  //                 if (successCode['code'] == "200") {
  //                 }
  //               });
  //             this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
  //               .subscribe(successCode => {
  //                 if (successCode['code'] == "200") {
  //                   this.isButtonSpinning = false;
  //                   this.oldIndex++;
  //                   this.indexChanged.emit(this.oldIndex)
                     
  //                   this.demo.emit(false)
  //                 }
  //                 else {
  //                   this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
  //                   this.isButtonSpinning = false;
  //                 }
  //               });


  //           }
  //           else {
  //             this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
  //             this.isButtonSpinning = false;
  //           }
  //         });
  //     }

  //   } else {
  //     this.message.error(this.api.translate.instant('common.message.error.compinfo2'), "");
  //   }

  // }


  



  VerifyUpdate() {

    if (this.extraApplicantInformation.REMARK != "") {
      this.isButtonSpinning2 = true
      this.extraApplicantInformation.IS_VERIFIED = true
      this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.isButtonSpinning2 = false

            this.oldIndex++;
            this.indexChanged.emit(this.oldIndex)
            var LOG_ACTION = ''
            var DESCRIPTION = ''
            if (this.extraApplicantInformation.IS_APPROVED == true) {
              LOG_ACTION = 'Personal Tab information Verified'

              DESCRIPTION = sessionStorage.getItem('userName') + ' has checked and approved the Personal for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK
            } else {
              LOG_ACTION = 'Personal Tab information Rejected'
              DESCRIPTION = sessionStorage.getItem('userName') + 'has checked and rejected the Personal for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK

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
            this.isButtonSpinning2 = false

          }
        });
    }
    else {
      this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
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

