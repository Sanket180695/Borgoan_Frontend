import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { Amulya } from 'src/app/Models/PersonalProposal/amulyaloan';

@Component({
  selector: 'app-amulyaloan',
  templateUrl: './amulyaloan.component.html',
  styleUrls: ['./amulyaloan.component.css']
})
export class AmulyaloanComponent implements OnInit {

  data: Amulya = new Amulya();
  isSpinning = false
  isButtonSpinning = false
  logtext: string = "";
  @Input() PROPOSAL_ID: number;
  pipe = new DatePipe('en-US');
  @Output() demo = new EventEmitter<string>();
  @Input() CURRENT_STAGE_ID: number;
  @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();
  dataList = []
  goldItemList = []
  loadingRecords = false
  browserLang = 'kn';
  options = []

  constructor() { }

  ngOnInit(): void {
  }

}
