import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { ApiService } from 'src/app/Service/api.service';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { CostInfo, MeansInfo } from 'src/app/Models/FirmProposal/projection-info';

@Component({
  selector: 'app-projection-info',
  templateUrl: './projection-info.component.html',
  styleUrls: ['./projection-info.component.css']
})
export class ProjectionInfoComponent implements OnInit {
  @Input() PROPOSAL_ID: number;
  @Input() oldIndex: number
  @Input() LOAN_KEY: Number;
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();
  @Output() demo : EventEmitter<boolean> = new EventEmitter<boolean>();
  isSpinningTabs = false;
  pageIndex = 0;
  pageSize = 0;
  totalRecords = 1;
  dataList = [];
  meansdata: [] = [];
  pageIndex2 = 0;
  pageSize2 = 0;
  totalRecords2 = 1;
  loadingRecords = false;
  loadingRecords2 = false;
  sortValue: string = "desc";
  sortKey: string = "id";
  searchText: string = "";
  filterQuery: string = "";
  isFilterApplied: string = "default";
  logtext: string = "";
  isSpinning = false;
  columns: string[][] = []
  @Input() CURRENT_STAGE_ID: number;  
  isButtonVerifySpinning = false;
  //drawer Variables
  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: CostInfo = new CostInfo();
  drawerVisible2: boolean;
  drawerTitle2: string;
  drawerData2: MeansInfo = new MeansInfo();
  extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  isButtonSpinning = false
  constructor(private api: ApiService, private message: NzNotificationService) { }
  ngOnInit() {

    this.search();
  }

  search() {
    let filter=" AND EXTRA_INFORMATION_ID=8 AND PROPOSAL_ID="+this.PROPOSAL_ID
    this.api.getAllApplicantExtraInformation(0,0,"SEQ_NO","asc",filter).subscribe(data => {
     this.extraApplicantInformation=data['data'][0]
     }, err => {
       //console.log(err);
     });
    this.api.getAllCostInformation(this.pageIndex, this.pageSize, this.sortKey, this.sortValue, "AND PROPOSAL_ID=" + this.PROPOSAL_ID).subscribe(data => {
      this.loadingRecords = false;
      if (data['code'] == 200 && data['count'] > 0) {
        this.dataList = data['data'];
      }
    }, err => {
      //console.log(err);
    });

    this.api.getAllMeansInformation(this.pageIndex, this.pageSize, this.sortKey, this.sortValue, "AND PROPOSAL_ID=" + this.PROPOSAL_ID).subscribe(data2 => {
      this.loadingRecords2 = false;
      if (data2['code'] == 200 && data2['count'] > 0) {
        this.meansdata = data2['data'];
      }
    }, err => {
      //console.log(err);
    });
    // this.demo.emit(false)
  }


  //Drawer Methods
  get closeCallback() {
    return this.drawerClose.bind(this);
  }
  
  add(): void {
    this.drawerTitle = this.api.translate.instant('projection-info.drowertitle1') ;
    this.drawerData = new CostInfo();
    this.drawerData.PROPOSAL_ID = this.PROPOSAL_ID;
    this.drawerVisible = true;

    this.logtext = 'ADD - CostInfo form KEYWORD [A - CostInfo] ';
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

  edit(data: CostInfo): void {

    this.drawerTitle = this.api.translate.instant('projection-info.drowertitle2') ;
    this.drawerData = Object.assign({}, data);
    this.drawerVisible = true;

    this.logtext = 'EDIT - CostInfo form KEYWORD [E - CostInfo] ';
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

  drawerClose(): void {
    this.search();
    this.drawerVisible = false;
  }

  //Drawer Methods
  get closeCallback2() {
    return this.drawerClose2.bind(this);
  }
 
  add2(): void {
    this.drawerTitle2 = this.api.translate.instant('projection-info.drowertitle3') ; 
    this.drawerData2 = new MeansInfo();
    this.drawerData2.PROPOSAL_ID = this.PROPOSAL_ID;
    this.drawerVisible2 = true;

    this.logtext = 'ADD - MeansInfo form KEYWORD [A - MeansInfo] ';
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

  edit2(data: MeansInfo): void {

    this.drawerTitle2 = this.api.translate.instant('projection-info.drowertitle4');
    this.drawerData2 = Object.assign({}, data);
    this.drawerVisible2 = true;

    this.logtext = 'EDIT - MeansInfo form KEYWORD [E - MeansInfo] ';
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

  drawerClose2(): void {
    this.search();
    this.drawerVisible2 = false;
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
                LOG_ACTION = 'Bank MSI Tab information Verified'
                
                DESCRIPTION = sessionStorage.getItem('userName') + ' has checked and approved the Bank MSI for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK
              } else {
                LOG_ACTION = 'Bank MSI Tab information Rejected'
                DESCRIPTION = sessionStorage.getItem('userName') + 'has checked and rejected the Bank MSI for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK
  
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
