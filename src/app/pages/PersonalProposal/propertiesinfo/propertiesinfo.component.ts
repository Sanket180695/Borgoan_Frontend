import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { Propertyinformation } from 'src/app/Models/PersonalProposal/propertyinformation';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { PropertiesinfoaddComponent } from '../propertiesinfoadd/propertiesinfoadd.component';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { DatePipe } from '@angular/common';
import { createAutoCorrectedDatePipe } from 'text-mask-addons';
import { SubPropertyinfo } from 'src/app/Models/PersonalProposal/subpropertyinfo';

@Component({
  selector: 'app-propertiesinfo',
  templateUrl: './propertiesinfo.component.html',
  styleUrls: ['./propertiesinfo.component.css'],
  providers: [DatePipe]
})
export class PropertiesinfoComponent implements OnInit {
  @Output() demos: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() data: Propertyinformation;
  @Input() data1: SubPropertyinfo;
  @Input() PROPOSAL_ID: number
  @Input() APPLICANT_ID: number
  @Input() TYPE: string;
  @Input() CURRENT_STAGE_ID: number;
  @Input() LOAN_KEY: Number;
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  pipe = new DatePipe('en-US');
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')
  @ViewChild(PropertiesinfoaddComponent, { static: false }) propertyAdd: PropertiesinfoaddComponent;
  formTitle = this.api.translate.instant('propertiesinfo.formTitle');
  pageIndex = 1;
  isSpinning1 = false
  pageSize = 10;
  totalRecords = 1;
  dataList = [];
  dataList1 = [];
  dataList12 = [];
  loadingRecords = true;
  sortValue: string = "desc";
  roleId = sessionStorage.getItem("roleId")
  sortKey: string = "id";
  searchText: string = "";
  filterQuery: string = "";
  isFilterApplied: string = "default";
  logtext: string = "";
  extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  columns: string[][] = [['PROPERTY_DETAILS', this.api.translate.instant('propertiesinfoadd.propertydetails1_title')], ['TOTAL_AREA', this.api.translate.instant('propertiesinfoadd.totalarea1_title')], ['VALUATION_AMOUNT', this.api.translate.instant('propertiesinfoadd.valuation_amount_title')], ['AKAR_RS', this.api.translate.instant('agri_info.AKAR_title')]]
  columns1: string[][] = [['VEHICLE_NAME', 'Vehicle Name'], ['VEHICLE_NO', 'Vehicle No.'], ['VALUATION_AMOUNT', this.api.translate.instant('propertiesinfoadd.valuation_amount_title')], ['VALUATION_DATE', 'Valuation Date']]
  isButtonVerifySpinning = false;
  //drawer Variables
  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: Propertyinformation = new Propertyinformation();
  userActivityLogData: Useractivitylog = new Useractivitylog();
  addressId: number
  isButtonSpinning = false;
  @ViewChild(PropertiesinfoaddComponent, { static: false }) propertyadd: PropertiesinfoaddComponent;
  constructor(private api: ApiService, private message: NzNotificationService, private datePipe: DatePipe) { }
  ngOnInit() {
    this.GETDATAa()
    this.search()
    this.logtext = "OPENED - Propertyinformation form KEYWORD[O - Propertyinformation] ";
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          //console.log(successCode);
        }
        else {
          //console.log(successCode);
        }
      });

    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "Propertyinformation  - Opened"
    this.userActivityLogData.ACTIVITY_TIME = new Date()
    this.api.createUserActivityLog(this.userActivityLogData)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          //console.log(successCode);
        }
        else {
          //console.log(successCode);
        }
      });
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



  // Basic Methods
  sort(sort: { key: string; value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;
    this.search(true);

  }



  search(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loadingRecords = true;
    var sort: string;
    try {
      sort = this.sortValue.startsWith("a") ? "asc" : "desc";

      this.logtext = "Filter Applied - Propertyinformation form" + sort + " " + this.sortKey + " KEYWORD [F - Propertyinformation] ";
      this.api.addLog('A', this.logtext, this.api.emailId)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            //console.log(successCode);
          }
          else {
            //console.log(successCode);
          }
        });

      this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
      this.userActivityLogData.ACTIVITY_DETAILS = "Property Information - Sort on " + sort + " " + this.sortKey
      this.userActivityLogData.ACTIVITY_TIME = new Date()
      this.api.createUserActivityLog(this.userActivityLogData)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            //console.log(successCode);
          }
          else {
            //console.log(successCode);
          }
        });



    } catch (error) {
      sort = "";
    }
    //console.log("search text:" + this.searchText);
    if (this.searchText != "") {
      var likeQuery
      if (this.TYPE == "B")
        likeQuery = " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND TYPE='B'" + " AND (";
      else
        likeQuery = " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND APPLICANT_ID=" + this.APPLICANT_ID + " AND TYPE='" + this.TYPE + "' AND (";

      this.columns.forEach(column => {
        likeQuery += " " + column[0] + " like '%" + this.searchText + "%' OR";
      });
      this.columns1.forEach(column => {
        likeQuery += " " + column[0] + " like '%" + this.searchText + "%' OR";
      });
      likeQuery = likeQuery.substring(0, likeQuery.length - 2) + ")"
      //console.log("likeQuery" + likeQuery);

      this.logtext = "Filter Applied - Propertyinformation form " + likeQuery + " KEYWORD [F - Propertyinformation] ";
      this.api.addLog('A', this.logtext, this.api.emailId)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            //console.log(successCode);
          }
          else {
            //console.log(successCode);
          }
        });


      this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
      this.userActivityLogData.ACTIVITY_DETAILS = "Property Information - Search For " + this.searchText + " " + likeQuery
      this.userActivityLogData.ACTIVITY_TIME = new Date()
      this.api.createUserActivityLog(this.userActivityLogData)
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
      if (this.TYPE == "B")
        likeQuery = "AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND TYPE='B'"
      else
        likeQuery = "AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND APPLICANT_ID=" + this.APPLICANT_ID + " AND TYPE='" + this.TYPE + "'"


    }


    //console.log("propo" + this.PROPOSAL_ID)
    //console.log(likeQuery)


    this.api.getAllPropertyInformation(this.pageIndex, this.pageSize, this.sortKey, sort, likeQuery).subscribe(data => {
      //console.log(data)
      this.loadingRecords = false;
      if (data['code'] == "200" && data['data'].length > 0) {
        this.totalRecords = data['count'];
        this.dataList = data['data'];

        console.log("datalist", this.dataList)
        console.log("data", this.data);
        // this.data.NAME_OF_VERIFYING_OFFICER = this.dataList[0]['NAME_OF_VERIFYING_OFFICER'] 

        this.data.IS_VALUATION_DONE = this.dataList[0]['IS_VALUATION_DONE']
        this.data.VALUATION_DATE = this.datePipe.transform(this.data.VALUATION_DATE, 'dd-MM-yyyy');
        this.data.INSURANCE_EXPIRY_DATE = this.datePipe.transform(this.data.INSURANCE_EXPIRY_DATE, 'dd-MM-yyyy');
        this.data.WHEELS_COUNT = data['data'][0]['WHEELS_COUNT']
      }
    }, err => {
      //console.log(err);
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });
    this.api.getAllSubPropertyInformation(0, 0, "ID", "desc", " AND PROPOSAL_ID=" + this.PROPOSAL_ID)
      .subscribe(data1 => {
        if (data1['code'] == "200" && data1['data'].length > 0) {
          this.dataList12 = data1['data'];
          this.data1.ID = this.dataList12[0]['ID']
          // this.data1.DATE_OF_VERIFICATION = this.dataList12[0]['DATE_OF_VERIFICATION'] 
          this.data1.DATE_OF_VERIFICATION = this.datePipe.transform(this.dataList12[0]['DATE_OF_VERIFICATION'], 'yyyy-MM-dd');
          if(this.data1.DATE_OF_VERIFICATION != '' && this.data1.DATE_OF_VERIFICATION != undefined){
            this.data1.DATE_OF_VERIFICATION = this.BDateToF(this.data1.DATE_OF_VERIFICATION);
          }
          console.log(this.data1.DATE_OF_VERIFICATION, "datatatatata");
          this.data1.NAME_OF_VERIFYING_OFFICER = this.dataList12[0]['NAME_OF_VERIFYING_OFFICER']
          this.data1.IS_VALUATION_DONE = this.dataList12[0]['IS_VALUATION_DONE']

          this.data1.IS_RC_ENCLOSED = this.dataList12[0]['IS_RC_ENCLOSED']

          this.data1.COMBINED_UTARA = this.dataList12[0]['COMBINED_UTARA'] == '1' ? true : false
          this.data1.CULTIVATION_DETAILS = this.dataList12[0]['CULTIVATION_DETAILS'] == '1' ? true : false
          this.data1.VALUATION_1 = this.dataList12[0]['VALUATION_1'] == '1' ? true : false
          this.data1.NO_DUES = this.dataList12[0]['NO_DUES'] == '1' ? true : false
          this.data1.BOUNDARIES_1 = this.dataList12[0]['BOUNDARIES_1'] == '1' ? true : false
          this.data1.SKETCH_1 = this.dataList12[0]['SKETCH_1'] == '1' ? true : false
          this.data1.ENCUMBRANCE_CERTIFICATE_1 = this.dataList12[0]['ENCUMBRANCE_CERTIFICATE_1'] == '1' ? true : false
          this.data1.PHOTO_1 = this.dataList12[0]['PHOTO_1'] == '1' ? true : false
          

          this.data1.HOME_UTARA = this.dataList12[0]['HOME_UTARA'] == '1' ? true : false
          this.data1.VALUATION_2 = this.dataList12[0]['VALUATION_2'] == '1' ? true : false
          this.data1.PHOTO = this.dataList12[0]['PHOTO'] == '1' ? true : false
          this.data1.BOUNDARIES_2 = this.dataList12[0]['BOUNDARIES_2'] == '1' ? true : false
          this.data1.SKETCH_2 = this.dataList12[0]['SKETCH_2'] == '1' ? true : false
          this.data1.ENCUMBRANCE_CERTIFICATE_2 = this.dataList12[0]['ENCUMBRANCE_CERTIFICATE_2'] == '1' ? true : false
        }
      });

  }
  //Drawer Methods
  get closeCallback() {
    return this.drawerClose.bind(this);
  }

  delete(data:Propertyinformation){
    data.ARCHIVE_FLAG = 'T';
    this.api.updatePropertyInformation(data).subscribe(res=>{
      if(res['code']==200){
        this.message.success("Property deleted Successfully","");
        this.dataList = [];
        this.search();
      }
      else{
        this.message.error("Failed to Delete Property","");
      }
    })
  }

  add(): void {

    this.drawerTitle = this.api.translate.instant('propertiesinfo.drawerTitle1');
    this.drawerData = new Propertyinformation();
    this.drawerData.AREA_UNIT = 'S'
    if (this.TYPE == "B")
      this.drawerData.TYPE = "B"
    else {
      this.drawerData.TYPE = this.TYPE
      this.drawerData.APPLICANT_ID = this.APPLICANT_ID
    }
    this.propertyAdd.changeIsAgricuture(true)
    this.propertyAdd.addressinfo = new Addressinfo()
    this.drawerVisible = true;
    this.logtext = "ADD - Propertyinformation form KEYWORD [A - Propertyinformation] ";
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          //console.log(successCode);
        }
        else {
          //console.log(successCode);
        }
      });

    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "Property Information - Add Clicked"
    this.userActivityLogData.ACTIVITY_TIME = new Date()
    this.api.createUserActivityLog(this.userActivityLogData)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          //console.log(successCode);
        }
        else {
          //console.log(successCode);
        }
      });

  }

  edit(data: Propertyinformation): void {
    // this.data.WHEELS_COUNT = localStorage.getItem('wheelcount')
    // console.log( this.data.WHEELS_COUNT)
    this.drawerTitle = this.api.translate.instant('propertiesinfo.drawerTitle2');
    this.drawerData = Object.assign({}, data);
    //this.drawerData.WHEELS_COUNT = this.data.WHEELS_COUNT;
    console.log('before', this.drawerData);
    this.drawerData.WHEELS_COUNT = data.WHEELS_COUNT;
    console.log('after', this.drawerData);
    if (this.drawerData.VALUATION_DATE != undefined && this.drawerData.VALUATION_DATE != '') {
      let darray = this.drawerData.VALUATION_DATE.split('-');
      let newdate = new Date(~~darray[0], ~~darray[1] - 1, ~~darray[2]);
      this.drawerData.VALUATION_DATE = this.datePipe.transform(newdate, 'dd/MM/yyyy');
      console.log(`Valution date in  edit ${this.drawerData.VALUATION_DATE}`);
    }
    if (this.drawerData.INSURANCE_EXPIRY_DATE != undefined && this.drawerData.INSURANCE_EXPIRY_DATE != '') {
      let darray = this.drawerData.INSURANCE_EXPIRY_DATE.split('-');
      let newdate = new Date(~~darray[0], ~~darray[1] - 1, ~~darray[2]);
      this.drawerData.INSURANCE_EXPIRY_DATE = this.datePipe.transform(newdate, 'dd/MM/yyyy');
      console.log(`insurance expiry date in  edit ${this.drawerData.INSURANCE_EXPIRY_DATE}`);
    }



    this.propertyadd.loadAddress(data.ADDRESS_ID)
    this.drawerVisible = true;

    this.logtext = "EDIT - Propertyinformation form KEYWORD [E - Propertyinformation] ";
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          //console.log(successCode);
        }
        else {
          //console.log(successCode);
        }
      });
    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "Property Information - Edit Clicked"
    this.userActivityLogData.ACTIVITY_TIME = new Date()
    this.api.createUserActivityLog(this.userActivityLogData)
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

  getData1(data1, data) {
    if (data1 == "M") {
      if (data == "M")
        return this.api.translate.instant('propertiesinfoadd.propertytype3_option1_title');
      else if (data == "O")
        return this.api.translate.instant('propertiesinfoadd.propertytype3_option2_title');
      else if (data == "S")
        return this.api.translate.instant('propertiesinfoadd.propertytype3_option3_title');
      else if (data == "V")
        return this.api.translate.instant('propertiesinfoadd.propertytype3_option4_title');
      else if (data == "W")
        return this.api.translate.instant('propertiesinfoadd.propertytype3_option5_title');

    }
  }

  getData(data1, data) {
    if (data1 == "I") {
      if (data == "A")
        return this.api.translate.instant('propertiesinfoadd.IS_AGRICULTURE_LAND_OR_OTHER_option1_title');
      else if (data == "H")
        return this.api.translate.instant('propertiesinfoadd.IS_AGRICULTURE_LAND_OR_OTHER_option2_title');
      else if (data == "F")
        return this.api.translate.instant('propertiesinfoadd.IS_AGRICULTURE_LAND_OR_OTHER_option3_title');
      else if (data == "C")
        return this.api.translate.instant('propertiesinfoadd.IS_AGRICULTURE_LAND_OR_OTHER_option4_title');
      else if (data == "P")
        return this.api.translate.instant('propertiesinfoadd.IS_AGRICULTURE_LAND_OR_OTHER_option5_title');
      else if (data == "O")
        return this.api.translate.instant('propertiesinfoadd.IS_AGRICULTURE_LAND_OR_OTHER_option6_title');
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
              this.demos.emit(false)
              var LOG_ACTION = ''
              var DESCRIPTION = ''
              if (this.extraApplicantInformation.IS_APPROVED == true) {
                LOG_ACTION = 'Property Info Tab information Verified'

                DESCRIPTION = sessionStorage.getItem('userName') + ' has checked and approved the Property Info for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK
              } else {
                LOG_ACTION = 'Property Info Tab information Rejected'
                DESCRIPTION = sessionStorage.getItem('userName') + 'has checked and rejected the Property Info for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK

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

  demos2() {
    this.demos.emit(false)
    var LOG_ACTION = 'User saved Property Info  tab information'
    var DESCRIPTION = sessionStorage.getItem('userName') + ' has saved the Property Info  for the proposal ' + this.LOAN_KEY
    var LOG_TYPE = 'I'
    this.api.proposalLogInformation(this.extraApplicantInformation.PROPOSAL_ID, this.extraApplicantInformation.CURRENT_STAGE_ID, 0, LOG_ACTION, Number(sessionStorage.getItem("userId")), DESCRIPTION, LOG_TYPE)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
        }
      });

  }
  BDateToF(date: string): string {
    let darray = date.split('-');
    console.log(darray);
    let newdate = `${darray[2]}/${darray[1]}/${darray[0]}`
    console.log(newdate);
    return newdate;
  }
  verificationDate: string = '';
  count: number = 0;

  
  save() {
    this.count++;
    console.log("count", this.count);
    this.extraApplicantInformation.IS_PROVIDED = true;
    this.extraApplicantInformation.IS_PROVIDED_NULL = true;
    this.isButtonSpinning = true;
    console.log(this.data1.ID)

    console.log(`date of verification in save func before transformation ${this.data1.DATE_OF_VERIFICATION}`);
    // if (this.verificationDate != '') {
    //   console.log("already saved");
    // }
    // else {
    //   if (this.data1.DATE_OF_VERIFICATION != undefined && this.data1.DATE_OF_VERIFICATION != '' && this.count == 1)
    //     this.verificationDate = this.BDateToF(this.data1.DATE_OF_VERIFICATION);
    //   let darray = this.verificationDate.split('/');
    //   let VerificationDate = new Date(~~darray[2], ~~darray[1] - 1, ~~darray[0]);
    //   this.data1.DATE_OF_VERIFICATION = this.datePipe.transform(VerificationDate, 'yyyy-MM-dd');
    //   console.log(`date of verification in save func after transformation ${this.data1.DATE_OF_VERIFICATION}`);

    // }
    if (this.data1.DATE_OF_VERIFICATION != undefined && this.data1.DATE_OF_VERIFICATION != '') {
      if (this.data1.DATE_OF_VERIFICATION.charAt(2) == '/') {
        this.verificationDate = this.data1.DATE_OF_VERIFICATION;
        let darray = this.verificationDate.split('/');
        let VerificationDate = new Date(~~darray[2], ~~darray[1] - 1, ~~darray[0]);
        this.data1.DATE_OF_VERIFICATION = this.datePipe.transform(VerificationDate, 'yyyy-MM-dd');
        console.log(`date of verification in save func after transformation ${this.data1.DATE_OF_VERIFICATION}`);
      }
      else {
        this.verificationDate = this.BDateToF(this.data1.DATE_OF_VERIFICATION);
        let darray = this.verificationDate.split('/');
        let VerificationDate = new Date(~~darray[2], ~~darray[1] - 1, ~~darray[0]);
        this.data1.DATE_OF_VERIFICATION = this.datePipe.transform(VerificationDate, 'yyyy-MM-dd');
        console.log(`date of verification in save func after transformation ${this.data1.DATE_OF_VERIFICATION}`);
      }
    }
    // this.dataList[0]['NAME_OF_VERIFYING_OFFICER'] = this.data.NAME_OF_VERIFYING_OFFICER
    // this.dataList[0]['DATE_OF_VERIFICATION'] = this.data.DATE_OF_VERIFICATION
    // this.dataList[0]['IS_VALUATION_DONE'] = this.data.IS_VALUATION_DONE

    // this.api.updatePropertyInformation(this.dataList[0])
    // .subscribe(successCode => {
    //   if (successCode['code'] == "200") {

    if (this.data1.ID) {
      this.data1.PROPOSAL_ID = this.PROPOSAL_ID
      this.api.updateSubPropertyInformation(this.data1)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
            this.extraApplicantInformation.IS_PROVIDED = true
            this.isButtonSpinning = false;
            this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                }
                else {
                  this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
                }
              });
            this.demos.emit(false)
            this.api.getAllSubPropertyInformation(0, 0, "ID", "desc", " AND PROPOSAL_ID=" + this.PROPOSAL_ID)
              .subscribe(data1 => {
                if (data1['code'] == "200" && data1['data'].length > 0) {
                  this.dataList12 = data1['data'];
                  console.log(this.dataList12);

                  this.data1.NAME_OF_VERIFYING_OFFICER = this.dataList12[0]['NAME_OF_VERIFYING_OFFICER']
                  // this.data1.DATE_OF_VERIFICATION = this.dataList12[0]['DATE_OF_VARIFICATION'] 
                  this.data1.DATE_OF_VERIFICATION = this.datePipe.transform(this.dataList12[0]['DATE_OF_VARIFICATION'], 'yyyy-MM-dd');
                  if(this.data1.DATE_OF_VERIFICATION != '' && this.data1.DATE_OF_VERIFICATION != undefined){
                    this.data1.DATE_OF_VERIFICATION = this.BDateToF(this.data1.DATE_OF_VERIFICATION);
                  }
                  this.data1.IS_VALUATION_DONE = this.dataList12[0]['IS_VALUATION_DONE']
                  this.data1.ID = this.dataList12[0]['ID']
                  this.data1.IS_RC_ENCLOSED = this.dataList12[0]['IS_RC_ENCLOSED']

                  this.data1.COMBINED_UTARA = this.dataList12[0]['COMBINED_UTARA'] == '1' ? true : false
                  this.data1.CULTIVATION_DETAILS = this.dataList12[0]['CULTIVATION_DETAILS'] == '1' ? true : false
                  this.data1.VALUATION_1 = this.dataList12[0]['VALUATION_1'] == '1' ? true : false
                  this.data1.NO_DUES = this.dataList12[0]['NO_DUES'] == '1' ? true : false
                  this.data1.BOUNDARIES_1 = this.dataList12[0]['BOUNDARIES_1'] == '1' ? true : false
                  this.data1.SKETCH_1 = this.dataList12[0]['SKETCH_1'] == '1' ? true : false
                  this.data1.ENCUMBRANCE_CERTIFICATE_1 = this.dataList12[0]['ENCUMBRANCE_CERTIFICATE_1'] == '1' ? true : false
                  this.data1.PHOTO_1 = this.dataList12[0]['PHOTO_1'] == '1' ? true : false
                  console.log(this.data1.PHOTO_1 );

                  this.data1.HOME_UTARA = this.dataList12[0]['HOME_UTARA'] == '1' ? true : false
                  this.data1.VALUATION_2 = this.dataList12[0]['VALUATION_2'] == '1' ? true : false
                  this.data1.PHOTO = this.dataList12[0]['PHOTO'] == '1' ? true : false
                  this.data1.BOUNDARIES_2 = this.dataList12[0]['BOUNDARIES_2'] == '1' ? true : false
                  this.data1.SKETCH_2 = this.dataList12[0]['SKETCH_2'] == '1' ? true : false
                  this.data1.ENCUMBRANCE_CERTIFICATE_2 = this.dataList12[0]['ENCUMBRANCE_CERTIFICATE_2'] == '1' ? true : false
                }
              });


            // this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
            this.isButtonSpinning = false;
            // this.isSpinning = false;

          }
        });


    }
    else {


      this.data1.PROPOSAL_ID = this.PROPOSAL_ID
      console.log(this.data1)
      this.api.createSubPropertyInformation(this.data1)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('common.message.error.success'), "");
            this.extraApplicantInformation.IS_PROVIDED = true
            this.data1.PROPOSAL_ID = this.PROPOSAL_ID
            this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                }
                else {
                  this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
                }
              });
            this.demos.emit(false)
            this.api.getAllSubPropertyInformation(0, 0, "ID", "desc", " AND PROPOSAL_ID=" + this.PROPOSAL_ID)
              .subscribe(data1 => {
                if (data1['code'] == "200" && data1['data'].length > 0) {
                  this.dataList12 = data1['data'];
                  this.data1.NAME_OF_VERIFYING_OFFICER = this.dataList12[0]['NAME_OF_VERIFYING_OFFICER']
                  // this.data1.DATE_OF_VERIFICATION = this.dataList12[0]['DATE_OF_VERIFICATION'] 
                  this.data1.DATE_OF_VERIFICATION = this.datePipe.transform(this.dataList12[0]['DATE_OF_VERIFICATION'], 'yyyy-MM-dd');
                  if(this.data1.DATE_OF_VERIFICATION != '' && this.data1.DATE_OF_VERIFICATION != undefined){
                    this.data1.DATE_OF_VERIFICATION = this.BDateToF(this.data1.DATE_OF_VERIFICATION);
                  }
                  // console.log(this.data1.DATE_OF_VERIFICATION,"datatatatata");

                  this.data1.IS_VALUATION_DONE = this.dataList12[0]['IS_VALUATION_DONE']
                  this.data1.ID = this.dataList12[0]['ID']
                  this.data1.IS_RC_ENCLOSED = this.dataList12[0]['IS_RC_ENCLOSED']

                  this.data1.COMBINED_UTARA = this.dataList12[0]['COMBINED_UTARA'] == '1' ? true : false
                  this.data1.CULTIVATION_DETAILS = this.dataList12[0]['CULTIVATION_DETAILS'] == '1' ? true : false
                  this.data1.VALUATION_1 = this.dataList12[0]['VALUATION_1'] == '1' ? true : false
                  this.data1.NO_DUES = this.dataList12[0]['NO_DUES'] == '1' ? true : false
                  this.data1.BOUNDARIES_1 = this.dataList12[0]['BOUNDARIES_1'] == '1' ? true : false
                  this.data1.SKETCH_1 = this.dataList12[0]['SKETCH_1'] == '1' ? true : false
                  this.data1.ENCUMBRANCE_CERTIFICATE_1 = this.dataList12[0]['ENCUMBRANCE_CERTIFICATE_1'] == '1' ? true : false
                  this.data1.PHOTO_1 = this.dataList12[0]['PHOTO_1'] == '1' ? true : false

                  this.data1.HOME_UTARA = this.dataList12[0]['HOME_UTARA'] == '1' ? true : false
                  this.data1.VALUATION_2 = this.dataList12[0]['VALUATION_2'] == '1' ? true : false
                  this.data1.PHOTO = this.dataList12[0]['PHOTO'] == '1' ? true : false
                  this.data1.BOUNDARIES_2 = this.dataList12[0]['BOUNDARIES_2'] == '1' ? true : false
                  this.data1.SKETCH_2 = this.dataList12[0]['SKETCH_2'] == '1' ? true : false
                  this.data1.ENCUMBRANCE_CERTIFICATE_2 = this.dataList12[0]['ENCUMBRANCE_CERTIFICATE_2'] == '1' ? true : false
                }
              });
            this.isButtonSpinning = false;
            // this.isSpinning = false;

          }
          else {
            this.isButtonSpinning = false;
            // this.isSpinning = false;

            this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
            // this.isSpinning1 = false;
            this.isButtonSpinning = false;

          }
        });



    }


    // }

    // });

  }

  GETDATAa() {
    this.api.getAllPropertyInformation(0, 0, "ID", "desc", " AND PROPOSAL_ID=" + this.PROPOSAL_ID).subscribe(data => {
      //console.log(data)

      this.data = data['data'];
      this.data.VALUATION_DATE = this.datePipe.transform(this.data.VALUATION_DATE, 'dd-MM-yyyy');
      this.data.INSURANCE_EXPIRY_DATE = this.datePipe.transform(this.data.INSURANCE_EXPIRY_DATE, 'dd-MM-yyyy');


    });
  }

}