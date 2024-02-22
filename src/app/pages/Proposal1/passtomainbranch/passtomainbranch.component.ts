import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Proposal } from 'src/app/Models/proposal';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-passtomainbranch',
  templateUrl: './passtomainbranch.component.html',
  styleUrls: ['./passtomainbranch.component.css']
})
export class PasstomainbranchComponent implements OnInit {

  @Input() drawerClose: Function;
  @Input() data: Proposal;
  REMARK: string = ""
  isSpinning = false
  fileDataFile1: File = null
  fileDataFile2: File = null
  @ViewChild('file1', { static: false }) myInputVariable1: ElementRef;
  @ViewChild('file2', { static: false }) myInputVariable2: ElementRef;
  logtext = ""
  userId = sessionStorage.getItem("userId")
  fkey1 = this.api.documentFkey
  fkey2 = this.api.documentFkey
  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {
  }

  reset() {
    this.myInputVariable1.nativeElement.value = null;
    this.myInputVariable2.nativeElement.value = null;
    this.REMARK = ""
    this.fileDataFile1 = null
    this.fileDataFile2 = null
  }


  onFileSelectedFile1(event) {
    this.fileDataFile1 = <File>event.target.files[0];
  }

  onFileSelectedFile2(event) {
    this.fileDataFile2 = <File>event.target.files[0];
  }

  GoToMainBranch() {

    if (this.fileDataFile1 && this.fileDataFile1 && this.REMARK != "") {
      this.isSpinning = true
      var fileExt = this.fileDataFile1.name.split('.').pop();
      var fileExt2 = this.fileDataFile2.name.split('.').pop();

      this.api.onUploadNewMethod(this.fileDataFile1, fileExt, this.fkey1)
        .subscribe(successCode => {
          //console.log(successCode)
          if (successCode['code'] == 200) {
            let lkey = successCode['data'][0]['L_KEY']

            this.api.onUploadNewMethod(this.fileDataFile2, fileExt2, this.fkey2)
              .subscribe(successCode => {
                //console.log(successCode)
                if (successCode['code'] == 200) {
                  let lkey1 = successCode['data'][0]['L_KEY']

                  //console.log(lkey, lkey1, this.REMARK)

                  this.api.passToMainBranch(this.data.ID, this.data.CURRENT_STAGE_ID, 7, this.REMARK, Number(this.userId), lkey, lkey1)
                    .subscribe(successCode => {
                      //console.log(successCode)

                      if (successCode['code'] == "200") {
                        this.isSpinning = false
                        this.drawerClose()
                        this.message.success(this.api.translate.instant('common.message.error.success'), "");
                        this.logtext = 'Update Status - pass to main branch Successed form - SUCCESS ' + " KEYWORD [U - Document2 ]";
                        this.api.addLog('A', this.logtext, this.api.emailId)
                          .subscribe(successCode => {
                            if (successCode['code'] == "200") {
                              //console.log(successCode);
                            }
                            else {
                              //console.log(successCode);
                              this.isSpinning = false
                            }
                          });

                      }
                      else {
                        this.isSpinning = false
                        this.logtext = 'Update Status - pass to main branch Failed form - SUCCESS ' + " KEYWORD [U - Document2 ]";

                        this.api.addLog('A', this.logtext, this.api.emailId)
                          .subscribe(successCode => {
                            if (successCode['code'] == "200") {
                              //console.log(successCode);
                            }
                            else {
                              //console.log(successCode);
                            }
                          });

                        this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");

                        this.isSpinning = false

                      }
                    });
                }
                else {
                  //console.log(successCode)
                }
              });
          }
          else {
            //console.log(successCode)
          }
        });
    }
    else {
      if (this.fileDataFile1 == null)
        this.message.error(this.api.translate.instant('passtomainbranch.message1'), "");
      if (this.fileDataFile2 == null)
        this.message.error(this.api.translate.instant('passtomainbranch.message2'), "");
      if (this.REMARK == "" || this.REMARK == undefined)
        this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
    }
  }
}
