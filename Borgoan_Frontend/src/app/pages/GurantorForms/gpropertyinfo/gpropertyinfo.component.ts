import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Propertyinformation } from 'src/app/Models/PersonalProposal/propertyinformation';
import { PrimesecurityinfoComponent } from '../../PersonalProposal/primesecurityinfo/primesecurityinfo.component';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';

@Component({
  selector: 'app-gpropertyinfo',
  templateUrl: './gpropertyinfo.component.html',
  styleUrls: ['./gpropertyinfo.component.css']
})
export class GpropertyinfoComponent implements OnInit {

  @Input() PROPOSAL_ID: number;
  @Input() APPLICANT_ID: number;
  @Output() demo : EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() CURRENT_STAGE_ID: number;
  @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  data: Propertyinformation;
  index = 0
  IS_PROPERTY_INFO: boolean = false
  isButtonSpinning = false
  proposalId: number
  @Input() LOAN_KEY: Number;
  type = Number(sessionStorage.getItem("PRAPOSAL_TYPE"))
  @ViewChild(PrimesecurityinfoComponent, { static: false }) prime: PrimesecurityinfoComponent;

  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {
    //console.log(this.PROPOSAL_ID)
    this.loadInfo()
  }

  loadInfo(num?) {
    if (num == 1) {
      if (this.type == 1) {
        this.prime.getSessionValues()
      }
    }

  }

  onIndexChange(event) {
    this.index = event
  }

  demos() {

    this.demo.emit(false)

  }

  demos2(){
    this.demo.emit(false)
    var LOG_ACTION = 'User saved Property Info  tab information'
    var DESCRIPTION = sessionStorage.getItem('userName') + ' has saved the Property Info  for the proposal ' + this.LOAN_KEY 
    var LOG_TYPE = 'I'
    this.api.proposalLogInformation(this.extraApplicantInformation.PROPOSAL_ID, this.extraApplicantInformation.CURRENT_STAGE_ID, 0, LOG_ACTION, Number(sessionStorage.getItem("userId")), DESCRIPTION, LOG_TYPE)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
        }
      });
    
  }
}
