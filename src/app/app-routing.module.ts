import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/CommonModule/Dashboard/dashboard/dashboard.component';
import { UsersComponent } from './pages/CommonModule/Users/users/users.component';
import { RolesComponent } from './pages/CommonModule/Roles/roles/roles.component';
import { LoginComponent } from './login/login.component';
import { FormsComponent } from './pages/CommonModule/Forms/forms/forms.component';
import { Users1Component } from './pages/CommonModule/Try/users1.component';
import { LinkreadComponent } from './pages/CommonModule/linkread/linkread.component';
import { SelectrolepageComponent } from './pages/CommonModule/selectrolepage/selectrolepage.component';
import { AccesspageComponent } from './pages/CommonModule/accesspage/accesspage.component';
import { ResetpasswordComponent } from './pages/CommonModule/resetpassword/resetpassword.component';
import { DocumentgroupsComponent } from './pages/BasicForms/documentgroups/documentgroups.component';
import { DocumentsComponent } from './pages/BasicForms/documents/documents.component';
import { LoantypesComponent } from './pages/BasicForms/loantypes/loantypes.component';
import { ApplicanttypesComponent } from './pages/BasicForms/applicant/applicanttypes/applicanttypes.component';
import { BranchesComponent } from './pages/BasicForms/branches/branches.component';
import { ProposalstagesComponent } from './pages/BasicForms/proposalstages/proposalstages.component';
import { HomepagebannersComponent } from './pages/BasicForms/homepagebanners/homepagebanners.component';
import { ApplicantsComponent } from './pages/Applicant/applicants/applicants.component';
import { UseractivitlogsComponent } from './pages/useractivitlogs/useractivitlogs.component';
import { SelectbranchComponent } from './pages/selectbranch/selectbranch.component';
import { NotificationmastersComponent } from './pages/BasicForms/notificationmasters/notificationmasters.component';
import { ProposalsallComponent } from './pages/Proposal1/proposalsall/proposalsall.component';
import { ExtraInformationListComponent } from './pages/BasicForms/extra-information-list/extra-information-list.component';
import { IncomeSourceListComponent } from './pages/BasicForms/income-source-list/income-source-list.component';
import { DeductionDetailsMasterListComponent } from './pages/BasicForms/deduction-details-master-list/deduction-details-master-list.component';
import { InstallmentFrequencyListComponent } from './pages/BasicForms/installment-frequency-list/installment-frequency-list.component';
import { BankloanschemesComponent } from './pages/PersonalProposal/bankloanschemes/bankloanschemes.component';
import { IncomeyearsComponent } from './pages/BasicForms/incomeyears/incomeyears.component';
import { SubloantypesComponent } from './pages/PersonalProposal/subloantypes/subloantypes.component';
import { IndustriMarkingsComponent } from './pages/PersonalProposal/industri-markings/industri-markings.component';
import { PrioritySectionsComponent } from './pages/PersonalProposal/priority-sections/priority-sections.component';
import { WeekerSectionsComponent } from './pages/PersonalProposal/weeker-sections/weeker-sections.component';

import { PaymentsComponent } from './pages/BranchForms/payments/payments.component';
import { PagesettingComponent } from './pages/GlobalSetting/pagesetting/pagesetting.component';
import { ChangepassComponent } from './pages/CommonModule/changepass/changepass.component';
import { ProposalcountComponent } from './pages/Reports/proposalcount/proposalcount.component';
import { ProposalamountComponent } from './pages/Reports/proposalamount/proposalamount.component';
import { StagewiseproposalcountComponent } from './pages/Reports/stagewiseproposalcount/stagewiseproposalcount.component';
import { StagewiseproposalamountComponent } from './pages/Reports/stagewiseproposalamount/stagewiseproposalamount.component';
import { StagewiseavgcountComponent } from './pages/Reports/stagewiseavgcount/stagewiseavgcount.component';
import { LoantypewiseavgcountComponent } from './pages/Reports/loantypewiseavgcount/loantypewiseavgcount.component';
import { AdmindashboardComponent } from './pages/CommonModule/admindashboard/admindashboard.component';
import { ProposaldocumentsComponent } from './pages/Reports/proposaldocuments/proposaldocuments.component';
import { ProposalextraiformationstatusComponent } from './pages/Reports/proposalextraiformationstatus/proposalextraiformationstatus.component';
import { OverdueproposalComponent } from './pages/Reports/overdueproposal/overdueproposal.component';
import { ProposalcibilsummaryComponent } from './pages/Reports/proposalcibilsummary/proposalcibilsummary.component';
import { DocumentgroupsreportComponent } from './pages/Reports/documentgroupsreport/documentgroupsreport.component';
import { DocumentsreportComponent } from './pages/Reports/documentsreport/documentsreport.component';
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
import { RealestatemarkingstatusComponent } from './pages/Reports/realestatemarkingstatus/realestatemarkingstatus.component';
import { IndustrialmarkingstatusComponent } from './pages/Reports/industrialmarkingstatus/industrialmarkingstatus.component';
import { PrioritysectortargetcompletionComponent } from './pages/Reports/prioritysectortargetcompletion/prioritysectortargetcompletion.component';
import { WeekersectortargetcompletionComponent } from './pages/Reports/weekersectortargetcompletion/weekersectortargetcompletion.component';
import { IndustrialmarkingtargetcompletionComponent } from './pages/Reports/industrialmarkingtargetcompletion/industrialmarkingtargetcompletion.component';
import { RealestatemarkingtargetcompletionComponent } from './pages/Reports/realestatemarkingtargetcompletion/realestatemarkingtargetcompletion.component';
import { RolemasterreportComponent } from './pages/Reports/rolemasterreport/rolemasterreport.component';
import { ProposalsummaryComponent } from './pages/Reports/proposalsummary/proposalsummary.component';
import { ProposaldocumentsummaryComponent } from './pages/Reports/proposaldocumentsummary/proposaldocumentsummary.component';
import { ProposalextrainformationsummaryComponent } from './pages/Reports/proposalextrainformationsummary/proposalextrainformationsummary.component';
import { ApplicantsummeryComponent } from './pages/Reports/applicantsummery/applicantsummery.component';
import { ProposalguarantorComponent } from './pages/Reports/proposalguarantor/proposalguarantor.component';
import { ProposalcoborrowerComponent } from './pages/Reports/proposalcoborrower/proposalcoborrower.component';
import { LoantypeinstallmentfrequencywiseComponent } from './pages/Reports/loantypeinstallmentfrequencywise/loantypeinstallmentfrequencywise.component';
import { UserwiseproposalcountComponent } from './pages/Reports/userwiseproposalcount/userwiseproposalcount.component';
import { GoldItemsComponent } from './pages/BasicForms/gold-items/gold-items.component';
import { ScheduleComponent } from './pages/Reports/schedule/schedule.component';
import { TermForLoansComponent } from './pages/PersonalProposal/TermOfLoan/term-for-loans/term-for-loans.component';
import { PurposeOfLoansComponent } from './pages/PersonalProposal/PurposeOfLoan/purpose-of-loans/purpose-of-loans.component';
import { JointaccountComponent } from './pages/PersonalProposal/jointaccount/jointaccount.component';
import { JointaccountlistComponent } from './pages/PersonalProposal/jointaccountlist/jointaccountlist.component';
import { LoanoffComponent } from './pages/Proposal1/loanoff/loanoff.component';
import { MylistloanComponent } from './pages/Proposal1/mylistloan/mylistloan.component';
import { Mylistforho1Component } from './pages/Proposal1/mylistforho1/mylistforho1.component';
import { AssignbrancheslistComponent } from './pages/BasicForms/assignbrancheslist/assignbrancheslist.component';
import { FlushProposalComponent } from './admin-panel/flush-proposal/flush-proposal.component';
import { DocumentDownloadComponent } from './admin-panel/document-download/document-download.component';
import { ReportMasterComponent } from './pages/Proposal1/report-master/report-master.component';
import { PendingListMicroComponent } from './pages/Proposal1/pending-list-micro/pending-list-micro.component';
import { ReadyForBoardMicroComponent } from './pages/Proposal1/ready-for-board-micro/ready-for-board-micro.component';
import { SanctionListMicroComponent } from './pages/Proposal1/sanction-list-micro/sanction-list-micro.component';
import { ApprovedListComponent } from './pages/Proposal1/approved-list/approved-list.component';
import { RejectedListComponent } from './pages/Proposal1/rejected-list/rejected-list.component';
import { DisbursedProposalsListComponent } from './pages/Proposal1/disbursed-proposals-list/disbursed-proposals-list.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch:'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'forms', component: FormsComponent },
  { path: 'try', component: Users1Component },
  { path: 'studentReport/123dssdfv', component: LinkreadComponent },
  { path: 'selectrole', component: SelectrolepageComponent },
  { path: 'pagenotfound', component: AccesspageComponent },
  { path: 'resetpassword', component: ResetpasswordComponent },
  { path: 'documentgroups', component: DocumentgroupsComponent },
  { path: 'documents', component: DocumentsComponent },
  { path: 'loantypes', component: LoantypesComponent },
  { path: 'applicanttypes', component: ApplicanttypesComponent },
  { path: 'branches', component: BranchesComponent },
  { path: 'proposalstages', component: ProposalstagesComponent },
  { path: 'homepagebanners', component: HomepagebannersComponent },
  { path: 'applicants', component: ApplicantsComponent },
  { path: 'useractivitylogs', component: UseractivitlogsComponent },
  { path: 'proposals', component: ProposalsallComponent },
  { path: 'selectbranch', component: SelectbranchComponent },
  { path: 'notifications', component: NotificationmastersComponent },
  { path: 'extrainformation', component: ExtraInformationListComponent },
  { path: 'incomesources', component: IncomeSourceListComponent },
  { path: 'deductiondetails', component: DeductionDetailsMasterListComponent },
  { path: 'installmentfrequency', component: InstallmentFrequencyListComponent },
  { path: 'bankloanscheme', component: BankloanschemesComponent },
  { path: 'incomeyear', component: IncomeyearsComponent },
  { path: 'golditems', component: GoldItemsComponent },
  { path: 'subloantypes', component: SubloantypesComponent },
  { path: 'industrialmarking', component: IndustriMarkingsComponent },
  { path: 'prioritysection', component: PrioritySectionsComponent },
  { path: 'weekersection', component: WeekerSectionsComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: 'pagesetting', component: PagesettingComponent },
  { path: 'changepassword', component: ChangepassComponent },
  { path: 'loantypewiseloancount', component: ProposalcountComponent },
  { path: 'loantypewiseloanamount', component: ProposalamountComponent },
  { path: 'stagewiseloancount', component: StagewiseproposalcountComponent },
  { path: 'stagewiseavgcount', component: StagewiseavgcountComponent },
  { path: 'loantypewiseavgcount', component: LoantypewiseavgcountComponent },
  { path: 'stagewiseloanamount', component: StagewiseproposalamountComponent },
  { path: 'home', component: AdmindashboardComponent },
  { path: 'proposaldocuments', component: ProposaldocumentsComponent },
  { path: 'proposalextrainfo', component: ProposalextraiformationstatusComponent },
  { path: 'branchproposallist', component: OverdueproposalComponent },
  { path: 'proposalcibilsummary', component: ProposalcibilsummaryComponent },
  { path: 'documentgroupreport', component: DocumentgroupsreportComponent },
  { path: 'documentreport', component: DocumentsreportComponent },
  { path: 'paymenttransactions', component: ScrutinypaymenttransactonComponent },
  { path: 'proposalloginfo', component: ProposalloginfoComponent },
  { path: 'proposallogsummary', component: ProposallogsummaryComponent },
  { path: 'prioritysectorloan', component: PrioritysectorloanComponent },
  { path: 'weakersectorloan', component: WeakersectorloanComponent },
  { path: 'industrialmarkingloan', component: IndustrialmarkingloanComponent },
  { path: 'realestatemarkingloan', component: RealestatemarkingloanComponent },
  { path: 'scrutinyfeecollection', component: ScrutinyfeecollectionComponent },
  { path: 'branchwisescrutinyfeecollection', component: BranchwisescrutinyfeecollectionComponent },
  { path: 'loantypewisescrutinyfeecollection', component: LoantypewisescrutinyfeecollectionComponent },
  { path: 'proposalstagehistory', component: ProposalstagehistoryreportComponent },
  { path: 'prioritysectorstatus', component: PrioritysectorstatusComponent },
  { path: 'weekersectionstatus', component: WeekersectionstatusComponent },
  { path: 'realestatemarkingstatus', component: RealestatemarkingstatusComponent },
  { path: 'industrialmarkingstatus', component: IndustrialmarkingstatusComponent },
  { path: 'prioritysectortargetcompletion', component: PrioritysectortargetcompletionComponent },
  { path: 'weekersectortargetcompletion', component: WeekersectortargetcompletionComponent },
  { path: 'industrialmarkingtargetcompletion', component: IndustrialmarkingtargetcompletionComponent },
  { path: 'realestatemarkingtargetcompletion', component: RealestatemarkingtargetcompletionComponent },
  { path: 'rolemasterreport', component: RolemasterreportComponent },
  { path: 'proposalsummary', component: ProposalsummaryComponent },
  { path: 'proposaldocumentsummary', component: ProposaldocumentsummaryComponent },
  { path: 'proposalextrainformationsummary', component: ProposalextrainformationsummaryComponent },
  { path: 'applicantsummary', component: ApplicantsummeryComponent },
  { path: 'proposalguarantor', component: ProposalguarantorComponent },
  { path: 'proposalcoborrower', component: ProposalcoborrowerComponent },
  { path: 'loantypeinstallmentfrequencywise', component: LoantypeinstallmentfrequencywiseComponent },
  { path: 'userwiseproposalcount', component: UserwiseproposalcountComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'termforloan', component: TermForLoansComponent},
  { path: 'purposeofloan', component: PurposeOfLoansComponent},
  { path: 'jointaccount', component:JointaccountComponent},
  { path: 'loanoff' , component:LoanoffComponent},
  { path: 'mylist' , component:MylistloanComponent},
  { path: 'mylistforho' , component:Mylistforho1Component},
  { path: 'assignbranchtoho' , component:AssignbrancheslistComponent},
  { path:'flush',component:FlushProposalComponent},
  { path:'download',component:DocumentDownloadComponent},
  {path : 'reports',component : ReportMasterComponent },
  {path : 'pendingListMicro', component : PendingListMicroComponent},
  {path : 'readyForBoard', component : ReadyForBoardMicroComponent},
  {path : 'sanctionedList', component : SanctionListMicroComponent},
  {path : 'approvedList', component : ApprovedListComponent},
  {path : 'rejectedList', component : RejectedListComponent},
  {path: 'disbursedList', component:DisbursedProposalsListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
