import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenditureinfoComponent } from './expenditureinfo.component';

describe('ExpenditureinfoComponent', () => {
  let component: ExpenditureinfoComponent;
  let fixture: ComponentFixture<ExpenditureinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenditureinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenditureinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
