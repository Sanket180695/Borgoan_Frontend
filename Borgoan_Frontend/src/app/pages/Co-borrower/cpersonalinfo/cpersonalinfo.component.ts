import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { NzModalRef, NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { ApiService } from 'src/app/Service/api.service';
import { DatePipe } from '@angular/common';
import { createAutoCorrectedDatePipe } from 'text-mask-addons';
import { GpersonalInfo } from 'src/app/Models/LoanTypeQues/Amulya/Guarantor/gpersonalinfo';
import { GIDSort } from 'src/app/Models/LoanTypeQues/Amulya/G_ID_sort';
import { Guarantor } from 'src/app/Models/LoanTypeQues/Amulya/Guarantor/guarantor';
import { Banker } from 'src/app/Models/LoanTypeQues/Amulya/Guarantor/gbanker';
import { Employer } from 'src/app/Models/LoanTypeQues/Amulya/Guarantor/gemployer';

@Component({
  selector: 'app-cpersonalinfo',
  templateUrl: './cpersonalinfo.component.html',
  styleUrls: ['./cpersonalinfo.component.css'],
  providers: [DatePipe]
})
export class CpersonalinfoComponent implements OnInit {
  @Output() demo: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() CURRENT_STAGE_ID: number;
  @Input() GuarantorData: Guarantor;
  @Input() addressinfoCurrent: Addressinfo;
  @Input() addressinfoPermanent: Addressinfo;
  @Input() familyDeatils
  @Input() personalInformationId
  @Input() PROPOSAL_ID: Number;
  @Input() APPLICANT_ID: number
  @Input() LOAN_KEY: number
  @Input() IS_APPROVED: number;
  @Input() personalInfo: GpersonalInfo;


  extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()

  banker: Banker[] = [];
  employer: Employer[] = [];
  // personalInfo: GpersonalInfo = new GpersonalInfo();
  single_Banker: Banker = new Banker();
  single_Employer: Employer = new Employer();


  isButtonSpinning = false
  isSpinning = false
  age: number
  NAME: string = ""
  RELATION: any
  OCCUPATION: string
  YEARLY_INCOME: number
  // familyDeatils=[]
  confirmModal?: NzModalRef;
  i = 2
  isButtonVerifySpinning = false
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  pipe = new DatePipe('en-US');
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')
  index1 = -1
  maxBirthDate = new Date();
  roleId = sessionStorage.getItem("roleId");
  constructor(private api: ApiService, private modal: NzModalService, private datePipe: DatePipe, private message: NzNotificationService) { }

  ngOnInit(): void {
    this.maxBirthDate.setFullYear(this.maxBirthDate.getFullYear() - 18);
    this.getExtraInfo();
    this.getData();
  }


  ngAfterViewInit(): void {


  }
  getExtraInfo() {
    let filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND APPLICANT_ID=" + this.GuarantorData.ID + " AND TYPE='S'" + "AND EXTRA_INFORMATION_ID = 1"
    this.api.getAllApplicantExtraInformation(0, 0, 'SEQ_NO', "asc", filter).subscribe(data => {
      if (data['code'] == 200 && data['data'].length > 0) {
        this.extraApplicantInformation = data['data'][0];
      }
      else {


      }

    }, err => {
      ////console.log(err);
    });
  }


  getData() {
    this.getGuarantorPersonal();
    this.getBanker();
    this.getEmployer()
  }

  getGuarantorPersonal() {
    this.personalInfo = new GpersonalInfo();
    let sortkey: GIDSort = {
      G_ID: this.GuarantorData.ID
    };

    this.api.getGuarantorPersonal_Amulya(sortkey).subscribe(res => {
      if (res['code'] == 200 && res['data'].length > 0) {
        Object.keys(res['data'][0]).forEach(key => {
          if (res['data'][0][key]) {
            this.personalInfo[key] = res['data'][0][key];
          }
        });

      }
    });
  }









  disabledDate = (current) => {
    return new Date(new Date().setFullYear(new Date().getFullYear() - 18)) < current;
  }





  copyClick() {
    this.personalInfo.GP_STATE = this.personalInfo.GC_STATE
    this.personalInfo.GP_DISTRICT = this.personalInfo.GC_DISTRICT
    this.personalInfo.GP_TALUKA = this.personalInfo.GC_TALUKA
    this.personalInfo.GP_VILLAGE = this.personalInfo.GC_VILLAGE
    this.personalInfo.GP_PINCODE = this.personalInfo.GC_PINCODE
    this.personalInfo.GP_LANDMARK = this.personalInfo.GC_LANDMARK
    this.personalInfo.GP_BUILDING = this.personalInfo.GC_BUILDING
    this.personalInfo.GP_HOUSE_NO = this.personalInfo.GC_HOUSE_NO
  }

  getBanker() {
    this.banker = [];
    let banker_sortKey: GIDSort = {
      G_ID: this.GuarantorData.ID,

    };

    this.api.getAllBanker_Amulya(banker_sortKey).subscribe(res => {
      if (res['code'] == 200 && res['data'].length > 0) {
        this.banker = res['data'];
      }
    })
  }

  addBanker() {
    if (this.single_Banker.ID) {
      this.api.UpdateBanker_Amulya(this.single_Banker).subscribe(res => {
        if (res['code'] == 200) {
          this.getBanker();
          this.single_Banker = new Banker();
        }
      })
    }
    else {
      this.single_Banker.G_ID = this.GuarantorData.ID;
      this.single_Banker.P_ID = this.personalInfo.ID ? this.personalInfo.ID : null;
      this.api.addBanker_Amulya(this.single_Banker).subscribe(res => {
        if (res['code'] == 200) {
          this.getBanker();
          this.single_Banker = new Banker();
        }
      });
    }


  }


  deleteBanker(data: Banker) {
    data.ARCHIVE_FLAG = 'T';
    this.api.UpdateBanker_Amulya(data).subscribe(res => {
      if (res['code'] == 200) {
        this.getBanker();
      }
    })

  }

  editBanker(data: Banker) {
    this.single_Banker = data;
    this.banker.splice(this.banker.findIndex(a => a.ID === this.single_Banker.ID), 1)
  }



  getEmployer() {
    this.employer = []
    let employer_sortKey: GIDSort = {
      G_ID: this.GuarantorData.ID,

    }

    this.api.getAllEmployer_Amulya(employer_sortKey).subscribe(res => {
      if (res['code'] == 200 && res['data'].length > 0) {
        this.employer = res['data'];
      }
    })
  }


  addEmployer() {
    this.employer = [];
    if (this.single_Employer.ID) {
      this.api.UpdateEmployer_Amulya(this.single_Employer).subscribe(res => {
        if (res['code'] == 200) {
          this.getEmployer();
          this.single_Employer = new Employer();
        }
      })
    }
    else {
      this.single_Employer.G_ID = this.GuarantorData.ID;
      this.single_Employer.P_ID = this.personalInfo.ID ? this.personalInfo.ID : null;
      this.api.addEmployer_Amulya(this.single_Employer).subscribe(res => {
        if (res['code'] == 200) {
          this.getEmployer();
          this.single_Employer = new Employer();
        }
      })
    }


  }


  deleteEmployer(data: Employer) {
    data.ARCHIVE_FLAG = 'T';
    this.api.UpdateEmployer_Amulya(data).subscribe(res => {
      if (res['code'] == 200) {
        this.getEmployer();
      }
    })
  }

  editEmployer(data: Employer) {
    this.single_Employer = data;
    this.employer.splice(this.employer.findIndex(a => a.ID === this.single_Employer.ID), 1)
  }




  save() {
    this.isButtonSpinning = true;
    if (this.personalInfo.ID) {
      this.api.UpdateGuarantorPersonal_Amulya(this.personalInfo).subscribe((res) => {
        if (res['code'] == 200) {

          this.message.success("Guarantor Personal Information", "Guarantor Personal Information Successfully Updated");
          this.isButtonSpinning = false;
          this.getGuarantorPersonal();
          this.updateExtraInfo();

        }
        else {
          this.message.error("Guarantor Personal Information", "Failed to Update Guarantor Personal Information");

          this.isButtonSpinning = false;
        }
      });
    }
    else {
      this.personalInfo.G_ID = this.GuarantorData.ID;
      this.api.addGuarantorPersonal_Amulya(this.personalInfo).subscribe(res => {
        if (res['code'] == 200) {
          this.message.success("Guarantor Personal Information", "Guarantor Personal Information Successfully Added");
          this.isButtonSpinning = false;
          this.getGuarantorPersonal();
          this.updateExtraInfo();

        }
        else {
          this.message.error("Guarantor Personal Information", "Failed to Add Guarantor Personal Information");
          this.isButtonSpinning = false;
        }
      })

    }
    this.GuarantorData.G_NAME = this.personalInfo.G_NAME;
    this.GuarantorData.G_MOBILE = this.personalInfo.G_MOBILE;
    this.api.UpdateGuarantorInfo_Amulya(this.GuarantorData).subscribe(res => {
      if (res['code'] == 200) {
        //console.log('success');
      }
    })


  }

  updateExtraInfo() {
    this.extraApplicantInformation.IS_PROVIDED = true
    this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          this.demo.emit(false);
        }
        else {
          this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");


        }
      });
  }

  checkValidation() {

    if (this.isValidPincode(this.addressinfoCurrent.PINCODE)) { }
    else
      this.message.error(this.api.translate.instant('common.message.error.pincode'), "");

    if (this.isValidPincode(this.addressinfoPermanent.PINCODE)) { }
    else
      this.message.error(this.api.translate.instant('common.message.error.pincode2'), "");
  }

  isValidEmail(email) {
    const expression = /^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/;
    return expression.test(String(email).toLowerCase())
  }
  isValidPan(pan) {
    const expression = /[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}/;
    return expression.test(String(pan))
  }
  isValidMobile(mobile) {
    const expression = /^[6-9]\d{9}$/;
    return expression.test(String("" + mobile).toLowerCase())
  }
  isValidAdhar(adhar) {
    const expression = /[0-9]{12}/;
    return expression.test(String(adhar))
  }
  // isValidlandline(landline)
  // {

  //     const expression = /^[0-9]\d{2,4}-\d{6,8}$/;
  //     return expression.test(String(landline))
  // }
  isValidPincode(pincode) {
    const expression = /^[1-9][0-9]{5}/;
    return expression.test(String(pincode).toLowerCase())
  }
  focusss(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      this.personalInfo.G_DOB = undefined;
    }
  }

  onChange(date) {
    if (date != undefined && date != '') {
      const darray = date.split('/');
      let bdate = new Date(darray[2], darray[1], darray[0]);
      //console.log(bdate);
      //console.log(Date.now)
      let timeDiff = Math.abs(Date.now() - bdate.getTime());
      //console.log(timeDiff)
      this.personalInfo.G_AGE = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    }

  }
}

