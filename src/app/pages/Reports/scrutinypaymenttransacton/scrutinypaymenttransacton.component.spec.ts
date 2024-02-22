import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrutinypaymenttransactonComponent } from './scrutinypaymenttransacton.component';

describe('ScrutinypaymenttransactonComponent', () => {
  let component: ScrutinypaymenttransactonComponent;
  let fixture: ComponentFixture<ScrutinypaymenttransactonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrutinypaymenttransactonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrutinypaymenttransactonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
