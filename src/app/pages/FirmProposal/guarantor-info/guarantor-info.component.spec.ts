import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuarantorInfoComponent } from './guarantor-info.component';

describe('GuarantorInfoComponent', () => {
  let component: GuarantorInfoComponent;
  let fixture: ComponentFixture<GuarantorInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuarantorInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuarantorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
