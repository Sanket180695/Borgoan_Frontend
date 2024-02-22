import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Repayingcapacityborrower } from 'src/app/Models/PersonalProposal/repayingcapacityborrower';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-repaying',
  templateUrl: './repaying.component.html',
  styleUrls: ['./repaying.component.css']
})
export class RepayingComponent implements OnInit {
  @Output() demo : EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() PROPOSAL_ID: number;
  @Input() repayingCapacityBorrower
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();

    repayingCapacityBorrowerData: Repayingcapacityborrower=new Repayingcapacityborrower()
  repayingCapacityBorrowerData1: Repayingcapacityborrower=new Repayingcapacityborrower()
  repayingCapacityBorrowerData2: Repayingcapacityborrower=new Repayingcapacityborrower()
  repayingCapacityBorrowerData3: Repayingcapacityborrower=new Repayingcapacityborrower()
  repayingCapacityBorrowerData4: Repayingcapacityborrower=new Repayingcapacityborrower()
  repayingCapacityBorrowerData5: Repayingcapacityborrower=new Repayingcapacityborrower()
  repayingCapacityBorrowerData6: Repayingcapacityborrower=new Repayingcapacityborrower()
total1=[]
total=[]
income=[]
  constructor(private api: ApiService,) { }

  ngOnInit(): void {
    
    this.getAllData()
  this.repayingCapacityBorrowerData.YEAR  = new Date().getFullYear()   +"-"+ (new Date().getFullYear()+1).toString().substring(2) ;
  this.repayingCapacityBorrowerData1.YEAR= new Date().getFullYear()+1 +"-"+ (new Date().getFullYear()+2).toString().substring(2) ;
  this.repayingCapacityBorrowerData2.YEAR = new Date().getFullYear()+2 +"-"+ (new Date().getFullYear()+3).toString().substring(2) ;
  this.repayingCapacityBorrowerData3.YEAR= new Date().getFullYear()+3 +"-"+ (new Date().getFullYear()+4).toString().substring(2) ;
  this.repayingCapacityBorrowerData4.YEAR= new Date().getFullYear()+4 +"-"+ (new Date().getFullYear()+5).toString().substring(2) ;
  this.repayingCapacityBorrowerData5.YEAR = new Date().getFullYear()+5 +"-"+ (new Date().getFullYear()+6).toString().substring(2) ;
  this.repayingCapacityBorrowerData6.YEAR = new Date().getFullYear()+6 +"-"+ (new Date().getFullYear()+7).toString().substring(2) ;
   this.repayingCapacityBorrower = [this.repayingCapacityBorrowerData,this.repayingCapacityBorrowerData1,this.repayingCapacityBorrowerData2,this.repayingCapacityBorrowerData3,this.repayingCapacityBorrowerData4,this.repayingCapacityBorrowerData5,this.repayingCapacityBorrowerData6];
  }

  
  getAllData()
  {
    this.api.getAllRepaymentCapacityInformation(0, 0, "ID", 'asc', "AND PROPOSAL_ID="+this.PROPOSAL_ID).subscribe(data => {
      if (data['code'] == '200' && data['count'] > 0) {
        this.repayingCapacityBorrower = data['data'];
        this.getDaata(0)
        this.getDaata(1)
        this.getDaata(2)
        this.getDaata(3)
        this.getDaata(4)
        this.getDaata(5)
        this.getDaata(6)
     
     
        this.getDaata1(0)
        this.getDaata1(1)
        this.getDaata1(2)
        this.getDaata1(3)
        this.getDaata1(4)
        this.getDaata1(5)
        this.getDaata1(6)
       //console.log(this.repayingCapacityBorrower)
      }
    }, err => {
      //console.log(err);
    });
  }


  getDaata(index)
  {
    this.indexChanged.emit(this.repayingCapacityBorrower)


  this.total1[index] = Number(this.repayingCapacityBorrower[index]['TERM_LOAN_BLDG']) + Number(this.repayingCapacityBorrower[index]['MONTHLY_INSTALLMENT_BLDG']) + Number(this.repayingCapacityBorrower[index]['TERM_LOAN_MACH'] + this.repayingCapacityBorrower[index]['MONTHLY_INSTALLMENT_MACH']) + Number(this.repayingCapacityBorrower[index]['INTEREST_ON_CASH_CREDIT_LIMIT']) + Number(this.repayingCapacityBorrower[index]['INTEREST']) ;

  }

  getDaata1(index)
  {
    this.indexChanged.emit(this.repayingCapacityBorrower)
    this.total[index] = Number(this.repayingCapacityBorrower[index]['NET_PROFIT']) + Number(this.repayingCapacityBorrower[index]['DEPRECIATION']) + Number(this.repayingCapacityBorrower[index]['INTEREST_ON_TL'] + this.repayingCapacityBorrower[index]['INTEREST_ON_CC']) ;
    this.getDaataIncome(index)
  }


  getDaataIncome(index)
  {
    this.income[index]= this.total[index]- Number(this.repayingCapacityBorrower[index]['DRAWING'])
  }

}
