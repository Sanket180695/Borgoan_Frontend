import { Component, OnInit, Input } from '@angular/core';
import { Homepagebanner } from 'src/app/Models/BasicForms/homepagebanner';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DatePipe } from '@angular/common';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';

@Component({
  selector: 'app-homepagebanner',
  templateUrl: './homepagebanner.component.html',
  styleUrls: ['./homepagebanner.component.css'],
  providers: [DatePipe]
})
export class HomepagebannerComponent implements OnInit {

  @Input() drawerClose: Function;
  @Input() data: Homepagebanner;
  isSpinning = false
  logtext: string = "";


  date = new Date();
  date1 = this.datePipe.transform(this.date, 'yyyyMMdd')
  fileDataFILE_URL: File = null
  folderName = "homePageBanner"
  userActivityLogData: Useractivitylog = new Useractivitylog();

  constructor(private api: ApiService, private datePipe: DatePipe, private message: NzNotificationService) {
  }

  ngOnInit() {

  }



  close(): void {
    this.drawerClose();

    this.logtext = 'CLOSED - HomePageBanner form';
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          //console.log(successCode);
        }
        else {
          //console.log(successCode);
        }
      });


    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "HomePageBanner - Close Clicked"
    this.userActivityLogData.ACTIVITY_TIME = new Date()
    this.api.createUserActivityLog(this.userActivityLogData)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          //console.log(successCode);
        }
        else {
          //console.log(successCode);
        }
      });

  }

  save(addNew: boolean): void {

    this.isSpinning = true;

    if (this.data.ID) {

      if (this.fileDataFILE_URL) {
        if (this.data.FILE_URL == "") {
          this.data.FILE_URL = this.genarateKeyFILE_URL();
        }
        else {
          var str = this.data.FILE_URL.substring(this.data.FILE_URL.lastIndexOf('/') + 1).split('.')
          var fileExt = this.fileDataFILE_URL.name.split('.').pop();
          var url = str[0] + "." + fileExt;
          this.api.onUpload(this.folderName, this.fileDataFILE_URL, url)
          this.data.FILE_URL = this.api.retriveimgUrl + this.folderName + "/" + url;
        }
      }
      else {
        this.data.FILE_URL = ""
      }

      this.api.updateHomePageBanner(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('homepagebanner.success1.message'), "");

            this.logtext = 'Update & Close - HomePageBanner form - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - HomePageBanner ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });

            this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
            this.userActivityLogData.ACTIVITY_DETAILS = "HomePageBanner -  Update & Close Successfully" + JSON.stringify(this.data)
            this.userActivityLogData.ACTIVITY_TIME = new Date()
            this.api.createUserActivityLog(this.userActivityLogData)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });

            if (!addNew)
              this.drawerClose();
            this.isSpinning = false;
          }
          else {

            this.logtext = 'Update & Close - HomePageBanner form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - HomePageBanner ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });
            this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
            this.userActivityLogData.ACTIVITY_DETAILS = "HomePageBanner - Update & Close Failed" + JSON.stringify(this.data)
            this.userActivityLogData.ACTIVITY_TIME = new Date()
            this.api.createUserActivityLog(this.userActivityLogData)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });
            this.message.error(this.api.translate.instant('homepagebanner.Error1.message'), "");
            this.isSpinning = false;
          }
        });
    }
    else {
      if (this.fileDataFILE_URL) {
        this.data.FILE_URL = this.genarateKeyFILE_URL()
      }
      else {
        this.data.FILE_URL = "";
      }
      //console.log(this.data.FILE_URL)
      this.api.createHomePageBanner(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('homepagebanner.success2.message'), "");

            if (!addNew) {
              this.drawerClose();

              this.logtext = 'Save & Close - HomePageBanner form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - HomePageBanner ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                  }
                });

              this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
              this.userActivityLogData.ACTIVITY_DETAILS = "HomePageBanner - Save & Close Successfully" + JSON.stringify(this.data)
              this.userActivityLogData.ACTIVITY_TIME = new Date()
              this.api.createUserActivityLog(this.userActivityLogData)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                  }
                });
            }

            else {
              this.data = new Homepagebanner();
              this.logtext = 'Save & New - HomePageBanner form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - HomePageBanner ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                  }
                });

              this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
              this.userActivityLogData.ACTIVITY_DETAILS = "HomePageBanner - Save & New Successfully" + JSON.stringify(this.data)
              this.userActivityLogData.ACTIVITY_TIME = new Date()
              this.api.createUserActivityLog(this.userActivityLogData)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                  }
                });
            }
            this.isSpinning = false;
          }
          else {
            this.message.error(this.api.translate.instant('homepagebanner.Error2.message'), "");

            this.isSpinning = false;
            this.logtext = 'Save & Close - HomePageBanner form - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [C - HomePageBanner ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });

            this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
            this.userActivityLogData.ACTIVITY_DETAILS = "HomePageBanner - Save & Close Failed" + JSON.stringify(this.data)
            this.userActivityLogData.ACTIVITY_TIME = new Date()
            this.api.createUserActivityLog(this.userActivityLogData)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });

          }
        });
    }
  }

  genarateKeyFILE_URL() {
    var number = Math.floor(100000 + Math.random() * 900000)
    var fileExt = this.fileDataFILE_URL.name.split('.').pop();
    var url = this.date1 + number + "." + fileExt
    this.api.onUpload(this.folderName, this.fileDataFILE_URL, url)
    this.data.FILE_URL = this.api.retriveimgUrl + this.folderName + "/" + url;
    return this.data.FILE_URL
  }

  onFileSelectedFILE_URL(event) {
    this.fileDataFILE_URL = <File>event.target.files[0];
    var fileExt = this.fileDataFILE_URL.name.split('.').pop();
  }
}