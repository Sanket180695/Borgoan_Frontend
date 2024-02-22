import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Gurantorinfo } from 'src/app/Models/FirmProposal/gurantorinfo';
import { ApiService } from 'src/app/Service/api.service';
import { GpersonalinfoComponent } from '../gpersonalinfo/gpersonalinfo.component';
import { Personalinformation } from 'src/app/Models/PersonalProposal/personalinformation';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { Proposal } from 'src/app/Models/proposal';
import { GpropertyinfoComponent } from '../gpropertyinfo/gpropertyinfo.component';
import { GfinancialinfoComponent } from '../gfinancialinfo/gfinancialinfo.component';
import { GdocumentinfoComponent } from '../gdocumentinfo/gdocumentinfo.component';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { NzNotificationService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-gproposalinfo',
  templateUrl: './gproposalinfo.component.html',
  styleUrls: ['./gproposalinfo.component.css'],
  providers: [DatePipe]
})
export class GproposalinfoComponent implements OnInit {
  @Input() LOAN_KEY: Number;
  @Input() drawerClose: Function;
  @Input() data: Gurantorinfo;
  @Input() PROPOSAL_ID: number
  @Input() APPLICANT_ID: number
  @Input() proposalData: Proposal

  isSpinningTabs = false
  IndivisualInfotabs = []
  personalInfo: Personalinformation = new Personalinformation();
  addressinfoCurrent: Addressinfo = new Addressinfo();
  addressinfoPermanent: Addressinfo = new Addressinfo();
  familyDeatails = []
  personalInformationId: number
  PROPOSAL_TYPE: string = ""
  applicantId: number
  @ViewChild(GpersonalinfoComponent, { static: false }) personalinfo1: GpersonalinfoComponent;
  IsSubmit = false
  @Input() CURRENT_STAGE_ID: number;
  @ViewChild(GpropertyinfoComponent) property: GpropertyinfoComponent;
  @ViewChild(GfinancialinfoComponent) finanace: GfinancialinfoComponent;
  @ViewChild(GdocumentinfoComponent) document: GdocumentinfoComponent;
  selectedIndex = 0
  @Input() extraApplicantInformation: Extraapplicantinfo
  browserLang = ''
  constructor( private datePipe: DatePipe,private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {
    this.browserLang = localStorage.getItem('locale');
  }

  chnage(val) {
    //console.log(val)
    if (val == 2) {
      this.finanace.getSessionValues()
    }
    if (val == 4) {
      this.property.loadInfo(1)

    }

    if (val == 5) {

      this.document.getDocuments()
    }
  }

  checkStatus() {
    this.IsSubmit = true;
    var data = []
    data = this.IndivisualInfotabs.filter(object => {
      return (object['IS_PROVIDED'] == 1);
    });


    if (data.length == this.IndivisualInfotabs.length) {
      this.extraApplicantInformation.IS_PROVIDED = true
      this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            // this.message.success(this.api.translate.instant('common.message.error.success'), "");
          }
          else {
            // this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");

          }
        });
    }
  }

  getTabs() {
    let filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND APPLICANT_ID=" + this.applicantId + " AND TYPE='G'"
    this.api.getAllApplicantExtraInformation(0, 0, 'SEQ_NO', "asc", filter).subscribe(data => {
      if (data['count'] > 0) {
        this.IndivisualInfotabs = data['data'];
        if(this.PROPOSAL_TYPE = "1")
        this.personalinfo1.loadInfo2(this.PROPOSAL_ID, this.APPLICANT_ID)
        this.checkStatus();
      }
      else {
        this.IndivisualInfotabs = [];
        this.checkStatus();
      }

    }, err => {
      //console.log(err);
    });
  }

  loadAllExtraInformationMapped(data: Gurantorinfo, data1: Proposal) {
    //console.log(data)
    //console.log(data1)
    this.applicantId = data.APPLICANT_ID
    this.isSpinningTabs = true
    let filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND APPLICANT_ID=" + data.APPLICANT_ID + " AND TYPE='G'"
    //console.log(filter)
    this.api.getAllApplicantExtraInformation(0, 0, 'SEQ_NO', "asc", filter).subscribe(data => {
      //console.log("gurantor Info")
      if (data['count'] > 0) {
        this.selectedIndex = 0
        this.IndivisualInfotabs = data['data'];

        this.api.getAllIncomeInformation(0, 0, 'ID', 'ASC', filter).subscribe(data => {
          if (data['code'] == 200) {
            sessionStorage.setItem("G_IS_SAVED", data['data'][0]['IS_SAVED'])
          }
        }, err => {
          //console.log(err);
        });



        if (data1.PRAPOSAL_TYPE == 'वैयक्तिक') {
          this.PROPOSAL_TYPE = "1"
          sessionStorage.setItem("PRAPOSAL_TYPE", this.PROPOSAL_TYPE)


          this.api.getAddressInfo(this.PROPOSAL_ID, "G", this.applicantId).subscribe(data => {

            if (data['code'] == 200) {

              this.personalInfo = Object.assign({}, data['data'][0]);
              console.log("personalInfo",this.personalInfo)
              if(this.personalInfo.DOB != undefined && this.personalInfo.DOB !=''){
                let dArray = this.personalInfo.DOB.split('-');  
                this.personalInfo.DOB = `${dArray[2]}/${dArray[1]}/${dArray[0]}`
              }
              else{
               console.log("DOB is not Defined");
                
              }
              // this.personalInfo.MOBILE_NO1=data1.MOBILE_NUMBER
              sessionStorage.setItem("personalMobile", this.personalInfo.MOBILE_NO1)
              this.personalInformationId = this.personalInfo.ID
              this.addressinfoCurrent = Object.assign({}, data['data'][0]['CURRENT_ADDRESS'][0]);
              this.addressinfoPermanent = new Addressinfo();
              this.familyDeatails = []
              this.personalInfo.DATE_OF_MEMBERSHIP = this.datePipe.transform(this.personalInfo.DATE_OF_MEMBERSHIP, 'dd/MM/yyyy');
              // if (this.personalInfo.DOB != "") {
              // this.personalinfo1.onChange(this.personalInfo.DOB)
              // }
              this.personalinfo1.loadInfo(this.PROPOSAL_ID, this.applicantId)
            }
          }, err => {
            //console.log(err);
          });
        }
        else {

          this.api.getAddressInfo(this.PROPOSAL_ID, "G", this.applicantId).subscribe(data => {
            //console.log("data proposal")
            //console.log(data)
            if (data['code'] == 200) {
              this.personalInfo = Object.assign({}, data['data'][0]);
              this.personalInformationId = this.personalInfo.ID
              this.addressinfoCurrent = Object.assign({}, data['data'][0]['CURRENT_ADDRESS'][0]);
              this.addressinfoPermanent = new Addressinfo();
              this.familyDeatails = []
              // this.personalinfo1.onChange(this.personalInfo.DOB)
              this.personalInfo.DATE_OF_MEMBERSHIP = this.datePipe.transform(this.personalInfo.DATE_OF_MEMBERSHIP, 'dd/MM/yyyy');
              this.personalinfo1.loadInfo(this.PROPOSAL_ID, this.applicantId)


            }
          }, err => {
            //console.log(err);
          });
          this.PROPOSAL_TYPE = "2"
          sessionStorage.setItem("PRAPOSAL_TYPE", this.PROPOSAL_TYPE)
          // this.index=0
        }
      }
      else {
        this.IndivisualInfotabs = []
        sessionStorage.setItem("PRAPOSAL_TYPE", "0")
      }
      this.isSpinningTabs = false
    }, err => {
      //console.log(err);
    });
  }

  VerifyUpdate() {

    if (this.extraApplicantInformation.REMARK != "") {

      this.extraApplicantInformation.IS_VERIFIED = true
      this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {

            // this.oldIndex++;
            // this.indexChanged.emit(this.oldIndex)
          }
          else {
            this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");


          }
        });
    }
    else {
      this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
    }
  }

}
