import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoantypewisebranchwiseamountComponent } from './loantypewisebranchwiseamount.component';

describe('LoantypewisebranchwiseamountComponent', () => {
  let component: LoantypewisebranchwiseamountComponent;
  let fixture: ComponentFixture<LoantypewisebranchwiseamountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoantypewisebranchwiseamountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoantypewisebranchwiseamountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
