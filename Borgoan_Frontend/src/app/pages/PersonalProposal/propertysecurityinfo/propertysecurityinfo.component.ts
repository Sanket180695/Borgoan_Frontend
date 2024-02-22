import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Propertyinformation } from 'src/app/Models/PersonalProposal/propertyinformation';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-propertysecurityinfo',
  templateUrl: './propertysecurityinfo.component.html',
  styleUrls: ['./propertysecurityinfo.component.css'],
  providers: [DatePipe]

})
export class PropertysecurityinfoComponent implements OnInit {

  @Input() data: Propertyinformation;
  @Input() PROPOSAL_ID: number
  @Output() demo : EventEmitter<boolean> =
    new EventEmitter<boolean>();

  isButtonSpinning = false
  detailsLoading = false
  propertyinfo: Propertyinformation[]
  PROPERTY_DETAILS_ID
  VALUATOR_NAME: string = ""
  VALUATION_AMOUNT: number = 0
  VALUATION_DATE: string
  propertySecurityInfo = []
  loadingRecords = false
  i = 2
  propertyDetails: string
  constructor(private api: ApiService, private datePipe: DatePipe, private message: NzNotificationService) { }

  ngOnInit(): void {
    //console.log(this.PROPOSAL_ID)
    this.loadAllPropertyDetails()
    this.loadAllSecurityInfo()
  }

  loadAllPropertyDetails() {
    this.detailsLoading = true;
    let filter = " AND IS_MORTGAGED=0 AND PROPOSAL_ID=" + this.PROPOSAL_ID +" AND TYPE='B'"
    this.api.getAllPropertyInformation(0, 0, '', '', filter).subscribe(localName => {
      //console.log(localName)
      if (localName['code'] == "200" && localName['data'].length > 0) {
      this.propertyinfo = localName['data'];
      }
      this.detailsLoading = false;
    }, err => {
      //console.log(err);
      this.detailsLoading = false;
    });
  }




  loadAllSecurityInfo() {
    this.loadingRecords = true;
    let filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID
    this.api.getAllPropertySecurityInformation(0, 0, '', '', filter).subscribe(data => {
      //console.log("property secuty")
      //console.log(data)
      this.propertySecurityInfo = data['data'];
      this.loadingRecords = false;
    }, err => {
      //console.log(err);
      this.loadingRecords = false;
    });
  }
  changePropertyDetails(propertyId) {
    var data = this.propertyinfo.find(item => item.ID === propertyId)
    this.propertyDetails = data['PROPERTY_DETAILS']
  }

  addPropertyDetails() {
    if (this.propertySecurityInfo.length == 0) {
      this.propertySecurityInfo = [
        {
          ID: 0,
          PROPOSAL_ID: this.PROPOSAL_ID,
          PROPERTY_INFORMATION_ID: this.PROPERTY_DETAILS_ID,
          PROPERTY_DETAILS: this.propertyDetails,
          VALUATOR_NAME: this.VALUATOR_NAME,
          VALUATION_AMOUNT: this.VALUATION_AMOUNT,
          VALUATION_DATE: this.datePipe.transform(this.VALUATION_DATE, "yyyy-MM-dd"),
          CLIENT_ID: this.api.clientId
        }
      ];
    }
    else {

      let time = this.propertySecurityInfo.filter(object => {
        return object['PROPERTY_INFORMATION_ID'] == this.PROPERTY_DETAILS_ID
      });

      if (time.length == 0) {

        this.propertySecurityInfo = [
          ...this.propertySecurityInfo,
          {
            ID: 0,
            PROPOSAL_ID: this.PROPOSAL_ID,
            PROPERTY_INFORMATION_ID: this.PROPERTY_DETAILS_ID,
            PROPERTY_DETAILS: this.propertyDetails,
            VALUATOR_NAME: this.VALUATOR_NAME,
            VALUATION_AMOUNT: this.VALUATION_AMOUNT,
            VALUATION_DATE: this.datePipe.transform(this.VALUATION_DATE, "yyyy-MM-dd"),
            CLIENT_ID: this.api.clientId
          }
        ];
        this.i++;
      }
      else {
        this.message.error(this.api.translate.instant('propertysecurityinfo.message1'), "");

      }

    }
  }


  deleteRow(data) {
    const index = this.propertySecurityInfo.indexOf(data);
    this.propertySecurityInfo.splice(index, 1);
    this.propertySecurityInfo = this.propertySecurityInfo.filter(object => {
      return object['ID'] != this.data
    });
  }

  addData() {
    if (this.PROPERTY_DETAILS_ID != undefined && this.VALUATOR_NAME != "" && this.VALUATION_AMOUNT != 0 && this.VALUATION_DATE != undefined) {
      this.addPropertyDetails()
      this.PROPERTY_DETAILS_ID = undefined
      this.VALUATOR_NAME = ""
      this.VALUATION_AMOUNT = 0
      this.VALUATION_DATE = undefined
    }
    else {
      this.message.error(this.api.translate.instant('common.message.error.emptyinfo'), "");
    }

  }

  save() {
//console.log(this.propertySecurityInfo)
this.isButtonSpinning=true
    this.api.addPropertySecurityDetails(this.propertySecurityInfo,this.PROPOSAL_ID)
    .subscribe(successCode => {
      //console.log(successCode)
      if(successCode['code']=="200")
      { 
          this.message.success(this.api.translate.instant('common.message.error.success'), "");
        this.loadAllSecurityInfo()
        this.demo.emit(false)
          this.isButtonSpinning=false
      }
      else
      {
        this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
        this.isButtonSpinning=false
      }
    });

  }
}
