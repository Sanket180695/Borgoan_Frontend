import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementOfSalesComponent } from './management-of-sales.component';

describe('ManagementOfSalesComponent', () => {
  let component: ManagementOfSalesComponent;
  let fixture: ComponentFixture<ManagementOfSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementOfSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementOfSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
