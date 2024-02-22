import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimesecurityinfoComponent } from './primesecurityinfo.component';

describe('PrimesecurityinfoComponent', () => {
  let component: PrimesecurityinfoComponent;
  let fixture: ComponentFixture<PrimesecurityinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimesecurityinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimesecurityinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
