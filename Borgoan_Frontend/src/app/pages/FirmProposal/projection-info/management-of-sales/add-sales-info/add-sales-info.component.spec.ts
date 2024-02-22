import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalesInfoComponent } from './add-sales-info.component';

describe('AddSalesInfoComponent', () => {
  let component: AddSalesInfoComponent;
  let fixture: ComponentFixture<AddSalesInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSalesInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSalesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
