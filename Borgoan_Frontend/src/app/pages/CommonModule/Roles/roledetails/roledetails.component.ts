import { Component, OnInit, Input } from '@angular/core';
import { Role } from 'src/app/Models/Commonmodule/role';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-roledetails',
  templateUrl: './roledetails.component.html',
  styleUrls: ['./roledetails.component.css']
})
export class RoledetailsComponent implements OnInit {


  @Input() drawerClose: Function;
  @Input() data: Role;
  @Input() roleDetailsData:[];
  @Input() drawerVisible: boolean;
  searchText=""
  isSpinning = false

  loadingRecords = true;
  
  constructor(private api:ApiService,private message:NzNotificationService) { }

  ngOnInit() {
  }

  close(): void {
    this.drawerClose();
  }

  save()
  {
    this.isSpinning = true;
   //console.log(this.roleDetailsData)
      this.api.addRoleDetails(this.data.ID,this.roleDetailsData)
      .subscribe(successCode => {
        //console.log(successCode)
        if(successCode['code']=="200")
        { 
            this.message.success(this.api.translate.instant('roledetails.message1'), "");
            this.drawerClose();
            this.isSpinning = false;
        }
        else
        {
          this.message.error(this.api.translate.instant('roledetails.message2'), "");
          this.isSpinning = false;
        }
      });
  }
}
