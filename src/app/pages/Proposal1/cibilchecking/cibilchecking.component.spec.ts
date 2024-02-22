import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CibilcheckingComponent } from './cibilchecking.component';

describe('CibilcheckingComponent', () => {
  let component: CibilcheckingComponent;
  let fixture: ComponentFixture<CibilcheckingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CibilcheckingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CibilcheckingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
