import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShikshansavadharnloanComponent } from './shikshansavadharnloan.component';

describe('ShikshansavadharnloanComponent', () => {
  let component: ShikshansavadharnloanComponent;
  let fixture: ComponentFixture<ShikshansavadharnloanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShikshansavadharnloanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShikshansavadharnloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
