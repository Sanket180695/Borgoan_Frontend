import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Notificationmaster } from 'src/app/Models/BasicForms/notificationmaster';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-notificationmaster',
  templateUrl: './notificationmaster.component.html',
  styleUrls: ['./notificationmaster.component.css']
})
export class NotificationmasterComponent implements OnInit {

  @Input() drawerClose: Function;
  @Input() data: Notificationmaster;


  fileData: File = null
  isSpinning = false

  today = new Date().getFullYear().toString() + "-" + (new Date().getMonth() + 1).toString() + "-" + new Date().getDate() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()


  constructor(private api: ApiService, private message: NzNotificationService) {
  }

  ngOnInit() {
    //console.log(this.today)
  }

  close(): void {
    this.drawerClose();
  }

  onFileSelected(event) {
    this.fileData = <File>event.target.files[0];
    //console.log(this.fileData)
    var fileExt = this.fileData.name.split('.').pop();
    //console.log("extesion: " + fileExt)
  }

  save(addNew: boolean): void {
    this.isSpinning = true;
    if (this.data.TITLE != undefined && this.data.TITLE != "") {
      if (this.data.ID) {
        //console.log("data ::" + JSON.stringify(this.data))


        if (this.data.TYPE == "I") {
          if (this.data.URL.startsWith(this.api.retriveimgUrl)) {
            var str = this.data.URL.substring(this.data.URL.lastIndexOf('/') + 1).split('.')
            var fileExt = this.fileData.name.split('.').pop();
            url = str[0] + "." + fileExt;
            this.api.onUpload("notifications", this.fileData, url)
            this.data.URL = this.api.retriveimgUrl + "notifications/" + url;
          }
          else {
            var number = Math.floor(100000 + Math.random() * 900000)
            var fileExt = this.fileData.name.split('.').pop();
            var url = "N" + number + "." + fileExt
            this.api.onUpload("notifications", this.fileData, url)
            this.data.URL = this.api.retriveimgUrl + "notifications/" + url;
          }
        }

        this.api.updateeNotification(this.data)
          .subscribe(successCode => {
            //console.log(successCode);
            if (successCode['code'] == "200") {

              this.message.success(this.api.translate.instant('notificationmaster.success1.message'), "");
              if (!addNew)
                this.drawerClose();
              this.isSpinning = false;
            }
            else {
              this.message.error(this.api.translate.instant('notificationmaster.Error1.message'), "");
              this.isSpinning = false;
            }
          });
      }
      else {
        // this.data.DATETIME=this.today
        // //console.log(this.data.DATETIME)
        // //console.log("data: "+this.data)
        if (this.data.TYPE == "I") {
          var number = Math.floor(100000 + Math.random() * 900000)
          var fileExt = this.fileData.name.split('.').pop();
          var url = "N" + number + "." + fileExt
          this.api.onUpload("notifications", this.fileData, url)
          this.data.URL = this.api.retriveimgUrl + "notifications/" + url;
        }
        else if (this.data.TYPE == "T") {
          this.data.URL = ""
        }
        this.api.createNotification(this.data)
          .subscribe(successCode => {
            //console.log(successCode)
            if (successCode['code'] == "200") {
              this.message.success(this.api.translate.instant('notificationmaster.success2.message'), "");
              if (!addNew)
                this.drawerClose();
              else
                this.data = new Notificationmaster();
              this.isSpinning = false;
            }
            else {
              this.message.error(this.api.translate.instant('notificationmaster.Error2.message'), "");
              this.isSpinning = false;
            }
          }
          );
      }
    }
    else {
      this.message.error(this.api.translate.instant('notificationmaster.Error3.message'), "");
      this.isSpinning = false;
    }
  }
}
