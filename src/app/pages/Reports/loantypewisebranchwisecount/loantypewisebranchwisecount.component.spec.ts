import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoantypewisebranchwisecountComponent } from './loantypewisebranchwisecount.component';

describe('LoantypewisebranchwisecountComponent', () => {
  let component: LoantypewisebranchwisecountComponent;
  let fixture: ComponentFixture<LoantypewisebranchwisecountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoantypewisebranchwisecountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoantypewisebranchwisecountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
