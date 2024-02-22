import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Shikshansavardhandata } from 'src/app/Models/LoanTypeQues/shikshansavardhandata';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';

@Component({
  selector: 'app-shikshansavadharnloan',
  templateUrl: './shikshansavadharnloan.component.html',
  styleUrls: ['./shikshansavadharnloan.component.css']
})
export class ShikshansavadharnloanComponent implements OnInit {
  @Input() PROPOSAL_ID: number;
  shikansavardhanData: Shikshansavardhandata = new Shikshansavardhandata()
  isButtonSpinning = false
  formatterPercent = (value: number) => `${value} %`;
  parserPercent = (value: string) => value.replace(' %', '');
  isSpinning = false
  feeDetails = []
  feeDetailsTotal = []
  i = 2
  confirmModal?: NzModalRef;
  FEE_NAME: string
  AMOUNT: number
  loadingRecords=false
  T_FEE_NAME:string
  T_AMOUNT:number
  t_i=2
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();
  @Output() demo : EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() CURRENT_STAGE_ID: number;  
  @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  constructor(private api: ApiService, private modal: NzModalService, private message: NzNotificationService) { }

  ngOnInit(): void {
    this.loadData()
  }



  loadData() {

    this.isSpinning = true;
    this.loadingRecords=true
    let filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID
    this.api.getAllShikshanSavardhiniLoan(0, 0, '', '', filter).subscribe(data => {
      this.loadingRecords = false;
    this.isSpinning = false;
      if (data['count'] > 0) {
        this.shikansavardhanData = data['data'][0];
        let filter1 = " AND SHIKSHAN_SANVARDHINI_LOAN_ID=" + this.shikansavardhanData.ID
        this.api.getAllFeeDetails(0, 0, 'ID', 'asc', filter1).subscribe(data1 => {
        if (data1['count'] > 0)
        this.feeDetails = data1['data'].filter((item) => item.TYPE == "F");
        this.feeDetailsTotal = data1['data'].filter((item) => item.TYPE == "T");
        }, err => {
          //console.log(err);
          this.isSpinning = false;
    this.loadingRecords=false

        });
      }

      this.isSpinning = false;
    }, err => {
      //console.log(err);
      this.isSpinning = false;
    });
  }

  addFeeDetails() {

    if (this.feeDetails.length == 0) {
      this.feeDetails = [
        {
          ID: 1,
          SHIKSHAN_SANVARDHINI_LOAN_ID: 0,
          TYPE: 'F',
          FEE_NAME: this.FEE_NAME,
          AMOUNT: this.AMOUNT,
          CLIENT_ID: this.api.clientId
        }
      ];
    }
    else {

        let time = this.feeDetails.filter(object => {
          return object['FEE_NAME'] == this.FEE_NAME
        });
        if (time.length == 0) {

          this.feeDetails = [
            ...this.feeDetails,
            {
              ID: this.i,
              SHIKSHAN_SANVARDHINI_LOAN_ID: 0,
              TYPE: 'F',
              FEE_NAME: this.FEE_NAME,
              AMOUNT: this.AMOUNT,
              CLIENT_ID: this.api.clientId,
            }
          ];
          this.i++;
        }
        else {
          this.message.error(this.api.translate.instant('shikshansavadharnloan.message1'), "");
        }
     

    }


  }



  addFeeTotalDetails() {

    if (this.feeDetailsTotal.length == 0) {
      this.feeDetailsTotal = [
        {
          ID: 1,
          SHIKSHAN_SANVARDHINI_LOAN_ID: 0,
          TYPE: 'T',
          FEE_NAME: this.T_FEE_NAME,
          AMOUNT: this.T_AMOUNT,
          CLIENT_ID: this.api.clientId
        }
      ];
    }
    else {

        let time = this.feeDetailsTotal.filter(object => {
          return object['FEE_NAME'] == this.T_FEE_NAME
        });
        if (time.length == 0) {

          this.feeDetailsTotal = [
            ...this.feeDetailsTotal,
            {
              ID: this.t_i,
              SHIKSHAN_SANVARDHINI_LOAN_ID: 0,
              TYPE: 'T',
              FEE_NAME: this.T_FEE_NAME,
              AMOUNT: this.T_AMOUNT,
              CLIENT_ID: this.api.clientId,
            }
          ];
          this.t_i++;
        }
        else {
          this.message.error(this.api.translate.instant('shikshansavadharnloan.message1'), "");
        }
     

    }


  }



  addData() {

    if (this.FEE_NAME != undefined && this.FEE_NAME != "" && this.AMOUNT != undefined && this.AMOUNT > 0 && this.AMOUNT.toString().trim() != "") {
    
      this.addFeeDetails()
      this.FEE_NAME =undefined
      this.AMOUNT =0
    }
    else {
      this.message.error(this.api.translate.instant('shikshansavadharnloan.message2'), "");
     
    }
  }

  addData1()
  {
    if (this.T_FEE_NAME != undefined && this.T_FEE_NAME != "" && this.T_AMOUNT != undefined && this.T_AMOUNT > 0 && this.T_AMOUNT.toString().trim() != "") {
    
      this.addFeeTotalDetails()
      this.T_FEE_NAME =undefined
      this.T_AMOUNT =0
    }
    else {
      this.message.error(this.api.translate.instant('shikshansavadharnloan.message2'), "");
     
    }
  }

  getFeeName(name)
  {
    if(name=="CF")
    return this.api.translate.instant('shikshansavadharnloan.option1')
    else  if(name=="PF")
    return this.api.translate.instant('shikshansavadharnloan.option2')
    else  if(name=="AF")
    return this.api.translate.instant('shikshansavadharnloan.option3')
    else  if(name=="OF")
    return this.api.translate.instant('shikshansavadharnloan.option4')

  }

  deleteRow(data) {
    if (data.SHIKSHAN_SANVARDHINI_LOAN_ID == 0) {
      const index = this.feeDetails.indexOf(data);
      this.feeDetails.splice(index, 1);
      this.feeDetails = this.feeDetails.filter(object => {
        return object['ID'] != data
      });
    }
    else {
      this.confirmModal = this.modal.confirm({
        nzTitle: this.api.translate.instant('common.confirmModal.nzTitle'),
        nzContent: this.api.translate.instant('common.confirmModal.nzContent'),
        nzOnOk: () =>
          new Promise((resolve, reject) => {
            data.ARCHIVE_FLAG = "T";
            this.api.updateFeeDetails(data)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                  const index = this.feeDetails.indexOf(data);
                  this.feeDetails.splice(index, 1);
                  this.feeDetails = this.feeDetails.filter(object => {
                    return object['ID'] != data
                  });

                }
              });
          }).catch(() => console.log(this.api.translate.instant('shikshansavadharnloan.message3')))
      });
    }


  }


  deleteRowTotal(data) {
    if (data.SHIKSHAN_SANVARDHINI_LOAN_ID == 0) {
      const index = this.feeDetailsTotal.indexOf(data);
      this.feeDetailsTotal.splice(index, 1);
      this.feeDetailsTotal = this.feeDetailsTotal.filter(object => {
        return object['ID'] != data
      });
    }
    else {
      this.confirmModal = this.modal.confirm({
        nzTitle: this.api.translate.instant('common.confirmModal.nzTitle'),
        nzContent: this.api.translate.instant('common.confirmModal.nzContent'),
        nzOnOk: () =>
          new Promise((resolve, reject) => {
            data.ARCHIVE_FLAG = "T";
            this.api.updateFeeDetails(data)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                  const index = this.feeDetailsTotal.indexOf(data);
                  this.feeDetailsTotal.splice(index, 1);
                  this.feeDetailsTotal = this.feeDetailsTotal.filter(object => {
                    return object['ID'] != data
                  });

                }
              });
          }).catch(() => console.log(this.api.translate.instant('shikshansavadharnloan.message3')))
      });
    }


  }


  save() {

    var isOk = true

    if (this.shikansavardhanData.CHIELD_NAME == undefined || this.shikansavardhanData.CHIELD_NAME == "") {
      isOk = false
      this.message.error(this.api.translate.instant('shikshansavadharnloan.message4'), "");
    }
    else if (this.shikansavardhanData.LAST_DEGREE == undefined || this.shikansavardhanData.LAST_DEGREE == "") {
      isOk = false
      this.message.error(this.api.translate.instant('shikshansavadharnloan.message5'), "");
    }
    else if (this.shikansavardhanData.LAST_DEGREE_PERCENTAGE == undefined || this.shikansavardhanData.LAST_DEGREE_PERCENTAGE.toString().trim() == "") {
      isOk = false
      this.message.error(this.api.translate.instant('shikshansavadharnloan.message6'), "");
    }
    else if (this.shikansavardhanData.LAST_COLLEGE_NAME == undefined || this.shikansavardhanData.LAST_COLLEGE_NAME == "") {
      isOk = false
      this.message.error(this.api.translate.instant('shikshansavadharnloan.message7'), "");
    }
    else if (this.shikansavardhanData.COURSE_NAME == undefined || this.shikansavardhanData.COURSE_NAME == "") {
      isOk = false
      this.message.error(this.api.translate.instant('shikshansavadharnloan.message8'), "");
    }
    else if (this.shikansavardhanData.COURSE_DURATION == undefined || this.shikansavardhanData.COURSE_DURATION.toString().trim() == "") {
      isOk = false
      this.message.error(this.api.translate.instant('shikshansavadharnloan.message9'), "");
    }
    else if (this.shikansavardhanData.COURSE_COLLEGE == undefined || this.shikansavardhanData.COURSE_COLLEGE == "") {
      isOk = false
      this.message.error(this.api.translate.instant('shikshansavadharnloan.message10'), "");
    }
    else {
      if (this.shikansavardhanData.COURSE_COLLEGE_ADDRESS == undefined || this.shikansavardhanData.COURSE_COLLEGE_ADDRESS == "") {
        isOk = false
        this.message.error(this.api.translate.instant('shikshansavadharnloan.message11'), "");
      }
    }
    if (this.shikansavardhanData.IS_COURSE_ELIGIBLE_FOR_SUBSIDY) {
      if (this.shikansavardhanData.TENTATIVE_AMOUNT_OF_SUBSIDY == undefined || this.shikansavardhanData.TENTATIVE_AMOUNT_OF_SUBSIDY == 0 || this.shikansavardhanData.TENTATIVE_AMOUNT_OF_SUBSIDY.toString().trim() == "") {
        isOk = false
        this.message.error(this.api.translate.instant('shikshansavadharnloan.message12'), "");
      }
      if (this.shikansavardhanData.DETAILS_OF_SUBSIDY == undefined || this.shikansavardhanData.DETAILS_OF_SUBSIDY == "") {
        isOk = false
        this.message.error(this.api.translate.instant('shikshansavadharnloan.message13'), "");
      }
    }else{
      this.shikansavardhanData.TENTATIVE_AMOUNT_OF_SUBSIDY =0
      this.shikansavardhanData.DETAILS_OF_SUBSIDY = ""
    }

    if (this.shikansavardhanData.IS_ELIGIBLE_FOR_ADDITIONAL_BENEFITS) {
      if (this.shikansavardhanData.ADDITIONAL_BENEFITS_DETAILS == undefined || this.shikansavardhanData.ADDITIONAL_BENEFITS_DETAILS == "") {
        isOk = false
        this.message.error(this.api.translate.instant('shikshansavadharnloan.message14'), " ");
      }
      if (this.shikansavardhanData.EXTRA_BENEFITS_AMOUNT == undefined || this.shikansavardhanData.EXTRA_BENEFITS_AMOUNT == 0 || this.shikansavardhanData.EXTRA_BENEFITS_AMOUNT.toString().trim() == "") {
        isOk = false
        this.message.error(this.api.translate.instant('shikshansavadharnloan.message15'), "");
      }
    }else{
      this.shikansavardhanData.EXTRA_BENEFITS_AMOUNT =0
      this.shikansavardhanData.ADDITIONAL_BENEFITS_DETAILS = " "
    }
    
    if(this.feeDetails == []|| this.feeDetails.length == 0)
    {
      isOk = false
      this.message.error(this.api.translate.instant('shikshansavadharnloan.message16'), "");
    }

    if(this.feeDetailsTotal == []|| this.feeDetailsTotal.length == 0)
    {
      isOk = false
      this.message.error(this.api.translate.instant('shikshansavadharnloan.message17'), "");
    }

    if (isOk) {
      this.isButtonSpinning = true
      this.shikansavardhanData.PROPOSAL_ID=this.PROPOSAL_ID
      var finalData=[].concat(this.feeDetails,this.feeDetailsTotal)
      this.shikansavardhanData.FEE_DETAILS = finalData
      //console.log(this.shikansavardhanData)
      this.api.AddShikshanSavardhiniLoan(this.shikansavardhanData)
        .subscribe(successCode => {
          this.loadData();
          this.demo.emit(false)
          //console.log(successCode)
          if (successCode['code'] == "200") {
              this.isButtonSpinning = false
            this.indexChanged.emit(1)

            this.message.success(this.api.translate.instant('common.message.success.addinfo2'), "");
          }
          else {
            this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
            this.isButtonSpinning = false;
          }
        });
    }

  }
}
