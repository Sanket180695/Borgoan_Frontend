import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoantypeComponent } from './loantype.component';

describe('LoantypeComponent', () => {
  let component: LoantypeComponent;
  let fixture: ComponentFixture<LoantypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoantypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoantypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
