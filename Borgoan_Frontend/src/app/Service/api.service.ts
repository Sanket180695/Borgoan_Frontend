import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';


import { CookieService } from 'ngx-cookie-service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { User } from '../Models/Commonmodule/user';
import { Role } from '../Models/Commonmodule/role';
import { Form } from '../Models/Commonmodule/form';
import { Roledetails } from '../Models/Commonmodule/roledetails';
import { Documentgroup } from '../Models/BasicForms/documentgroup';
import { Document } from '../Models/BasicForms/document';
import { Loantypes } from '../Models/BasicForms/loantypes';
import { Applicanttype } from '../Models/BasicForms/applicanttype';
import { Branchmaster } from '../Models/BasicForms/branchmaster';
import { Proposalstage } from '../Models/BasicForms/proposalstage';
import { Homepagebanner } from '../Models/BasicForms/homepagebanner';
import { Applicant } from '../Models/Applicant/applicant';
import { Useractivitylog } from '../Models/Applicant/useractivitylog';
import { Proposal } from '../Models/proposal';
import { Notificationmaster } from '../Models/BasicForms/notificationmaster';
import { Applicantdocument } from '../Models/Applicant/applicantdocument';
import { Extrainformation } from '../Models/PersonalProposal/extrainformation';
import { Personalinformation } from '../Models/PersonalProposal/personalinformation';
import { Incomeinformation } from '../Models/PersonalProposal/incomeinformation';
import { Loaninformation } from '../Models/PersonalProposal/loaninformation';
import { Financialinformation } from '../Models/PersonalProposal/financialinformation';
import { Creditinformation } from '../Models/PersonalProposal/creditinformation';
import { Propertyinformation } from '../Models/PersonalProposal/propertyinformation';
import { Primesecurityinfo } from '../Models/PersonalProposal/primesecurityinfo';
import { IncomeSource } from '../Models/PersonalProposal/income-source';
import { InstallmentFrequency } from '../Models/PersonalProposal/installment-frequency';
import { DeductionDetailsMaster } from '../Models/PersonalProposal/deduction-details-master';
import { BankLoan } from '../pages/PersonalProposal/credit-info/Models/bank-loan';
import { GuarantorForLoans } from '../pages/PersonalProposal/credit-info/Models/guarantor-for-loans';
import { DepositeInBank } from '../pages/PersonalProposal/credit-info/Models/deposite-in-bank';
import { EarlierLoanInfo } from '../Models/PersonalProposal/earlier-loan-info';
import { Addressinfo } from '../Models/PersonalProposal/addressinfo';
import { Extraapplicantinfo } from '../Models/extraapplicantinfo';
import { FirmDetails } from '../Models/FirmProposal/firm-details';
import { ManufacturingInfo } from '../Models/FirmProposal/manufacturing-info';
import { SisterConcern } from '../Models/FirmProposal/sister-concern';
import { PartnersInfo } from '../Models/FirmProposal/partners-info';
import { FactoryUnit } from '../Models/FirmProposal/factory-unit';
import { EmployeeInfo } from '../Models/FirmProposal/employee-info';
import { ManagementOfSalesInformation } from '../Models/FirmProposal/management-of-sales';
import { BalanceSheetInformation } from '../Models/FirmProposal/balance-sheet-information';
import { Bankloanscheme } from '../Models/PersonalProposal/bankloanscheme';
import { Shikshansavardhandata } from '../Models/LoanTypeQues/shikshansavardhandata';
import { Incomeyear } from '../Models/PersonalProposal/incomeyear';
import { Gurantorinfo } from '../Models/FirmProposal/gurantorinfo';
import { CostInfo, MeansInfo } from '../Models/FirmProposal/projection-info';
import { Subloantypes } from '../Models/subloantypes';
import { ProjectionInfo } from '../Models/PersonalProposal/projection-info';
import { Personalloan } from '../Models/LoanTypeQues/personalloan';
import { ConsumerDuarablesLoan } from '../Models/PersonalProposal/consumer-durables-loan';
import { Vehicleloan } from '../Models/PersonalProposal/vehicleloan';
import { Feedetails } from '../Models/PersonalProposal/feedetails';
import { MachineryLoan } from '../Models/PersonalProposal/machinery-loan';
import { DhanwantariLoan } from '../Models/PersonalProposal/dhanwantari-loan';
import { UtkarshLoan } from '../Models/PersonalProposal/utkarsh-loan';
import { ShubhVivahLoan } from '../Models/PersonalProposal/shubh-vivah-loan';
import { PledgeLoan } from '../Models/PersonalProposal/pledge-loan';
import { BuilderFinance } from '../Models/PersonalProposal/builder-finance';
import { RealEstateIndustrialFinance } from '../Models/PersonalProposal/real-estate-industrial-finance';
import { CashCreditLoan } from '../Models/PersonalProposal/cash-credit-loan';
import { CashCreditLoanOther } from '../Models/PersonalProposal/cash-credit-loan-other';
import { WorkOrders } from '../Models/PersonalProposal/work-orders';
import { RealEstateResidential } from '../Models/PersonalProposal/real-estate-residential';
import { RealEstateCommercial } from '../Models/PersonalProposal/real-estate-commercial';
import { Resincom } from '../Models/PersonalProposal/resincom';
import { IndustriMarking } from '../Models/PersonalProposal/industri-marking';
import { PrioritySection } from '../Models/PersonalProposal/priority-section';
import { WeekerSection } from '../Models/PersonalProposal/weeker-section';
import { TourAndTravelLoan } from '../Models/PersonalProposal/tour-and-travel-loan';
import { RentDiscountingLoan } from '../Models/PersonalProposal/rentdiscountingloan';
import { RealEstateToUpLoan } from '../Models/PersonalProposal/real-estate-to-up-loan';
import { Profitabilitystatement } from '../Models/PersonalProposal/profitabilitystatement';
import { Repayingcapacityborrower } from '../Models/PersonalProposal/repayingcapacityborrower';
import { Coborrower } from '../Models/PersonalProposal/coborrower';
import { Payments } from '../Models/Payments/payments';
import { Constitutes } from '../Models/FirmProposal/constitutes';
import { Firmbranchesdetails } from '../Models/FirmProposal/firmbranchesdetails';
import { CashCreditAddressDetails } from '../Models/PersonalProposal/cash-credit-address-details';
import { TranslateService } from '@ngx-translate/core';
import { Basicinfo } from '../Models/PersonalProposal/basicinfo';
import { Md5 } from 'ts-md5';
import { Scheduler } from '../Models/scheduler';
import { Goldloan } from '../Models/LoanTypeQues/goldloan';
import { GoldItem } from '../Models/BasicForms/gold-item';
import { Purposeofloan } from '../Models/PersonalProposal/purposeofloan';
import { Termforloan } from '../Models/PersonalProposal/termforloan';
import { Typeofinstallment } from '../Models/PersonalProposal/typeofinstallment';
import { FRecurringDeposit } from '../Models/PersonalProposal/FrecurringDeposit';
import { HouseShopRentInfo } from '../Models/PersonalProposal/Houseshoprentinfo';
import { ExpenditureInfo } from '../Models/PersonalProposal/expenditureinfo';
import { AgriInfo } from '../Models/PersonalProposal/agri-info';
import { AgriIncomeInfo } from '../Models/PersonalProposal/argriincomeinfo';
import { JointAccount } from '../Models/PersonalProposal/jointaccount';
import { SubPropertyinfo } from '../Models/PersonalProposal/subpropertyinfo';
import { AssignBranchmaster } from '../Models/BasicForms/assignbranch';
import { GIDSort } from '../Models/LoanTypeQues/Amulya/G_ID_sort';
import { GpropertyInfo } from '../Models/LoanTypeQues/Amulya/Guarantor/gpropertyinfo';
import { Guarantor } from '../Models/LoanTypeQues/Amulya/Guarantor/guarantor';
import { GpersonalInfo } from '../Models/LoanTypeQues/Amulya/Guarantor/gpersonalinfo';
import { Employer } from '../Models/LoanTypeQues/Amulya/Guarantor/gemployer';
import { Banker } from '../Models/LoanTypeQues/Amulya/Guarantor/gbanker';
import { Amulya } from '../Models/PersonalProposal/amulyaloan';
import { Sort } from '../Models/LoanTypeQues/Amulya/Sorts';
import { FamilyDetail } from '../Models/family-detail';
import { Reports } from '../Models/PersonalProposal/reports';
import { Goldloan1 } from '../Models/LoanTypeQues/goldloan1';
import { depositLoan } from '../pages/PersonalProposal/loan-demand/loanquestions/depositeloan/depositeloan.component';
import { AmulyaNew } from '../Models/amulya-new';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  currentMessage = new BehaviorSubject(null);
  cloudID
  clientId = 1

  // headers for forms all
  httpHeaders = new HttpHeaders();
  options = {
    headers: this.httpHeaders
  };

  // headers for forms file upload call
  httpHeaders1 = new HttpHeaders();
  options1 = {
    headers: this.httpHeaders1
  };


  // baseUrl = "http://192.168.1.10:3936/"
  baseUrl = "https://shrijyoti.kredpool.com:3936/"
  // baseUrl = "http://316403e73c00.ngrok.io/" 

  // gmUrl = "http://gm.kredpool.com:8079/"
  gmUrl = "https://gm.kredpool.com:8078/"

  chatbotUrl = "https://tecbot.tecpool.in/aibot_loanprosys/"

  imgUrl = this.baseUrl + "api/upload/"
  retriveimgUrl = this.baseUrl + "static/";
  url = this.baseUrl + "api/"
  dateforlog = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
  emailId = sessionStorage.getItem('emailId')
  userId = Number(sessionStorage.getItem('userId'))
  userName = sessionStorage.getItem("userName")
  roleId = sessionStorage.getItem("roleId")
  browserLang = ''
  loginName = "LoanProSys"
  cibilifkey = "SGXwLD9e"
  sanctionFkey = "eL9CtMZM"
  documentFkey = "lwO9LsuY"
  

  constructor(public translate: TranslateService, private cookie: CookieService, private message: NzNotificationService, private httpClient: HttpClient, private angularFireMessaging: AngularFireMessaging) {
    if (this.cookie.get('deviceId') === '' || this.cookie.get('deviceId') === null) {
      var deviceId = this.randomstring(16)
      this.cookie.set('deviceId', deviceId.toString(), 365, "", "", false, "Strict");
    }

    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'apikey': 'jLi5qGqBKBHonuJVcfFbiyqLbhni4ROsj',
      'applicationkey': 'nPz9XUnLCER8T5Lq',
      'deviceid': this.cookie.get('deviceId'),
      'supportkey': this.cookie.get('supportKey'),
      'Token': this.cookie.get('token'),
    });
    this.options = {
      headers: this.httpHeaders
    };

    this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    )
  }

  filteredProposalsSubject = new BehaviorSubject<Proposal[]>([]);
  filteredProposals$ = this.filteredProposalsSubject.asObservable();

  setFilteredProposals(proposals: Proposal[]) {
    this.filteredProposalsSubject.next(proposals);
  }

  private reconsideredProposals = new BehaviorSubject<number[]>([]);
  reconsideredProposals$ = this.reconsideredProposals.asObservable();

  addReconsideredProposal(proposalId: number) {
    const currentReconsideredProposals = this.reconsideredProposals.value;
    currentReconsideredProposals.push(proposalId);
    this.reconsideredProposals.next(currentReconsideredProposals);
  }

  sharedData: any;

  sharedDataSubject = new BehaviorSubject<any>(null);
  sharedData$ = this.sharedDataSubject.asObservable();

  setSharedData(data: any) {
    this.sharedDataSubject.next(data);
  }

  commonData: AmulyaNew = new AmulyaNew();

  getReconsideredProposals(): number[] {
    return this.reconsideredProposals.value;
  }

  getSecondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    if (h == 0)
      return m + " m " + s + " s "
    else
      return h + " h " + m + " m ";
  }


  //generate string as we pass length - LOGIN_FROMS
  randomstring(L) {
    var s = '';
    var randomchar = function () {
      var n = Math.floor(Math.random() * 62);
      if (n < 10) return n; //1-10
      if (n < 36) return String.fromCharCode(n + 55); //A-Z
      return String.fromCharCode(n + 61); //a-z
    }
    while (s.length < L) s += randomchar();
    return s;
  }

  generateRandomNumber(n) {
    return Math.floor(Math.random() * (9 * Math.pow(10, n - 1))) + Math.pow(10, n - 1);
  }

  // encryptData(data,key) {
  //   try {
  //     return CryptoJS.AES.encrypt(JSON.stringify(data),key).toString();
  //   } catch (e) {
  //     //console.log(e);
  //   }
  // }

  decryptData(data, key) {
    // try {
    //   var bytes = CryptoJS.AES.decrypt(data.toString(), key);
    //   var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    //   return decryptedData
    // } catch (e) {
    //   //console.log(e);
    // }
  }

  logoutForSessionValues() {
    this.cookie.delete("supportKey")
    this.cookie.delete("token")
    sessionStorage.clear();
    window.location.reload()
  }

  //firebase methods - FIREBASE
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        //console.log("new message received. ", payload);
        this.message.info(payload['data']['title'], payload['data']['body'])
        this.currentMessage.next(payload);
      })
  }

  requestPermission(userId) {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        this.cloudID = token
        //this.updateToken(userId, token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }




  // implement logger - LOGGER
  loggerInit() {
     
    this.httpHeaders1 = new HttpHeaders({
      'Content-Type': 'application/json',
      'apikey': 'SLQphsR7FlH8K3jRFnv23Mayp8jlnp9R',
      'applicationkey': 'nPz9XUnLCER8T5Lq',
      'deviceid': this.cookie.get('deviceId'),
    });
    this.options1 = {
      headers: this.httpHeaders1
    };

    var data = {
      CLIENT_ID: this.clientId
    };
    return this.httpClient.post(this.gmUrl + "device/init", JSON.stringify(data), this.options1);
  }

  addLog(type, text, userId): Observable<number> {
    this.httpHeaders1 = new HttpHeaders({
      'Content-Type': 'application/json',
      'apikey': 'SLQphsR7FlH8K3jRFnv23Mayp8jlnp9R',
      'applicationkey': 'nPz9XUnLCER8T5Lq',
      'deviceid': this.cookie.get('deviceId'),
      'supportkey': this.cookie.get('supportKey'),
      'Token': this.cookie.get('token'),
    });
      
     
    this.options1 = {
      headers: this.httpHeaders1
    };
    var data = {
      LOG_TYPE: type,
      LOG_TEXT: this.dateforlog + " " + text,
      USER_ID: userId,
      CLIENT_ID: this.clientId
    };
    return this.httpClient.post<number>(this.gmUrl + "device/addLog", JSON.stringify(data), this.options1);
  }

  // login method - LOGIN
  login(email: string, password: string) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'apikey': 'jLi5qGqBKBHonuJVcfFbiyqLbhni4ROsj',
      'applicationkey': 'nPz9XUnLCER8T5Lq',
      'deviceid': this.cookie.get('deviceId'),
      'supportkey': this.cookie.get('supportKey'),
      'Token': this.cookie.get('token'),
    });
    this.options = {
      headers: this.httpHeaders
    };
    var data = {
      username: email,
      password: (Md5.hashStr(password)).toString()
      // password: password,
    };
    return this.httpClient.post(this.baseUrl + "user/login", JSON.stringify(data), this.options);
  }


  // upload image with key - UPLOAD_IMAGE
  onUploadNewMethod(selectedFile, ext, fKey) {
    this.httpHeaders1 = new HttpHeaders({
      //'Content-Type': 'multipart/form-data',
      'Accept': 'application/json',
      'f_key': fKey,
      'f_ext': ext,
      'supportkey': this.cookie.get('supportKey'),
      'apikey': 'SLQphsR7FlH8K3jRFnv23Mayp8jlnp9R',
      'applicationkey': 'nPz9XUnLCER8T5Lq',
      'Token': this.cookie.get('token'),
    });
    this.options1 = {
      headers: this.httpHeaders1
    };
    const fd = new FormData()
    fd.append("F_DATA", selectedFile)
    fd.append("F_EXT", ext)
    fd.append("F_KEY", fKey)
    return this.httpClient.post(this.gmUrl + 'file/upload', fd, this.options1)
  }


  onUploadNewMethodBulk(selectedFile) {
    this.httpHeaders1 = new HttpHeaders({
      //'Content-Type': 'multipart/form-data',
      'Accept': 'application/json',
      'supportkey': this.cookie.get('supportKey'),
      'apikey': 'SLQphsR7FlH8K3jRFnv23Mayp8jlnp9R',
      'applicationkey': 'nPz9XUnLCER8T5Lq',
      'Token': this.cookie.get('token'),
    });
    this.options1 = {
      headers: this.httpHeaders1
    };

    const fd = new FormData()
    for (let file of selectedFile) {
      let name = file.f_key + "_" + file.url_key + "." + file.name.split('.').pop();
      fd.append("F_DATA", file, name)
    }
    return this.httpClient.post(this.gmUrl + 'File/uploadBulk', fd, this.options1)
  }


  //retrive file - GETTING_FILE
  getFile(lkey) {
    this.httpHeaders1 = new HttpHeaders({
      'Accept': 'application/pdf',
      'supportkey': this.cookie.get('supportKey'),
      'apikey': 'SLQphsR7FlH8K3jRFnv23Mayp8jlnp9R',
      'applicationkey': 'nPz9XUnLCER8T5Lq',
      'Token': this.cookie.get('token'),
    });
    this.options1 = {
      headers: this.httpHeaders1
    };

    var data = {
      L_KEY: lkey,
      TYPE: 'C'
    };
    return this.httpClient.post<any>(this.gmUrl + 'file/getFile', data, this.options1)
  }

  onUpload(folderName, selectedFile, filename) {
    this.httpHeaders1 = new HttpHeaders({
      'Accept': 'application/json',
      'apikey': 'jLi5qGqBKBHonuJVcfFbiyqLbhni4ROsj',
      'Token': this.cookie.get('token'),
      'supportkey': this.cookie.get('supportKey'),
    });
    this.options1 = {
      headers: this.httpHeaders1
    };
    //console.log(this.httpHeaders1)
    const fd = new FormData()
    fd.append("Image", selectedFile, filename)
    this.httpClient.post(this.imgUrl + folderName, fd, this.options1)
      .subscribe(res => {
        //console.log(res);
      });
  }



  updateFinancialDepositInfo(data:any){

    return this.httpClient.put(this.url+"financialInformation/updateDepositeInfo",data,this.options);

  }

  //get all Form For login menu
  getForms(roleId: number) {
    var data = {
      ROLE_ID: roleId,
    };
    return this.httpClient.post<Roledetails>(this.url + "user/getForms", JSON.stringify(data), this.options);
  }

  getCheckAccessOfForm(roleId: number, link: string) {
    var data = {
      ROLE_ID: roleId,
      LINK: link
    };
    return this.httpClient.post<Roledetails>(this.url + "roleDetails/checkAccess", JSON.stringify(data), this.options);
  }

  //methods for form related opearation  - FORM
  getAllForms(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Form[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Form[]>(this.url + "form/get", JSON.stringify(data), this.options);
  }

  createForm(form: Form): Observable<number> {
    form.CLIENT_ID = this.clientId
    return this.httpClient.post<number>(this.url + "form/create/", JSON.stringify(form), this.options);
  }

  updateForm(form: Form): Observable<number> {
    form.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "form/update/", JSON.stringify(form), this.options);
  }

  //methods for role related opearation  - ROLE
  getAllRoles(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Role[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Role[]>(this.url + "role/get", JSON.stringify(data), this.options);
  }

  createRole(application: Role): Observable<number> {
    application.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "role/create/", JSON.stringify(application), this.options);
  }

  updateRole(application: Role): Observable<number> {
    application.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "role/update/", JSON.stringify(application), this.options);
  }

  //get all form assigned - ROLE_DETAILS
  getRoleDetails(roleId: number) {
    var data = {
      ROLE_ID: roleId
    };
    //console.log(roleId)
    return this.httpClient.post<Roledetails[]>(this.url + "roleDetails/getData", JSON.stringify(data), this.options);
  }

  //assign all method forms - ROLE_DETAILS
  addRoleDetails(roleId: number, data1: string[]): Observable<number> {
    //console.log(roleId)
    var data = {
      ROLE_ID: roleId,
      data: data1,
    };
    return this.httpClient.post<number>(this.url + "roleDetails/addBulk", data, this.options);
  }
  // for branch

  AssignBranchDetails(userId: number, branchId: string[]): Observable<number> {
    console.log(userId)
    var data1 = {
      USER_ID: userId,
      BRANCH_IDS: branchId,
      // USER_ID,BRANCH_IDS = [1,2,3,...]
    };
    return this.httpClient.post<number>(this.url + "userBranchMapping/addBulk", data1, this.options);
  }
  // getAllAssignBranches1(userId: number) {
  //   var data = {
  //     USER_ID: userId,
  //   };
  //   //console.log(roleId)
  //   return this.httpClient.post<AssignBranchmaster[]>(this.url + "userBranchMapping/get", JSON.stringify(data), this.options);
  // }

  getAllAssignBranches1(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<User[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<User[]>(this.url + "userBranchMapping/get", JSON.stringify(data), this.options);
  }

  //method for user replated opearation - USER
  getAllUsers(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<User[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<User[]>(this.url + "user/get", JSON.stringify(data), this.options);
  }

  createUser(user: User): Observable<number> {
    user.CLIENT_ID = this.clientId;
    user.PASSWORD = (Md5.hashStr(user.PASSWORD)).toString()
    return this.httpClient.post<number>(this.url + "user/create/", JSON.stringify(user), this.options);
  }

  updateUser(user: User): Observable<number> {
    user.CLIENT_ID = this.clientId;
    user.PASSWORD = (Md5.hashStr(user.PASSWORD)).toString()
    return this.httpClient.put<number>(this.url + "user/update/", JSON.stringify(user), this.options);
  }
  changePassword(user: User): Observable<number> {
    user.CLIENT_ID = this.clientId;
    user['N_PASSWORD'] = (Md5.hashStr(user.PASSWORD)).toString();
    user['O_PASSWORD'] = (Md5.hashStr(user['OPASSWORD'])).toString();
    user['USER_ID'] = user.ID;
    return this.httpClient.post<number>(this.url + "user/changePassword/", JSON.stringify(user), this.options);
  }

  getAllDocumentGroups(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Documentgroup[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Documentgroup[]>(this.url + "documentGroup/get", JSON.stringify(data), this.options);
  }

  createDocumentGroup(documentGroup: Documentgroup): Observable<number> {
    documentGroup.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "documentGroup/create/", JSON.stringify(documentGroup), this.options);
  }

  updateDocumentGroup(documentGroup: Documentgroup): Observable<number> {

    documentGroup.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "documentGroup/update/", JSON.stringify(documentGroup), this.options);
  }

  getAllDocuments(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Document[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Document[]>(this.url + "document/get", JSON.stringify(data), this.options);
  }

  createDocument(document: Document): Observable<number> {

    document.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "document/create/", JSON.stringify(document), this.options);
  }

  updateDocument(document: Document): Observable<number> {

    document.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "document/update/", JSON.stringify(document), this.options);
  }



  getAllLoanTypes(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Loantypes[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Loantypes[]>(this.url + "loanTypes/get", JSON.stringify(data), this.options);
  }

  createLoanTypes(loanTypes: Loantypes): Observable<number> {

    loanTypes.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "loanTypes/create/", JSON.stringify(loanTypes), this.options);
  }

  updateLoanTypes(loanTypes: Loantypes): Observable<number> {

    loanTypes.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "loanTypes/update/", JSON.stringify(loanTypes), this.options);
  }

  getAllApplicantType(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Applicanttype[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Applicanttype[]>(this.url + "applicantType/get", JSON.stringify(data), this.options);
  }

  createApplicantType(applicantType: Applicanttype): Observable<number> {

    applicantType.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "applicantType/create/", JSON.stringify(applicantType), this.options);
  }

  updateApplicantType(applicantType: Applicanttype): Observable<number> {

    applicantType.CLIENT_ID = this.clientId;
    //console.log(applicantType)
    return this.httpClient.put<number>(this.url + "applicantType/update/", JSON.stringify(applicantType), this.options);
  }

  getAllBranches(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Branchmaster[]> {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'apikey': 'jLi5qGqBKBHonuJVcfFbiyqLbhni4ROsj',
      'applicationkey': 'nPz9XUnLCER8T5Lq',
      'deviceid': this.cookie.get('deviceId'),
      'supportkey': this.cookie.get('supportKey'),
      'Token': this.cookie.get('token'),
    });
    this.options = {
      headers: this.httpHeaders
    };
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Branchmaster[]>(this.url + "branch/get", JSON.stringify(data), this.options);
  }

  createBranch(branch: Branchmaster): Observable<number> {

    branch.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "branch/create/", JSON.stringify(branch), this.options);
  }
  updateBranch(branch: Branchmaster): Observable<number> {

    branch.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "branch/update/", JSON.stringify(branch), this.options);
  }
  getAllAssignBranches(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<AssignBranchmaster[]> {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'apikey': 'jLi5qGqBKBHonuJVcfFbiyqLbhni4ROsj',
      'applicationkey': 'nPz9XUnLCER8T5Lq',
      'deviceid': this.cookie.get('deviceId'),
      'supportkey': this.cookie.get('supportKey'),
      'Token': this.cookie.get('token'),
    });
    this.options = {
      headers: this.httpHeaders
    };
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<AssignBranchmaster[]>(this.url + "branch/get", JSON.stringify(data), this.options);
  }

  createAssignBranch(branch: AssignBranchmaster): Observable<number> {

    branch.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "userBranchMapping/addBulk", JSON.stringify(branch), this.options);
  }

  updateAssignBranch(branch: AssignBranchmaster): Observable<number> {

    branch.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "userBranchMapping/addBulk", JSON.stringify(branch), this.options);
  }

  

  getAllProposalStages(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Proposalstage[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Proposalstage[]>(this.url + "proposalStage/get", JSON.stringify(data), this.options);
  }

  createProposalStage(proposalStage: Proposalstage): Observable<number> {

    proposalStage.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "proposalStage/create/", JSON.stringify(proposalStage), this.options);
  }

  updateProposalStage(proposalStage: Proposalstage): Observable<number> {

    proposalStage.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "proposalStage/update/", JSON.stringify(proposalStage), this.options);
  }
  getAllHomePageBanners(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Homepagebanner[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Homepagebanner[]>(this.url + "homePageBanner/get", JSON.stringify(data), this.options);
  }

  createHomePageBanner(homePageBanner: Homepagebanner): Observable<number> {

    homePageBanner.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "homePageBanner/create/", JSON.stringify(homePageBanner), this.options);
  }

  updateHomePageBanner(homePageBanner: Homepagebanner): Observable<number> {

    homePageBanner.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "homePageBanner/update/", JSON.stringify(homePageBanner), this.options);
  }

  getAllApplicants(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Applicant[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Applicant[]>(this.url + "applicant/get", JSON.stringify(data), this.options);
  }

  createApplicant(applicant: Applicant): Observable<number> {

    applicant.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "applicant/create/", JSON.stringify(applicant), this.options);
  }

  updateApplicant(applicant: Applicant): Observable<number> {

    applicant.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "applicant/update/", JSON.stringify(applicant), this.options);
  }

  getAllUserActivityLogs(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Useractivitylog[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Useractivitylog[]>(this.url + "userActivityLog/get", JSON.stringify(data), this.options);
  }
  createUserActivityLog(userActivityLog: Useractivitylog): Observable<number> {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'apikey': 'jLi5qGqBKBHonuJVcfFbiyqLbhni4ROsj',
      'applicationkey': 'nPz9XUnLCER8T5Lq',
      'deviceid': this.cookie.get('deviceId'),
      'supportkey': this.cookie.get('supportKey'),
      'Token': this.cookie.get('token'),
    });
    this.options = {
      headers: this.httpHeaders
    };
    userActivityLog.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "userActivityLog/create/", JSON.stringify(userActivityLog), this.options);
  }

  updateUserActivityLog(userActivityLog: Useractivitylog): Observable<number> {

    userActivityLog.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "userActivityLog/update/", JSON.stringify(userActivityLog), this.options);
  }


  getLoanTypeMapping(loanTypeId: number) {
    var data = {
      LOAN_TYPE_ID: loanTypeId
    };
    //console.log(loanTypeId)
    return this.httpClient.post<Roledetails[]>(this.url + "roleDetails/getData", JSON.stringify(data), this.options);
  }

  addLoanTypeMapping(loanTypeId: number, data1: string[]): Observable<number> {
    var data = {
      LOAN_TYPE_ID: loanTypeId,
      data: data1,
    };
    return this.httpClient.post<number>(this.url + "roleDetails/addBulk", data, this.options);
  }

  getAllPraposals(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Proposal[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Proposal[]>(this.url + "praposal/get", JSON.stringify(data), this.options);
  }

  updateBranchProposal(proposalId: number, branchId: number, currentStageId: number, nextStageId: number, remark: string, isCompleted): Observable<number> {
    var data = {
      PROPOSAL_ID: proposalId,
      BRANCH_ID: branchId,
      CURRENT_STAGE_ID: currentStageId,
      NEXT_STAGE_ID: nextStageId,
      REMARKS: remark,
      IS_COMPLETED: isCompleted,
      USER_ID: this.userId
    };
    return this.httpClient.post<number>(this.url + "praposal/updatePraposalBranch", JSON.stringify(data), this.options);
  }

  updateCIBILProposal(score: number, reportUrl: string, proposalId: number, currentStageId: number, nextStageId: number, remark: string, isCompleted): Observable<number> {
    var data = {
      CIBIL_SCORE: score,
      CIBIL_REPORT_URL: reportUrl,
      PROPOSAL_ID: proposalId,
      CURRENT_STAGE_ID: currentStageId,
      NEXT_STAGE_ID: nextStageId,
      REMARKS: remark,
      IS_COMPLETED: isCompleted,
      USER_ID: this.userId
    };
    return this.httpClient.post<number>(this.url + "praposal/updateCibilInfo", JSON.stringify(data), this.options);
  }

  updateNextDocumentUploadStage(currentStageId: number, isCompleted, proposalId: number, remark: string): Observable<number> {
    var data = {
      STAGE_ID: currentStageId,
      IS_COMPLETED: isCompleted,
      PROPOSAL_ID: proposalId,
      USER_ID: this.userId,
      REMARKS: remark
    };
    return this.httpClient.post<number>(this.url + "praposal/changeStatus", JSON.stringify(data), this.options);
  }


  updateApplicantDocument(applicantDocument: Applicantdocument): Observable<number> {

    applicantDocument.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "applicantDocument/update/", JSON.stringify(applicantDocument), this.options);
  }

  getAllProposalDocuments(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<string[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<string[]>(this.url + "applicantDocument/get", JSON.stringify(data), this.options);
  }

  getAllNotification(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Notificationmaster[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Notificationmaster[]>(this.url + "notification/get", JSON.stringify(data), this.options);
  }

  createNotification(homePageBanner: Notificationmaster): Observable<number> {

    homePageBanner.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "notification/create/", JSON.stringify(homePageBanner), this.options);
  }

  updateeNotification(homePageBanner: Notificationmaster): Observable<number> {

    homePageBanner.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "notification/update/", JSON.stringify(homePageBanner), this.options);
  }


  addApplicantDocumentMapping(data1: string[], type: string, applicantId: number): Observable<number> {
    var data
    if (type == "B") {
      data = {
        DATA: data1,
        TYPE: type,
      };
    }
    else {
      data = {
        DATA: data1,
        TYPE: type,
        APPLICANT_ID: applicantId
      };
    }


    return this.httpClient.post<number>(this.url + "applicantDocument/addBulk", data, this.options);
  }

  getAllStatusLogs(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<string[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<string[]>(this.url + "praposalStageHistory/get", JSON.stringify(data), this.options);
  }


  getAllExtraInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Extrainformation[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Extrainformation[]>(this.url + "extraInformation/get", JSON.stringify(data), this.options);
  }

  createExtraInformation(extraInfo: Extrainformation): Observable<number> {

    extraInfo.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "extraInformation/create/", JSON.stringify(extraInfo), this.options);
  }

  updateeExtraInformation(extraInfo: Extrainformation): Observable<number> {

    extraInfo.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "extraInformation/update/", JSON.stringify(extraInfo), this.options);
  }


  getAllExtraInformationMapped(proposalId: number, type: string): Observable<string[]> {
    var data = {
      PRAPOSAL_ID: proposalId,
      TYPE: type,
    };
    return this.httpClient.post<string[]>(this.url + "applicantExtraInformation/getApplicantExtraInformation", JSON.stringify(data), this.options);
  }

  getAllMappedDocuments(proposalId: number, type: string, applicantId: number): Observable<string[]> {
    var data = {
      PROPOSAL_ID: proposalId,
      TYPE: type,
      APPLICANT_ID: applicantId
    };
    return this.httpClient.post<string[]>(this.url + "applicantDocument/getDocuments", JSON.stringify(data), this.options);
  }

  getAllPersonalInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Personalinformation[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Personalinformation[]>(this.url + "personalinfo/get", JSON.stringify(data), this.options);
  }

  getAllIncomeInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Incomeinformation[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Incomeinformation[]>(this.url + "incomeInformation/get", JSON.stringify(data), this.options);
  }

  getAllLoanInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Loaninformation[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Loaninformation[]>(this.url + "loanDemand/get", JSON.stringify(data), this.options);
  }



  getAllCreditInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Creditinformation[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Creditinformation[]>(this.url + "creditInformation/get", JSON.stringify(data), this.options);
  }


  getAddressInfo(proposalId: number, type: string, applicantId: number): Observable<number> {
    var data
    if (type == "B") {
      data = {
        PRAPOSAL_ID: proposalId,
        TYPE: type
      };
    }
    else {
      data = {
        PRAPOSAL_ID: proposalId,
        TYPE: type,
        APPLICANT_ID: applicantId
      };
    }

    return this.httpClient.post<number>(this.url + "personalInformation/getPersonalInfo", JSON.stringify(data), this.options);
    
  }

  getAllPropertyInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Propertyinformation[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Propertyinformation[]>(this.url + "propertyInformation/get", JSON.stringify(data), this.options);
  }

  createPropertyInformation(propertyInformation): Observable<number> {
    propertyInformation.IS_MORTGAGED_SUB = propertyInformation.IS_MORTGAGED_SUB ? 1 : 0
    propertyInformation.IS_MORTGAGED_FOR_SUB = propertyInformation.IS_MORTGAGED_FOR_SUB ? 1 : 0
    propertyInformation.IS_MORTGAGED = propertyInformation.IS_MORTGAGED ? 1 : 0
    // propertyInformation.IS_VALUATION_DONE = propertyInformation.IS_VALUATION_DONE ? 1 : 0
    propertyInformation.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "propertyInformation/create/", JSON.stringify(propertyInformation), this.options);
  }

  updatePropertyInformation(propertyInformation): Observable<number> {
    propertyInformation.IS_MORTGAGED_SUB = propertyInformation.IS_MORTGAGED_SUB ? 1 : 0
    propertyInformation.IS_MORTGAGED_FOR_SUB = propertyInformation.IS_MORTGAGED_FOR_SUB ? 1 : 0
    propertyInformation.IS_MORTGAGED = propertyInformation.IS_MORTGAGED ? 1 : 0
    // propertyInformation.IS_VALUATION_DONE = propertyInformation.IS_VALUATION_DONE ? 1 : 0
    propertyInformation.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "propertyInformation/update/", JSON.stringify(propertyInformation), this.options);
  }

  getAllSubPropertyInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<SubPropertyinfo[]> {
    var data1 = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<SubPropertyinfo[]>(this.url + "subPropertyInformation/get", JSON.stringify(data1), this.options);
  }

  createSubPropertyInformation(SubPropertyinfo): Observable<number> {
    SubPropertyinfo.IS_VALUATION_DONE = SubPropertyinfo.IS_VALUATION_DONE ? 1 : 0
    SubPropertyinfo.IS_RC_ENCLOSED = SubPropertyinfo.IS_RC_ENCLOSED ? 1 : 0

    SubPropertyinfo.COMBINED_UTARA =  SubPropertyinfo.COMBINED_UTARA ? 1 : 0
    SubPropertyinfo.CULTIVATION_DETAILS =  SubPropertyinfo.CULTIVATION_DETAILS ? 1 : 0
    SubPropertyinfo.VALUATION_1 = SubPropertyinfo.VALUATION_1 ? 1 : 0
    SubPropertyinfo.NO_DUES =  SubPropertyinfo.NO_DUES ? 1 : 0
    SubPropertyinfo.BOUNDARIES_1 = SubPropertyinfo.BOUNDARIES_1 ? 1 : 0
    SubPropertyinfo.SKETCH_1 =  SubPropertyinfo.SKETCH_1 ? 1 : 0
    SubPropertyinfo.ENCUMBRANCE_CERTIFICATE_1 =  SubPropertyinfo.ENCUMBRANCE_CERTIFICATE_1 ? 1 : 0

    SubPropertyinfo.HOME_UTARA = SubPropertyinfo.HOME_UTARA ? 1 : 0
    SubPropertyinfo.VALUATION_2 =  SubPropertyinfo.VALUATION_2 ? 1 : 0
    SubPropertyinfo.PHOTO =  SubPropertyinfo.PHOTO ? 1 : 0
    SubPropertyinfo.BOUNDARIES_2 = SubPropertyinfo.BOUNDARIES_2 ? 1 : 0
    SubPropertyinfo.SKETCH_2 = SubPropertyinfo.SKETCH_2 ? 1 : 0
    SubPropertyinfo.ENCUMBRANCE_CERTIFICATE_2 = SubPropertyinfo.ENCUMBRANCE_CERTIFICATE_2 ? 1 : 0
    SubPropertyinfo.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "subPropertyInformation/create/", JSON.stringify(SubPropertyinfo), this.options);
  }

  updateSubPropertyInformation(SubPropertyinfo): Observable<number> {
    SubPropertyinfo.IS_VALUATION_DONE = SubPropertyinfo.IS_VALUATION_DONE ? 1 : 0
    SubPropertyinfo.IS_RC_ENCLOSED = SubPropertyinfo.IS_RC_ENCLOSED ? 1 : 0

    SubPropertyinfo.COMBINED_UTARA =  SubPropertyinfo.COMBINED_UTARA ? 1 : 0
    SubPropertyinfo.CULTIVATION_DETAILS =  SubPropertyinfo.CULTIVATION_DETAILS ? 1 : 0
    SubPropertyinfo.VALUATION_1 = SubPropertyinfo.VALUATION_1 ? 1 : 0
    SubPropertyinfo.NO_DUES =  SubPropertyinfo.NO_DUES ? 1 : 0
    SubPropertyinfo.BOUNDARIES_1 = SubPropertyinfo.BOUNDARIES_1 ? 1 : 0
    SubPropertyinfo.SKETCH_1 =  SubPropertyinfo.SKETCH_1 ? 1 : 0
    SubPropertyinfo.ENCUMBRANCE_CERTIFICATE_1 =  SubPropertyinfo.ENCUMBRANCE_CERTIFICATE_1 ? 1 : 0

    SubPropertyinfo.HOME_UTARA = SubPropertyinfo.HOME_UTARA ? 1 : 0
    SubPropertyinfo.VALUATION_2 =  SubPropertyinfo.VALUATION_2 ? 1 : 0
    SubPropertyinfo.PHOTO =  SubPropertyinfo.PHOTO ? 1 : 0
    SubPropertyinfo.BOUNDARIES_2 = SubPropertyinfo.BOUNDARIES_2 ? 1 : 0
    SubPropertyinfo.SKETCH_2 = SubPropertyinfo.SKETCH_2 ? 1 : 0
    SubPropertyinfo.ENCUMBRANCE_CERTIFICATE_2 = SubPropertyinfo.ENCUMBRANCE_CERTIFICATE_2 ? 1 : 0
    SubPropertyinfo.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "subPropertyInformation/update/", JSON.stringify(SubPropertyinfo), this.options);
  }

  getAllFinancialInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Financialinformation[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Financialinformation[]>(this.url + "financialInformation/get", JSON.stringify(data), this.options);
  }

  getFinancialInformation(proposalId: number, type: string, applicantId: number): Observable<Financialinformation[]> {
    var data
    if (type == "B") {
      data = {
        PROPOSAL_ID: proposalId,
        TYPE: type,
      };
    }
    else {
      data = {
        PROPOSAL_ID: proposalId,
        TYPE: type,
        APPLICANT_ID: applicantId
      };
    }
    //console.log("data")
    //console.log(data)
    return this.httpClient.post<Financialinformation[]>(this.url + "financialInformation/getFinancialInfo", JSON.stringify(data), this.options);
  }


  createFinancialInformation(financialInformation): Observable<number> {
    financialInformation.IS_INCOME_TAX_FILED = financialInformation.IS_INCOME_TAX_FILED ? 1 : 0
    financialInformation.IS_PIGMY = financialInformation.IS_PIGMY ? 1 : 0
    financialInformation.CLIENT_ID = this.clientId;
    //console.log(financialInformation)

    return this.httpClient.post<number>(this.url + "financialInformation/create/", JSON.stringify(financialInformation), this.options);
  }

  updateFinancialInformation(financialInformation): Observable<number> {
    financialInformation.IS_INCOME_TAX_FILED = financialInformation.IS_INCOME_TAX_FILED ? 1 : 0
    financialInformation.IS_PAY_SALES_TAX_FILED = financialInformation.IS_PAY_SALES_TAX_FILED ? 1 : 0
    financialInformation.IS_PIGMY = financialInformation.IS_PIGMY ? 1 : 0
    financialInformation.CLIENT_ID = this.clientId;
    //console.log(financialInformation)
    return this.httpClient.post<number>(this.url + "financialInformation/updateFinancialInfo", JSON.stringify(financialInformation), this.options);
  }


  getAllPrimeSecurityInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Primesecurityinfo[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Primesecurityinfo[]>(this.url + "primeSecurityInformation/get", JSON.stringify(data), this.options);
  }

  getAllPropertySecurityInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Propertyinformation[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Propertyinformation[]>(this.url + "propertySecurityInformation/get", JSON.stringify(data), this.options);
  }








  getAllIncomeSocurce(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<IncomeSource[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<IncomeSource[]>(this.url + "incomeSource/get", JSON.stringify(data), this.options);
  }

  createIncomeSource(incomeSource: IncomeSource): Observable<number> {

    incomeSource.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "incomeSource/create/", JSON.stringify(incomeSource), this.options);
  }

  updateIncomeSource(incomeSource: IncomeSource): Observable<number> {

    incomeSource.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "incomeSource/update/", JSON.stringify(incomeSource), this.options);
  }

  getAllInstallmentFrequency(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<InstallmentFrequency[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<InstallmentFrequency[]>(this.url + "installmentFrequency/get", JSON.stringify(data), this.options);
  }

  createInstallmentFrequency(financialInformation: InstallmentFrequency): Observable<number> {

    financialInformation.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "installmentFrequency/create/", JSON.stringify(financialInformation), this.options);
  }

  updateInstallmentFrequency(financialInformation: InstallmentFrequency): Observable<number> {

    financialInformation.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "installmentFrequency/update", JSON.stringify(financialInformation), this.options);
  }

  getallpurposeofloan(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<InstallmentFrequency[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<InstallmentFrequency[]>(this.url + "installmentFrequency/get", JSON.stringify(data), this.options);
  }

  createallpurposeofloan(financialInformation: InstallmentFrequency): Observable<number> {

    financialInformation.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "installmentFrequency/create/", JSON.stringify(financialInformation), this.options);
  }

  updateallpurposeofloan(financialInformation: InstallmentFrequency): Observable<number> {

    financialInformation.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "installmentFrequency/update", JSON.stringify(financialInformation), this.options);
  }

  getAllDeductionDetailsMaster(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<DeductionDetailsMaster[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<DeductionDetailsMaster[]>(this.url + "deductiondetails/get", JSON.stringify(data), this.options);
  }

  createDeductionDetailsMaster(deductionDetailsMaster: DeductionDetailsMaster): Observable<number> {

    deductionDetailsMaster.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "deductiondetails/create/", JSON.stringify(deductionDetailsMaster), this.options);
  }

  updateDeductionDetailsMaster(deductionDetailsMaster: DeductionDetailsMaster): Observable<number> {

    deductionDetailsMaster.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "deductiondetails/update/", JSON.stringify(deductionDetailsMaster), this.options);
  }

  addApplicantExtraInformation(proposalId: number, type: string, data1: string[]): Observable<number> {
    var data = {
      PRAPOSAL_ID: proposalId,
      TYPE: type,
      data: data1,
      USER_ID: this.userId
    };
    //console.log(data)
    return this.httpClient.post<number>(this.url + "applicantExtraInformation/addExtraInformation", data, this.options);
  }

  updateStatus24( currentStageId: number, nextStageId: number, remark: string, proposalId: number, isCompleted,loanofficerid:number): Observable<number> {
    var data = {
   
      CURRENT_STAGE_ID: currentStageId,
      NEXT_STAGE_ID: nextStageId,
      REMARKS: remark,
      USER_ID: this.userId,
      PROPOSAL_ID: proposalId,
      IS_COMPLETED: isCompleted,
      LOAN_OFFICER_ID:loanofficerid

      

    };
    return this.httpClient.post<number>(this.url + "praposal/updateStatus", JSON.stringify(data), this.options);
  }
  updateStatus( currentStageId: number, nextStageId: number, remark: string, proposalId: number, isCompleted): Observable<number> {
    var data = {
   
      CURRENT_STAGE_ID: currentStageId,
      NEXT_STAGE_ID: nextStageId,
      REMARKS: remark,
      USER_ID: this.userId,
      PROPOSAL_ID: proposalId,
      IS_COMPLETED: isCompleted,


    };
    return this.httpClient.post<number>(this.url + "praposal/updateStatus", JSON.stringify(data), this.options);
  }
  updateStatus3(is_check_obtaied,is_identy_card_obtaied,BRANCH_OPINION_TEXT,DOCUMENT_TEXT,currentStageId: number, nextStageId: number, remark: string, proposalId: number,isCompleted): Observable<number> {
    var data = {
      IS_CHECK_OBTAINED:is_check_obtaied ? 1 : 0,
      IS_IDENTITY_CARD_OBTAINED:is_identy_card_obtaied ? 1 : 0,
      BRANCH_OPINION_TEXT:BRANCH_OPINION_TEXT,
      DOCUMENT_TEXT:DOCUMENT_TEXT,
      CURRENT_STAGE_ID: currentStageId,
      NEXT_STAGE_ID: nextStageId,
      REMARKS: remark,
      USER_ID: this.userId,
      PROPOSAL_ID: proposalId,
      IS_COMPLETED: isCompleted
     
    };
    return this.httpClient.post<number>(this.url + "praposal/updateStatus", JSON.stringify(data), this.options);
  }
  updateStatus2(currentStageId: number, nextStageId: number, remark: string, proposalId: number, isCompleted,PROPOSAL_REPORT): Observable<number> {
    var data = {
      CURRENT_STAGE_ID: currentStageId,
      NEXT_STAGE_ID: nextStageId,
      REMARKS: remark,
      USER_ID: this.userId,
      PROPOSAL_ID: proposalId,
      PROPOSAL_REPORT: PROPOSAL_REPORT,
      IS_COMPLETED: isCompleted,
    };
    return this.httpClient.post<number>(this.url + "praposal/updateStatus", JSON.stringify(data), this.options);
  }
  getAllSalariedInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<IncomeSource[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<IncomeSource[]>(this.url + "salariedInformation/get", JSON.stringify(data), this.options);
  }

  getAllBusinessInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<IncomeSource[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<IncomeSource[]>(this.url + "businessFirmInformation/get", JSON.stringify(data), this.options);
  }


  getAllAgricultureInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<AgriIncomeInfo[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<AgriIncomeInfo[]>(this.url + "agricultureLandInformation/get", JSON.stringify(data), this.options);
  }

  getAllAddressInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<IncomeSource[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<IncomeSource[]>(this.url + "addressInformation/get", JSON.stringify(data), this.options);
  }

  updatePersonalInformation(data1: Personalinformation): Observable<number> {
    data1.CLIENT_ID = this.clientId
    if (data1.CURRENT_ADDRESS_ID == 0) {
      data1.CURRENT_ADDRESS[0]['CLIENT_ID'] = 1
    }
    if (data1.PERMANENT_ADDRESS_ID == 0) {
      data1.PERMANENT_ADDRESS[0]['CLIENT_ID'] = 1
    }
    return this.httpClient.post<number>(this.url + "personalInformation/updatePersonalInfo", JSON.stringify(data1), this.options);
  }

  // updateIncomeInformation(incomeSource,otherincomeSource,proposalId:number): Observable<number> {
  //   var data = {
  //     INCOME_SOURCE:incomeSource,
  //     OTHER_INCOME_SOURCE:otherincomeSource,
  //     PROPOSAL_ID:proposalId
  //   };
  //   return this.httpClient.post<number>(this.url + "applicantExtraInformation/addExtraInformation", data, this.options);
  // }

  updateLoanDemand(loanInfo: Loaninformation): Observable<number> {
    loanInfo.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "loanDemand/update/", JSON.stringify(loanInfo), this.options);
  }

  getAllLoanTakenInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<BankLoan[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<BankLoan[]>(this.url + "loanTakenInformation/get", JSON.stringify(data), this.options);
  }

  createLoanTakenInformation(loanTakenInformation: BankLoan): Observable<number> {

    loanTakenInformation.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "loanTakenInformation/create/", JSON.stringify(loanTakenInformation), this.options);
  }

  updateLoanTakenInformation(loanTakenInformation: BankLoan): Observable<number> {

    loanTakenInformation.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "loanTakenInformation/update/", JSON.stringify(loanTakenInformation), this.options);
  }


  getAllJoints(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<JointAccount[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<JointAccount[]>(this.url + "jointAccountInformation/get", JSON.stringify(data), this.options);
  }

  createjoints(joint: JointAccount): Observable<number> {

    joint.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "jointAccountInformation/create/", JSON.stringify(joint), this.options);
  }

  updatejoints(joint: JointAccount): Observable<number> {

    joint.CLIENT_ID = this.clientId;


    return this.httpClient.put<number>(this.url + "jointAccountInformation/update/", JSON.stringify(joint), this.options);
  }

  getAllExpenditureInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<ExpenditureInfo[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<ExpenditureInfo[]>(this.url + "expenditureInformation/get", JSON.stringify(data), this.options);
  }

  createExpenditureInformation(loanTakenInformation: ExpenditureInfo): Observable<number> {

    loanTakenInformation.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "expenditureInformation/create/", JSON.stringify(loanTakenInformation), this.options);
  }

  updateExpenditureInformation(loanTakenInformation: ExpenditureInfo): Observable<number> {

    loanTakenInformation.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "expenditureInformation/update/", JSON.stringify(loanTakenInformation), this.options);
  }


  getAllHouseRentInfo(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<HouseShopRentInfo[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<HouseShopRentInfo[]>(this.url + "houseShopRentInformation/get", JSON.stringify(data), this.options);
  }

  createHouseRentInfo(loanTakenInformation: HouseShopRentInfo): Observable<number> {

    loanTakenInformation.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "houseShopRentInformation/create/", JSON.stringify(loanTakenInformation), this.options);
  }

  updateHouseRentInfo(loanTakenInformation: HouseShopRentInfo): Observable<number> {

    loanTakenInformation.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "houseShopRentInformation/update/", JSON.stringify(loanTakenInformation), this.options);
  }


  getAllGuarantorForLoans(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<GuarantorForLoans[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<GuarantorForLoans[]>(this.url + "guarantorForLoans/get", JSON.stringify(data), this.options);
  }

  createGuarantorForLoans(guarantorForLoans: GuarantorForLoans): Observable<number> {

    guarantorForLoans.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "guarantorForLoans/create/", JSON.stringify(guarantorForLoans), this.options);
  }

  updateGuarantorForLoans(guarantorForLoans: GuarantorForLoans): Observable<number> {

    guarantorForLoans.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "guarantorForLoans/update/", JSON.stringify(guarantorForLoans), this.options);
  }

  
  getAllDepositsInBank(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<DepositeInBank[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<DepositeInBank[]>(this.url + "depositsInBank/get", JSON.stringify(data), this.options);
  }

  createDepositsInBank(depositsInBank: DepositeInBank): Observable<number> {

    depositsInBank.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "depositsInBank/create/", JSON.stringify(depositsInBank), this.options);
  }

  updateDepositsInBank(depositsInBank: DepositeInBank): Observable<number> {

    depositsInBank.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "depositsInBank/update/", JSON.stringify(depositsInBank), this.options);
  }

  getAllEarlierLoanHistory(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<EarlierLoanInfo[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<EarlierLoanInfo[]>(this.url + "earlierLoanHistory/get", JSON.stringify(data), this.options);
  }

  createEarlierLoanHistory(earlierLoanHistory: EarlierLoanInfo): Observable<number> {

    earlierLoanHistory.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "earlierLoanHistory/create/", JSON.stringify(earlierLoanHistory), this.options);
  }

  updateEarlierLoanHistory(earlierLoanHistory: EarlierLoanInfo): Observable<number> {

    earlierLoanHistory.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "earlierLoanHistory/update/", JSON.stringify(earlierLoanHistory), this.options);
  }

  updateCreaditInfo(creditInfo): Observable<number> {
    creditInfo.IS_EXISTING_LOAN_WITH_SUB = creditInfo.IS_EXISTING_LOAN_WITH_SUB ? 1 : 0
    creditInfo.IS_EXISTING_LOAN_WITH_OTHER_BANKS = creditInfo.IS_EXISTING_LOAN_WITH_OTHER_BANKS ? 1 : 0
    creditInfo.IS_GUARANTOR_TO_LOAN_WITH_SUB = creditInfo.IS_GUARANTOR_TO_LOAN_WITH_SUB ? 1 : 0
    creditInfo.IS_GUARANTOR_TO_LOAN_WITH_OTHER_BANK = creditInfo.IS_GUARANTOR_TO_LOAN_WITH_OTHER_BANK ? 1 : 0
    creditInfo.IS_EARLIAR_LOAN_HISTORY = creditInfo.IS_EARLIAR_LOAN_HISTORY ? 1 : 0
    creditInfo.IS_ANY_DEPOSITES_WITH_SUB = creditInfo.IS_ANY_DEPOSITES_WITH_SUB ? 1 : 0
    creditInfo.IS_LOAN_TAKEN_FOR_CLOSE_OTHER_LOANS = creditInfo.IS_LOAN_TAKEN_FOR_CLOSE_OTHER_LOANS ? 1 : 0
    creditInfo.IS_EARLIAR_LOAN_HISTORY_WITH_OTHER_BANK = creditInfo.IS_EARLIAR_LOAN_HISTORY_WITH_OTHER_BANK ? 1 : 0
    creditInfo.IS_ANY_DEPOSITES_WITH_OTHER_BANK = creditInfo.IS_ANY_DEPOSITES_WITH_OTHER_BANK ? 1 : 0
    creditInfo.IS_NOC_OBTAINED_AND_ENCLOSED = creditInfo.IS_NOC_OBTAINED_AND_ENCLOSED ? 1 : 0
    creditInfo.CLIENT_ID = this.clientId;
    //console.log(creditInfo)
    return this.httpClient.put<number>(this.url + "creditInformation/update/", JSON.stringify(creditInfo), this.options);
  }

  updateFillAmount(currentStageId: number, proposalInfo: string, processingFee: number, proposalId: number, kycdocuments, incomeDocuments, purposedocuments, type: string): Observable<number> {
    var data = {
      KYC: kycdocuments,
      OTHER: incomeDocuments,
      PURPOSE: [],
      PROPOSAL_ID: proposalId,
      DETAILS: proposalInfo,
      AMOUNT: processingFee,
      USER_ID: this.userId,
      CURRENT_STAGE_ID: currentStageId,
      TYPE: type
    };
    return this.httpClient.post<number>(this.url + "praposal/updateProcessingInfo", JSON.stringify(data), this.options);
  }
  updateFillAmount2(currentStageId: number, proposalInfo: string, processingFee: number, proposalId: number, type: string, remark: string): Observable<number> {
    var data = {

      PROPOSAL_ID: proposalId,
      DETAILS: proposalInfo,
      AMOUNT: processingFee,
      USER_ID: this.userId,
      CURRENT_STAGE_ID: currentStageId,
      TYPE: type,
      REMARKS: remark
    };
    return this.httpClient.post<number>(this.url + "praposal/updateProcessingInfo", JSON.stringify(data), this.options);
  }

  mappDocument(proposalId: number, kycdocuments, incomeDocuments, purposedocuments, type: string, applicantId: number): Observable<number> {
    var data = {
      KYC: kycdocuments,
      OTHER: incomeDocuments,
      PURPOSE: [],
      PROPOSAL_ID: proposalId,
      TYPE: type,
      APPLICANT_ID: applicantId,
      USER_ID: this.userId
    };
    return this.httpClient.post<number>(this.url + "applicantDocument/updateDocument", JSON.stringify(data), this.options);
  }

  passToMainBranch(ProposalId: number, currentStageId: number, nextStageId: number, remark: string, userId: number, proposalFile: string, proposalReport: string): Observable<number> {
    var data = {
      CURRENT_STAGE_ID: currentStageId,
      NEXT_STAGE_ID: nextStageId,
      IS_COMPLETED: 1,
      REMARKS: remark,
      USER_ID: userId,
      PROPOSAL_FILE: proposalFile,
      PROPOSAL_REPORT: proposalReport,
      PROPOSAL_ID: ProposalId,

    };
    return this.httpClient.post<number>(this.url + "praposal/updateProposalInfo", JSON.stringify(data), this.options);
  }
  passToMainBranch2(SIGNATURE, COMMITTEE_NO, AMOUNT_IN_WORDS, TERM_OF_LOAN, TYPE_OF_INSTALLMENT, EMI_AMOUNT, RESOLUTION_NO, RATE_OF_INTEREST, SANCTION_DATE, SANCTION_AMOUNT, ProposalId: number, currentStageId: number, nextStageId: number, remark: string, userId: number, proposalFile: string, SANCTION_NOTE: string, MOROTORIUM: number,LOAN_RELEASE_DATE,DISBURSED_AMOUNT,LOAN_AMOUNT_IN_WORDS,LOAN_AMOUNT_IN_WORDSS,INSTALLMENT_COUNT,HAND_WRITTEN_AMT_IN_WORDS2,WRITTEN_TOTALAMT_WORDS): Observable<number> {
    var data = {
      CURRENT_STAGE_ID: currentStageId,
      NEXT_STAGE_ID: nextStageId,
      IS_COMPLETED: 1,
      REMARKS: remark,
      USER_ID: userId,
      PROPOSAL_FILE: proposalFile,
      SANCTION_NOTE: SANCTION_NOTE,
      PROPOSAL_ID: ProposalId,
      SANCTION_AMOUNT: SANCTION_AMOUNT,
      RATE_OF_INTEREST: RATE_OF_INTEREST,
      SANCTION_DATE: SANCTION_DATE,
      RESOLUTION_NO: RESOLUTION_NO,
      COMMITTEE_NO: COMMITTEE_NO,
      AMOUNT_IN_WORDS: AMOUNT_IN_WORDS,
      TERM_OF_LOAN: TERM_OF_LOAN,
      TYPE_OF_INSTALLMENT: TYPE_OF_INSTALLMENT,
      EMI_AMOUNT: EMI_AMOUNT,
      MOROTORIUM: MOROTORIUM,
      SIGNATURE: SIGNATURE,
      LOAN_RELEASE_DATE : LOAN_RELEASE_DATE,
      LOAN_OFFICER_ID : userId,
      DISBURSED_AMOUNT : DISBURSED_AMOUNT,
      LOAN_AMOUNT_IN_WORDS: LOAN_AMOUNT_IN_WORDS,
     LOAN_AMOUNT_IN_WORDSS: LOAN_AMOUNT_IN_WORDSS,
     INSTALLMENT_COUNT: INSTALLMENT_COUNT,
     HAND_WRITTEN_AMT_IN_WORDS2: HAND_WRITTEN_AMT_IN_WORDS2,
     WRITTEN_TOTALAMT_WORDS: WRITTEN_TOTALAMT_WORDS
    };
    return this.httpClient.post<number>(this.url + "praposal/updateProposalInfo", JSON.stringify(data), this.options);
  }
  
  proposalLogInformation(ProposalId: number, currentStageId: number, nextStageId: number, LOG_ACTION: string, userId: number, DESCRIPTION: string, LOG_TYPE: string): Observable<number> {
    var data = {
      OLD_STAGE_ID: currentStageId,
      NEW_STAGE_ID: nextStageId,
      LOG_ACTION: LOG_ACTION,
      USER_ID: userId,
      PROPOSAL_ID: ProposalId,
      CLIENT_ID: this.clientId,
      DESCRIPTION: DESCRIPTION,
      LOG_TYPE: LOG_TYPE
    };
    return this.httpClient.post<number>(this.url + "proposalLogInformation/create", JSON.stringify(data), this.options);
  }

  createAddressInformation(address: Addressinfo): Observable<number> {
    address.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "addressInformation/create/", JSON.stringify(address), this.options);
  }
  updateAddressInformation(addressInformation: Addressinfo): Observable<number> {

    addressInformation.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "addressInformation/update/", JSON.stringify(addressInformation), this.options);
  }

  addPropertySecurityDetails(data1: string[], proposalId: number): Observable<number> {
    var data = {
      data: data1,
      PROPOSAL_ID: proposalId
    };
    return this.httpClient.post<number>(this.url + "propertySecurityInformation/addBulk", data, this.options);
  }

  createPrimeSecurityInformation(primeSecurityInformation: Primesecurityinfo): Observable<number> {

    primeSecurityInformation.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "primeSecurityInformation/create/", JSON.stringify(primeSecurityInformation), this.options);
  }

  updatePrimeSecurityInformation(primeSecurityInformation: Primesecurityinfo): Observable<number> {

    primeSecurityInformation.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "primeSecurityInformation/update/", JSON.stringify(primeSecurityInformation), this.options);
  }

  createApplicantDocument(applicantDocument: Applicantdocument): Observable<number> {

    applicantDocument.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "applicantDocument/create/", JSON.stringify(applicantDocument), this.options);
  }

  createSalariedInformation(salariedInformation): Observable<number> {
    salariedInformation.IS_LETTER_FOR_LOAN_DEDUCTION = salariedInformation.IS_LETTER_FOR_LOAN_DEDUCTION ? 1 : 0
    salariedInformation.IS_PROVIDENT_FUND_DEDUCTED = salariedInformation.IS_PROVIDENT_FUND_DEDUCTED ? 1 : 0
    salariedInformation.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "salariedInformation/create/", JSON.stringify(salariedInformation), this.options);
  }

  updateSalariedInformation(salariedInformation): Observable<number> {
    salariedInformation.IS_LETTER_FOR_LOAN_DEDUCTION = salariedInformation.IS_LETTER_FOR_LOAN_DEDUCTION ? 1 : 0
    salariedInformation.IS_PROVIDENT_FUND_DEDUCTED = salariedInformation.IS_PROVIDENT_FUND_DEDUCTED ? 1 : 0
    salariedInformation.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "salariedInformation/update/", JSON.stringify(salariedInformation), this.options);
  }

  updateIncomeInformation(incomeInformation: Incomeinformation): Observable<number> {
    incomeInformation.IS_SAVED = true
    incomeInformation.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "incomeInformation/update/", JSON.stringify(incomeInformation), this.options);
  }

  createAgricultureLandInformation(agricultureLandInformation:AgriIncomeInfo): Observable<number> {
    agricultureLandInformation.IS_NAME_APPEAR_IN_7_12 = agricultureLandInformation.IS_NAME_APPEAR_IN_7_12 ? 1 : 0
    agricultureLandInformation.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "agricultureLandInformation/create/", JSON.stringify(agricultureLandInformation), this.options);
  }

  updateAgricultureLandInformation(agricultureLandInformation:AgriIncomeInfo): Observable<number> {
    agricultureLandInformation.IS_NAME_APPEAR_IN_7_12 = agricultureLandInformation.IS_NAME_APPEAR_IN_7_12 ? 1 : 0
    agricultureLandInformation.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "agricultureLandInformation/update/", JSON.stringify(agricultureLandInformation), this.options);
  }
  createBusinessFirmInformation(businessFirmInformation): Observable<number> {
    businessFirmInformation.IS_MSME_REGISTERED = businessFirmInformation.IS_MSME_REGISTERED ? 1 : 0
    businessFirmInformation.IS_CERTIFICATE_FROM_PROFESSIONAL_TAX_AUTHORITY = businessFirmInformation.IS_CERTIFICATE_FROM_PROFESSIONAL_TAX_AUTHORITY ? 1 : 0
    businessFirmInformation.IS_GST_REGISTARTION_CERTIFICATE = businessFirmInformation.IS_GST_REGISTARTION_CERTIFICATE ? 1 : 0
    businessFirmInformation.IS_SHOP_ACT_LICENSE = businessFirmInformation.IS_SHOP_ACT_LICENSE ? 1 : 0
    businessFirmInformation.IS_RENT_AGREEMENT_DONE = businessFirmInformation.IS_RENT_AGREEMENT_DONE ? 1 : 0
    businessFirmInformation.IS_OTHER_LICENSE = businessFirmInformation.IS_OTHER_LICENSE ? 1 : 0
    businessFirmInformation.IS_SHOP_ACT_LICENSE_RENEWAL_FOR_CURRENT_YEAR = businessFirmInformation.IS_SHOP_ACT_LICENSE_RENEWAL_FOR_CURRENT_YEAR ? 1 : 0
    businessFirmInformation.CLIENT_ID = this.clientId;
    //console.log(businessFirmInformation)
    return this.httpClient.post<number>(this.url + "businessFirmInformation/create/", JSON.stringify(businessFirmInformation), this.options);
  }

  updateBusinessFirmInformation(businessFirmInformation): Observable<number> {

    businessFirmInformation.IS_MSME_REGISTERED = businessFirmInformation.IS_MSME_REGISTERED ? 1 : 0
    businessFirmInformation.IS_CERTIFICATE_FROM_PROFESSIONAL_TAX_AUTHORITY = businessFirmInformation.IS_CERTIFICATE_FROM_PROFESSIONAL_TAX_AUTHORITY ? 1 : 0
    businessFirmInformation.IS_GST_REGISTARTION_CERTIFICATE = businessFirmInformation.IS_GST_REGISTARTION_CERTIFICATE ? 1 : 0
    businessFirmInformation.IS_SHOP_ACT_LICENSE = businessFirmInformation.IS_SHOP_ACT_LICENSE ? 1 : 0
    businessFirmInformation.IS_RENT_AGREEMENT_DONE = businessFirmInformation.IS_RENT_AGREEMENT_DONE ? 1 : 0
    businessFirmInformation.IS_OTHER_LICENSE = businessFirmInformation.IS_OTHER_LICENSE ? 1 : 0
    businessFirmInformation.IS_SHOP_ACT_LICENSE_RENEWAL_FOR_CURRENT_YEAR = businessFirmInformation.IS_SHOP_ACT_LICENSE_RENEWAL_FOR_CURRENT_YEAR ? 1 : 0
    businessFirmInformation.CLIENT_ID = this.clientId;

    return this.httpClient.put<number>(this.url + "businessFirmInformation/update/", JSON.stringify(businessFirmInformation), this.options);
  }


  AddBusinessFirmInformation(businessFirmInformation, proposalId: number): Observable<number> {
    businessFirmInformation.IS_MSME_REGISTERED = businessFirmInformation.IS_MSME_REGISTERED ? 1 : 0
    businessFirmInformation.IS_CERTIFICATE_FROM_PROFESSIONAL_TAX_AUTHORITY = businessFirmInformation.IS_CERTIFICATE_FROM_PROFESSIONAL_TAX_AUTHORITY ? 1 : 0
    businessFirmInformation.IS_GST_REGISTARTION_CERTIFICATE = businessFirmInformation.IS_GST_REGISTARTION_CERTIFICATE ? 1 : 0
    businessFirmInformation.IS_SHOP_ACT_LICENSE = businessFirmInformation.IS_SHOP_ACT_LICENSE ? 1 : 0
    businessFirmInformation.IS_RENT_AGREEMENT_DONE = businessFirmInformation.IS_RENT_AGREEMENT_DONE ? 1 : 0
    businessFirmInformation.IS_OTHER_LICENSE = businessFirmInformation.IS_OTHER_LICENSE ? 1 : 0
    businessFirmInformation.CLIENT_ID = this.clientId;
    businessFirmInformation.IS_INVOLVE_IN_MANUFACTURING_PROCESS = businessFirmInformation.IS_INVOLVE_IN_MANUFACTURING_PROCESS ? 1 : 0
    businessFirmInformation.IS_SHOP_ACT_LICENSE_RENEWAL_FOR_CURRENT_YEAR = businessFirmInformation.IS_SHOP_ACT_LICENSE_RENEWAL_FOR_CURRENT_YEAR ? 1 : 0
    businessFirmInformation.PROPOSAL_ID = proposalId
    //console.log(businessFirmInformation)
    return this.httpClient.post<number>(this.url + "businessFirmInformation/addBusinessInfo/", JSON.stringify(businessFirmInformation), this.options);
  }


  getAllApplicantExtraInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Extraapplicantinfo[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Extraapplicantinfo[]>(this.url + "applicantExtraInformation/get", JSON.stringify(data), this.options);
  }

  updateApplicantExtraInformation(applicantExtraInformation:Extraapplicantinfo): Observable<number> {
    applicantExtraInformation.IS_PROVIDED = applicantExtraInformation.IS_PROVIDED ? 1 : 0
    applicantExtraInformation.IS_APPROVED = applicantExtraInformation.IS_APPROVED ? 1 : 0
    applicantExtraInformation.IS_VERIFIED = applicantExtraInformation.IS_VERIFIED ? 1 : 0
    applicantExtraInformation.CLIENT_ID = this.clientId;
    //console.log(applicantExtraInformation)
    return this.httpClient.put<number>(this.url + "applicantExtraInformation/update/", JSON.stringify(applicantExtraInformation), this.options);
  }
  getAllFirmInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<FirmDetails[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<FirmDetails[]>(this.url + "firmInformation/get", JSON.stringify(data), this.options);
  }

  createFirmInformation(firmInformation): Observable<number> {
    firmInformation.IS_MSME_REGISTERED = firmInformation.IS_MSME_REGISTERED ? 1 : 0
    firmInformation.IS_ANOTHER_BRANCH = firmInformation.IS_ANOTHER_BRANCH ? 1 : 0
    firmInformation.IS_SHOP_ACT_LICENSE = firmInformation.IS_SHOP_ACT_LICENSE ? 1 : 0
    firmInformation.IS_SHOP_ACT_LICENSE_RENEWAL_FOR_CURRENT_YEAR = firmInformation.IS_SHOP_ACT_LICENSE_RENEWAL_FOR_CURRENT_YEAR ? 1 : 0
    firmInformation.IS_GST_REGISTARTION_CERTIFICATE = firmInformation.IS_GST_REGISTARTION_CERTIFICATE ? 1 : 0
    firmInformation.IS_CERTIFICATE_FROM_PROFESSIONAL_TAX_AUTHORITY = firmInformation.IS_CERTIFICATE_FROM_PROFESSIONAL_TAX_AUTHORITY ? 1 : 0
    firmInformation.IS_OTHER_LICENSE = firmInformation.IS_OTHER_LICENSE ? 1 : 0
    firmInformation.IS_SISTER_OR_ASSOCIATE_CONSERN = firmInformation.IS_SISTER_OR_ASSOCIATE_CONSERN ? 1 : 0
    firmInformation.IS_ANY_CHANGE_IN_CONSTITUENTS = firmInformation.IS_ANY_CHANGE_IN_CONSTITUENTS ? 1 : 0
    firmInformation.IS_PARTNERS = firmInformation.IS_PARTNERS ? 1 : 0
    firmInformation.IS_RENT_AGREEMENT_DONE = firmInformation.IS_RENT_AGREEMENT_DONE ? 1 : 0
    firmInformation.IS_INVOLVE_IN_MANUFACTURING_PROCESS = firmInformation.IS_INVOLVE_IN_MANUFACTURING_PROCESS ? 1 : 0

    firmInformation.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "firmInformation/create/", JSON.stringify(firmInformation), this.options);
  }

  updateFirmInformation(firmInformation): Observable<number> {
    firmInformation.IS_MSME_REGISTERED = firmInformation.IS_MSME_REGISTERED ? 1 : 0
    firmInformation.IS_ANOTHER_BRANCH = firmInformation.IS_ANOTHER_BRANCH ? 1 : 0
    firmInformation.IS_SHOP_ACT_LICENSE = firmInformation.IS_SHOP_ACT_LICENSE ? 1 : 0
    firmInformation.IS_SHOP_ACT_LICENSE_RENEWAL_FOR_CURRENT_YEAR = firmInformation.IS_SHOP_ACT_LICENSE_RENEWAL_FOR_CURRENT_YEAR ? 1 : 0
    firmInformation.IS_GST_REGISTARTION_CERTIFICATE = firmInformation.IS_GST_REGISTARTION_CERTIFICATE ? 1 : 0
    firmInformation.IS_CERTIFICATE_FROM_PROFESSIONAL_TAX_AUTHORITY = firmInformation.IS_CERTIFICATE_FROM_PROFESSIONAL_TAX_AUTHORITY ? 1 : 0
    firmInformation.IS_OTHER_LICENSE = firmInformation.IS_OTHER_LICENSE ? 1 : 0
    firmInformation.IS_SISTER_OR_ASSOCIATE_CONSERN = firmInformation.IS_SISTER_OR_ASSOCIATE_CONSERN ? 1 : 0
    firmInformation.IS_ANY_CHANGE_IN_CONSTITUENTS = firmInformation.IS_ANY_CHANGE_IN_CONSTITUENTS ? 1 : 0
    firmInformation.IS_PARTNERS = firmInformation.IS_PARTNERS ? 1 : 0
    firmInformation.IS_RENT_AGREEMENT_DONE = firmInformation.IS_RENT_AGREEMENT_DONE ? 1 : 0
    firmInformation.IS_INVOLVE_IN_MANUFACTURING_PROCESS = firmInformation.IS_INVOLVE_IN_MANUFACTURING_PROCESS ? 1 : 0

    firmInformation.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "firmInformation/update/", JSON.stringify(firmInformation), this.options);
  }
  getAllManufacturingInfromation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<ManufacturingInfo[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<ManufacturingInfo[]>(this.url + "manufacturingInformation/get", JSON.stringify(data), this.options);
  }

  createManufacturingInfromation(manufacturingInfromation): Observable<number> {
    manufacturingInfromation.IS_ANCILILLARY_PRODUCT = manufacturingInfromation.IS_ANCILILLARY_PRODUCT ? 1 : 0
    manufacturingInfromation.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "manufacturingInformation/create/", JSON.stringify(manufacturingInfromation), this.options);
  }

  updateManufacturingInfromation(manufacturingInfromation): Observable<number> {
    manufacturingInfromation.IS_ANCILILLARY_PRODUCT = manufacturingInfromation.IS_ANCILILLARY_PRODUCT ? 1 : 0
    manufacturingInfromation.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "manufacturingInformation/update/", JSON.stringify(manufacturingInfromation), this.options);
  }

  getAllSisterOrAssociateConcern(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<SisterConcern[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<SisterConcern[]>(this.url + "sisterOrAssociateConcern/get", JSON.stringify(data), this.options);
  }

  createSisterOrAssociateConcern(sisterOrAssociateConcern: SisterConcern): Observable<number> {

    sisterOrAssociateConcern.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "sisterOrAssociateConcern/create/", JSON.stringify(sisterOrAssociateConcern), this.options);
  }

  updateSisterOrAssociateConcern(sisterOrAssociateConcern: SisterConcern): Observable<number> {

    sisterOrAssociateConcern.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "sisterOrAssociateConcern/update/", JSON.stringify(sisterOrAssociateConcern), this.options);
  }
  getAllPartnersInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<PartnersInfo[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<PartnersInfo[]>(this.url + "partnersInformation/get", JSON.stringify(data), this.options);
  }

  createPartnersInformation(partnersInformation): Observable<number> {
    partnersInformation.IS_AUTHORISED_TO_TRANSACT = partnersInformation.IS_AUTHORISED_TO_TRANSACT ? 1 : 0
    partnersInformation.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "partnersInformation/create/", JSON.stringify(partnersInformation), this.options);
  }

  updatePartnersInformation(partnersInformation): Observable<number> {
    partnersInformation.IS_AUTHORISED_TO_TRANSACT = partnersInformation.IS_AUTHORISED_TO_TRANSACT ? 1 : 0
    partnersInformation.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "partnersInformation/update/", JSON.stringify(partnersInformation), this.options);
  }
  getAllFactoryUnitInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<FactoryUnit[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<FactoryUnit[]>(this.url + "factoryUnitInformation/get", JSON.stringify(data), this.options);
  }

  createFactoryUnitInformation(factoryUnitInformation): Observable<number> {
    factoryUnitInformation.IS_AVAILABILITY_OF_ELECTRICITY = factoryUnitInformation.IS_AVAILABILITY_OF_ELECTRICITY ? 1 : 0
    factoryUnitInformation.IS_AVAILABILITY_OF_TRANSPORT = factoryUnitInformation.IS_AVAILABILITY_OF_TRANSPORT ? 1 : 0
    factoryUnitInformation.IS_AVAILABILITY_OF_WATER = factoryUnitInformation.IS_AVAILABILITY_OF_WATER ? 1 : 0
    factoryUnitInformation.IS_AVAILABILITY_OF_WORKERS = factoryUnitInformation.IS_AVAILABILITY_OF_WORKERS ? 1 : 0
    factoryUnitInformation.IS_SUFFICIENT_AREA = factoryUnitInformation.IS_SUFFICIENT_AREA ? 1 : 0

    factoryUnitInformation.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "factoryUnitInformation/create/", JSON.stringify(factoryUnitInformation), this.options);
  }

  updateFactoryUnitInformation(factoryUnitInformation): Observable<number> {
    factoryUnitInformation.IS_AVAILABILITY_OF_ELECTRICITY = factoryUnitInformation.IS_AVAILABILITY_OF_ELECTRICITY ? 1 : 0
    factoryUnitInformation.IS_AVAILABILITY_OF_TRANSPORT = factoryUnitInformation.IS_AVAILABILITY_OF_TRANSPORT ? 1 : 0
    factoryUnitInformation.IS_AVAILABILITY_OF_WATER = factoryUnitInformation.IS_AVAILABILITY_OF_WATER ? 1 : 0
    factoryUnitInformation.IS_AVAILABILITY_OF_WORKERS = factoryUnitInformation.IS_AVAILABILITY_OF_WORKERS ? 1 : 0
    factoryUnitInformation.IS_SUFFICIENT_AREA = factoryUnitInformation.IS_SUFFICIENT_AREA ? 1 : 0
    factoryUnitInformation.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "factoryUnitInformation/update/", JSON.stringify(factoryUnitInformation), this.options);
  }
  getAllDetailsOfEmployee(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<EmployeeInfo[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<EmployeeInfo[]>(this.url + "detailsOfEmployee/get", JSON.stringify(data), this.options);
  }

  createDetailsOfEmployee(detailsOfEmployee: EmployeeInfo): Observable<number> {

    detailsOfEmployee.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "detailsOfEmployee/create/", JSON.stringify(detailsOfEmployee), this.options);
  }

  updateDetailsOfEmployee(detailsOfEmployee: EmployeeInfo): Observable<number> {

    detailsOfEmployee.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "detailsOfEmployee/update/", JSON.stringify(detailsOfEmployee), this.options);
  }


  getAllManagementOfSalesInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<ManagementOfSalesInformation[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<ManagementOfSalesInformation[]>(this.url + "managementOfSalesInformation/get", JSON.stringify(data), this.options);
  }

  createManagementOfSalesInformation(managementOfSalesInformation): Observable<number> {
    managementOfSalesInformation.IS_SHOWROOM_OR_DEPO_OWNED = managementOfSalesInformation.IS_SHOWROOM_OR_DEPO_OWNED ? 1 : 0
    managementOfSalesInformation.IS_SALE_DIRECT_TO_CUSTOMER = managementOfSalesInformation.IS_SALE_DIRECT_TO_CUSTOMER ? 1 : 0
    managementOfSalesInformation.IS_EXPORT_SALES = managementOfSalesInformation.IS_EXPORT_SALES ? 1 : 0

    managementOfSalesInformation.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "managementOfSalesInformation/create/", JSON.stringify(managementOfSalesInformation), this.options);
  }

  updateManagementOfSalesInformation(managementOfSalesInformation): Observable<number> {
    managementOfSalesInformation.IS_SHOWROOM_OR_DEPO_OWNED = managementOfSalesInformation.IS_SHOWROOM_OR_DEPO_OWNED ? 1 : 0
    managementOfSalesInformation.IS_SALE_DIRECT_TO_CUSTOMER = managementOfSalesInformation.IS_SALE_DIRECT_TO_CUSTOMER ? 1 : 0
    managementOfSalesInformation.IS_EXPORT_SALES = managementOfSalesInformation.IS_EXPORT_SALES ? 1 : 0
    managementOfSalesInformation.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "managementOfSalesInformation/update/", JSON.stringify(managementOfSalesInformation), this.options);
  }

  getAllGuarantorInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Gurantorinfo[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Gurantorinfo[]>(this.url + "guarantorInformation/get", JSON.stringify(data), this.options);
  }


  createGuarantorInformationBulk(proposalId: Number, data1: string[]): Observable<Gurantorinfo[]> {
    var data = {
      data: data1,
      PROPOSAL_ID: proposalId
    };
    return this.httpClient.post<Gurantorinfo[]>(this.url + "guarantorInformation/addBulk", JSON.stringify(data), this.options);
  }

  getAllBalanceSheetInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<BalanceSheetInformation[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<BalanceSheetInformation[]>(this.url + "balanceSheetInformation/get", JSON.stringify(data), this.options);
  }

  getAllProfitabiltyStatementInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Profitabilitystatement[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Profitabilitystatement[]>(this.url + "profitabiltyStatementInformation/get", JSON.stringify(data), this.options);
  }
  getAllRepaymentCapacityInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Repayingcapacityborrower[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Repayingcapacityborrower[]>(this.url + "repaymentCapacityInformation/get", JSON.stringify(data), this.options);
  }

  updateBalanceSheetInformationBulk(proposalId: Number, data1, profitablityData, repayingData): Observable<string[]> {
    var data = {
      BALANCE_SHEET_INFORMATION: data1,
      PROPOSAL_ID: proposalId,
      PROFITABILITY_STATEMENT: profitablityData,
      REPAYING_CAPACITY: repayingData
    };
    //console.log(data)
    return this.httpClient.post<string[]>(this.url + "projectionsInformation/addBulk", JSON.stringify(data), this.options);
  }

  getAllLoanScheme(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Bankloanscheme[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Bankloanscheme[]>(this.url + "loanScheme/get", JSON.stringify(data), this.options);
  }

  createLoanScheme(loanScheme: Bankloanscheme): Observable<number> {

    loanScheme.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "loanScheme/create/", JSON.stringify(loanScheme), this.options);
  }

  updateLoanScheme(loanScheme: Bankloanscheme): Observable<number> {

    loanScheme.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "loanScheme/update/", JSON.stringify(loanScheme), this.options);
  }

  getAllShikshanSavardhiniLoan(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Shikshansavardhandata[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Shikshansavardhandata[]>(this.url + "shikshanSavardhiniLoan/get", JSON.stringify(data), this.options);
  }

  createShikshanSavardhiniLoan(shikshanSavardhiniLoan: Shikshansavardhandata): Observable<number> {

    shikshanSavardhiniLoan.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "shikshanSavardhiniLoan/create/", JSON.stringify(shikshanSavardhiniLoan), this.options);
  }


  AddShikshanSavardhiniLoan(shikshanSavardhiniLoan): Observable<number> {
    shikshanSavardhiniLoan.IS_COURSE_COLLEGE_ABROAD = shikshanSavardhiniLoan.IS_COURSE_COLLEGE_ABROAD ? 1 : 0
    shikshanSavardhiniLoan.IS_ADMISSION_TAKEN = shikshanSavardhiniLoan.IS_ADMISSION_TAKEN ? 1 : 0
    shikshanSavardhiniLoan.IS_COURSE_ELIGIBLE_FOR_SUBSIDY = shikshanSavardhiniLoan.IS_COURSE_ELIGIBLE_FOR_SUBSIDY ? 1 : 0
    shikshanSavardhiniLoan.IS_ELIGIBLE_FOR_ADDITIONAL_BENEFITS = shikshanSavardhiniLoan.IS_ELIGIBLE_FOR_ADDITIONAL_BENEFITS ? 1 : 0
    shikshanSavardhiniLoan.IS_TAKEN_ANY_OTHER_LOANS = shikshanSavardhiniLoan.IS_TAKEN_ANY_OTHER_LOANS ? 1 : 0
    shikshanSavardhiniLoan.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "shikshanSavardhiniLoan/addEducationLoanInformation", JSON.stringify(shikshanSavardhiniLoan), this.options);
  }


  getAllFeeDetails(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<string[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<string[]>(this.url + "feeDetails/get", JSON.stringify(data), this.options);
  }

  getAllIncomeyears(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Incomeyear[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Incomeyear[]>(this.url + "incomeyear/get", JSON.stringify(data), this.options);
  }

  createIncomeyear(incomeyear: Incomeyear): Observable<number> {

    incomeyear.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "incomeyear/create/", JSON.stringify(incomeyear), this.options);
  }

  updateIncomeyear(incomeyear: Incomeyear): Observable<number> {

    incomeyear.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "incomeyear/update/", JSON.stringify(incomeyear), this.options);
  }

  updateGuarantorInformation(guarantorInformation: Gurantorinfo): Observable<number> {

    guarantorInformation.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "guarantorInformation/update/", JSON.stringify(guarantorInformation), this.options);
  }

  getAllCostInformation(pageIndex: any, pageSize: any, sortKey: string, sortValue: string, filter: string): Observable<CostInfo[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<CostInfo[]>(this.url + "costInformation/get", JSON.stringify(data), this.options);
  }

  createCostInformation(projectionsInformation: CostInfo): Observable<number> {

    projectionsInformation.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "costInformation/create/", JSON.stringify(projectionsInformation), this.options);
  }

  updateCostInformation(projectionsInformation: CostInfo): Observable<number> {

    projectionsInformation.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "costInformation/update/", JSON.stringify(projectionsInformation), this.options);
  }

  getAllMeansInformation(pageIndex: any, pageSize: any, sortKey: string, sortValue: string, filter: string): Observable<MeansInfo[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<MeansInfo[]>(this.url + "meansInformation/get", JSON.stringify(data), this.options);
  }

  createMeansInformation(projectionsInformation: MeansInfo): Observable<number> {

    projectionsInformation.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "meansInformation/create/", JSON.stringify(projectionsInformation), this.options);
  }

  updateMeansInformation(projectionsInformation: MeansInfo): Observable<number> {

    projectionsInformation.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "meansInformation/update/", JSON.stringify(projectionsInformation), this.options);
  }

  getAllBankLoanTypes(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Subloantypes[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Subloantypes[]>(this.url + "bankLoanType/get", JSON.stringify(data), this.options);
  }

  createBankLoanType(bankLoanType: Subloantypes): Observable<number> {

    bankLoanType.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "bankLoanType/create/", JSON.stringify(bankLoanType), this.options);
  }

  updateBankLoanType(bankLoanType: Subloantypes): Observable<number> {

    bankLoanType.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "bankLoanType/update/", JSON.stringify(bankLoanType), this.options);
  }

  getAllProjectionsInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<ProjectionInfo[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<ProjectionInfo[]>(this.url + "projectionsInformation/get", JSON.stringify(data), this.options);
  }

  createProjectionsInformation(projectionsInformation: ProjectionInfo): Observable<number> {

    projectionsInformation.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "projectionsInformation/create/", JSON.stringify(projectionsInformation), this.options);
  }

  updateProjectionsInformation(projectionsInformation: ProjectionInfo): Observable<number> {

    projectionsInformation.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "projectionsInformation/update/", JSON.stringify(projectionsInformation), this.options);
  }

  updateFamilyDetails(familyDetail): Observable<number> {
    familyDetail.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "familyDetail/update/", JSON.stringify(familyDetail), this.options);
  }

  getAllPersonalLoan(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Personalloan[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Personalloan[]>(this.url + "personalLoan/get", JSON.stringify(data), this.options);
  }

  createPersonalLoan(personalLoan): Observable<number> {
    personalLoan.IS_INSURANCE_TAKEN = personalLoan.IS_INSURANCE_TAKEN ? 1 : 0
    personalLoan.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "personalLoan/create/", JSON.stringify(personalLoan), this.options);
  }

  updatePersonalLoan(personalLoan): Observable<number> {
    personalLoan.IS_INSURANCE_TAKEN = personalLoan.IS_INSURANCE_TAKEN ? 1 : 0
    personalLoan.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "personalLoan/update/", JSON.stringify(personalLoan), this.options);
  }


  getAllVehicleLoan(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Vehicleloan[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Vehicleloan[]>(this.url + "vehicleLoan/get", JSON.stringify(data), this.options);
  }

  createVehicleLoan(vehicleLoan): Observable<number> {
    vehicleLoan.IS_BS6 = vehicleLoan.IS_BS6 ? 1 : 0
    vehicleLoan.IS_ADVANCE_PAID = vehicleLoan.IS_ADVANCE_PAID ? 1 : 0
    vehicleLoan.IS_VALUATION_DONE = vehicleLoan.IS_VALUATION_DONE ? 1 : 0;
    vehicleLoan.IS_DONE_AGREEMENT = vehicleLoan.IS_DONE_AGREEMENT ? 1 : 0;
    vehicleLoan.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "vehicleLoan/create/", JSON.stringify(vehicleLoan), this.options);
  }

  updateVehicleLoan(vehicleLoan): Observable<number> {
    vehicleLoan.IS_BS6 = vehicleLoan.IS_BS6 ? 1 : 0
    vehicleLoan.IS_ADVANCE_PAID = vehicleLoan.IS_ADVANCE_PAID ? 1 : 0
    vehicleLoan.IS_VALUATION_DONE = vehicleLoan.IS_VALUATION_DONE ? 1 : 0;
    vehicleLoan.IS_DONE_AGREEMENT = vehicleLoan.IS_DONE_AGREEMENT ? 1 : 0;
    vehicleLoan.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "vehicleLoan/update/", JSON.stringify(vehicleLoan), this.options);
  }


  getAllConsumerDurablesLoans(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<ConsumerDuarablesLoan[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<ConsumerDuarablesLoan[]>(this.url + "consumerDurablesLoans/get", JSON.stringify(data), this.options);
  }

  createConsumerDurablesLoans(consumerDurablesLoans): Observable<number> {
    consumerDurablesLoans.IS_GIVEN_ADVANCE = consumerDurablesLoans.IS_GIVEN_ADVANCE ? 1 : 0
    consumerDurablesLoans.IS_QUOTATION_TAKEN = consumerDurablesLoans.IS_QUOTATION_TAKEN ? 1 : 0
    consumerDurablesLoans.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "consumerDurablesLoans/create/", JSON.stringify(consumerDurablesLoans), this.options);
  }

  updateConsumerDurablesLoans(consumerDurablesLoans): Observable<number> {
    consumerDurablesLoans.IS_GIVEN_ADVANCE = consumerDurablesLoans.IS_GIVEN_ADVANCE ? 1 : 0
    consumerDurablesLoans.IS_QUOTATION_TAKEN = consumerDurablesLoans.IS_QUOTATION_TAKEN ? 1 : 0
    consumerDurablesLoans.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "consumerDurablesLoans/update/", JSON.stringify(consumerDurablesLoans), this.options);
  }

  updateFeeDetails(feeDetails: Feedetails): Observable<number> {
    feeDetails.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "feeDetails/update/", JSON.stringify(feeDetails), this.options);
  }
  getAllMachineryLoan(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<MachineryLoan[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<MachineryLoan[]>(this.url + "machineryLoan/get", JSON.stringify(data), this.options);
  }

  createMachineryLoan(machineryLoan): Observable<number> {
    machineryLoan.IS_INDUSTRIAL_LOAN = machineryLoan.IS_INDUSTRIAL_LOAN ? 1 : 0
    machineryLoan.IS_RELATED_TO_BUSINESS = machineryLoan.IS_RELATED_TO_BUSINESS ? 1 : 0
    machineryLoan.IS_ADVANCE_PAID = machineryLoan.IS_ADVANCE_PAID ? 1 : 0
    machineryLoan.IS_DONE_AGREEMENT = machineryLoan.IS_DONE_AGREEMENT ? 1 : 0
    machineryLoan.IS_VALUATION_DONE = machineryLoan.IS_VALUATION_DONE ? 1 : 0
    machineryLoan.CLIENT_ID = this.clientId;
    //console.log(machineryLoan)
    return this.httpClient.post<number>(this.url + "machineryLoan/create/", JSON.stringify(machineryLoan), this.options);
  }

  updateMachineryLoan(machineryLoan): Observable<number> {
    machineryLoan.IS_INDUSTRIAL_LOAN = machineryLoan.IS_INDUSTRIAL_LOAN ? 1 : 0
    machineryLoan.IS_RELATED_TO_BUSINESS = machineryLoan.IS_RELATED_TO_BUSINESS ? 1 : 0
    machineryLoan.IS_ADVANCE_PAID = machineryLoan.IS_ADVANCE_PAID ? 1 : 0
    machineryLoan.IS_DONE_AGREEMENT = machineryLoan.IS_DONE_AGREEMENT ? 1 : 0
    machineryLoan.IS_VALUATION_DONE = machineryLoan.IS_VALUATION_DONE ? 1 : 0
    machineryLoan.CLIENT_ID = this.clientId;
    //console.log(machineryLoan)
    return this.httpClient.put<number>(this.url + "machineryLoan/update/", JSON.stringify(machineryLoan), this.options);
  }
  getAllDhanwantariLoan(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<DhanwantariLoan[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<DhanwantariLoan[]>(this.url + "dhanwantariLoan/get", JSON.stringify(data), this.options);
  }

  createDhanwantariLoan(dhanwantariLoan): Observable<number> {
    dhanwantariLoan.IS_AGREEMENT_WITH_DEALER = dhanwantariLoan.IS_AGREEMENT_WITH_DEALER ? 1 : 0
    dhanwantariLoan.IS_RELATED_TO_BUSINESS = dhanwantariLoan.IS_RELATED_TO_BUSINESS ? 1 : 0
    dhanwantariLoan.IS_ALL_GOVERNMENT_DUES_PAID = dhanwantariLoan.IS_ALL_GOVERNMENT_DUES_PAID ? 1 : 0
    dhanwantariLoan.IS_CONSTRUCTION_PLAN_READY = dhanwantariLoan.IS_CONSTRUCTION_PLAN_READY ? 1 : 0
    dhanwantariLoan.IS_PERMISSION_OF_CONSTRUCTION = dhanwantariLoan.IS_PERMISSION_OF_CONSTRUCTION ? 1 : 0
    dhanwantariLoan.IS_VALUATION_DONE = dhanwantariLoan.IS_VALUATION_DONE ? 1 : 0
    dhanwantariLoan.IS_ALL_GOVERNMENT_DUES_PAID = dhanwantariLoan.IS_ALL_GOVERNMENT_DUES_PAID ? 1 : 0
    dhanwantariLoan.IS_CONSTRUCTION_PLAN_READY = dhanwantariLoan.IS_CONSTRUCTION_PLAN_READY ? 1 : 0
    dhanwantariLoan.IS_PERMISSION_OF_CONSTRUCTION = dhanwantariLoan.IS_PERMISSION_OF_CONSTRUCTION ? 1 : 0
    dhanwantariLoan.IS_PAID_ADVANCE_AMOUNT = dhanwantariLoan.IS_PAID_ADVANCE_AMOUNT ? 1 : 0
    dhanwantariLoan.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "dhanwantariLoan/create/", JSON.stringify(dhanwantariLoan), this.options);
  }

  updateDhanwantariLoan(dhanwantariLoan): Observable<number> {
    dhanwantariLoan.IS_AGREEMENT_WITH_DEALER = dhanwantariLoan.IS_AGREEMENT_WITH_DEALER ? 1 : 0
    dhanwantariLoan.IS_RELATED_TO_BUSINESS = dhanwantariLoan.IS_RELATED_TO_BUSINESS ? 1 : 0
    dhanwantariLoan.IS_ALL_GOVERNMENT_DUES_PAID = dhanwantariLoan.IS_ALL_GOVERNMENT_DUES_PAID ? 1 : 0
    dhanwantariLoan.IS_CONSTRUCTION_PLAN_READY = dhanwantariLoan.IS_CONSTRUCTION_PLAN_READY ? 1 : 0
    dhanwantariLoan.IS_PERMISSION_OF_CONSTRUCTION = dhanwantariLoan.IS_PERMISSION_OF_CONSTRUCTION ? 1 : 0
    dhanwantariLoan.IS_VALUATION_DONE = dhanwantariLoan.IS_VALUATION_DONE ? 1 : 0
    dhanwantariLoan.IS_ALL_GOVERNMENT_DUES_PAID = dhanwantariLoan.IS_ALL_GOVERNMENT_DUES_PAID ? 1 : 0
    dhanwantariLoan.IS_CONSTRUCTION_PLAN_READY = dhanwantariLoan.IS_CONSTRUCTION_PLAN_READY ? 1 : 0
    dhanwantariLoan.IS_PERMISSION_OF_CONSTRUCTION = dhanwantariLoan.IS_PERMISSION_OF_CONSTRUCTION ? 1 : 0
    dhanwantariLoan.IS_PAID_ADVANCE_AMOUNT = dhanwantariLoan.IS_PAID_ADVANCE_AMOUNT ? 1 : 0
    dhanwantariLoan.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "dhanwantariLoan/update/", JSON.stringify(dhanwantariLoan), this.options);
  }
  getAllUtkarshaLoan(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<UtkarshLoan[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<UtkarshLoan[]>(this.url + "utkarshaLoan/get", JSON.stringify(data), this.options);
  }

  createUtkarshaLoan(utkarshaLoan): Observable<number> {
    utkarshaLoan.IS_BUILDER_OR_DEVELOPER = utkarshaLoan.IS_BUILDER_OR_DEVELOPER ? 1 : 0
    utkarshaLoan.IS_ALL_GOVERNMENT_DUTIES_PAID = utkarshaLoan.IS_ALL_GOVERNMENT_DUTIES_PAID ? 1 : 0
    utkarshaLoan.CLIENT_ID = this.clientId;

    return this.httpClient.post<number>(this.url + "utkarshaLoan/create/", JSON.stringify(utkarshaLoan), this.options);
  }

  updateUtkarshaLoan(utkarshaLoan): Observable<number> {
    utkarshaLoan.IS_BUILDER_OR_DEVELOPER = utkarshaLoan.IS_BUILDER_OR_DEVELOPER ? 1 : 0
    utkarshaLoan.IS_ALL_GOVERNMENT_DUTIES_PAID = utkarshaLoan.IS_ALL_GOVERNMENT_DUTIES_PAID ? 1 : 0
    utkarshaLoan.CLIENT_ID = this.clientId;

    return this.httpClient.put<number>(this.url + "utkarshaLoan/update/", JSON.stringify(utkarshaLoan), this.options);
  }
  getAllShubhVivahLoanInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<ShubhVivahLoan[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<ShubhVivahLoan[]>(this.url + "shubhVivahLoanInformation/get", JSON.stringify(data), this.options);
  }

  createShubhVivahLoanInformation(shubhVivahLoanInformation): Observable<number> {
    shubhVivahLoanInformation.IS_INVITATION_CARD_PRINTED = shubhVivahLoanInformation.IS_INVITATION_CARD_PRINTED ? 1 : 0
    shubhVivahLoanInformation.IS_READY_FOR_SUBMIT_EMI_CHECKS = shubhVivahLoanInformation.IS_READY_FOR_SUBMIT_EMI_CHECKS ? 1 : 0
    shubhVivahLoanInformation.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "shubhVivahLoanInformation/create/", JSON.stringify(shubhVivahLoanInformation), this.options);
  }

  updateShubhVivahLoanInformation(shubhVivahLoanInformation): Observable<number> {
    shubhVivahLoanInformation.IS_INVITATION_CARD_PRINTED = shubhVivahLoanInformation.IS_INVITATION_CARD_PRINTED ? 1 : 0
    shubhVivahLoanInformation.IS_READY_FOR_SUBMIT_EMI_CHECKS = shubhVivahLoanInformation.IS_READY_FOR_SUBMIT_EMI_CHECKS ? 1 : 0
    shubhVivahLoanInformation.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "shubhVivahLoanInformation/update/", JSON.stringify(shubhVivahLoanInformation), this.options);
  }
  getAllPladgeLoanInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<PledgeLoan[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<PledgeLoan[]>(this.url + "pladgeLoanInformation/get", JSON.stringify(data), this.options);
  }

  createPladgeLoanInformation(pladgeLoanInformation): Observable<number> {
    pladgeLoanInformation.IS_LOAN_TAKEN_FOR_STOCK_PLACE = pladgeLoanInformation.IS_LOAN_TAKEN_FOR_STOCK_PLACE ? 1 : 0
    pladgeLoanInformation.IS_ANY_RENT_AGREEMENT_FOR_STOCK_PLACE = pladgeLoanInformation.IS_ANY_RENT_AGREEMENT_FOR_STOCK_PLACE ? 1 : 0
    pladgeLoanInformation.IS_AVAILABLE_COLATERAL_MANAGER = pladgeLoanInformation.IS_AVAILABLE_COLATERAL_MANAGER ? 1 : 0
    pladgeLoanInformation.IS_VALUATION_DONE = pladgeLoanInformation.IS_VALUATION_DONE ? 1 : 0
    pladgeLoanInformation.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "pladgeLoanInformation/create/", JSON.stringify(pladgeLoanInformation), this.options);
  }

  updatePladgeLoanInformation(pladgeLoanInformation): Observable<number> {
    pladgeLoanInformation.IS_LOAN_TAKEN_FOR_STOCK_PLACE = pladgeLoanInformation.IS_LOAN_TAKEN_FOR_STOCK_PLACE ? 1 : 0
    pladgeLoanInformation.IS_ANY_RENT_AGREEMENT_FOR_STOCK_PLACE = pladgeLoanInformation.IS_ANY_RENT_AGREEMENT_FOR_STOCK_PLACE ? 1 : 0
    pladgeLoanInformation.IS_AVAILABLE_COLATERAL_MANAGER = pladgeLoanInformation.IS_AVAILABLE_COLATERAL_MANAGER ? 1 : 0
    pladgeLoanInformation.IS_VALUATION_DONE = pladgeLoanInformation.IS_VALUATION_DONE ? 1 : 0
    pladgeLoanInformation.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "pladgeLoanInformation/update/", JSON.stringify(pladgeLoanInformation), this.options);
  }
  getAllBuilderFinanceInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<BuilderFinance[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<BuilderFinance[]>(this.url + "builderFinanceInformation/get", JSON.stringify(data), this.options);
  }

  createBuilderFinanceInformation(builderFinanceInformation): Observable<number> {
    builderFinanceInformation.IS_REGISTERED_UNDER_RERA = builderFinanceInformation.IS_REGISTERED_UNDER_RERA ? 1 : 0
    builderFinanceInformation.IS_PAID_GOVERNMENT_DUES = builderFinanceInformation.IS_PAID_GOVERNMENT_DUES ? 1 : 0
    builderFinanceInformation.IS_READY_CONSTRUCTION_PLAN = builderFinanceInformation.IS_READY_CONSTRUCTION_PLAN ? 1 : 0
    builderFinanceInformation.IS_PERMISSION_OBTAINED = builderFinanceInformation.IS_PERMISSION_OBTAINED ? 1 : 0
    builderFinanceInformation.IS_PROJECT_WORK_STARTED = builderFinanceInformation.IS_PROJECT_WORK_STARTED ? 1 : 0
    builderFinanceInformation.IS_TAKEN_UNSECURED_LOAN = builderFinanceInformation.IS_TAKEN_UNSECURED_LOAN ? 1 : 0
    builderFinanceInformation.IS_ANY_FINANCER_INVESTED = builderFinanceInformation.IS_ANY_FINANCER_INVESTED ? 1 : 0
    builderFinanceInformation.IS_STARTED_BOOKING = builderFinanceInformation.IS_STARTED_BOOKING ? 1 : 0
    builderFinanceInformation.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "builderFinanceInformation/create/", JSON.stringify(builderFinanceInformation), this.options);
  }

  updateBuilderFinanceInformation(builderFinanceInformation): Observable<number> {
    builderFinanceInformation.IS_REGISTERED_UNDER_RERA = builderFinanceInformation.IS_REGISTERED_UNDER_RERA ? 1 : 0
    builderFinanceInformation.IS_PAID_GOVERNMENT_DUES = builderFinanceInformation.IS_PAID_GOVERNMENT_DUES ? 1 : 0
    builderFinanceInformation.IS_READY_CONSTRUCTION_PLAN = builderFinanceInformation.IS_READY_CONSTRUCTION_PLAN ? 1 : 0
    builderFinanceInformation.IS_PERMISSION_OBTAINED = builderFinanceInformation.IS_PERMISSION_OBTAINED ? 1 : 0
    builderFinanceInformation.IS_PROJECT_WORK_STARTED = builderFinanceInformation.IS_PROJECT_WORK_STARTED ? 1 : 0
    builderFinanceInformation.IS_TAKEN_UNSECURED_LOAN = builderFinanceInformation.IS_TAKEN_UNSECURED_LOAN ? 1 : 0
    builderFinanceInformation.IS_ANY_FINANCER_INVESTED = builderFinanceInformation.IS_ANY_FINANCER_INVESTED ? 1 : 0
    builderFinanceInformation.IS_STARTED_BOOKING = builderFinanceInformation.IS_STARTED_BOOKING ? 1 : 0
    builderFinanceInformation.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "builderFinanceInformation/update/", JSON.stringify(builderFinanceInformation), this.options);
  }
  getAllRealEstateIndustrialFinanceInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<RealEstateIndustrialFinance[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<RealEstateIndustrialFinance[]>(this.url + "realEstateIndustrialFinanceInformation/get", JSON.stringify(data), this.options);
  }

  createRealEstateIndustrialFinanceInformation(realEstateIndustrialFinanceInformation): Observable<number> {
    realEstateIndustrialFinanceInformation.IS_LEASE_DEAD_MADE = realEstateIndustrialFinanceInformation.IS_LEASE_DEAD_MADE ? 1 : 0
    realEstateIndustrialFinanceInformation.IS_AVALABLE_PLOT_ALLOTEMENT_LETTER = realEstateIndustrialFinanceInformation.IS_AVALABLE_PLOT_ALLOTEMENT_LETTER ? 1 : 0
    realEstateIndustrialFinanceInformation.IS_AVAILABLE_POSSESSION_LETTER = realEstateIndustrialFinanceInformation.IS_AVAILABLE_POSSESSION_LETTER ? 1 : 0
    realEstateIndustrialFinanceInformation.IS_PAID_STATUTORY_DUTY = realEstateIndustrialFinanceInformation.IS_PAID_STATUTORY_DUTY ? 1 : 0
    realEstateIndustrialFinanceInformation.IS_PLAN_READY_FOR_CONSTRUCTION = realEstateIndustrialFinanceInformation.IS_PLAN_READY_FOR_CONSTRUCTION ? 1 : 0
    realEstateIndustrialFinanceInformation.IS_PERMISSION_TAKEN = realEstateIndustrialFinanceInformation.IS_PERMISSION_TAKEN ? 1 : 0
    realEstateIndustrialFinanceInformation.IS_NOC_OBTAINED = realEstateIndustrialFinanceInformation.IS_NOC_OBTAINED ? 1 : 0
    realEstateIndustrialFinanceInformation.IS_MIDC_READY_FOR_TRIPARTY_AGREEMENT = realEstateIndustrialFinanceInformation.IS_MIDC_READY_FOR_TRIPARTY_AGREEMENT ? 1 : 0
    realEstateIndustrialFinanceInformation.IS_PAID_GOVERNMENT_DUTIES = realEstateIndustrialFinanceInformation.IS_PAID_GOVERNMENT_DUTIES ? 1 : 0
    realEstateIndustrialFinanceInformation.IS_VALUATION_DONE = realEstateIndustrialFinanceInformation.IS_VALUATION_DONE ? 1 : 0
    realEstateIndustrialFinanceInformation.IS_PLOT_TAKEN_ON_LEASE = realEstateIndustrialFinanceInformation.IS_PLOT_TAKEN_ON_LEASE ? 1 : 0
    realEstateIndustrialFinanceInformation.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "realEstateIndustrialFinanceInformation/create/", JSON.stringify(realEstateIndustrialFinanceInformation), this.options);
  }

  updateRealEstateIndustrialFinanceInformation(realEstateIndustrialFinanceInformation): Observable<number> {
    realEstateIndustrialFinanceInformation.IS_LEASE_DEAD_MADE = realEstateIndustrialFinanceInformation.IS_LEASE_DEAD_MADE ? 1 : 0
    realEstateIndustrialFinanceInformation.IS_AVALABLE_PLOT_ALLOTEMENT_LETTER = realEstateIndustrialFinanceInformation.IS_AVALABLE_PLOT_ALLOTEMENT_LETTER ? 1 : 0
    realEstateIndustrialFinanceInformation.IS_AVAILABLE_POSSESSION_LETTER = realEstateIndustrialFinanceInformation.IS_AVAILABLE_POSSESSION_LETTER ? 1 : 0
    realEstateIndustrialFinanceInformation.IS_PAID_STATUTORY_DUTY = realEstateIndustrialFinanceInformation.IS_PAID_STATUTORY_DUTY ? 1 : 0
    realEstateIndustrialFinanceInformation.IS_PLAN_READY_FOR_CONSTRUCTION = realEstateIndustrialFinanceInformation.IS_PLAN_READY_FOR_CONSTRUCTION ? 1 : 0
    realEstateIndustrialFinanceInformation.IS_PERMISSION_TAKEN = realEstateIndustrialFinanceInformation.IS_PERMISSION_TAKEN ? 1 : 0
    realEstateIndustrialFinanceInformation.IS_NOC_OBTAINED = realEstateIndustrialFinanceInformation.IS_NOC_OBTAINED ? 1 : 0
    realEstateIndustrialFinanceInformation.IS_MIDC_READY_FOR_TRIPARTY_AGREEMENT = realEstateIndustrialFinanceInformation.IS_MIDC_READY_FOR_TRIPARTY_AGREEMENT ? 1 : 0
    realEstateIndustrialFinanceInformation.IS_PAID_GOVERNMENT_DUTIES = realEstateIndustrialFinanceInformation.IS_PAID_GOVERNMENT_DUTIES ? 1 : 0
    realEstateIndustrialFinanceInformation.IS_VALUATION_DONE = realEstateIndustrialFinanceInformation.IS_VALUATION_DONE ? 1 : 0
    realEstateIndustrialFinanceInformation.IS_PLOT_TAKEN_ON_LEASE = realEstateIndustrialFinanceInformation.IS_PLOT_TAKEN_ON_LEASE ? 1 : 0
    realEstateIndustrialFinanceInformation.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "realEstateIndustrialFinanceInformation/update/", JSON.stringify(realEstateIndustrialFinanceInformation), this.options);
  }
  getAllCashCreditLoanInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<CashCreditLoan[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<CashCreditLoan[]>(this.url + "cashCreditLoanInformation/get", JSON.stringify(data), this.options);
  }

  createCashCreditLoanInformation(cashCreditLoanInformation): Observable<number> {
    cashCreditLoanInformation.IS_ANY_PURCHASE_FROM_SISTER_CONCERN_FIRM = cashCreditLoanInformation.IS_ANY_PURCHASE_FROM_SISTER_CONCERN_FIRM ? 1 : 0
    cashCreditLoanInformation.IS_ANY_SALES_FROM_SISTER_CONCERN_FIRM = cashCreditLoanInformation.IS_ANY_SALES_FROM_SISTER_CONCERN_FIRM ? 1 : 0
    cashCreditLoanInformation.IS_STOCK_IS_INSURED = cashCreditLoanInformation.IS_STOCK_IS_INSURED ? 1 : 0
    cashCreditLoanInformation.IS_DEBTOR_LIST_PREPARED_ON_TIME = cashCreditLoanInformation.IS_DEBTOR_LIST_PREPARED_ON_TIME ? 1 : 0
    cashCreditLoanInformation.IS_STOCK_MAINTAINED_AT_OTHER_PLACE = cashCreditLoanInformation.IS_STOCK_MAINTAINED_AT_OTHER_PLACE ? 1 : 0
    cashCreditLoanInformation.IS_THERE_ANY_OBSOLUTE_DAMAGED_STOCK = cashCreditLoanInformation.IS_THERE_ANY_OBSOLUTE_DAMAGED_STOCK ? 1 : 0
    cashCreditLoanInformation.CLIENT_ID = this.clientId;
    cashCreditLoanInformation.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "cashCreditLoanInformation/create/", JSON.stringify(cashCreditLoanInformation), this.options);
  }

  updateCashCreditLoanInformation(cashCreditLoanInformation): Observable<number> {
    cashCreditLoanInformation.IS_ANY_PURCHASE_FROM_SISTER_CONCERN_FIRM = cashCreditLoanInformation.IS_ANY_PURCHASE_FROM_SISTER_CONCERN_FIRM ? 1 : 0
    cashCreditLoanInformation.IS_ANY_SALES_FROM_SISTER_CONCERN_FIRM = cashCreditLoanInformation.IS_ANY_SALES_FROM_SISTER_CONCERN_FIRM ? 1 : 0
    cashCreditLoanInformation.IS_STOCK_IS_INSURED = cashCreditLoanInformation.IS_STOCK_IS_INSURED ? 1 : 0
    cashCreditLoanInformation.IS_DEBTOR_LIST_PREPARED_ON_TIME = cashCreditLoanInformation.IS_DEBTOR_LIST_PREPARED_ON_TIME ? 1 : 0
    cashCreditLoanInformation.IS_STOCK_MAINTAINED_AT_OTHER_PLACE = cashCreditLoanInformation.IS_STOCK_MAINTAINED_AT_OTHER_PLACE ? 1 : 0
    cashCreditLoanInformation.IS_THERE_ANY_OBSOLUTE_DAMAGED_STOCK = cashCreditLoanInformation.IS_THERE_ANY_OBSOLUTE_DAMAGED_STOCK ? 1 : 0
    cashCreditLoanInformation.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "cashCreditLoanInformation/update/", JSON.stringify(cashCreditLoanInformation), this.options);
  }
  getAllCashCreditOtherInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<CashCreditLoanOther[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<CashCreditLoanOther[]>(this.url + "cashCreditOtherInformation/get", JSON.stringify(data), this.options);
  }

  createCashCreditOtherInformation(cashCreditOtherInformation: CashCreditLoanOther): Observable<number> {

    cashCreditOtherInformation.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "cashCreditOtherInformation/create/", JSON.stringify(cashCreditOtherInformation), this.options);
  }

  updateCashCreditOtherInformation(cashCreditOtherInformation: CashCreditLoanOther): Observable<number> {

    cashCreditOtherInformation.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "cashCreditOtherInformation/update/", JSON.stringify(cashCreditOtherInformation), this.options);
  }

  getAllWorkOrderDetails(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<WorkOrders[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<WorkOrders[]>(this.url + "workOrderDetails/get", JSON.stringify(data), this.options);
  }

  createWorkOrderDetails(workOrderDetails: WorkOrders): Observable<number> {

    workOrderDetails.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "workOrderDetails/create/", JSON.stringify(workOrderDetails), this.options);
  }

  updateWorkOrderDetails(workOrderDetails: WorkOrders): Observable<number> {

    workOrderDetails.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "workOrderDetails/update/", JSON.stringify(workOrderDetails), this.options);
  }
  createCashCreditOtherInformationBulk(cashCreditOtherInformation): Observable<number> {
    cashCreditOtherInformation.IS_ANY_WORK_ORDER_IN_HAND = cashCreditOtherInformation.IS_ANY_WORK_ORDER_IN_HAND ? 1 : 0
    cashCreditOtherInformation.IS_ANY_SUB_CONTRACTOR = cashCreditOtherInformation.IS_ANY_SUB_CONTRACTOR ? 1 : 0
    cashCreditOtherInformation.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "cashCreditOtherInformation/addCashCreditInformation/", JSON.stringify(cashCreditOtherInformation), this.options);
  }
  getAllRealEstateResidentialLoan(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<RealEstateResidential[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<RealEstateResidential[]>(this.url + "realEstateResidentialLoan/get", JSON.stringify(data), this.options);
  }

  createRealEstateResidentialLoan(realEstateResidentialLoan): Observable<number> {
    realEstateResidentialLoan.IS_SOCIETY_FORMED = realEstateResidentialLoan.IS_SOCIETY_FORMED ? 1 : 0
    realEstateResidentialLoan.IS_DONE_AGREEMENT = realEstateResidentialLoan.IS_DONE_AGREEMENT ? 1 : 0
    realEstateResidentialLoan.IS_PAID_GOVERNMENT_DUES = realEstateResidentialLoan.IS_PAID_GOVERNMENT_DUES ? 1 : 0
    realEstateResidentialLoan.IS_ANY_EXISTING_LOAN = realEstateResidentialLoan.IS_ANY_EXISTING_LOAN ? 1 : 0
    realEstateResidentialLoan.IS_CONSTRUCTION_PLAN_READY = realEstateResidentialLoan.IS_CONSTRUCTION_PLAN_READY ? 1 : 0
    realEstateResidentialLoan.IS_PERMISSION_OBTAINED = realEstateResidentialLoan.IS_PERMISSION_OBTAINED ? 1 : 0
    realEstateResidentialLoan.IS_TAKEN_ESTIMATION = realEstateResidentialLoan.IS_TAKEN_ESTIMATION ? 1 : 0
    realEstateResidentialLoan.IS_DEBT_AMOUNT_PAYABLE_TO_OTHER_BANK = realEstateResidentialLoan.IS_DEBT_AMOUNT_PAYABLE_TO_OTHER_BANK ? 1 : 0
    realEstateResidentialLoan.IS_VALUATION_DONE = realEstateResidentialLoan.IS_VALUATION_DONE ? 1 : 0
    realEstateResidentialLoan.CLIENT_ID = this.clientId;
    realEstateResidentialLoan.IS_PAID_ADVANCE_AMOUNT = realEstateResidentialLoan.IS_PAID_ADVANCE_AMOUNT ? 1 : 0
    return this.httpClient.post<number>(this.url + "realEstateResidentialLoan/create/", JSON.stringify(realEstateResidentialLoan), this.options);
  }

  updateRealEstateResidentialLoan(realEstateResidentialLoan): Observable<number> {
    realEstateResidentialLoan.IS_SOCIETY_FORMED = realEstateResidentialLoan.IS_SOCIETY_FORMED ? 1 : 0
    realEstateResidentialLoan.IS_DONE_AGREEMENT = realEstateResidentialLoan.IS_DONE_AGREEMENT ? 1 : 0
    realEstateResidentialLoan.IS_PAID_GOVERNMENT_DUES = realEstateResidentialLoan.IS_PAID_GOVERNMENT_DUES ? 1 : 0
    realEstateResidentialLoan.IS_PAID_ADVANCE_AMOUNT = realEstateResidentialLoan.IS_PAID_ADVANCE_AMOUNT ? 1 : 0
    realEstateResidentialLoan.IS_ANY_EXISTING_LOAN = realEstateResidentialLoan.IS_ANY_EXISTING_LOAN ? 1 : 0
    realEstateResidentialLoan.IS_CONSTRUCTION_PLAN_READY = realEstateResidentialLoan.IS_CONSTRUCTION_PLAN_READY ? 1 : 0
    realEstateResidentialLoan.IS_PERMISSION_OBTAINED = realEstateResidentialLoan.IS_PERMISSION_OBTAINED ? 1 : 0
    realEstateResidentialLoan.IS_TAKEN_ESTIMATION = realEstateResidentialLoan.IS_TAKEN_ESTIMATION ? 1 : 0
    realEstateResidentialLoan.IS_DEBT_AMOUNT_PAYABLE_TO_OTHER_BANK = realEstateResidentialLoan.IS_DEBT_AMOUNT_PAYABLE_TO_OTHER_BANK ? 1 : 0
    realEstateResidentialLoan.IS_VALUATION_DONE = realEstateResidentialLoan.IS_VALUATION_DONE ? 1 : 0
    realEstateResidentialLoan.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "realEstateResidentialLoan/update/", JSON.stringify(realEstateResidentialLoan), this.options);
  }
  getAllRealEstateComercialLoan(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<RealEstateCommercial[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<RealEstateCommercial[]>(this.url + "realEstateComercialLoan/get", JSON.stringify(data), this.options);
  }

  createRealEstateComercialLoan(realEstateComercialLoan): Observable<number> {
    realEstateComercialLoan.IS_SOCIETY_FORMED = realEstateComercialLoan.IS_SOCIETY_FORMED ? 1 : 0
    realEstateComercialLoan.IS_DONE_AGREEMENT = realEstateComercialLoan.IS_DONE_AGREEMENT ? 1 : 0
    realEstateComercialLoan.IS_PAID_GOVERNMENT_DUES = realEstateComercialLoan.IS_PAID_GOVERNMENT_DUES ? 1 : 0
    realEstateComercialLoan.IS_ANY_EXISTING_LOAN = realEstateComercialLoan.IS_ANY_EXISTING_LOAN ? 1 : 0
    realEstateComercialLoan.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "realEstateComercialLoan/create/", JSON.stringify(realEstateComercialLoan), this.options);
  }

  updateRealEstateComercialLoan(realEstateComercialLoan): Observable<number> {
    realEstateComercialLoan.IS_SOCIETY_FORMED = realEstateComercialLoan.IS_SOCIETY_FORMED ? 1 : 0
    realEstateComercialLoan.IS_DONE_AGREEMENT = realEstateComercialLoan.IS_DONE_AGREEMENT ? 1 : 0
    realEstateComercialLoan.IS_PAID_GOVERNMENT_DUES = realEstateComercialLoan.IS_PAID_GOVERNMENT_DUES ? 1 : 0
    realEstateComercialLoan.IS_ANY_EXISTING_LOAN = realEstateComercialLoan.IS_ANY_EXISTING_LOAN ? 1 : 0
    realEstateComercialLoan.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "realEstateComercialLoan/update/", JSON.stringify(realEstateComercialLoan), this.options);
  }
  getAllRealEstateResidentialComercialLoanInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Resincom[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Resincom[]>(this.url + "realEstateResidentialComercialLoanInformation/get", JSON.stringify(data), this.options);
  }

  createRealEstateResidentialComercialLoanInformation(realEstateResidentialComercialLoanInformation): Observable<number> {
    realEstateResidentialComercialLoanInformation.IS_ANY_EXISTING_LOAN = realEstateResidentialComercialLoanInformation.IS_ANY_EXISTING_LOAN ? 1 : 0
    realEstateResidentialComercialLoanInformation.IS_DEBT_AMOUNT_PAYABLE_TO_OTHER_BANK = realEstateResidentialComercialLoanInformation.IS_DEBT_AMOUNT_PAYABLE_TO_OTHER_BANK ? 1 : 0
    realEstateResidentialComercialLoanInformation.IS_VALUATION_DONE = realEstateResidentialComercialLoanInformation.IS_VALUATION_DONE ? 1 : 0
    realEstateResidentialComercialLoanInformation.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "realEstateResidentialComercialLoanInformation/create/", JSON.stringify(realEstateResidentialComercialLoanInformation), this.options);
  }

  updateRealEstateResidentialComercialLoanInformation(realEstateResidentialComercialLoanInformation): Observable<number> {
    realEstateResidentialComercialLoanInformation.IS_ANY_EXISTING_LOAN = realEstateResidentialComercialLoanInformation.IS_ANY_EXISTING_LOAN ? 1 : 0
    realEstateResidentialComercialLoanInformation.IS_DEBT_AMOUNT_PAYABLE_TO_OTHER_BANK = realEstateResidentialComercialLoanInformation.IS_DEBT_AMOUNT_PAYABLE_TO_OTHER_BANK ? 1 : 0
    realEstateResidentialComercialLoanInformation.IS_VALUATION_DONE = realEstateResidentialComercialLoanInformation.IS_VALUATION_DONE ? 1 : 0
    realEstateResidentialComercialLoanInformation.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "realEstateResidentialComercialLoanInformation/update/", JSON.stringify(realEstateResidentialComercialLoanInformation), this.options);
  }

  getAllIndustryCodes(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<IndustriMarking[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<IndustriMarking[]>(this.url + "industryCode/get", JSON.stringify(data), this.options);
  }

  createIndustryCode(industryCode: IndustriMarking): Observable<number> {

    industryCode.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "industryCode/create/", JSON.stringify(industryCode), this.options);
  }

  updateIndustryCode(industryCode: IndustriMarking): Observable<number> {

    industryCode.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "industryCode/update/", JSON.stringify(industryCode), this.options);
  }

  getAllPriorityCodes(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<PrioritySection[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<PrioritySection[]>(this.url + "priorityCode/get", JSON.stringify(data), this.options);
  }

  createPriorityCode(priorityCode: PrioritySection): Observable<number> {

    priorityCode.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "priorityCode/create/", JSON.stringify(priorityCode), this.options);
  }

  updatePriorityCode(priorityCode: PrioritySection): Observable<number> {

    priorityCode.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "priorityCode/update/", JSON.stringify(priorityCode), this.options);
  }

  getAllWeekerSectionCodes(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<WeekerSection[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<WeekerSection[]>(this.url + "weekerSectionCode/get", JSON.stringify(data), this.options);
  }

  createWeekerSectionCode(weekerSectionCode: WeekerSection): Observable<number> {

    weekerSectionCode.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "weekerSectionCode/create/", JSON.stringify(weekerSectionCode), this.options);
  }

  updateWeekerSectionCode(weekerSectionCode: WeekerSection): Observable<number> {

    weekerSectionCode.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "weekerSectionCode/update/", JSON.stringify(weekerSectionCode), this.options);
  }

  updateToBankSchemeMSI(bankLoanTypeId: number, industryCodeId: number, priorityCodeId: number, weekerSectionId: number, realestate: string, currentStateId: number, proposalId: Number): Observable<string[]> {
    var data = {
      BANK_LOAN_TYPE_ID: bankLoanTypeId,
      INDUSTRY_CODE_ID: industryCodeId,
      PRIORITY_CODE_ID: priorityCodeId,
      WEEKER_SECTION_ID: weekerSectionId,
      REAL_ESTATE_MARKING: realestate,
      COMPLETE_STAGE_ID: currentStateId,
      PROPOSAL_ID: proposalId

    };
    //console.log(data)
    return this.httpClient.post<string[]>(this.url + "loanDemand/updateLoanScheme", JSON.stringify(data), this.options);
  }

  getAllRentDiscountingLoan(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<RentDiscountingLoan[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<RentDiscountingLoan[]>(this.url + "rentDiscountingLoan/get", JSON.stringify(data), this.options);
  }

  createRentDiscountingLoan(rentDiscountingLoan): Observable<number> {
    rentDiscountingLoan.IS_OWNER = rentDiscountingLoan.IS_OWNER ? 1 : 0
    rentDiscountingLoan.IS_RENT_AGREEMENT_DONE = rentDiscountingLoan.IS_RENT_AGREEMENT_DONE ? 1 : 0
    rentDiscountingLoan.IS_DONE_TDS_CUTTING = rentDiscountingLoan.IS_DONE_TDS_CUTTING ? 1 : 0
    rentDiscountingLoan.IS_ANY_BANK_LOAN_TAKEN = rentDiscountingLoan.IS_ANY_BANK_LOAN_TAKEN ? 1 : 0
    rentDiscountingLoan.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "rentDiscountingLoan/create/", JSON.stringify(rentDiscountingLoan), this.options);
  }

  updateRentDiscountingLoan(rentDiscountingLoan): Observable<number> {
    rentDiscountingLoan.IS_OWNER = rentDiscountingLoan.IS_OWNER ? 1 : 0
    rentDiscountingLoan.IS_RENT_AGREEMENT_DONE = rentDiscountingLoan.IS_RENT_AGREEMENT_DONE ? 1 : 0
    rentDiscountingLoan.IS_DONE_TDS_CUTTING = rentDiscountingLoan.IS_DONE_TDS_CUTTING ? 1 : 0
    rentDiscountingLoan.IS_ANY_BANK_LOAN_TAKEN = rentDiscountingLoan.IS_ANY_BANK_LOAN_TAKEN ? 1 : 0
    rentDiscountingLoan.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "rentDiscountingLoan/update/", JSON.stringify(rentDiscountingLoan), this.options);
  }

  getAllTopUpLoanReasonDetails(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<RealEstateToUpLoan[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<RealEstateToUpLoan[]>(this.url + "topUpLoanReasonDetails/get", JSON.stringify(data), this.options);
  }

  getAllRealEstateTopUpLoan(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<RealEstateToUpLoan[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<RealEstateToUpLoan[]>(this.url + "realEstateTopUpLoan/get", JSON.stringify(data), this.options);
  }

  createRealEstateTopUpLoan(realEstateTopUpLoan: RealEstateToUpLoan): Observable<number> {

    realEstateTopUpLoan.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "realEstateTopUpLoan/create/", JSON.stringify(realEstateTopUpLoan), this.options);
  }
  createRealEstateTopUpLoanBullk(realEstateTopUpLoan): Observable<number> {
    realEstateTopUpLoan.IS_APPLIED_FOR_LOAN_INTEREST_GOVERNMENT_SUBSIDY = realEstateTopUpLoan.IS_APPLIED_FOR_LOAN_INTEREST_GOVERNMENT_SUBSIDY ? 1 : 0
    realEstateTopUpLoan.IS_TAKEN_LOAN_INTEREST_GOVERNMENT_SUBSIDY = realEstateTopUpLoan.IS_TAKEN_LOAN_INTEREST_GOVERNMENT_SUBSIDY ? 1 : 0
    realEstateTopUpLoan.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "realEstateTopUpLoan/addTopUpLoan", JSON.stringify(realEstateTopUpLoan), this.options);
  }
  updateRealEstateTopUpLoan(realEstateTopUpLoan: RealEstateToUpLoan): Observable<number> {

    realEstateTopUpLoan.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "realEstateTopUpLoan/update/", JSON.stringify(realEstateTopUpLoan), this.options);
  }
  getAllForeignTravelFamilyDetail(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<TourAndTravelLoan[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<TourAndTravelLoan[]>(this.url + "foreignTravelFamilyDetail/get", JSON.stringify(data), this.options);
  }

  getAllToursAndTravelLoan(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<TourAndTravelLoan[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<TourAndTravelLoan[]>(this.url + "toursAndTravelLoan/get", JSON.stringify(data), this.options);
  }

  createToursAndTravelLoan(toursAndTravelLoan: TourAndTravelLoan): Observable<number> {

    toursAndTravelLoan.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "toursAndTravelLoan/create/", JSON.stringify(toursAndTravelLoan), this.options);
  }
  createToursAndTravelLoanBUlk(toursAndTravelLoan: TourAndTravelLoan): Observable<number> {
    toursAndTravelLoan.IS_GIVE_ADVANCE_AMOUNT_TO_TRAVEL_AGENCY = toursAndTravelLoan.IS_GIVE_ADVANCE_AMOUNT_TO_TRAVEL_AGENCY ? 1 : 0
    toursAndTravelLoan.IS_LTC_PROVIDED = toursAndTravelLoan.IS_LTC_PROVIDED ? 1 : 0
    toursAndTravelLoan.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "toursAndTravelLoan/addToursAndTravelsDetails", JSON.stringify(toursAndTravelLoan), this.options);
  }

  updateToursAndTravelLoan(toursAndTravelLoan: TourAndTravelLoan): Observable<number> {

    toursAndTravelLoan.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "toursAndTravelLoan/update/", JSON.stringify(toursAndTravelLoan), this.options);
  }

  getAllCoborrowerInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Coborrower[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Coborrower[]>(this.url + "coborrowerInformation/get", JSON.stringify(data), this.options);
  }

  createCoborrowerInformationBulk(proposalId: Number, data1: string[]): Observable<Coborrower[]> {
    var data = {
      data: data1,
      PROPOSAL_ID: proposalId
    };
    return this.httpClient.post<Coborrower[]>(this.url + "coborrowerInformation/addBulk", JSON.stringify(data), this.options);
  }

  updateCoborrowerInformation(coborrower: Coborrower): Observable<number> {
    coborrower.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "coborrowerInformation/update/", JSON.stringify(coborrower), this.options);
  }

  getAllPayments(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Applicanttype[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Applicanttype[]>(this.url + "paymentTransaction/get", JSON.stringify(data), this.options);
  }

  updatePaymentTransaction(payments: Payments): Observable<number> {
    payments.CLIENT_ID = this.clientId;

    return this.httpClient.put<number>(this.url + "paymentTransaction/update/", JSON.stringify(payments), this.options);
  }


  getCombinedDocumentGroup(filter): Observable<string[]> {
    var KEY = 3
    this.browserLang = localStorage.getItem('locale');
    if (this.browserLang == 'mr')
      KEY = 1
    if (this.browserLang == 'en')
      KEY = 2
    if (this.browserLang == 'kn')
      KEY = 3

    var data = {
      KEY: KEY,
      filter: filter
    };
    return this.httpClient.post<string[]>(this.url + "documentGroup/getDocumentsMultiselect", JSON.stringify(data), this.options);
  }

  createGurantorInfo(gurantorInfo: Gurantorinfo): Observable<number> {
    gurantorInfo.CLIENT_ID = this.clientId;
    //console.log(gurantorInfo)
    return this.httpClient.post<number>(this.url + "guarantorInformation/addGuarentor", JSON.stringify(gurantorInfo), this.options);
  }

  createCoborrowerInfo(coborrower: Coborrower): Observable<number> {
    coborrower.CLIENT_ID = this.clientId;
    //console.log(coborrower)
    return this.httpClient.post<number>(this.url + "coborrowerInformation/addCoborrower", JSON.stringify(coborrower), this.options);
  }

  getAllConstitutes(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Constitutes[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Constitutes[]>(this.url + "firmDirectorsDetails/get", JSON.stringify(data), this.options);
  }

  createConstitutes(constitutes: Constitutes): Observable<number> {
    constitutes.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "firmDirectorsDetails/create/", JSON.stringify(constitutes), this.options);
  }

  updateConstitutes(constitutes: Constitutes): Observable<number> {

    constitutes.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "firmDirectorsDetails/update/", JSON.stringify(constitutes), this.options);
  }


  getFirmInformation(proposalId: number): Observable<number> {
    var data = {
      PROPOSAL_ID: proposalId,

    };
    //console.log(data)
    return this.httpClient.post<number>(this.url + "firmInformation/getFirmInformation", data, this.options);
  }

  createFirmBranchesDetails(firmBranchesDetails: Firmbranchesdetails): Observable<number> {

    firmBranchesDetails.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "firmBranchesDetails/create/", JSON.stringify(firmBranchesDetails), this.options);
  }

  updateFirmBranchesDetails(firmBranchesDetails: Firmbranchesdetails): Observable<number> {

    firmBranchesDetails.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "firmBranchesDetails/update/", JSON.stringify(firmBranchesDetails), this.options);
  }

  getAllCashCreditAddressDetails(CASH_CREDIT_INFORMATION_ID: number): Observable<CashCreditAddressDetails[]> {
    var data = {
      CASH_CREDIT_INFORMATION_ID: CASH_CREDIT_INFORMATION_ID,
    };
    return this.httpClient.post<CashCreditAddressDetails[]>(this.url + "cashCreditAddressDetails/getAddress", JSON.stringify(data), this.options);
  }

  createCashCreditLoanInformationBulk(cashCreditLoanInformation): Observable<number> {
    cashCreditLoanInformation.IS_ANY_PURCHASE_FROM_SISTER_CONCERN_FIRM = cashCreditLoanInformation.IS_ANY_PURCHASE_FROM_SISTER_CONCERN_FIRM ? 1 : 0
    cashCreditLoanInformation.IS_ANY_SALES_FROM_SISTER_CONCERN_FIRM = cashCreditLoanInformation.IS_ANY_SALES_FROM_SISTER_CONCERN_FIRM ? 1 : 0
    cashCreditLoanInformation.IS_STOCK_IS_INSURED = cashCreditLoanInformation.IS_STOCK_IS_INSURED ? 1 : 0
    cashCreditLoanInformation.IS_DEBTOR_LIST_PREPARED_ON_TIME = cashCreditLoanInformation.IS_DEBTOR_LIST_PREPARED_ON_TIME ? 1 : 0
    cashCreditLoanInformation.IS_STOCK_MAINTAINED_AT_OTHER_PLACE = cashCreditLoanInformation.IS_STOCK_MAINTAINED_AT_OTHER_PLACE ? 1 : 0
    cashCreditLoanInformation.IS_THERE_ANY_OBSOLUTE_DAMAGED_STOCK = cashCreditLoanInformation.IS_THERE_ANY_OBSOLUTE_DAMAGED_STOCK ? 1 : 0
    cashCreditLoanInformation.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "cashCreditLoanInformation/addCashCreditInformation", JSON.stringify(cashCreditLoanInformation), this.options);
  }
  getAllTravellingDetailsInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<[]>(this.url + "travellingDetailsInformation/get", JSON.stringify(data), this.options);
  }

  getPageSetttngs(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<string[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<string[]>(this.url + "globalSettings/getPagesInformation", JSON.stringify(data), this.options);
  }
  updatePageSetttngs(data: any): Observable<number> {

    data.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "globalSettings/updatePageInformation", JSON.stringify(data), this.options);
  }


  createNewPorposal(data: Basicinfo): Observable<number> {

    data.CLIENT_ID = this.clientId;
    data.USER_ID = this.userId;
    return this.httpClient.post<number>(this.url + "praposal/createProposal", JSON.stringify(data), this.options);
  }

  getBranchProposalcount(FROM_DATE: any, TO_DATE: any, LOAN_TYPES: string): Observable<string[]> {
    var data = {
      FROM_DATE: FROM_DATE,
      TO_DATE: TO_DATE,
      LOAN_TYPES: LOAN_TYPES
    };
    return this.httpClient.post<string[]>(this.url + "report/getBranchProposalcount", JSON.stringify(data), this.options);
  }
  getBranchProposalAmount(FROM_DATE: any, TO_DATE: any, LOAN_TYPES: string): Observable<string[]> {
    var data = {
      FROM_DATE: FROM_DATE,
      TO_DATE: TO_DATE,
      LOAN_TYPES: LOAN_TYPES
    };
    return this.httpClient.post<string[]>(this.url + "report/getBranchProposalAmount", JSON.stringify(data), this.options);
  }

  getBranchStageProposalcount(FROM_DATE: any, TO_DATE: any, LOAN_TYPES: string): Observable<string[]> {
    var data = {
      FROM_DATE: FROM_DATE,
      TO_DATE: TO_DATE,
      STAGE_IDS: LOAN_TYPES
    };
    return this.httpClient.post<string[]>(this.url + "report/getBranchStageProposalcount", JSON.stringify(data), this.options);
  }
  getBranchStageProposalAmount(FROM_DATE: any, TO_DATE: any, LOAN_TYPES: string): Observable<string[]> {
    var data = {
      FROM_DATE: FROM_DATE,
      TO_DATE: TO_DATE,
      STAGE_IDS: LOAN_TYPES
    };
    return this.httpClient.post<string[]>(this.url + "report/getBranchStageProposalAmount", JSON.stringify(data), this.options);
  }


  getLineChartdata(month: number, year: number, TYPE: string): Observable<any[]> {
    var data = {
      MONTH: month,
      YEAR: year,
      TYPE: TYPE
    };
    return this.httpClient.post<any[]>(this.url + "user/getPraposalChartData", JSON.stringify(data), this.options);
  }

  getDashboardCounts(): Observable<any[]> {

    return this.httpClient.post<any[]>(this.url + "user/getDashboardCounts", {}, this.options);
  }

  loanTypeLineChart(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<any[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<any[]>(this.url + "user/getLoanTypeLineChart", JSON.stringify(data), this.options);
  }

  getBranchLineChart(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<any[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<any[]>(this.url + "user/getBranchLineChart", JSON.stringify(data), this.options);
  }

  getAllEnquiaryLogInformation(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<number> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<number>(this.url + "proposalLogInformation/get", JSON.stringify(data), this.options);
  }

  getPraposalNumber(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<number> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<number>(this.url + "praposal/getPraposalNumber", JSON.stringify(data), this.options);
  }

  getScheduler(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<string[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<string[]>(this.url + "reportScheduler/get", JSON.stringify(data), this.options);
  }
  updateScheduler(data: Scheduler): Observable<number> {

    data.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "reportScheduler/update", JSON.stringify(data), this.options);
  }


  createScheduler(data: Scheduler): Observable<number> {

    data.CLIENT_ID = this.clientId;
    data.USER_ID = this.userId;
    return this.httpClient.post<number>(this.url + "reportScheduler/create", JSON.stringify(data), this.options);
  }
  createScheduler2(data: Scheduler): Observable<number> {

    data.CLIENT_ID = this.clientId;
    data.USER_ID = this.userId;
    return this.httpClient.post<number>(this.url + "reportScheduler/addReportSchedular", JSON.stringify(data), this.options);
  }

  clearconsole() {
    //console.log(window.console);
    if (window.console) {
      console.clear();
    }
  }

  getPrioritySectorLoanReport(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Proposal[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Proposal[]>(this.url + "report/getPrioritySectorLoan", JSON.stringify(data), this.options);
  }
  getWeakerSectorLoanReport(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Proposal[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Proposal[]>(this.url + "report/getWeakerSectionLoan", JSON.stringify(data), this.options);
  }
  getIndustrialmarkingLoanReport(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Proposal[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Proposal[]>(this.url + "report/getIndustrialMarkingLoan", JSON.stringify(data), this.options);
  }
  getRealEstatemarkingLoanReport(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Proposal[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Proposal[]>(this.url + "report/getRealEstateMarkingLoan", JSON.stringify(data), this.options);
  }
  getScrutinyFeeCollected(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Proposal[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Proposal[]>(this.url + "report/getScrutinyFeeCollected", JSON.stringify(data), this.options);
  }
  getBranchWiseScrutinyFeeCollected(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Proposal[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Proposal[]>(this.url + "report/getBranchWiseScrutinyFeeCollection", JSON.stringify(data), this.options);
  }
  getLoanTypehWiseScrutinyFeeCollection(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Proposal[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Proposal[]>(this.url + "report/getLoanTypehWiseScrutinyFeeCollection", JSON.stringify(data), this.options);
  }
  getPraposalStageHistory(PROPOSAL_ID: number): Observable<Proposal[]> {
    var data = {
      PROPOSAL_ID: PROPOSAL_ID
    };
    return this.httpClient.post<Proposal[]>(this.url + "report/getPraposalStageHistory", JSON.stringify(data), this.options);
  }

  getPrioritySectorStatus(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Proposal[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Proposal[]>(this.url + "report/getPrioritySectorStatus", JSON.stringify(data), this.options);
  }

  getWeakerSectorStatus(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Proposal[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Proposal[]>(this.url + "report/getWeakerSectorStatus", JSON.stringify(data), this.options);
  }
  getIndustrialMarkingStatus(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Proposal[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Proposal[]>(this.url + "report/getIndustrialMarkingStatus", JSON.stringify(data), this.options);
  }
  getRealEstateMarkingStatus(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Proposal[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Proposal[]>(this.url + "report/getRealEstateMarkingStatus", JSON.stringify(data), this.options);
  }
  getPrioritySectorTargetCompletion(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Proposal[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Proposal[]>(this.url + "report/getPrioritySectorTargetCompletion", JSON.stringify(data), this.options);
  }
  getWeakerSectorTargetCompletion(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Proposal[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Proposal[]>(this.url + "report/getWeakerSectorTargetCompletion", JSON.stringify(data), this.options);
  }
  getIndustrialMarkingTargetCompletion(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Proposal[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Proposal[]>(this.url + "report/getIndustrialMarkingTargetCompletion", JSON.stringify(data), this.options);
  }

  getRealEstateMarkingTargetCompletion(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Proposal[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Proposal[]>(this.url + "report/getRealEstateMarkingTargetCompletion", JSON.stringify(data), this.options);
  }
  getRoleMaster(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Proposal[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Proposal[]>(this.url + "report/getRoleMaster", JSON.stringify(data), this.options);
  }
  getPraposalDocumentList(PROPOSAL_ID: number): Observable<any[]> {
    var data = { PROPOSAL_ID: PROPOSAL_ID };
    return this.httpClient.post<any[]>(this.url + "report/getPraposalDocumentList", JSON.stringify(data), this.options);
  }

  getPraposalExtraInfoStatus(PROPOSAL_ID: number): Observable<any[]> {
    var data = { PROPOSAL_ID: PROPOSAL_ID };
    return this.httpClient.post<any[]>(this.url + "report/getPraposalExtraInfoStatus", JSON.stringify(data), this.options);
  }

  getPraposalSummary(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<any[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<any[]>(this.url + "report/getPraposalSummary", JSON.stringify(data), this.options);
  }

  getPraposalDocumentSummary(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<any[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<any[]>(this.url + "report/getPraposalDocumentSummary", JSON.stringify(data), this.options);
  }

  getPraposalExtraInfoSummary(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<any[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<any[]>(this.url + "report/getPraposalExtraInfoSummary", JSON.stringify(data), this.options);
  }

  getPraposalCibilSummary(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<any[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<any[]>(this.url + "report/getPraposalCibilSummary", JSON.stringify(data), this.options);
  }

  getBranchPraposalList(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<any[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<any[]>(this.url + "report/getBranchPraposalList", JSON.stringify(data), this.options);
  }

  getBranchLoanTypeStageProposalAmountReport(FROM_DATE: any, TO_DATE: any, LOAN_TYPES: string): Observable<string[]> {
    var data = {
      FROM_DATE: FROM_DATE,
      TO_DATE: TO_DATE,
      STAGE_IDS: LOAN_TYPES
    };
    return this.httpClient.post<string[]>(this.url + "report/getBranchLoanTypeStageProposalAmountReport", JSON.stringify(data), this.options);
  }
  getBranchLoanTypeStageProposalcountReport(FROM_DATE: any, TO_DATE: any, LOAN_TYPES: string): Observable<string[]> {
    var data = {
      FROM_DATE: FROM_DATE,
      TO_DATE: TO_DATE,
      STAGE_IDS: LOAN_TYPES
    };
    return this.httpClient.post<string[]>(this.url + "report/getBranchLoanTypeStageProposalcountReport", JSON.stringify(data), this.options);
  }
  getApplicantMaster(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Proposal[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Proposal[]>(this.url + "report/getApplicantMaster", JSON.stringify(data), this.options);
  }

  getLoanTypeInstallmentFrequencyWisePraposalCount(BRANCH_ID: string): Observable<Proposal[]> {
    var data = { BRANCH_ID: BRANCH_ID };
    return this.httpClient.post<Proposal[]>(this.url + "report/getLoanTypeInstallmentFrequencyWisePraposalCount", JSON.stringify(data), this.options);
  }

  getUserSummary(FROM_DATE: any, TO_DATE: any): Observable<string[]> {
    var data = {
      FROM_DATE: FROM_DATE,
      TO_DATE: TO_DATE

    };
    return this.httpClient.post<string[]>(this.url + "report/getUserSummary", JSON.stringify(data), this.options);
  }

  getAllGoldLoan(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Goldloan[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Goldloan[]>(this.url + "goldLoanInformation/get", JSON.stringify(data), this.options);
  }

  createGoldLoan(GoldLoan): Observable<number> {

    GoldLoan.CLIENT_ID = this.clientId;

    return this.httpClient.post<number>(this.url + "goldLoanInformation/create/", JSON.stringify(GoldLoan), this.options);
  }

  updateGoldLoan(GoldLoan): Observable<number> {

    GoldLoan.CLIENT_ID = this.clientId;

    return this.httpClient.put<number>(this.url + "goldLoanInformation/update/", JSON.stringify(GoldLoan), this.options);
  }

  getDepositInformation(PROPOSAL_ID,DEPOSIT_TYPE){
    let data = {
      PROPOSAL_ID : PROPOSAL_ID,
      DEPOSIT_TYPE : DEPOSIT_TYPE
    }
    return this.httpClient.post(this.url + "termDeposit/get", data, this.options);
  }

  createDepositInformation(data:FRecurringDeposit){

    return this.httpClient.post<number>(this.url + "termDeposit/create", data ,this.options);
  }

  updateDepositInformation(data:FRecurringDeposit){
    return this.httpClient.post<number>(this.url + "termDeposit/update", data ,this.options);
  }


  getGuarantorsInformation(PROPOSAL_ID): Observable<number> {
    var data = {
      PROPOSAL_ID: PROPOSAL_ID
    };
    return this.httpClient.post<number>(this.url + "guarantorInformation/getAllInformation/", JSON.stringify(data), this.options);
  }
  getAddresslist(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<any[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<any[]>(this.url + "addressInformation/getAddress/", JSON.stringify(data), this.options);
  }

  getAllGoldItem(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<GoldItem[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<GoldItem[]>(this.url + "goldItem/get", JSON.stringify(data), this.options);
  }

  createGoldItem(GoldItem: any): Observable<number> {
    GoldItem.CLIENT_ID = this.clientId;
    GoldItem.IS_ACTIVE = GoldItem.IS_ACTIVE?1:0;
    return this.httpClient.post<number>(this.url + "goldItem/create/", JSON.stringify(GoldItem), this.options);
  }

  updateGoldItem(GoldItem: any): Observable<number> {
    GoldItem.IS_ACTIVE = GoldItem.IS_ACTIVE?1:0;
    GoldItem.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "goldItem/update/", JSON.stringify(GoldItem), this.options);
  }
  getAllPurposeofloan(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Purposeofloan[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Purposeofloan[]>(this.url + "loanPurpose/get", JSON.stringify(data), this.options);
  }

  createPurposeofloan(purposeofloan: Purposeofloan): Observable<number> {

    purposeofloan.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "loanPurpose/create/", JSON.stringify(purposeofloan), this.options);
  }

  UpdatePurposeofloan(purposeofloan: Purposeofloan): Observable<number> {

    purposeofloan.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "loanPurpose/update/", JSON.stringify(purposeofloan), this.options);
  }
  getAllTermofLoan(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Termforloan[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Termforloan[]>(this.url + "term/get", JSON.stringify(data), this.options);
  }

  createTermofLoan(termforloan: Termforloan): Observable<number> {

    termforloan.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "term/create/", JSON.stringify(termforloan), this.options);
  }

  UpdateTermofLoan(termforloan: Termforloan): Observable<number> {

    termforloan.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "term/update/", JSON.stringify(termforloan), this.options);
  }
  getAllTypeofinstallment(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, filter: string): Observable<Typeofinstallment[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter
    };
    return this.httpClient.post<Typeofinstallment[]>(this.url + "incomeSource/get", JSON.stringify(data), this.options);
  }

  createTypeofinstallment(typeofinstallment: Typeofinstallment): Observable<number> {

    typeofinstallment.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(this.url + "incomeSource/create/", JSON.stringify(typeofinstallment), this.options);
  }

  UpdateTypeofinstallment(typeofinstallment: Typeofinstallment): Observable<number> {

    typeofinstallment.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(this.url + "incomeSource/update/", JSON.stringify(typeofinstallment), this.options);
  }

  getAllGuarantorProperty_Amulya(data: GIDSort) {
    return this.httpClient.post(this.url + 'jyotimicroGuarantorProperty/get', JSON.stringify(data), this.options)
  }

  UpdateGuarantorProperty_Amulya(data: GpropertyInfo) {
    return this.httpClient.put(this.url + 'jyotimicroGuarantorProperty/update', JSON.stringify(data), this.options)
  }
  UpdateGuarantorInfo_Amulya(data: Guarantor) {

    return this.httpClient.put(this.url + 'jyotimicroGuarantor/update', JSON.stringify(data), this.options);
  }
  getAllEmployer_Amulya(data: GIDSort) {

    return this.httpClient.post(this.url + 'jyotimicroGuarantorPersonalEmployer/get', JSON.stringify(data), this.options)
  }
  UpdateEmployer_Amulya(data: Employer) {
    return this.httpClient.put(this.url + 'jyotimicroGuarantorPersonalEmployer/update', JSON.stringify(data), this.options)
  }
  UpdateBanker_Amulya(data: Banker) {
    return this.httpClient.put(this.url + 'jyotimicroGuarantorPersonalBanker/update', JSON.stringify(data), this.options)
  }
  addEmployer_Amulya(data: Employer) {
    return this.httpClient.post(this.url + 'jyotimicroGuarantorPersonalEmployer/create', JSON.stringify(data), this.options)
  }
  UpdateGuarantorPersonal_Amulya(data: GpersonalInfo) {
    return this.httpClient.put(this.url + 'jyotimicroGuarantorPersonal/update', JSON.stringify(data), this.options)
  }
  
  addGuarantorPersonal_Amulya(data: GpersonalInfo) {
    return this.httpClient.post(this.url + 'jyotimicroGuarantorPersonal/create', JSON.stringify(data), this.options)
  }
  getAllBanker_Amulya(data: GIDSort) {

    return this.httpClient.post(this.url + 'jyotimicroGuarantorPersonalBanker/get', JSON.stringify(data), this.options)
  }
  addBanker_Amulya(data: Banker) {
    return this.httpClient.post(this.url + 'jyotimicroGuarantorPersonalBanker/create', JSON.stringify(data), this.options)
  }
  getGuarantorPersonal_Amulya(data: GIDSort) {
    return this.httpClient.post(this.url + 'jyotimicroGuarantorPersonal/get', JSON.stringify(data), this.options)
  }
  
  addGuarantorProperty_Amulya(data: GpropertyInfo) {
    return this.httpClient.post(this.url + 'jyotimicroGuarantorProperty/create', JSON.stringify(data), this.options)
  }

  UpdateLoanSpecificInfo_Amulya(data: Amulya) {
    data.CLIENT_ID = this.clientId;

    return this.httpClient.put(this.url + 'jyotimicro/update', JSON.stringify(data), this.options);
  }

  addLoanSpecificInfo_Amulya(data: Amulya) {
    data.CLIENT_ID = this.clientId;
    return this.httpClient.post(this.url + 'jyotimicro/create', JSON.stringify(data), this.options);
  }
  getLoanSpecificInfo_Amulya(data: Sort) {


    return this.httpClient.post(this.url + 'jyotimicro/get', JSON.stringify(data), this.options);
  }

  getAllGuarantorInfo_Amulya(data: Sort) {

    return this.httpClient.post(this.url + 'jyotimicroGuarantor/get', JSON.stringify(data), this.options);
  }
  addGuarantorInfo_Amulya(data: Guarantor) {

    return this.httpClient.post(this.url + 'jyotimicroGuarantor/create', JSON.stringify(data), this.options);
  }


  // getDepositInformation(PROPOSAL_ID,DEPOSIT_TYPE){
  //   let data = {
  //     PROPOSAL_ID : PROPOSAL_ID,
  //     DEPOSIT_TYPE :DEPOSIT_TYPE
  //   } 
  //   return this.httpClient.post(this.url + "termDeposit/get", data , this.options);
  // }

  // createDepositInformation(data:FRecurringDeposit){
    
  //   return this.httpClient.post<number>(this.url + "termDeposit/create", data ,this.options);
  // }
  // updateDepositInformation(data:FRecurringDeposit){
  //   return this.httpClient.post<number>(this.url + "termDeposit/update", data ,this.options);
  // }


  createFamilyDetail(data: FamilyDetail){
    return this.httpClient.post(this.url + 'familyDetail/create', JSON.stringify(data), this.options)
  }

  getFamilyDetail(PERSONAL_INFORMATION_ID){

    let data = {
      PERSONAL_INFORMATION_ID : PERSONAL_INFORMATION_ID
    }

    return this.httpClient.post(this.url + 'familyDetail/get', JSON.stringify(data), this.options)
  }

  updateFamilyDetail(data: FamilyDetail){
    return this.httpClient.post(this.url + 'familyDetail/update', JSON.stringify(data), this.options)
  }


  getFilterwiseReports(filter,pageSize,pageIndex) {
    let data = {
      filter:filter,
      pageSize:pageSize,
      pageIndex
    }
    return this.httpClient.post(this.url + "reports/getReport",data, this.options);
  }

  getAllReports(): Observable<Reports[]> {
    return this.httpClient.post<Reports[]>(this.url + "reports/get",'', this.options);
  }

  getAllGoldLoanData(PROPOSAL_ID): Observable<Goldloan1[]> {
    let data1 = {
      PROPOSAL_ID : PROPOSAL_ID
    }
    return this.httpClient.post<Goldloan1[]>(this.url + "goldLoanData/get", JSON.stringify(data1), this.options);
  }

  createGoldLoanData(data1: Goldloan1): Observable<number> {



    return this.httpClient.post<number>(this.url + "goldLoanData/create/", JSON.stringify(data1), this.options);
  }

  updateGoldLoanData(data1: Goldloan1): Observable<number> {



    return this.httpClient.put<number>(this.url + "goldLoanData/update/", JSON.stringify(data1), this.options);
  }

  getAlldepositLoan(PROPOSAL_ID,DEPOSIT_TYPE): Observable<depositLoan[]> {
    var data = {
      PROPOSAL_ID : PROPOSAL_ID,
      DEPOSIT_TYPE : DEPOSIT_TYPE
      
    };
    return this.httpClient.post<depositLoan[]>(this.url + "termDeposit/get", JSON.stringify(data), this.options);
  }

  createdepositLoan(data:depositLoan): Observable<number> {

   

    return this.httpClient.post<number>(this.url + "termDeposit/create", JSON.stringify(data), this.options);
  }

  updatedepositLoan(data:depositLoan): Observable<number> {

    

    return this.httpClient.post<number>(this.url + "termDeposit/update/", JSON.stringify(data), this.options);
  }


  



  getNewAmulya() {

    // data.USER_ID = this.userId

    return this.httpClient.post(this.url + 'amulyaNew/get', '', this.options);
  }

  getCompletedNewAmulya(filterStr:string) {
    let data = {
      filter:filterStr
    }
    // data.USER_ID = this.userId

    return this.httpClient.post(this.url + 'amulyaNew/getCompleted', data, this.options);
  }



  createNewAmulya(data:AmulyaNew) {
    return this.httpClient.post<number>(this.url + "amulyaNew/create", JSON.stringify(data), this.options);
  }

  updateNewAmulya(data:AmulyaNew) {
    return this.httpClient.post<number>(this.url + "amulyaNew/update", JSON.stringify(data), this.options);
  }
  updateProposal(data) {

    return this.httpClient.post<number>(this.url + "praposal/update", JSON.stringify(data), this.options);
  }

  numericId: number;

  getNumericId(): number {
    return this.numericId;
  }

  generateNewNumericId(): void {
    // Generate a new random numeric ID
    this.generateRandomNumericId();
  }

  private generateRandomNumericId(): void {
    // Generate your random numeric ID logic here
    this.numericId = Math.floor(Math.random() * 1000);
  }


  
}
