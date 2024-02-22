import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfInstallmentComponent } from './type-of-installment.component';

describe('TypeOfInstallmentComponent', () => {
  let component: TypeOfInstallmentComponent;
  let fixture: ComponentFixture<TypeOfInstallmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeOfInstallmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOfInstallmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
