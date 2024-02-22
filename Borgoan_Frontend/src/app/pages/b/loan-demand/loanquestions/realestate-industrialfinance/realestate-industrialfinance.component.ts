import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { DatePipe } from '@angular/common';
import { RealEstateIndustrialFinance } from 'src/app/Models/PersonalProposal/real-estate-industrial-finance';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { ApiService } from 'src/app/Service/api.service';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { conformToMask } from 'angular2-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'

@Component({
  selector: 'app-realestate-industrialfinance',
  templateUrl: './realestate-industrialfinance.component.html',
  styleUrls: ['./realestate-industrialfinance.component.css']
})
export class RealestateIndustrialfinanceComponent implements OnInit {
  @Input() PROPOSAL_ID: number;
  data: RealEstateIndustrialFinance = new RealEstateIndustrialFinance();
  addressinfo: Addressinfo = new Addressinfo();
  isSpinning = false
  logtext: string = "";
  @Output() demo : EventEmitter<boolean> =
    new EventEmitter<boolean>();
  pipe = new DatePipe('en-US');
  isButtonSpinning = false
  @Input() CURRENT_STAGE_ID: number;
    @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();
  converted : any;
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')

  constructor(private api: ApiService,
    private message: NzNotificationService,
    private datePipe:DatePipe
  ) {
  }

  ngOnInit() {
    this.getdata();
  }

  getdata() {
    this.isSpinning = true
    this.api.getAllRealEstateIndustrialFinanceInformation(0, 0, "ID", 'asc', "AND PROPOSAL_ID=" + this.PROPOSAL_ID).subscribe(data => {
      this.data = new RealEstateIndustrialFinance();
      this.isSpinning = false

      if (data['code'] == '200' && data['count'] > 0) {
        this.data = data['data'][0];
        if (this.data.ADDRESS_ID > 0)
          this.getaddressData(this.data.ADDRESS_ID);
      }
    }, err => {
      //console.log(err);
    });
  }

  getaddressData(ID) {
    this.api.getAllAddressInformation(0, 0, "ID", "asc", "AND ID =" + ID)
      .subscribe(data => {
        this.addressinfo = new Addressinfo();
        if (data['code'] == "200" && data['count'] > 0) {
          this.addressinfo = data['data'][0];
        }
      }, err => {
        //console.log(err);
      });
  }

  disabledDate = (current) => {
    return new Date() < current;
  }
  focusss2(event: KeyboardEvent){
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.VALUATION_DATE = undefined;
    }
  }
  save(): void {
    var isOk = true;
    this.data.PROPOSAL_ID = this.PROPOSAL_ID;
    if (this.data.INDUSTRIAL_FINANCE_TYPE == undefined || this.data.INDUSTRIAL_FINANCE_TYPE.trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('realestate-industrialfinance.message1'), "");
    } else {
      if (this.data.INDUSTRIAL_FINANCE_TYPE == '1' || this.data.INDUSTRIAL_FINANCE_TYPE == '2') {
        if (this.data.NAME_OF_LESSOR == undefined || this.data.NAME_OF_LESSOR.trim() == '') {
          isOk = false;
          this.message.error(this.api.translate.instant('realestate-industrialfinance.message2'), "");
        }

        if (this.data.APPROXIMATE_VALUATION_OF_PLOT == undefined || this.data.APPROXIMATE_VALUATION_OF_PLOT == 0 || this.data.APPROXIMATE_VALUATION_OF_PLOT.toString().trim() == '') {
          isOk = false;
          this.message.error(this.api.translate.instant('realestate-industrialfinance.message3'), "");
        }
      }

      if (this.data.INDUSTRIAL_FINANCE_TYPE == '3') {
        if (this.data.NAME_OF_OWNER == undefined || this.data.NAME_OF_OWNER.trim() == '') {
          isOk = false;
          this.message.error(this.api.translate.instant('realestate-industrialfinance.message4'), "");
        }
      }
    }

    if (this.data.PLOT_AREA == undefined || this.data.PLOT_AREA == 0 || this.data.PLOT_AREA.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('realestate-industrialfinance.message5'), "");
    }
    if (this.data.NAME_OF_BUILDER_DEVELOPER == undefined || this.data.NAME_OF_BUILDER_DEVELOPER == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('realestate-industrialfinance.message6'), "");
    }
    if (this.data.EXPECTED_COMPLETION_TIME == undefined || this.data.EXPECTED_COMPLETION_TIME == 0 || this.data.EXPECTED_COMPLETION_TIME.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('realestate-industrialfinance.message7'), "");
    }

    if (this.data.TOTAL_AREA_OF_CONSTRUCTION == undefined || this.data.TOTAL_AREA_OF_CONSTRUCTION == 0 || this.data.TOTAL_AREA_OF_CONSTRUCTION.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('realestate-industrialfinance.message8'), "");
    }

    if (this.data.TOTAL_COST_OF_CONSTRUCTION == undefined || this.data.TOTAL_COST_OF_CONSTRUCTION == 0 || this.data.TOTAL_COST_OF_CONSTRUCTION.toString().trim() == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('realestate-industrialfinance.message9'), "");
    }

    if (this.data.IS_VALUATION_DONE) {
      if (this.data.VALUATOR_NAME == undefined || this.data.VALUATOR_NAME.trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('common.message.error.valuator'), "");
      }

      if (this.data.VALUATION_AMOUNT == undefined || this.data.VALUATION_AMOUNT == 0 || this.data.VALUATION_AMOUNT.toString().trim() == '') {
        isOk = false;
        this.message.error(this.api.translate.instant('common.message.error.valuatorprice'), "");
      }

      if (this.data.VALUATION_DATE[0] >= 0 && this.data.VALUATION_DATE[0] 
        <= 9 && this.data.VALUATION_DATE[1] >= 0 
        && this.data.VALUATION_DATE[1] <= 9 && 
        this.data.VALUATION_DATE[3] >= 0 && this.data.VALUATION_DATE[3] <= 9 && 
        this.data.VALUATION_DATE[4] >= 0 && this.data.VALUATION_DATE[4] <= 9 && 
        this.data.VALUATION_DATE[9] >= 0 && this.data.VALUATION_DATE[9] <= 9 && 
        this.data.VALUATION_DATE[8] >= 0 && this.data.VALUATION_DATE[8] <= 9 && 
        this.data.VALUATION_DATE[7] >= 0 && this.data.VALUATION_DATE[7] <= 9 && 
        this.data.VALUATION_DATE[6] >= 0 && this.data.VALUATION_DATE[6] <= 9) {
    
        var conformedPhoneNumber = conformToMask(
          this.data.VALUATION_DATE,
          this.mask,
          { guide: false }
        )
        const str = conformedPhoneNumber.conformedValue.split('/');
    
        const year = Number(str[2]);
        const month = Number(str[1]) - 1;
        const dates = Number(str[0]);
    
        this.converted = new Date(year, month, dates)
    
    
        if (this.converted <= new Date()) {
          this.data.VALUATION_DATE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
        } 
    }
    else {
      isOk = false;
      this.message.error('Invalid Due Date','')
    }
    
    }else {
      this.data.VALUATION_AMOUNT = 0
      this.data.VALUATOR_NAME = " "
      this.data.VALUATION_DATE = "" 
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
    } else {
      isOk = false;
      this.message.error(this.api.translate.instant('common.message.error.address'), "");
    }


    if (isOk) {

      this.isButtonSpinning = true;
      if (this.data.ADDRESS_ID) {
        this.api.updateAddressInformation(this.addressinfo)
          .subscribe(successCode => {
            
            if (successCode['code'] == "200") {
              this.nextProcess();
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
            } else {
              this.message.error(this.api.translate.instant('common.message.error.updatefailed'), "");
              this.isButtonSpinning = false;
            }
          });
      }

    }
  }

  nextProcess() {


    if (this.data.ID) {
      this.api.updateRealEstateIndustrialFinanceInformation(this.data)
        .subscribe(successCode => {
          //console.log(successCode)
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

            this.logtext = 'Update & Close - RealEstateIndustrialFinance form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - RealEstateIndustrialFinance ]";
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

      this.api.createRealEstateIndustrialFinanceInformation(this.data)
        .subscribe(successCode => {
          //console.log(successCode)
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('common.message.success.addinfo2'), "")
            this.indexChanged.emit(1)

            this.logtext = 'Save & New - RealEstateIndustrialFinance form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - RealEstateIndustrialFinance ]";
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
            this.logtext = 'Save & Close - RealEstateIndustrialFinance form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - RealEstateIndustrialFinance ]";
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
