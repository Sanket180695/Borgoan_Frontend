import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposaldocumentComponent } from './proposaldocument.component';

describe('ProposaldocumentComponent', () => {
  let component: ProposaldocumentComponent;
  let fixture: ComponentFixture<ProposaldocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposaldocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposaldocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
