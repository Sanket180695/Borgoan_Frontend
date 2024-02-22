import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Personalinformation } from 'src/app/Models/PersonalProposal/personalinformation';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { ApiService } from 'src/app/Service/api.service';
import { DatePipe } from '@angular/common';
import { NzNotificationService, NzModalService, NzModalRef } from 'ng-zorro-antd';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
interface Option {
  TALUKA: string;
  DISTRICT: string;
  STATE: string;
  PINCODE: string;
}

import { conformToMask } from 'angular2-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'
import { JointAccount } from 'src/app/Models/PersonalProposal/jointaccount';

@Component({
  selector: 'app-jointaccount',
  templateUrl: './jointaccount.component.html',
  styleUrls: ['./jointaccount.component.css']
})
export class JointaccountComponent implements OnInit {
  isButtonSpinning2 = false;
  @Input() data: JointAccount;
  @Input() addressinfoCurrent: Addressinfo;
  @Input() addressinfoPermanent: Addressinfo;
  @Input() familyDeatils
  @Input() oldIndex: number
  @Input() LOAN_KEY: Number;
  @Input() personalInformationId
  @Input() IndivisualInfotabs
  @Input() APPLICANT_ID
  userId = sessionStorage.getItem('userId');
  @Input() PROPOSAL_ID: number;
  @Output() demo: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() CURRENT_STAGE_ID: number;
  extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();
  converted: any;
  addressinfo: Addressinfo = new Addressinfo();
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')
  roleId = sessionStorage.getItem("roleId")

  joint: JointAccount = new JointAccount()
  isButtonSpinning = false
  isSpinning = false
  age: string
  NAME: string = ""
  RELATION: string
  PARENT_NAME:string;
  FOCCUPATION: string
  YEARLY_INCOME: number
  FAGE: number
  //familyDeatils=[]
  confirmModal?: NzModalRef;
  i = 2

  isButtonVerifySpinning = false
  index1 = -1
  maxBirthDate = new Date();
  talukas = []
  districts = []
  states = []
  logtext = ''
  pincodes = []
  options = []
  constructor(private api: ApiService, private datePipe: DatePipe, private message: NzNotificationService) { }

  ngOnInit(): void {

    // this.loadInfo(this.PROPOSAL_ID)

    this.getData()
    this.loadInfo()

    // console.log(this.getData(),"oks");

  }

  TALUKA: any

  loadAddress(addressId) {
    this.addressinfo = new Addressinfo();
    if (addressId > 0) {
      this.isSpinning = true

      let filter = " AND ID=" + addressId
      this.api.getAllAddressInformation(0, 0, 'ID', 'desc', filter).subscribe(data => {
        this.addressinfo = data['data'][0]
        console.log(this.addressinfo, "sangli")
        this.addressinfo.VILLAGE = data['data'][0]['VILLAGE']
        this.TALUKA = data['data'][0]['TALUKA']
        console.log(this.TALUKA)
        this.addressinfo.DISTRICT = data['data'][0]['DISTRICT']
        this.isSpinning = false
      }, err => {
      });
    }
  }

  addressinfodata
  addressinfo1
  getData() {

    this.api.getAllJoints(0, 0, 'ID', "asc", "AND PROPOSAL_ID=" + this.PROPOSAL_ID)
      .subscribe(data => {

        if (data['code'] == "200" && data['count'] > 0) {
          this.joint = data['data']

          this.data.NAME = data['data'][0]['NAME']
          this.data.OCCUPATION = data['data'][0]['OCCUPATION']
          this.data.RELATION = data['data'][0]['RELATION']
          this.data.PARENT_NAME = data['data'][0]['PARENT_NAME']
          console.log(this.data.PARENT_NAME+"inside getdata");

          var d = data['data'][0]['DOB']
          this.data.DOB = this.datePipe.transform(d, 'dd/MM/yyyy');
          console.log(this.data.DOB );
          this.data.AGE = data['data'][0]['AGE']
          this.data.ID = data['data'][0]['ID']

          this.addressinfodata = JSON.parse(data['data'][0]['ADDRESS'])
          this.addressinfo1 = Object.assign({}, this.addressinfodata);
          this.addressinfo = this.addressinfo1[0]

          // console.log(this.addressinfo.TALUKA)

          // console.log(this.addressinfo,"joiffffffffnt");


        }
      });
  }

  loadInfo() {
    let filter = " AND EXTRA_INFORMATION_ID=14 AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND TYPE='B'"
    this.api.getAllApplicantExtraInformation(0, 0, "SEQ_NO", "asc", filter).subscribe(data => {
      this.extraApplicantInformation = data['data'][0]

      // this.extraApplicantInformation.ID=data['data'][0]['ID']
    }, err => {
      //console.log(err);
    });
  }



  onChange(date) {
    const darray = date.split('/');
    let bdate = new Date(darray[2],darray[1],darray[0]);
    console.log(bdate);
    console.log(Date.now)
    let timeDiff = Math.abs(Date.now() - bdate.getTime());
    console.log(timeDiff)
    this.data.AGE = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    this.age = this.data.AGE;
    console.log(this.age);
  }








  focusss(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.DOB = undefined;
    }
  }

  save(addNew: boolean): void {
    //console.log(this.data.MOVABLE_TYPE)
    var ok = true



    // if (this.data.IS_VALUATION_DONE) {
    //   if (this.data.VALUATION_AMOUNT == undefined)
    //     ok = false
    // }

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
        // oks = false
        this.message.error(this.api.translate.instant('basicinfo.dateerror'), "")
      }

    if (this.addressinfo.R_S_NO == undefined) this.addressinfo.R_S_NO = 0;
    if (this.addressinfo.TMC_NO == undefined) this.addressinfo.TMC_NO = 0;
    if (this.addressinfo.SURVEY_NO == undefined) this.addressinfo.SURVEY_NO = 0;
    if (this.addressinfo.FLAT_NO == undefined) this.addressinfo.FLAT_NO = 0;
    if (this.addressinfo.PLOT_NO == undefined) this.addressinfo.PLOT_NO = 0;
    if (this.addressinfo.E_SWATTU == undefined) this.addressinfo.E_SWATTU = 0;
    if (this.addressinfo.CTS_NO == undefined) this.addressinfo.CTS_NO = 0;
    if (this.addressinfo.BUILDING == undefined) this.addressinfo.BUILDING = ""
    if (this.addressinfo.LANDMARK == undefined) this.addressinfo.LANDMARK = "";
    if (this.addressinfo.PINCODE == undefined) this.addressinfo.PINCODE = "";
    if (this.addressinfo.STATE == undefined) this.addressinfo.STATE = "";

    if (this.addressinfo.DISTRICT == undefined) this.addressinfo.DISTRICT = "";
    if (this.addressinfo.TALUKA == undefined) this.addressinfo.TALUKA = "";
    if (this.addressinfo.VILLAGE == undefined) this.addressinfo.VILLAGE = "";
    // if ( 
    //   (this.addressinfo.DISTRICT == undefined || this.addressinfo.DISTRICT.trim() == "") && 
    //   // (this.addressinfo.PINCODE == undefined || this.addressinfo.PINCODE.trim() == "") &&
    //   (this.addressinfo.TALUKA == undefined || this.addressinfo.TALUKA.trim() == "") &&
    //   // (this.addressinfo.STATE == undefined || this.addressinfo.STATE.trim() == "") &&
    //   (this.addressinfo.VILLAGE == undefined || this.addressinfo.VILLAGE.trim() == "")

    // ) {
    //   this.message.error(this.api.translate.instant('common.message.error.address'), "");
    //   ok = false
    // } else {

    //   // if (this.isValidPincode(this.addressinfo.PINCODE)) {
    //   // }
    //   // else {
    //   //   ok = false;
    //   //   this.message.error(this.api.translate.instant('common.message.error.wronginfo'), "");
    //   // }
    // }
    if (ok) {

      // this.data.IS_AGRICULTURE_LAND_OR_OTHER = 'A'
      this.addressinfo.PINCODE = "416416"
      if (this.data.ADDRESS_ID > 0) {
        this.addressinfo.ID = this.data.ADDRESS_ID
        this.api.updateAddressInformation(this.addressinfo)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.save1(addNew)
            }
            else {

              this.logtext = 'Update & Close - PropertyInformation form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - BuisnessInformation ]";
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
        this.api.createAddressInformation(this.addressinfo)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.data.ADDRESS_ID = successCode['data'][0]['ID']
              this.save1(addNew)

            } else {
              this.logtext = 'Update & Close - PropertyInformation form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - BuisnessInformation ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    // console.log(successCode);
                  }
                  else {
                    // console.log(successCode);
                  }
                });

              this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
              this.isSpinning = false;
            }
          });
      }

    }
  }



  save1(addNew: boolean) {


    console.log(this.data, "data")

    this.data.PROPOSAL_ID = this.PROPOSAL_ID
    this.data.RELATION = this.data.RELATION
    this.data.PARENT_NAME = this.data.PARENT_NAME

    this.data.AGE = this.data.AGE
    //  this.data.Gender= this.data.Gender

    this.data.DOB = this.datePipe.transform(this.data.DOB, 'yyyy-MM-dd');
    console.log(this.data.ID, "Id");

    if (this.data.ID) {


      // this.data.ACCOUNT_NUMBER=this.data.ACCOUNT_NUMBER
      this.api.updatejoints(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");


            this.getData()

            this.data.PROPOSAL_ID = this.PROPOSAL_ID
            // this.extraApplicantInformation.IS_VERIFIED = true
            this.extraApplicantInformation.IS_APPROVED = 0
            this.extraApplicantInformation.IS_PROVIDED = 1
            // this.extraApplicantInformation.IS_PROVIDED_NULL=true
            this.extraApplicantInformation.PROPOSAL_ID = this.PROPOSAL_ID
            this.extraApplicantInformation.EXTRA_INFORMATION_ID = 14
            console.log(this.extraApplicantInformation.ID, "ID");

            this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {

                  // this.loadInfo()
                  this.isButtonSpinning = false;
                  this.demo.emit(false)
                }
                else {
                  this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
                  this.isButtonSpinning = false;
                }
              });





            // this.drawerClose1();
            this.isSpinning = false;
          }
          else {

            this.logtext = 'Update & Close - BankLoan form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - BankLoan ]";
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
            this.isSpinning = false;
          }
        });
    }
    else {
      // this.data.ACCOUNT_NUMBER=this.data.ACCOUNT_NUMBER
      this.data.PROPOSAL_ID = this.PROPOSAL_ID
      this.data.DOB = this.datePipe.transform(this.data.DOB, 'yyyy-MM-dd');
      this.api.createjoints(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('common.message.success.addinfo2'), "");


            this.isSpinning = false;
            this.getData()

            this.extraApplicantInformation.EXTRA_INFORMATION_ID = 14
            this.data.PROPOSAL_ID = this.PROPOSAL_ID
            this.extraApplicantInformation.IS_VERIFIED = 1
            this.extraApplicantInformation.IS_APPROVED = 0
            this.extraApplicantInformation.IS_PROVIDED = 1
            this.extraApplicantInformation.PROPOSAL_ID = this.PROPOSAL_ID

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
              });
          }
          else {
            this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
            this.isSpinning = false;
            this.logtext = 'Save & Close - BankLoan form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - BankLoan ]";
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
    console.log(this.extraApplicantInformation.IS_APPROVED, "dsgjhgd")
    this.VerifyUpdate();
    console.log(this.VerifyUpdate(), "ewy");

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
              // this.oldIndex++;
              // this.indexChanged.emit(this.oldIndex)
              this.demo.emit(false)
              var LOG_ACTION = ''
              var DESCRIPTION = ''
              if (this.extraApplicantInformation.IS_APPROVED == true) {
                LOG_ACTION = 'Coborrower info Tab information Verified'

                DESCRIPTION = sessionStorage.getItem('userName') + ' has checked and approved the Coborrower info for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK
              } else {
                LOG_ACTION = 'Coborrower info Tab information Rejected'
                DESCRIPTION = sessionStorage.getItem('userName') + 'has checked and rejected the Coborrower info for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK

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

}

