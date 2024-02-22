import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverdueproposalComponent } from './overdueproposal.component';

describe('OverdueproposalComponent', () => {
  let component: OverdueproposalComponent;
  let fixture: ComponentFixture<OverdueproposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverdueproposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverdueproposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
