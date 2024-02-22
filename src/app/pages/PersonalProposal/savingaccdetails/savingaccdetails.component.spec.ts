import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingaccdetailsComponent } from './savingaccdetails.component';

describe('SavingaccdetailsComponent', () => {
  let component: SavingaccdetailsComponent;
  let fixture: ComponentFixture<SavingaccdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavingaccdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingaccdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
