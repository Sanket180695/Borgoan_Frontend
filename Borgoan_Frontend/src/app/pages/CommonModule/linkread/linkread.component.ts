import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-linkread',
  templateUrl: './linkread.component.html',
  styleUrls: ['./linkread.component.css']
})
export class LinkreadComponent implements OnInit {

  studentKey=""
  headingCss = {
    'color':'blue',
    'font-size':'50px' ,
    'font-weight':'bold',
  };
  constructor() { }

  ngOnInit() {
  this.getKey()
  }

  getKey()
  {
    let url=window.location.href
    var arr=url.split("/")
    this.studentKey=arr[4]
    //console.log(this.studentKey)
  }

}
