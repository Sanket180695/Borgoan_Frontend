import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeakersectorloanComponent } from './weakersectorloan.component';

describe('WeakersectorloanComponent', () => {
  let component: WeakersectorloanComponent;
  let fixture: ComponentFixture<WeakersectorloanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeakersectorloanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeakersectorloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
