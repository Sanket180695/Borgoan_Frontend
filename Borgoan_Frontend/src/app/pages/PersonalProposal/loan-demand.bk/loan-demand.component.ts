import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Loaninformation } from 'src/app/Models/PersonalProposal/loaninformation';
import { ApiService } from 'src/app/Service/api.service';


@Component({
  selector: 'app-loan-demand',
  templateUrl: './loan-demand.component.html',
  styleUrls: ['./loan-demand.component.css']
})
export class LoanDemandComponent implements OnInit {
  @Input() PROPOSAL_ID: Number;
  @Input() data: Loaninformation;
  @Input() oldIndex: number
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();
  @Input() CURRENT_STAGE_ID: number; 
  @Output() demo : EventEmitter<boolean> =
    new EventEmitter<boolean>();
  drawerData: Loaninformation = new Loaninformation()
  index = 0
  @Input() LOAN_KEY: Number;
  constructor(
    private api: ApiService,
    private message: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.loadAllLoanInformation()
  }


  loadAllLoanInformation() {
    let filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID
    this.api.getAllLoanInformation(0, 0, 'ID', "asc", filter).subscribe(data => {
      if (data['code'] == "200" && data['data'].length > 0) {
        this.drawerData = Object.assign({}, data['data'][0]);
        //console.log(this.drawerData)
        sessionStorage.setItem("bankLoanId", this.drawerData.BANK_LOAN_TYPE_ID.toString())
      }
    }, err => {
      //console.log(err);
    });

  }


  onIndexChange(value) {
    this.index = value
  }

  demos(){
    this.demo.emit(false)
  }
}
