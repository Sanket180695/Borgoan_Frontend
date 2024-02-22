import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { Proposal } from 'src/app/Models/proposal';
import { ApiService } from 'src/app/Service/api.service';
import { Documents2Component } from '../../Proposals/documents2/documents2.component';

@Component({
  selector: 'app-cdocumentinfo',
  templateUrl: './cdocumentinfo.component.html',
  styleUrls: ['./cdocumentinfo.component.css']
})
export class CdocumentinfoComponent implements OnInit {

  @Input() data: Proposal;
  @Input() TYPE: string;
  @Input() APPLICANT_ID: number
  @ViewChild(Documents2Component) document1: Documents2Component;
  @Output() demo: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() CURRENT_STAGE_ID: number;
  @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  @Input() PROPOSAL_ID: number
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    let filter = " AND EXTRA_INFORMATION_ID=13 AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND APPLICANT_ID=" + this.APPLICANT_ID + " AND TYPE='C'"
    this.api.getAllApplicantExtraInformation(0, 0, "SEQ_NO", "asc", filter).subscribe(data => {
      this.extraApplicantInformation = data['data'][0]
      //console.log(this.extraApplicantInformation)
    }, err => {
      //console.log(err);
    });
  }
  getDocuments() {

    this.document1.getAllProposalDocuments(this.data, this.APPLICANT_ID)

  }
  getTabs(){
    this.demo.emit(false)
  }

  loadInfo() {
   
  }
}
