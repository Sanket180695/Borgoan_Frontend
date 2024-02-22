import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-pagesetting',
  templateUrl: './pagesetting.component.html',
  styleUrls: ['./pagesetting.component.css']
})
export class PagesettingComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  totalRecords = 1;
  dataList: any = {PAGE0:'',PAGE1:'',PAGE2:'',PAGE3:'',PAGE4:''};
  arr = [];
  isSpinning =false;
  isButtonSpinning =false;
  constructor(private api: ApiService, private message: NzNotificationService,) { }

  ngOnInit(): void {
    this.getpages();
  }
  getpages() {
    this.api.getPageSetttngs(0, 0, 'ID', 'asc', '').subscribe(data => {
      this.dataList = data['data'][0];
      this.arr = this.dataList['PAGE4'].split(",");
      //console.log(this.arr);
    }, err => {
      //console.log(err);
    });
  }


  save(){
    var isOk = true;

    if (this.arr[0] == undefined || this.arr[0] == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('pagesetting.Page_1_TitleRequired'), "");
    }
    if (this.arr[1] == undefined || this.arr[1] == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('pagesetting.Page_1_DescriptionRequired'), "");
    }
    if (this.arr[2] == undefined || this.arr[2] == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('pagesetting.Page_2_TitleRequired'), "");
    }
    if (this.arr[3] == undefined || this.arr[3] == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('pagesetting.Page_2_DescriptionRequired'), "");
    }
    if (this.arr[4] == undefined || this.arr[4] == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('pagesetting.Page_3_TitleRequired'), "");
    }
    if (this.arr[5] == undefined || this.arr[5] == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('pagesetting.Page_3_DescriptionRequired'), "");
    }
    if (this.arr[6] == undefined || this.arr[6] == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('pagesetting.Page_4_TitleRequired'), "");
    }
    if (this.arr[7] == undefined || this.arr[7] == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('pagesetting.Page_4_DescriptionRequired'), "");
    }

    if (this.dataList.PAGE0 == undefined || this.dataList.PAGE0  == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('pagesetting.Page_1_CodeRequired'), "");
    }
    if (this.dataList.PAGE1 == undefined || this.dataList.PAGE1  == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('pagesetting.Page_2_CodeRequired'), "");
    }
    if (this.dataList.PAGE2 == undefined || this.dataList.PAGE2  == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('pagesetting.Page_3_CodeRequired'), "");
    }
    if (this.dataList.PAGE3 == undefined || this.dataList.PAGE3  == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('pagesetting.Page_4_CodeRequired'), "");
    }
    if (this.dataList.SUPPORT == undefined || this.dataList.SUPPORT  == '') {
      isOk = false;
      this.message.error(this.api.translate.instant('pagesetting.Supportrequired'), "");
    }

    this.dataList.PAGE4 = this.arr.toString();
    if(isOk){
      this.isButtonSpinning =true;
      this.api.updatePageSetttngs(this.dataList)
        .subscribe(successCode => {
          //console.log(successCode)
          if (successCode['code'] == "200") {
            this.getpages()
            this.message.success(this.api.translate.instant('common.message.success.addinfo2'), "");
            this.isButtonSpinning = false;
          }
          else {
            this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
            this.isButtonSpinning = false;
          }
        });
    }
  }
}
