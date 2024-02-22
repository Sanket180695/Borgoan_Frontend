import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositeloanComponent } from './depositeloan.component';

describe('DepositeloanComponent', () => {
  let component: DepositeloanComponent;
  let fixture: ComponentFixture<DepositeloanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositeloanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositeloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
