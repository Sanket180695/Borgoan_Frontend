import { Directive,Input,HostListener } from '@angular/core';
import { ExportService } from '../Service/export.service';

@Directive({
  selector: '[appExport]'
})
export class ExportDirective {

  
  constructor(private exportService:ExportService) { }
  

  @Input('appExport') dataList: any[];
  @Input() fileName: string;
  converted
  

  @HostListener('click', ['$event']) onClick($event) {
   
    if(this.fileName=="HomePageBanner")
    {
    this.dataList=this.dataList.map(({
      NAME,WAIT_TIME,IS_ACTIVE }) => 
     ({NAME,WAIT_TIME,IS_ACTIVE}));
     this.converted =  this.rekey(this.dataList, { NAME: 'Name',WAIT_TIME: 'Wait Time',IS_ACTIVE:'Status'});
    }

    if(this.fileName=="ApplicantTypes")
    {
    this.dataList=this.dataList.map(({
      NAME:Name ,IS_ACTIVE:Status }) => 
     ({Name,Status}));
     this.converted =  this.dataList
    
    }
    else  if(this.fileName=="LoanTypes")
    {
    this.dataList=this.dataList.map(({
      NAME:Name, PROCESSING_FEE:ProcessingFee,IS_ACTIVE }) => 
     ({Name,ProcessingFee,IS_ACTIVE}));
     this.converted =  this.dataList
     //this.rekey(this.dataList, { PROCESSING_FEE: 'Processing Fee',IS_ACTIVE:'Status'});
    
    }
    else  if(this.fileName=="Documents")
    {
    this.dataList=this.dataList.map(({
       GROUP_NAME:Group,NAME,MAX_SIZE_ALLOWED, ALLOWED_TYPES,IS_ACTIVE  }) => 
     ({Group,NAME,MAX_SIZE_ALLOWED,ALLOWED_TYPES,IS_ACTIVE}));
     this.converted =  this.rekey(this.dataList, {NAME: 'Name',MAX_SIZE_ALLOWED: 'Max Size Allowed',ALLOWED_TYPES:'Allowed Types',IS_ACTIVE:'Status'});
    }
    else  if(this.fileName=="Documentgroups")
    {
    this.dataList=this.dataList.map(({
      NAME:Name ,IS_ACTIVE:Status}) => 
     ({Name,Status}));
     this.converted =  this.dataList
    }
    else  if(this.fileName=="Proposals")
    {
    this.dataList=this.dataList.map(({
      APPLICANT_NAME:Applicant ,CURRENT_STAGE_NAME,BRANCH_NAME:Branch,MOBILE_NUMBER:Mobile1, AGE:Age, PRAPOSAL_TYPE,LOAN_TYPE_NAME,LOAN_AMOUNT,CREATED_ON_DATETIME,LAST_UPDATED_ON_DATETIME}) => 
     ({Applicant,CURRENT_STAGE_NAME,Branch,Mobile1, Age, PRAPOSAL_TYPE,LOAN_TYPE_NAME,LOAN_AMOUNT,CREATED_ON_DATETIME,LAST_UPDATED_ON_DATETIME}));
     this.converted =  this.rekey(this.dataList, {CURRENT_STAGE_NAME:'Current Stage',PRAPOSAL_TYPE:'Proposal Type',LOAN_TYPE_NAME:'Loan Type',LOAN_AMOUNT:'Loan Amount',CREATED_ON_DATETIME:'Created Date',LAST_UPDATED_ON_DATETIME:'Last Update Date'});
    }
    else  if(this.fileName=="Applicants")
    {
    this.dataList=this.dataList.map(({
      NAME :Name,MOBILE_NUMBER,REGISTRATION_DATETIME,LAST_OPENED_DATETIME,APP_VERSION}) => 
     ({Name,MOBILE_NUMBER,REGISTRATION_DATETIME,LAST_OPENED_DATETIME,APP_VERSION}));
     this.converted =  this.rekey(this.dataList, {MOBILE_NUMBER: 'Mobile',REGISTRATION_DATETIME:'Registration Date Time',LAST_OPENED_DATETIME:'Last Opened Time',APP_VERSION:'App Version'});
    }
    else  if(this.fileName=="Branches")
    {
    this.dataList=this.dataList.map(({
      NAME :Name,USER_NAME:Manager}) => 
     ({Name,Manager}));
     this.converted =  this.dataList
     // this.rekey(this.dataList, {USER_NAME: 'Manager Name',REGISTRATION_DATETIME:'Registration Date Time',LAST_OPENED_DATETIME:'Last Opened Time',APP_VERSION:'App Version'});
    }
    else  if(this.fileName=="ProposalStages")
    {
    this.dataList=this.dataList.map(({
      NAME :Name,SEQUENCE_NUMBER:Sequence,IS_ACTIVE:Status}) => 
     ({Name,Sequence,Status}));
     this.converted =  this.dataList
     // this.rekey(this.dataList, {USER_NAME: 'Manager Name',REGISTRATION_DATETIME:'Registration Date Time',LAST_OPENED_DATETIME:'Last Opened Time',APP_VERSION:'App Version'});
    }

    else  if(this.fileName=="Notifications")
    {
    this.dataList=this.dataList.map(({
      TITLE :Title,DESCRIPTION:Description}) => 
     ({Title,Description}));
     this.converted =  this.dataList
     // this.rekey(this.dataList, {USER_NAME: 'Manager Name',REGISTRATION_DATETIME:'Registration Date Time',LAST_OPENED_DATETIME:'Last Opened Time',APP_VERSION:'App Version'});
    }

    else  if(this.fileName=="ProsalDocuments")
    {
    this.dataList=this.dataList.map(({
      DOCUMENT_TITLE,UPLOADED_DATETIME,IS_UPLOADED_STATUS,IS_COMPLUSORY_STATUS,IS_VERIFIED_STATUS,IS_APPROVED_STATUS,REMARK}) => 
     ({DOCUMENT_TITLE,UPLOADED_DATETIME,IS_UPLOADED_STATUS,IS_COMPLUSORY_STATUS,IS_VERIFIED_STATUS,IS_APPROVED_STATUS,REMARK}));
     this.converted =  this.rekey(this.dataList, {DOCUMENT_TITLE: 'Document Title',UPLOADED_DATETIME:'Updated Date Time',IS_UPLOADED_STATUS:'Uploaded Status',IS_COMPLUSORY_STATUS:'Complusory Status',IS_VERIFIED_STATUS:'Verified Status',IS_APPROVED_STATUS:'Approved Status',REMARK:'Remark'});
    }
    else  if(this.fileName=="DeducationDetails")
    {
      this.dataList=this.dataList.map(({
        NAME:Name}) => 
       ({Name}));
       this.converted =  this.dataList
    }
    else  if(this.fileName=="InstallmentFreqency")
    {
      this.dataList=this.dataList.map(({
        NAME:Name ,DESCRIPTION:Description}) => 
       ({Name,Description}));
       this.converted =  this.dataList
    }
    else  if(this.fileName=="IncomeSource")
    {
      this.dataList=this.dataList.map(({
        NAME:Name ,DESCRIPTION:Description}) => 
       ({Name,Description}));
       this.converted =  this.dataList
    }

    

   this.exportService.exportExcel(this.converted, this.fileName);
  }
 

  rekey(arr, lookup) {
    for (var i = 0; i < arr.length; i++) {
      var obj = arr[i];
      for (var fromKey in lookup) {
        var toKey = lookup[fromKey];
        var value = obj[fromKey];
        if (value) {
          obj[toKey] = value;
          delete obj[fromKey];
        }
      }
    }
    return arr;
  }

 
 }
