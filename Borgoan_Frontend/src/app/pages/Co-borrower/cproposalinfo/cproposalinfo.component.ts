import { Component, OnInit, Input, ViewChild, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { Coborrower } from 'src/app/Models/PersonalProposal/coborrower';
import { CpersonalinfoComponent } from '../cpersonalinfo/cpersonalinfo.component';
import { Proposal } from 'src/app/Models/proposal';
import { Personalinformation } from 'src/app/Models/PersonalProposal/personalinformation';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { ApiService } from 'src/app/Service/api.service';
import { CpropertyinfoComponent } from '../cpropertyinfo/cpropertyinfo.component';
import { CfinancialinfoComponent } from '../cfinancialinfo/cfinancialinfo.component';
import { CdocumentinfoComponent } from '../cdocumentinfo/cdocumentinfo.component';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { NzNotificationService } from 'ng-zorro-antd';
import { Other } from 'src/app/Models/PersonalProposal/OTHER';
import { Guarantor } from 'src/app/Models/LoanTypeQues/Amulya/Guarantor/guarantor';

@Component({
  selector: 'app-cproposalinfo',
  templateUrl: './cproposalinfo.component.html',
  styleUrls: ['./cproposalinfo.component.css']
})
export class CproposalinfoComponent implements OnInit, AfterViewInit {
  @Input() LOAN_KEY: number
  @Input() drawerClose: Function;
  @Input() data: Guarantor;
  @Input() PROPOSAL_ID: number
  @Input() APPLICANT_ID: number
  @Input() proposalData: Proposal

  @Input() GID: number;

  @Output() changeName: EventEmitter<Guarantor> = new EventEmitter<Guarantor>();

  isSpinningTabs = false
  IndivisualInfotabs = []
  personalInfo: Personalinformation = new Personalinformation();
  addressinfoCurrent: Addressinfo = new Addressinfo();
  addressinfoPermanent: Addressinfo = new Addressinfo();
  other: Other = new Other()
  familyDeatails = []
  personalInformationId: number
  PROPOSAL_TYPE: string = ""
  applicantId: number
  @ViewChild(CpersonalinfoComponent) personalinfo1: CpersonalinfoComponent;

  IsSubmit = false
  @Input() CURRENT_STAGE_ID: number;
  @Input() IS_APPROVED: number;
  @ViewChild(CpropertyinfoComponent) property: CpropertyinfoComponent;
  @ViewChild(CfinancialinfoComponent) finanace: CfinancialinfoComponent;
  @ViewChild(CdocumentinfoComponent) document: CdocumentinfoComponent;
  selectedIndex = 0
  @Input() extraApplicantInformation: Extraapplicantinfo
  browserLang = ''
  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {
    this.browserLang = localStorage.getItem('locale');
  }
  ngAfterViewInit() {

  }

  loadInfo() {
    if(this.personalinfo1){
      this.personalinfo1.GuarantorData = this.data;
      this.personalinfo1.getData();
      this.personalinfo1.personalInfo.G_NAME = this.data.G_NAME;
      this.personalinfo1.personalInfo.G_MOBILE = this.data.G_MOBILE;
      this.personalinfo1.getExtraInfo();
    }
    if (this.property) {
      this.property.GuarantorInfo = this.data;
      this.property.getAllGproperties();
      this.property.getExtraInfo();
    }

  }
  changeGuarantorName(event) {
    this.changeName.emit(event);
  }
  chnage(val) {
    ////console.log(val)
    if (val == 2) {
      this.finanace.getSessionValues()
    }
    if (val == 4) {


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
  // getTabs() {
  //   let filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND APPLICANT_ID=" + this.applicantId + " AND TYPE='C'"
  //   this.api.getAllApplicantExtraInformation(0, 0, 'SEQ_NO', "asc", filter).subscribe(data => {
  //     if (data['count'] > 0) {
  //       this.IndivisualInfotabs = data['data'];
  //       this.checkStatus();
  //     }
  //     else {
  //       this.IndivisualInfotabs = [];
  //       this.checkStatus();
  //     }

  //   }, err => {
  //     ////console.log(err);
  //   });
  // }
  getTabs() {
    let filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND APPLICANT_ID=" + this.data.ID + " AND TYPE='S'"
    this.api.getAllApplicantExtraInformation(0, 0, 'SEQ_NO', "asc", filter).subscribe(data => {
      if (data['code'] == 200 && data['data'].length > 0) {
        this.IndivisualInfotabs = data['data'];
        this.loadInfo();
        this.checkStatus();
      }
      else {
        this.IndivisualInfotabs = [];

      }

    }, err => {
      ////console.log(err);
    });
  }

  // loadAllExtraInformationMapped(data: Coborrower, data1: Proposal) {
  //   ////console.log(data)
  //   ////console.log(data1)
  //   this.applicantId = data.APPLICANT_ID
  //   this.isSpinningTabs = true
  //   let filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND APPLICANT_ID=" + data.APPLICANT_ID + " AND TYPE='C'"
  //   ////console.log(filter)
  //   this.api.getAllApplicantExtraInformation(0, 0, 'SEQ_NO', "asc", filter).subscribe(data => {
  //     ////console.log("gurantor Info")
  //     if (data['count'] > 0) {
  //       this.selectedIndex = 0
  //       this.IndivisualInfotabs = data['data'];

  //       this.api.getAllIncomeInformation(0, 0, 'ID', 'ASC', filter).subscribe(data => {
  //         if (data['code'] == 200) {
  //           sessionStorage.setItem("C_IS_SAVED", data['data'][0]['IS_SAVED'])
  //         }
  //       }, err => {
  //         ////console.log(err);
  //       });



  //       if (data1.PRAPOSAL_TYPE == 'वैयक्तिक') {
  //         this.PROPOSAL_TYPE = "1"
  //         sessionStorage.setItem("PRAPOSAL_TYPE", this.PROPOSAL_TYPE)



  //         this.api.getAddressInfo(this.PROPOSAL_ID, "C", this.applicantId).subscribe(data => {
  //           ////console.log(data)
  //           if (data['code'] == 200) {
  //             this.personalInfo = Object.assign({}, data['data'][0]);
  //             //  this.personalInfo.MOBILE_NO1=data1.MOBILE_NUMBER
  //             sessionStorage.setItem("personalMobile", this.personalInfo.MOBILE_NO1)
  //             this.personalInformationId = this.personalInfo.ID
  //             this.addressinfoCurrent = Object.assign({}, data['data'][0]['CURRENT_ADDRESS'][0]);
  //             this.addressinfoPermanent = Object.assign({}, data['data'][0]['PERMANENT_ADDRESS'][0]);
  //             this.familyDeatails = data['data'][0]['FAMILY_MEMBERS']
  //             if (this.personalInfo.DOB != "") {
  //               this.personalinfo1.onChange(this.personalInfo.DOB)
  //             }

  //           }
  //         }, err => {
  //           ////console.log(err);
  //         });
  //       }
  //       else {
  //         this.api.getAddressInfo(this.PROPOSAL_ID, "C", this.applicantId).subscribe(data => {
  //           ////console.log("data proposal")
  //           ////console.log(data)
  //           if (data['code'] == 200) {
  //             this.personalInfo = Object.assign({}, data['data'][0]);
  //             this.personalInformationId = this.personalInfo.ID
  //             this.addressinfoCurrent = Object.assign({}, data['data'][0]['CURRENT_ADDRESS'][0]);
  //             this.addressinfoPermanent = Object.assign({}, data['data'][0]['PERMANENT_ADDRESS'][0]);
  //             this.familyDeatails = data['data'][0]['FAMILY_MEMBERS']
  //             if (this.personalInfo.DOB != "") {
  //               this.personalinfo1.onChange(this.personalInfo.DOB)

  //             }


  //           }
  //         }, err => {
  //           ////console.log(err);
  //         });
  //         this.PROPOSAL_TYPE = "2"
  //         sessionStorage.setItem("PRAPOSAL_TYPE", this.PROPOSAL_TYPE)
  //         // this.index=0
  //       }
  //     }
  //     else {
  //       this.IndivisualInfotabs = []
  //       sessionStorage.setItem("PRAPOSAL_TYPE", "0")
  //     }
  //     this.isSpinningTabs = false
  //   }, err => {
  //     ////console.log(err);
  //   });
  // }

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




//   chnage(val) {
//     //console.log(val)
//     if (val == 2) {
//       this.finanace.getSessionValues()
//     }
//     if (val == 4) {
//       this.property.loadInfo(1)

//     }

//     if (val == 5) {

//       this.document.getDocuments()
//     }
//   }
//   checkStatus() {
//     this.IsSubmit = true;
//     var data = []
//     data = this.IndivisualInfotabs.filter(object => {
//       return (object['IS_PROVIDED'] == 1);
//     });


//     if (data.length == this.IndivisualInfotabs.length) {
//       this.extraApplicantInformation.IS_PROVIDED = true
//       this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
//         .subscribe(successCode => {
//           if (successCode['code'] == "200") {
//             // this.message.success(this.api.translate.instant('common.message.error.success'), "");
//           }
//           else {
//             // this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");

//           }
//         });
//     }
//   }
//   getTabs() {
//     let filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND APPLICANT_ID=" + this.applicantId + " AND TYPE='C'"
//     this.api.getAllApplicantExtraInformation(0, 0, 'SEQ_NO', "asc", filter).subscribe(data => {
//       if (data['count'] > 0) {
//         this.IndivisualInfotabs = data['data'];
//         this.checkStatus();
//       }
//       else {
//         this.IndivisualInfotabs = [];
//         this.checkStatus();
//       }

//     }, err => {
//       //console.log(err);
//     });
//   }

//   loadAllExtraInformationMapped(data: Coborrower, data1: Proposal) {
//     //console.log(data)
//     //console.log(data1)
//     this.applicantId = data.APPLICANT_ID
//     this.isSpinningTabs = true
//     let filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND APPLICANT_ID=" + data.APPLICANT_ID + " AND TYPE='C'"
//     //console.log(filter)
//     this.api.getAllApplicantExtraInformation(0, 0, 'SEQ_NO', "asc", filter).subscribe(data => {
//       //console.log("gurantor Info")
//       if (data['count'] > 0) {
//         this.selectedIndex = 0
//         this.IndivisualInfotabs = data['data'];

//         this.api.getAllIncomeInformation(0, 0, 'ID', 'ASC', filter).subscribe(data => {
//           if (data['code'] == 200) {
//             sessionStorage.setItem("C_IS_SAVED", data['data'][0]['IS_SAVED'])
//           }
//         }, err => {
//           //console.log(err);
//         });



//         if (data1.PRAPOSAL_TYPE == 'वैयक्तिक') {
//           this.PROPOSAL_TYPE = "1"
//           sessionStorage.setItem("PRAPOSAL_TYPE", this.PROPOSAL_TYPE)



//           this.api.getAddressInfo(this.PROPOSAL_ID, "C", this.applicantId).subscribe(data => {
//             //console.log(data)
//             if (data['code'] == 200) {
//               this.personalInfo = Object.assign({}, data['data'][0]);
//               //  this.personalInfo.MOBILE_NO1=data1.MOBILE_NUMBER
//               sessionStorage.setItem("personalMobile", this.personalInfo.MOBILE_NO1)
//               this.personalInformationId = this.personalInfo.ID
//               this.addressinfoCurrent = Object.assign({}, data['data'][0]['CURRENT_ADDRESS'][0]);
//               this.addressinfoPermanent = Object.assign({}, data['data'][0]['PERMANENT_ADDRESS'][0]);
//               this.familyDeatails = data['data'][0]['FAMILY_MEMBERS']
//               if (this.personalInfo.DOB != "") {
//                 this.personalinfo1.onChange(this.personalInfo.DOB)
//               }
//               this.personalinfo1.loadInfo(this.PROPOSAL_ID, this.applicantId)
//             }
//           }, err => {
//             //console.log(err);
//           });
//         }
//         else {
//           this.api.getAddressInfo(this.PROPOSAL_ID, "C", this.applicantId).subscribe(data => {
//             //console.log("data proposal")
//             //console.log(data)
//             if (data['code'] == 200) {
//               this.personalInfo = Object.assign({}, data['data'][0]);
//               this.personalInformationId = this.personalInfo.ID
//               this.addressinfoCurrent = Object.assign({}, data['data'][0]['CURRENT_ADDRESS'][0]);
//               this.addressinfoPermanent = Object.assign({}, data['data'][0]['PERMANENT_ADDRESS'][0]);
//               this.familyDeatails = data['data'][0]['FAMILY_MEMBERS']
//               if (this.personalInfo.DOB != "") {
//                 this.personalinfo1.onChange(this.personalInfo.DOB)
//                 this.personalinfo1.loadInfo(this.PROPOSAL_ID, this.applicantId)
//               }


//             }
//           }, err => {
//             //console.log(err);
//           });
//           this.PROPOSAL_TYPE = "2"
//           sessionStorage.setItem("PRAPOSAL_TYPE", this.PROPOSAL_TYPE)
//           // this.index=0
//         }
//       }
//       else {
//         this.IndivisualInfotabs = []
//         sessionStorage.setItem("PRAPOSAL_TYPE", "0")
//       }
//       this.isSpinningTabs = false
//     }, err => {
//       //console.log(err);
//     });
//   }
//   VerifyUpdate() {

//     if (this.extraApplicantInformation.REMARK != "") {

//       this.extraApplicantInformation.IS_VERIFIED = true
//       this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
//         .subscribe(successCode => {
//           if (successCode['code'] == "200") {

//             // this.oldIndex++;
//             // this.indexChanged.emit(this.oldIndex)
//           }
//           else {
//             this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");


//           }
//         });
//     }
//     else {
//       this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
//     }
//   }

// }
