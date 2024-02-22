import { Component, OnInit, ViewChild } from '@angular/core';
import { ProposalFilterwiseReportComponent } from './proposal-filterwise-report/proposal-filterwise-report.component';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { Reports } from 'src/app/Models/PersonalProposal/reports';

@Component({
  selector: 'app-report-master',
  templateUrl: './report-master.component.html',
  styleUrls: ['./report-master.component.css']
})
export class ReportMasterComponent implements OnInit {
  @ViewChild(ProposalFilterwiseReportComponent) filterReports: ProposalFilterwiseReportComponent;

  searchText: string = "";
  pageIndex = 1;
  pageSize = 10;
  totalRecords = 1;
  dataList = [];
  loadingRecords = true;
  sortValue: string = "desc";
  sortKey: string = "ID";
  roleId = sessionStorage.getItem("roleId")

  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: Reports = new Reports();

  columns: string[][] =[["NAME_EN"]]
  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {

    this.search()
  }

  sort(sort:{key:string;value:string}):void{
     this.sortKey=sort.key;
     this.sortValue=sort.value;
     this.search(true)
  }

  search(reset: boolean = false) {

    this.api.getAllReports().subscribe(data => {
      this.loadingRecords = false;
      this.totalRecords = data['count'];
      this.dataList = data['data'];
    }, err => {
      console.log(err);
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });

  }


  edit(data: Reports): void {
    
    if(data.FLAG == '6' || data.FLAG == '7' || data.FLAG == '8' || data.FLAG == '1' || data.FLAG == '14' || data.FLAG == '15'){
      this.drawerVisible = true;
      this.filterReports.REPORT_PRAMS.REPORT_ID = data.FLAG
      this.filterReports.getAllLists();
      
    }
  }

  drawerClose(){
    this.filterReports.clearFilter();
    this.drawerVisible = false;
  }





}
