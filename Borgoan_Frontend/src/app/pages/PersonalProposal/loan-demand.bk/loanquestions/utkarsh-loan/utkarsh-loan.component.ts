import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { DatePipe } from '@angular/common';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { UtkarshLoan } from 'src/app/Models/PersonalProposal/utkarsh-loan';
import { ApiService } from 'src/app/Service/api.service';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
@Component({
  selector: 'app-utkarsh-loan',
  templateUrl: './utkarsh-loan.component.html',
  styleUrls: ['./utkarsh-loan.component.css']
})
export class UtkarshLoanComponent implements OnInit {
  @Input() PROPOSAL_ID: number;
  data: UtkarshLoan = new UtkarshLoan();
  isSpinning = false
  logtext: string = "";
  pipe = new DatePipe('en-US');
  addressinfo: Addressinfo =new Addressinfo();
  isButtonSpinning=false
  @Output() demo : EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();
  @Input() CURRENT_STAGE_ID: number; 
   @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  constructor(
    private api: ApiService,
    private message: NzNotificationService,
  ) {
  }

  ngOnInit() {
    this.getdata();
  }

  getdata() {
    this.isSpinning=true
    this.api.getAllUtkarshaLoan(0, 0, "ID", 'asc', "AND PROPOSAL_ID=" + this.PROPOSAL_ID).subscribe(data => {
      this.data = new UtkarshLoan();
      //console.log(data)
      this.isSpinning=false
      if (data['code'] == '200' && data['count'] > 0) {
        this.data = data['data'][0];
        this.getaddressData(this.data.ADDRESS_ID);


      }
    }, err => {
      //console.log(err);
    });
  }
  focusss(event: KeyboardEvent){
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.PLANNING_DATE = undefined;
    }
  }
  getaddressData(ID) {
    this.api.getAllAddressInformation(0, 0, "ID", "asc", "AND ID =" + ID)
      .subscribe(data => {
        this.addressinfo =new Addressinfo();
        if (data['code'] == "200" && data['count'] > 0) {
          this.addressinfo = data['data'][0];
        }
      }, err => {
        //console.log(err);
      });
  }


  disabledDate = (current) => {
    return new Date() > current;
  }

  save(): void {
    var isOk = true;
    this.data.PROPOSAL_ID = this.PROPOSAL_ID;
    if (this.data.AREA_OF_PLOT == undefined || this.data.AREA_OF_PLOT == 0 || this.data.AREA_OF_PLOT.toString().trim() == '') {
      isOk = false;
      this.message.error("खरेदी करणाऱ्या प्लॉटचे क्षेत्रफळ नमूद करा", "");
    }

    if (this.data.PLANNING_DATE == undefined || this.data.PLANNING_DATE == '') {
      isOk = false;
      this.message.error("आपण प्लॉट वर निवासी इमारत बांधकाम कधी करणार आहात ती तारीख नमूद करा", "");
    } else {
      this.data.PLANNING_DATE = this.pipe.transform(this.data.PLANNING_DATE, 'yyyy-MM-dd');
    }



    if (
      this.addressinfo.HOUSE_NO != undefined &&
      this.addressinfo.BUILDING != undefined &&
      this.addressinfo.DISTRICT != undefined &&
      this.addressinfo.LANDMARK != undefined &&
      this.addressinfo.PINCODE != undefined &&
      this.addressinfo.TALUKA != undefined &&
      this.addressinfo.STATE != undefined &&
      this.addressinfo.VILLAGE != undefined
    ) {
      if (
        this.addressinfo.HOUSE_NO.trim() != '' &&
        this.addressinfo.BUILDING.trim() != '' &&
        this.addressinfo.DISTRICT.trim() != '' &&
        this.addressinfo.LANDMARK.trim() != '' &&
        this.addressinfo.TALUKA.trim() != '' &&
        this.addressinfo.STATE.trim() != '' &&
        this.addressinfo.VILLAGE.trim() != ''
      ) { } else {
        isOk = false;
        this.message.error(this.api.translate.instant('common.message.error.address'), "");
      }
      if ((/^[1-9]{1}[0-9]{5}$/).test(this.addressinfo.PINCODE.toString()) == false) {
        isOk = false;
        this.message.error(this.api.translate.instant('common.message.error.pincode3'), "");
      }
    }else {
      isOk = false;
      this.message.error(this.api.translate.instant('common.message.error.address'), "");
    }

    if (isOk) {
      this.isButtonSpinning=true
      //console.log(this.data)
      //console.log(this.addressinfo)

      if (this.data.ADDRESS_ID) {
        this.api.updateAddressInformation(this.addressinfo)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.nextProcess();
              this.isButtonSpinning = false;

            } else {
              this.message.error(this.api.translate.instant('common.message.error.updatefailed'), "");
              this.isButtonSpinning = false;
            }
          });
      } else {
        this.api.createAddressInformation(this.addressinfo)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.data.ADDRESS_ID = successCode['data'][0].ID;
              this.nextProcess();
              this.isButtonSpinning = false;

            } else {
              this.message.error(this.api.translate.instant('common.message.error.updatefailed'), "");
              this.isButtonSpinning = false;

            }
          });
      }

    }
  }

  nextProcess() {
//console.log(this.data)
    if (this.data.ID) {
      this.api.updateUtkarshaLoan(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

            this.logtext = 'Update & Close - UtakarshLoan form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - UtakarshLoan ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });
            this.getdata();
            this.demo.emit(false)
            this.isButtonSpinning = false;

          }
          else {
            this.message.error(this.api.translate.instant('common.message.error.updatefailed'), "");
            this.isButtonSpinning = false;

          }
        });
    }
    else {

      this.api.createUtkarshaLoan(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('common.message.success.addinfo2'), "")
            this.indexChanged.emit(1)
          
            this.logtext = 'Save & New - UtakarshLoan form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - UtakarshLoan ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });

            this.getdata();
            this.demo.emit(false)
            this.isButtonSpinning = false;

          }
          else {
            this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
            this.isButtonSpinning = false;

            this.logtext = 'Save & Close - UtakarshLoan form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - UtakarshLoan ]";
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
}