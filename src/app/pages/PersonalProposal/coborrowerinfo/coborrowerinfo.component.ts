import { Component, OnInit, Input, ViewChild, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { Coborrower } from 'src/app/Models/PersonalProposal/coborrower';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { Gurantorinfo } from 'src/app/Models/FirmProposal/gurantorinfo';
import { CproposalinfoComponent } from '../../Co-borrower/cproposalinfo/cproposalinfo.component';
import { Proposal } from 'src/app/Models/proposal';
import { Guarantor } from 'src/app/Models/LoanTypeQues/Amulya/Guarantor/guarantor';
import { Sort } from 'src/app/Models/LoanTypeQues/Amulya/Sorts';

@Component({
  selector: 'app-coborrowerinfo',
  templateUrl: './coborrowerinfo.component.html',
  styleUrls: ['./coborrowerinfo.component.css']
})
export class CoborrowerinfoComponent implements OnInit, AfterViewInit {
  @Input() PROPOSAL_ID: number
  @Input() APPLICANT_ID: number
  @Input() data: Proposal
  @Input() oldIndex: number
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();
  @Output() demo : EventEmitter<boolean> =
    new EventEmitter<boolean>();
  pageIndex = 1;
  @Input() LOAN_KEY: Number;
  gid: number;
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
  coborrowerData: Coborrower = new Coborrower;
  extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  isButtonVerifySpinning = false
  i = 2;
  index1 = -1

  guarantorData: Guarantor[] = []

  g_info: Guarantor = new Guarantor();
  drawerData: Guarantor = new Guarantor();
  
  ID = 0
  bankLoanType = Number(sessionStorage.getItem("bankLoanId"))
  mode = "I"
  isAddSpinning = false
  drawerPersonalProposalVisible = false
  drawerPersonalProposalTitle: string = ""

  @Input() CURRENT_STAGE_ID: number;  
  @ViewChild(CproposalinfoComponent) personalProposal: CproposalinfoComponent;
  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit() {
    this.loadInfo();
    this.getdata();
    
  }

  ngAfterViewInit(): void {


  }

  loadInfo() {
    let filter = " AND EXTRA_INFORMATION_ID=12 AND PROPOSAL_ID=" + this.PROPOSAL_ID
    this.api.getAllApplicantExtraInformation(0, 0, "SEQ_NO", "asc", filter).subscribe(data => {
      this.extraApplicantInformation = data['data'][0]
    }, err => {
      //console.log(err);
    });
  }




  // getdata() {
  //   this.isSpinning = true;
  //   //console.log("coborrower datalist")
  //   this.api.getAllCoborrowerInformation(this.pageIndex, this.pageSize, this.sortKey, this.sortValue, "AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND VISIBILITY=1").subscribe(data => {
  //     //console.log("coborrower data")
  //     //console.log(data)
  //     this.isSpinning = false;
  //     this.totalRecords = data['count'];
  //     this.dataList = data['data'];
  //   }, err => {
  //     //console.log(err);
  //   });

  //   this.api.getAllGuarantorInformation(this.pageIndex, this.pageSize, this.sortKey, this.sortValue, "AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND VISIBILITY=1").subscribe(data => {
  //     //console.log(" Gurantor data")
  //     //console.log(data)
  //     this.gurantorData = data['data'];
  //   }, err => {
  //     //console.log(err);
  //   });

  // }

  getdata() {
    this.guarantorData = [];
    let sortKey: Sort = new Sort(this.PROPOSAL_ID);
    this.api.getAllGuarantorInfo_Amulya(sortKey).subscribe(res => {
      if (res['code'] == 200 && res['data'].length > 0) {
        this.guarantorData = res['data'];
      }
    });
  }

  // addguarntorData() {
  //   this.dataList.push({
  //     ID: this.ID,
  //     NAME: this.NAME,
  //     MOBILE_NUMBER: this.MOBILE_NUMBER,
  //     VISIBILITY: 1,
  //     CLIENT_ID: this.api.clientId
  //   });
  // }
  changeGuarantorName(event) {
    this.api.UpdateGuarantorInfo_Amulya(event).subscribe(res => {
      if (res['code'] == 200) {
        this.getdata;
      }
    })
  }

  // addData() {

  //   let isok = true

  //   if (this.NAME != undefined && this.NAME != "" && this.MOBILE_NUMBER != undefined && this.MOBILE_NUMBER != "") {
  //     if (this.MOBILE_NUMBER != undefined && this.MOBILE_NUMBER != "")
  //       if ((/^[6-9]{1}[0-9]{9}$/).test(this.MOBILE_NUMBER.toString()) == false) {
  //         this.message.error(this.api.translate.instant('common.checkmobile'), "");
  //         isok = false
  //       }
  //   }
  //   else {
  //     isok = false
  //     this.message.error(this.api.translate.instant('common.message.error.emptyinfo'), "");
  //   }

  //   let personalMobile = sessionStorage.getItem("personalMobile")


  //   if (personalMobile == this.MOBILE_NUMBER) {
  //     isok = false
  //     this.message.error(this.api.translate.instant('coborrowerinfo.message1'), "");
  //   }

  //   var filterData = this.dataList.filter(object => {
  //     return object['MOBILE_NUMBER'] == this.MOBILE_NUMBER
  //   });

  //   var filterDataGurantor = this.gurantorData.filter(object => {
  //     return object['MOBILE_NUMBER'] == this.MOBILE_NUMBER
  //   });

  //   //console.log(filterData.length)
  //   //console.log(filterDataGurantor.length)

  //   if (filterData.length > 0) {
  //     isok = false
  //     this.message.error(this.api.translate.instant('coborrowerinfo.message2'), "");
  //   }

  //   if (filterDataGurantor.length > 0) {
  //     isok = false
  //     this.message.error(this.api.translate.instant('coborrowerinfo.message3'), "");
  //   }

  //   // if(isok)
  //   // {
  //   //     if(this.index1 > -1){
  //   //       //console.log(this.dataList[this.index1])
  //   //       this.dataList[this.index1]['NAME'] = this.NAME;
  //   //       this.dataList[this.index1]['MOBILE_NUMBER'] = this.MOBILE_NUMBER;
  //   //       this.index1=-1
  //   //       this.NAME=""
  //   //       this.MOBILE_NUMBER=""
  //   //     }
  //   //     else
  //   //     {
  //   //       this.addguarntorData()
  //   //       this.NAME = ""
  //   //       this.MOBILE_NUMBER = ""
  //   //     }

  //   // }


  //   if (isok) {
  //     this.coborrowerData.NAME = this.NAME
  //     this.coborrowerData.MOBILE_NUMBER = this.MOBILE_NUMBER
  //     this.coborrowerData.VISIBILITY = 1
  //     this.coborrowerData.PROPOSAL_ID = this.PROPOSAL_ID
  //     this.isAddSpinning = true;
  //     this.api.createCoborrowerInfo(this.coborrowerData)
  //       .subscribe(successCode => {
  //         //console.log(successCode)
  //         if (successCode['code'] == "200") {
  //           this.getdata()
            
  //           this.NAME = ""
  //           this.MOBILE_NUMBER = ""
  //           this.message.success(this.api.translate.instant('common.message.error.success'), "");
  //           this.logtext = 'Save & Close - CO-borrower form - SUCCESS - ' + JSON.stringify(this.dataList) + " KEYWORD [C - CO-borrower ]";
  //           this.api.addLog('A', this.logtext, this.api.emailId)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 //console.log(successCode);
  //               }
  //               else {
  //                 //console.log(successCode);
  //               }
  //             });


  //           this.isAddSpinning = false;
  //         } else if (successCode['code'] == "350") {
  //           this.message.error(successCode['message'], "");
  //           this.isAddSpinning = false;

  //         }
  //         else {
  //           this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
  //           this.isAddSpinning = false;
  //           this.logtext = 'Save & Close - CO-borrower form - ERROR - ' + JSON.stringify(this.dataList) + " KEYWORD [C - CO-borrower ]";
  //           this.api.addLog('A', this.logtext, this.api.emailId)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 //console.log(successCode);
  //               }
  //               else {
  //                 //console.log(successCode);
  //               }
  //             });

  //         }
  //       });
  //   }

  // }

  addData() {
    //console.log("guarantor data", this.g_info);
    this.g_info.PROPOSAL_ID = this.PROPOSAL_ID;
    this.api.addGuarantorInfo_Amulya(this.g_info).subscribe((res) => {
      //console.log("guarantor res", res);
      if (res['code'] == 200) {
        this.getdata();
        this.g_info = new Guarantor();
      }
      this.isAddSpinning = false;
    })
  }

  // deleteRow(data) {
  //   const index = this.dataList.indexOf(data);
  //   this.dataList.splice(index, 1);
  // }

  deleteRow(data) {

    data.ARCHIVE_FLAG = 'T';
    this.api.UpdateGuarantorInfo_Amulya(data).subscribe(res => {
      if (res['code'] == 200) {
        this.getdata();
      }
    });
  }

  edit(data, i1: number): void {
    this.index1 = i1
    this.NAME = data.NAME
    this.MOBILE_NUMBER = data.MOBILE_NUMBER
  }

  // save(): void {

  //   if (this.bankLoanType == 4) {
  //     if (this.dataList.length >= 1) {
  //       this.isButtonSpinning = true;

  //       this.extraApplicantInformation.IS_PROVIDED = true
  //       this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
  //         .subscribe(successCode => {
  //           if (successCode['code'] == "200") {
  //             this.message.success(this.api.translate.instant('common.message.error.success'), "");
  //             this.isButtonSpinning = false;
  //             this.oldIndex++;
  //             this.indexChanged.emit(this.oldIndex)
  //             this.demo.emit(false)
  //           }
  //           else {
  //             this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
  //             this.isButtonSpinning = false;
  //           }
  //         });


  //     }
  //     else {
  //       this.message.error(this.api.translate.instant('guarantor-info.message4'), "");
  //     }
  //   }
  //   else {
  //     if (this.dataList.length >= 2) {

  //       this.isButtonSpinning = true;
  //       this.extraApplicantInformation.IS_PROVIDED = true
  //       this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
  //         .subscribe(successCode => {
  //           if (successCode['code'] == "200") {
  //             this.message.success(this.api.translate.instant('common.message.error.success'), "");
  //             this.isButtonSpinning = false;
  //             this.oldIndex++;
  //             this.indexChanged.emit(this.oldIndex)
  //             this.demo.emit(false)
  //           }
  //           else {
  //             this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
  //             this.isButtonSpinning = false;
  //           }
  //         });
  //     }
  //     else {
  //       this.message.error(this.api.translate.instant('guarantor-info.message2'), "");
  //     }
  //   }


  // }

  save(): void {

    if (this.guarantorData.length >= 1) {
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

  }

  callMethod() {
    this.isButtonSpinning = true
    this.extraApplicantInformation.IS_PROVIDED = false
    this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          this.message.success(this.api.translate.instant('common.message.error.success'), "");
          this.isButtonSpinning = false;

        }
        else {
          this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
          this.isButtonSpinning = false;
        }
      });


  }

  // UpdateRow(data: Gurantorinfo) {
  //   this.isSpinning = true
  //   data.VISIBILITY = false
  //   this.api.updateCoborrowerInformation(data)
  //     .subscribe(successCode => {
  //       if (successCode['code'] == "200") {
  //         this.isSpinning = false
  //         this.getdata()
  //         this.demo.emit(false)
  //         this.logtext = 'Update & Close - CO-borrower form - SUCCESS ' + JSON.stringify(data) + " KEYWORD [U -  CO-borrower ]";
  //         this.api.addLog('A', this.logtext, this.api.emailId)
  //           .subscribe(successCode => {
  //             if (successCode['code'] == "200") {
  //               //console.log(successCode);
  //             }
  //             else {
  //               //console.log(successCode);
  //             }
  //           });

  //         this.isSpinning = false;
  //       }
  //       else {
  //         this.message.error(this.api.translate.instant('common.message.error.failed'), "");
  //         this.isSpinning = false;
  //       }
  //     });
  // }

  UpdateRowoff(data: Gurantorinfo) {
    this.isSpinning = true

    data.VISIBILITY = true
    this.api.updateCoborrowerInformation(data)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          this.isSpinning = false;
          this.getdata()
          this.demo.emit(false)
          this.isSpinning = false

          this.logtext = 'Update & Close - CO-borrower form - SUCCESS ' + JSON.stringify(data) + " KEYWORD [U - CO-borrower ]";
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

  viewInfo(data: Guarantor) {

    this.drawerPersonalProposalTitle = this.api.translate.instant('coborrowerinfo.drawerPersonalProposalTitle1')


    this.drawerPersonalProposalVisible = true;

    this.drawerData = Object.assign({}, data);
    this.personalProposal.data = data;
    this.personalProposal.getTabs();
    // if (this.personalProposal.personalinfo1 && this.personalProposal.property)
    //   this.personalProposal.loadInfo();


  }

 
  // get closeCallbackPersonalProposal() {
  //   return this.drawerPersonalProposalClose.bind(this);
  // }
  // drawerPersonalProposalClose(): void {
  //   this.drawerPersonalProposalVisible = false;
  // }


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
    console.log();
    
    this.extraApplicantInformation.IS_APPROVED = true;
    console.log(this.extraApplicantInformation.IS_APPROVED, 'ok');
    
    this.VerifyUpdate();

    console.log( this.VerifyUpdate(),"verify");
    
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
  get closeCallbackPersonalProposal() {
    return this.drawerPersonalProposalClose.bind(this);
  }
  drawerPersonalProposalClose(): void {
    this.drawerPersonalProposalVisible = false;
  }
}