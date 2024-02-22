import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JointaccountlistComponent } from './jointaccountlist.component';

describe('JointaccountlistComponent', () => {
  let component: JointaccountlistComponent;
  let fixture: ComponentFixture<JointaccountlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JointaccountlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JointaccountlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
