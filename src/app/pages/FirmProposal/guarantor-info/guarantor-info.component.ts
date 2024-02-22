import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { ApiService } from 'src/app/Service/api.service';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { Gurantorinfo } from 'src/app/Models/FirmProposal/gurantorinfo';
import { Proposal } from 'src/app/Models/proposal';
import { GproposalinfoComponent } from '../../GurantorForms/gproposalinfo/gproposalinfo.component';
import { BusinessInfo } from 'src/app/Models/PersonalProposal/business-info';
import { AgriInfo } from 'src/app/Models/PersonalProposal/agri-info';
import { Personalinformation } from 'src/app/Models/PersonalProposal/personalinformation';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { Incomeinformation } from 'src/app/Models/PersonalProposal/incomeinformation';
import { SalariedInfo } from 'src/app/Models/PersonalProposal/salaried-info';
import { Creditinformation } from 'src/app/Models/PersonalProposal/creditinformation';
import { Propertyinformation } from 'src/app/Models/PersonalProposal/propertyinformation';
import { BankLoan } from '../../PersonalProposal/credit-info/Models/bank-loan';
import { Financialinformation } from 'src/app/Models/PersonalProposal/financialinformation';
@Component({
  selector: 'app-guarantor-info',
  templateUrl: './guarantor-info.component.html',
  styleUrls: ['./guarantor-info.component.css']
})
export class GuarantorInfoComponent implements OnInit {
  @Input() PROPOSAL_ID: number;
  @Input() APPLICANT_ID: Number;
  @Input() LOAN_KEY: Number;
  @Input() data: Proposal;
  @Output() demo : EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() CURRENT_STAGE_ID: number;  
  isButtonSpinning2 = false
  @Input() oldIndex: number
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();
  isButtonVerifySpinning = false
  formTitle = "Manage GuarantorInfo";
  pageIndex = 1;
  GdataList2 = []
  pageSize = 100;
  totalRecords = 1;
  dataList = [];
  loadingRecords = true;
  sortValue: string = "desc";
  sortKey: string = "id";
  searchText: string = "";
  filterQuery: string = "";
  isFilterApplied: string = "default";
  logtext: string = "";
  isButtonSpinning = false;
  isSpinning = false;
  NAME: string = "";
  MOBILE_NUMBER: string = "";
  guarntorData: Gurantorinfo = new Gurantorinfo;
  extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  roleId = sessionStorage.getItem("roleId")
  i = 2;
  index1 = -1
  ID = 0
  bankLoanType = Number(sessionStorage.getItem("bankLoanId"))
  mode = "I"
  drawerPersonalProposalVisible = false
  drawerPersonalProposalTitle: string = ""
  drawerData: Proposal = new Proposal();
  isAddSpinning = false
  coborrowerData = []
  @ViewChild(GproposalinfoComponent) personalProposal: GproposalinfoComponent;

  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit() {
    this.getdata();
    this.loadInfo()

    this.GdataList2 = [
      {
        'gdataLists': [new BusinessInfo()],
        'gagridataList': [new AgriInfo()],
        'gpersonalInfo': new Personalinformation(),
        'gaddressinfoCurrent': new Addressinfo(),
        'gincomedata': new Incomeinformation(),
        'gincomeTypeData': [],
        'gdataSalary': new SalariedInfo(),
        'gaddressinfoBBussiness': new Addressinfo(),
        'gcreditdata': [new Creditinformation()],
        'gdataLTList6': [new BankLoan()],
        'gdataListO': [new Propertyinformation()],
        "gfinancialData": new Financialinformation()
      },
      {
        'gdataLists': [new BusinessInfo()],
        'gagridataList': [new AgriInfo()],
        'gpersonalInfo': new Personalinformation(),
        'gaddressinfoCurrent': new Addressinfo(),
        'gincomedata': new Incomeinformation(),
        'gincomeTypeData': [],
        'gdataSalary': new SalariedInfo(),
        'gaddressinfoBBussiness': new Addressinfo(),
        'gcreditdata': [new Creditinformation()],
        'gdataLTList6': [new BankLoan()],
        'gdataListO': [new Propertyinformation()],
        "gfinancialData": new Financialinformation()
      }
    ];
  }



  loadInfo() {
    let filter = " AND EXTRA_INFORMATION_ID=9 AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND TYPE='B'"
    this.api.getAllApplicantExtraInformation(0, 0, "SEQ_NO", "asc", filter).subscribe(data => {
      this.extraApplicantInformation = data['data'][0]
    }, err => {
      //console.log(err);
    });
  }

// getgaddressinfo(){
//   this.api.getAddressInfo(this.PROPOSAL_ID, 'C', item.APPLICANT_ID).subscribe(data => {
//     if (data['code'] == 200 && data['data'].length > 0) {
//       this.CBdataList.push(data['data'][0]);
//     }
//   }, err => {
//     //console.log(err);
//   });
// }


  getdata() {
    this.isSpinning = true;


    this.api.getAllGuarantorInformation(this.pageIndex, this.pageSize, this.sortKey, this.sortValue, "AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND VISIBILITY=1").subscribe(data => {
      //console.log(data)
      this.isSpinning = false;
      this.totalRecords = data['count'];
      this.dataList = data['data'];
      console.log("dataList",this.dataList);
    }, err => {
      //console.log(err);
    });

    // this.api.getAllCoborrowerInformation(this.pageIndex, this.pageSize, this.sortKey, this.sortValue, "AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND VISIBILITY=1").subscribe(data => {
    //   //console.log("coborrower")
    //   //console.log(data)
    //   this.coborrowerData = data['data'];
    // }, err => {
    //   //console.log(err);
    // });

  }

  addguarntorData() {
    this.dataList.push({
      ID: this.ID,
      NAME: this.NAME,
      MOBILE_NUMBER: this.MOBILE_NUMBER,
      CLIENT_ID: this.api.clientId
    });
  }



  addData() {

    let isok = true

    if (this.NAME != undefined && this.NAME != "" && this.MOBILE_NUMBER != undefined && this.MOBILE_NUMBER != "") {
      if (this.MOBILE_NUMBER != undefined && this.MOBILE_NUMBER != "")
        if ((/^[6-9]{1}[0-9]{9}$/).test(this.MOBILE_NUMBER.toString()) == false) {
          this.message.error(this.api.translate.instant('common.checkmobile'), "");
          isok = false
        }
    }
    else {
      isok = false
      this.message.error(this.api.translate.instant('common.message.error.emptyinfo'), "");
    }

    let personalMobile = sessionStorage.getItem("personalMobile")


    if (personalMobile == this.MOBILE_NUMBER) {
      isok = false
      this.message.error(this.api.translate.instant('guarantor-info.message1'), "");
    }


    var filterData = this.dataList.filter(object => {
      return object['MOBILE_NUMBER'] == this.MOBILE_NUMBER
    });

    var filterDataCoborrower = this.coborrowerData.filter(object => {
      return object['MOBILE_NUMBER'] == this.MOBILE_NUMBER
    });

    //console.log(" gurantor data: " + filterData.length)

    //console.log(" Coborrower data: " + filterDataCoborrower.length)


    if (filterData.length > 0) {
      isok = false
      this.message.error(this.api.translate.instant('coborrowerinfo.message3'), "");
    }

    if (filterDataCoborrower.length > 0) {
      isok = false
      this.message.error(this.api.translate.instant('coborrowerinfo.message2'), "");
    }

    // if(isok)
    // {
    //     if(this.index1 > -1){
    //       //console.log(this.dataList[this.index1])
    //       this.dataList[this.index1]['NAME'] = this.NAME;
    //       this.dataList[this.index1]['MOBILE_NUMBER'] = this.MOBILE_NUMBER;
    //       this.index1=-1
    //       this.NAME=""
    //       this.MOBILE_NUMBER=""
    //     }
    //     else
    //     {
    //       this.addguarntorData()
    //       this.NAME = ""
    //       this.MOBILE_NUMBER = ""
    //     }

    // }


    if (isok) {

      this.guarntorData.NAME = this.NAME
      this.guarntorData.MOBILE_NUMBER = this.MOBILE_NUMBER
      this.guarntorData.VISIBILITY = 1
      this.guarntorData.PROPOSAL_ID = this.PROPOSAL_ID
      this.isAddSpinning = true
      this.api.createGurantorInfo(this.guarntorData)
        .subscribe(successCode => {
          //console.log(successCode)
          if (successCode['code'] == "200") {
            var LOG_ACTION = 'User saved Guarantor Info  tab information'
            var DESCRIPTION = sessionStorage.getItem('userName') + 'has saved the Guarantor Info  for the proposal ' + this.LOAN_KEY 
            var LOG_TYPE = 'I'
            this.api.proposalLogInformation(this.extraApplicantInformation.PROPOSAL_ID, this.extraApplicantInformation.CURRENT_STAGE_ID, 0, LOG_ACTION, Number(sessionStorage.getItem("userId")), DESCRIPTION, LOG_TYPE)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                }
              });
            this.getdata()
            this.NAME = ""
            this.MOBILE_NUMBER = ""
            this.message.success(this.api.translate.instant('common.message.error.success'), "");
            this.logtext = 'Save & Close - GuarantorInformation form - SUCCESS - ' + JSON.stringify(this.dataList) + " KEYWORD [C - GuarantorInformation ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });
            this.isAddSpinning = false;
          }
          else if (successCode['code'] == "350") {
            this.message.error(successCode['message'], "");
            this.isAddSpinning = false;
          }
          else {
            this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
            this.isAddSpinning = false;
            this.logtext = 'Save & Close - GuarantorInformation form - ERROR - ' + JSON.stringify(this.dataList) + " KEYWORD [C - GuarantorInformation ]";
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

  deleteRow(data) {
    const index = this.dataList.indexOf(data);
    this.dataList.splice(index, 1);
  }

  edit(data, i1: number): void {
    this.index1 = i1
    this.NAME = data.NAME
    this.MOBILE_NUMBER = data.MOBILE_NUMBER
  }

  save(): void {

    if (this.bankLoanType == 4) {
      if (this.dataList.length >= 1) {
        this.isButtonSpinning = true;

        this.extraApplicantInformation.IS_PROVIDED = true
        this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('common.message.error.success'), "");
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
        this.message.error(this.api.translate.instant('guarantor-info.message4'), "");
      }
    }
    else {
      if (this.dataList.length >= 2) {

        this.isButtonSpinning = true;
        this.extraApplicantInformation.IS_PROVIDED = true
        this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('common.message.error.success'), "");
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
        this.message.error(this.api.translate.instant('guarantor-info.message2'), "");
      }
    }


  }

  UpdateRow(data: Gurantorinfo) {
    this.isAddSpinning = true
    data.VISIBILITY = false
    this.api.updateGuarantorInformation(data)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          this.getdata()
          this.demo.emit(false)
          this.isAddSpinning = false
          this.logtext = 'Update & Close - Guarantor form - SUCCESS ' + JSON.stringify(data) + " KEYWORD [U - Guarantor ]";
          this.api.addLog('A', this.logtext, this.api.emailId)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                //console.log(successCode);
              }
              else {
                //console.log(successCode);
              }
            });

          this.isSpinning = false;
        }
        else {
          this.message.error(this.api.translate.instant('common.message.error.failed'), "");
          this.isSpinning = false;
        }
      });
  }

  UpdateRowoff(data: Gurantorinfo) {
    this.isAddSpinning = true
    data.VISIBILITY = true
    this.api.updateGuarantorInformation(data)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          this.isSpinning = false;
          this.isAddSpinning = false

          this.getdata()
          
          this.logtext = 'Update & Close - Guarantor form - SUCCESS ' + JSON.stringify(data) + " KEYWORD [U - Guarantor ]";
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
          this.message.error(this.api.translate.instant('common.message.error.failed'), "");
          this.isSpinning = false;
        }
      });
  }

  viewInfo(data: Gurantorinfo) {
    this.drawerPersonalProposalTitle = this.api.translate.instant('guarantor-info.drawerPersonalProposalTitle')

    //this.drawerData=Object.assign({}, data);
    this.guarntorData = Object.assign({}, data);
    this.drawerPersonalProposalVisible = true
    this.personalProposal.loadAllExtraInformationMapped(data, this.data)
  }
  get closeCallbackPersonalProposal() {
    return this.drawerPersonalProposalClose.bind(this);
  }
  drawerPersonalProposalClose(): void {
    this.drawerPersonalProposalVisible = false;
    this.demo.emit(false)
  }

  VerifyUpdate() {

    if (this.extraApplicantInformation.REMARK != "") {
      this.isButtonSpinning2= true
      this.extraApplicantInformation.IS_VERIFIED = true
      this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.isButtonSpinning2 = false
            this.demo.emit(false)
            var LOG_ACTION = ''
              var DESCRIPTION = ''
              if (this.extraApplicantInformation.IS_APPROVED == true) {
                LOG_ACTION = 'Guarantors Tab information Verified'
                
                DESCRIPTION = sessionStorage.getItem('userName') + ' has checked and approved the Guarantors for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK
              } else {
                LOG_ACTION = 'Guarantors Tab information Rejected'
                DESCRIPTION = sessionStorage.getItem('userName') + 'has checked and rejected the Guarantors for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK
  
              }
              var LOG_TYPE = 'I'
          this.api.proposalLogInformation(this.extraApplicantInformation.PROPOSAL_ID, this.extraApplicantInformation.CURRENT_STAGE_ID, 0, LOG_ACTION, Number(sessionStorage.getItem("userId")), DESCRIPTION, LOG_TYPE)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
              }
            });
            // this.oldIndex++;
            // this.indexChanged.emit(this.oldIndex)
          }
          else {
            this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
            this.isButtonSpinning2= false

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