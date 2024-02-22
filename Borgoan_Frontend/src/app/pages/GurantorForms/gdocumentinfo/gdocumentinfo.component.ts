import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { Proposal } from 'src/app/Models/proposal';
import { ApiService } from 'src/app/Service/api.service';
import { Documents2Component } from '../../Proposals/documents2/documents2.component';

@Component({
  selector: 'app-gdocumentinfo',
  templateUrl: './gdocumentinfo.component.html',
  styleUrls: ['./gdocumentinfo.component.css']
})
export class GdocumentinfoComponent implements OnInit {

  @Input() data: Proposal;
  @Input() TYPE: string;
  @Input() APPLICANT_ID: number
  @Input() PROPOSAL_ID: number
  @ViewChild(Documents2Component) document: Documents2Component;
  @Output() demo : EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() CURRENT_STAGE_ID: number;
  @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  constructor( private api: ApiService ) { }

  ngOnInit(): void {
    let filter = " AND EXTRA_INFORMATION_ID=13 AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND APPLICANT_ID=" + this.APPLICANT_ID + " AND TYPE='G'"
    this.api.getAllApplicantExtraInformation(0, 0, "SEQ_NO", "asc", filter).subscribe(data => {
      this.extraApplicantInformation = data['data'][0]
      //console.log(this.extraApplicantInformation)
    }, err => {
      //console.log(err);
    });
  }
  getTabs(){
    this.demo.emit(false)
  }

  loadInfo() {
   
  }
  getDocuments() {

    this.document.getAllProposalDocuments(this.data, this.APPLICANT_ID)

  }


}
