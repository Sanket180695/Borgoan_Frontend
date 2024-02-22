import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldloanComponent } from './goldloan.component';

describe('GoldloanComponent', () => {
  let component: GoldloanComponent;
  let fixture: ComponentFixture<GoldloanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoldloanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
