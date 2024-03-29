import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Personalinformation } from 'src/app/Models/PersonalProposal/personalinformation';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { NzModalRef, NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { ApiService } from 'src/app/Service/api.service';
import { DatePipe } from '@angular/common';
import { conformToMask } from 'angular2-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'


@Component({
  selector: 'app-gpersonalinfo',
  templateUrl: './gpersonalinfo.component.html',
  styleUrls: ['./gpersonalinfo.component.css'],
  providers: [DatePipe]
})
export class GpersonalinfoComponent implements OnInit {
  @Output() demo: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() CURRENT_STAGE_ID: number;
  @Input() PROPOSAL_ID: number;
  @Input() data: Personalinformation;
  @Input() addressinfoCurrent: Addressinfo;
  @Input() addressinfoPermanent: Addressinfo;
  @Input() familyDeatils
  @Input() personalInformationId
  @Input() APPLICANT_ID: number
  @Input() LOAN_KEY: Number;
  extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  converted: any;
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/MM/yyyy')

  isButtonSpinning = false
  isSpinning = false
  age: string
  NAME: string = ""
  RELATION: string
  OCCUPATION: string
  YEARLY_INCOME: number
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
    this.loadInfo(this.PROPOSAL_ID, this.APPLICANT_ID)
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

  loadInfo2(proposalId,applicantId) {
    this.api.getAddressInfo(proposalId, "B", applicantId).subscribe(data => {
      //console.log(data)
      if (data['code'] == 200 && data['data'].length > 0) {
        this.data = Object.assign({}, data['data'][0]); 
        console.log("data on load",this.data);
        this.personalInformationId = this.data.ID
        this.addressinfoCurrent = Object.assign({}, data['data'][0]['CURRENT_ADDRESS'][0]); 
        this.addressinfoPermanent = Object.assign({}, data['data'][0]['PERMANENT_ADDRESS'][0]); 
        this.familyDeatils = []
        var d = new Date(this.data.DATE_OF_MEMBERSHIP)
        this.data.DATE_OF_MEMBERSHIP = this.datePipe.transform(d, 'dd/MM/yyyy');
     
      }
    }, err => {
      //console.log(err);
    });
  }

  loadInfo(proposalId, applicantId) {
    let filter = " AND EXTRA_INFORMATION_ID=1 AND PROPOSAL_ID=" + proposalId + " AND APPLICANT_ID=" + applicantId + " AND TYPE='G'"
    this.api.getAllApplicantExtraInformation(0, 0, "SEQ_NO", "asc", filter).subscribe(data => {
      this.extraApplicantInformation = data['data'][0]
      console.log('extraApplicantInformation',this.extraApplicantInformation)
      //console.log(this.extraApplicantInformation)
    }, err => {
      //console.log(err);
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
    this.data.AGE = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25)
  }

 

  copyClick() {
    var addressinfoPermanent = new Addressinfo();
    addressinfoPermanent = Object.assign({}, this.addressinfoCurrent);
    addressinfoPermanent.ID = this.addressinfoPermanent.ID
    this.addressinfoPermanent = Object.assign({}, addressinfoPermanent);
  }
  addFamilyDetails() {
    if (this.familyDeatils.length == 0) {
      this.familyDeatils = [
        {
          ID: 0,
          PERSONAL_INFORMATION_ID: this.personalInformationId,
          NAME: this.NAME,
          RELATION: this.RELATION,
          OCCUPATION: this.OCCUPATION,
          YEARLY_INCOME: this.YEARLY_INCOME,
          ARCHIVE_FLAG: 'F',
          CLIENT_ID: this.api.clientId
        }
      ];
    }
    else {
      this.familyDeatils = [
        ...this.familyDeatils,
        {
          ID: 0,
          PERSONAL_INFORMATION_ID: this.personalInformationId,
          NAME: this.NAME,
          RELATION: this.RELATION,
          OCCUPATION: this.OCCUPATION,
          YEARLY_INCOME: this.YEARLY_INCOME,
          ARCHIVE_FLAG: 'F',
          CLIENT_ID: this.api.clientId
        }
      ];
      this.i++;
    }
  }

  addData() {
    if (this.NAME != undefined && this.RELATION != undefined && this.OCCUPATION != undefined && this.YEARLY_INCOME != undefined) {

      if (this.index1 > -1) {
        //console.log(this.familyDeatils[this.index1])
        this.familyDeatils[this.index1]['NAME'] = this.NAME;
        this.familyDeatils[this.index1]['RELATION'] = this.RELATION;
        this.familyDeatils[this.index1]['OCCUPATION'] = this.OCCUPATION;
        this.familyDeatils[this.index1]['YEARLY_INCOME'] = this.YEARLY_INCOME;

        this.index1 = -1

      }
      else {
        this.addFamilyDetails()

      }

      this.NAME = ""
      this.RELATION = ""
      this.OCCUPATION = ""
      this.YEARLY_INCOME = 0

    }
    else {
      this.message.error(this.api.translate.instant('common.message.error.emptyinfo'), "");
    }

  }


  deleteRow(data) {
    //console.log(data)

    if (data.ID == 0) {
      const index = this.familyDeatils.indexOf(data);
      this.familyDeatils.splice(index, 1);
      this.familyDeatils = this.familyDeatils.filter(object => {
        return object['ID'] != this.data
      });
    }
    else {
      this.confirmModal = this.modal.confirm({
        nzTitle: this.api.translate.instant('common.confirmModal.nzTitle'),
        nzContent: this.api.translate.instant('common.confirmModal.nzContent'),
        nzOnOk: () =>
          new Promise((resolve, reject) => {
            data.ARCHIVE_FLAG = "T";
            this.api.updateFamilyDetails(data)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                  const index = this.familyDeatils.indexOf(data);
                  this.familyDeatils.splice(index, 1);
                  this.familyDeatils = this.familyDeatils.filter(object => {
                    return object['ID'] != this.data
                  });

                }
              });
          }).catch(() => console.log('माहिती बदल करण्यात अयशस्वी!'))
      });
    }



  }

  editRow(data, i1: number) {
    this.index1 = i1
    this.NAME = data.NAME
    this.RELATION = data.RELATION
    this.OCCUPATION = data.OCCUPATION
    this.YEARLY_INCOME = data.YEARLY_INCOME
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

  focusss(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.DOB = undefined;
    }
  }

  save() {
    
    this.data.TYPE = "G"
    this.data.EDUCATION = " "
    this.data.DOB = this.data.DOB

  
    this.data.NET_WORTH_AS_ON = null
    this.data.PAN = " "
    this.data.AADHAR = " "
    this.data.FAMILY_MEMBERS = []
    this.data.MOBILE_NO2 == " "
    this.data.LANDLINE_NO == " "
    this.familyDeatils = []
    this.data.PERMANENT_ADDRESS = [];
    var oks = true;
    if (this.data.APPLICANT_NAME != undefined && this.data.APPLICANT_NAME.trim() != ""
      && this.data.OCCUPATION != undefined && this.data.OCCUPATION.trim() != ""
      // && this.data.AGE != undefined && this.data.AGE != 0
      // && this.data.DOB != undefined && this.data.DOB != 0
      ) {
      if (this.data.MEMBERS_IN_FAMILY == undefined) {
        this.data.MEMBERS_IN_FAMILY = 0
      }

      if (this.data.DOB == undefined || this.data.DOB == '') {
        this.data.DOB = null
      } else
        if (this.data.DOB[0] >= 0 && this.data.DOB[0] <= 9
          && this.data.DOB[1] >= 0 && this.data.DOB[1] <= 9
          && this.data.DOB[3] >= 0 && this.data.DOB[3] <= 9 &&
          this.data.DOB[4] >= 0 && this.data.DOB[4] <= 9 &&
          this.data.DOB[9] >= 0 && this.data.DOB[9] <= 9 &&
          this.data.DOB[8] >= 0 && this.data.DOB[8] <= 9 &&
          this.data.DOB[7] >= 0 && this.data.DOB[7] <= 9 &&
          this.data.DOB[6] >= 0 && this.data.DOB[6] <= 9) {

          var conformedPhoneNumber = conformToMask(
            this.data.DOB,
            this.mask,
            { guide: false }
          )
          const str = conformedPhoneNumber.conformedValue.split('/');

          const year = Number(str[2]);
          const month = Number(str[1]) - 1;
          const dates = Number(str[0]);

          this.converted = new Date(year, month, dates)

          this.data.DOB = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
          // this.onChange(this.data.DOB)
        } else {
          oks = false
          this.message.error(this.api.translate.instant('basicinfo.dateerror'), "")
        }
      // if (this.data.YEAR < 999) {
      //   oks = false;
      //   this.message.error(this.api.translate.instant('gpersonalinfo.label41'), "");
      // }
      if (this.data.MOBILE_NO1 == undefined) {
        this.data.MOBILE_NO1 = " "
      } else {
        if (this.isValidMobile(this.data.MOBILE_NO1)) { }
        else {
          oks = false;
          this.message.error(this.api.translate.instant('gpersonalinfo.message27'), "");
        }
      }

      if (this.data.RELIGION == undefined)
        this.data.RELIGION = " "
      if (this.data.MEMBERSHIP_NUMBER == undefined) {
        this.data.MEMBERSHIP_NUMBER = " "
      }

      if (this.data.DATE_OF_MEMBERSHIP == undefined || this.data.DATE_OF_MEMBERSHIP == '') {
        this.data.DATE_OF_MEMBERSHIP = null
      } else 
      if (this.data.DATE_OF_MEMBERSHIP[0] >= 0 && this.data.DATE_OF_MEMBERSHIP[0] <= 9
        && this.data.DATE_OF_MEMBERSHIP[1] >= 0 && this.data.DATE_OF_MEMBERSHIP[1] <= 9
        && this.data.DATE_OF_MEMBERSHIP[3] >= 0 && this.data.DATE_OF_MEMBERSHIP[3] <= 9 &&
        this.data.DATE_OF_MEMBERSHIP[4] >= 0 && this.data.DATE_OF_MEMBERSHIP[4] <= 9 &&
        this.data.DATE_OF_MEMBERSHIP[9] >= 0 && this.data.DATE_OF_MEMBERSHIP[9] <= 9 &&
        this.data.DATE_OF_MEMBERSHIP[8] >= 0 && this.data.DATE_OF_MEMBERSHIP[8] <= 9 &&
        this.data.DATE_OF_MEMBERSHIP[7] >= 0 && this.data.DATE_OF_MEMBERSHIP[7] <= 9 &&
        this.data.DATE_OF_MEMBERSHIP[6] >= 0 && this.data.DATE_OF_MEMBERSHIP[6] <= 9) {

        var conformedPhoneNumber = conformToMask(
          this.data.DATE_OF_MEMBERSHIP,
          this.mask,
          { guide: false }
        )
        const str = conformedPhoneNumber.conformedValue.split('/');
        
        const year = Number(str[2]);
        const month = Number(str[1]) - 1;
        const dates = Number(str[0]);

        this.converted = new Date(year, month, dates)

        this.data.DATE_OF_MEMBERSHIP = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
      } else {
        oks = false
        this.message.error(this.api.translate.instant('basicinfo.dateerror'), "")
      }

      if (this.data.MEMBERSHIP_AMOUNT == undefined) {
        this.data.MEMBERSHIP_AMOUNT = 0
      }
      if (this.data.CHILDREN_COUNT == undefined) {
        this.data.CHILDREN_COUNT = 0
      }
      if (this.data.AUDULT_COUNT == undefined) {
        this.data.AUDULT_COUNT = 0
      }
      if (this.data.RELATION_WITH_APPICANT == undefined) {
        this.data.RELATION_WITH_APPICANT = " ";
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
        //c this.data.DOB=this.datePipe.transform(this.data.DOB,"dd-MM-yyyy")
        this.data.CURRENT_ADDRESS[0] = this.addressinfoCurrent
        this.data.PERMANENT_ADDRESS[0] = this.addressinfoPermanent
        this.data.CURRENT_ADDRESS[0]['CLIENT_ID'] = 1
        this.isButtonSpinning = true
        this.extraApplicantInformation.IS_PROVIDED = true;
        console.log("data",this.data);
        this.api.updatePersonalInformation(this.data)
          .subscribe(successCode => {
            //console.log(successCode)
            if (successCode['code'] == "200") {
              sessionStorage.setItem('sname',this.data.APPLICANT_NAME)
              sessionStorage.setItem('soccupation',this.data.OCCUPATION)
              sessionStorage.setItem('shouse',this.addressinfoCurrent.HOUSE_NO)
              sessionStorage.setItem('saddress',this.addressinfoCurrent.VILLAGE)
              sessionStorage.setItem('smovable',this.data.MOVALE_PROPERTY_VALUE.toString())
              sessionStorage.setItem('simmovable',this.data.IMMOVALE_PROPERTY_VALUE.toString())
              this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
              this.data.DATE_OF_MEMBERSHIP = this.datePipe.transform(this.data.DATE_OF_MEMBERSHIP, 'dd/MM/yyyy');
              console.log("dob in is ok",this.data.DOB);
              this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    this.isButtonSpinning = false;
                    this.demo.emit(false)
                  }
                  else {
                    this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
                    this.isButtonSpinning = false;
                  }
                  if(this.data.DOB != undefined && this.data.DOB !=''){
                    let dArray = this.data.DOB.split('-');  
                    this.data.DOB = `${dArray[2]}/${dArray[1]}/${dArray[0]}`
                  }
                  else{
                   console.log("DOB is not Defined");
                    
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

  checkValidation() {
    if (this.data.MOBILE_NO2 != "") {
      if (this.isValidMobile(this.data.MOBILE_NO2)) { }
      else
        this.message.error(this.api.translate.instant('gpersonalinfo.message27'), "");
    }

    if (this.data.LANDLINE_NO != "") {
      if (this.data.LANDLINE_NO.length >= 10 && this.data.LANDLINE_NO, length <= 14) { }
      else
        this.message.error(this.api.translate.instant('gpersonalinfo.message28'), "");
    }

    if (this.data.PAN != undefined && this.data.PAN != '') {
      if (this.isValidPan(this.data.PAN)) { }
      else
        this.message.error(this.api.translate.instant('gpersonalinfo.message29'), "");
    }
    if (this.data.AADHAR != undefined && this.data.AADHAR != '') {
      if (this.isValidAdhar(this.data.AADHAR)) { }
      else
        this.message.error(this.api.translate.instant('gpersonalinfo.message30'), "");
    }

    if (this.isValidPincode(this.addressinfoCurrent.PINCODE)) { }
    else
      this.message.error(this.api.translate.instant('common.message.error.pincode'), "");

    if (this.isValidPincode(this.addressinfoPermanent.PINCODE)) { }
    else
      this.message.error(this.api.translate.instant('common.message.error.pincode2'), "");
  }

  VerifyUpdate() {

    if (this.extraApplicantInformation.REMARK != "") {
      this.isButtonVerifySpinning = true
      this.extraApplicantInformation.IS_VERIFIED = true
      this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.isButtonVerifySpinning = false
            this.demo.emit(false)
            var LOG_ACTION = ''
            var DESCRIPTION = ''
            if (this.extraApplicantInformation.IS_APPROVED == true) {
              LOG_ACTION = 'Guarantor personal Tab information Verified'

              DESCRIPTION = sessionStorage.getItem('userName') + ' has checked and approved the Guarantor personal for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK
            } else {
              LOG_ACTION = 'Guarantor personal Tab information Rejected'
              DESCRIPTION = sessionStorage.getItem('userName') + 'has checked and rejected the Guarantor personal for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK

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
            this.isButtonVerifySpinning = false

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

