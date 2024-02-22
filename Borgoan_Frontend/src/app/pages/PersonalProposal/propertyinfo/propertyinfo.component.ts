import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Propertyinformation } from 'src/app/Models/PersonalProposal/propertyinformation';
import { PropertiesinfoComponent } from '../propertiesinfo/propertiesinfo.component';
import { ApiService } from 'src/app/Service/api.service';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { NzNotificationService } from 'ng-zorro-antd';
import { PrimesecurityinfoComponent } from '../primesecurityinfo/primesecurityinfo.component';
import { SubPropertyinfo } from 'src/app/Models/PersonalProposal/subpropertyinfo';

@Component({
  selector: 'app-propertyinfo',
  templateUrl: './propertyinfo.component.html',
  styleUrls: ['./propertyinfo.component.css']
})
export class PropertyinfoComponent implements OnInit {
  @Input() CURRENT_STAGE_ID: number;  @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  @Output() demo : EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() data: Propertyinformation;
  @Input() data1: SubPropertyinfo;
  @Input() PROPOSAL_ID: number;
  @Input() APPLICANT_ID: number;
  @Input() oldIndex: number
  @Input() LOAN_KEY: Number;
  @Output() CloseChanged: EventEmitter<number> = new EventEmitter();
  index = 0
  IS_PROPERTY_INFO: boolean = false
  isButtonSpinning = false
  proposalId: number
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
        //  this.prime.getSessionValues()
      }
    }
 
  }

  onIndexChange(event) {
    this.index = event
  }

  // save()
  // {


  // }
  demos()
  {
   console.log("in proporty")
    this.demo.emit(false)    

  }

}
