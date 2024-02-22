import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlushProposalComponent } from './flush-proposal.component';

describe('FlushProposalComponent', () => {
  let component: FlushProposalComponent;
  let fixture: ComponentFixture<FlushProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlushProposalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlushProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
