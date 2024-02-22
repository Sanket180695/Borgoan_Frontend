import { Component, OnInit, Input } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { Proposal } from 'src/app/Models/proposal';

@Component({
  selector: 'app-chatinfo',
  templateUrl: './chatinfo.component.html',
  styleUrls: ['./chatinfo.component.css']
})
export class ChatinfoComponent implements OnInit {

  @Input() drawerClose: Function;
  @Input() data: Proposal;
  url: string = ""
  urlSafe: SafeResourceUrl;

  constructor(private api: ApiService, private message: NzNotificationService,public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }
  
  getLinkUrl(url) {
    this.url = url
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }



}
