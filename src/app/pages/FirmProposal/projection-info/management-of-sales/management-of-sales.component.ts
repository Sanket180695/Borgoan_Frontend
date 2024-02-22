import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { ManagementOfSalesInformation } from 'src/app/Models/FirmProposal/management-of-sales';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { ApiService } from 'src/app/Service/api.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';

@Component({
  selector: 'app-management-of-sales',
  templateUrl: './management-of-sales.component.html',
  styleUrls: ['./management-of-sales.component.css']
})
export class ManagementOfSalesComponent implements OnInit {

  @Input() CURRENT_STAGE_ID: number;  
  @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  @Input() PROPOSAL_ID:number;
  @Input() type:string;
  pageIndex = 1;
  pageSize = 10;
  totalRecords = 1;
  loadingRecords = false;
  sortValue: string = "desc";
  sortKey: string = "id";
  searchText: string = "";
  filterQuery: string = "";
  isFilterApplied: string = "default";
  logtext:string = "";
  index=-1
  columns: string[][] =[]

  //drawer Variables
  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: ManagementOfSalesInformation = new ManagementOfSalesInformation();
  addressinfoBussiness:Addressinfo = new Addressinfo();
  @Input() data1
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();

  confirmModal?: NzModalRef;
  constructor(private api: ApiService,private modal: NzModalService,private message: NzNotificationService) { }
  ngOnInit() {
    
    // //console.log(this.type)
    if(this.type!="B")
    this.search() 
  }

  //Drawer Methods
  get closeCallback() {
    return this.drawerClose.bind(this);
  }

  add(): void {
    if(this.data1==undefined)
    {
      this.data1=[]
    }
    this.drawerTitle = this.api.translate.instant('management-of-sales.drowertitle1');
    this.drawerData = new ManagementOfSalesInformation();
    this.drawerData.PROPOSAL_ID = this.PROPOSAL_ID;
    //console.log(this.PROPOSAL_ID)
    //console.log(this.data1)
    this.addressinfoBussiness = new Addressinfo();
    this.drawerVisible = true;

   
	this.logtext = 'ADD - ManagementOfSalesInformation form KEYWORD [A - ManagementOfSalesInformation] ';
	this.api.addLog('A',this.logtext,this.api.emailId)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
             //console.log(successCode);
            }
            else {
		//console.log(successCode);
            }
      });

  }
  edit(data:  ManagementOfSalesInformation,i:number): void {
    this.index=i
    this.drawerTitle =  this.api.translate.instant('management-of-sales.drowertitle2');
    this.drawerData = Object.assign({}, data);
    
    if(this.type=="B")
    {
      if(this.drawerData.SHOWROOM_OR_DEPO_ADDRESS_ID){
        this.api.getAllAddressInformation(this.pageIndex, this.pageSize, this.sortKey, this.sortValue, "AND ID =" + this.drawerData.SHOWROOM_OR_DEPO_ADDRESS_ID)
        .subscribe(data => {
          if (data['code'] == "200") {
            this.addressinfoBussiness = data['data'][0];
          }
        }, err => {
          //console.log(err);
        });
      }
      else
      {
        this.addressinfoBussiness=data.SHOWROOM_OR_DEPO_ADDRESS

      }

    }
    else
    {
      if(this.drawerData.SHOWROOM_OR_DEPO_ADDRESS_ID){
        this.api.getAllAddressInformation(this.pageIndex, this.pageSize, this.sortKey, this.sortValue, "AND ID =" + this.drawerData.SHOWROOM_OR_DEPO_ADDRESS_ID)
        .subscribe(data => {
          if (data['code'] == "200") {
            this.addressinfoBussiness = data['data'][0];
          }
        }, err => {
          //console.log(err);
        });
      } else {
        this.addressinfoBussiness = new Addressinfo();
      }
    }
    this.drawerVisible = true;

	this.logtext = 'EDIT - ManagementOfSalesInformation form KEYWORD [E - ManagementOfSalesInformation] ';
	this.api.addLog('A',this.logtext,this.api.emailId)
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
    if(this.type=="B")
    {
      //console.log("in B")
      if(this.index > -1){
        this.data1[this.index] = this.drawerData;
      } 
      this.index = -1;
      this.indexChanged.emit(this.data1)
    }
    else
    {
      this.search()
    }
    this.drawerVisible = false;
  }
  search() {

    //console.log("called"+this.type)
    if(this.type=="B")
    {
    }
    else
    {
      this.api.getAllManagementOfSalesInformation(this.pageIndex, this.pageSize, this.sortKey, this.sortValue, "AND PROPOSAL_ID=" +this.PROPOSAL_ID).subscribe(data => {
        this.data1 = data['data'];
      }, err => {
        //console.log(err);
      });
    }
    
  }

  deleteRow(data)
  {
    this.confirmModal = this.modal.confirm({
      nzTitle: this.api.translate.instant('management-of-sales.drowertitle3') ,
      nzContent: this.api.translate.instant('management-of-sales.drowertitle4'),
      nzOnOk: () =>
        new Promise((resolve, reject) => {
    const index = this.data1.indexOf(data);
    this.data1.splice(index, 1);
    this.data1 = this.data1.filter(object => {
      return object['ID'] != data
    });
    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);

  }).catch(() => console.log(this.api.translate.instant('management-of-sales.drowertitle5')))
});
  }
}