import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JointaccountComponent } from './jointaccount.component';

describe('JointaccountComponent', () => {
  let component: JointaccountComponent;
  let fixture: ComponentFixture<JointaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JointaccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JointaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
