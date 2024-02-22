import { Component, OnInit,Input } from '@angular/core';
import { Role } from 'src/app/Models/Commonmodule/role';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
  providers: [DatePipe]
})
export class RoleComponent implements OnInit {

  @Input() drawerClose: Function;
  @Input() data: Role;
  isSpinning = false
  roleLoading=false
  moduleLoading=false
  @Input() drawerVisible: boolean;
  roles: Role[];
  date = new Date();
  date1 = this.datePipe.transform(this.date, 'yyyyMMddHHmmss')
  fileDataLOGO_URL: File = null
  folderName = "roleIcon"
  fKey=""
  roleId = sessionStorage.getItem("roleId")

  constructor(private api: ApiService,private datePipe: DatePipe, private message: NzNotificationService) { }

  ngOnInit() {
    this.loadRoles()
  }

  close(): void {
    this.drawerClose();
  }

  loadRoles() {
    this.roleLoading = true;
    var Filter=" AND PARENT_ID=0"
    this.api.getAllRoles(0, 0, '', '',Filter).subscribe(roles => {
      this.roles = roles['data'];
      this.roleLoading = false;
    }, err => {
      //console.log(err);
      this.roleLoading = false;
    });
  }
 

  onFileSelectedLOGO_URL(event) {
    this.fileDataLOGO_URL = <File>event.target.files[0];
    //console.log(this.fileDataLOGO_URL)
    var fileExt = this.fileDataLOGO_URL.name.split('.').pop();
  }
  save(addNew: boolean): void {
    this.isSpinning = true;

    if (this.data.NAME != undefined && this.data.NAME != "")
     {
      if (this.data.ID) {

       //console.log(this.data)
      
        this.api.updateRole(this.data)
          .subscribe(successCode => {
            //console.log(successCode)
            if(successCode['code'] == "200") 
            {
              this.message.success(this.api.translate.instant('role.message1'), "");
              if (!addNew)
                this.drawerClose();
              this.isSpinning = false;
              //console.log(successCode)
            }
            else 
            {
              //console.log(successCode)
              this.message.error(this.api.translate.instant('role.message2'), "");
              this.isSpinning = false;
            }
          });
      }
      else {
        //console.log(this.data)
        this.api.createRole(this.data)
          .subscribe(successCode => {
            //console.log(successCode)
            if(successCode['code'] == "200") 
            {
            this.message.success(this.api.translate.instant('role.message3'), "");
            if (!addNew)
              this.drawerClose();
            else {
              this.data = new Role();
            }
            this.loadRoles()
            this.isSpinning = false;
           }
           else
           {
            this.message.error(this.api.translate.instant('role.message4'), "");
            this.isSpinning = false;
           }
       });
      }
    }
    else {
      this.message.error(this.api.translate.instant('role.message5'), "");
      this.isSpinning = false;
    }
  }

  
}