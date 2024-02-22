import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposaldocumentsummaryComponent } from './proposaldocumentsummary.component';

describe('ProposaldocumentsummaryComponent', () => {
  let component: ProposaldocumentsummaryComponent;
  let fixture: ComponentFixture<ProposaldocumentsummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposaldocumentsummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposaldocumentsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
