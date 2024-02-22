import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SumbitforreviewComponent } from './sumbitforreview.component';

describe('SumbitforreviewComponent', () => {
  let component: SumbitforreviewComponent;
  let fixture: ComponentFixture<SumbitforreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SumbitforreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SumbitforreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
