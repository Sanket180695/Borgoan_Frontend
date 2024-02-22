import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GfinancialinfoComponent } from './gfinancialinfo.component';

describe('GfinancialinfoComponent', () => {
  let component: GfinancialinfoComponent;
  let fixture: ComponentFixture<GfinancialinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GfinancialinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GfinancialinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
