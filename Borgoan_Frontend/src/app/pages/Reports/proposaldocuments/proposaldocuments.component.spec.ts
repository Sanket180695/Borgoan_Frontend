import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposaldocumentsComponent } from './proposaldocuments.component';

describe('ProposaldocumentsComponent', () => {
  let component: ProposaldocumentsComponent;
  let fixture: ComponentFixture<ProposaldocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposaldocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposaldocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
