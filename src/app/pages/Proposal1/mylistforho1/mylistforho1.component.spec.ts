import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mylistforho1Component } from './mylistforho1.component';

describe('Mylistforho1Component', () => {
  let component: Mylistforho1Component;
  let fixture: ComponentFixture<Mylistforho1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Mylistforho1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Mylistforho1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
