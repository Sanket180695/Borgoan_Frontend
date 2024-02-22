import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoantypewiseavgcountComponent } from './loantypewiseavgcount.component';

describe('LoantypewiseavgcountComponent', () => {
  let component: LoantypewiseavgcountComponent;
  let fixture: ComponentFixture<LoantypewiseavgcountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoantypewiseavgcountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoantypewiseavgcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
