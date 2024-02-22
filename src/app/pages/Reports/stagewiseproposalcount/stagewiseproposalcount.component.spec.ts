import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StagewiseproposalcountComponent } from './stagewiseproposalcount.component';

describe('StagewiseproposalcountComponent', () => {
  let component: StagewiseproposalcountComponent;
  let fixture: ComponentFixture<StagewiseproposalcountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StagewiseproposalcountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StagewiseproposalcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
