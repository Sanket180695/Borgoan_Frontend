import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Propertyinformation } from 'src/app/Models/PersonalProposal/propertyinformation';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { createAutoCorrectedDatePipe } from 'text-mask-addons';

@Component({
  selector: 'app-propertiesinfoadd',
  templateUrl: './propertiesinfoadd.component.html',
  styleUrls: ['./propertiesinfoadd.component.css'],
  providers: [DatePipe]

})
export class PropertiesinfoaddComponent implements OnInit {
  @Output() demos: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() drawerClose: Function;
  @Input() data: Propertyinformation;
  @Input() PROPOSAL_ID: number
  @Input() APPLICANT_ID: number
  @Input() TYPE: string;
  isSpinning1 = false
  addressinfo: Addressinfo = new Addressinfo();
  logtext: string = "";
  isSpinning = false
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  pipe = new DatePipe('en-US');
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')
  extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  @Input() CURRENT_STAGE_ID: number;
  numberOfCharacters1 = 0;
  numberOfCharacters2 = 0;
  talukas = []
  districts = []
  // converted =new Date();
  // converted1 =new Date();
  states = []
  pincodes = []
  options = []
  constructor(private api: ApiService, private datePipe: DatePipe, private message: NzNotificationService) { }

  ngOnInit(): void {
    this.loadExtraInfo()
    this.getAddresslist();

    if (this.data.VALUATION_DATE != undefined) {
      this.GETDATAa()
    }

  }

  vehicel = [
    {Id : 1,name :  "2 Wheeler"},
    {Id : 2,name :  "3 Wheeler"},
    {Id : 3,name :  "4 Wheeler"},
    {Id : 4,name :  "6 Wheeler"},
    {Id : 5,name :  "8 Wheeler"},
    {Id : 6,name :  "10 Wheeler"},
    {Id : 7,name :  "12 Wheeler"},
  ]

  wordCounter(textValue: string): void {
    this.numberOfCharacters1 = textValue.length;
  }
  focusss1(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.data.VALUATION_DATE = undefined;
    }
  }
  onChanges(value: string): void {
    this.talukas = [];
    this.options.filter(option => {
      if (option.TALUKA.toLowerCase().includes(value.toLowerCase())) {
        this.talukas.push(option);
      }
    });

    if (this.talukas.length > 0) {
      this.addressinfo.DISTRICT = this.talukas[0]['DISTRICT']
      this.addressinfo.STATE = this.talukas[0]['STATE']
      this.addressinfo.PINCODE = this.talukas[0]['PINCODE']
    }
  }
  onChanges2(value: string): void {
    this.pincodes = [];
    this.talukas.filter(option => {
      if (option.PINCODE.toLowerCase().includes(value.toLowerCase())) {
        this.pincodes.push(option.PINCODE);
      }
    });

  }
  getAddresslist() {
    let filter = ""
    this.api.getAddresslist(0, 0, "TALUKA", "asc", filter).subscribe(data => {
      this.options = data['data'];
    }, err => {
      this.options = []
    });
  }
  loadExtraInfo() {
    let filter = ""
    if (this.TYPE == "B")
      filter = " AND EXTRA_INFORMATION_ID=6 AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND TYPE='B'"
    else
      filter = " AND EXTRA_INFORMATION_ID=6 AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND APPLICANT_ID=" + this.APPLICANT_ID + " AND TYPE='" + this.TYPE + "'"
    //console.log(filter)
    this.api.getAllApplicantExtraInformation(0, 0, "SEQ_NO", "asc", filter).subscribe(data => {
      this.extraApplicantInformation = data['data'][0]
    }, err => {
      //console.log(err);
    });


  }


  data1() {

  }


  changeIsAgricuture(value) {
    // //console.log(value)
    // if(value==true)
    //   this.data.TYPE_OF_PROPERTY="G"
    // else
    //   this.data.TYPE_OF_PROPERTY="M"
  }

  loadAddress(addressId) {
    this.isSpinning = true
    this.addressinfo = new Addressinfo()
    let filter = " AND ID=" + addressId
    this.api.getAllAddressInformation(0, 0, 'ID', 'desc', filter).subscribe(data => {
      //console.log(data)
      if (data['code'] == "200" && data['count'] > 0) {
        this.addressinfo = data['data'][0]
        console.log(this.addressinfo);
      }
      this.isSpinning = false
    }, err => {
      //console.log(err);
    });



    // this.api.getAllPropertyInformation(0, 0, "ID", "desc", " AND PROPOSAL_ID=" + this.PROPOSAL_ID)
    // .subscribe(data => {
    //   //console.log(data)
    //   if (data['code'] == "200" && data['count'] > 0) {   
    // this.data = data['data'];
    //   this.data.VALUATION_DATE=data['data'][0]['VALUATION_DATE']
    //   console.log (this.data.VALUATION_DATE);

    //   }
    // });
  }

  BDateToF(date:string):string{
    let darray = date.split('-');
    let newdate = `${darray[2]}/${darray[1]}/${darray[0]}`
    return newdate;
  }

  isValidPincode(pincode) {
    const expression = /^[1-9][0-9]{5}/;
    return expression.test(String(pincode).toLowerCase())
  }
  save(addNew: boolean): void {
    //console.log(this.data.MOVABLE_TYPE)
    var ok = true



    if (this.data.IS_VALUATION_DONE) {
      if (this.data.VALUATION_AMOUNT == undefined)
        ok = false
    }



    if (this.addressinfo.PINCODE != undefined && this.addressinfo.PINCODE != "") {
      if (this.isValidPincode(this.addressinfo.PINCODE)) {
      }
      else {
        ok = false;
        this.message.error(this.api.translate.instant('common.message.error.wronginfo'), "");
      }
    }
    if (this.data.TOTAL_AREA == undefined) {
      this.data.TOTAL_AREA = 0
    }
    if (this.data.AREA_UNIT == undefined) {
      this.data.AREA_UNIT = ''
    }
    if (this.data.BUILDUP_AREA == undefined) {
      this.data.BUILDUP_AREA = 0
    }

    if (this.data.AKAR_RS == undefined) {
      this.data.AKAR_RS = 0
    }
    if (this.data.REMARK == undefined) {
      this.data.REMARK = ''
    }

    if (this.data.MORTGUAGE_DETAILS == undefined) {
      this.data.MORTGUAGE_DETAILS = ''
    }
    if (this.addressinfo.R_S_NO == undefined) this.addressinfo.R_S_NO = 0;
    if (this.addressinfo.TMC_NO == undefined) this.addressinfo.TMC_NO = 0;

    if (this.addressinfo.VPC_NO == undefined) this.addressinfo.VPC_NO = 0;
    if (this.addressinfo.SURVEY_NO == undefined) this.addressinfo.SURVEY_NO = 0;
    if (this.addressinfo.FLAT_NO == undefined) this.addressinfo.FLAT_NO = 0;
    if (this.addressinfo.PLOT_NO == undefined) this.addressinfo.PLOT_NO = 0;
    if (this.addressinfo.E_SWATTU == undefined) this.addressinfo.E_SWATTU = 0;
    if (this.addressinfo.CTS_NO == undefined) this.addressinfo.CTS_NO = 0;
    if (this.addressinfo.BUILDING == undefined) this.addressinfo.BUILDING = ""
    if (this.addressinfo.LANDMARK == undefined) this.addressinfo.LANDMARK = "";

    if (
      (this.addressinfo.DISTRICT == undefined || this.addressinfo.DISTRICT.trim() == "") &&
      (this.addressinfo.PINCODE == undefined || this.addressinfo.PINCODE.trim() == "") &&
      (this.addressinfo.TALUKA == undefined || this.addressinfo.TALUKA.trim() == "") &&
      (this.addressinfo.STATE == undefined || this.addressinfo.STATE.trim() == "") &&
      (this.addressinfo.VILLAGE == undefined || this.addressinfo.VILLAGE.trim() == "")

    ) {
      this.message.error(this.api.translate.instant('common.message.error.address'), "");
      ok = false
    } else {

      if (this.isValidPincode(this.addressinfo.PINCODE)) {
      }
      else {
        ok = false;
        this.message.error(this.api.translate.instant('common.message.error.wronginfo'), "");
      }
    }
    if (ok) {
      if (this.data.PROPERTY_DETAILS == undefined) {
        this.data.PROPERTY_DETAILS = ' '
      }

      if (this.data.VALUATION_AMOUNT == undefined) {
        this.data.VALUATION_AMOUNT = 0
      }

      this.data.BANK_INSTITUTION_NAME = " "
      this.data.LOAN_OUTSTANDING_AMOUNT = 0
      this.data.VALUATOR_NAME = " "
      this.data.VALUATION_DATE = null
      this.data.OWNER_NAME = " "
      this.data.MOVABLE_TYPE = 'M'
      this.data.IS_MACHINERY_OR_OTHER = 'M'
      // this.data.IS_AGRICULTURE_LAND_OR_OTHER = 'A'

      if (this.data.ADDRESS_ID > 0) {
        this.api.updateAddressInformation(this.addressinfo)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.nextstep(addNew)

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
              this.api.getAllAddressInformation(0, 0, "ID", "desc", "")
                .subscribe(data1 => {
                  this.data.ADDRESS_ID = data1['data'][0]['ID']
                  this.nextstep(addNew)
                });
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
  save1(addNew: boolean): void {
    //console.log(this.data.MOVABLE_TYPE)
    var ok = true


    if (this.data.IS_VALUATION_DONE) {
      if (this.data.VALUATION_AMOUNT == undefined)
        ok = false
    }



    if (this.addressinfo.PINCODE != undefined && this.addressinfo.PINCODE != "") {
      if (this.isValidPincode(this.addressinfo.PINCODE)) {
      }
      else {
        ok = false;
        this.message.error(this.api.translate.instant('common.message.error.wronginfo'), "");
      }
    }
    if (this.data.TOTAL_AREA == undefined) {
      this.data.TOTAL_AREA = 0
    }
    if (this.data.AREA_UNIT == undefined) {
      this.data.AREA_UNIT = ''
    }
    if (this.data.BUILDUP_AREA == undefined) {
      this.data.BUILDUP_AREA = 0
    }

    if (this.data.AKAR_RS == undefined) {
      this.data.AKAR_RS = 0
    }
    if (this.data.REMARK == undefined) {
      this.data.REMARK = ''
    }

    if (this.data.MORTGUAGE_DETAILS == undefined) {
      this.data.MORTGUAGE_DETAILS = ''
    }
    if (this.addressinfo.R_S_NO == undefined) this.addressinfo.R_S_NO = 0;
    if (this.addressinfo.TMC_NO == undefined) this.addressinfo.TMC_NO = 0;
    if (this.addressinfo.VPC_NO == undefined) this.addressinfo.VPC_NO = 0;
    if (this.addressinfo.SURVEY_NO == undefined) this.addressinfo.SURVEY_NO = 0;
    if (this.addressinfo.FLAT_NO == undefined) this.addressinfo.FLAT_NO = 0;
    if (this.addressinfo.PLOT_NO == undefined) this.addressinfo.PLOT_NO = 0;
    if (this.addressinfo.E_SWATTU == undefined) this.addressinfo.E_SWATTU = 0;
    if (this.addressinfo.CTS_NO == undefined) this.addressinfo.CTS_NO = 0;
    if (this.addressinfo.BUILDING == undefined) this.addressinfo.BUILDING = ""
    if (this.addressinfo.LANDMARK == undefined) this.addressinfo.LANDMARK = "";
    if (
      (this.addressinfo.DISTRICT == undefined || this.addressinfo.DISTRICT.trim() == "") &&
      (this.addressinfo.PINCODE == undefined || this.addressinfo.PINCODE.trim() == "") &&
      (this.addressinfo.TALUKA == undefined || this.addressinfo.TALUKA.trim() == "") &&
      (this.addressinfo.STATE == undefined || this.addressinfo.STATE.trim() == "") &&
      (this.addressinfo.VILLAGE == undefined || this.addressinfo.VILLAGE.trim() == "")

    ) {
      this.message.error(this.api.translate.instant('common.message.error.address'), "");
      ok = false
    } else {

      if (this.isValidPincode(this.addressinfo.PINCODE)) {
      }
      else {
        ok = false;
        this.message.error(this.api.translate.instant('common.message.error.wronginfo'), "");
      }
    }
    if (ok) {
      // if (this.data.PROPERTY_DETAILS == undefined) {
      //   this.data.PROPERTY_DETAILS = ' '
      // }

      // if (this.data.VALUATION_AMOUNT == undefined) {
      //   this.data.VALUATION_AMOUNT = 0
      // }

      this.data.BANK_INSTITUTION_NAME = " "
      this.data.LOAN_OUTSTANDING_AMOUNT = 0
      this.data.VALUATOR_NAME = " "
      this.data.VALUATION_DATE = null
      this.data.OWNER_NAME = " "
      this.data.MOVABLE_TYPE = 'M'
      this.data.IS_MACHINERY_OR_OTHER = 'M'
      // this.data.IS_AGRICULTURE_LAND_OR_OTHER = 'A'

      if (this.data.ADDRESS_ID > 0) {
        this.api.updateAddressInformation(this.addressinfo)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.nextstep(addNew)
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
              this.api.getAllAddressInformation(0, 0, "ID", "desc", "")
                .subscribe(data1 => {
                  this.data.ADDRESS_ID = data1['data'][0]['ID']
                  this.nextstep(addNew)
                });
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

  valuationDate: string = '';
  expiryDate: string = '';

  WheelCountToVehicleType(count:number):string{
    let Vtype = [2,3,4,6,8,10,12];
    return `${Vtype[count-1]} Wheeler`
  }

  nextstep2(addNew) {
    if (this.valuationDate != '') {
      console.log('Valuation date Already saved!')
    }
    else {
      if (this.data.VALUATION_DATE != '' && this.data.VALUATION_DATE != undefined)
        this.valuationDate = this.data.VALUATION_DATE;
        let darray = this.valuationDate.split('/');
        let newdate = new Date(~~darray[2], ~~darray[1] - 1, ~~darray[0]);
        this.data.VALUATION_DATE = this.datePipe.transform(newdate, 'yyyy-MM-dd');
        console.log(`Valution date in nextstep2 ${this.data.VALUATION_DATE}`);
    
    }
    if (this.expiryDate != '') {
      console.log('Expiry date Already saved!')
    }
    else {
      if (this.data.INSURANCE_EXPIRY_DATE != '' && this.data.INSURANCE_EXPIRY_DATE != undefined)
        this.expiryDate = this.data.INSURANCE_EXPIRY_DATE;
        let darray = this.expiryDate.split('/');
        let newdate = new Date(~~darray[2], ~~darray[1] - 1, ~~darray[0]);
        this.data.INSURANCE_EXPIRY_DATE = this.datePipe.transform(newdate, 'yyyy-MM-dd'); 
        console.log(`insurance expiry date in nextstep2 ${this.data.INSURANCE_EXPIRY_DATE}`);
    }

    if(this.data.WHEELS_COUNT != 0 && this.data.WHEELS_COUNT != undefined && this.data.WHEELS_COUNT != null){
      this.data.MOVABLE_TYPE = this.WheelCountToVehicleType(this.data.WHEELS_COUNT)
    }

    console.log("Vehical data : ",this.data)
    
    if (this.data.ID) {

      this.api.updatePropertyInformation(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            // localStorage.setItem('wheelcount',this.data.WHEELS_COUNT) 
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
            this.extraApplicantInformation.IS_PROVIDED = true
            this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {

                }
                else {
                  this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
                }
              });
            this.demos.emit(false)
            this.logtext = 'Update & Close - PropertyInformation form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - PropertyInformation ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });

            if (!addNew)
              this.drawerClose();
            this.isSpinning1 = false;
            this.isSpinning = false;

          }
          else {

            this.logtext = 'Update & Close - PropertyInformation form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - PropertyInformation ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });

            this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
            this.isSpinning1 = false;
            this.isSpinning = false;

          }

        });


    }
    else {

      this.data.PROPOSAL_ID = this.PROPOSAL_ID

      this.api.createPropertyInformation(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('common.message.error.success'), "");
            this.data.PROPOSAL_ID = this.PROPOSAL_ID
            this.extraApplicantInformation.IS_PROVIDED = true
            this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                }
                else {
                  this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
                }
              });
            this.demos.emit(false)
            this.api.getAllPropertyInformation(0, 0, "ID", "desc", " AND PROPOSAL_ID=" + this.PROPOSAL_ID).subscribe(data => {
              //console.log(data)
              this.data.VALUATION_DATE = this.datePipe.transform(this.data.VALUATION_DATE, 'dd-MM-yyyy');
              this.data.INSURANCE_EXPIRY_DATE = this.datePipe.transform(this.data.INSURANCE_EXPIRY_DATE, 'dd-MM-yyyy');
              this.data.WHEELS_COUNT = data['data'][0]['WHEELS_COUNT']
              
             
              let totalRecords = data['count'];
              //console.log(totalRecords)
              if (totalRecords > 0) {

              }

            }, err => {
              //console.log(err);
              if (err['ok'] == false)
                this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
            });


            if (!addNew) {
              this.drawerClose();

              this.logtext = 'Save & Close - PropertyInformation form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - PropertyInformation ]";
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
              this.data = new Propertyinformation();
              this.addressinfo = new Addressinfo();
              this.logtext = 'Save & New - PropertyInformation form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - PropertyInformation ]";
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

            this.isSpinning1 = false;
            this.isSpinning = false;

          }
          else {
            this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
            this.isSpinning1 = false;
            this.logtext = 'Save & Close - PropertyInformation form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - PropertyInformation ]";
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

  valuationDate2: string = '';
  expiryDate2: string = '';
  nextstep(addNew) {

    this.data.INCOME_INFORMATION_ID = 0
    if (this.valuationDate2 != '') {
      console.log('Valuation date Already saved!')
    }
    else {
      if (this.data.VALUATION_DATE != '' && this.data.VALUATION_DATE != undefined)
        this.valuationDate2 = this.data.VALUATION_DATE;
        let darray = this.valuationDate2.split('/');
        let newdate = new Date(~~darray[2], ~~darray[1] - 1, ~~darray[0]);
        this.data.VALUATION_DATE = this.datePipe.transform(newdate, 'yyyy-MM-dd');
        console.log(`Valution date in nextstep ${this.data.VALUATION_DATE}`);
    }
    if (this.expiryDate2 != '') {
      console.log('Expiry date Already saved!')
    }
    else {
      if (this.data.INSURANCE_EXPIRY_DATE != '' &&  this.data.INSURANCE_EXPIRY_DATE != undefined)
        this.expiryDate2 = this.data.INSURANCE_EXPIRY_DATE;
        let darray = this.expiryDate2.split('/');
       let  newdate = new Date(~~darray[2], ~~darray[1] - 1, ~~darray[0]);
        this.data.INSURANCE_EXPIRY_DATE = this.datePipe.transform(newdate, 'yyyy-MM-dd');
        console.log(`insurance expiry date in nextstep ${this.data.INSURANCE_EXPIRY_DATE}`);
    }
   


   


    // this.data.PLACE_OF_EMPLOYMENT=0
    this.data.PROPOSAL_ID = this.PROPOSAL_ID
    if (this.data.ID) {
      this.api.updatePropertyInformation(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
            this.extraApplicantInformation.IS_PROVIDED = true
            this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                }
                else {
                  this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
                }
              });
            this.demos.emit(false)
            this.logtext = 'Update & Close - PropertyInformation form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - PropertyInformation ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });

            if (!addNew)
              this.drawerClose();
            this.isSpinning1 = false;
            this.isSpinning = false;


          }
          else {
            this.isSpinning1 = false;
            this.isSpinning = false;

            this.logtext = 'Update & Close - PropertyInformation form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - PropertyInformation ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });

            this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
            this.isSpinning1 = false;
            this.isSpinning = false;

          }
        });


    }
    else {

      if (this.TYPE == "B") {
        this.data.TYPE = "B"
      }
      else {
        this.data.TYPE = this.TYPE
        this.data.APPLICANT_ID = this.APPLICANT_ID
      }

      this.data.PROPOSAL_ID = this.PROPOSAL_ID
      console.log(this.data)
      this.api.createPropertyInformation(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('common.message.error.success'), "");
            this.extraApplicantInformation.IS_PROVIDED = true
            this.data.PROPOSAL_ID = this.PROPOSAL_ID
            this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                }
                else {
                  this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
                }
              });
            this.demos.emit(false)
            let filter
            if (this.TYPE == "B")
              filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND TYPE='B'" + " AND (";
            else
              filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND APPLICANT_ID=" + this.APPLICANT_ID + " AND TYPE=" + this.TYPE;


            this.api.getAllPropertyInformation(0, 0, "ID", "desc", filter).subscribe(data => {
              //console.log(data)
              this.data.VALUATION_DATE = this.datePipe.transform(this.data.VALUATION_DATE, 'dd-MM-yyyy');
              //  this.data.INSURANCE_EXPIRY_DATE = this.datePipe.transform(this.data.INSURANCE_EXPIRY_DATE, 'dd-MM-yyyy');
              this.data.INSURANCE_EXPIRY_DATE = this.data.INSURANCE_EXPIRY_DATE
              this.data.WHEELS_COUNT = data['data'][0]['WHEELS_COUNT']
              console.log(this.data.WHEELS_COUNT)
              let totalRecords = data['count'];
              //console.log(totalRecords)
              if (totalRecords > 0) {


              }

            }, err => {
              //console.log(err);
              if (err['ok'] == false)
                this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
            });


            if (!addNew) {
              this.drawerClose();

              this.logtext = 'Save & Close - PropertyInformation form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - PropertyInformation ]";
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
              this.data = new Propertyinformation();
              this.addressinfo = new Addressinfo();
              this.logtext = 'Save & New - PropertyInformation form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - PropertyInformation ]";
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

            this.isSpinning1 = false;
            this.isSpinning = false;

          }
          else {
            this.isSpinning1 = false;
            this.isSpinning = false;

            this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
            this.isSpinning1 = false;
            this.logtext = 'Save & Close - PropertyInformation form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - PropertyInformation ]";
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

  close() {
    this.drawerClose()
  }
  GETDATAa() {
    this.api.getAllPropertyInformation(0, 0, "ID", "desc", " AND PROPOSAL_ID=" + this.PROPOSAL_ID).subscribe(data => {

      this.data = data['data'];
      console.log("data in get : ",this.data);
      if ((this.data.VALUATION_DATE != '' || this.data.VALUATION_DATE != undefined) && (this.data.INSURANCE_EXPIRY_DATE != '' || this.data.INSURANCE_EXPIRY_DATE != undefined)) {
        let darray = this.data.VALUATION_DATE.split('-');
        let newdate = new Date(~~darray[0], ~~darray[1] - 1, ~~darray[2]);
        this.data.VALUATION_DATE = this.datePipe.transform(newdate, 'dd/MM/yyyy');
        console.log(`Valution date in  GETDATAa ${this.data.VALUATION_DATE}`);

        darray = this.data.INSURANCE_EXPIRY_DATE.split('-');
        newdate = new Date(~~darray[0], ~~darray[1] - 1, ~~darray[2]);
        this.data.INSURANCE_EXPIRY_DATE = this.datePipe.transform(newdate, 'dd/MM/yyyy');
        console.log(`insurance expiry date in  GETDATAa ${this.data.INSURANCE_EXPIRY_DATE}`);
      }
      else {
        console.log('VALUTION_DATE or EXPIRY_DATE is undefined of empty')
      }

    });
  }
}
