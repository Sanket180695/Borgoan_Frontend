import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeyearsComponent } from './incomeyears.component';

describe('IncomeyearsComponent', () => {
  let component: IncomeyearsComponent;
  let fixture: ComponentFixture<IncomeyearsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeyearsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeyearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
