import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewproposalComponent } from './newproposal.component';

describe('NewproposalComponent', () => {
  let component: NewproposalComponent;
  let fixture: ComponentFixture<NewproposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewproposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewproposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
