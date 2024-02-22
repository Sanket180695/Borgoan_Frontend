import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotherComponent } from './cother.component';

describe('CotherComponent', () => {
  let component: CotherComponent;
  let fixture: ComponentFixture<CotherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
