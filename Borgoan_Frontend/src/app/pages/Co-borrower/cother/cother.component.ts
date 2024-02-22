import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Other } from 'src/app/Models/PersonalProposal/OTHER';

@Component({
  selector: 'app-cother',
  templateUrl: './cother.component.html',
  styleUrls: ['./cother.component.css']
})
export class CotherComponent implements OnInit {
  @Output() demo: EventEmitter<boolean> =
  new EventEmitter<boolean>();
@Input() CURRENT_STAGE_ID: number;
@Input() data: Other;
// @Input() addressinfoCurrent: Addressinfo;
// @Input() addressinfoPermanent: Addressinfo;
// @Input() familyDeatils
// @Input() personalInformationId
@Input() PROPOSAL_ID: Number;
@Input() APPLICANT_ID: number
@Input() LOAN_KEY: number
isSpinning = false
  constructor() { }

  ngOnInit(): void {
  }

}
