import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfInstallmentsComponent } from './type-of-installments.component';

describe('TypeOfInstallmentsComponent', () => {
  let component: TypeOfInstallmentsComponent;
  let fixture: ComponentFixture<TypeOfInstallmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeOfInstallmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOfInstallmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
