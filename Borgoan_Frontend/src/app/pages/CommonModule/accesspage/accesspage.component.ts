import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-accesspage',
  templateUrl: './accesspage.component.html',
  styleUrls: ['./accesspage.component.css']
})
export class AccesspageComponent implements OnInit {

  constructor(private cookie: CookieService) { }

  ngOnInit() {
  }

  logout()
  {
    sessionStorage.clear()
    this.cookie.deleteAll()
    window.location.reload()
  }
}
