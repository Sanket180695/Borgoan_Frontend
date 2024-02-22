import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalsallComponent } from './proposalsall.component';

describe('ProposalsallComponent', () => {
  let component: ProposalsallComponent;
  let fixture: ComponentFixture<ProposalsallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalsallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalsallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
