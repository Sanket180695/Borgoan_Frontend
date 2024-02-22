import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'
import { ExportDirective } from './directives/export.directive';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData, AsyncPipe } from '@angular/common';
import en from '@angular/common/locales/en';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UserComponent } from './pages/CommonModule/Users/user/user.component';
import { UsersComponent } from './pages/CommonModule/Users/users/users.component';
import { DashboardComponent } from './pages/CommonModule/Dashboard/dashboard/dashboard.component';
import { RolesComponent } from './pages/CommonModule/Roles/roles/roles.component';
import { RoleComponent } from './pages/CommonModule/Roles/role/role.component';
import { FormsComponent } from './pages/CommonModule/Forms/forms/forms.component'
import { FormComponent } from './pages/CommonModule/Forms/form/form.component'
import { RoledetailsComponent } from './pages/CommonModule/Roles/roledetails/roledetails.component';
import { Users1Component } from './pages/CommonModule/Try/users1.component';
import { LinkreadComponent } from './pages/CommonModule/linkread/linkread.component';
import { SelectrolepageComponent } from './pages/CommonModule/selectrolepage/selectrolepage.component';
import { AccesspageComponent } from './pages/CommonModule/accesspage/accesspage.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ResetpasswordComponent } from './pages/CommonModule/resetpassword/resetpassword.component';
import { DocumentgroupComponent } from './pages/BasicForms/documentgroup/documentgroup.component';
import { DocumentgroupsComponent } from './pages/BasicForms/documentgroups/documentgroups.component';
import { DocumentsComponent } from './pages/BasicForms/documents/documents.component';
import { DocumentComponent } from './pages/BasicForms/document/document.component';
import { LoantypeComponent } from './pages/BasicForms/loantype/loantype.component';
import { LoantypesComponent } from './pages/BasicForms/loantypes/loantypes.component';
import { ApplicanttypeComponent } from './pages/BasicForms/applicant/applicanttype/applicanttype.component';
import { ApplicanttypesComponent } from './pages/BasicForms/applicant/applicanttypes/applicanttypes.component';
import { BranchComponent } from './pages/BasicForms/branch/branch.component';
import { BranchesComponent } from './pages/BasicForms/branches/branches.component';
import { ProposalstageComponent } from './pages/BasicForms/proposalstage/proposalstage.component';
import { ProposalstagesComponent } from './pages/BasicForms/proposalstages/proposalstages.component';
import { HomepagebannerComponent } from './pages/BasicForms/homepagebanner/homepagebanner.component';
import { HomepagebannersComponent } from './pages/BasicForms/homepagebanners/homepagebanners.component';
import { ApplicantsComponent } from './pages/Applicant/applicants/applicants.component';
import { UseractivitlogsComponent } from './pages/useractivitlogs/useractivitlogs.component';
import { LoantypedocumentmappingComponent } from './pages/BasicForms/loantypedocumentmapping/loantypedocumentmapping.component';
import { ApplicantproposalComponent } from './pages/Proposals/applicantproposal/applicantproposal.component';
import { ProposaldocumentComponent } from './pages/Proposals/proposaldocument/proposaldocument.component';
import { SelectbranchComponent } from './pages/selectbranch/selectbranch.component';
import { NotificationmasterComponent } from './pages/BasicForms/notificationmaster/notificationmaster.component';
import { NotificationmastersComponent } from './pages/BasicForms/notificationmasters/notificationmasters.component';
import { AddproposaldocumentComponent } from './pages/Proposals/addproposaldocument/addproposaldocument.component';
import { ProposalsallComponent } from './pages/Proposal1/proposalsall/proposalsall.component';
import { JoinbranchComponent } from './pages/Proposal1/joinbranch/joinbranch.component';
import { CibilcheckingComponent } from './pages/Proposal1/cibilchecking/cibilchecking.component';
import { ChatinfoComponent } from './pages/Proposals/chatinfo/chatinfo.component';
import { StatuslogsComponent } from './pages/Proposals/statuslogs/statuslogs.component';
import { DetailedinfoComponent } from './pages/Proposals/detailedinfo/detailedinfo.component';
import { Documents2Component } from './pages/Proposals/documents2/documents2.component';
import { ApprovedocumentComponent } from './pages/Proposals/approvedocument/approvedocument.component';
import { ImageViewerModule } from "ngx-image-viewer"
// import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PersonalproposalComponent } from './pages/PersonalProposal/personalproposal/personalproposal.component';
import { PersonalinfoComponent } from './pages/PersonalProposal/personalinfo/personalinfo.component';
import { FinancialinfoComponent } from './pages/PersonalProposal/financialinfo/financialinfo.component';
import { PropertyinfoComponent } from './pages/PersonalProposal/propertyinfo/propertyinfo.component';
import { PropertiesinfoComponent } from './pages/PersonalProposal/propertiesinfo/propertiesinfo.component';
import { PropertiesinfoaddComponent } from './pages/PersonalProposal/propertiesinfoadd/propertiesinfoadd.component';
import { PropertysecurityinfoComponent } from './pages/PersonalProposal/propertysecurityinfo/propertysecurityinfo.component';
import { PrimesecurityinfoComponent } from './pages/PersonalProposal/primesecurityinfo/primesecurityinfo.component';
import { IncomeInfoComponent } from './pages/PersonalProposal/income-info/income-info.component';
import { CreditInfoComponent } from './pages/PersonalProposal/credit-info/credit-info.component';
import { BankLoanInfoComponent } from './pages/PersonalProposal/credit-info/bank-loan-info/bank-loan-info.component';
import { EarlierLoanInfoComponent } from './pages/PersonalProposal/credit-info/earlier-loan-info/earlier-loan-info.component';
import { GuarantorForLoansInfoComponent } from './pages/PersonalProposal/credit-info/guarantor-for-loan/guarantor-for-loan.component';
import { DepositeInBankComponent } from './pages/PersonalProposal/credit-info/deposite-in-bank/deposite-in-bank.component';
import { LoanDemandComponent } from './pages/PersonalProposal/loan-demand/loan-demand.component';
import { DeductionDetailsMasterComponent } from './pages/BasicForms/deduction-details-master/deduction-details-master.component';
import { DeductionDetailsMasterListComponent } from './pages/BasicForms/deduction-details-master-list/deduction-details-master-list.component';
import { ExtraInformationComponent } from './pages/BasicForms/extra-information/extra-information.component';
import { ExtraInformationListComponent } from './pages/BasicForms/extra-information-list/extra-information-list.component';
import { IncomeSourceComponent } from './pages/BasicForms/income-source/income-source.component';
import { IncomeSourceListComponent } from './pages/BasicForms/income-source-list/income-source-list.component';
import { InstallmentFrequencyComponent } from './pages/BasicForms/installment-frequency/installment-frequency.component';
import { InstallmentFrequencyListComponent } from './pages/BasicForms/installment-frequency-list/installment-frequency-list.component';
import { BusinessInfoComponent } from './pages/PersonalProposal/business-info/business-info.component';
import { AgriInfoComponent } from './pages/PersonalProposal/agri-info/agri-info.component';
import { FirmDetailsComponent } from './pages/FirmProposal/firm-details/firm-details.component';
import { EmployeeInfoComponent } from './pages/FirmProposal/firm-details/employee-info/employee-info.component';
import { FactoryUnitInfoComponent } from './pages/FirmProposal/firm-details/factory-unit-info/factory-unit-info.component';
import { ManufacturingInfoComponent } from './pages/FirmProposal/firm-details/manufacturing-info/manufacturing-info.component';
import { PartnersInfoComponent } from './pages/FirmProposal/firm-details/partners-info/partners-info.component';
import { SisterConcernInfoComponent } from './pages/FirmProposal/firm-details/sister-concern-info/sister-concern-info.component';
import { AddProjectionComponent } from './pages/FirmProposal/projection-info/add-projection/add-projection.component';
import { ManagementOfSalesComponent } from './pages/FirmProposal/projection-info/management-of-sales/management-of-sales.component';
import { AddSalesInfoComponent } from './pages/FirmProposal/projection-info/management-of-sales/add-sales-info/add-sales-info.component';
import { BalanceSheetComponent } from './pages/FirmProposal/projection-info/balance-sheet/balance-sheet.component';
import { GuarantorInfoComponent } from './pages/FirmProposal/guarantor-info/guarantor-info.component';
import { ProjectionInfoComponent } from './pages/FirmProposal/projection-info/projection-info.component';
import { LoaninfomationComponent } from './pages/PersonalProposal/loan-demand/loaninfomation/loaninfomation.component';
import { LoanquestionsComponent } from './pages/PersonalProposal/loan-demand/loanquestions/loanquestions.component';
import { ShikshansavadharnloanComponent } from './pages/PersonalProposal/loan-demand/loanquestions/shikshansavadharnloan/shikshansavadharnloan.component';
import { BankloanschemeComponent } from './pages/PersonalProposal/bankloanscheme/bankloanscheme.component';
import { BankloanschemesComponent } from './pages/PersonalProposal/bankloanschemes/bankloanschemes.component';
import { IncomeyearComponent } from './pages/BasicForms/incomeyear/incomeyear.component';
import { IncomeyearsComponent } from './pages/BasicForms/incomeyears/incomeyears.component';
import { AddMeansComponent } from './pages/FirmProposal/projection-info/add-means/add-means.component';
import { SubloantypeComponent } from './pages/PersonalProposal/subloantype/subloantype.component';
import { SubloantypesComponent } from './pages/PersonalProposal/subloantypes/subloantypes.component';
import { PersonalloanComponent } from './pages/PersonalProposal/loan-demand/loanquestions/personalloan/personalloan.component';
import { ConsumerDuarablesLoanComponent } from './pages/PersonalProposal/loan-demand/loanquestions/consumer-durables-loan/consumer-durables-loan.component';
import { VehicleLoanComponent } from './pages/PersonalProposal/loan-demand/loanquestions/vehicle-loan/vehicle-loan.component';
import { MachineryLoanComponent } from './pages/PersonalProposal/loan-demand/loanquestions/machinery-loan/machinery-loan.component';
import { CashCreditLoanComponent } from './pages/PersonalProposal/loan-demand/loanquestions/cash-credit-loan/cash-credit-loan.component';
import { DhanwantariLoanComponent } from './pages/PersonalProposal/loan-demand/loanquestions/dhanwantari-loan/dhanwantari-loan.component';
import { PledgeLoanComponent } from './pages/PersonalProposal/loan-demand/loanquestions/pledge-loan/pledge-loan.component';
import { ShubhVivahLoanComponent } from './pages/PersonalProposal/loan-demand/loanquestions/shubh-vivah-loan/shubh-vivah-loan.component';
import { UtkarshLoanComponent } from './pages/PersonalProposal/loan-demand/loanquestions/utkarsh-loan/utkarsh-loan.component';
import { BuilderfinanceComponent } from './pages/PersonalProposal/loan-demand/loanquestions/builderfinance/builderfinance.component';
import { IndustrialFinanceMachineryComponent } from './pages/PersonalProposal/loan-demand/loanquestions/industrial-finance-machinery/industrial-finance-machinery.component';
import { RealestateIndustrialfinanceComponent } from './pages/PersonalProposal/loan-demand/loanquestions/realestate-industrialfinance/realestate-industrialfinance.component';
import { CashCreditLoanOtherComponent } from './pages/PersonalProposal/loan-demand/loanquestions/cash-credit-loan-other/cash-credit-loan-other.component';
import { WorkordersComponent } from './pages/PersonalProposal/loan-demand/loanquestions/cash-credit-loan-other/workorders/workorders.component';
import { RealestateCommercialComponent } from './pages/PersonalProposal/loan-demand/loanquestions/realestate-commercial/realestate-commercial.component';
import { RealestateResidentialComponent } from './pages/PersonalProposal/loan-demand/loanquestions/realestate-residential/realestate-residential.component';
import { RealestateResincomComponent } from './pages/PersonalProposal/loan-demand/loanquestions/realestate-resincom/realestate-resincom.component';
import { BankschmemsiComponent } from './pages/PersonalProposal/bankschmemsi/bankschmemsi.component';
import { IndustriMarkingComponent } from './pages/PersonalProposal/industri-marking/industri-marking.component';
import { IndustriMarkingsComponent } from './pages/PersonalProposal/industri-markings/industri-markings.component';
import { PrioritySectionComponent } from './pages/PersonalProposal/priority-section/priority-section.component';
import { PrioritySectionsComponent } from './pages/PersonalProposal/priority-sections/priority-sections.component';
import { WeekerSectionComponent } from './pages/PersonalProposal/weeker-section/weeker-section.component';
import { WeekerSectionsComponent } from './pages/PersonalProposal/weeker-sections/weeker-sections.component';

import { RentDiscoumtingLoanComponent } from './pages/PersonalProposal/loan-demand/loanquestions/rent-discoumting-loan/rent-discoumting-loan.component';
import { FamilyPassportInfoComponent } from './pages/PersonalProposal/loan-demand/loanquestions/TourAndTravelLoan/family-passport-info/family-passport-info.component';
import { TourAndTravelLoanComponent } from './pages/PersonalProposal/loan-demand/loanquestions/tour-and-travel-loan/tour-and-travel-loan.component';

import { RealEstateToUpLoanComponent } from './pages/PersonalProposal/loan-demand/loanquestions/real-estate-to-up-loan/real-estate-to-up-loan.component';
import { RepayingComponent } from './pages/PersonalProposal/repaying/repaying.component';
import { DocumentmappingComponent } from './pages/PersonalProposal/documentmapping/documentmapping.component';
import { CoborrowerinfoComponent } from './pages/PersonalProposal/coborrowerinfo/coborrowerinfo.component';
import { PaymentsComponent } from './pages/BranchForms/payments/payments.component';
import { PaymentapprovalComponent } from './pages/BranchForms/paymentapproval/paymentapproval.component';
import { GpersonalinfoComponent } from './pages/GurantorForms/gpersonalinfo/gpersonalinfo.component';
import { GincomeinfoComponent } from './pages/GurantorForms/gincomeinfo/gincomeinfo.component';
import { GfinancialinfoComponent } from './pages/GurantorForms/gfinancialinfo/gfinancialinfo.component';
import { GcreditinfoComponent } from './pages/GurantorForms/gcreditinfo/gcreditinfo.component';
import { GpropertyinfoComponent } from './pages/GurantorForms/gpropertyinfo/gpropertyinfo.component';
import { GdocumentinfoComponent } from './pages/GurantorForms/gdocumentinfo/gdocumentinfo.component';
import { CpersonalinfoComponent } from './pages/Co-borrower/cpersonalinfo/cpersonalinfo.component';
import { CincomeinfoComponent } from './pages/Co-borrower/cincomeinfo/cincomeinfo.component';
import { CfinancialinfoComponent } from './pages/Co-borrower/cfinancialinfo/cfinancialinfo.component';
import { CcreditinfoComponent } from './pages/Co-borrower/ccreditinfo/ccreditinfo.component';
import { CpropertyinfoComponent } from './pages/Co-borrower/cpropertyinfo/cpropertyinfo.component';
import { CdocumentinfoComponent } from './pages/Co-borrower/cdocumentinfo/cdocumentinfo.component';
import { GproposalinfoComponent } from './pages/GurantorForms/gproposalinfo/gproposalinfo.component';
import { CproposalinfoComponent } from './pages/Co-borrower/cproposalinfo/cproposalinfo.component';
import { ConstitutesComponent } from './pages/FirmProposal/firm-details/constitutes/constitutes.component';
import { TravelplanComponent } from './pages/PersonalProposal/loan-demand/loanquestions/TourAndTravelLoan/travelplan/travelplan.component';
import { PasstomainbranchComponent } from './pages/Proposal1/passtomainbranch/passtomainbranch.component';
import { PagesettingComponent } from './pages/GlobalSetting/pagesetting/pagesetting.component';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NewproposalComponent } from './pages/Proposal1/newproposal/newproposal.component';
import { ChangepassComponent } from './pages/CommonModule/changepass/changepass.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { SumbitforreviewComponent } from './pages/PersonalProposal/sumbitforreview/sumbitforreview.component';
import { SumbitforscrutinyComponent } from './pages/PersonalProposal/sumbitforscrutiny/sumbitforscrutiny.component';
import { PaymentUploadComponent } from './pages/BranchForms/payment-upload/payment-upload.component';
import { ProposalcountComponent } from './pages/Reports/proposalcount/proposalcount.component';
import { ProposalamountComponent } from './pages/Reports/proposalamount/proposalamount.component';
import { StagewiseproposalamountComponent } from './pages/Reports/stagewiseproposalamount/stagewiseproposalamount.component';
import { StagewiseproposalcountComponent } from './pages/Reports/stagewiseproposalcount/stagewiseproposalcount.component';
import { StagewiseavgcountComponent } from './pages/Reports/stagewiseavgcount/stagewiseavgcount.component';
import { LoantypewiseavgcountComponent } from './pages/Reports/loantypewiseavgcount/loantypewiseavgcount.component';
import { BoardapprovalComponent } from './pages/Proposals/boardapproval/boardapproval.component';
import { LoandisbursementComponent } from './pages/Proposals/loandisbursement/loandisbursement.component';
import { AdmindashboardComponent } from './pages/CommonModule/admindashboard/admindashboard.component';
// import { ChartsModule } from 'ng2-charts';
import { LoantypewisebranchwisecountComponent } from './pages/Reports/loantypewisebranchwisecount/loantypewisebranchwisecount.component';
import { LoantypewisebranchwiseamountComponent } from './pages/Reports/loantypewisebranchwiseamount/loantypewisebranchwiseamount.component';
import { UserwiseproposalcountComponent } from './pages/Reports/userwiseproposalcount/userwiseproposalcount.component';
import { ApplicantsummeryComponent } from './pages/Reports/applicantsummery/applicantsummery.component';
import { DailystageactivityComponent } from './pages/Reports/dailystageactivity/dailystageactivity.component';
import { ApplicantreportComponent } from './pages/Reports/applicantreport/applicantreport.component';
import { OverdueproposalComponent } from './pages/Reports/overdueproposal/overdueproposal.component';
import { ScheduleComponent } from './pages/Reports/schedule/schedule.component';
import { ProposaldocumentsComponent } from './pages/Reports/proposaldocuments/proposaldocuments.component';
import { ProposalextraiformationstatusComponent } from './pages/Reports/proposalextraiformationstatus/proposalextraiformationstatus.component';
import { ProposalcibilsummaryComponent } from './pages/Reports/proposalcibilsummary/proposalcibilsummary.component';
import { ProposalguarantorComponent } from './pages/Reports/proposalguarantor/proposalguarantor.component';
import { ProposalcoborrowerComponent } from './pages/Reports/proposalcoborrower/proposalcoborrower.component';
import { DocumentgroupsreportComponent } from './pages/Reports/documentgroupsreport/documentgroupsreport.component';
import { DocumentsreportComponent } from './pages/Reports/documentsreport/documentsreport.component';
import { ProposalextrainformationsummaryComponent } from './pages/Reports/proposalextrainformationsummary/proposalextrainformationsummary.component';
import { ProposaldocumentsummaryComponent } from './pages/Reports/proposaldocumentsummary/proposaldocumentsummary.component';
import { ProposalsummaryComponent } from './pages/Reports/proposalsummary/proposalsummary.component';
import { LoantypeinstallmentfrequencywiseComponent } from './pages/Reports/loantypeinstallmentfrequencywise/loantypeinstallmentfrequencywise.component';
import { BranchinstallmentfrequencywiseComponent } from './pages/Reports/branchinstallmentfrequencywise/branchinstallmentfrequencywise.component';
import { ScrutinypaymenttransactonComponent } from './pages/Reports/scrutinypaymenttransacton/scrutinypaymenttransacton.component';
import { ProposalloginfoComponent } from './pages/Reports/proposalloginfo/proposalloginfo.component';
import { ProposallogsummaryComponent } from './pages/Reports/proposallogsummary/proposallogsummary.component';
import { PrioritysectorloanComponent } from './pages/Reports/prioritysectorloan/prioritysectorloan.component';
import { WeakersectorloanComponent } from './pages/Reports/weakersectorloan/weakersectorloan.component';
import { IndustrialmarkingloanComponent } from './pages/Reports/industrialmarkingloan/industrialmarkingloan.component';
import { RealestatemarkingloanComponent } from './pages/Reports/realestatemarkingloan/realestatemarkingloan.component';
import { ScrutinyfeecollectionComponent } from './pages/Reports/scrutinyfeecollection/scrutinyfeecollection.component';
import { BranchwisescrutinyfeecollectionComponent } from './pages/Reports/branchwisescrutinyfeecollection/branchwisescrutinyfeecollection.component';
import { LoantypewisescrutinyfeecollectionComponent } from './pages/Reports/loantypewisescrutinyfeecollection/loantypewisescrutinyfeecollection.component';
import { ProposalstagehistoryreportComponent } from './pages/Reports/proposalstagehistoryreport/proposalstagehistoryreport.component';
import { PrioritysectorstatusComponent } from './pages/Reports/prioritysectorstatus/prioritysectorstatus.component';
import { WeekersectionstatusComponent } from './pages/Reports/weekersectionstatus/weekersectionstatus.component';
import { IndustrialmarkingstatusComponent } from './pages/Reports/industrialmarkingstatus/industrialmarkingstatus.component';
import { RealestatemarkingstatusComponent } from './pages/Reports/realestatemarkingstatus/realestatemarkingstatus.component';
import { PrioritysectortargetcompletionComponent } from './pages/Reports/prioritysectortargetcompletion/prioritysectortargetcompletion.component';
import { WeekersectortargetcompletionComponent } from './pages/Reports/weekersectortargetcompletion/weekersectortargetcompletion.component';
import { IndustrialmarkingtargetcompletionComponent } from './pages/Reports/industrialmarkingtargetcompletion/industrialmarkingtargetcompletion.component';
import { RealestatemarkingtargetcompletionComponent } from './pages/Reports/realestatemarkingtargetcompletion/realestatemarkingtargetcompletion.component';
import { RolemasterreportComponent } from './pages/Reports/rolemasterreport/rolemasterreport.component';
import { FormprintComponent } from './pages/formprint/formprint.component';
import { GoldloanComponent } from './pages/PersonalProposal/loan-demand/loanquestions/goldloan/goldloan.component';
import { DepositeloanComponent } from './pages/PersonalProposal/loan-demand/loanquestions/depositeloan/depositeloan.component';
import { GoldItemsComponent } from './pages/BasicForms/gold-items/gold-items.component';
import { GoldItemComponent } from './pages/BasicForms/gold-item/gold-item.component';
import { TextMaskModule } from 'angular2-text-mask';
import { HouserentinfoComponent } from './pages/PersonalProposal/houserentinfo/houserentinfo.component';
import { SavingaccdetailsComponent } from './pages/PersonalProposal/savingaccdetails/savingaccdetails.component';
import { FinancialtermdepositComponent } from './pages/PersonalProposal/financialtermdeposit/financialtermdeposit.component';
import { FinancialcurrentdepositComponent } from './pages/PersonalProposal/financialcurrentdeposit/financialcurrentdeposit.component';
import { FinancialrecurringdepositComponent } from './pages/PersonalProposal/financialrecurringdeposit/financialrecurringdeposit.component';
import { IncomesalaryinfoComponent } from './pages/PersonalProposal/incomesalaryinfo/incomesalaryinfo.component';
import { AgricinfoComponent } from './pages/PersonalProposal/agricinfo/agricinfo.component';
import { ExpenditureinfoComponent } from './pages/PersonalProposal/expenditureinfo/expenditureinfo.component';
import { PurposeOfLoanComponent } from './pages/PersonalProposal/PurposeOfLoan/purpose-of-loan/purpose-of-loan.component';
import { PurposeOfLoansComponent } from './pages/PersonalProposal/PurposeOfLoan/purpose-of-loans/purpose-of-loans.component';
import { TermForLoanComponent } from './pages/PersonalProposal/TermOfLoan/term-for-loan/term-for-loan.component';
import { TermForLoansComponent } from './pages/PersonalProposal/TermOfLoan/term-for-loans/term-for-loans.component';
import { TypeOfInstallmentComponent } from './pages/PersonalProposal/TypeOfInstallment/type-of-installment/type-of-installment.component';
import { TypeOfInstallmentsComponent } from './pages/PersonalProposal/TypeOfInstallment/type-of-installments/type-of-installments.component';
import { JointaccountComponent } from './pages/PersonalProposal/jointaccount/jointaccount.component';
import { JointaccountlistComponent } from './pages/PersonalProposal/jointaccountlist/jointaccountlist.component';
import { CotherComponent } from './pages/Co-borrower/cother/cother.component';
import { AmulyaloanComponent } from './pages/PersonalProposal/loan-demand/loanquestions/amulyaloan/amulyaloan.component';
import { MylistloanComponent } from './pages/Proposal1/mylistloan/mylistloan.component';
import { LoanoffComponent } from './pages/Proposal1/loanoff/loanoff.component';
import { Mylistforho1Component } from './pages/Proposal1/mylistforho1/mylistforho1.component';
import { AssignbranchesComponent } from './pages/BasicForms/assignbranches/assignbranches.component';
import { AssignbrancheslistComponent } from './pages/BasicForms/assignbrancheslist/assignbrancheslist.component';
import { FlushProposalComponent } from './admin-panel/flush-proposal/flush-proposal.component';
import { DocumentDownloadComponent } from './admin-panel/document-download/document-download.component';
import { CpropertiesaddComponent } from './pages/Co-borrower/cpropertiesadd/cpropertiesadd.component';
import { AmulyaDisburseComponent } from './pages/PersonalProposal/amulya-disburse/amulya-disburse.component';
import { FixeddepositdetailComponent } from './pages/PersonalProposal/fixeddepositdetail/fixeddepositdetail.component';
import { DepositloanDisburseComponent } from './pages/PersonalProposal/depositloan-disburse/depositloan-disburse.component';
import { ReportMasterComponent } from './pages/Proposal1/report-master/report-master.component';
import { ProposalFilterwiseReportComponent } from './pages/Proposal1/report-master/proposal-filterwise-report/proposal-filterwise-report.component';
import { TableComponent } from './pages/PersonalProposal/table/table.component';
import { GoldDisburseComponent } from './pages/PersonalProposal/gold-disburse/gold-disburse.component';
import { DepositDisburseComponent } from './pages/PersonalProposal/deposit-disburse/deposit-disburse.component';
import { PendingListMicroComponent } from './pages/Proposal1/pending-list-micro/pending-list-micro.component';
import { ReadyForBoardMicroComponent } from './pages/Proposal1/ready-for-board-micro/ready-for-board-micro.component';
import { SanctionListMicroComponent } from './pages/Proposal1/sanction-list-micro/sanction-list-micro.component';
import { PreviewAmulyaFormComponent } from './pages/Proposal1/preview-amulya-form/preview-amulya-form.component';
import { DisbursedProposalsListComponent } from './pages/Proposal1/disbursed-proposals-list/disbursed-proposals-list.component';
import { ApprovedListComponent } from './pages/Proposal1/approved-list/approved-list.component';
import { RejectedListComponent } from './pages/Proposal1/rejected-list/rejected-list.component';
// LoanoffComponent

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    ApprovedListComponent,
    RejectedListComponent,
    GoldDisburseComponent,
    DepositDisburseComponent,
    TableComponent,
    AmulyaDisburseComponent,
    DepositloanDisburseComponent,
    FlushProposalComponent,
    DocumentDownloadComponent,
    CpropertiesaddComponent,
    AddMeansComponent,
    TravelplanComponent,
    PagesettingComponent,
    RentDiscoumtingLoanComponent,
    RealEstateToUpLoanComponent,
    FamilyPassportInfoComponent,
    TourAndTravelLoanComponent,
    IndustriMarkingComponent,
    IndustriMarkingsComponent,
    PrioritySectionComponent,
    PrioritySectionsComponent,
    WeekerSectionComponent,
    WeekerSectionsComponent,
    CashCreditLoanOtherComponent,
    WorkordersComponent,
    RealestateResincomComponent,
    RealestateResidentialComponent,
    RealestateCommercialComponent,
    IndustrialFinanceMachineryComponent,
    RealestateIndustrialfinanceComponent,
    ShubhVivahLoanComponent,
    BuilderfinanceComponent,
    CashCreditLoanComponent,
    UtkarshLoanComponent,
    PledgeLoanComponent,
    MachineryLoanComponent,
    DhanwantariLoanComponent,
    ConsumerDuarablesLoanComponent,
    VehicleLoanComponent,
    FirmDetailsComponent,
    EmployeeInfoComponent,
    ProjectionInfoComponent,
    BalanceSheetComponent,
    FactoryUnitInfoComponent,
    ManufacturingInfoComponent,
    SisterConcernInfoComponent,
    GuarantorInfoComponent,
    AddSalesInfoComponent,
    ManagementOfSalesComponent,
    AddProjectionComponent,
    PartnersInfoComponent,
    DeductionDetailsMasterComponent,
    BusinessInfoComponent,
    AgriInfoComponent,
    DeductionDetailsMasterListComponent,
    ExtraInformationComponent,
    ExtraInformationListComponent,
    IncomeSourceComponent,
    IncomeSourceListComponent,
    InstallmentFrequencyComponent,
    InstallmentFrequencyListComponent,
    ExportDirective,
    BankLoanInfoComponent,
    EarlierLoanInfoComponent,
    GuarantorForLoansInfoComponent,
    DepositeInBankComponent,
    LoginComponent,
    UserComponent,
    UsersComponent,
    DashboardComponent,
    RolesComponent,
    RoleComponent,
    FormsComponent,
    FormComponent,
    RoledetailsComponent,
    Users1Component,
    LinkreadComponent,
    SelectrolepageComponent,
    AccesspageComponent,
    ResetpasswordComponent,
    DocumentgroupComponent,
    DocumentgroupsComponent,
    DocumentsComponent,
    DocumentComponent,
    LoantypeComponent,
    LoantypesComponent,
    ApplicanttypeComponent,
    ApplicanttypesComponent,
    BranchComponent,
    BranchesComponent,
    ProposalstageComponent,
    ProposalstagesComponent,
    HomepagebannerComponent,
    HomepagebannersComponent,
    ApplicantsComponent,
    UseractivitlogsComponent,
    LoantypedocumentmappingComponent,
    ApplicantproposalComponent,
    ProposaldocumentComponent,
    SelectbranchComponent,
    NotificationmasterComponent,
    NotificationmastersComponent,
    AddproposaldocumentComponent,
    ProposalsallComponent,
    JoinbranchComponent,
    CibilcheckingComponent,
    ChatinfoComponent,
    StatuslogsComponent,
    DetailedinfoComponent,
    Documents2Component,
    ApprovedocumentComponent,
    PersonalproposalComponent,
    PersonalinfoComponent,
    FinancialinfoComponent,
    PropertyinfoComponent,
    PropertiesinfoComponent,
    PropertiesinfoaddComponent,
    PropertysecurityinfoComponent,
    PrimesecurityinfoComponent,
    IncomeInfoComponent,
    CreditInfoComponent,
    LoanDemandComponent,
    LoaninfomationComponent,
    LoanquestionsComponent,
    ShikshansavadharnloanComponent,
    BankloanschemeComponent,
    BankloanschemesComponent,
    IncomeyearComponent,
    IncomeyearsComponent,
    SubloantypeComponent,
    SubloantypesComponent,
    PersonalloanComponent,
    BankschmemsiComponent,
    RepayingComponent,
    DocumentmappingComponent,
    CoborrowerinfoComponent,
    PaymentsComponent,
    PaymentapprovalComponent,
    GpersonalinfoComponent,
    GincomeinfoComponent,
    GfinancialinfoComponent,
    GcreditinfoComponent,
    GpropertyinfoComponent,
    GdocumentinfoComponent,
    CpersonalinfoComponent,
    CincomeinfoComponent,
    CfinancialinfoComponent,
    CcreditinfoComponent,
    CpropertyinfoComponent,
    CdocumentinfoComponent,
    GproposalinfoComponent,
    CproposalinfoComponent,
    ConstitutesComponent,
    PasstomainbranchComponent,
    NewproposalComponent,
    ChangepassComponent,
    SumbitforreviewComponent,
    SumbitforscrutinyComponent,
    PaymentUploadComponent,
    ProposalcountComponent,
    ProposalamountComponent,
    StagewiseproposalamountComponent,
    StagewiseproposalcountComponent,
    StagewiseavgcountComponent,
    LoantypewiseavgcountComponent,
    BoardapprovalComponent,
    LoandisbursementComponent,
    AdmindashboardComponent,
    LoantypewisebranchwisecountComponent,
    LoantypewisebranchwiseamountComponent,
    UserwiseproposalcountComponent,
    ApplicantsummeryComponent,
    DailystageactivityComponent,
    ApplicantreportComponent,
    OverdueproposalComponent,
    ScheduleComponent,
    ProposaldocumentsComponent,
    ProposalextraiformationstatusComponent,
    ProposalcibilsummaryComponent,
    ProposalguarantorComponent,
    ProposalcoborrowerComponent,
    DocumentgroupsreportComponent,
    DocumentsreportComponent,
    ProposalextrainformationsummaryComponent,
    ProposaldocumentsummaryComponent,
    ProposalsummaryComponent,
    LoantypeinstallmentfrequencywiseComponent,
    BranchinstallmentfrequencywiseComponent,
    ScrutinypaymenttransactonComponent,
    ProposalloginfoComponent,
    ProposallogsummaryComponent,
    PrioritysectorloanComponent,
    WeakersectorloanComponent,
    IndustrialmarkingloanComponent,
    RealestatemarkingloanComponent,
    ScrutinyfeecollectionComponent,
    BranchwisescrutinyfeecollectionComponent,
    LoantypewisescrutinyfeecollectionComponent,
    ProposalstagehistoryreportComponent,
    PrioritysectorstatusComponent,
    WeekersectionstatusComponent,
    IndustrialmarkingstatusComponent,
    RealestatemarkingstatusComponent,
    PrioritysectortargetcompletionComponent,
    WeekersectortargetcompletionComponent,
    IndustrialmarkingtargetcompletionComponent,
    RealestatemarkingtargetcompletionComponent,
    RolemasterreportComponent,
    FormprintComponent,
    GoldloanComponent,
    DepositeloanComponent,
    GoldItemsComponent,
    GoldItemComponent,
    HouserentinfoComponent,
    SavingaccdetailsComponent,
    FinancialtermdepositComponent,
    FinancialcurrentdepositComponent,
    FinancialrecurringdepositComponent,
    IncomesalaryinfoComponent,
    AgricinfoComponent,
    ExpenditureinfoComponent,
    PurposeOfLoanComponent,
    PurposeOfLoansComponent,
    TermForLoanComponent,
    TermForLoansComponent,
    TypeOfInstallmentComponent,
    TypeOfInstallmentsComponent,
    JointaccountComponent,
    JointaccountlistComponent,
    CotherComponent,
    AmulyaloanComponent,
    MylistloanComponent,
    LoanoffComponent,
    Mylistforho1Component,
    AssignbranchesComponent,
    AssignbrancheslistComponent,
    FixeddepositdetailComponent,
    ReportMasterComponent,
    ProposalFilterwiseReportComponent,
    DisbursedProposalsListComponent,

    PendingListMicroComponent,
    ReadyForBoardMicroComponent,
    SanctionListMicroComponent,

    PreviewAmulyaFormComponent,

  ],
  imports: [
    BrowserModule,
    // PdfViewerModule,
    ImageViewerModule,
    Ng2SearchPipeModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    NgOtpInputModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    // ChartsModule,
    ImageViewerModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    NgIdleKeepaliveModule.forRoot(),
    TextMaskModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, CookieService, AsyncPipe,
  {
    provide: APP_INITIALIZER,
    useFactory: appInitializerFactory,
    deps: [TranslateService],
    multi: true
  }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function appInitializerFactory(translate: TranslateService) {
  return () => {
    if (localStorage.getItem('locale')) {
      const browserLang = localStorage.getItem('locale');
      return translate.use(browserLang.match(/kn|mr|en/) ? browserLang : 'kn').toPromise();
    } else {
      localStorage.setItem('locale', 'kn');
      translate.setDefaultLang('kn');
      return translate.use('kn').toPromise();
    }


  };
}