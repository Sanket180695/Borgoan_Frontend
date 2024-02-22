import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalproposalComponent } from './personalproposal.component';

describe('PersonalproposalComponent', () => {
  let component: PersonalproposalComponent;
  let fixture: ComponentFixture<PersonalproposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalproposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalproposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
