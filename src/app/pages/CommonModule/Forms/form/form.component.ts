import { Component, OnInit, Input } from '@angular/core';
import { Form } from 'src/app/Models/Commonmodule/form';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() drawerClose: Function;
  @Input() data: Form;
  isSpinning = false
  loadingForm = false
  forms: Form[];
  position='topRight'

  constructor(private api: ApiService, private message: NzNotificationService) {
  }

  ngOnInit() {
    this.loadForms();

  }
  loadForms() {
    this.loadingForm = true;
    this.api.getAllForms(0, 0, '', '', 'AND PARENT_ID=0').subscribe(data => {
      this.forms = data['data'];
      this.loadingForm = false;
    }, err => {
      //console.log(err);
      //this.loadingForm = false;
    });
  }


  close(): void {
    this.drawerClose();
  }

  save(addNew: boolean): void {
    this.isSpinning = true;
    if (this.data.ID) {
      //console.log(this.data)
      this.api.updateForm(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {          
           this.message.success(this.api.translate.instant('form.message1'), "");
            if (!addNew)
              this.drawerClose();
            this.isSpinning = false;
          }
          else {
            this.message.error(this.api.translate.instant('form.message2'), "");
            this.isSpinning = false;
          }
        });
    }
    else {
//console.log(this.data)
      this.data.ICON=""
      this.api.createForm(this.data)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('form.message3'), "");
            if (!addNew)
              this.drawerClose();
            else {
              
              this.data = new Form();
            }
            this.isSpinning = false;
          }
          else {
            this.message.error(this.api.translate.instant('form.message4'), "");
            this.isSpinning = false;
          }
        });
    }
    this.loadForms()
  }


}