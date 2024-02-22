import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CookieService } from 'ngx-cookie-service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-users1',
  templateUrl: './users1.component.html',
  styleUrls: ['./users1.component.css']
})
export class Users1Component implements OnInit {
  
  totalRecords = 1;
  dataList = [];
  loadingRecords = true;
  values: string[] 
  valuescheck: string[]
  totalCount=0
  checkOptionsOne = [
    { label: 'Apple', value: 'Apple', checked: true },
    { label: 'Pear', value: 'Pear', checked: false },
    { label: 'Orange', value: 'Orange', checked: false }
  ];
  value1=[]
  //NzShowSearchOptions=[{caseSensitive:false}]
  constructor(private router:Router,private api: ApiService,private message: NzNotificationService, private cookie: CookieService) { }
 
  
  listOfData = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 40,
      address: 'London'
    }
  ];

  
options = [
    {
      value: '1',
      label: 'QA',
      children: [
        {
          value: '1',
          label: 'BA',
          children: [
            {
              value: 'xihu',
              label: 'Per',
              isLeaf: true,
             
            },{
              value: 'speed',
              label: 'West Lake1',
              isLeaf: true,
              disabled: false
            }
          ]
        },
        {
          value: 'ningbo',
          label: 'Ningbo',
          isLeaf: true,
          disabled: true
        }
      ]
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
              isLeaf: true
            }
          ]
        }
      ]
    }
  ];
  


 otherOptions = [
    {
      value: 'fujian',
      label: 'Fujian',
      children: [
        {
          value: 'xiamen',
          label: 'Xiamen',
          children: [
            {
              value: 'Kulangsu',
              label: 'Kulangsu',
              isLeaf: true
            }
          ]
        }
      ]
    },
    {
      value: 'guangxi',
      label: 'Guangxi',
      children: [
        {
          value: 'guilin',
          label: 'Guilin',
          children: [
            {
              value: 'Lijiang',
              label: 'Li Jiang River',
              isLeaf: true
            }
          ]
        }
      ]
    }
  ];
  
 dataOfQa=[]
 dataofLR=[]
  nzTabPosition = 'top';
  selectedIndex = 0;
  dataSet=[]
  ngOnInit() {

    this.router.navigateByUrl('/try')

   

    // this.api.getAllParts(0, 0, 'ID', 'asc', '').subscribe(data => {
    //   //console.log(data)
    //   this.loadingRecords = false;
    //   this.totalRecords = data['count'];
    //   this.dataList = data['data'];
    //   this.checkOptionsOne = data['data'];
    // }, err => {
    //   //console.log(err);
    //   if(err['ok']==false)
    //   this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    // });
   
  }
  footer=true

  log(args: any[]): void {
    //console.log(args);
    if(args[0]=="click")
    {
    //   this.totalCount=0
    // let filterQuery="AND PART_ID= "+ args[1]['ID']
    // this.api.getAllSections(0, 0, '', '', filterQuery).subscribe(data => {
    //   //console.log(data)
    //   this.loadingRecords = false;
    //   this.totalRecords = data['count'];
    //   this.dataSet = data['data'];
    //   this.checkOptionsOne=data['data']
    
    //  if(this.dataOfQa['length']<4)
    //  {
    //   this.dataOfQa.push(this.dataSet)
    //  }
    //   this.dataSet.forEach(element => {
    //     this.totalCount = this.totalCount + element['SEQUENCE_NO']
    //   });
    //   //console.log("total :" +this.totalCount)
    // }, err => {
    //   //console.log(err);
    //   if(err['ok']==false)
    //   this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    // });
  }
  }

  updateAllChecked()
  {

  }

  updateSingleChecked()
  {

  }
  save()
  {
    //console.log(this.valuescheck)
   //console.log(this.dataOfQa)
   //console.log(this.checkOptionsOne)
  }
  Submit()
  {
    
    //console.log(this.values)
  }

  log1(value: string[]): void {
    //console.log(value);
    
    
    this.value1.push(value)
    //console.log(this.value1)
  }
  
get(values)
{
  this.totalCount=0
  //console.log(values)
  //console.log(this.dataSet)
  this.dataSet.forEach(element => {
    this.totalCount = values + element['SEQUENCE_NO']
  });
//console.log(this.totalCount)
}


// drop(event): void {
  
//   moveItemInArray(this.listOfData, event.previousIndex, event.currentIndex);
// }

// application/javascript
// application/json
// application/x-www-form-urlencoded
// application/xml
// application/zip
// application/pdf
// application/sql
// application/graphql
// application/ld+json
// application/msword (.doc)
// application/vnd.openxmlformats-officedocument.wordprocessingml.document(.docx)
// application/vnd.ms-excel (.xls)
// application/vnd.openxmlformats-officedocument.spreadsheetml.sheet (.xlsx)
// application/vnd.ms-powerpoint (.ppt)
// application/vnd.openxmlformats-officedocument.presentationml.presentation (.pptx)
// application/vnd.oasis.opendocument.text (.odt)
// application/zstd (.zst)
// audio/mpeg
// audio/ogg
// multipart/form-data
// text/css
// text/html
// text/xml
// text/csv
// text/plain
// image/png
// image/jpeg
// image/gif
// application/vnd.api+json

date:Date
selectChange(event)
{
//console.log(event)
//console.log(this.date)
}
panelChange(event)
{
//console.log(event)
}

getData(data)
{
//console.log(data)
}



myData = [{ date:'1', type: 'processing', content: '5Sessions ' },
  { date:'6', type: 'processing', content: '5Sessions ' },
{ date:'7',type: 'warning', content: '22' }]

  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
      return 1394;
    }
    return null;
  }

  

  Submit1()
  {
    var values=[]
    var value={}

    let value1='Direction_url'
    let value2='Description_url'

    value[value1]='123456'
    value[value2]='7456789'
    
    values.push(value)
    //console.log(values)

//console.log(values['Direction_url'])

  }

}
