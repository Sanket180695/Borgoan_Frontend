import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserwiseproposalcountComponent } from './userwiseproposalcount.component';

describe('UserwiseproposalcountComponent', () => {
  let component: UserwiseproposalcountComponent;
  let fixture: ComponentFixture<UserwiseproposalcountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserwiseproposalcountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserwiseproposalcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
