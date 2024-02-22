import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeyearComponent } from './incomeyear.component';

describe('IncomeyearComponent', () => {
  let component: IncomeyearComponent;
  let fixture: ComponentFixture<IncomeyearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeyearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeyearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
