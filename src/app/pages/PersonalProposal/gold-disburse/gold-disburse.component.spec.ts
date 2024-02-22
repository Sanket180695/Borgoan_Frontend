import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldDisburseComponent } from './gold-disburse.component';

describe('GoldDisburseComponent', () => {
  let component: GoldDisburseComponent;
  let fixture: ComponentFixture<GoldDisburseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoldDisburseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldDisburseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
