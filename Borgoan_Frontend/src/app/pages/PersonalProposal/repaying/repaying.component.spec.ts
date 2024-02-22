import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepayingComponent } from './repaying.component';

describe('RepayingComponent', () => {
  let component: RepayingComponent;
  let fixture: ComponentFixture<RepayingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepayingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepayingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
