import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { Sort } from 'src/app/Models/LoanTypeQues/Amulya/Sorts';
import { Amulya } from 'src/app/Models/PersonalProposal/amulyaloan';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-amulyaloan',
  templateUrl: './amulyaloan.component.html',
  styleUrls: ['./amulyaloan.component.css']
})
export class AmulyaloanComponent implements OnInit, AfterViewInit {

  data: Amulya = new Amulya();
  isSpinning = false
  isButtonSpinning = false
  logtext: string = "";
  @Input() PROPOSAL_ID: number;
  pipe = new DatePipe('en-US');
  @Output() demo = new EventEmitter<boolean>();
  @Input() CURRENT_STAGE_ID: number;
  @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();
  dataList = []
  goldItemList = []
  loadingRecords = false
  browserLang = 'kn';
  options = []
  roleId = sessionStorage.getItem("roleId")

  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {
    let filter = ` AND EXTRA_INFORMATION_ID=6 AND PROPOSAL_ID=" ${this.PROPOSAL_ID} `
    ////console.log(filter)
    this.api.getAllApplicantExtraInformation(0, 0, "SEQ_NO", "asc", filter).subscribe(data => {
      this.extraApplicantInformation = data['data'][0]

    }, err => {
      ////console.log(err);
    });
  }
  ngAfterViewInit() {
    this.getData();
  }
  getData() {
    let sortKey: Sort = new Sort(this.PROPOSAL_ID);
    this.api.getLoanSpecificInfo_Amulya(sortKey).subscribe(res => {
      if (res['code'] == 200 && res['data'].length > 0) {
        if (res['data'][0]['ID'] != undefined && res['data'][0]['ID'] != null) {
          this.data.ID = res['data'][0]['ID'];
        }
        if (res['data'][0]['CLIENT_ID'] != undefined && res['data'][0]['CLIENT_ID'] != null) {
          this.data.CLIENT_ID = res['data'][0]['CLIENT_ID'];
        }
        if (res['data'][0]['PROPOSAL_ID'] != undefined && res['data'][0]['PROPOSAL_ID'] != null) {
          this.data.PROPOSAL_ID = res['data'][0]['PROPOSAL_ID'];
        }
        if (res['data'][0]['NAME_OF_GROUP'] != undefined && res['data'][0]['NAME_OF_GROUP'] != null) {
          this.data.NAME_OF_GROUP = res['data'][0]['NAME_OF_GROUP'];
        }
        if (res['data'][0]['ADDRESS_OF_GROUP'] != undefined && res['data'][0]['ADDRESS_OF_GROUP'] != null) {
          this.data.ADDRESS_OF_GROUP = res['data'][0]['ADDRESS_OF_GROUP'];
        }
        if (res['data'][0]['SAVING_AMOUNT'] != undefined && res['data'][0]['SAVING_AMOUNT'] != null) {
          this.data.SAVING_AMOUNT = res['data'][0]['SAVING_AMOUNT'];
        }
        if (res['data'][0]['ANNUAL_INCOME'] != undefined && res['data'][0]['ANNUAL_INCOME'] != null) {
          this.data.ANNUAL_INCOME = res['data'][0]['ANNUAL_INCOME'];
        }
        if (res['data'][0]['FATHER_NAME'] != undefined && res['data'][0]['FATHER_NAME'] != null) {
          this.data.FATHER_NAME = res['data'][0]['FATHER_NAME'];
        }
        if (res['data'][0]['ARCHIVE_FLAG'] != undefined && res['data'][0]['ARCHIVE_FLAG'] != null) {
          this.data.ARCHIVE_FLAG = res['data'][0]['ARCHIVE_FLAG'];
        }
      }
      else {
        this.data = new Amulya();
        console.info("some error has been accord while getting loan specific info in amulya or data does not exist", res);
      }
    });
  }
  save() {
    //this.data.ARCHIVE_FLAG = 'T';
    this.isButtonSpinning = true;
    this.data.PROPOSAL_ID = this.PROPOSAL_ID;
    //console.log("amulya data", this.data);
    if (this.data.ID) {
      this.api.UpdateLoanSpecificInfo_Amulya(this.data).subscribe((res) => {
        if (res['code'] == 200) {
          this.message.success("Loan Specific Information Updated successfully", '');
          this.isButtonSpinning = false;
          this.extraApplicantInformation.IS_PROVIDED = 1;
          this.api.updateApplicantExtraInformation(this.extraApplicantInformation).subscribe(data => {
            if (data['code'] == 200) {
              this.demo.emit(false)
            }
          });
        }
        else {
          this.message.error("Failed Update  to Amulya Loan-Specific Information", '');
          this.isButtonSpinning = false;
        }

      })
    }

    else {
      this.api.addLoanSpecificInfo_Amulya(this.data).subscribe((res) => {
        if (res['code'] == 200) {
          this.message.success("Amulya Loan-Specific Information Added successfully", '');
          this.isButtonSpinning = false;
          this.extraApplicantInformation.IS_PROVIDED = 1;
          this.api.updateApplicantExtraInformation(this.extraApplicantInformation).subscribe(data => {
            if (data['code'] == 200) {
              this.demo.emit(false)
            }
          });
        }
        else {
          this.message.error("Failed Add  to Amulya Loan-Specific Information", '');
          this.isButtonSpinning = false;
        }

      });
    }
  }

}
